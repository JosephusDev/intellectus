```bash
npm create vite@latest
```

```bash
npm init @eslint/config@latest
```

```bash
npm install --save-dev eslint-config-prettier
```

```js
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintConfigPrettier from 'eslint-eslint-prettier'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  { extends: ['eslint:recommended', 'plugin:react/recommended'] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
]
```

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## tailwindcss.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## index.css

```css
@font-face {
  font-family: 'Montserrat';
  font-weight: normal;
  src:
    local('/Montserrat-Regular'),
    url('./assets/fonts/Montserrat-Regular.ttf') format('truetype');
}
@font-face {
  font-family: 'Montserrat';
  font-weight: bold;
  src:
    local('/Montserrat-Bold'),
    url('./assets/fonts/Montserrat-Bold.ttf') format('truetype');
}

html,
body {
  font-family: 'Montserrat', sans-serif;
}
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```tsx
import './index.css'

function App() {
  return <h2 className='text-2xl font-bold'>Olá Mundo</h2>
}

export default App
```

## tsconfig.json e dentro do compilerOptions em tsconfig.app.json

```json
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
```

```bash
# (pode resolver alguns erros de pastas de arquivos)
npm i -D @types/node
```

## vite.config.js

```ts
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

```bash
npx shadcn@latest init
```
