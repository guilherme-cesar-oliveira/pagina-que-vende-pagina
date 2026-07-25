# Pagina Que Vende Pagina

Landing page mobile-first da Hunt Digital para vender landing pages, feita em React, TypeScript, Vite, Tailwind e pronta para GitHub Pages.

## Scripts

- `npm run dev`: inicia o ambiente local
- `npm run build`: gera a build de producao
- `npm run preview`: abre a build localmente
- `npm run lint`: roda o lint

## Admin estatico

- Rota publica: `#/`
- Rota admin: `#/admin`
- Usuario inicial: `admin`
- Senha inicial: `hunt2026!`

O painel salva a configuracao no navegador atual e permite exportar/importar o arquivo `site-admin-db.json`.

## Deploy no GitHub Pages

O projeto ja esta preparado para publicar automaticamente via GitHub Actions.

1. Suba este projeto para o repositorio `pagina-que-vende-pagina`.
2. No GitHub, abra `Settings > Pages`.
3. Em `Build and deployment`, selecione `GitHub Actions`.
4. Faca push na branch `main` ou `master`.
5. Aguarde o workflow `Deploy to GitHub Pages` finalizar.

URL inicial esperada:

`https://guilherme-cesar-oliveira.github.io/pagina-que-vende-pagina/`
