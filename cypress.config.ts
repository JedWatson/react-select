import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000/cypress-tests',
    supportFile: false,
  },
  video: false,
});
