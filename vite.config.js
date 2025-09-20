import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: '127.0.0.1', // Use IPv4 instead of IPv6 to avoid permission issues
    strictPort: false, // Allow fallback to other ports if 3001 is occupied
  },
  // Define environment variables that should be available in the client
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
  // Ensure environment variables are properly loaded
  envPrefix: 'VITE_',
})
