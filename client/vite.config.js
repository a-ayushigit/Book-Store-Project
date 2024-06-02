import { defineConfig , loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible';
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix:"KEY_ID",
  plugins: [
    
    react(),
    envCompatible()
  
  ],
  
  // define: {
  //   "process.env.KEY_ID_RAZORPAY": JSON.stringify(process.env.KEY_ID_RAZORPAY),
  // },
}
)
