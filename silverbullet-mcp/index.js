#!/usr/bin/env node

/**
 * Silver Bullet MCP Server
 * Conecta o Claude Code ao Silver Bullet (silverbullet.lesse.com.br)
 *
 * Variáveis de ambiente necessárias:
 *   SB_URL      — URL base (ex: https://silverbullet.lesse.com.br)
 *   SB_USER     — login do Silver Bullet
 *   SB_PASSWORD  — senha do Silver Bullet
 *   SB_PROJECT  — (opcional) ID ou slug do projeto padrão
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ── Config ──────────────────────────────────────────────────────────
const BASE_URL = process.env.SB_URL || "https://silverbullet.lesse.com.br";
const USER = process.env.SB_USER || "";
const PASSWORD = process.env.SB_PASSWORD || "";
const DEFAULT_PROJECT = process.env.SB_PROJECT || "";

// ── Session ─────────────────────────────────────────────────────────
let sessionCookie = "";
let sessionExpiresAt = 0; // timestamp

async function ensureSession() {
  const now = Date.now();
  // Renovar se faltar menos de 30 min para expirar (sessão dura ~7h)
  if (sessionCookie && now < sessionExpiresAt - 30 * 60 * 1000) {
    return;
  }
  await login();
}

async function login() {
  // ────────────────────────────────────────────────────────────────
  // IMPORTANTE: Preencha a URL e o body conforme o que você viu no
  // DevTools (aba Network) ao fazer login no Silver Bullet.
  //
  // Exemplo genérico — ajuste o endpoint e os campos:
  // ────────────────────────────────────────────────────────────────
  const loginUrl = `${BASE_URL}/api/auth/login`;

  const res = await fetch(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: USER,
      password: PASSWORD,
      // Pode ter campos extras como "remember": true
    }),
    redirect: "manual",
  });

  if (!res.ok && res.status !== 302) {
    throw new Error(`Login falhou: ${res.status} ${res.statusText}`);
  }

  // Captura o cookie de sessão
  const setCookie = res.headers.getSetCookie?.() || [res.headers.get("set-cookie")].filter(Boolean);
  sessionCookie = setCookie
    .map((c) => c.split(";")[0])
    .join("; ");

  if (!sessionCookie) {
    // Tenta pegar token do body (APIs que retornam JWT)
    try {
      const body = await res.json();
      if (body.token || body.access_token) {
        sessionCookie = `Bearer ${body.token || body.access_token}`;
      }
    } catch {
      // ignorar
    }
  }

  // Sessão expira em ~7h
  sessionExpiresAt = Date.now() + 7 * 60 * 60 * 1000;
}

// ── Fetch helper ────────────────────────────────────────────────────
async function sbFetch(path, options = {}) {
  await ensureSession();

  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  const headers = { ...options.headers };

  if (sessionCookie.startsWith("Bearer ")) {
    headers["Authorization"] = sessionCookie;
  } else {
    headers["Cookie"] = sessionCookie;
  }

  const res = await fetch(url, { ...options, headers });

  if (res.status === 401 || res.status === 403) {
    // Sessão expirou — tenta relogar uma vez
    sessionCookie = "";
    await login();
    return sbFetch(path, options);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("json")) {
    return await res.json();
  }
  return await res.text();
}

// ── MCP Server ──────────────────────────────────────────────────────
const server = new McpServer({
  name: "silverbullet",
  version: "1.0.0",
});

// ── Tool: sb_fetch ──────────────────────────────────────────────────
// Ferramenta genérica para qualquer endpoint da API
server.tool(
  "sb_fetch",
  "Faz uma requisição autenticada a qualquer endpoint do Silver Bullet. " +
    "Use para explorar a API ou acessar endpoints que ainda não têm ferramenta própria.",
  {
    path: z.string().describe("Caminho da API (ex: /api/projects/123/activities)"),
    method: z.enum(["GET", "POST", "PUT", "DELETE"]).default("GET").describe("Método HTTP"),
    body: z.string().optional().describe("Body JSON para POST/PUT"),
  },
  async ({ path, method, body }) => {
    try {
      const options = { method };
      if (body && (method === "POST" || method === "PUT")) {
        options.body = body;
        options.headers = { "Content-Type": "application/json" };
      }
      const data = await sbFetch(path, options);
      const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      return { content: [{ type: "text", text }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erro: ${e.message}` }], isError: true };
    }
  }
);

// ── Tool: sb_project ────────────────────────────────────────────────
server.tool(
  "sb_project",
  "Retorna informações gerais do projeto no Silver Bullet.",
  {
    projectId: z.string().default(DEFAULT_PROJECT).describe("ID do projeto (usa o padrão do .env se omitido)"),
  },
  async ({ projectId }) => {
    try {
      // AJUSTE o endpoint conforme o que você descobrir no DevTools
      const data = await sbFetch(`/api/projects/${projectId}`);
      const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      return { content: [{ type: "text", text }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erro: ${e.message}` }], isError: true };
    }
  }
);

// ── Tool: sb_activities ─────────────────────────────────────────────
server.tool(
  "sb_activities",
  "Lista as atividades/tarefas do projeto no Silver Bullet (EAP, cronograma).",
  {
    projectId: z.string().default(DEFAULT_PROJECT).describe("ID do projeto"),
  },
  async ({ projectId }) => {
    try {
      const data = await sbFetch(`/api/projects/${projectId}/activities`);
      const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      return { content: [{ type: "text", text }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erro: ${e.message}` }], isError: true };
    }
  }
);

// ── Tool: sb_risks ──────────────────────────────────────────────────
server.tool(
  "sb_risks",
  "Lista os riscos registrados no Silver Bullet.",
  {
    projectId: z.string().default(DEFAULT_PROJECT).describe("ID do projeto"),
  },
  async ({ projectId }) => {
    try {
      const data = await sbFetch(`/api/projects/${projectId}/risks`);
      const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      return { content: [{ type: "text", text }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erro: ${e.message}` }], isError: true };
    }
  }
);

// ── Tool: sb_requirements ───────────────────────────────────────────
server.tool(
  "sb_requirements",
  "Lista os requisitos do projeto no Silver Bullet.",
  {
    projectId: z.string().default(DEFAULT_PROJECT).describe("ID do projeto"),
  },
  async ({ projectId }) => {
    try {
      const data = await sbFetch(`/api/projects/${projectId}/requirements`);
      const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      return { content: [{ type: "text", text }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erro: ${e.message}` }], isError: true };
    }
  }
);

// ── Tool: sb_stakeholders ───────────────────────────────────────────
server.tool(
  "sb_stakeholders",
  "Lista as partes interessadas e seus custos/hora.",
  {
    projectId: z.string().default(DEFAULT_PROJECT).describe("ID do projeto"),
  },
  async ({ projectId }) => {
    try {
      const data = await sbFetch(`/api/projects/${projectId}/stakeholders`);
      const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      return { content: [{ type: "text", text }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erro: ${e.message}` }], isError: true };
    }
  }
);

// ── Tool: sb_scope ──────────────────────────────────────────────────
server.tool(
  "sb_scope",
  "Retorna a declaração de escopo do projeto.",
  {
    projectId: z.string().default(DEFAULT_PROJECT).describe("ID do projeto"),
  },
  async ({ projectId }) => {
    try {
      const data = await sbFetch(`/api/projects/${projectId}/scope`);
      const text = typeof data === "string" ? data : JSON.stringify(data, null, 2);
      return { content: [{ type: "text", text }] };
    } catch (e) {
      return { content: [{ type: "text", text: `Erro: ${e.message}` }], isError: true };
    }
  }
);

// ── Start ───────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
