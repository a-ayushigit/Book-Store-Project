/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      backgroundImage:{
        'book-side-left': "url('/src/assets/bookImage.jpg')",
        'book-side-right':"url('/src/assets/bookImage2.jpg')",
        'book-center':"url('/src/assets/community_image.png')"
      }
    },
    
  },
  plugins: [],
}

