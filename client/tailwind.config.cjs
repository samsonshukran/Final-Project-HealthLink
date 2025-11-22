/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Health-themed color palette
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e3',
          200: '#bce5c9',
          300: '#8bd1a3',
          400: '#52b87a',
          500: '#2E8B57', // Sea Green - Health & Growth
          600: '#257a4a',
          700: '#1d623c',
          800: '#174e31',
          900: '#134029',
        },
        secondary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36abf6', // Trust & Calm Blue
          500: '#0c8ce6',
          600: '#026fc4',
          700: '#03579f',
          800: '#074983',
          900: '#0c3d6d',
        },
        accent: {
          50: '#fff6ed',
          100: '#ffebd4',
          200: '#ffd2a8',
          300: '#ffb271', // Warm Coral - Action & Care
          400: '#ff8a3c',
          500: '#ff6b21',
          600: '#f04d15',
          700: '#c73712',
          800: '#9e2c16',
          900: '#7f2616',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      },
      backgroundImage: {
        'gradient-health': 'linear-gradient(135deg, #2E8B57 0%, #36abf6 50%, #ff8a3c 100%)',
        'gradient-maternal': 'linear-gradient(135deg, #ffb271 0%, #ff8a3c 50%, #ff6b21 100%)',
        'gradient-baby': 'linear-gradient(135deg, #bae0fd 0%, #7cc8fb 50%, #36abf6 100%)',
      }
    },
  },
  plugins: [],
}