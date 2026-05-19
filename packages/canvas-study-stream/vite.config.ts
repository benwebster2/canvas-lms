import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      outDir: 'dist'
    })
  ],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'CanvasStudyStream',
      formats: ['es', 'umd'],
      fileName: (format) => `canvas-study-stream.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
