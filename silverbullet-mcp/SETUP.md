# Silver Bullet MCP — Setup

## 1. Instalar

```bash
cd silverbullet-mcp
npm install
```

## 2. Descobrir os endpoints da API

Os endpoints no `index.js` são genéricos (`/api/projects/...`). Você precisa substituí-los pelos reais. Para descobrir:

1. Abra o Silver Bullet no Chrome
2. Aperte **F12** → aba **Network** → filtre por **Fetch/XHR**
3. Navegue normalmente (abra o projeto, clique em Atividades, Riscos, etc.)
4. Cada clique gera uma requisição — anote o **URL**, o **método** e o **body**

### O que procurar

| Ação no Silver Bullet | O que anotar |
|---|---|
| Fazer login | URL do POST de login, campos do body (username? email?), nome do cookie |
| Abrir o projeto | URL do GET que carrega os dados gerais |
| Abrir Atividades | URL que lista as atividades |
| Abrir Riscos | URL que lista os riscos |
| Abrir Requisitos | URL que lista os requisitos |
| Abrir Partes Interessadas | URL que lista os stakeholders |
| Abrir Escopo | URL que traz a declaração de escopo |

### Exemplo

Se ao clicar em "Atividades" você vê no DevTools:

```
GET https://silverbullet.lesse.com.br/api/v1/project/42/wbs/activities
```

Então no `index.js`, troque:
```js
const data = await sbFetch(`/api/projects/${projectId}/activities`);
```
por:
```js
const data = await sbFetch(`/api/v1/project/${projectId}/wbs/activities`);
```

## 3. Configurar o .env

```bash
cp .env.example .env
# Edite com seus dados
```

## 4. Testar

```bash
node index.js
# Se não der erro, o servidor MCP está rodando
```

## 5. Adicionar ao Claude Code

No arquivo `.claude/settings.json` do seu projeto:

```json
{
  "mcpServers": {
    "silverbullet": {
      "command": "node",
      "args": ["/caminho/completo/silverbullet-mcp/index.js"],
      "env": {
        "SB_URL": "https://silverbullet.lesse.com.br",
        "SB_USER": "seu_usuario",
        "SB_PASSWORD": "sua_senha",
        "SB_PROJECT": "id_do_projeto"
      }
    }
  }
}
```

> ⚠ **Não commite** o `.claude/settings.json` com a senha.
> Use `.claude/settings.local.json` (que fica no `.gitignore`).

## 6. Usar no Claude Code

Depois de configurar, o Claude Code ganha estas ferramentas:

- `sb_fetch` — requisição genérica a qualquer endpoint
- `sb_project` — dados gerais do projeto
- `sb_activities` — atividades/tarefas (EAP)
- `sb_risks` — registro de riscos
- `sb_requirements` — requisitos
- `sb_stakeholders` — partes interessadas
- `sb_scope` — declaração de escopo

O `sb_fetch` é o curinga: se precisar de um endpoint que não tem ferramenta pronta, o Claude usa ele.

## 7. Adicionar mais ferramentas

Copie o padrão de qualquer tool existente no `index.js` e troque o endpoint. É só duplicar o bloco `server.tool(...)`.
