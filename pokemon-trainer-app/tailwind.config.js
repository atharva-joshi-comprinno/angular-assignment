module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'dark:bg-gray-700',
    'dark:bg-gray-800', 
    'dark:bg-gray-900',
    'dark:bg-gray-600',
    'dark:text-white',
    'dark:text-gray-300',
    'dark:border-gray-600',
    'dark:hover:bg-gray-600',
    'dark:hover:bg-purple-800',
    'dark:hover:text-white',
    'dark:bg-red-900'
  ]
}
