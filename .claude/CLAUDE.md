# CLAUDE.md — Portal de Editais PampaTec (PEP)

> Regras permanentes para o Claude Code neste repositório.
> Não colocar aqui informações que mudam toda semana (atividades, custos, status).
> Essas ficam no Silver Bullet.

## Projeto

- **Nome:** Portal de Editais PampaTec (PEP)
- **Disciplina:** Resolução de Problemas VI (RPVI) — UNIPAMPA
- **Grupo:** 5
- **Objetivo:** sistema web para gerenciar processos seletivos de incubação do PampaTec, parametrizável para diferentes editais

## Stack (RES-02)

- **Frontend:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4
- **Backend:** NestJS 11, Express 5, TypeScript 5
- **Banco:** PostgreSQL + TypeORM 0.3
- **Auth:** Google OAuth 2.0 + JWT + Passport
- **Infra:** Docker / Docker Compose
- **Restrição (RES-10):** apenas ferramentas open source, sem custo de licenciamento

## Referências

- **PMBOK 6ª edição:** estrutura de processos (49 processos, 5 grupos, 10 áreas de conhecimento)
- **PMBOK 7ª edição:** princípios, domínios de desempenho e entrega de valor
- **Silver Bullet:** ferramenta de GP baseada no PMBOK 6 e 7. Fonte de verdade para:
  - Documentos de gestão (TAP, EAP, Registro de Riscos, Planos auxiliares, etc.)
  - Atividades, custos, cronograma e partes interessadas
  - Terminologia: seguir os termos conforme registrados no Silver Bullet
- **Editais:** 186/2015 (Incubação) e 271/2019 (Organizações Associadas)
- **Spec v2.0:** RF01–RF37, RN01–RN23, CA-63 a CA-88, 6 perfis RBAC

## Decisões e glossário

- **F-14 (23/10):** não usar o termo "PO". O cliente é o **Gestor do PampaTec**. Decisões de escopo são "validações com o Gestor do PampaTec".
- **Perfis do sistema:** Proponente, Gestor do PampaTec, Avaliador, Comissão, Professor, Auditor. "Mentor" é pendência aberta (M1).
- **MVP:** demonstra o fluxo do **Edital 186** (incubação). O 271 fica cadastrado por seed para provar parametrização.
- **Acessibilidade:** WCAG 2.2 AA, alvo mínimo de toque 24×24 px.
- **Log de auditoria:** toda ação que altera dados gera registro imutável. Se o log falhar, a ação é desfeita.
- **Avaliação:** editais usam soma de pontos (sem peso/ponderação).

## Fontes de verdade

| O quê | Onde |
|---|---|
| Requisitos, regras de negócio, status | Silver Bullet |
| Backlog e prioridades do MVP | `docs/Backlog_MVP_MoSCoW.md` + Silver Bullet |
| Feedbacks pendentes | `docs/feedback/registro.md` |
| Casos de uso | `docs/Casos_de_Uso_PEP.md` |
| Código | este repositório (GitLab) |

## Antes de implementar uma tarefa

1. Conferir a descrição da tarefa no Silver Bullet (via MCP ou navegador)
2. Verificar se há feedback pendente no `docs/feedback/registro.md`
3. Verificar o backlog do MVP (`docs/Backlog_MVP_MoSCoW.md`)
4. Criar branch a partir de `develop`: `feature/S01-XX-descricao-curta`

## Convenções de código

### Estrutura de pastas

```
backend/
  src/
    modules/          # um módulo NestJS por domínio (edital, proposta, auth...)
      edital/
        edital.controller.ts
        edital.service.ts
        edital.repository.ts
        edital.module.ts
        dto/
        entities/
    common/            # guards, interceptors, decorators, filtros globais
    config/            # configuração (env, TypeORM, JWT)
    
frontend/
  src/
    app/               # rotas (App Router do Next.js)
    components/        # componentes reutilizáveis
    layouts/           # layouts de página
    hooks/             # custom hooks
    lib/               # utilitários, API client
    types/             # tipos compartilhados
```

### Padrões

- Camadas: Controller → Service → Repository (nunca pular)
- DTOs para entrada, Entities para banco, ViewModels para resposta
- Um módulo NestJS por domínio de negócio
- Nomes de arquivos em `kebab-case`
- Variáveis e funções em `camelCase`, classes em `PascalCase`
- Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:` (Conventional Commits)
- Branches: `feature/S01-XX-...`, `fix/S01-XX-...`, `hotfix/...`

### Regras de negócio

- Regras de negócio ficam no **Service**, nunca no Controller
- Validações de entrada ficam no **DTO** (class-validator)
- Queries complexas ficam no **Repository**
- Todas as rotas protegidas por Guard de autenticação, exceto login e health-check
- RBAC: usar decorators `@Roles(...)` + `RolesGuard`

## O que NÃO fazer

- ❌ Não editar nem alterar nada dentro do Silver Bullet por este repositório
- ❌ Não usar o termo "PO" — é "Gestor do PampaTec"
- ❌ Não inventar regras de negócio — se não está na spec ou no edital, marcar como ⚠ PENDENTE
- ❌ Não usar peso/ponderação em avaliações — editais usam soma de pontos
- ❌ Não usar WCAG 2.1 — a versão correta é 2.2 AA
- ❌ Não usar Lei 8.666/1993 — foi revogada pela **Lei 14.133/2021**
- ❌ Não commitar `.env`, credenciais ou `.claude/settings.local.json`
