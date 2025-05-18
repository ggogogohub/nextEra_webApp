module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      colors: {
        coralRed: '#E63946',
        offWhite: '#F1FAEE',
        lightCyan: '#A8DADC',
        darkBlue: '#457B9D',
        deepNavy: '#1D3557',
        brightTeal: '#02C39A',
      },
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.4rem',
        md: '0.8rem',
        lg: '1.2rem',
        round: '50%',
      },
      boxShadow: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        md: '0 4px 8px rgba(0,0,0,0.1)',
        lg: '0 8px 32px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
};
