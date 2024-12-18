import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: '../gestao_dividas/frontend/dist', // Gera os arquivos no diretório correto do Django
    emptyOutDir: true,
  },
});