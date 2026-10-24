# Backlog — Sistema de Processos Seletivos PampaTec (PEP)

**Disciplina:** Resolução de Problemas VI · UNIPAMPA · Grupo 5
**Marco:** III — Execução
**Gestão:** Silver Bullet (Kanban) · GitLab (Issues/Board)

---

## Épico 1 — Fundação do projeto e ambiente

| # | Tarefa |
|---|---|
| 1.1 | Criar monorepo com frontend Next.js 16/React 19 e backend NestJS 11 |
| 1.2 | Configurar TypeScript 5 com regras de lint, formatação e aliases |
| 1.3 | Configurar Tailwind CSS v4 e o design system das telas |
| 1.4 | Criar Dockerfiles para frontend, backend e PostgreSQL |
| 1.5 | Criar docker-compose.yml com serviços da aplicação, API e banco |
| 1.6 | Configurar variáveis de ambiente por contexto: desenvolvimento, teste e produção |
| 1.7 | Criar pipeline inicial de build, testes e validação de tipos |

## Épico 2 — Banco de dados e modelagem

| # | Tarefa |
|---|---|
| 2.1 | Configurar PostgreSQL e TypeORM 0.3 no NestJS |
| 2.2 | Criar migrations e entidades de usuários, perfis e permissões |
| 2.3 | Criar entidades de editais, etapas, prazos e critérios |
| 2.4 | Criar entidades de propostas, proponentes, organizações e documentos |
| 2.5 | Criar entidades de triagem, mentorias, ajustes e vínculos de P&D |
| 2.6 | Criar entidades de avaliadores, avaliações, notas, pareceres e pitches |
| 2.7 | Criar entidades de resultados, recursos, homologações e notificações |
| 2.8 | Criar entidades de auditoria, eventos de segurança e indicadores |
| 2.9 | Criar índices, constraints, relacionamentos e política de retenção de dados |

## Épico 3 — Autenticação e autorização

| # | Tarefa |
|---|---|
| 3.1 | Configurar Google OAuth 2.0 com Passport no NestJS |
| 3.2 | Implementar callback OAuth e criação ou associação de usuário |
| 3.3 | Implementar emissão, validação e renovação de JWT |
| 3.4 | Criar guardas do NestJS para autenticação e autorização |
| 3.5 | Implementar controle de acesso por perfil: Proponente, Gestor, Avaliador, Auditor e Administrador |
| 3.6 | Configurar sessão segura, logout, expiração de token e proteção contra CSRF |
| 3.7 | Criar tela de login e seleção de perfil quando aplicável |
| 3.8 | Registrar eventos de login, logout, falhas e alterações de permissão |

## Épico 4 — Editais e gestão do processo seletivo

| # | Tarefa |
|---|---|
| 4.1 | Criar tela e API de listagem de editais |
| 4.2 | Criar formulário de cadastro e edição de edital pelo Gestor |
| 4.3 | Implementar etapas, critérios, documentos exigidos e cronograma |
| 4.4 | Implementar publicação, suspensão, encerramento e arquivamento de editais |
| 4.5 | Criar visão pública do edital para o Proponente |
| 4.6 | Criar alertas de abertura, encerramento e prazos próximos |
| 4.7 | Validar transições de status conforme regras do ciclo de vida |

## Épico 5 — Propostas e submissão do Proponente

| # | Tarefa |
|---|---|
| 5.1 | Criar formulário completo de proposta com salvamento como rascunho |
| 5.2 | Implementar identificação do proponente, CPF/CNPJ e dados da organização |
| 5.3 | Criar cadastro de sócios, equipe e demais proponentes vinculados |
| 5.4 | Criar formulário de Plano de Negócios ou Projeto de Pesquisa |
| 5.5 | Implementar upload e gerenciamento de documentos obrigatórios |
| 5.6 | Validar formato, tamanho, integridade e tipo dos arquivos |
| 5.7 | Implementar submissão definitiva com protocolo e confirmação |
| 5.8 | Bloquear edição após submissão, salvo em solicitações formais de ajuste |
| 5.9 | Criar acompanhamento de status, pendências, notificações e histórico da proposta |

## Épico 6 — Triagem, mentoria e ajustes

| # | Tarefa |
|---|---|
| 6.1 | Criar fila de propostas para triagem do Gestor |
| 6.2 | Implementar conferência de documentação e checklist de requisitos |
| 6.3 | Implementar aprovação, reprovação ou solicitação de ajustes |
| 6.4 | Criar comunicação de feedback ao Proponente |
| 6.5 | Criar registro de mentorias, responsáveis, datas, duração e encaminhamentos |
| 6.6 | Implementar negociação de termos e vínculo de P&D |
| 6.7 | Criar indicadores de tempo médio de mentoria e tempo de triagem |
| 6.8 | Registrar todas as alterações e decisões no histórico da proposta |

