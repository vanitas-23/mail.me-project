import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file manually

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env, // Make env variables available
  },
});
