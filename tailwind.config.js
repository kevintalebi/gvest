module.exports = {
  theme: {
    extend: {
      colors: {
        gold: '#e0b646',         // Main gold accent
        'gold-dark': '#d4af37',  // Deeper gold for hover/active
        background: '#f7f7f7',   // Card/section background
        'gray-light': '#f5f5f5', // Lighter gray
        'gray-medium': '#e0e0e0',// Medium gray for borders
        'gray-dark': '#333333',  // Main text
        white: '#ffffff',
        error: '#e53935',        // Red for highlights
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(90deg, #e0b646 0%, #d4af37 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 8px 2px #e0b64644',
      },
      borderColor: {
        gold: '#ffd700',
      },
    },
  },
  plugins: [],
} 