/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./src/index.html",
    "./src/main.ts",
    "./src/app/**/*.{html,ts}",
    "./src/app/features/**/*.{html,ts}",
  ],
  safelist: [
    'focus:ring-indigo-500',
    'text-indigo-600',
    'bg-indigo-100',
    'border-indigo-600',
    'bg-indigo-600',
    'hover:bg-indigo-700',
    'text-gray-900',
    'text-gray-600',
    'text-gray-700',
    'bg-gray-50',
    'border-gray-300',
    'bg-gray-200',
    'text-green-600',
    'bg-green-50',
    'border-green-500',
    'text-red-600',
    'bg-red-50',
    'border-red-500',
  ],
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
