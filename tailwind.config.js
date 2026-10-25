/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCF9',
          100: '#FAF7F2',
          200: '#F5F0E7', // Primary Background specified in brief
          300: '#EBDDC9',
          400: '#DECBAE',
          500: '#CFB592',
        },
        forest: {
          DEFAULT: '#243323', // Primary text specified in brief
          50: '#F2F5F2',
          100: '#E3E9E3',
          200: '#C4D1C3',
          300: '#94A992',
          400: '#5C745A',
          500: '#3D503C',
          600: '#2D3E2C',
          700: '#243323',
          800: '#1B271A',
          900: '#131D13',
          950: '#0B110B',
        },
        gold: {
          DEFAULT: '#B08A45', // Accent specified in brief
          50: '#FBF8F0',
          100: '#F5EEDD',
          200: '#EBDBBA',
          300: '#DFC490',
          400: '#C8A35E',
          500: '#B08A45',
          600: '#967134',
          700: '#7A5828',
          800: '#604420',
          900: '#483218',
        },
        sand: {
          DEFAULT: '#E6DEC8',
          light: '#F0EBE0',
          dark: '#D8CCA8',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        heading: ['"Cinzel"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Montserrat', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(36, 51, 35, 0.08)',
        'luxury-hover': '0 20px 40px -15px rgba(36, 51, 35, 0.15)',
        'gold-glow': '0 0 25px rgba(176, 138, 69, 0.25)',
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(135deg, #B08A45 0%, #DFCA8C 50%, #B08A45 100%)',
        'subtle-cream': 'radial-gradient(circle at 50% 0%, #FFFFFF 0%, #F5F0E7 100%)',
      }
    },
  },
  plugins: [],
}
