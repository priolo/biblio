import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'



// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        base: '/app/',
        plugins: [react()],
        build: {
            outDir: 'dist',
            sourcemap: true,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src')
            }
        },
        server: {
            proxy: {
              '/api/': {
                target: 'http://localhost:3000', // URL del tuo server backend
                changeOrigin: true,
                //rewrite: (path) => path.replace(/^\/api/, '')
              }
            }
          }
    }
})