## Épico 7 — Avaliação e banca

| # | Tarefa |
|---|---|
| 7.1 | Criar tela de aceite do termo de confidencialidade |
| 7.2 | Bloquear acesso às propostas até o aceite registrado |
| 7.3 | Criar tela de propostas designadas ao Avaliador |
| 7.4 | Criar tela "Abrir análise" com dados, documentos e plano da proposta |
| 7.5 | Implementar notas por critério e cálculo de resultado da avaliação |
| 7.6 | Criar formulário de parecer técnico e justificativa de pré-avaliação |
| 7.7 | Criar registro completo do pitch: participantes, data e observações |
| 7.8 | Implementar salvamento parcial e conclusão da avaliação |
| 7.9 | Impedir avaliação de propostas fora da designação do avaliador |
| 7.10 | Criar visão consolidada para Gestor e banca, respeitando permissões |

## Épico 8 — Resultado e ciclo de vida

| # | Tarefa |
|---|---|
| 8.1 | Criar tela de consolidação e publicação do resultado |
| 8.2 | Implementar comunicação individual do resultado ao Proponente |
| 8.3 | Criar fluxo de recurso com prazo, justificativa e anexos |
| 8.4 | Criar tela de julgamento e decisão dos recursos |
| 8.5 | Implementar homologação do resultado |
| 8.6 | Criar alertas de prazos, pendências, expiração e mudanças de status |
| 8.7 | Implementar expiração automática de propostas e editais |
| 8.8 | Implementar expurgo seguro de arquivos conforme política de retenção |
| 8.9 | Manter histórico completo de todas as decisões do ciclo de vida |

## Épico 9 — Auditoria e indicadores

| # | Tarefa |
|---|---|
| 9.1 | Criar log imutável de ações: usuário, perfil, data, IP e origem |
| 9.2 | Criar filtros por usuário, perfil, proposta, edital, evento e período |
| 9.3 | Criar página de detalhes de uma evidência de auditoria |
| 9.4 | Criar painel de conformidade com pendências e eventos críticos |
| 9.5 | Criar indicadores agregados de editais, propostas, triagem e avaliações |
| 9.6 | Criar consulta de startups e organizações por área de atuação |
| 9.7 | Criar relatórios exportáveis com controle de permissão |
| 9.8 | Implementar trilha de auditoria para acessos a documentos confidenciais |

## Épico 10 — Frontend e experiência de uso

| # | Tarefa |
|---|---|
| 10.1 | Criar layout autenticado com navegação por perfil |
| 10.2 | Criar dashboard específico para cada perfil de usuário |
| 10.3 | Implementar tabelas com busca, filtros, ordenação e paginação |
| 10.4 | Criar estados de carregamento, vazio, erro e sucesso |
| 10.5 | Implementar formulários com validação client-side e server-side |
| 10.6 | Criar notificações, confirmações e mensagens de retorno |
| 10.7 | Garantir responsividade e acessibilidade das principais jornadas |
| 10.8 | Testar as telas com os fluxos reais de Proponente, Gestor, Avaliador e Auditor |

## Épico 11 — Qualidade, segurança e entrega

| # | Tarefa |
|---|---|
| 11.1 | Criar testes unitários para regras de negócio no NestJS |
| 11.2 | Criar testes de integração para TypeORM e PostgreSQL |
| 11.3 | Criar testes de API para autenticação, permissões e fluxos críticos |
| 11.4 | Criar testes end-to-end das jornadas de submissão, triagem e avaliação |
| 11.5 | Validar upload seguro, autorização por recurso e proteção contra acesso indevido |
| 11.6 | Configurar tratamento padronizado de erros e observabilidade |
| 11.7 | Configurar backup, restauração e migrações controladas do PostgreSQL |
| 11.8 | Criar documentação da API e dos principais fluxos |
| 11.9 | Executar revisão de segurança, performance e conformidade antes da homologação |

---

## Ordem recomendada para o MVP

| Fase | Épico | Entrega |
|---|---|---|
| 1 | Épico 1 | Fundação, Docker e ambiente |
| 2 | Épico 2 | PostgreSQL, TypeORM e modelagem principal |
| 3 | Épico 3 | Autenticação, JWT e perfis |
| 4 | Épico 4 | Editais |
| 5 | Épico 5 | Propostas e submissão |
| 6 | Épico 6 | Triagem |
| 7 | Épico 7 | Avaliação com aceite de confidencialidade |
| 8 | Épico 8 | Resultados e recursos |
| 9 | Épico 9 | Auditoria e indicadores |
| 10 | Épico 11 | Testes, segurança e preparação para produção |

> **Nota:** O Épico 10 (Frontend/UX) é transversal — cada épico de funcionalidade inclui suas telas. O épico 10 cobre refinamentos globais de layout, responsividade e acessibilidade.
