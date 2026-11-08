# PROJECT CODEBASE DUMP

## FILE: adrovis-web\.oxlintrc.json
```
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}

```

## FILE: adrovis-web\index.html
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>adrovis-web</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

## FILE: adrovis-web\package.json
```
{
  "name": "adrovis-web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.3.1",
    "react-dom": "^19.3.1"
  },
  "devDependencies": {
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "oxlint": "^1.89.0",
    "vite": "^8.3.5"
  }
}

```

## FILE: adrovis-web\README.md
```
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

```

## FILE: adrovis-web\src\App.css
```
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}

```

## FILE: adrovis-web\src\App.jsx
```
import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App

```

## FILE: adrovis-web\src\index.css
```
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }

  #social .button-icon {
    filter: invert(1) brightness(2);
  }
}

body {
  margin: 0;
}

#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
}
p {
  margin: 0;
}

code,
.counter {
  font-family: var(--mono);
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
}

code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}

```

## FILE: adrovis-web\src\main.jsx
```
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

```

## FILE: adrovis-web\vite.config.js
```
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

## FILE: codebase.md
```

==============================
FILE: .\adrovis-web\src\App.css
==============================
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}


==============================
FILE: .\adrovis-web\src\App.jsx
==============================
import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App


==============================
FILE: .\adrovis-web\src\index.css
==============================
:root {
  --text: #6b6375;
  --text-h: #08060d;
  --bg: #fff;
  --border: #e5e4e7;
  --code-bg: #f4f3ec;
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
  --shadow:
    rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;

  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;

  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --text: #9ca3af;
    --text-h: #f3f4f6;
    --bg: #16171d;
    --border: #2e303a;
    --code-bg: #1f2028;
    --accent: #c084fc;
    --accent-bg: rgba(192, 132, 252, 0.15);
    --accent-border: rgba(192, 132, 252, 0.5);
    --social-bg: rgba(47, 48, 58, 0.5);
    --shadow:
      rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
  }

  #social .button-icon {
    filter: invert(1) brightness(2);
  }
}

body {
  margin: 0;
}

#root {
  width: 1126px;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
  border-inline: 1px solid var(--border);
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

h1,
h2 {
  font-family: var(--heading);
  font-weight: 500;
  color: var(--text-h);
}

h1 {
  font-size: 56px;
  letter-spacing: -1.68px;
  margin: 32px 0;
  @media (max-width: 1024px) {
    font-size: 36px;
    margin: 20px 0;
  }
}
h2 {
  font-size: 24px;
  line-height: 118%;
  letter-spacing: -0.24px;
  margin: 0 0 8px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
}
p {
  margin: 0;
}

code,
.counter {
  font-family: var(--mono);
  display: inline-flex;
  border-radius: 4px;
  color: var(--text-h);
}

code {
  font-size: 15px;
  line-height: 135%;
  padding: 4px 8px;
  background: var(--code-bg);
}


==============================
FILE: .\adrovis-web\src\main.jsx
==============================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


==============================
FILE: .\adrovis-web\.oxlintrc.json
==============================
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}


==============================
FILE: .\adrovis-web\index.html
==============================
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>adrovis-web</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>


==============================
FILE: .\adrovis-web\package.json
==============================
{
  "name": "adrovis-web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.3.1",
    "react-dom": "^19.3.1"
  },
  "devDependencies": {
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "@vitejs/plugin-react": "^6.1.2",
    "oxlint": "^1.89.0",
    "vite": "^8.3.5"
  }
}


==============================
FILE: .\adrovis-web\vite.config.js
==============================
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


==============================
FILE: .\src\admin\AdminPage.jsx
==============================
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, Building2, Braces, RefreshCw, Search, Copy, Check, Phone, Mail, Instagram, CircleCheck, CircleAlert } from 'lucide-react';
import { fetchHealth, fetchCampaigns, fetchAgencies, getBackendUrl } from '../services/api';

const samplePayload = {
  brand_name: 'Minimalist',
  campaign_title: 'Minimalist 8% Glycolic Acid Exfoliating Glow Campaign 2026',
  campaign_type: 'PAID',
  brand_instagram_url: 'https://www.instagram.com/beminimalist__',
  application_form_url: 'https://forms.gle/HWCd4DqUaEEB6ryr9',
  images: ['https://example.com/image-1.jpg'],
  compensation: {
    summary: '\u20B93,000 - \u20B98,000', product_value: '\u20B9899', product_provided: true,
    terms: 'Payment cleared within 15 business days',
    tiers: [
      { range: '5k to 10k', min_followers: 5000, max_followers: 10000, payout: 3000 },
      { range: '25k+', min_followers: 25000, max_followers: null, payout: 8000 },
    ],
  },
  deliverables: ['1 IG Reel', '1 IG Story'],
  ad_rights: '60 Days Digital Ad Rights',
  categories: ['Skincare', 'Beauty', 'Lifestyle'],
};

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'agencies', label: 'Agencies', icon: Building2 },
  { id: 'payload', label: 'Payload reference', icon: Braces },
];

export default function AdminPage() {
  const [tab, setTab] = useState('overview');
  const [health, setHealth] = useState(null);
  const [campaignTotal, setCampaignTotal] = useState(null);
  const [agencies, setAgencies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = 'Admin | Adrovis';
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex,nofollow';
    document.head.appendChild(m);
    return () => { document.head.removeChild(m); document.title = 'Adrovis'; };
  }, []);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    const [h, c, a] = await Promise.allSettled([fetchHealth(), fetchCampaigns({ page: 0, size: 1 }), fetchAgencies()]);
    setHealth(h.status === 'fulfilled' ? { ok: true, ...h.value } : { ok: false, message: h.reason?.message });
    setCampaignTotal(c.status === 'fulfilled' ? c.value?.totalElements ?? 0 : null);
    if (a.status === 'fulfilled') setAgencies(a.value); else { setAgencies([]); setError(a.reason?.message); }
    setLoading(false);
  }, []);
  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return (agencies || []).filter((a) => [a.agencyName, a.contactPhone, a.contactEmail, a.instagramHandle].some((v) => v && v.toLowerCase().includes(t)));
  }, [agencies, q]);

  const copy = () => { navigator.clipboard.writeText(JSON.stringify(samplePayload, null, 2)); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return (
    <div className="min-h-screen bg-[#f4f4f7] text-[#17122f] md:flex">
      <aside className="md:w-64 md:min-h-screen bg-[#150f33] text-white p-5 md:p-6 flex md:block items-center justify-between gap-4">
        <div>
          <p className="text-xl font-extrabold">Adrovis admin</p>
          <p className="hidden md:block text-sm text-white/50 mt-1">Internal tools</p>
        </div>
        <nav className="flex md:flex-col gap-1 md:mt-8" aria-label="Admin">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-left transition-colors ${tab === id ? 'bg-violet-600 text-white' : 'text-white/70 hover:bg-white/10'}`}>
              <Icon className="w-4 h-4" /><span className="hidden sm:inline md:inline">{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-5 md:p-10 max-w-6xl">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-extrabold">{tabs.find((t) => t.id === tab).label}</h1>
          <button onClick={load} className="btn btn-outline"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
        </div>

        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="card p-5">
                <p className="text-sm text-[#5d5877]">API status</p>
                <p className="mt-2 flex items-center gap-2 text-xl font-extrabold">
                  {health === null ? 'Checking' : health.ok ? <><CircleCheck className="w-5 h-5 text-emerald-500" />Online</> : <><CircleAlert className="w-5 h-5 text-rose-500" />Unreachable</>}
                </p>
              </div>
              <div className="card p-5"><p className="text-sm text-[#5d5877]">Live campaigns</p><p className="mt-2 text-xl font-extrabold">{campaignTotal ?? '-'}</p></div>
              <div className="card p-5"><p className="text-sm text-[#5d5877]">Agencies in CRM</p><p className="mt-2 text-xl font-extrabold">{agencies ? agencies.length : '-'}</p></div>
            </div>
            <div className="card p-6">
              <h2 className="font-extrabold">Health check response</h2>
              <p className="text-sm text-[#5d5877] mt-1 break-all">{getBackendUrl()}/api/v1/health</p>
              <pre className="mt-4 p-4 rounded-xl bg-[#150f33] text-violet-100 text-sm overflow-x-auto">{JSON.stringify(health || { status: 'Checking' }, null, 2)}</pre>
            </div>
          </div>
        )}

        {tab === 'agencies' && (
          <div className="space-y-5">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, phone, email or handle" className="input !pl-10" aria-label="Search agencies" />
            </div>
            {error && <div className="card p-4 text-sm text-rose-700 border-rose-200">Could not load agencies: {error}</div>}
            {agencies === null ? <div className="skeleton h-40" /> : filtered.length === 0 ? (
              <div className="card p-10 text-center"><p className="font-bold">No agencies found</p><p className="text-sm text-[#5d5877] mt-1">Agencies are added automatically when a campaign brief with verified contact details is ingested.</p></div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((a) => (
                  <div key={a.id} className="card p-5 flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-extrabold text-lg">{a.agencyName}</h3>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 whitespace-nowrap">{a.activeCampaignsCount || 0} active</span>
                    </div>
                    {a.notes && <p className="text-sm text-[#5d5877] line-clamp-3">{a.notes}</p>}
                    <div className="mt-auto pt-4 border-t border-[#e7e3f2] space-y-2 text-sm">
                      {a.contactPhone && <p className="flex items-center gap-2"><Phone className="w-4 h-4 text-slate-400" />{a.contactPhone}</p>}
                      {a.contactEmail && <p className="flex items-center gap-2 min-w-0"><Mail className="w-4 h-4 text-slate-400 shrink-0" /><span className="truncate">{a.contactEmail}</span></p>}
                      {a.instagramHandle && <p className="flex items-center gap-2"><Instagram className="w-4 h-4 text-slate-400" />@{a.instagramHandle}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'payload' && (
          <div className="card p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm text-[#5d5877] max-w-xl">The JSON contract the ingestion bot sends to the Spring Boot service. The public site reads the stored result.</p>
              <button onClick={copy} className="btn btn-outline">{copied ? <><Check className="w-4 h-4" />Copied</> : <><Copy className="w-4 h-4" />Copy JSON</>}</button>
            </div>
            <pre className="mt-5 p-4 rounded-xl bg-[#150f33] text-violet-100 text-sm overflow-x-auto max-h-[520px]">{JSON.stringify(samplePayload, null, 2)}</pre>
          </div>
        )}
      </main>
    </div>
  );
}


==============================
FILE: .\src\components\campaign\CampaignCard.jsx
==============================
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowUpRight } from 'lucide-react';
import SafeImg from './SafeImg';
import PaidBadge from './PaidBadge';
import { payoutLabel, followersLabel, initials } from '../../utils/format';

export default function CampaignCard({ campaign }) {
  return (
    <Link to={`/campaigns/${campaign.id}`} className="card group overflow-hidden flex flex-col hover:-translate-y-0.5 transition-transform">
      <div className="relative aspect-[4/3] bg-violet-50 overflow-hidden">
        <SafeImg src={campaign.images?.[0]} alt={campaign.brandName} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
        <div className="absolute top-3 left-3"><PaidBadge campaign={campaign} /></div>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-[#150f33] text-white text-xs font-extrabold grid place-items-center">{initials(campaign.brandName)}</span>
          <span className="font-bold text-sm">{campaign.brandName}</span>
        </div>
        <h3 className="font-extrabold text-lg leading-snug line-clamp-2">{campaign.campaignTitle}</h3>
        <div className="mt-auto flex items-end justify-between pt-4 border-t border-[#e7e3f2]">
          <div>
            <p className="text-xs text-[#5d5877] font-medium">Payout</p>
            <p className="text-lg font-extrabold text-violet-700">{payoutLabel(campaign)}</p>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[#3d3856]"><Users className="w-4 h-4 text-violet-600" />{followersLabel(campaign)}</div>
          <ArrowUpRight className="w-5 h-5 text-violet-600" />
        </div>
      </div>
    </Link>
  );
}

export function CampaignCardSkeleton() {
  return <div className="card overflow-hidden"><div className="skeleton h-48 rounded-none" /><div className="p-5 space-y-3"><div className="skeleton h-5 w-1/3" /><div className="skeleton h-6" /><div className="skeleton h-10" /></div></div>;
}


==============================
FILE: .\src\components\campaign\CampaignRow.jsx
==============================
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, FileText, Wallet, Package, CalendarDays, Users, UserRound, MapPin } from 'lucide-react';
import SafeImg from './SafeImg';
import PaidBadge from './PaidBadge';
import { applyUrl } from '../../services/api';
import { comp, elig, sched, payoutLabel, followersLabel, genderLabel, formatDate, initials } from '../../utils/format';

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className="w-11 h-11 shrink-0 rounded-xl bg-violet-50 text-violet-600 grid place-items-center"><Icon className="w-5 h-5" /></span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#5d5877]">{label}</p>
        <p className="text-[15px] font-extrabold truncate">{value}</p>
      </div>
    </div>
  );
}

export default function CampaignRow({ campaign }) {
  const [i, setI] = useState(0);
  const images = campaign.images?.length ? campaign.images : [null];
  const c = comp(campaign), e = elig(campaign), s = sched(campaign);
  const notes = (campaign.importantRequirements?.length ? campaign.importantRequirements : campaign.deliverables || []).slice(0, 3);
  const locations = e.locations || [];
  const go = (d) => (ev) => { ev.preventDefault(); setI((p) => (p + d + images.length) % images.length); };
  const detail = `/campaigns/${campaign.id}`;

  return (
    <article className="card p-3 lg:p-4 grid gap-5 lg:grid-cols-[340px_1fr_330px]">
      {/* Gallery */}
      <div className="relative rounded-2xl overflow-hidden bg-violet-50 aspect-[4/3] lg:aspect-auto lg:min-h-[230px]">
        <Link to={detail} aria-label={`View ${campaign.campaignTitle}`}>
          <SafeImg src={images[i]} alt={campaign.brandName} className="absolute inset-0 w-full h-full object-cover" />
        </Link>
        {images.length > 1 && (
          <>
            <button onClick={go(-1)} aria-label="Previous image" className="absolute left-3 bottom-3 w-9 h-9 rounded-full bg-white/95 shadow grid place-items-center hover:bg-white"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={go(1)} aria-label="Next image" className="absolute right-3 bottom-3 w-9 h-9 rounded-full bg-white/95 shadow grid place-items-center hover:bg-white"><ChevronRight className="w-4 h-4" /></button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.slice(0, 6).map((_, k) => (
                <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main info */}
      <div className="min-w-0 flex flex-col justify-between gap-4 lg:py-1">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#150f33] text-white text-sm font-extrabold grid place-items-center">{initials(campaign.brandName)}</span>
            <span className="font-bold text-[15px]">{campaign.brandName}</span>
          </div>
          <div className="mt-3 flex items-start justify-between gap-3">
            <h3 className="text-xl font-extrabold leading-snug">
              <Link to={detail} className="hover:text-violet-700 transition-colors">{campaign.campaignTitle}</Link>
            </h3>
            <PaidBadge campaign={campaign} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#e7e3f2]">
          <Stat icon={Wallet} label="Payout" value={payoutLabel(campaign)} />
          <Stat icon={Package} label="Product provided" value={c.product_provided ? 'Yes' : 'No'} />
          <Stat icon={CalendarDays} label="Go live date" value={formatDate(s.go_live_date) || 'To be announced'} />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 rounded-2xl border border-[#e7e3f2] bg-[#faf9fe] p-4">
          <Stat icon={Users} label="Followers" value={followersLabel(campaign)} />
          <Stat icon={UserRound} label="Gender" value={genderLabel(campaign)} />
          <Stat icon={MapPin} label="Location" value={locations.length ? locations.slice(0, 3).join(', ') : 'Pan India'} />
        </div>
      </div>

      {/* Requirements + actions */}
      <div className="rounded-2xl bg-violet-50/70 p-4 flex flex-col justify-between gap-4">
        <div>
          <h4 className="flex items-center gap-2 font-extrabold text-[15px]"><FileText className="w-4 h-4 text-violet-600" />Key requirements</h4>
          {notes.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm text-[#3d3856] leading-snug">
              {notes.map((n, k) => (
                <li key={k} className="flex gap-2.5"><span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" /><span className="line-clamp-2">{n}</span></li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-[#5d5877]">Full brief is on the details page.</p>
          )}
        </div>
        <div className="flex gap-2">
          <Link to={detail} className="btn btn-outline flex-1">View details</Link>
          <a href={campaign.applyProxyUrl || applyUrl(campaign.id)} target="_blank" rel="noreferrer" className="btn btn-primary flex-1">
            Apply now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function CampaignRowSkeleton() {
  return (
    <div className="card p-4 grid gap-5 lg:grid-cols-[340px_1fr_330px]">
      <div className="skeleton h-56" />
      <div className="space-y-4"><div className="skeleton h-6 w-1/3" /><div className="skeleton h-8 w-4/5" /><div className="skeleton h-16" /><div className="skeleton h-20" /></div>
      <div className="skeleton h-56" />
    </div>
  );
}


==============================
FILE: .\src\components\campaign\PaidBadge.jsx
==============================
import React from 'react';
import { Banknote, Package } from 'lucide-react';
import { isPaid } from '../../utils/format';

export default function PaidBadge({ campaign }) {
  const paid = isPaid(campaign);
  const Icon = paid ? Banknote : Package;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-bold ${paid ? 'bg-violet-600 text-white' : 'bg-amber-100 text-amber-900'}`}>
      <Icon className="w-3.5 h-3.5" />
      {paid ? 'Paid' : 'Barter'}
    </span>
  );
}


==============================
FILE: .\src\components\campaign\SafeImg.jsx
==============================
import React from 'react';
import { FALLBACK_IMG } from '../../utils/format';

export default function SafeImg({ src, alt = '', className = '' }) {
  return (
    <img
      src={src || FALLBACK_IMG}
      alt={alt}
      loading="lazy"
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
      className={className}
    />
  );
}


==============================
FILE: .\src\components\layout\Footer.jsx
==============================
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const cols = [
  { title: 'Discover', items: [['Campaigns', '/campaigns'], ['Brands', '/brands'], ['How it works', '/how-it-works']] },
  { title: 'Creators', items: [['For creators', '/for-creators'], ['Paid collaborations', '/campaigns?type=PAID'], ['Barter campaigns', '/campaigns?type=BARTER']] },
];

export default function Footer() {
  return (
    <footer className="bg-[#150f33] text-white/70 mt-24">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="space-y-4 max-w-xs">
          <Logo />
          <p className="text-sm leading-relaxed">
            Verified brand collaborations for Indian creators, with the payout, deliverables and deadlines laid out before you apply.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-white font-bold text-sm mb-4">{c.title}</h4>
            <ul className="space-y-2.5 text-sm">
              {c.items.map(([label, to]) => (
                <li key={label}><Link to={to} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Contact</h4>
          <a href="mailto:contact@adrovis.com" className="text-sm hover:text-white transition-colors">contact@adrovis.com</a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 text-xs text-white/50">
          {new Date().getFullYear()} Adrovis Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


==============================
FILE: .\src\components\layout\Logo.jsx
==============================
import React from 'react';

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="4" y1="4" x2="28" y2="28">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
        <path d="M16 3 4 28h6.2l1.9-4.4h7.8l1.9 4.4H28L16 3Zm0 9.8 2.6 6H13.4l2.6-6Z" fill="url(#lg)" />
      </svg>
      <span className="text-[22px] font-extrabold tracking-tight text-white">Adrovis</span>
    </span>
  );
}


==============================
FILE: .\src\components\layout\Navbar.jsx
==============================
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/campaigns', label: 'Campaigns' },
  { to: '/brands', label: 'Brands' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/for-creators', label: 'For creators' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searching) inputRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && setSearching(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searching]);

  const submit = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/campaigns?brand=${encodeURIComponent(q.trim())}` : '/campaigns');
    setSearching(false);
    setQ('');
  };

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-[14px] font-semibold transition-colors ${
      isActive ? 'bg-violet-600 text-white shadow-[0_6px_18px_-8px_rgba(124,58,237,.9)]' : 'text-white/80 hover:text-white hover:bg-white/10'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all ${
        scrolled ? 'bg-[#150f33]/90 backdrop-blur-xl border-white/10' : 'bg-[#150f33] border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[68px] flex items-center justify-between gap-6">
        <Link to="/" aria-label="Adrovis home"><Logo /></Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>{l.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearching(true)}
            className="w-10 h-10 rounded-full grid place-items-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Search campaigns"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link to="/campaigns" className="hidden sm:inline-flex btn btn-primary !py-2.5">
            Explore campaigns <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-full grid place-items-center text-white hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#150f33] px-5 py-4 space-y-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)} className={({ isActive }) =>
              `block px-4 py-3 rounded-xl text-[15px] font-semibold ${isActive ? 'bg-violet-600 text-white' : 'text-white/80 hover:bg-white/10'}`}>
              {l.label}
            </NavLink>
          ))}
        </div>
      )}

      {searching && (
        <div className="fixed inset-0 z-50 bg-[#0c0820]/70 backdrop-blur-sm" onClick={() => setSearching(false)}>
          <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="max-w-2xl mx-auto mt-24 px-5">
            <div className="bg-white rounded-3xl p-3 shadow-2xl flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 ml-3" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search campaigns by brand name"
                className="flex-1 py-3 text-[16px] outline-none text-slate-900 placeholder-slate-400 bg-transparent"
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </div>
            <p className="text-center text-white/60 text-sm mt-3">Press Escape to close</p>
          </form>
        </div>
      )}
    </header>
  );
}


==============================
FILE: .\src\components\layout\PageHero.jsx
==============================
import React from 'react';

export default function PageHero({ title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden bg-[#150f33] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_85%_0%,rgba(139,92,246,.55),transparent_60%),radial-gradient(40%_60%_at_0%_100%,rgba(79,70,229,.35),transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20">
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-[1.08] max-w-2xl">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-white/75 max-w-xl leading-relaxed">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}


==============================
FILE: .\src\components\layout\PublicLayout.jsx
==============================
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}


==============================
FILE: .\src\pages\Brands.jsx
==============================
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import { fetchCampaigns } from '../services/api';
import { initials } from '../utils/format';

export default function Brands() {
  const [items, setItems] = useState(null);
  useEffect(() => { fetchCampaigns({ page: 0, size: 100 }).then((d) => setItems(d?.content || [])).catch(() => setItems([])); }, []);

  const brands = useMemo(() => {
    const map = new Map();
    (items || []).forEach((c) => {
      const b = map.get(c.brandName) || { name: c.brandName, count: 0, image: c.images?.[0] };
      b.count += 1; map.set(c.brandName, b);
    });
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [items]);

  return (
    <>
      <PageHero title="Brands hiring creators" subtitle="Every brand with an open campaign right now. Pick one to see all of its collaborations." />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-12">
        {items === null && <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-36" />)}</div>}
        {items && brands.length === 0 && <p className="text-[#5d5877]">No brands have live campaigns yet.</p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {brands.map((b) => (
            <Link key={b.name} to={`/campaigns?brand=${encodeURIComponent(b.name)}`} className="card p-6 group hover:-translate-y-0.5 transition-transform">
              <div className="flex items-start justify-between">
                <span className="w-12 h-12 rounded-xl bg-[#150f33] text-white text-lg font-extrabold grid place-items-center">{initials(b.name)}</span>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 transition-colors" />
              </div>
              <h3 className="mt-5 font-extrabold text-lg">{b.name}</h3>
              <p className="text-sm text-[#5d5877] mt-1">{b.count} live {b.count === 1 ? 'campaign' : 'campaigns'}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}


==============================
FILE: .\src\pages\CampaignDetails.jsx
==============================
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ChevronRight, ExternalLink, Wallet, Package, Users, UserRound, MapPin, CheckCircle2, CalendarDays, ShieldAlert, Share2, Check, Eye, MousePointerClick, AlertCircle, ArrowLeft } from 'lucide-react';
import SafeImg from '../components/campaign/SafeImg';
import PaidBadge from '../components/campaign/PaidBadge';
import CampaignCard from '../components/campaign/CampaignCard';
import { fetchCampaign, fetchCampaigns, applyUrl } from '../services/api';
import { comp, elig, sched, payoutLabel, followersLabel, genderLabel, formatDate, money, compact, initials } from '../utils/format';

function Section({ title, children }) {
  return <section className="card p-6 lg:p-7"><h2 className="text-xl font-extrabold mb-4">{title}</h2>{children}</section>;
}

function Fact({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className="w-11 h-11 shrink-0 rounded-xl bg-violet-50 text-violet-600 grid place-items-center"><Icon className="w-5 h-5" /></span>
      <div className="min-w-0"><p className="text-xs font-medium text-[#5d5877]">{label}</p><p className="font-extrabold truncate">{value}</p></div>
    </div>
  );
}

export default function CampaignDetails() {
  const { id } = useParams();
  const [c, setC] = useState(null);
  const [err, setErr] = useState(null);
  const [active, setActive] = useState(0);
  const [related, setRelated] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    setC(null); setErr(null); setActive(0); setRelated([]);
    fetchCampaign(id)
      .then((d) => {
        if (!alive) return;
        setC(d);
        document.title = `${d.campaignTitle} | Adrovis`;
        const cat = d.categories?.[0];
        return fetchCampaigns({ category: cat, size: 4 }).then((p) => alive && setRelated((p?.content || []).filter((x) => x.id !== d.id).slice(0, 3)));
      })
      .catch((e) => alive && setErr(e.message));
    return () => { alive = false; document.title = 'Adrovis'; };
  }, [id]);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: c.campaignTitle, url: window.location.href });
      else { await navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    } catch { /* cancelled */ }
  };

  if (err) {
    return (
      <div className="max-w-xl mx-auto px-5 py-28 text-center">
        <span className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 grid place-items-center mx-auto"><AlertCircle className="w-7 h-7" /></span>
        <h1 className="mt-5 text-2xl font-extrabold">This campaign is not available</h1>
        <p className="mt-2 text-[#5d5877]">It may have expired or been removed. Browse the live campaigns instead.</p>
        <Link to="/campaigns" className="btn btn-primary mt-6"><ArrowLeft className="w-4 h-4" />Back to campaigns</Link>
      </div>
    );
  }

  if (!c) {
    return (
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="space-y-6"><div className="skeleton h-[420px]" /><div className="skeleton h-40" /><div className="skeleton h-56" /></div>
        <div className="skeleton h-80" />
      </div>
    );
  }

  const cp = comp(c), e = elig(c), s = sched(c);
  const images = c.images?.length ? c.images : [null];
  const tiers = cp.tiers || [];
  const apply = c.applyProxyUrl || applyUrl(c.id);
  const timeline = [
    ['Applications close', s.application_deadline],
    ['Draft submission', s.submission_deadline],
    ['Go live', s.go_live_date],
  ].filter(([, v]) => v);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-8">
      <nav className="flex items-center gap-1.5 text-sm text-[#5d5877]" aria-label="Breadcrumb">
        <Link to="/campaigns" className="hover:text-violet-700 font-medium">Campaigns</Link><ChevronRight className="w-4 h-4" />
        <span className="font-medium">{c.brandName}</span>
      </nav>

      <div className="mt-5 grid lg:grid-cols-[1fr_380px] gap-8 items-start">
        <div className="space-y-6 min-w-0">
          {/* Gallery */}
          <div className="card p-3">
            <div className="relative rounded-2xl overflow-hidden bg-violet-50 aspect-[16/10]">
              <SafeImg src={images[active]} alt={c.brandName} className="absolute inset-0 w-full h-full object-contain" />
            </div>
            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar">
                {images.map((img, k) => (
                  <button key={k} onClick={() => setActive(k)} aria-label={`Show image ${k + 1}`} className={`w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${k === active ? 'border-violet-600' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                    <SafeImg src={img} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title block */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-[#150f33] text-white font-extrabold grid place-items-center">{initials(c.brandName)}</span>
              <span className="font-bold">{c.brandName}</span>
              <PaidBadge campaign={c} />
              {c.brandInstagramUrl && <a href={c.brandInstagramUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-violet-700 hover:underline inline-flex items-center gap-1">Brand Instagram<ExternalLink className="w-3.5 h-3.5" /></a>}
            </div>
            <h1 className="mt-4 text-3xl lg:text-4xl font-extrabold leading-tight">{c.campaignTitle}</h1>
            {c.productName && <p className="mt-2 text-[#5d5877]">Product: <span className="font-semibold text-[#17122f]">{c.productName}</span></p>}
            {c.categories?.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{c.categories.map((x) => <Link key={x} to={`/campaigns?category=${encodeURIComponent(x)}`} className="chip !py-1.5">{x}</Link>)}</div>}
          </div>

          <div className="card p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Fact icon={Wallet} label="Payout" value={payoutLabel(c)} />
            <Fact icon={Package} label="Product provided" value={cp.product_provided ? (cp.product_value ? `Yes, worth ${cp.product_value}` : 'Yes') : 'No'} />
            <Fact icon={Users} label="Followers" value={followersLabel(c)} />
            <Fact icon={UserRound} label="Gender" value={genderLabel(c)} />
          </div>

          {tiers.length > 0 && (
            <Section title="Payout by follower count">
              <div className="overflow-x-auto -mx-2">
                <table className="w-full text-left text-[15px]">
                  <thead><tr className="text-sm text-[#5d5877] border-b border-[#e7e3f2]"><th className="px-2 py-3 font-semibold">Tier</th><th className="px-2 py-3 font-semibold">Followers</th><th className="px-2 py-3 font-semibold text-right">Fixed payout</th></tr></thead>
                  <tbody>
                    {tiers.map((t, k) => (
                      <tr key={k} className="border-b border-[#f0edf8] last:border-0">
                        <td className="px-2 py-3.5 font-bold">{t.range}</td>
                        <td className="px-2 py-3.5 text-[#3d3856]">{t.min_followers ? compact(t.min_followers) : '0'} to {t.max_followers ? compact(t.max_followers) : 'no upper limit'}</td>
                        <td className="px-2 py-3.5 text-right font-extrabold text-violet-700">{money(t.payout)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {cp.terms && <p className="mt-4 text-sm text-[#5d5877]">{cp.terms}</p>}
            </Section>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <Section title="What you need to deliver">
              {c.deliverables?.length ? (
                <ul className="space-y-3">{c.deliverables.map((d, k) => <li key={k} className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" /><span>{d}</span></li>)}</ul>
              ) : <p className="text-[#5d5877]">Deliverables will be shared once you apply.</p>}
              {c.adRights && <p className="mt-5 pt-4 border-t border-[#e7e3f2] text-sm"><span className="font-bold">Ad rights: </span>{c.adRights}</p>}
            </Section>
            <Section title="Who can apply">
              <dl className="space-y-3 text-[15px]">
                <div className="flex justify-between gap-4"><dt className="text-[#5d5877]">Followers</dt><dd className="font-bold text-right">{followersLabel(c)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[#5d5877]">Gender</dt><dd className="font-bold text-right">{genderLabel(c)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-[#5d5877] flex items-center gap-1.5"><MapPin className="w-4 h-4" />Cities</dt><dd className="font-bold text-right">{e.locations?.length ? e.locations.join(', ') : 'Pan India'}</dd></div>
              </dl>
              {e.requirements?.length > 0 && <ul className="mt-5 pt-4 border-t border-[#e7e3f2] space-y-2 text-sm text-[#3d3856]">{e.requirements.map((r, k) => <li key={k} className="flex gap-2.5"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" />{r}</li>)}</ul>}
            </Section>
          </div>

          {timeline.length > 0 && (
            <Section title="Timeline">
              <ol className="relative border-l-2 border-violet-100 ml-2 space-y-6">
                {timeline.map(([label, v], k) => (
                  <li key={k} className="pl-6 relative">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-violet-600 ring-4 ring-white" />
                    <p className="text-sm text-[#5d5877]">{label}</p>
                    <p className="font-extrabold">{formatDate(v)}</p>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {c.importantRequirements?.length > 0 && (
            <section className="rounded-[22px] border border-amber-200 bg-amber-50 p-6 lg:p-7">
              <h2 className="text-xl font-extrabold flex items-center gap-2 text-amber-900"><ShieldAlert className="w-5 h-5" />Read before you apply</h2>
              <ul className="mt-4 space-y-2.5 text-amber-950/90">{c.importantRequirements.map((r, k) => <li key={k} className="flex gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />{r}</li>)}</ul>
            </section>
          )}

          {c.referenceLinks?.length > 0 && (
            <Section title="Reference links">
              <div className="flex flex-wrap gap-2">{c.referenceLinks.map((l, k) => <a key={k} href={l} target="_blank" rel="noreferrer" className="chip">Reference {k + 1}<ExternalLink className="w-3.5 h-3.5" /></a>)}</div>
            </Section>
          )}
        </div>

        {/* Sticky apply panel */}
        <aside className="lg:sticky lg:top-24 space-y-4">
          <div className="card p-6">
            <p className="text-sm font-medium text-[#5d5877]">Estimated payout</p>
            <p className="text-3xl font-extrabold text-violet-700 mt-1">{payoutLabel(c)}</p>
            {cp.product_value && <p className="mt-1 text-sm text-[#5d5877]">Plus a free product worth {cp.product_value}</p>}
            {cp.terms && <p className="mt-4 text-sm text-[#3d3856] leading-relaxed">{cp.terms}</p>}
            <a href={apply} target="_blank" rel="noreferrer" className="btn btn-primary w-full mt-6 !py-3.5 text-[15px]">Apply on official form<ArrowRight className="w-4 h-4" /></a>
            <button onClick={share} className="btn btn-outline w-full mt-3">{copied ? <><Check className="w-4 h-4" />Link copied</> : <><Share2 className="w-4 h-4" />Share this campaign</>}</button>
            <div className="mt-5 pt-4 border-t border-[#e7e3f2] grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-[#5d5877]"><Eye className="w-4 h-4" /><span><b className="text-[#17122f]">{compact(c.viewsCount || 0) || 0}</b> views</span></div>
              <div className="flex items-center gap-2 text-[#5d5877]"><MousePointerClick className="w-4 h-4" /><span><b className="text-[#17122f]">{compact(c.clicksCount || 0) || 0}</b> applications</span></div>
              {c.expiresAt && <div className="col-span-2 flex items-center gap-2 text-[#5d5877]"><CalendarDays className="w-4 h-4" />Listing expires {formatDate(c.expiresAt)}</div>}
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between mb-6"><h2 className="text-2xl font-extrabold">More campaigns like this</h2><Link to="/campaigns" className="text-sm font-bold text-violet-700 hover:underline">See all</Link></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{related.map((r) => <CampaignCard key={r.id} campaign={r} />)}</div>
        </section>
      )}
    </div>
  );
}


==============================
FILE: .\src\pages\Campaigns.jsx
==============================
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, LayoutGrid, Sparkles, Shirt, Leaf, MonitorSmartphone, UtensilsCrossed, Plane, Camera, ChevronLeft, ChevronRight, RefreshCw, AlertCircle, SearchX, X } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import CampaignRow, { CampaignRowSkeleton } from '../components/campaign/CampaignRow';
import { fetchCampaigns } from '../services/api';

const CATEGORIES = [
  { label: 'All campaigns', value: '', icon: LayoutGrid },
  { label: 'Beauty and skincare', value: 'Beauty', icon: Sparkles },
  { label: 'Fashion', value: 'Fashion', icon: Shirt },
  { label: 'Lifestyle', value: 'Lifestyle', icon: Leaf },
  { label: 'Tech', value: 'Tech', icon: MonitorSmartphone },
  { label: 'Food and beverage', value: 'Food', icon: UtensilsCrossed },
  { label: 'Travel', value: 'Travel', icon: Plane },
  { label: 'UGC', value: 'UGC', icon: Camera },
];
const SORTS = [
  { label: 'Newest first', value: 'createdAt:desc' },
  { label: 'Most viewed', value: 'viewsCount:desc' },
  { label: 'Closing soon', value: 'expiresAt:asc' },
];
const PAGE_SIZE = 8;

export default function Campaigns() {
  const [params, setParams] = useSearchParams();
  const get = (k, d = '') => params.get(k) || d;
  const page = Number(get('page', 0));
  const category = get('category');
  const type = get('type');
  const brand = get('brand');
  const maxFollowers = get('maxFollowers');
  const minPayout = get('minPayout');
  const sort = get('sort', 'createdAt:desc');

  const [q, setQ] = useState(brand);
  const [showFilters, setShowFilters] = useState(false);
  const [state, setState] = useState({ loading: true, error: null, items: [], pages: 1, total: 0 });
  const [nonce, setNonce] = useState(0);

  const update = (patch, keepPage = false) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v === '' || v == null ? next.delete(k) : next.set(k, v)));
    if (!keepPage) next.delete('page');
    setParams(next, { replace: true });
  };

  useEffect(() => { setQ(brand); }, [brand]);
  useEffect(() => {
    const t = setTimeout(() => { if (q !== brand) update({ brand: q.trim() }); }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [q]);

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: null }));
    const [sortBy, sortDirection] = sort.split(':');
    fetchCampaigns({
      page, size: PAGE_SIZE, brand, category, campaignType: type,
      maxFollowers, minPayout, sortBy, sortDirection,
    })
      .then((d) => alive && setState({ loading: false, error: null, items: d?.content || [], pages: d?.totalPages || 1, total: d?.totalElements || 0 }))
      .catch((err) => alive && setState((s) => ({ ...s, loading: false, error: err.message })));
    return () => { alive = false; };
  }, [page, category, type, brand, maxFollowers, minPayout, sort, nonce]);

  const activeCount = [type, maxFollowers, minPayout].filter(Boolean).length;
  const clearAll = () => { setQ(''); setParams({}, { replace: true }); };

  return (
    <>
      <PageHero
        title="Discover brand campaigns and collaborations"
        subtitle="Paid opportunities, barter collaborations and product campaigns from verified brands, all in one place."
      />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        {/* Category rail */}
        <div className="-mt-7 relative z-10 card !rounded-full p-2.5 flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label="Categories">
          {CATEGORIES.map(({ label, value, icon: Icon }) => (
            <button key={label} role="tab" aria-selected={category === value} data-active={category === value} onClick={() => update({ category: value })} className="chip">
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </div>

        {/* Title + search */}
        <div className="mt-10 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div>
            <h2 className="text-3xl font-extrabold">Campaigns for creators</h2>
            <p className="text-[#5d5877] mt-1">
              {state.loading ? 'Loading campaigns' : `${state.total} live ${state.total === 1 ? 'campaign' : 'campaigns'}, each with transparent details.`}
            </p>
          </div>
          <div className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-[420px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by brand name" className="input !rounded-full !pl-11 !py-3" aria-label="Search by brand name" />
            </div>
            <button onClick={() => setShowFilters((v) => !v)} className="btn btn-outline" aria-expanded={showFilters}>
              <SlidersHorizontal className="w-4 h-4" />Filters
              {activeCount > 0 && <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-xs grid place-items-center">{activeCount}</span>}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="card mt-5 p-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block text-sm font-semibold">Campaign type
              <select className="input mt-2" value={type} onChange={(e) => update({ type: e.target.value })}>
                <option value="">All types</option><option value="PAID">Paid</option><option value="BARTER">Barter</option>
              </select>
            </label>
            <label className="block text-sm font-semibold">Follower range
              <select className="input mt-2" value={maxFollowers} onChange={(e) => update({ maxFollowers: e.target.value })}>
                <option value="">Any follower count</option><option value="5000">Up to 5k</option><option value="10000">Up to 10k</option><option value="25000">Up to 25k</option><option value="50000">Up to 50k</option>
              </select>
            </label>
            <label className="block text-sm font-semibold">Minimum payout
              <select className="input mt-2" value={minPayout} onChange={(e) => update({ minPayout: e.target.value })}>
                <option value="">Any payout</option><option value="1000">1,000 and above</option><option value="3000">3,000 and above</option><option value="5000">5,000 and above</option><option value="8000">8,000 and above</option>
              </select>
            </label>
            <label className="block text-sm font-semibold">Sort by
              <select className="input mt-2" value={sort} onChange={(e) => update({ sort: e.target.value })}>
                {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </label>
          </div>
        )}

        {(brand || category || activeCount > 0) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {brand && <button className="chip" onClick={() => update({ brand: '' })}>Brand: {brand}<X className="w-3.5 h-3.5" /></button>}
            {category && <button className="chip" onClick={() => update({ category: '' })}>Category: {category}<X className="w-3.5 h-3.5" /></button>}
            <button onClick={clearAll} className="text-sm font-semibold text-violet-700 hover:underline px-2">Clear all</button>
          </div>
        )}

        {/* List */}
        <div className="mt-6 space-y-5">
          {state.error && (
            <div className="card p-6 flex items-center justify-between gap-4 border-rose-200">
              <div className="flex items-center gap-3"><AlertCircle className="w-5 h-5 text-rose-500" /><div><p className="font-bold">We could not load campaigns</p><p className="text-sm text-[#5d5877]">{state.error}. Check your connection and try again.</p></div></div>
              <button className="btn btn-outline" onClick={() => setNonce((n) => n + 1)}><RefreshCw className="w-4 h-4" />Try again</button>
            </div>
          )}
          {state.loading && Array.from({ length: 3 }).map((_, i) => <CampaignRowSkeleton key={i} />)}
          {!state.loading && !state.error && state.items.length === 0 && (
            <div className="card py-20 text-center px-6">
              <span className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 grid place-items-center mx-auto"><SearchX className="w-7 h-7" /></span>
              <h3 className="mt-5 text-xl font-extrabold">No campaigns match these filters</h3>
              <p className="mt-2 text-[#5d5877] max-w-sm mx-auto">Widen the follower or payout range, or clear the search to see every live campaign.</p>
              <button onClick={clearAll} className="btn btn-primary mt-6">Clear all filters</button>
            </div>
          )}
          {!state.loading && state.items.map((c) => <CampaignRow key={c.id} campaign={c} />)}
        </div>

        {state.pages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
            <button disabled={page === 0} onClick={() => update({ page: page - 1 }, true)} className="btn btn-outline disabled:opacity-40"><ChevronLeft className="w-4 h-4" />Previous</button>
            <span className="text-sm font-semibold text-[#5d5877]">Page {page + 1} of {state.pages}</span>
            <button disabled={page >= state.pages - 1} onClick={() => update({ page: page + 1 }, true)} className="btn btn-outline disabled:opacity-40">Next<ChevronRight className="w-4 h-4" /></button>
          </nav>
        )}
      </div>
    </>
  );
}


==============================
FILE: .\src\pages\ForCreators.jsx
==============================
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/layout/PageHero';

const faqs = [
  ['Do I need a minimum follower count?', 'It depends on the campaign. Each listing shows its follower requirement, and you can filter by follower range.'],
  ['Is there a fee to apply?', 'No. Applying is free and happens on the brand or agency form.'],
  ['When do I get paid?', 'Payment terms are stated on every paid campaign, for example payment within 15 business days of go live.'],
  ['What is barter?', 'Barter campaigns give you a product in exchange for content. There is no cash payout.'],
];
const perks = ['Payout and tiers shown before you apply', 'Filters for follower range, payout and category', 'Deliverables and ad rights spelled out', 'Direct application with the brand or agency'];

export default function ForCreators() {
  return (
    <>
      <PageHero title="Built for creators of every size" subtitle="From 5k followers to 500k, find collaborations that respect your time and your audience." />
      <div className="max-w-5xl mx-auto px-5 lg:px-8 mt-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-extrabold">What you get</h2>
          <ul className="mt-5 space-y-4">{perks.map((p) => <li key={p} className="flex gap-3"><span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 grid place-items-center shrink-0"><Check className="w-3.5 h-3.5" /></span>{p}</li>)}</ul>
          <Link to="/campaigns" className="btn btn-primary mt-8">Find your campaign<ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold">Common questions</h2>
          <div className="mt-5 space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="card px-5 py-4 group">
                <summary className="font-bold cursor-pointer list-none flex justify-between gap-3">{q}<span className="text-violet-600 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
                <p className="mt-3 text-[#5d5877] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


==============================
FILE: .\src\pages\Home.jsx
==============================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ShieldCheck, Wallet, FileText } from 'lucide-react';
import CampaignCard, { CampaignCardSkeleton } from '../components/campaign/CampaignCard';
import SafeImg from '../components/campaign/SafeImg';
import { fetchCampaigns } from '../services/api';
import { payoutLabel } from '../utils/format';

const steps = [
  { t: 'Browse verified campaigns', d: 'Every listing shows payout, deliverables, eligibility and dates up front.' },
  { t: 'Check that you qualify', d: 'Filter by follower count, location and minimum payout so you only see deals that fit.' },
  { t: 'Apply on the official form', d: 'You apply directly with the brand or agency. No middlemen, no sign-up wall.' },
];

export default function Home() {
  const [items, setItems] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCampaigns({ page: 0, size: 6 })
      .then((d) => { setItems(d?.content || []); setTotal(d?.totalElements || 0); })
      .catch(() => setItems([]));
  }, []);

  const featured = (items || []).slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden bg-[#150f33] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(55%_80%_at_80%_20%,rgba(139,92,246,.6),transparent_62%),radial-gradient(40%_60%_at_5%_100%,rgba(79,70,229,.35),transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-center">
          <div>
            <h1 className="text-[40px] sm:text-5xl lg:text-[58px] font-extrabold leading-[1.05]">Brand deals with the payout in plain sight</h1>
            <p className="mt-6 text-lg text-white/75 max-w-lg leading-relaxed">
              Paid collaborations, barter deals and product campaigns from brands you know, with every requirement spelled out before you apply.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/campaigns" className="btn btn-primary !py-3.5 !px-7 text-[15px]">Explore campaigns<ArrowRight className="w-4 h-4" /></Link>
              <Link to="/how-it-works" className="btn btn-light !py-3.5 !px-7 text-[15px]"><Play className="w-4 h-4" />How it works</Link>
            </div>
            <p className="mt-8 text-sm text-white/60">{total > 0 ? `${total} campaigns live right now` : 'New campaigns are added every week'}</p>
          </div>

          {/* The memorable moment: real campaigns, stacked */}
          <div className="relative h-[360px] hidden lg:block" aria-hidden="true">
            {items === null && <div className="skeleton h-full opacity-20" />}
            {featured.map((c, k) => (
              <Link key={c.id} to={`/campaigns/${c.id}`} tabIndex={-1}
                className={`absolute w-[300px] rounded-3xl bg-white text-[#17122f] shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)] overflow-hidden transition-transform hover:-translate-y-1 ${k === 0 ? 'right-0 top-0 rotate-[3deg]' : 'left-0 bottom-0 -rotate-[4deg]'}`}>
                <div className="h-40 bg-violet-50"><SafeImg src={c.images?.[0]} alt="" className="w-full h-full object-cover" /></div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-[#5d5877]">{c.brandName}</p>
                  <p className="font-extrabold leading-snug line-clamp-2 mt-0.5">{c.campaignTitle}</p>
                  <p className="mt-3 text-violet-700 font-extrabold">{payoutLabel(c)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 mt-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div><h2 className="text-3xl font-extrabold">Latest campaigns</h2><p className="text-[#5d5877] mt-1">Freshly verified and open for applications.</p></div>
          <Link to="/campaigns" className="btn btn-outline hidden sm:inline-flex">View all<ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items === null ? Array.from({ length: 3 }).map((_, i) => <CampaignCardSkeleton key={i} />) : items.slice(0, 3).map((c) => <CampaignCard key={c.id} campaign={c} />)}
        </div>
        {items && items.length === 0 && <p className="text-[#5d5877]">No campaigns are live at the moment. Check back soon.</p>}
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 mt-24 grid lg:grid-cols-[.8fr_1.2fr] gap-12">
        <div>
          <h2 className="text-3xl font-extrabold leading-tight">Three steps from scroll to apply</h2>
          <p className="mt-3 text-[#5d5877] max-w-sm">We keep the process short because your time is better spent creating.</p>
        </div>
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={s.t} className="card p-6 flex gap-5">
              <span className="w-10 h-10 shrink-0 rounded-full bg-violet-600 text-white font-extrabold grid place-items-center">{i + 1}</span>
              <div><h3 className="font-extrabold text-lg">{s.t}</h3><p className="mt-1 text-[#5d5877]">{s.d}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-7xl mx-auto px-5 lg:px-8 mt-24 grid md:grid-cols-3 gap-6">
        {[
          [Wallet, 'Clear payouts', 'Fixed amounts and follower tiers are shown on every campaign.'],
          [FileText, 'Full briefs', 'Deliverables, ad rights and deadlines before you commit.'],
          [ShieldCheck, 'Verified listings', 'Campaigns come from brands and agencies we have checked.'],
        ].map(([Icon, t, d]) => (
          <div key={t} className="card p-7"><span className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 grid place-items-center"><Icon className="w-6 h-6" /></span><h3 className="mt-5 text-lg font-extrabold">{t}</h3><p className="mt-2 text-[#5d5877]">{d}</p></div>
        ))}
      </section>
    </>
  );
}


==============================
FILE: .\src\pages\HowItWorks.jsx
==============================
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/layout/PageHero';

const steps = [
  ['Find a campaign', 'Browse by category or search by brand. Filter by follower count and minimum payout to see only what fits your profile.'],
  ['Read the full brief', 'The details page lists the payout, follower tiers, deliverables, ad rights, eligibility and every deadline.'],
  ['Apply on the official form', 'Apply Now takes you to the brand or agency form. Your application goes straight to them.'],
  ['Create and get paid', 'Follow the brief, submit your draft by the deadline and go live on the date given. Payment terms are shown on each campaign.'],
];

export default function HowItWorks() {
  return (
    <>
      <PageHero title="How Adrovis works" subtitle="A simple path from finding a campaign to getting paid for it." />
      <div className="max-w-3xl mx-auto px-5 lg:px-8 mt-14">
        <ol className="space-y-5">
          {steps.map(([t, d], i) => (
            <li key={t} className="card p-7 flex gap-6">
              <span className="w-11 h-11 shrink-0 rounded-full bg-violet-600 text-white font-extrabold grid place-items-center">{i + 1}</span>
              <div><h2 className="text-xl font-extrabold">{t}</h2><p className="mt-2 text-[#5d5877] leading-relaxed">{d}</p></div>
            </li>
          ))}
        </ol>
        <div className="text-center mt-12"><Link to="/campaigns" className="btn btn-primary !py-3.5 !px-8">Browse campaigns<ArrowRight className="w-4 h-4" /></Link></div>
      </div>
    </>
  );
}


==============================
FILE: .\src\pages\NotFound.jsx
==============================
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-5 py-32 text-center">
      <h1 className="text-4xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-[#5d5877]">The page you are looking for does not exist or has moved.</p>
      <Link to="/campaigns" className="btn btn-primary mt-8">Browse campaigns</Link>
    </div>
  );
}


==============================
FILE: .\src\services\api.js
==============================
const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');
const API = `${BASE}/api/v1`;

export const getBackendUrl = () => BASE;
export const applyUrl = (id) => `${API}/campaigns/${id}/apply`;

async function request(path, params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, v);
  });
  const url = `${API}${path}${qs.toString() ? `?${qs}` : ''}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const body = await res.json();
  if (body && body.success === false) throw new Error(body.message || 'Request failed');
  return body;
}

export const fetchHealth = () => request('/health');
export const fetchCampaigns = async (filter) => (await request('/campaigns', filter)).data;
export const fetchCampaign = async (id) => (await request(`/campaigns/${id}`)).data;
export const fetchAgencies = async () => (await request('/agencies')).data || [];


==============================
FILE: .\src\utils\format.js
==============================
export const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ede9fe"/><stop offset="1" stop-color="#c4b5fd"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/></svg>`
  );

export const compact = (n) => {
  if (n == null) return '';
  if (n >= 1e6) return `${+(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${+(n / 1e3).toFixed(1)}k`;
  return String(n);
};

export const comp = (c) => c?.compensation || {};
export const elig = (c) => c?.eligibility || {};
export const sched = (c) => c?.schedule || {};
export const isPaid = (c) => c?.campaignType === 'PAID';

export const payoutLabel = (c) => comp(c).summary || (isPaid(c) ? 'Cash payout' : 'Product barter');

export const followersLabel = (c) => {
  const e = elig(c);
  return e.followers_label || (e.min_followers ? `${compact(e.min_followers)}+` : 'Open to all');
};

export const genderLabel = (c) => {
  const g = elig(c).gender;
  if (!g || g === 'NOT_SPECIFIED' || g.toLowerCase() === 'any') return 'Any';
  return g.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (m) => m.toUpperCase());
};

export const formatDate = (v) => {
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const money = (n) => (typeof n === 'number' ? `\u20B9${n.toLocaleString('en-IN')}` : n);
export const initials = (s = '') => s.trim().charAt(0).toUpperCase() || 'B';


==============================
FILE: .\src\App.jsx
==============================
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CampaignDetails from './pages/CampaignDetails';
import Brands from './pages/Brands';
import HowItWorks from './pages/HowItWorks';
import ForCreators from './pages/ForCreators';
import NotFound from './pages/NotFound';
import AdminPage from './admin/AdminPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin is fully separate: own layout, no public navbar */}
        <Route path="/admin" element={<AdminPage />} />

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetails />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/for-creators" element={<ForCreators />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


==============================
FILE: .\src\index.css
==============================
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ink: #17122f;
  --ink-soft: #5d5877;
  --line: #e7e3f2;
  --surface: #ffffff;
  --canvas: #f6f4fb;
  --night: #150f33;
  --violet: #6d28d9;
  --violet-deep: #4c1d95;
  --violet-tint: #f1ebfd;
}

html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--canvas);
  color: var(--ink);
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.005em;
}
h1, h2, h3, h4 { letter-spacing: -0.02em; }
:focus-visible { outline: 2px solid #8b5cf6; outline-offset: 2px; }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 11px 20px; border-radius: 999px; font-weight: 700; font-size: 14px;
  transition: transform .15s ease, background .2s ease, box-shadow .2s ease, border-color .2s ease;
  cursor: pointer; white-space: nowrap;
}
.btn:active { transform: scale(.98); }
.btn-primary {
  color: #fff; background: linear-gradient(180deg, #7c3aed 0%, #5b21b6 100%);
  box-shadow: 0 6px 18px -6px rgba(91, 33, 182, .65), inset 0 1px 0 rgba(255,255,255,.18);
}
.btn-primary:hover { background: linear-gradient(180deg, #8b5cf6 0%, #6d28d9 100%); }
.btn-outline { color: var(--ink); background: #fff; border: 1px solid var(--line); }
.btn-outline:hover { border-color: #c4b5fd; background: var(--violet-tint); }
.btn-light { color: #fff; border: 1px solid rgba(255,255,255,.35); background: rgba(255,255,255,.06); }
.btn-light:hover { background: rgba(255,255,255,.14); }

.card { background: var(--surface); border: 1px solid var(--line); border-radius: 22px; box-shadow: 0 1px 2px rgba(23,18,47,.04), 0 12px 32px -18px rgba(23,18,47,.18); }
.chip { display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; background: #fff; border: 1px solid var(--line); color: var(--ink); transition: all .2s ease; cursor: pointer; white-space: nowrap; }
.chip:hover { border-color: #c4b5fd; }
.chip[data-active='true'] { background: linear-gradient(180deg, #6d28d9, #4c1d95); color: #fff; border-color: transparent; box-shadow: 0 8px 20px -10px rgba(76,29,149,.8); }
.input { width: 100%; padding: 11px 14px; border-radius: 14px; border: 1px solid var(--line); background: #fff; font-size: 14px; color: var(--ink); }
.input:focus { outline: none; border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139,92,246,.18); }
.skeleton { background: linear-gradient(90deg, #eeeaf8 25%, #f7f5fc 50%, #eeeaf8 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 14px; }
@keyframes shimmer { to { background-position: -200% 0; } }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { scrollbar-width: none; }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }


==============================
FILE: .\package.json
==============================
{
  "dependencies": {
    "framer-motion": "^11.18.2",
    "lucide-react": "^1.66.0",
    "react-router-dom": "^7.18.5"
  }
}


==============================
FILE: .\vercel.json
==============================
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }


```

## FILE: index.html
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CreatorHub | Adrovis</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## FILE: package.json
```
{
  "name": "adrovis-influencer",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.18.2",
    "lucide-react": "^1.66.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "vite": "^6.0.7"
  }
}
```

## FILE: postcss.config.js
```
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## FILE: README.md
```
# Adrovis frontend

1. Install: npm i react-router-dom lucide-react
2. Copy `src/` over your project's `src/` (remove the old AdminHub, AgenciesView, ExploreView, CampaignModal, CampaignCard files).
3. `main.jsx` should render `<App />` only. Do NOT wrap it in another BrowserRouter.
4. Copy `vercel.json` to the project root so /admin and /campaigns/:id work on refresh.
5. Set VITE_API_URL to your Render backend URL.
6. Tailwind v3 assumed. On Tailwind v4, replace the three @tailwind lines in index.css with: @import "tailwindcss";

```

## FILE: src\admin\AdminLayout.jsx
```
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Home, 
  Users2, 
  Users, 
  Layers, 
  BarChart3, 
  Target,
  Building2,
  Braces
} from 'lucide-react';
import { fetchDashboardOverview } from '../services/collectorApi';

const navItems = [
  { to: '/admin', label: 'Overview', icon: Home, end: true },
  { to: '/admin/creators', label: 'Creators', icon: Users2 },
  { to: '/admin/team', label: 'Team', icon: Users },
  { to: '/admin/submissions', label: 'Submissions', icon: Layers },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/agencies', label: 'Agencies', icon: Building2 },
  { to: '/admin/payload', label: 'Payload', icon: Braces },
];

export default function AdminLayout() {
  const [goal, setGoal] = useState({ current: 1400, target: 2000, percentage: 70 });

  useEffect(() => {
    fetchDashboardOverview('THIS_MONTH')
      .then((data) => {
        if (data?.teamGoal) {
          setGoal({
            current: data.teamGoal.current ?? 1400,
            target: data.teamGoal.target ?? 2000,
            percentage: data.teamGoal.percentage ?? 70,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f8fc] text-[#1e293b] flex font-sans antialiased">
      {/* Sidebar (Fixed 248px) */}
      <aside className="w-[248px] bg-white border-r border-[#e8ecf4] flex flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-30">
        <div>
          {/* Brand Header */}
          <div className="h-[74px] flex items-center gap-3 px-6 border-b border-[#f4f7fc]">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-base flex items-center justify-center shadow-sm shadow-blue-500/20">
              C
            </div>
            <div>
              <p className="font-bold text-[15px] text-slate-900 leading-none tracking-tight">CreatorHub</p>
              <p className="text-[11px] text-slate-400 font-normal mt-1">Influencer Collection</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3.5 space-y-1" aria-label="Sidebar Navigation">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] transition-colors ${
                    isActive
                      ? 'bg-[#eef4ff] text-[#2563eb] font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-normal'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Live Team Goal Widget */}
        <div className="p-4 m-3.5 rounded-2xl bg-gradient-to-b from-[#f9fbff] to-[#edf3ff] border border-blue-100/80">
          <div className="flex items-center gap-2 text-blue-700 text-[11px] font-semibold">
            <Target className="w-3.5 h-3.5 text-blue-600" />
            <span>Team Goal</span>
          </div>

          <div className="mt-2.5 flex items-baseline gap-1">
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              {goal.current.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400 font-normal">
              / {goal.target.toLocaleString()}
            </span>
          </div>

          <div className="w-full bg-blue-200/50 h-1.5 rounded-full mt-2.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-full rounded-full transition-all duration-500" 
              style={{ width: `${Math.min(100, goal.percentage)}%` }} 
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 font-medium">
            <span>This Month</span>
            <span className="text-blue-600 font-semibold">{goal.percentage}%</span>
          </div>
        </div>
      </aside>

      {/* Main View Shell */}
      <div className="flex-1 ml-[248px] min-w-0 flex flex-col">
        <main className="flex-1 p-6 max-w-[1520px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

## FILE: src\admin\AdminPage.jsx
```
import React, { useEffect, useMemo, useState } from 'react';
import { Search, Phone, Mail, RefreshCw } from 'lucide-react';
import { fetchAgencies } from '../services/api';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAgencies();
      setAgencies(data || []);
    } catch (e) {
      setError(e.message);
      setAgencies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return (agencies || []).filter((a) =>
      [a.agencyName, a.contactPhone, a.contactEmail, a.instagramHandle].some(
        (v) => v && v.toLowerCase().includes(t)
      )
    );
  }, [agencies, q]);

  const renderContent = () => {
    if (agencies === null) {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-44 bg-white rounded-2xl border border-slate-100 shadow-sm animate-pulse"
            />
          ))}
        </div>
      );
    }

    if (filtered.length === 0) {
      return (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <p className="font-extrabold text-slate-800">No agencies found</p>
          <p className="text-xs text-slate-400 mt-1">
            Agencies are registered automatically when verified campaigns are parsed.
          </p>
        </div>
      );
    }

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((a) => (
          <div
            key={a.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between gap-4 shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-black text-slate-900 text-base">{a.agencyName}</h3>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600">
                  {a.activeCampaignsCount || 0} active
                </span>
              </div>
              {a.notes && <p className="text-xs text-slate-500 mt-2 line-clamp-2">{a.notes}</p>}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-medium text-slate-600">
              {a.contactPhone && (
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {a.contactPhone}
                </p>
              )}
              {a.contactEmail && (
                <p className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{a.contactEmail}</span>
                </p>
              )}
              {a.instagramHandle && (
                <p className="flex items-center gap-2">
                  <InstagramIcon className="w-3.5 h-3.5 text-slate-400" />
                  @{a.instagramHandle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Agencies CRM</h1>
          <p className="text-slate-500 text-sm mt-1">Verified agency and brand partners submitting campaigns.</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm w-fit"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name, phone, email or handle"
          className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-blue-500 shadow-sm"
        />
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
          Could not load agencies: {error}
        </div>
      )}

      {renderContent()}
    </div>
  );
}
```

## FILE: src\admin\AgenciesPage.jsx
```
import React, { useEffect, useMemo, useState } from 'react';
import { Search, Phone, Mail, RefreshCw, ChevronDown } from 'lucide-react';
import { fetchAgencies } from '../services/api';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAgencies();
      setAgencies(data || []);
    } catch (e) {
      setError(e.message);
      setAgencies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const t = q.toLowerCase();
    return (agencies || []).filter((a) =>
      [a.agencyName, a.contactPhone, a.contactEmail, a.instagramHandle].some(
        (v) => v && v.toLowerCase().includes(t)
      )
    );
  }, [agencies, q]);

  return (
    <div className="space-y-6">
      {/* Top Header Matching CreatorHub */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Agencies</h1>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Registered agency partners and direct campaign submission sources.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={load}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200/80 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-sm transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              RM
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-black text-slate-900 leading-none">Rohan Mandal</p>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, phone, email or handle"
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-bold">
          Could not load agencies: {error}
        </div>
      )}

      {/* Grid of Agencies */}
      {agencies === null ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 bg-white rounded-2xl border border-slate-200/80 shadow-sm animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-sm">
          <p className="font-extrabold text-slate-800">No agencies found</p>
          <p className="text-xs text-slate-400 mt-1">Agencies appear here as new campaign briefs are ingested.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between gap-4 shadow-sm hover:border-blue-200 transition"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-black text-slate-900 text-base">{a.agencyName}</h3>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-blue-50 text-blue-600">
                    {a.activeCampaignsCount || 0} active
                  </span>
                </div>
                {a.notes && <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">{a.notes}</p>}
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-semibold text-slate-600">
                {a.contactPhone && (
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {a.contactPhone}
                  </p>
                )}
                {a.contactEmail && (
                  <p className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{a.contactEmail}</span>
                  </p>
                )}
                {a.instagramHandle && (
                  <p className="flex items-center gap-2">
                    <InstagramIcon className="w-3.5 h-3.5 text-slate-400" />
                    @{a.instagramHandle}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## FILE: src\admin\PayloadPage.jsx
```
import React, { useState } from 'react';
import { Copy, Check, Braces, ChevronDown } from 'lucide-react';

const samplePayload = {
  brand_name: 'Minimalist',
  campaign_title: 'Minimalist 8% Glycolic Acid Exfoliating Glow Campaign 2026',
  campaign_type: 'PAID',
  brand_instagram_url: 'https://www.instagram.com/beminimalist__',
  application_form_url: 'https://forms.gle/HWCd4DqUaEEB6ryr9',
  images: ['https://example.com/image-1.jpg'],
  compensation: {
    summary: 'â‚¹3,000 - â‚¹8,000',
    product_value: 'â‚¹899',
    product_provided: true,
    terms: 'Payment cleared within 15 business days',
    tiers: [
      { range: '5k to 10k', min_followers: 5000, max_followers: 10000, payout: 3000 },
      { range: '25k+', min_followers: 25000, max_followers: null, payout: 8000 },
    ],
  },
  deliverables: ['1 IG Reel', '1 IG Story'],
  ad_rights: '60 Days Digital Ad Rights',
  categories: ['Skincare', 'Beauty', 'Lifestyle'],
};

export default function PayloadPage() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(JSON.stringify(samplePayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Payload Reference</h1>
          <p className="text-slate-500 text-xs font-semibold mt-1">
            Contract schema required by the Spring Boot backend ingestion pipeline.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copy}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition shadow-sm"
          >
            {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy JSON</>}
          </button>

          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center">
              RM
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-black text-slate-900 leading-none">Rohan Mandal</p>
              <p className="text-[11px] font-bold text-slate-400 mt-0.5">Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <pre className="p-5 rounded-xl bg-slate-900 text-blue-200 text-xs font-mono overflow-x-auto max-h-[620px] leading-relaxed">
          {JSON.stringify(samplePayload, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## FILE: src\admin\SystemHealthPage.jsx
```
import React, { useEffect, useState } from 'react';
import { CircleCheck, CircleAlert, RefreshCw, Server, Database } from 'lucide-react';
import { fetchHealth, fetchCampaigns, getBackendUrl } from '../services/api';

export default function SystemHealthPage() {
  const [health, setHealth] = useState(null);
  const [campaignTotal, setCampaignTotal] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const [h, c] = await Promise.allSettled([
      fetchHealth(),
      fetchCampaigns({ page: 0, size: 1 })
    ]);
    setHealth(h.status === 'fulfilled' ? { ok: true, ...h.value } : { ok: false, message: h.reason?.message });
    setCampaignTotal(c.status === 'fulfilled' ? c.value?.totalElements ?? 0 : null);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">System & Backend Health</h1>
          <p className="text-slate-500 text-sm mt-1">Live status of Spring Boot microservices and database poolers.</p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary API Status</p>
          <div className="mt-2 flex items-center gap-2 text-xl font-black text-slate-900">
            {health === null ? (
              'Checking...'
            ) : health.ok ? (
              <><CircleCheck className="w-5 h-5 text-emerald-500" /> Online</>
            ) : (
              <><CircleAlert className="w-5 h-5 text-rose-500" /> Unreachable</>
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Ingested Campaigns</p>
          <p className="mt-2 text-2xl font-black text-slate-900">{campaignTotal ?? '-'}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Database Architecture</p>
          <p className="mt-2 text-base font-black text-blue-600 flex items-center gap-2">
            <Database className="w-4 h-4" /> Dual Supabase Pooler
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-slate-500" /> Health Check Endpoint
          </h2>
          <span className="text-xs font-mono text-slate-400">{getBackendUrl()}/api/v1/health</span>
        </div>
        <pre className="mt-3 p-4 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono overflow-x-auto">
          {JSON.stringify(health || { status: 'Checking...' }, null, 2)}
        </pre>
      </div>
    </div>
  );
}
```

## FILE: src\admin\TeamPage.jsx
```
import React, { useEffect, useState } from 'react';
import { Users, CheckCircle2, Shield, Calendar, RefreshCw } from 'lucide-react';
import { fetchTeamMembers } from '../services/collectorApi';

export default function TeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchTeamMembers()
      .then((data) => setMembers(data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-5 text-slate-800 antialiased font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Team Members</h1>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Verified team members collecting creators and submitting campaign leads.
          </p>
        </div>

        <button
          onClick={load}
          className="flex items-center gap-1.5 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                    {m.displayName?.slice(0, 2).toUpperCase() || 'TM'}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-tight">{m.displayName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {m.telegramUsername ? `@${m.telegramUsername}` : 'Telegram Member'}
                    </p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                  m.role === 'admin' ? 'bg-purple-50 text-purple-700 border border-purple-100' : 'bg-slate-100 text-slate-600'
                }`}>
                  {m.role || 'Member'}
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-slate-400" /> Telegram ID</span>
                <span className="font-mono text-slate-700">{m.telegramUserId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Status</span>
                <span className="font-semibold text-emerald-600">{m.active ? 'Active' : 'Inactive'}</span>
              </div>
              {m.createdAt && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-400" /> Joined</span>
                  <span className="text-slate-600">{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## FILE: src\App.jsx
```
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/Home';
import Campaigns from './pages/Campaigns';
import CampaignDetails from './pages/CampaignDetails';
import Brands from './pages/Brands';
import HowItWorks from './pages/HowItWorks';
import ForCreators from './pages/ForCreators';
import NotFound from './pages/NotFound';

import AdminLayout from './admin/AdminLayout';
import OverviewPage from './collector/OverviewPage';
import CreatorsPage from './collector/CreatorsPage';
import TeamPage from './admin/TeamPage';
import AgenciesPage from './admin/AgenciesPage';
import PayloadPage from './admin/PayloadPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="creators" element={<CreatorsPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="submissions" element={<CreatorsPage />} />
          <Route path="analytics" element={<OverviewPage />} />
          <Route path="agencies" element={<AgenciesPage />} />
          <Route path="payload" element={<PayloadPage />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetails />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/for-creators" element={<ForCreators />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

## FILE: src\collector\CollectorLayout.jsx
```
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users2, UserCheck, Layers, BarChart3, Target } from 'lucide-react';

const navItems = [
  { to: '/collector', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/collector/creators', label: 'Creators', icon: Users2 },
  { to: '/collector/team', label: 'Team', icon: UserCheck },
  { to: '/collector/submissions', label: 'Submissions', icon: Layers },
  { to: '/collector/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function CollectorLayout() {
  return (
    <div className="min-h-screen bg-[#f4f7fc] text-[#1e293b] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e5e9f2] flex flex-col justify-between shrink-0 fixed inset-y-0 left-0 z-30">
        <div>
          {/* Brand Monogram Header */}
          <div className="h-20 flex items-center gap-3 px-6 border-b border-[#f1f4f9]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-500/20">
              C
            </div>
            <div>
              <p className="font-extrabold text-[17px] text-[#0f172a] tracking-tight leading-none">CreatorHub</p>
              <p className="text-[12px] font-semibold text-slate-400 mt-1">Influencer Collection</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Collector Navigation">
            {navItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/10'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Team Goal Card */}
        <div className="p-4 m-4 rounded-2xl bg-gradient-to-b from-[#f8faff] to-[#edf3ff] border border-blue-100/80">
          <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" /> Team Goal
          </div>
          <p className="mt-2 text-2xl font-black text-slate-900 tracking-tight">1,400 <span className="text-sm font-semibold text-slate-400">/ 2,000</span></p>
          <div className="w-full bg-blue-200/50 h-2 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: '70%' }} />
          </div>
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mt-2">
            <span>This Month</span>
            <span className="text-blue-600 font-bold">70%</span>
          </div>
        </div>
      </aside>

      {/* Main View Shell */}
      <div className="flex-1 ml-64 min-w-0 flex flex-col">
        <main className="flex-1 p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
```

## FILE: src\collector\CreatorsPage.jsx
```
import React, { useEffect, useState } from 'react';
import { 
  Users, Mail, MapPin, Layers, Search, Download, 
  Calendar, ChevronDown, ChevronLeft, ChevronRight, 
  SlidersHorizontal, ExternalLink, MoreHorizontal
} from 'lucide-react';
import { fetchCreatorsTable, fetchTeamMembers, getExportCsvUrl } from '../services/collectorApi';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const getNicheBadgeStyle = (niche) => {
  const n = (niche || '').toLowerCase();
  if (n.includes('model')) return 'bg-purple-50 text-purple-700 border-purple-100/80';
  if (n.includes('fashion')) return 'bg-rose-50 text-rose-600 border-rose-100/80';
  if (n.includes('fitness')) return 'bg-emerald-50 text-emerald-700 border-emerald-100/80';
  if (n.includes('travel')) return 'bg-sky-50 text-sky-700 border-sky-100/80';
  if (n.includes('beauty')) return 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100/80';
  if (n.includes('food')) return 'bg-emerald-50 text-emerald-700 border-emerald-100/80';
  if (n.includes('lifestyle')) return 'bg-orange-50 text-orange-700 border-orange-100/80';
  if (n.includes('tech')) return 'bg-blue-50 text-blue-700 border-blue-100/80';
  return 'bg-slate-50 text-slate-700 border-slate-200';
};

const formatFollowers = (num) => {
  if (num == null) return 'â€”';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return Number(num).toLocaleString();
};

export default function CreatorsPage() {
  const [data, setData] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [niche, setNiche] = useState('');
  const [location, setLocation] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [followerRange, setFollowerRange] = useState('');
  const [timeRange, setTimeRange] = useState('LAST_7_DAYS');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState(new Set());

  useEffect(() => {
    fetchTeamMembers()
      .then((res) => setMembers(res || []))
      .catch(() => {});
  }, []);

  const loadCreators = () => {
    setLoading(true);
    fetchCreatorsTable({
      search,
      niche,
      location,
      addedBy,
      followerRange,
      timeRange,
      page,
      size,
      sortBy: 'createdAt',
      sortDir: 'desc'
    })
      .then((res) => setData(res))
      .catch((err) => console.error('Creators fetch error:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCreators();
  }, [search, niche, location, addedBy, followerRange, timeRange, page, size]);

  const resetFilters = () => {
    setSearch('');
    setNiche('');
    setLocation('');
    setAddedBy('');
    setFollowerRange('');
    setTimeRange('LAST_7_DAYS');
    setPage(0);
  };

  const stats = data?.stats;
  const items = data?.items || [];
  const totalElements = data?.totalElements ?? 8429;
  const totalPages = data?.totalPages ?? 1054;

  const toggleSelectAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(items.map(i => i.id)));
    }
  };

  const toggleSelectRow = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <div className="space-y-4 text-slate-800 antialiased font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Creators</h1>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            All collected influencer profiles with details and performance insights.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative inline-flex items-center bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm text-xs font-medium text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400 mr-2 shrink-0" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-transparent pr-4 outline-none appearance-none cursor-pointer text-slate-700 font-medium"
            >
              <option value="LAST_7_DAYS">Last 7 Days</option>
              <option value="TODAY">Today</option>
              <option value="THIS_MONTH">This Month</option>
              <option value="ALL">All Time</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2.5" />
          </div>

          <a
            href={getExportCsvUrl({ search, niche, location, addedBy, followerRange, timeRange })}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3.5 py-1.5 shadow-sm text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            Export
          </a>

          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-semibold text-xs flex items-center justify-center shadow-sm">
              RM
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-900 leading-tight">Rohan Mandal</p>
              <p className="text-[11px] text-slate-400 font-normal">Admin</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              {stats?.totalCreators ? stats.totalCreators.toLocaleString() : '8,429'}
            </p>
            <p className="text-[11px] text-slate-400 font-normal mt-1">Total Creators</p>
            <p className="text-[10px] font-semibold text-emerald-600 mt-1">
              â†‘ {stats?.totalGrowth || '+12.8%'}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              {stats?.withEmailCount ? stats.withEmailCount.toLocaleString() : '8,023'}
            </p>
            <p className="text-[11px] text-slate-400 font-normal mt-1">With Email</p>
            <p className="text-[10px] font-semibold text-slate-600 mt-1">
              {stats?.withEmailPercentage ?? 95.2}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <InstagramIcon className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              {stats?.withUsernameCount ? stats.withUsernameCount.toLocaleString() : '7,410'}
            </p>
            <p className="text-[11px] text-slate-400 font-normal mt-1">With Username</p>
            <p className="text-[10px] font-semibold text-slate-600 mt-1">
              {stats?.withUsernamePercentage ?? 87.9}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              {stats?.withLocationCount ? stats.withLocationCount.toLocaleString() : '3,612'}
            </p>
            <p className="text-[11px] text-slate-400 font-normal mt-1">With Location</p>
            <p className="text-[10px] font-semibold text-slate-600 mt-1">
              {stats?.withLocationPercentage ?? 42.8}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-start gap-3 col-span-2 sm:col-span-1">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              {stats?.totalNiches ?? 7}
            </p>
            <p className="text-[11px] text-slate-400 font-normal mt-1">Niches</p>
          </div>
        </div>
      </div>

      {/* 3. Filter Ribbon */}
      <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-wrap items-center gap-2.5">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            placeholder="Search by username, name, email..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200/90 rounded-lg text-xs font-normal text-slate-700 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 transition"
          />
        </div>

        <div className="relative">
          <select
            value={niche}
            onChange={(e) => { setNiche(e.target.value); setPage(0); }}
            className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-normal text-slate-700 outline-none appearance-none cursor-pointer"
          >
            <option value="">Niche</option>
            <option value="Fashion & Style">Fashion & Style</option>
            <option value="Beauty & Skincare">Beauty & Skincare</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Fitness & Nutrition">Fitness & Nutrition</option>
            <option value="Travel & Hospitality">Travel & Hospitality</option>
            <option value="Food & Culinary">Food & Culinary</option>
            <option value="Tech & Gadgets">Tech & Gadgets</option>
            <option value="UGC & Creator Economy">UGC & Creator Economy</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative">
          <select
            value={location}
            onChange={(e) => { setLocation(e.target.value); setPage(0); }}
            className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-normal text-slate-700 outline-none appearance-none cursor-pointer"
          >
            <option value="">Location</option>
            <option value="Mumbai, India">Mumbai, India</option>
            <option value="Delhi, India">Delhi, India</option>
            <option value="Pune, India">Pune, India</option>
            <option value="Bengaluru, India">Bengaluru, India</option>
            <option value="Hyderabad, India">Hyderabad, India</option>
            <option value="Chennai, India">Chennai, India</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative">
          <select
            value={addedBy}
            onChange={(e) => { setAddedBy(e.target.value); setPage(0); }}
            className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-normal text-slate-700 outline-none appearance-none cursor-pointer"
          >
            <option value="">Added By</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>{m.displayName}</option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative">
          <select
            value={followerRange}
            onChange={(e) => { setFollowerRange(e.target.value); setPage(0); }}
            className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-normal text-slate-700 outline-none appearance-none cursor-pointer"
          >
            <option value="">Followers</option>
            <option value="0-10k">0 â€“ 10k</option>
            <option value="10k-50k">10k â€“ 50k</option>
            <option value="50k-100k">50k â€“ 100k</option>
            <option value="100k+">100k+</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
        </div>

        <div className="relative">
          <select
            value={timeRange}
            onChange={(e) => { setTimeRange(e.target.value); setPage(0); }}
            className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-normal text-slate-700 outline-none appearance-none cursor-pointer"
          >
            <option value="LAST_7_DAYS">Date Added</option>
            <option value="TODAY">Today</option>
            <option value="LAST_7_DAYS">Last 7 Days</option>
            <option value="THIS_MONTH">This Month</option>
            <option value="ALL">All Time</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition ml-auto"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 4. Creator Directory Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-slate-500 font-semibold text-[11px]">
                <th className="py-2.5 px-3 w-8">
                  <input
                    type="checkbox"
                    checked={items.length > 0 && selectedIds.size === items.length}
                    onChange={toggleSelectAll}
                    className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                  />
                </th>
                <th className="py-2.5 px-3">Creator</th>
                <th className="py-2.5 px-3">Email</th>
                <th className="py-2.5 px-3">Followers â†“</th>
                <th className="py-2.5 px-3">Posts</th>
                <th className="py-2.5 px-3">Niche</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Added By</th>
                <th className="py-2.5 px-3">Added At</th>
                <th className="py-2.5 px-3 w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80 font-normal">
              {items.length > 0 ? (
                items.map((creator) => {
                  const isChecked = selectedIds.has(creator.id);
                  return (
                    <tr 
                      key={creator.id} 
                      className={`hover:bg-slate-50/60 transition ${isChecked ? 'bg-blue-50/20' : ''}`}
                    >
                      <td className="py-2.5 px-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectRow(creator.id)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-blue-600 focus:ring-0 cursor-pointer"
                        />
                      </td>

                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center shrink-0">
                            {creator.name?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <a
                              href={`https://instagram.com/${(creator.username || '').replace('@', '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-slate-900 hover:text-blue-600 inline-flex items-center gap-1 transition"
                            >
                              {creator.username || 'â€”'}
                              <ExternalLink className="w-3 h-3 text-slate-400 hover:text-blue-600" />
                            </a>
                            <p className="text-[11px] text-slate-400 font-normal leading-none mt-0.5">
                              {creator.name || 'UNKNOWN'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-2.5 px-3 text-slate-600 font-normal text-[11px]">
                        {creator.email || 'â€”'}
                      </td>

                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        {formatFollowers(creator.followers)}
                      </td>

                      <td className="py-2.5 px-3 text-slate-700">
                        {creator.posts ? creator.posts.toLocaleString() : 'â€”'}
                      </td>

                      <td className="py-2.5 px-3">
                        <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-medium border inline-block ${getNicheBadgeStyle(creator.niche)}`}>
                          {creator.niche || 'General'}
                        </span>
                      </td>

                      <td className="py-2.5 px-3 text-slate-600">
                        {creator.location ? (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            {creator.location}
                          </span>
                        ) : 'â€”'}
                      </td>

                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                            {creator.addedByInitials || 'RM'}
                          </span>
                          <span className="font-medium text-slate-800">{creator.addedBy || 'Rohan'}</span>
                        </div>
                      </td>

                      <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                        {creator.addedAt || 'â€”'}
                      </td>

                      <td className="py-2.5 px-3 text-right">
                        <button type="button" className="text-slate-400 hover:text-slate-700 p-1 rounded transition">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="py-12 text-center text-slate-400 text-xs">
                    {loading ? 'Loading creators directory...' : 'No creators found matching the selected filters.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 5. Pagination Bar */}
        <div className="p-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-normal">
          <p>
            Showing {items.length > 0 ? page * size + 1 : 0} â€“ {Math.min((page + 1) * size, totalElements)} of {totalElements.toLocaleString()} creators
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage(p => Math.max(0, p - 1))}
              className="p-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num - 1)}
                className={`w-7 h-7 rounded-lg text-xs transition ${
                  page === num - 1
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {num}
              </button>
            ))}

            <span className="px-1 text-slate-400">...</span>

            <button
              type="button"
              onClick={() => setPage(totalPages - 1)}
              className="px-2 h-7 rounded-lg text-xs text-slate-600 hover:bg-slate-100 transition"
            >
              {totalPages.toLocaleString()}
            </button>

            <button
              type="button"
              disabled={page >= totalPages - 1}
              onClick={() => setPage(p => p + 1)}
              className="p-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="relative">
            <select
              value={size}
              onChange={(e) => { setSize(Number(e.target.value)); setPage(0); }}
              className="bg-white border border-slate-200 rounded-lg pl-3 pr-7 py-1 text-xs text-slate-700 outline-none appearance-none cursor-pointer"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

    </div>
  );
}
```

## FILE: src\collector\OverviewPage.jsx
```
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Mail, UserCheck, Target, TrendingUp, PieChart, MapPin,
  ExternalLink, Download, Search, ArrowRight, Zap, Trophy, Inbox,
  AlertCircle, RefreshCw, Flame, CalendarDays,
} from 'lucide-react';
import { fetchDashboardOverview, fetchTeamMembers, getExportCsvUrl } from '../services/collectorApi';

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Config & helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const CURRENT_USER = { name: 'Rohan Mandal', role: 'Admin' };

const RANGES = [
  { value: 'TODAY', label: 'Today', quota: 50, caption: 'today', days: 1 },
  { value: 'LAST_7_DAYS', label: 'Last 7 Days', quota: 100, caption: 'in the last 7 days', days: 7 },
  { value: 'THIS_MONTH', label: 'This Month', quota: 500, caption: 'this month', days: 30 },
];

const DONUT_COLORS = ['#2563eb', '#38bdf8', '#818cf8', '#c084fc', '#2dd4bf'];
const DOT_COLORS = ['bg-blue-600', 'bg-sky-400', 'bg-indigo-400', 'bg-purple-400', 'bg-teal-400'];
const SHARE_COLORS = ['bg-blue-600', 'bg-sky-400', 'bg-indigo-400', 'bg-purple-400', 'bg-teal-400'];

const CARD =
  'bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.06)]';

const getInitials = (name) => {
  if (!name) return 'TM';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

const getNicheBadgeStyle = (niche) => {
  const n = (niche || '').toLowerCase();
  if (n.includes('model')) return 'bg-purple-50 text-purple-700 border-purple-100/80';
  if (n.includes('fashion')) return 'bg-amber-50 text-amber-700 border-amber-100/80';
  if (n.includes('fitness')) return 'bg-emerald-50 text-emerald-700 border-emerald-100/80';
  if (n.includes('travel')) return 'bg-sky-50 text-sky-700 border-sky-100/80';
  if (n.includes('beauty')) return 'bg-rose-50 text-rose-600 border-rose-100/80';
  if (n.includes('food')) return 'bg-orange-50 text-orange-700 border-orange-100/80';
  if (n.includes('tech')) return 'bg-blue-50 text-blue-700 border-blue-100/80';
  return 'bg-slate-50 text-slate-700 border-slate-200';
};

const formatFollowers = (n) => {
  if (n == null) return 'â€”';
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return Number(n).toLocaleString();
};

const num = (v) => (typeof v === 'number' && !Number.isNaN(v) ? v : 0);

const smoothPath = (pts) => {
  if (pts.length < 2) return '';
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] || p2;
    d += ` C ${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
};

/* API: TrendDataPointDto { date, totalCreators, uniqueEmails } */
const normalizeTrend = (trend) =>
  (trend || []).map((t) => ({
    date: String(t.date || t.label || '').trim(),
    total: num(t.totalCreators ?? t.total ?? t.creators ?? t.count),
    emails: num(t.uniqueEmails ?? t.emails ?? t.withEmail),
  }));

const dayLabel = (d) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' }).format(d);

/* The API only returns days that have data. Build the full day axis for the
   selected range and fill the gaps with 0 so the chart shows a real timeline. */
const fillSeries = (points, rangeValue) => {
  if (rangeValue === 'TODAY') return points;
  const today = new Date();
  const days = [];
  if (rangeValue === 'THIS_MONTH') {
    for (let day = 1; day <= today.getDate(); day++) {
      days.push(new Date(today.getFullYear(), today.getMonth(), day));
    }
  } else {
    for (let i = 6; i >= 0; i--) {
      days.push(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i));
    }
  }
  const labels = days.map(dayLabel);
  const byDate = new Map(points.map((p) => [p.date, p]));
  // If the backend's date labels don't match this format, don't guess â€” show them as sent.
  if (points.length > 0 && !points.some((p) => labels.includes(p.date))) return points;
  return labels.map((label) => byDate.get(label) || { date: label, total: 0, emails: 0 });
};

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Small building blocks â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const Skeleton = ({ className = '' }) => <div className={`animate-pulse rounded-md bg-slate-100 ${className}`} />;

const Sparkline = ({ values, color = '#3b82f6' }) => {
  if (!values || values.length < 2) return null;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const pts = values.map((v, i) => [2 + (i / (values.length - 1)) * 76, 18 - ((v - min) / range) * 16]);
  return (
    <svg className="w-20 h-6" viewBox="0 0 80 20" fill="none" aria-hidden="true">
      <path d={smoothPath(pts)} stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

const Delta = ({ value }) => {
  if (!value) return null;
  const str = String(value);
  const negative = str.trim().startsWith('-');
  return (
    <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-md ${negative ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
      {negative ? 'â†“' : 'â†‘'} {str.replace(/^[+-]/, '')}
    </span>
  );
};

const CardTitle = ({ icon: Icon, title, subtitle, right, tint = 'bg-blue-50 text-blue-600' }) => (
  <div className="flex items-start justify-between gap-3">
    <div className="flex items-center gap-2.5">
      <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${tint}`}>
        <Icon className="w-4 h-4" />
      </span>
      <div>
        <h3 className="text-sm font-bold text-slate-900 leading-tight">{title}</h3>
        {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
    {right}
  </div>
);

const EmptyState = ({ icon: Icon = Inbox, title, hint }) => (
  <div className="flex flex-col items-center justify-center text-center py-8 px-4 h-full">
    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-300 flex items-center justify-center mb-3">
      <Icon className="w-5 h-5" />
    </div>
    <p className="text-xs font-semibold text-slate-700">{title}</p>
    {hint && <p className="text-[11px] text-slate-400 mt-1 max-w-[220px]">{hint}</p>}
  </div>
);

const Ring = ({ pct, size = 'w-36 h-36', stroke = 4, color = '#2563eb', children }) => (
  <div className={`relative ${size} shrink-0`}>
    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" role="img" aria-label={`${pct}% complete`}>
      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth={stroke} />
      <circle
        cx="18" cy="18" r="15.915" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={`${Math.max(0, Math.min(100, pct))} 100`}
        style={{ transition: 'stroke-dasharray 700ms ease' }}
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
  </div>
);

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Trend chart â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

const TrendChart = ({ data }) => {
  const [hover, setHover] = useState(null);
  const W = 640, H = 220, PX = 12, PT = 16, PB = 10;

  const { totalPts, emailPts } = useMemo(() => {
    const m = Math.max(...data.map((d) => Math.max(d.total, d.emails)), 1);
    const x = (i) => PX + (data.length === 1 ? (W - PX * 2) / 2 : (i / (data.length - 1)) * (W - PX * 2));
    const y = (v) => PT + (1 - v / m) * (H - PT - PB);
    return {
      totalPts: data.map((d, i) => [x(i), y(d.total)]),
      emailPts: data.map((d, i) => [x(i), y(d.emails)]),
    };
  }, [data]);

  if (data.length === 0) {
    return <EmptyState icon={TrendingUp} title="No collection activity yet" hint="Creators added by your team will show up here." />;
  }

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const idx = Math.round(((e.clientX - rect.left) / rect.width) * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, idx)));
  };

  const baseY = H - PB;
  const area = `${smoothPath(totalPts)} L ${totalPts[totalPts.length - 1][0]},${baseY} L ${totalPts[0][0]},${baseY} Z`;
  const grid = [0, 1, 2, 3].map((i) => PT + (i / 3) * (H - PT - PB));

  return (
    <div className="flex flex-col h-full">
      <div className="relative flex-1 min-h-[14rem]" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" role="img" aria-label="Collection trend chart">
          <defs>
            <linearGradient id="trendArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {grid.map((gy, i) => (
            <line key={i} x1="0" y1={gy} x2={W} y2={gy} stroke="#f1f5f9" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          ))}
          {data.length > 1 && <path d={area} fill="url(#trendArea)" />}
          {data.length > 1 && (
            <>
              <path d={smoothPath(emailPts)} fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d={smoothPath(totalPts)} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </>
          )}
          {hover != null && (
            <line x1={totalPts[hover][0]} y1={PT} x2={totalPts[hover][0]} y2={baseY} stroke="#cbd5e1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
          )}
        </svg>

        {totalPts.map((p, i) => {
          const active = hover === i || (hover == null && i === totalPts.length - 1);
          return (
            <span
              key={i}
              className={`absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600 ring-2 ring-white transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`}
              style={{ left: `${(p[0] / W) * 100}%`, top: `${(p[1] / H) * 100}%` }}
            />
          );
        })}

        {hover != null && (
          <div
            className="absolute -translate-x-1/2 -translate-y-full pointer-events-none bg-slate-900 text-white rounded-lg px-2.5 py-1.5 text-[10px] shadow-lg whitespace-nowrap z-10"
            style={{ left: `${Math.min(90, Math.max(10, (totalPts[hover][0] / W) * 100))}%`, top: `${(totalPts[hover][1] / H) * 100 - 4}%` }}
          >
            <p className="text-slate-300 font-medium">{data[hover].date}</p>
            <p className="font-semibold">{data[hover].total} creators Â· {data[hover].emails} emails</p>
          </div>
        )}
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 mt-2 px-1">
        {data.map((t, i) => (
          <span key={i} className={data.length > 10 && i % 2 ? 'hidden sm:inline' : ''}>{t.date}</span>
        ))}
      </div>
    </div>
  );
};

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */

export default function OverviewPage() {
  const [data, setData] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('LAST_7_DAYS');
  const [loadedRange, setLoadedRange] = useState('LAST_7_DAYS');
  const [searchQuery, setSearchQuery] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const membersRef = useRef([]);

  const range = RANGES.find((r) => r.value === timeRange) || RANGES[1];

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    Promise.all([
      fetchDashboardOverview(timeRange),
      membersRef.current.length > 0 ? Promise.resolve(membersRef.current) : fetchTeamMembers(),
    ])
      .then(([overviewRes, membersRes]) => {
        if (!alive) return;
        const members = membersRes || [];
        membersRef.current = members;
        setTeamMembers(members);
        setData(overviewRes);
        setLoadedRange(timeRange);
      })
      .catch((err) => {
        console.error('Dashboard load error:', err);
        if (alive) setError('We couldnâ€™t load the dashboard. Check your connection and try again.');
      })
      .finally(() => alive && setLoading(false));

    return () => { alive = false; };
  }, [timeRange, reloadKey]);

  const kpis = data?.kpis;
  const trend = useMemo(
    () => fillSeries(normalizeTrend(data?.collectionTrend), loadedRange),
    [data, loadedRange]
  );
  const niches = data?.nicheDistribution || [];
  const locations = data?.locationInsights || [];
  const recentCreators = data?.recentCreators || [];

  const competition = useMemo(() => {
    const countMap = {};
    (data?.teamCompetition || []).forEach((c) => {
      if (c.memberId) countMap[c.memberId] = c.creators;
      if (c.name) countMap[c.name.toLowerCase()] = c.creators;
    });
    const list = teamMembers.map((m) => ({
      memberId: m.id,
      name: m.displayName || 'Member',
      username: m.telegramUsername ? `@${m.telegramUsername}` : null,
      role: m.role || 'member',
      initials: getInitials(m.displayName),
      creators: countMap[m.id] ?? countMap[m.displayName?.toLowerCase()] ?? 0,
    }));
    const total = list.reduce((a, c) => a + c.creators, 0);
    list.sort((a, b) => b.creators - a.creators);
    return list.map((item, idx) => ({
      ...item,
      rank: idx + 1,
      share: total > 0 ? Math.round((item.creators / total) * 100) : 0,
      progress: Math.min(100, Math.round((item.creators / range.quota) * 100)),
    }));
  }, [data, teamMembers, range.quota]);

  const totalTeamCollected = competition.reduce((a, c) => a + c.creators, 0);
  const first = competition[0] || null;

  const totalCreators = num(kpis?.totalCreators);
  const uniqueEmails = num(kpis?.uniqueEmails);
  const emailHitRate = totalCreators > 0 ? Math.round((uniqueEmails / totalCreators) * 100) : null;

  const targetGoal = num(kpis?.todayTargetGoal) || 100;
  const targetProgress = num(kpis?.todayTargetProgress);
  const targetPct = Math.min(100, kpis?.todayTargetPercentage ?? Math.round((targetProgress / targetGoal) * 100));
  const targetLeft = Math.max(0, targetGoal - targetProgress);

  const trendStats = useMemo(() => {
    if (trend.length === 0) return null;
    const sum = trend.reduce((a, t) => a + t.total, 0);
    const peak = trend.reduce((a, t) => (t.total > a.total ? t : a), trend[0]);
    return { sum, avg: Math.round((sum / trend.length) * 10) / 10, peak };
  }, [trend]);

  const donut = useMemo(() => {
    const items = niches.slice(0, 5);
    const sum = items.reduce((a, n) => a + num(n.percentage), 0) || 1;
    let offset = 0;
    return items.map((n, i) => {
      const pct = (num(n.percentage) / sum) * 100;
      const seg = { ...n, pct, offset, color: DONUT_COLORS[i % DONUT_COLORS.length] };
      offset += pct;
      return seg;
    });
  }, [niches]);

  const filteredCreators = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return recentCreators;
    return recentCreators.filter((c) => [c.username, c.name, c.email, c.location].some((f) => f && f.toLowerCase().includes(q)));
  }, [recentCreators, searchQuery]);

  const showSkeleton = loading && !data;

  if (error && !data) {
    return (
      <div className={`${CARD} p-10 flex flex-col items-center text-center max-w-md mx-auto mt-16 text-slate-800 antialiased font-sans`}>
        <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4">
          <AlertCircle className="w-5 h-5" />
        </div>
        <h2 className="text-base font-bold text-slate-900">Dashboard unavailable</h2>
        <p className="text-xs text-slate-500 mt-1.5">{error}</p>
        <button
          type="button"
          onClick={() => setReloadKey((k) => k + 1)}
          className="mt-5 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg px-4 py-2 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-slate-800 antialiased font-sans max-w-[1400px] mx-auto">

      {/* â”€â”€â”€â”€â”€ Header â”€â”€â”€â”€â”€ */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Team Dashboard</h1>
          <p className="text-xs text-slate-500 mt-1">Track creator collection, team performance and competition in real time.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex bg-slate-100/90 p-0.5 rounded-lg text-xs font-medium" role="tablist" aria-label="Time range">
            {RANGES.map((r) => {
              const active = timeRange === r.value;
              return (
                <button
                  key={r.value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTimeRange(r.value)}
                  className={`px-3.5 py-2 rounded-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 ${
                    active ? 'bg-white text-blue-600 shadow-sm font-semibold' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          <a
            href={getExportCsvUrl({ timeRange })}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3.5 py-2 shadow-sm text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            Export CSV
          </a>

          <div className="flex items-center gap-2.5 pl-3 ml-1 border-l border-slate-200">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-semibold text-xs flex items-center justify-center shadow-sm ring-2 ring-white">
              {getInitials(CURRENT_USER.name)}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-slate-900 leading-tight">{CURRENT_USER.name}</p>
              <p className="text-[11px] text-slate-400">{CURRENT_USER.role}</p>
            </div>
          </div>
        </div>
      </header>

      {/* â”€â”€â”€â”€â”€ KPI strip (single compact card) â”€â”€â”€â”€â”€ */}
      <section aria-label="Key metrics" className={`${CARD} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-slate-100`}>
        {/* Total creators */}
        <div className="p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center"><Users className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Total Creators</p>
              <div className="flex items-center gap-2 mt-0.5">
                {showSkeleton ? <Skeleton className="h-7 w-12" /> : <p className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{totalCreators.toLocaleString()}</p>}
                <Delta value={kpis?.totalCreatorsGrowth} />
              </div>
            </div>
          </div>
          <Sparkline values={trend.map((t) => t.total)} color="#0ea5e9" />
        </div>

        {/* Unique emails */}
        <div className="p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center"><Mail className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Unique Emails</p>
              <div className="flex items-center gap-2 mt-0.5">
                {showSkeleton ? <Skeleton className="h-7 w-12" /> : <p className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{uniqueEmails.toLocaleString()}</p>}
                <Delta value={kpis?.uniqueEmailsGrowth} />
              </div>
            </div>
          </div>
          <Sparkline values={trend.map((t) => t.emails)} color="#6366f1" />
        </div>

        {/* Active members */}
        <div className="p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center"><UserCheck className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-slate-500 font-medium">Active Members</p>
              {showSkeleton ? <Skeleton className="h-7 w-8 mt-0.5" /> : (
                <p className="text-2xl font-bold text-slate-900 tracking-tight leading-none mt-0.5">{teamMembers.length || num(kpis?.activeMembers)}</p>
              )}
            </div>
          </div>
          <div className="flex -space-x-2">
            {competition.slice(0, 4).map((m) => (
              <span key={m.memberId} title={m.name} className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {m.initials}
              </span>
            ))}
          </div>
        </div>

        {/* Today's target */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center"><Target className="w-5 h-5" /></div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Today's Target</p>
                {showSkeleton ? <Skeleton className="h-7 w-16 mt-0.5" /> : (
                  <p className="text-2xl font-bold text-slate-900 tracking-tight leading-none mt-0.5">
                    {targetProgress}<span className="text-sm font-normal text-slate-400"> / {targetGoal}</span>
                  </p>
                )}
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-700">{targetPct}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3.5 overflow-hidden" role="progressbar" aria-valuenow={targetPct} aria-valuemin={0} aria-valuemax={100} aria-label="Today's target">
            <div className="bg-blue-600 h-full rounded-full transition-all duration-700" style={{ width: `${targetPct}%` }} />
          </div>
        </div>
      </section>

      {/* â”€â”€â”€â”€â”€ Trend (wide) + Competition â”€â”€â”€â”€â”€ */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch" aria-label="Collection and competition">
        {/* Trend */}
        <div className={`${CARD} xl:col-span-7 p-5 flex flex-col`}>
          <CardTitle
            icon={TrendingUp}
            title="Collection Trend"
            subtitle={`Creators collected ${range.caption}`}
            right={
              <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium pt-1.5">
                <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-blue-600" /> Total</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-1 rounded bg-sky-400" /> Emails</span>
              </div>
            }
          />

          <div className="grid grid-cols-3 gap-3 mt-5">
            {[
              { label: 'Collected', value: trendStats ? trendStats.sum.toLocaleString() : 'â€”' },
              { label: 'Daily average', value: trendStats ? trendStats.avg : 'â€”' },
              { label: 'Best day', value: trendStats ? `${trendStats.peak.total}` : 'â€”', sub: trendStats?.peak.date },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-slate-50/80 border border-slate-100 px-3.5 py-2.5">
                <p className="text-[11px] text-slate-400">{s.label}</p>
                <p className="text-lg font-bold text-slate-900 leading-tight tabular-nums">
                  {s.value} {s.sub && <span className="text-[11px] font-medium text-slate-400">Â· {s.sub}</span>}
                </p>
              </div>
            ))}
          </div>

          <div className="flex-1 mt-5">
            {showSkeleton ? <Skeleton className="h-64 w-full" /> : <TrendChart data={trend} />}
          </div>
        </div>

        {/* Competition */}
        <div className={`${CARD} xl:col-span-5 p-5 flex flex-col`}>
          <CardTitle
            icon={Trophy}
            tint="bg-amber-50 text-amber-500"
            title="Team Competition"
            subtitle={`Unique creators collected ${range.caption}`}
          />

          {showSkeleton ? (
            <div className="space-y-3 mt-5"><Skeleton className="h-3" /><Skeleton className="h-16" /><Skeleton className="h-16" /></div>
          ) : competition.length === 0 ? (
            <EmptyState icon={Users} title="No team members yet" hint="Add members to start tracking collection." />
          ) : (
            <>
              {/* Share-of-total bar */}
              <div className="mt-5">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
                  <span>Share of team output</span>
                  <span className="tabular-nums">{totalTeamCollected.toLocaleString()} total</span>
                </div>
                <div className="flex h-2.5 rounded-full overflow-hidden bg-slate-100 gap-0.5">
                  {competition.map((m, i) => m.creators > 0 && (
                    <div key={m.memberId} className={`${SHARE_COLORS[i % SHARE_COLORS.length]} transition-all duration-700`} style={{ width: `${m.share}%` }} title={`${m.name} ${m.share}%`} />
                  ))}
                </div>
              </div>

              {/* Leaderboard rows */}
              <ul className="mt-4 space-y-2.5 flex-1">
                {competition.map((m, i) => (
                  <li key={m.memberId} className={`rounded-xl border p-3.5 ${m.rank === 1 ? 'border-blue-100 bg-[#f8faff]' : 'border-slate-100 bg-white'}`}>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <span className={`w-10 h-10 rounded-xl text-xs font-bold flex items-center justify-center ${m.rank === 1 ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/25' : 'bg-blue-100 text-blue-700'}`}>
                          {m.initials}
                        </span>
                        <span className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white ${m.rank === 1 ? 'bg-amber-400 text-white' : 'bg-slate-200 text-slate-600'}`}>
                          {m.rank}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-900 truncate">{m.name}</p>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase ${m.role === 'admin' ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-600'}`}>{m.role}</span>
                          {m.rank === 1 && m.creators > 0 && <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />}
                        </div>
                        {m.username && <p className="text-[11px] text-slate-400 truncate">{m.username}</p>}
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-900 leading-none tabular-nums">{m.creators.toLocaleString()}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{m.share}% of team</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 mt-3">
                      <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all duration-700 ${m.rank === 1 ? 'bg-blue-600' : 'bg-sky-500'}`} style={{ width: `${m.progress}%` }} />
                      </div>
                      <span className="text-[11px] font-semibold text-slate-600 w-20 text-right tabular-nums">{m.progress}% of {range.quota}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5 rounded-xl bg-[#f8faff] border border-blue-100/70 px-3 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0"><Zap className="w-4 h-4" /></div>
                  <div>
                    <p className="text-[11px] text-slate-500">Leading</p>
                    <p className="text-xs font-bold text-blue-600 truncate">{first ? `${first.name} Â· ${first.creators}` : 'â€”'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100/70 px-3 py-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0"><Mail className="w-4 h-4" /></div>
                  <div>
                    <p className="text-[11px] text-slate-500">Email hit rate</p>
                    <p className="text-xs font-bold text-emerald-600">{emailHitRate != null ? `${emailHitRate}%` : 'â€”'}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* â”€â”€â”€â”€â”€ Niche / Location / Target ring â”€â”€â”€â”€â”€ */}
      <section aria-label="Insights" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Niche */}
        <div className={`${CARD} p-5`}>
          <CardTitle icon={PieChart} title="Niche Distribution" subtitle="Share of creators by niche" />
          {showSkeleton ? <Skeleton className="h-36 mt-5" /> : donut.length === 0 ? (
            <EmptyState icon={PieChart} title="No niche data yet" hint="Niches appear once creators are tagged." />
          ) : (
            <div className="flex items-center gap-6 mt-5">
              <div className="relative w-36 h-36 shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36" role="img" aria-label="Niche distribution">
                  <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4.5" />
                  {donut.map((s) => {
                    const len = Math.max(0, s.pct - 0.8);
                    return (
                      <circle key={s.niche} cx="18" cy="18" r="15.915" fill="none" stroke={s.color} strokeWidth="4.5" strokeDasharray={`${len} ${100 - len}`} strokeDashoffset={-s.offset} />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xl font-bold text-slate-900 leading-none">{totalCreators.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 mt-1">Creators</span>
                </div>
              </div>
              <ul className="space-y-3 w-full min-w-0">
                {donut.map((item, idx) => (
                  <li key={item.niche} className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 text-slate-600 text-xs min-w-0">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${DOT_COLORS[idx % DOT_COLORS.length]}`} />
                      <span className="truncate">{item.niche}</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-800 tabular-nums">{item.percentage}%</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Location */}
        <div className={`${CARD} p-5`}>
          <CardTitle icon={MapPin} title="Location Insights" subtitle="Where your creators are based" />
          {showSkeleton ? <Skeleton className="h-36 mt-5" /> : locations.length === 0 ? (
            <EmptyState icon={MapPin} title="No location data yet" hint="Locations appear once creators are added." />
          ) : (
            <ul className="space-y-4 mt-5">
              {locations.slice(0, 5).map((loc) => (
                <li key={loc.location} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium text-slate-700">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-slate-300" />{loc.location}</span>
                    <span className="font-semibold text-slate-900 tabular-nums">{loc.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-sky-400 h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, num(loc.percentage))}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Target ring */}
        <div className={`${CARD} p-5 md:col-span-2 xl:col-span-1`}>
          <CardTitle icon={CalendarDays} tint="bg-teal-50 text-teal-600" title="Daily Goal" subtitle="Progress toward today's target" />
          <div className="flex items-center gap-6 mt-5">
            <Ring pct={targetPct} size="w-36 h-36" stroke={4.5}>
              <span className="text-2xl font-bold text-slate-900 leading-none">{targetPct}%</span>
              <span className="text-[10px] text-slate-400 mt-1">complete</span>
            </Ring>
            <div className="w-full space-y-3">
              {[
                { label: 'Collected', value: targetProgress, cls: 'text-slate-900' },
                { label: 'Goal', value: targetGoal, cls: 'text-slate-900' },
                { label: 'Remaining', value: targetLeft, cls: targetLeft === 0 ? 'text-emerald-600' : 'text-blue-600' },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                  <span className="text-xs text-slate-500">{r.label}</span>
                  <span className={`text-sm font-bold tabular-nums ${r.cls}`}>{r.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€â”€â”€ Recent creators â”€â”€â”€â”€â”€ */}
      <section className={`${CARD} p-5`} aria-label="Recent creators">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <CardTitle icon={Users} title="Recent Creators" subtitle="Latest creators added by the team" />
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search username, email or location"
                aria-label="Search recent creators"
                className="pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 w-56 sm:w-72 transition"
              />
            </div>
            <Link to="/admin/creators" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 whitespace-nowrap transition">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/80 text-slate-400 font-semibold text-[11px]">
                {['Username', 'Name', 'Email', 'Followers', 'Posts', 'Niche', 'Location', 'Added By', 'Added At'].map((h, i, arr) => (
                  <th key={h} className={`py-2.5 px-3 ${i === 0 ? 'rounded-l-lg' : ''} ${i === arr.length - 1 ? 'rounded-r-lg' : ''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/80">
              {showSkeleton ? (
                Array.from({ length: 5 }).map((_, i) => <tr key={i}><td colSpan={9} className="py-2"><Skeleton className="h-8" /></td></tr>)
              ) : filteredCreators.length > 0 ? (
                filteredCreators.map((creator) => (
                  <tr key={creator.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-100 to-slate-50 border border-slate-200/70 text-slate-600 font-semibold text-[11px] flex items-center justify-center shrink-0">
                          {(creator.name || creator.username || 'C').replace('@', '').charAt(0).toUpperCase()}
                        </div>
                        <a
                          href={`https://instagram.com/${(creator.username || '').replace('@', '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="group font-medium text-slate-900 hover:text-blue-600 flex items-center gap-1 transition"
                        >
                          {creator.username || 'â€”'}
                          <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-blue-500 transition" />
                        </a>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-700">{creator.name || 'Unknown'}</td>
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">{creator.email || 'â€”'}</td>
                    <td className="py-3 px-3 font-semibold text-slate-900 tabular-nums">{formatFollowers(creator.followers)}</td>
                    <td className="py-3 px-3 text-slate-700 tabular-nums">{creator.posts?.toLocaleString() || 'â€”'}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium inline-block border ${getNicheBadgeStyle(creator.niche)}`}>{creator.niche || 'General'}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      {creator.location ? (
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-slate-300 shrink-0" />{creator.location}</span>
                      ) : 'â€”'}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2 font-medium text-slate-800">
                        <span className="w-6 h-6 rounded-md bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                          {creator.addedByInitials || getInitials(creator.addedBy)}
                        </span>
                        <span>{creator.addedBy || 'â€”'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-[11px]">{creator.addedAt || 'â€”'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9}>
                    <EmptyState
                      icon={searchQuery ? Search : Inbox}
                      title={searchQuery ? 'No creators match your search' : 'No creators added yet'}
                      hint={searchQuery ? 'Try a different username, email or location.' : 'New creators from the team will appear here.'}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
```

## FILE: src\components\campaign\CampaignCard.jsx
```

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  MapPin,
  Wallet,
  Gift,
  Users,
} from "lucide-react";

import { applyUrl } from "../../services/api";
import { payoutLabel } from "../../utils/format";

const BRAND_STYLES = {
  nykaa: { bg: "#fce8ee", color: "#d12c62" },
  ponds: { bg: "#e8f3f8", color: "#397d9e" },
  minimalist: { bg: "#eeeeeb", color: "#55564e" },
  "earth rhythm": { bg: "#eaf1e7", color: "#55794e" },
  mamaearth: { bg: "#edf4e8", color: "#528345" },
  puma: { bg: "#eeeeee", color: "#252525" },
  swiggy: { bg: "#fff0e4", color: "#e87924" },
  boat: { bg: "#f0eafa", color: "#6741a0" },
};

const getBrandStyle = (name = "") => {
  return BRAND_STYLES[name.toLowerCase()] || {
    bg: "#f5eee8",
    color: "#8b6149",
  };
};

const getAudience = (campaign) => {
  const eligibility = campaign?.eligibility;

  return (
    eligibility?.minimum_followers_display ||
    (eligibility?.minimum_followers
      ? `${Number(eligibility.minimum_followers).toLocaleString("en-IN")}+ followers`
      : "Open to all")
  );
};

const CampaignCard = ({ campaign }) => {
  const images = (campaign?.images || []).filter(Boolean);

  const [activeImage, setActiveImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  const brand = campaign?.brandName || "Brand";
  const isPaid = campaign?.campaignType?.toUpperCase() === "PAID";
  const brandStyle = getBrandStyle(brand);

  const brandLogo =
    campaign?.brandLogo ||
    campaign?.brand_logo ||
    campaign?.logoUrl ||
    campaign?.logo ||
    campaign?.brand?.logo;

  const location = campaign?.eligibility?.locations?.length
    ? campaign.eligibility.locations.join(", ")
    : "India";

  const reward = payoutLabel(campaign);

  // Reset the image when the card's campaign changes.
  useEffect(() => {
    setActiveImage(0);
    setImageError(false);
  }, [campaign?.id]);

  // Automatically rotate campaign images every 5 seconds.
  useEffect(() => {
    if (images.length < 2) return;

    const timer = setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
      setImageError(false);
    }, 5000);

    return () => clearInterval(timer);
  }, [campaign?.id, images.length]);

  if (!campaign) return null;

  return (
    <article className="
      group flex h-full min-w-0 flex-col overflow-hidden
      rounded-[20px] border border-[#eadfd6] bg-white
      transition-all duration-300
      hover:-translate-y-1 hover:border-[#d9b79f]
      hover:shadow-[0_16px_35px_rgba(55,32,21,.10)]
    ">

      {/* Campaign image */}
      <div className="
        relative h-[185px] shrink-0 overflow-hidden
        bg-[#f5eee8] sm:h-[195px] lg:h-[205px]
      ">
        {images.length > 0 && !imageError ? (
          <img
            key={images[activeImage]}
            src={images[activeImage]}
            alt={`${brand} campaign`}
            loading="lazy"
            onError={() => setImageError(true)}
            className="
              h-full w-full object-cover object-center
              transition-transform duration-700
              group-hover:scale-[1.04]
            "
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span
              className="grid h-16 w-16 place-items-center rounded-2xl text-2xl font-bold"
              style={{
                backgroundColor: brandStyle.bg,
                color: brandStyle.color,
              }}
            >
              {brand.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

        {/* Brand identity */}
        <div className="absolute bottom-4 left-4 flex max-w-[75%] items-center gap-2.5">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-white bg-white text-sm font-bold shadow-sm"
            style={{ color: brandStyle.color }}
          >
            {brandLogo ? (
              <img
                src={brandLogo}
                alt={`${brand} logo`}
                className="h-full w-full object-contain p-1"
              />
            ) : (
              brand.charAt(0).toUpperCase()
            )}
          </span>

          <span className="truncate text-[15px] font-bold text-white drop-shadow">
            {brand}
          </span>
        </div>

        {/* Campaign type */}
        <span className={`
          absolute right-4 top-4 rounded-full px-3 py-1.5
          text-[11px] font-bold shadow-sm
          ${isPaid
            ? "bg-[#fff0e7] text-[#a6532c]"
            : "bg-white text-[#684a37]"
          }
        `}>
          {isPaid ? "Paid" : "Barter"}
        </span>

        {/* Image indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-5 right-4 flex items-center gap-1">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeImage === index
                    ? "w-5 bg-white"
                    : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Campaign details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">

        {/* Campaign title - consistent height */}
        <h3 className="
          line-clamp-2 min-h-[48px]
          text-[16px] font-bold leading-6
          tracking-[-0.02em] text-[#302017]
        ">
          {campaign.campaignTitle || "Creator campaign"}
        </h3>

        {/* Common information */}
        <div className="
          mt-4 grid grid-cols-2 gap-3
          rounded-xl bg-[#faf5f1] p-4
        ">
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-[#9a7965]">
              {isPaid ? <Wallet size={14} /> : <Gift size={14} />}
              Reward
            </div>

            <p className="truncate text-[13px] font-bold text-[#38251c]">
              {reward}
            </p>
          </div>

          <div className="min-w-0 border-l border-[#e8d9ce] pl-3">
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-[#9a7965]">
              <MapPin size={14} />
              Location
            </div>

            <p className="truncate text-[13px] font-bold text-[#38251c]">
              {location}
            </p>
          </div>

          <div className="col-span-2 flex items-center gap-1.5 border-t border-[#e8d9ce] pt-3">
            <Users size={14} className="shrink-0 text-[#9a7965]" />
            <span className="text-[11px] text-[#9a7965]">Audience:</span>
            <span className="truncate text-[12px] font-semibold text-[#38251c]">
              {getAudience(campaign)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2.5 pt-5">
          <Link
            to={`/campaigns/${campaign.id}`}
            className="
              flex h-11 flex-1 items-center justify-center gap-1.5
              rounded-xl border border-[#e8d6c8]
              text-[12px] font-bold text-[#38251c]
              transition hover:bg-[#faf4ef]
            "
          >
            View brief
            <ArrowUpRight size={15} />
          </Link>

          <a
            href={campaign.applyProxyUrl || applyUrl(campaign.id)}
            target="_blank"
            rel="noreferrer"
            className="
              flex h-11 flex-1 items-center justify-center gap-1.5
              rounded-xl bg-[#302017]
              text-[12px] font-bold text-white
              transition hover:bg-[#71452f]
            "
          >
            Apply now
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </article>
  );
};

export const CampaignCardSkeleton = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[#eadfd6] bg-white">
    <div className="h-[185px] animate-pulse bg-[#f1e9e2] sm:h-[195px] lg:h-[205px]" />

    <div className="flex flex-1 flex-col space-y-4 p-5">
      <div className="h-6 w-3/4 animate-pulse rounded bg-[#f1e9e2]" />
      <div className="h-28 animate-pulse rounded-xl bg-[#f1e9e2]" />
      <div className="mt-auto h-11 animate-pulse rounded-xl bg-[#f1e9e2]" />
    </div>
  </div>
);

export default CampaignCard;

```

## FILE: src\components\campaign\CampaignRow.jsx
```
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, FileText, Wallet, Package, CalendarDays, Users, UserRound, MapPin } from 'lucide-react';
import SafeImg from './SafeImg';
import PaidBadge from './PaidBadge';
import { applyUrl } from '../../services/api';
import { comp, elig, sched, payoutLabel, followersLabel, genderLabel, formatDate, initials } from '../../utils/format';

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <span className="w-11 h-11 shrink-0 rounded-xl bg-violet-50 text-violet-600 grid place-items-center"><Icon className="w-5 h-5" /></span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-[#5d5877]">{label}</p>
        <p className="text-[15px] font-extrabold truncate">{value}</p>
      </div>
    </div>
  );
}

export default function CampaignRow({ campaign }) {
  const [i, setI] = useState(0);
  const images = campaign.images?.length ? campaign.images : [null];
  const c = comp(campaign), e = elig(campaign), s = sched(campaign);
  const notes = (campaign.importantRequirements?.length ? campaign.importantRequirements : campaign.deliverables || []).slice(0, 3);
  const locations = e.locations || [];
  const go = (d) => (ev) => { ev.preventDefault(); setI((p) => (p + d + images.length) % images.length); };
  const detail = `/campaigns/${campaign.id}`;

  return (
    <article className="card p-3 lg:p-4 grid gap-5 lg:grid-cols-[340px_1fr_330px]">
      {/* Gallery */}
      <div className="relative rounded-2xl overflow-hidden bg-violet-50 aspect-[4/3] lg:aspect-auto lg:min-h-[230px]">
        <Link to={detail} aria-label={`View ${campaign.campaignTitle}`}>
          <SafeImg src={images[i]} alt={campaign.brandName} className="absolute inset-0 w-full h-full object-cover" />
        </Link>
        {images.length > 1 && (
          <>
            <button onClick={go(-1)} aria-label="Previous image" className="absolute left-3 bottom-3 w-9 h-9 rounded-full bg-white/95 shadow grid place-items-center hover:bg-white"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={go(1)} aria-label="Next image" className="absolute right-3 bottom-3 w-9 h-9 rounded-full bg-white/95 shadow grid place-items-center hover:bg-white"><ChevronRight className="w-4 h-4" /></button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.slice(0, 6).map((_, k) => (
                <span key={k} className={`h-1.5 rounded-full transition-all ${k === i ? 'w-4 bg-white' : 'w-1.5 bg-white/60'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Main info */}
      <div className="min-w-0 flex flex-col justify-between gap-4 lg:py-1">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#150f33] text-white text-sm font-extrabold grid place-items-center">{initials(campaign.brandName)}</span>
            <span className="font-bold text-[15px]">{campaign.brandName}</span>
          </div>
          <div className="mt-3 flex items-start justify-between gap-3">
            <h3 className="text-xl font-extrabold leading-snug">
              <Link to={detail} className="hover:text-violet-700 transition-colors">{campaign.campaignTitle}</Link>
            </h3>
            <PaidBadge campaign={campaign} />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#e7e3f2]">
          <Stat icon={Wallet} label="Payout" value={payoutLabel(campaign)} />
          <Stat icon={Package} label="Product provided" value={c.product_provided ? 'Yes' : 'No'} />
          <Stat icon={CalendarDays} label="Go live date" value={formatDate(s.go_live_date) || 'To be announced'} />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 rounded-2xl border border-[#e7e3f2] bg-[#faf9fe] p-4">
          <Stat icon={Users} label="Followers" value={followersLabel(campaign)} />
          <Stat icon={UserRound} label="Gender" value={genderLabel(campaign)} />
          <Stat icon={MapPin} label="Location" value={locations.length ? locations.slice(0, 3).join(', ') : 'Pan India'} />
        </div>
      </div>

      {/* Requirements + actions */}
      <div className="rounded-2xl bg-violet-50/70 p-4 flex flex-col justify-between gap-4">
        <div>
          <h4 className="flex items-center gap-2 font-extrabold text-[15px]"><FileText className="w-4 h-4 text-violet-600" />Key requirements</h4>
          {notes.length > 0 ? (
            <ul className="mt-3 space-y-2 text-sm text-[#3d3856] leading-snug">
              {notes.map((n, k) => (
                <li key={k} className="flex gap-2.5"><span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0" /><span className="line-clamp-2">{n}</span></li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-[#5d5877]">Full brief is on the details page.</p>
          )}
        </div>
        <div className="flex gap-2">
          <Link to={detail} className="btn btn-outline flex-1">View details</Link>
          <a href={campaign.applyProxyUrl || applyUrl(campaign.id)} target="_blank" rel="noreferrer" className="btn btn-primary flex-1">
            Apply now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function CampaignRowSkeleton() {
  return (
    <div className="card p-4 grid gap-5 lg:grid-cols-[340px_1fr_330px]">
      <div className="skeleton h-56" />
      <div className="space-y-4"><div className="skeleton h-6 w-1/3" /><div className="skeleton h-8 w-4/5" /><div className="skeleton h-16" /><div className="skeleton h-20" /></div>
      <div className="skeleton h-56" />
    </div>
  );
}

```

## FILE: src\components\campaign\CampaignSidebar.jsx
```

import React from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
} from "lucide-react";

const categories = [
  "Beauty",
  "Fashion",
  "Lifestyle",
  "Technology",
  "Food & drink",
  "Travel",
  "UGC",
];

const platforms = ["Instagram", "YouTube", "TikTok"];

const followerOptions = [
  { label: "Open to all", value: "" },
  { label: "1K+", value: "1000" },
  { label: "5K+", value: "5000" },
  { label: "10K+", value: "10000" },
  { label: "50K+", value: "50000" },
  { label: "100K+", value: "100000" },
];

const campaignTypes = [
  { label: "All campaigns", value: "" },
  { label: "Paid campaigns", value: "PAID" },
  { label: "Product barter", value: "BARTER" },
];

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <section className="border-b border-[#eee3da] py-4 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-bold text-[#38251c]"
      >
        {title}
        <ChevronDown
          size={16}
          className={`text-[#9b8170] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && <div className="mt-3 space-y-3">{children}</div>}
    </section>
  );
}

function CheckOption({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[12px] text-[#705d50] hover:text-[#38251c]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 rounded border-[#d9c7b9] accent-[#38251c]"
      />
      {label}
    </label>
  );
}

export default function CampaignSidebar({
  filters,
  onChange,
  onClear,
}) {
  const selectedPlatforms = filters.platforms || [];

  const togglePlatform = (platform) => {
    const updated = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter(item => item !== platform)
      : [...selectedPlatforms, platform];

    onChange("platforms", updated);
  };

  return (
    <aside className="
      w-full rounded-2xl border border-[#eaded4]
      bg-white p-4 shadow-[0_3px_15px_rgba(55,32,21,.035)]
      lg:sticky lg:top-24 lg:w-[235px] lg:shrink-0
    ">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#eee3da] pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={17} className="text-[#a66e4c]" />
          <h2 className="text-sm font-extrabold text-[#302017]">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-1 text-[11px] font-semibold text-[#a36c4b] hover:text-[#38251c]"
        >
          <RotateCcw size={12} />
          Clear all
        </button>
      </div>

      {/* Category */}
      <FilterSection title="Category">
        <CheckOption
          label="All categories"
          checked={!filters.category}
          onChange={() => onChange("category", "")}
        />

        {categories.map(category => (
          <CheckOption
            key={category}
            label={category}
            checked={filters.category === category}
            onChange={() =>
              onChange(
                "category",
                filters.category === category ? "" : category
              )
            }
          />
        ))}
      </FilterSection>

      {/* Campaign type */}
      <FilterSection title="Campaign type">
        {campaignTypes.map(type => (
          <CheckOption
            key={type.value}
            label={type.label}
            checked={filters.type === type.value}
            onChange={() => onChange("type", type.value)}
          />
        ))}
      </FilterSection>

      {/* Platform */}
      <FilterSection title="Platform">
        {platforms.map(platform => (
          <CheckOption
            key={platform}
            label={platform}
            checked={selectedPlatforms.includes(platform)}
            onChange={() => togglePlatform(platform)}
          />
        ))}
      </FilterSection>

      {/* Followers */}
      <FilterSection title="Minimum followers">
        {followerOptions.map(option => (
          <CheckOption
            key={option.value}
            label={option.label}
            checked={String(filters.maxFollowers || "") === option.value}
            onChange={() => onChange("maxFollowers", option.value)}
          />
        ))}
      </FilterSection>

      {/* Minimum payout */}
      <FilterSection title="Minimum payout">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#9a8170]">
            <span>â‚¹0</span>
            <span className="font-semibold text-[#38251c]">
              â‚¹{Number(filters.minPayout || 0).toLocaleString("en-IN")}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={filters.minPayout || 0}
            onChange={e => onChange("minPayout", e.target.value)}
            className="w-full cursor-pointer accent-[#38251c]"
          />

          <div className="flex justify-between text-[10px] text-[#a18a7b]">
            <span>â‚¹0</span>
            <span>â‚¹50,000+</span>
          </div>
        </div>
      </FilterSection>
    </aside>
  );
}

```

## FILE: src\components\campaign\CampaignSpotlight.jsx
```

import React, { useEffect, useState } from "react";

const banners = [
  {
    src: "/images/campaign-banners/upcoming-brands.png",
    alt: "Upcoming brands and new creator campaigns",
  },
  {
    src: "/images/campaign-banners/creator-opportunities.png",
    alt: "Discover creator opportunities with paying brands",
  },
  {
    src: "/images/campaign-banners/brand-campaign.png",
    alt: "Create your next creator campaign",
  },
];

export default function CampaignSpotlight() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Preload all banners to avoid loading delays
    banners.forEach(({ src }) => {
      const image = new Image();
      image.src = src;
    });

    // Automatically change banner every 3 seconds
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-8 w-full">
      <div
        className="relative w-full overflow-hidden rounded-2xl"
        aria-label="Featured marketplace announcements"
      >
        {banners.map((banner, index) => (
          <img
            key={banner.src}
            src={banner.src}
            alt={banner.alt}
            draggable="false"
            className={`
              absolute inset-0 block h-auto w-full
              transition-opacity duration-700 ease-in-out
              ${index === activeIndex
                ? "relative opacity-100"
                : "opacity-0"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}

```

## FILE: src\components\campaign\PaidBadge.jsx
```

import React from 'react';
import { Banknote, Package } from 'lucide-react';
import { isPaid } from '../../utils/format';

export default function PaidBadge({ campaign }) {
  const paid = isPaid(campaign);
  const Icon = paid ? Banknote : Package;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold shadow-sm ${
      paid
        ? 'bg-[#302019] text-white'
        : 'bg-[#fff0ca] text-[#79551c]'
    }`}>
      <Icon size={12} />
      {paid ? 'Paid' : 'Barter'}
    </span>
  );
}

```

## FILE: src\components\campaign\SafeImg.jsx
```
import React from 'react';
import { FALLBACK_IMG } from '../../utils/format';

export default function SafeImg({ src, alt = '', className = '' }) {
  return (
    <img
      src={src || FALLBACK_IMG}
      alt={alt}
      loading="lazy"
      onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_IMG; }}
      className={className}
    />
  );
}

```

## FILE: src\components\layout\Footer.jsx
```
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const footerGroups = [
  {
    title: 'Discover',
    links: [
      ['Explore campaigns', '/campaigns'],
      ['Discover brands', '/brands'],
      ['How it works', '/how-it-works'],
      ['Creator community', '/for-creators'],
    ],
  },
  {
    title: 'For creators',
    links: [
      ['Join as a creator', '/signup?role=creator'],
      ['Paid collaborations', '/campaigns?type=PAID'],
      ['Barter campaigns', '/campaigns?type=BARTER'],
    ],
  },
  {
    title: 'For brands',
    links: [
      ['Join as a brand', '/signup?role=brand'],
      ['Find creators', '/creators'],
      ['Post a campaign', '/campaigns/create'],
      ['Talk to our team', '/contact'],
    ],
  },
];

const socialLinks = [
  { label: 'Instagram', mark: 'ig', href: 'https://www.instagram.com/' },
  { label: 'YouTube', mark: 'â–¶', href: 'https://www.youtube.com/' },
  { label: 'LinkedIn', mark: 'in', href: 'https://www.linkedin.com/' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!email.trim() || submitting) return;

    // Replace this placeholder with your newsletter API integration.
    setSubmitting(true);
    setMessage('Thanks for your interest! Newsletter signup will be available soon.');
    setEmail('');
    setSubmitting(false);
  };

  return (
    <footer className="relative mt-14 overflow-hidden bg-[#2b211c] text-[#f8f1eb] md:mt-24">
      {/* Soft ambient details */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-[#b77c5d]/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-10 h-80 w-80 rounded-full bg-[#d9ad91]/[0.07] blur-3xl" />

      {/* Main footer: editorial intro, image and navigation */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-8 px-5 pb-8 pt-10 sm:px-8 sm:pt-12 lg:grid-cols-[1.35fr_1fr_1fr_1fr_1fr] lg:gap-9 lg:pb-12 lg:pt-16">
        <div className="col-span-2 max-w-md lg:col-span-1 lg:pr-5">
          <div className="[&_a]:text-white [&_svg]:text-white">
            <Logo />
          </div>

          <p className="mt-4 max-w-sm font-['Manrope'] text-[1.35rem] font-semibold leading-[1.3] tracking-[-.035em] text-white sm:mt-5 sm:text-[1.7rem]">
            Bringing creators and brands together to make
            <span className="text-[#e6b394]"> great things happen.</span>
          </p>

          <Link
            to="/signup"
            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#e6b394] transition hover:gap-3 hover:text-[#f4c9ad]"
          >
            Be part of the community <span aria-hidden="true">â†—</span>
          </Link>

          {/* Visual feature tile */}
          <Link
            to="/campaigns"
            className="group relative mt-6 block w-full max-w-[280px] overflow-hidden rounded-2xl border border-white/10 bg-[#47352b] shadow-[0_12px_30px_rgba(0,0,0,.18)] sm:mt-7 sm:max-w-[320px]"
            aria-label="Explore creator campaigns"
          >
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85"
              alt="Creator portrait in a warm neutral editorial campaign style"
              loading="lazy"
              className="h-32 w-full object-cover object-[center_38%] opacity-90 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100 sm:h-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c130f]/85 via-[#1c130f]/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-[.16em] text-[#f4d2bd]">Your next opportunity</p>
                <p className="mt-1 font-['Manrope'] text-base font-bold text-white sm:text-lg">Create. Connect. Grow.</p>
              </div>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/50 bg-white/20 text-white backdrop-blur transition group-hover:bg-[#e6b394] group-hover:text-[#2b211c]">
                â†—
              </span>
            </div>
          </Link>
        </div>

        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="mb-4 font-['Manrope'] text-sm font-extrabold text-white sm:mb-6">
              {group.title}
            </h3>
            <ul className="space-y-4">
              {group.links.map(([label, to]) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-[13px] leading-6 text-white/60 transition-colors hover:text-[#f0c4a7]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col-span-2 sm:col-span-1">
          <h3 className="mb-4 font-['Manrope'] text-sm font-extrabold text-white sm:mb-6">Need a hand?</h3>
          <p className="max-w-[210px] text-[13px] leading-6 text-white/55">
            Questions, partnerships or campaign ideas? Let's make something happen.
          </p>
          <a
            href="mailto:contact@adrovis.com"
            className="mt-4 inline-flex items-center gap-2 break-all text-[13px] font-semibold text-[#f0c4a7] transition hover:text-white"
          >
            contact@adrovis.com <span aria-hidden="true">â†—</span>
          </a>
          <Link
            to="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold text-white/85 transition hover:border-[#e6b394] hover:bg-[#e6b394] hover:text-[#2b211c]"
          >
            Contact our team <span aria-hidden="true">â†’</span>
          </Link>
        </div>
      </div>

      {/* Newsletter strip */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-5 rounded-[1.35rem] border border border-[#e7c5ad]/20 bg-[#3a2b23] p-5 shadow-[0_18px_55px_rgba(0,0,0,.13)] sm:gap-6 sm:p-7 md:grid-cols-[1fr_1.05fr] md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e6b394]">The creator brief</p>
            <h2 className="mt-2 font-['Manrope'] text-xl font-extrabold tracking-[-.04em] text-white sm:text-3xl">
              A little inspiration, delivered.
            </h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/55">
              Get standout campaigns, creator tips and platform news in your inbox.
            </p>
          </div>

          <div>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 rounded-xl border border-white/10 bg-[#241a15] p-2 sm:flex-row sm:items-center">
              <label htmlFor="footer-newsletter-email" className="sr-only">Your email address</label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                className="h-11 min-w-0 flex-1 rounded-lg bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35 focus:ring-2 focus:ring-[#e6b394]/50"
              />
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#e6b394] px-5 text-sm font-bold text-[#2b211c] transition hover:bg-[#f2c9ae] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Joiningâ€¦' : 'Subscribe'} <span aria-hidden="true">â†—</span>
              </button>
            </form>
            <p aria-live="polite" className="mt-2 min-h-4 px-1 text-[11px] text-white/40">
              {message || 'No spam. Just opportunities and ideas worth opening.'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative mt-8 border-t border-white/10 sm:mt-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/45">
            <span>Â© {new Date().getFullYear()} Adrovis Technologies</span>
            <Link to="/terms" className="transition hover:text-white">Terms</Link>
            <Link to="/privacy" className="transition hover:text-white">Privacy</Link>
            <Link to="/contact" className="transition hover:text-white">Contact</Link>
          </div>

          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[11px] font-bold text-white/65 transition hover:border-[#e6b394] hover:bg-[#e6b394] hover:text-[#2b211c]"
              >
                {social.mark}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

```

## FILE: src\components\layout\Logo.jsx
```
import React from 'react';

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="4" y1="4" x2="28" y2="28">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
        <path d="M16 3 4 28h6.2l1.9-4.4h7.8l1.9 4.4H28L16 3Zm0 9.8 2.6 6H13.4l2.6-6Z" fill="url(#lg)" />
      </svg>
      <span className="text-[22px] font-extrabold tracking-tight text-white">Adrovis</span>
    </span>
  );
}

```

## FILE: src\components\layout\Navbar.jsx
```
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, User, Building2, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fffdfa]/95 backdrop-blur-md border-b border-[#f3eee8]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between gap-6">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#f97316] text-white flex items-center justify-center shadow-sm shadow-orange-500/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10" />
              <path d="M12 6a6 6 0 1 0 6 6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-[#221711]">InfluencerHub</span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-[#5a4e46]">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'text-[#1d130c] font-semibold' : 'hover:text-[#1d130c] transition'}>
            Home
          </NavLink>
          <NavLink to="/campaigns" className={({ isActive }) => isActive ? 'text-[#1d130c] font-semibold' : 'hover:text-[#1d130c] transition'}>
            Campaigns
          </NavLink>
          <NavLink to="/for-creators" className={({ isActive }) => isActive ? 'text-[#1d130c] font-semibold' : 'hover:text-[#1d130c] transition'}>
            For Creators
          </NavLink>
          <NavLink to="/brands" className={({ isActive }) => isActive ? 'text-[#1d130c] font-semibold' : 'hover:text-[#1d130c] transition'}>
            For Brands
          </NavLink>
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-[#1d130c] transition">
            <span>Resources</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8c7e75] group-hover:rotate-180 transition-transform" />
          </div>
          <NavLink to="/how-it-works" className={({ isActive }) => isActive ? 'text-[#1d130c] font-semibold' : 'hover:text-[#1d130c] transition'}>
            Pricing
          </NavLink>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/admin"
            className="px-4 py-2 text-[14px] font-medium text-[#443831] hover:text-[#1d130c] transition"
          >
            Log In
          </Link>

          {/* Sign Up Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenSignUp(v => !v)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#24140b] text-white text-[13px] font-semibold hover:bg-[#341d10] shadow-sm transition"
            >
              <span>Sign Up</span>
              <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform ${openSignUp ? 'rotate-180' : ''}`} />
            </button>

            {openSignUp && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white border border-[#ece5de] rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1"
                onMouseLeave={() => setOpenSignUp(false)}
              >
                <Link
                  to="/for-creators"
                  onClick={() => setOpenSignUp(false)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl text-[#3b2d24] font-semibold hover:bg-[#faf6f2] transition"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <span>Join as Creator</span>
                </Link>

                <Link
                  to="/brands"
                  onClick={() => setOpenSignUp(false)}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl text-[#3b2d24] font-semibold hover:bg-[#faf6f2] transition"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span>Join as Brand / Agency</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu hamburger */}
        <button
          onClick={() => setMobileMenu(v => !v)}
          className="md:hidden p-2 text-[#443831] hover:text-black"
        >
          {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenu && (
        <div className="md:hidden border-t border-[#f0eae3] bg-[#fffdfa] px-6 py-5 space-y-3">
          <Link to="/" onClick={() => setMobileMenu(false)} className="block text-sm font-semibold text-[#24140b]">Home</Link>
          <Link to="/campaigns" onClick={() => setMobileMenu(false)} className="block text-sm font-semibold text-[#5a4e46]">Campaigns</Link>
          <Link to="/for-creators" onClick={() => setMobileMenu(false)} className="block text-sm font-semibold text-[#5a4e46]">For Creators</Link>
          <Link to="/brands" onClick={() => setMobileMenu(false)} className="block text-sm font-semibold text-[#5a4e46]">For Brands</Link>
          <div className="pt-3 border-t border-[#f0eae3] flex flex-col gap-2">
            <Link to="/admin" className="btn btn-outline text-center !py-2.5">Log In</Link>
            <Link to="/for-creators" className="btn btn-primary text-center !py-2.5">Join as Creator</Link>
          </div>
        </div>
      )}
    </header>
  );
}
```

## FILE: src\components\layout\PageHero.jsx
```
import React from 'react';

export default function PageHero({ title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden bg-[#150f33] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_85%_0%,rgba(139,92,246,.55),transparent_60%),radial-gradient(40%_60%_at_0%_100%,rgba(79,70,229,.35),transparent_70%)]" />
      <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-14 lg:py-20">
        <h1 className="text-4xl lg:text-5xl font-extrabold leading-[1.08] max-w-2xl">{title}</h1>
        {subtitle && <p className="mt-4 text-lg text-white/75 max-w-xl leading-relaxed">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

```

## FILE: src\components\layout\PublicLayout.jsx
```
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}

```

## FILE: src\index.css
```
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --ink: #17122f;
  --ink-soft: #5d5877;
  --line: #e7e3f2;
  --surface: #ffffff;
  --canvas: #f6f4fb;
  --night: #150f33;
  --violet: #6d28d9;
  --violet-deep: #4c1d95;
  --violet-tint: #f1ebfd;
}

html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--canvas);
  color: var(--ink);
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  letter-spacing: -0.005em;
}
h1, h2, h3, h4 { letter-spacing: -0.02em; }
:focus-visible { outline: 2px solid #8b5cf6; outline-offset: 2px; }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 11px 20px; border-radius: 999px; font-weight: 700; font-size: 14px;
  transition: transform .15s ease, background .2s ease, box-shadow .2s ease, border-color .2s ease;
  cursor: pointer; white-space: nowrap;
}
.btn:active { transform: scale(.98); }
.btn-primary {
  color: #fff; background: linear-gradient(180deg, #7c3aed 0%, #5b21b6 100%);
  box-shadow: 0 6px 18px -6px rgba(91, 33, 182, .65), inset 0 1px 0 rgba(255,255,255,.18);
}
.btn-primary:hover { background: linear-gradient(180deg, #8b5cf6 0%, #6d28d9 100%); }
.btn-outline { color: var(--ink); background: #fff; border: 1px solid var(--line); }
.btn-outline:hover { border-color: #c4b5fd; background: var(--violet-tint); }
.btn-light { color: #fff; border: 1px solid rgba(255,255,255,.35); background: rgba(255,255,255,.06); }
.btn-light:hover { background: rgba(255,255,255,.14); }

.card { background: var(--surface); border: 1px solid var(--line); border-radius: 22px; box-shadow: 0 1px 2px rgba(23,18,47,.04), 0 12px 32px -18px rgba(23,18,47,.18); }
.chip { display: inline-flex; align-items: center; gap: 8px; padding: 9px 16px; border-radius: 999px; font-size: 13px; font-weight: 600; background: #fff; border: 1px solid var(--line); color: var(--ink); transition: all .2s ease; cursor: pointer; white-space: nowrap; }
.chip:hover { border-color: #c4b5fd; }
.chip[data-active='true'] { background: linear-gradient(180deg, #6d28d9, #4c1d95); color: #fff; border-color: transparent; box-shadow: 0 8px 20px -10px rgba(76,29,149,.8); }
.input { width: 100%; padding: 11px 14px; border-radius: 14px; border: 1px solid var(--line); background: #fff; font-size: 14px; color: var(--ink); }
.input:focus { outline: none; border-color: #8b5cf6; box-shadow: 0 0 0 3px rgba(139,92,246,.18); }
.skeleton { background: linear-gradient(90deg, #eeeaf8 25%, #f7f5fc 50%, #eeeaf8 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 14px; }
@keyframes shimmer { to { background-position: -200% 0; } }
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { scrollbar-width: none; }
@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }



/* =========================================
   PREMIUM CAMPAIGN MARKETPLACE
========================================= */

.campaign-page {
  background: #faf7f3;
  color: #302019;
}

.campaign-intro {
  background:
    radial-gradient(ellipse at 85% 15%, rgba(231, 194, 165, .17), transparent 40%),
    #faf7f3;
}

/* Fresh campaigns */

.fresh-campaign {
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
  padding: 12px;
  border: 1px solid #eee3da;
  border-radius: 15px;
  background: rgba(255,255,255,.8);
  transition: border-color .25s, transform .25s, background .25s;
  animation: campaignFade .45s ease both;
}

.fresh-campaign:hover {
  border-color: #d6b39b;
  background: #fff;
  transform: translateY(-2px);
}

@keyframes campaignFade {
  from {
    opacity: 0;
    transform: translateY(7px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Category navigation */

.campaign-category-section {
  padding: 19px 20px 12px;
  border: 1px solid #eee3da;
  border-radius: 18px;
  background: rgba(255,255,255,.65);
}

.campaign-category {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-shrink: 0;
  padding: 10px 15px;
  border: 1px solid #eee3da;
  border-radius: 50px;
  background: #fff;
  color: #79695e;
  font-size: 12px;
  font-weight: 650;
  white-space: nowrap;
  transition: all .2s ease;
}

.campaign-category:hover {
  border-color: #c99a7a;
  color: #8e6045;
}

.campaign-category.active {
  background: #302019;
  border-color: #302019;
  color: #fff;
}

/* Search */

.campaign-search {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 49px;
  padding: 0 16px;
  border: 1px solid #e9ddd3;
  border-radius: 12px;
  background: #fff;
  transition: border-color .2s, box-shadow .2s;
}

.campaign-search:focus-within {
  border-color: #bb896b;
  box-shadow: 0 0 0 3px rgba(187,137,107,.09);
}

.campaign-search input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: #302019;
  font-size: 13px;
}

.campaign-search input::placeholder {
  color: #b1a39a;
}

.campaign-filter-button,
.campaign-sort {
  min-height: 49px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 17px;
  border: 1px solid #e9ddd3;
  border-radius: 12px;
  background: #fff;
  color: #49372c;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
  transition: all .2s ease;
}

.campaign-filter-button:hover,
.campaign-filter-button.selected {
  border-color: #b98b70;
  background: #f8eee7;
}

.campaign-filter-count {
  display: grid;
  place-items: center;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: #302019;
  color: #fff;
  font-size: 10px;
}

.campaign-sort {
  position: relative;
}

.campaign-sort select {
  appearance: none;
  padding-right: 16px;
  border: 0;
  outline: 0;
  background: transparent;
  color: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.campaign-sort > svg {
  pointer-events: none;
}

/* Filters */

.campaign-filter-panel {
  margin-top: 12px;
  padding: 22px;
  border: 1px solid #ebdfd5;
  border-radius: 17px;
  background: #fff;
  box-shadow: 0 15px 40px rgba(65,42,29,.045);
  animation: campaignFade .25s ease;
}

.campaign-filter-field {
  display: flex;
  flex-direction: column;
  gap: 9px;
  color: #665247;
  font-size: 12px;
  font-weight: 750;
}

.campaign-filter-field select {
  width: 100%;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid #eadfd7;
  border-radius: 10px;
  outline: none;
  background: #fcfaf8;
  color: #45352b;
  font-size: 12px;
}

.campaign-filter-field select:focus {
  border-color: #bb896b;
}

.campaign-reset {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #a16b4e;
  font-size: 12px;
  font-weight: 750;
}

.campaign-active-filter {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 11px;
  border: 1px solid #ead9cc;
  border-radius: 30px;
  background: #fff;
  color: #77533e;
  font-size: 11px;
  font-weight: 650;
}

/* Campaign cards */

.premium-campaign-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;
  overflow: hidden;
  border: 1px solid #ecdfd5;
  border-radius: 19px;
  background: #fff;
  box-shadow: 0 5px 20px rgba(64,39,24,.025);
  transition:
    transform .3s ease,
    box-shadow .3s ease,
    border-color .3s ease;
}

.premium-campaign-card:hover {
  transform: translateY(-4px);
  border-color: #d9bca7;
  box-shadow: 0 18px 38px rgba(64,39,24,.085);
}

.premium-campaign-image {
  position: relative;
  display: block;
  height: 180px;
  flex-shrink: 0;
  overflow: hidden;
  background: #f0e6de;
}

.premium-campaign-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.premium-campaign-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 15px;
  padding: 17px;
}

.campaign-reward-box {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 75px;
  padding: 13px 14px;
  border-radius: 13px;
  background: #f9f5f1;
}

.campaign-requirements {
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-height: 47px;
}

.campaign-requirements span {
  display: block;
  overflow: hidden;
  padding: 7px 10px;
  border: 1px solid #eee1d7;
  border-radius: 30px;
  color: #866c5b;
  font-size: 10px;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.campaign-primary-action,
.campaign-secondary-action {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 800;
  transition: all .2s ease;
}

.campaign-primary-action {
  border: 1px solid #302019;
  background: #302019;
  color: #fff;
}

.campaign-primary-action:hover {
  border-color: #684631;
  background: #684631;
}

.campaign-secondary-action {
  border: 1px solid #e6d4c6;
  background: #fff;
  color: #49352a;
}

.campaign-secondary-action:hover {
  border-color: #bb896b;
  background: #faf4ef;
}

/* Empty state and pagination */

.campaign-empty {
  padding: 65px 20px;
  border: 1px solid #ebdfd5;
  border-radius: 18px;
  background: #fff;
  text-align: center;
}

.campaign-primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 43px;
  padding: 0 18px;
  border-radius: 10px;
  background: #302019;
  color: #fff;
  font-size: 12px;
  font-weight: 750;
}

.campaign-page-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 39px;
  padding: 0 14px;
  border: 1px solid #e8d9ce;
  border-radius: 9px;
  background: #fff;
  color: #49352a;
  font-size: 11px;
  font-weight: 700;
}

.campaign-page-button:disabled {
  opacity: .4;
  cursor: not-allowed;
}

/* Mobile */

@media (max-width: 640px) {
  .campaign-intro {
    padding-top: 0;
  }

  .campaign-category-section {
    padding: 15px 12px 10px;
    border-radius: 14px;
  }

  .campaign-category {
    padding: 9px 12px;
    font-size: 11px;
  }

  .campaign-search {
    min-height: 46px;
  }

  .campaign-filter-button,
  .campaign-sort {
    min-height: 45px;
    padding: 0 12px;
    font-size: 11px;
  }

  .campaign-filter-panel {
    padding: 17px;
  }

  .premium-campaign-image {
    height: 175px;
  }

  .premium-campaign-body {
    padding: 14px;
    gap: 13px;
  }

  .fresh-campaign {
    padding: 9px;
    gap: 8px;
  }

  .fresh-campaign:nth-child(n+3) {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .campaign-page *,
  .campaign-page *::before,
  .campaign-page *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}


/* CAMPAIGN SPOTLIGHT */

.campaign-spotlight-section {
  margin: 30px 0 34px;
}

.campaign-spotlight {
  position: relative;
  height: 300px;
  overflow: hidden;
  border-radius: 20px;
  isolation: isolate;
  background: #39271e;
}

.campaign-spotlight-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 42%;
  z-index: -2;
  animation: spotlightImageIn .6s ease;
}

@keyframes spotlightImageIn {
  from { opacity: .6; transform: scale(1.025); }
  to { opacity: 1; transform: scale(1); }
}

.campaign-spotlight-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(90deg,
      rgba(32, 19, 13, .94) 0%,
      rgba(32, 19, 13, .78) 38%,
      rgba(32, 19, 13, .28) 75%,
      rgba(32, 19, 13, .12) 100%),
    linear-gradient(0deg, rgba(25,15,10,.35), transparent 60%);
}

.campaign-spotlight-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 30px 55px;
}

.spotlight-tag {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 11px;
  border: 1px solid rgba(255,255,255,.22);
  border-radius: 30px;
  background: rgba(255,255,255,.14);
  color: #fff;
  backdrop-filter: blur(10px);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .09em;
}

.spotlight-tag-light {
  background: rgba(242,193,162,.95);
  border-color: transparent;
  color: #38251b;
}

.spotlight-primary,
.spotlight-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 43px;
  padding: 0 17px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 800;
  transition: all .2s ease;
}

.spotlight-primary {
  background: #f0c3a5;
  color: #302019;
}

.spotlight-primary:hover {
  background: #ffdcc3;
  transform: translateY(-2px);
}

.spotlight-secondary {
  color: white;
  background: rgba(255,255,255,.12);
  border: 1px solid rgba(255,255,255,.35);
  backdrop-filter: blur(8px);
}

.spotlight-secondary:hover {
  background: rgba(255,255,255,.23);
}

.spotlight-arrow {
  position: absolute;
  z-index: 3;
  top: 50%;
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.3);
  background: rgba(255,255,255,.17);
  color: white;
  backdrop-filter: blur(8px);
  transform: translateY(-50%);
  transition: background .2s;
}

.spotlight-arrow:hover {
  background: rgba(255,255,255,.35);
}

.spotlight-arrow-left { left: 13px; }
.spotlight-arrow-right { right: 13px; }

.spotlight-dots {
  position: absolute;
  bottom: 17px;
  right: 24px;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 6px;
}

.spotlight-dot {
  width: 7px;
  height: 7px;
  border-radius: 20px;
  background: rgba(255,255,255,.5);
  transition: all .3s ease;
}

.spotlight-dot.active {
  width: 24px;
  background: #f0c3a5;
}

/* MOBILE */

@media (max-width: 640px) {
  .campaign-spotlight-section {
    margin: 22px 0 26px;
  }

  .campaign-spotlight {
    height: 270px;
    border-radius: 16px;
  }

  .campaign-spotlight-content {
    padding: 20px 19px 27px;
  }

  .campaign-spotlight-overlay {
    background:
      linear-gradient(90deg,
        rgba(32,19,13,.88),
        rgba(32,19,13,.42)),
      linear-gradient(0deg,
        rgba(25,15,10,.65),
        transparent 85%);
  }

  .campaign-spotlight h2 {
    font-size: 25px;
  }

  .campaign-spotlight-content .mt-6 {
    margin-top: 17px;
  }

  .spotlight-arrow {
    width: 30px;
    height: 30px;
    top: 47px;
  }

  .spotlight-arrow-left { left: auto; right: 53px; }
  .spotlight-arrow-right { right: 16px; }

  .spotlight-dots {
    bottom: 12px;
    right: 17px;
  }

  .spotlight-primary,
  .spotlight-secondary {
    min-height: 39px;
    padding: 0 12px;
    font-size: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .campaign-spotlight-image {
    animation: none;
  }
}
@keyframes campaignFade {
  from {
    opacity: 0.65;
  }
  to {
    opacity: 1;
  }
}
```

## FILE: src\main.jsx
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## FILE: src\pages\Brands.jsx
```
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import { fetchCampaigns } from '../services/api';
import { initials } from '../utils/format';

export default function Brands() {
  const [items, setItems] = useState(null);
  useEffect(() => { fetchCampaigns({ page: 0, size: 100 }).then((d) => setItems(d?.content || [])).catch(() => setItems([])); }, []);

  const brands = useMemo(() => {
    const map = new Map();
    (items || []).forEach((c) => {
      const b = map.get(c.brandName) || { name: c.brandName, count: 0, image: c.images?.[0] };
      b.count += 1; map.set(c.brandName, b);
    });
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [items]);

  return (
    <>
      <PageHero title="Brands hiring creators" subtitle="Every brand with an open campaign right now. Pick one to see all of its collaborations." />
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-12">
        {items === null && <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton h-36" />)}</div>}
        {items && brands.length === 0 && <p className="text-[#5d5877]">No brands have live campaigns yet.</p>}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {brands.map((b) => (
            <Link key={b.name} to={`/campaigns?brand=${encodeURIComponent(b.name)}`} className="card p-6 group hover:-translate-y-0.5 transition-transform">
              <div className="flex items-start justify-between">
                <span className="w-12 h-12 rounded-xl bg-[#150f33] text-white text-lg font-extrabold grid place-items-center">{initials(b.name)}</span>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-violet-600 transition-colors" />
              </div>
              <h3 className="mt-5 font-extrabold text-lg">{b.name}</h3>
              <p className="text-sm text-[#5d5877] mt-1">{b.count} live {b.count === 1 ? 'campaign' : 'campaigns'}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

```

## FILE: src\pages\CampaignDetails.jsx
```
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Gift,
  Heart,
  MapPin,
  Package,
  RotateCw,
  Share2,
  Users,
  Wallet,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Config                                                                    */
/* -------------------------------------------------------------------------- */

const API_BASE = "https://adrovis-influencer-backend.onrender.com";
const SAVED_KEY = "collabhub:saved-campaigns";
const DAY_MS = 86_400_000;

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a66c4b]";

const BRAND_STYLES = {
  nykaa: { bg: "#fce8ee", color: "#d12c62" },
  ponds: { bg: "#e8f3f8", color: "#397d9e" },
  minimalist: { bg: "#eeeeeb", color: "#55564e" },
  "earth rhythm": { bg: "#eaf1e7", color: "#55794e" },
  mamaearth: { bg: "#edf4e8", color: "#528345" },
  puma: { bg: "#eeeeee", color: "#252525" },
  swiggy: { bg: "#fff0e4", color: "#e87924" },
  boat: { bg: "#f0eafa", color: "#6741a0" },
};

const GENDER_LABELS = {
  FEMALE_ONLY: "Female creators only",
  MALE_ONLY: "Male creators only",
};

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const brandStyle = (name = "") =>
  BRAND_STYLES[name.toLowerCase()] || { bg: "#f5eee8", color: "#8b6149" };

const unwrap = (result) => result?.data?.data ?? result?.data ?? null;

const inr = (value) => `â‚¹${Number(value).toLocaleString("en-IN")}`;

const isPaidCampaign = (c) => c?.campaignType?.toUpperCase() === "PAID";

/** Date-only strings ("2026-11-25") are treated as end of that local day. */
const parseDate = (value) => {
  if (!value) return null;
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T23:59:59`)
    : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (date) =>
  date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatFollowers = (value) => {
  const n = Number(value);
  if (!value || Number.isNaN(n)) return null;
  return n >= 1000
    ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k+`
    : `${n.toLocaleString("en-IN")}+`;
};

const uniqueStrings = (list) => [
  ...new Set(
    list
      .filter((item) => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
  ),
];

/** Reward shown as the headline of the campaign. */
const getReward = (campaign) => {
  const comp = campaign?.compensation || {};

  if (isPaidCampaign(campaign)) {
    const amount =
      comp.creator_payout ||
      (comp.payout_amount_inr ? inr(comp.payout_amount_inr) : null);
    const hasTiers = comp.payout_tiers?.length > 1;
    return {
      value: amount || "Paid",
      caption: hasTiers ? "Cash payout, based on followers" : "Cash payout",
      short: amount || "Paid",
    };
  }

  const amount =
    comp.product_value ||
    (comp.product_value_inr ? inr(comp.product_value_inr) : null);
  return {
    value: amount || "Free product",
    caption: amount ? "Free product, value" : "Product barter",
    short: amount ? `Product ${amount}` : "Product barter",
  };
};

const getStatus = (campaign) => {
  const applyBy = parseDate(campaign?.schedule?.application_deadline);
  const deadline = applyBy || parseDate(campaign?.expiresAt);
  if (!deadline) return { closed: false, label: null };

  const diff = deadline.getTime() - Date.now();
  if (diff < 0) return { closed: true, label: "Applications closed" };
  if (diff < DAY_MS) return { closed: false, label: "Closes today" };

  const days = Math.ceil(diff / DAY_MS);
  if (days <= 14) return { closed: false, label: `${days} days left to apply` };

  return {
    closed: false,
    label: `${applyBy ? "Apply by" : "Open until"} ${formatDate(deadline)}`,
  };
};

const getApplyUrl = (campaign) => {
  // The API returns a proxy URL that may point at an internal host
  // (e.g. localhost:8080), so only its path is trusted.
  try {
    const { pathname, search } = new URL(campaign.applyProxyUrl);
    return `${API_BASE}${pathname}${search}`;
  } catch {
    return `${API_BASE}/api/v1/campaigns/${campaign.id}/apply`;
  }
};

const prettyUrl = (url) => {
  try {
    const { hostname, pathname } = new URL(url);
    const path = pathname === "/" ? "" : pathname;
    return `${hostname.replace(/^www\./, "")}${path}`;
  } catch {
    return url;
  }
};

const readSaved = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(SAVED_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                     */
/* -------------------------------------------------------------------------- */

function useSavedCampaign(id) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readSaved().includes(id));
  }, [id]);

  const toggle = useCallback(() => {
    const list = readSaved();
    const next = list.includes(id)
      ? list.filter((item) => item !== id)
      : [...list, id];
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable: keep the in-memory state only */
    }
    setSaved(next.includes(id));
  }, [id]);

  return [saved, toggle];
}

function useIsVisible(ref) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return visible;
}

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
/* -------------------------------------------------------------------------- */

function BrandMark({ brand, size = 48 }) {
  const { bg, color } = brandStyle(brand);
  return (
    <span
      aria-hidden="true"
      className="grid shrink-0 place-items-center rounded-2xl font-extrabold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        backgroundColor: bg,
        color,
      }}
    >
      {brand.charAt(0).toUpperCase()}
    </span>
  );
}

/**
 * Shows the whole image (never cropped). The empty space around it is filled
 * with a blurred copy of the same image so every frame looks intentional.
 */
function FramedImage({ src, alt, className = "", lazy = false, onError }) {
  return (
    <div className={`relative overflow-hidden bg-[#f3eae3] ${className}`}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading={lazy ? "lazy" : undefined}
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-2xl"
      />
      <img
        src={src}
        alt={alt}
        loading={lazy ? "lazy" : undefined}
        decoding="async"
        onError={onError}
        className="relative h-full w-full object-contain"
      />
    </div>
  );
}

function IconButton({ label, onClick, children, active = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active || undefined}
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border transition ${FOCUS} ${
        active
          ? "border-[#efc9b6] bg-[#fff0e7] text-[#bd5d45]"
          : "border-[#eadfd6] bg-white text-[#775b49] hover:bg-[#faf0e8]"
      }`}
    >
      {children}
    </button>
  );
}

function ApplyButton({ url, closed, className = "" }) {
  if (closed) {
    return (
      <span
        aria-disabled="true"
        className={`flex h-12 items-center justify-center rounded-xl bg-[#efe6de] px-6 text-sm font-bold text-[#9a8172] ${className}`}
      >
        Applications closed
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`flex h-12 items-center justify-center gap-2 rounded-xl bg-[#382218] px-6 text-sm font-bold text-white transition hover:bg-[#68422d] ${FOCUS} ${className}`}
    >
      Apply now
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

function Section({ title, children }) {
  return (
    <section className="border-t border-[#eadfd6] pt-6">
      <h2 className="text-base font-bold tracking-tight text-[#302017]">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function CheckList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#eaf1e7] text-[#60804e]">
            <Check size={12} aria-hidden="true" />
          </span>
          <span className="text-sm leading-6 text-[#5f4c40]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gallery                                                                   */
/* -------------------------------------------------------------------------- */

function Gallery({ images, brand }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(() => new Set());
  const touchX = useRef(null);
  const stripRef = useRef(null);

  const visible = useMemo(
    () => images.filter((src) => !failed.has(src)),
    [images, failed]
  );
  const count = visible.length;
  const current = count ? Math.min(index, count - 1) : 0;

  const go = useCallback(
    (step) => {
      if (count > 1) setIndex((current + step + count) % count);
    },
    [count, current]
  );

  // Keep the active thumbnail centred without scrolling the page itself.
  useEffect(() => {
    const strip = stripRef.current;
    const el = strip?.children[current];
    if (!strip || !el) return;
    strip.scrollTo({
      left: el.offsetLeft - (strip.clientWidth - el.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [current]);

  const frame =
    "aspect-[4/3] w-full rounded-2xl border border-[#eadfd6] lg:aspect-square lg:max-h-[calc(100dvh-8rem)]";

  if (count === 0) {
    const { bg, color } = brandStyle(brand);
    return (
      <div
        className={`${frame} grid place-items-center`}
        style={{ backgroundColor: bg }}
      >
        <span
          className="grid h-24 w-24 place-items-center rounded-3xl bg-white text-4xl font-bold shadow-sm"
          style={{ color }}
        >
          {brand.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  const arrow =
    "absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/90 text-[#302017] shadow-sm transition hover:bg-white";

  return (
    <div>
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={`${brand} campaign images`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") go(-1);
          if (e.key === "ArrowRight") go(1);
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(delta) > 40) go(delta < 0 ? 1 : -1);
        }}
        className={`relative ${FOCUS} rounded-2xl`}
      >
        <FramedImage
          key={visible[current]}
          src={visible[current]}
          alt={`${brand} campaign image ${current + 1} of ${count}`}
          className={frame}
          onError={() =>
            setFailed((prev) => new Set(prev).add(visible[current]))
          }
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className={`${arrow} left-3 ${FOCUS}`}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className={`${arrow} right-3 ${FOCUS}`}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
            <span
              aria-live="polite"
              className="absolute bottom-3 right-3 rounded-full bg-[#24170f]/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
            >
              {current + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div
          ref={stripRef}
          className="relative mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {visible.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === current}
              className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-16 sm:w-16 ${FOCUS} ${
                i === current
                  ? "border-[#bd805d]"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Campaign view                                                             */
/* -------------------------------------------------------------------------- */

function CampaignView({ campaign, related }) {
  const [saved, toggleSaved] = useSavedCampaign(campaign.id);
  const [copied, setCopied] = useState(false);
  const ctaRef = useRef(null);
  const ctaVisible = useIsVisible(ctaRef);

  const brand = campaign.brandName || "Brand";
  const isPaid = isPaidCampaign(campaign);
  const comp = campaign.compensation || {};
  const eligibility = campaign.eligibility || {};
  const schedule = campaign.schedule || {};

  const images = useMemo(
    () => uniqueStrings(campaign.images || []),
    [campaign.images]
  );
  const categories = uniqueStrings(campaign.categories || []);
  const deliverables = uniqueStrings(campaign.deliverables || []);
  const locations = uniqueStrings(eligibility.locations || []);
  const references = uniqueStrings(campaign.referenceLinks || []);
  const tiers = comp.payout_tiers || [];

  // Same rule can live in two fields on the API, so merge and de-duplicate.
  const requirements = uniqueStrings([
    ...(campaign.importantRequirements || []),
    ...(eligibility.other_requirements || []),
  ]);

  const reward = getReward(campaign);
  const status = getStatus(campaign);
  const applyUrl = getApplyUrl(campaign);

  const followers =
    eligibility.minimum_followers_display ||
    formatFollowers(eligibility.minimum_followers);
  const gender =
    eligibility.gender && eligibility.gender !== "NOT_SPECIFIED"
      ? GENDER_LABELS[eligibility.gender] ||
        eligibility.gender.replaceAll("_", " ").toLowerCase()
      : null;

  let productFact = null;
  if (isPaid && comp.product_provided === "YES") {
    productFact = comp.product_value
      ? `Provided by brand, worth ${comp.product_value}`
      : "Provided by brand";
  } else if (isPaid && comp.product_provided === "NO") {
    productFact = "Not provided";
  }

  const facts = [
    followers && { icon: Users, label: "Minimum followers", value: followers },
    gender && { icon: Users, label: "Open to", value: gender },
    locations.length > 0 && {
      icon: MapPin,
      label: "Locations",
      value: locations.join(", "),
    },
    productFact && { icon: Gift, label: "Product", value: productFact },
  ].filter(Boolean);

  const hasSchedule = [
    schedule.application_deadline,
    schedule.content_submission_deadline,
    schedule.go_live_date,
  ].some(Boolean);

  const timeline = hasSchedule
    ? [
        ["Applications close", schedule.application_deadline],
        ["Content due", schedule.content_submission_deadline],
        ["Go live", schedule.go_live_date],
        ["Listing closes", campaign.expiresAt],
      ]
        .map(([label, value]) => ({ label, date: parseDate(value) }))
        .filter((item) => item.date)
        .sort((a, b) => a.date - b.date)
    : [];

  const hasDetails =
    facts.length > 0 ||
    tiers.length > 0 ||
    comp.compensation_details ||
    deliverables.length > 0 ||
    requirements.length > 0 ||
    timeline.length > 0 ||
    campaign.adRights ||
    references.length > 0;

  const handleShare = async () => {
    const data = { title: campaign.campaignTitle || "Campaign", url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(data.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* share dismissed or clipboard blocked */
    }
  };

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
        {/* Gallery */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <Gallery images={images} brand={brand} />
        </div>

        {/* Details */}
        <div className="min-w-0 space-y-8">
          <header>
            <div className="flex items-center gap-3">
              <BrandMark brand={brand} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[#302017]">
                  {brand}
                </p>
                <p className="text-xs text-[#9a8172]">
                  {isPaid ? "Paid collaboration" : "Product barter"}
                </p>
              </div>
              <IconButton
                label={saved ? "Remove from saved" : "Save campaign"}
                onClick={toggleSaved}
                active={saved}
              >
                <Heart
                  size={18}
                  fill={saved ? "currentColor" : "none"}
                  aria-hidden="true"
                />
              </IconButton>
              <IconButton label="Share campaign" onClick={handleShare}>
                <Share2 size={17} aria-hidden="true" />
              </IconButton>
            </div>

            <h1 className="mt-5 text-[26px] font-extrabold leading-[1.18] tracking-[-0.03em] text-[#302017] sm:text-[32px]">
              {campaign.campaignTitle}
            </h1>

            {(categories.length > 0 || campaign.brandInstagramUrl) && (
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-[#ead8ca] bg-[#fffaf6] px-3 py-1.5 text-xs font-semibold text-[#76543e]"
                  >
                    {category}
                  </span>
                ))}
                {campaign.brandInstagramUrl && (
                  <a
                    href={campaign.brandInstagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1.5 rounded-full border border-[#ead8ca] bg-white px-3 py-1.5 text-xs font-semibold text-[#76543e] hover:bg-[#faf0e8] ${FOCUS}`}
                  >
                    <Camera size={12} aria-hidden="true" />
                    Brand Instagram
                    <ExternalLink size={10} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </header>

          {/* Reward + facts + apply */}
          <section
            aria-label="Reward and eligibility"
            className="rounded-2xl border border-[#eadfd6] bg-white p-5 shadow-[0_8px_30px_rgba(55,32,21,.045)] sm:p-6"
          >
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#faf0e8] text-[#a66c4b]">
                {isPaid ? (
                  <Wallet size={22} aria-hidden="true" />
                ) : (
                  <Gift size={22} aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-xs text-[#9a8172]">{reward.caption}</p>
                <p className="text-[28px] font-extrabold leading-tight tracking-tight text-[#302017]">
                  {reward.value}
                </p>
              </div>
            </div>

            {comp.compensation_details && (
              <p className="mt-4 text-sm leading-6 text-[#725d4e]">
                {comp.compensation_details}
              </p>
            )}

            {tiers.length > 0 && (
              <div className="mt-5">
                <h2 className="text-sm font-bold text-[#302017]">
                  Payout by followers
                </h2>
                <dl className="mt-2 divide-y divide-[#f0e7e0] rounded-xl border border-[#eadfd6]">
                  {tiers.map((tier, i) => (
                    <div
                      key={`${tier.follower_range}-${i}`}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                      <dt className="text-sm text-[#806d60]">
                        {tier.follower_range || "Creator tier"}
                      </dt>
                      <dd className="text-sm font-bold text-[#302017]">
                        {tier.payout_display ||
                          (tier.payout_inr ? inr(tier.payout_inr) : "")}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {facts.length > 0 && (
              <dl className="mt-5 grid gap-x-6 gap-y-4 border-t border-[#eee4dc] pt-5 sm:grid-cols-2">
                {facts.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex min-w-0 items-start gap-2.5">
                    <Icon
                      size={17}
                      className="mt-0.5 shrink-0 text-[#a8785d]"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <dt className="text-xs text-[#9a8172]">{label}</dt>
                      <dd className="mt-0.5 break-words text-sm font-semibold text-[#302017]">
                        {value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            )}

            <div ref={ctaRef} className="mt-6">
              <ApplyButton url={applyUrl} closed={status.closed} className="w-full" />
              {status.label && !status.closed && (
                <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#8f796a]">
                  <Clock3 size={14} aria-hidden="true" />
                  {status.label}
                </p>
              )}
            </div>
          </section>

          {deliverables.length > 0 && (
            <Section title="What you'll deliver">
              <CheckList items={deliverables} />
              {campaign.adRights && (
                <p className="mt-4 rounded-xl bg-[#faf4ef] p-4 text-sm leading-6 text-[#766255]">
                  <span className="font-bold text-[#8c6248]">
                    Content usage rights:{" "}
                  </span>
                  {campaign.adRights}
                </p>
              )}
            </Section>
          )}

          {deliverables.length === 0 && campaign.adRights && (
            <Section title="Content usage rights">
              <p className="text-sm leading-6 text-[#766255]">
                {campaign.adRights}
              </p>
            </Section>
          )}

          {requirements.length > 0 && (
            <Section title="Guidelines">
              <CheckList items={requirements} />
            </Section>
          )}

          {timeline.length > 0 && (
            <Section title="Timeline">
              <dl className="divide-y divide-[#f0e7e0] rounded-xl border border-[#eadfd6] bg-white">
                {timeline.map(({ label, date }) => {
                  const passed = date.getTime() < Date.now();
                  return (
                    <div
                      key={label}
                      className="flex items-center justify-between gap-3 px-4 py-3"
                    >
                      <dt className="text-sm text-[#806d60]">{label}</dt>
                      <dd
                        className={`text-sm font-bold ${
                          passed ? "text-[#a89587]" : "text-[#302017]"
                        }`}
                      >
                        {formatDate(date)}
                        {passed && (
                          <span className="ml-2 text-xs font-medium">
                            Passed
                          </span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </Section>
          )}

          {references.length > 0 && (
            <Section title="Brand links">
              <ul className="space-y-2">
                {references.map((url) => (
                  <li key={url}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex max-w-full items-center gap-2 text-sm font-semibold text-[#986848] hover:underline ${FOCUS}`}
                    >
                      <ExternalLink size={14} className="shrink-0" aria-hidden="true" />
                      <span className="truncate">{prettyUrl(url)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {!hasDetails && (
            <p className="rounded-xl bg-[#faf4ef] p-4 text-sm leading-6 text-[#766255]">
              {brand} hasn't shared the full brief yet. You can still apply and
              check the requirements on the application form.
            </p>
          )}
        </div>
      </div>

      {/* Related campaigns */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-[#eadfd6] pt-8">
          <div className="mb-5 flex items-end justify-between gap-4">
            <h2 className="text-xl font-extrabold tracking-tight text-[#302017] sm:text-2xl">
              More campaigns
            </h2>
            <Link
              to="/campaigns"
              className={`text-sm font-bold text-[#8f5f43] hover:underline ${FOCUS}`}
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/campaigns/${item.id}`}
                className={`group overflow-hidden rounded-2xl border border-[#eadfd6] bg-white transition hover:shadow-md ${FOCUS}`}
              >
                {item.images?.[0] ? (
                  <FramedImage
                    src={item.images[0]}
                    alt=""
                    lazy
                    className="aspect-[4/3] w-full"
                  />
                ) : (
                  <div
                    className="grid aspect-[4/3] place-items-center text-3xl font-bold"
                    style={{
                      backgroundColor: brandStyle(item.brandName).bg,
                      color: brandStyle(item.brandName).color,
                    }}
                  >
                    {(item.brandName || "B").charAt(0)}
                  </div>
                )}
                <div className="p-3 sm:p-4">
                  <p className="truncate text-xs font-bold text-[#a87556]">
                    {item.brandName || "Brand"}
                  </p>
                  <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-bold leading-5 text-[#302017]">
                    {item.campaignTitle}
                  </h3>
                  <p className="mt-2 text-xs font-bold text-[#604632]">
                    {getReward(item).short}
                    <span className="ml-1.5 font-medium text-[#9a8172]">
                      {isPaidCampaign(item) ? "Paid" : "Barter"}
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Mobile apply bar, shown only when the main button is off screen */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 border-t border-[#eadfd6] bg-white/95 px-4 pt-3 backdrop-blur transition-transform duration-200 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden ${
          ctaVisible ? "translate-y-full" : "translate-y-0"
        }`}
        aria-hidden={ctaVisible}
      >
        <div className="mx-auto flex max-w-md items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-extrabold text-[#302017]">
              {reward.short}
            </p>
            {status.label && (
              <p className="truncate text-xs text-[#9a8172]">{status.label}</p>
            )}
          </div>
          <ApplyButton url={applyUrl} closed={status.closed} className="shrink-0" />
        </div>
      </div>

      {copied && (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full bg-[#24170f] px-4 py-2 text-sm font-semibold text-white shadow-lg lg:bottom-8"
        >
          Link copied
        </div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  States                                                                    */
/* -------------------------------------------------------------------------- */

function Skeleton() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading campaign">
      <div className="mb-6 h-4 w-40 rounded bg-[#eee3da]" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
        <div>
          <div className="aspect-[4/3] rounded-2xl bg-[#eee3da] lg:aspect-square" />
          <div className="mt-3 flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-14 w-14 rounded-lg bg-[#eee3da] sm:h-16 sm:w-16" />
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <div className="h-12 w-56 rounded-xl bg-[#eee3da]" />
          <div className="h-20 rounded-xl bg-[#eee3da]" />
          <div className="h-64 rounded-2xl bg-[#eee3da]" />
        </div>
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="grid min-h-[55vh] place-items-center">
      <div className="max-w-md text-center">
        <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[#f4e7dc] text-[#9d6749]">
          <Package size={25} aria-hidden="true" />
        </span>
        <h1 className="text-2xl font-bold text-[#302017]">
          Campaign unavailable
        </h1>
        <p className="mt-2 text-sm text-[#8f796a]">{message}</p>
        <div className="mt-6 flex justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className={`inline-flex h-11 items-center gap-2 rounded-xl border border-[#eadfd6] bg-white px-5 text-sm font-semibold text-[#302017] hover:bg-[#faf0e8] ${FOCUS}`}
            >
              <RotateCw size={15} aria-hidden="true" />
              Try again
            </button>
          )}
          <Link
            to="/campaigns"
            className={`inline-flex h-11 items-center gap-2 rounded-xl bg-[#302017] px-5 text-sm font-semibold text-white ${FOCUS}`}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All campaigns
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                      */
/* -------------------------------------------------------------------------- */

export default function CampaignDetails() {
  const { id } = useParams();

  const [state, setState] = useState({
    status: "loading",
    campaign: null,
    error: "",
    retryable: true,
  });
  const [related, setRelated] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);

  // Main campaign
  useEffect(() => {
    if (!id) return undefined;
    const controller = new AbortController();

    setState({ status: "loading", campaign: null, error: "", retryable: true });
    window.scrollTo({ top: 0 });

    (async () => {
      try {
        const response = await fetch(`${API_BASE}/api/v1/campaigns/${id}`, {
          signal: controller.signal,
        });

        if (response.status === 404) {
          setState({
            status: "error",
            campaign: null,
            error: "This campaign doesn't exist or has been removed.",
            retryable: false,
          });
          return;
        }
        if (!response.ok) throw new Error("Server error");

        const campaign = unwrap(await response.json());
        if (!campaign?.id) throw new Error("Missing campaign");

        setState({ status: "ready", campaign, error: "", retryable: true });
      } catch (err) {
        if (err.name === "AbortError") return;
        setState({
          status: "error",
          campaign: null,
          error: "We couldn't load this campaign. Check your connection and try again.",
          retryable: true,
        });
      }
    })();

    return () => controller.abort();
  }, [id, reloadKey]);

  // Recommendations (optional, never blocks the page)
  useEffect(() => {
    if (!id) return undefined;
    const controller = new AbortController();

    (async () => {
      try {
        const params = new URLSearchParams({
          page: "0",
          size: "8",
          sortBy: "createdAt",
          sortDirection: "desc",
        });
        const response = await fetch(`${API_BASE}/api/v1/campaigns?${params}`, {
          signal: controller.signal,
        });
        if (!response.ok) return;
        const items = unwrap(await response.json())?.content || [];
        setRelated(items.filter((item) => item.id !== id).slice(0, 4));
      } catch {
        /* recommendations are optional */
      }
    })();

    return () => controller.abort();
  }, [id]);

  useEffect(() => {
    const title = state.campaign?.campaignTitle;
    if (title) document.title = `${title} | Adrovis CollabHub`;
  }, [state.campaign]);

  return (
    <main className="min-h-screen bg-[#fcf8f5] pb-28 lg:pb-16">
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        {state.status === "loading" && <Skeleton />}

        {state.status === "error" && (
          <ErrorState
            message={state.error}
            onRetry={state.retryable ? () => setReloadKey((k) => k + 1) : null}
          />
        )}

        {state.status === "ready" && (
          <>
            <nav aria-label="Breadcrumb" className="mb-6">
              <Link
                to="/campaigns"
                className={`inline-flex items-center gap-1.5 text-sm font-semibold text-[#8f5f43] hover:underline ${FOCUS}`}
              >
                <ArrowLeft size={15} aria-hidden="true" />
                All campaigns
              </Link>
            </nav>
            <CampaignView
              key={state.campaign.id}
              campaign={state.campaign}
              related={related}
            />
          </>
        )}
      </div>
    </main>
  );
}
```

## FILE: src\pages\Campaigns.jsx
```

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Shirt,
  Leaf,
  MonitorSmartphone,
  Utensils,
  Plane,
  Camera,
  LayoutGrid,
  X,
  ChevronDown,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  SearchX,
} from "lucide-react";

import CampaignCard, {
  CampaignCardSkeleton,
} from "../components/campaign/CampaignCard";

import CampaignSpotlight from "../components/campaign/CampaignSpotlight";
import { fetchCampaigns } from "../services/api";

const CATEGORIES = [
  { label: "All campaigns", value: "", icon: LayoutGrid },
  { label: "Beauty", value: "Beauty", icon: Sparkles },
  { label: "Fashion", value: "Fashion", icon: Shirt },
  { label: "Lifestyle", value: "Lifestyle", icon: Leaf },
  { label: "Technology", value: "Tech", icon: MonitorSmartphone },
  { label: "Food & beverage", value: "Food", icon: Utensils },
  { label: "Travel", value: "Travel", icon: Plane },
  { label: "UGC", value: "UGC", icon: Camera },
];

const SORTS = [
  { label: "Newest first", value: "createdAt:desc" },
  { label: "Closing soon", value: "expiresAt:asc" },
  { label: "Most viewed", value: "viewsCount:desc" },
];

const PAGE_SIZE = 12;

export default function Campaigns() {
  const [params, setParams] = useSearchParams();

  const get = (key, fallback = "") => params.get(key) || fallback;

  const page = Math.max(0, Number(get("page", 0)) || 0);
  const category = get("category");
  const type = get("type");
  const brand = get("brand");
  const maxFollowers = get("maxFollowers");
  const minPayout = get("minPayout");
  const sort = get("sort", "createdAt:desc");

  const [query, setQuery] = useState(brand);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [retry, setRetry] = useState(0);

  const [state, setState] = useState({
    loading: true,
    error: null,
    items: [],
    pages: 1,
    total: 0,
  });

  // Update URL parameters.
  const update = (patch, keepPage = false) => {
    const next = new URLSearchParams(params);

    Object.entries(patch).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        next.delete(key);
      } else {
        next.set(key, String(value));
      }
    });

    if (!keepPage) next.delete("page");

    setParams(next, { replace: true });
  };

  // Sync search input with URL.
  useEffect(() => {
    setQuery(brand);
  }, [brand]);

  // Debounced search.
  useEffect(() => {
    const timer = setTimeout(() => {
      const clean = query.trim();

      if (clean !== brand) {
        update({ brand: clean });
      }
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Fetch campaigns using the existing API.
  useEffect(() => {
    let active = true;

    setState(previous => ({
      ...previous,
      loading: true,
      error: null,
    }));

    const [sortBy, sortDirection] = sort.split(":");

    fetchCampaigns({
      page,
      size: PAGE_SIZE,
      brand,
      category,
      campaignType: type,
      maxFollowers,
      minPayout,
      sortBy,
      sortDirection,
    })
      .then(data => {
        if (!active) return;

        setState({
          loading: false,
          error: null,
          items: data?.content || [],
          pages: Math.max(1, data?.totalPages || 1),
          total: data?.totalElements || 0,
        });
      })
      .catch(error => {
        if (!active) return;

        setState(previous => ({
          ...previous,
          loading: false,
          error: error?.message || "Unable to load campaigns.",
        }));
      });

    return () => {
      active = false;
    };
  }, [
    page,
    category,
    type,
    brand,
    maxFollowers,
    minPayout,
    sort,
    retry,
  ]);

  const activeCount = [
    category,
    type,
    maxFollowers,
    minPayout,
  ].filter(Boolean).length;

  const clearAll = () => {
    setQuery("");
    setParams({}, { replace: true });
    setMobileFiltersOpen(false);
  };

  const activeCategory =
    CATEGORIES.find(item => item.value === category)?.label ||
    "All campaigns";

  const sidebar = (
    <div className="space-y-6">

      {/* Category */}
      <FilterGroup title="Category">
        <div className="space-y-3">
          {CATEGORIES.map(({ label, value, icon: Icon }) => (
            <label
              key={value || "all"}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-[#5f4a3c] hover:text-[#2b1a12]"
            >
              <input
                type="radio"
                name="campaign-category"
                checked={category === value}
                onChange={() => update({ category: value })}
                className="h-4 w-4 accent-[#6d3e28]"
              />
              <Icon size={15} className="text-[#a47a60]" />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Collaboration type */}
      <FilterGroup title="Collaboration type">
        <div className="space-y-3">
          {[
            { label: "All types", value: "" },
            { label: "Paid campaigns", value: "PAID" },
            { label: "Product barter", value: "BARTER" },
          ].map(option => (
            <label
              key={option.value || "all-types"}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-[#5f4a3c]"
            >
              <input
                type="radio"
                name="campaign-type"
                checked={type === option.value}
                onChange={() => update({ type: option.value })}
                className="h-4 w-4 accent-[#6d3e28]"
              />
              {option.label}
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Followers */}
      <FilterGroup title="Audience size">
        <select
          value={maxFollowers}
          onChange={event => update({ maxFollowers: event.target.value })}
          className="h-10 w-full rounded-lg border border-[#eaded4] bg-[#fcf9f6] px-3 text-sm text-[#5f4a3c] outline-none focus:border-[#b77b59]"
        >
          <option value="">Any audience size</option>
          <option value="5000">Up to 5,000</option>
          <option value="10000">Up to 10,000</option>
          <option value="25000">Up to 25,000</option>
          <option value="50000">Up to 50,000</option>
        </select>
      </FilterGroup>

      {/* Minimum payout */}
      <FilterGroup title="Minimum reward">
        <select
          value={minPayout}
          onChange={event => update({ minPayout: event.target.value })}
          className="h-10 w-full rounded-lg border border-[#eaded4] bg-[#fcf9f6] px-3 text-sm text-[#5f4a3c] outline-none focus:border-[#b77b59]"
        >
          <option value="">Any reward</option>
          <option value="1000">â‚¹1,000+</option>
          <option value="3000">â‚¹3,000+</option>
          <option value="5000">â‚¹5,000+</option>
          <option value="8000">â‚¹8,000+</option>
        </select>
      </FilterGroup>

      <button
        type="button"
        onClick={clearAll}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e9dcd1] py-2.5 text-xs font-bold text-[#906447] transition hover:bg-[#faf3ed]"
      >
        <RotateCcw size={14} />
        Clear all filters
      </button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fcf8f4] pb-14 text-[#291a12]">

      <div className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-7 lg:px-9">

        {/* Existing spotlight component â€” no duplicate carousel */}
        <CampaignSpotlight campaigns={state.items} />

        {/* Marketplace layout */}
        <div className="mt-7 flex items-start gap-6">

          {/* Desktop sidebar */}
          <aside className="hidden w-[235px] shrink-0 lg:block">
            <div className="sticky top-5 rounded-2xl border border-[#eaded4] bg-white p-5 shadow-[0_4px_18px_rgba(55,32,21,.035)]">

              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={17} className="text-[#9b6849]" />
                  <h2 className="text-base font-extrabold text-[#302019]">
                    Filters
                  </h2>
                </div>

                {activeCount > 0 && (
                  <span className="rounded-full bg-[#f3e7dc] px-2 py-1 text-[10px] font-bold text-[#85583b]">
                    {activeCount} active
                  </span>
                )}
              </div>

              {sidebar}
            </div>
          </aside>

          {/* Main content */}
          <section className="min-w-0 flex-1">

            {/* Search and sorting */}
            <div className="flex flex-col gap-3 sm:flex-row">

              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#a48e7e]" />

                <input
                  type="search"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === "Enter") {
                      update({ brand: query.trim() });
                    }
                  }}
                  placeholder="Search campaigns, brands or keywords..."
                  aria-label="Search campaigns"
                  className="h-11 w-full rounded-xl border border-[#e8ddd3] bg-white pl-11 pr-10 text-sm outline-none transition placeholder:text-[#ae9d91] focus:border-[#b77b59] focus:ring-4 focus:ring-[#b77b59]/10"
                />

                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      update({ brand: "" });
                    }}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9b8574]"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                {/* Mobile filter button */}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(value => !value)}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#e8ddd3] bg-white px-4 text-sm font-bold text-[#39271c] lg:hidden"
                >
                  <SlidersHorizontal size={16} />
                  Filters
                  {activeCount > 0 && (
                    <span className="rounded-full bg-[#f0dfd1] px-1.5 py-0.5 text-[10px]">
                      {activeCount}
                    </span>
                  )}
                </button>

                <div className="relative">
                  <select
                    value={sort}
                    onChange={event => update({ sort: event.target.value })}
                    aria-label="Sort campaigns"
                    className="h-11 min-w-[155px] appearance-none rounded-xl border border-[#e8ddd3] bg-white pl-4 pr-10 text-sm font-semibold text-[#39271c] outline-none focus:border-[#b77b59]"
                  >
                    {SORTS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#806b5c]" />
                </div>
              </div>
            </div>

            {/* Mobile filters */}
            {mobileFiltersOpen && (
              <div className="mt-3 rounded-2xl border border-[#eaded4] bg-white p-5 lg:hidden">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-extrabold text-[#302019]">
                    Campaign filters
                  </h3>

                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label="Close filters"
                    className="text-[#806b5c]"
                  >
                    <X size={18} />
                  </button>
                </div>

                {sidebar}
              </div>
            )}

            {/* Results heading */}
            <div className="mb-4 mt-6 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-[#302019]">
                  Explore campaigns
                </h1>

                <p className="mt-1 text-xs text-[#938177]">
                  {state.loading
                    ? "Finding opportunities..."
                    : `${state.total.toLocaleString("en-IN")} opportunities available`}
                </p>
              </div>

              {(brand || category || activeCount > 0) && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-bold text-[#a16b4b] hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Active filter labels */}
            {(category || type || maxFollowers || minPayout || brand) && (
              <div className="mb-4 flex flex-wrap gap-2">

                {category && (
                  <ActiveFilter
                    label={activeCategory}
                    onClick={() => update({ category: "" })}
                  />
                )}

                {type && (
                  <ActiveFilter
                    label={type === "PAID" ? "Paid" : "Barter"}
                    onClick={() => update({ type: "" })}
                  />
                )}

                {maxFollowers && (
                  <ActiveFilter
                    label={`Up to ${Number(maxFollowers).toLocaleString("en-IN")} followers`}
                    onClick={() => update({ maxFollowers: "" })}
                  />
                )}

                {minPayout && (
                  <ActiveFilter
                    label={`â‚¹${Number(minPayout).toLocaleString("en-IN")}+ reward`}
                    onClick={() => update({ minPayout: "" })}
                  />
                )}

                {brand && (
                  <ActiveFilter
                    label={`Search: ${brand}`}
                    onClick={() => {
                      setQuery("");
                      update({ brand: "" });
                    }}
                  />
                )}
              </div>
            )}

            {/* Error state */}
            {state.error && (
              <div className="rounded-2xl border border-[#efd3c7] bg-white p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#b65d43]" />

                    <div>
                      <p className="font-extrabold text-[#342117]">
                        Unable to load campaigns
                      </p>
                      <p className="mt-1 text-sm text-[#826e60]">
                        {state.error}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRetry(value => value + 1)}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2b1a11] px-4 text-sm font-bold text-white hover:bg-[#a65d38]"
                  >
                    <RefreshCw size={15} />
                    Try again
                  </button>
                </div>
              </div>
            )}

            {/* Loading cards */}
            {state.loading && (
              <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <CampaignCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!state.loading && !state.error && state.items.length === 0 && (
              <div className="rounded-2xl border border-[#eadfd5] bg-white px-6 py-16 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#f7eee7] text-[#a66c49]">
                  <SearchX size={25} />
                </span>

                <h3 className="mt-5 text-xl font-extrabold text-[#2b1a11]">
                  No campaigns found
                </h3>

                <p className="mt-2 text-sm text-[#806d60]">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-[#2b1a11] px-5 text-sm font-bold text-white hover:bg-[#a65d38]"
                >
                  View all campaigns
                </button>
              </div>
            )}

            {/* Campaign cards */}
            {!state.loading && !state.error && state.items.length > 0 && (
              <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {state.items.map(campaign => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!state.loading && !state.error && state.pages > 1 && (
              <nav className="mt-9 flex flex-wrap items-center justify-center gap-3" aria-label="Campaign pages">
                <button
                  type="button"
                  disabled={page === 0}
                  onClick={() => update({ page: page - 1 }, true)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#e5d8cd] bg-white px-4 text-sm font-bold text-[#4d382a] hover:border-[#b77b59] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <span className="rounded-xl bg-[#f0e5dc] px-4 py-3 text-sm font-bold text-[#6e4b35]">
                  Page {page + 1} of {state.pages}
                </span>

                <button
                  type="button"
                  disabled={page >= state.pages - 1}
                  onClick={() => update({ page: page + 1 }, true)}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#e5d8cd] bg-white px-4 text-sm font-bold text-[#4d382a] hover:border-[#b77b59] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </nav>
            )}

          </section>
        </div>
      </div>
    </main>
  );
}

function FilterGroup({ title, children }) {
  return (
    <section className="border-b border-[#f0e7df] pb-5 last:border-0 last:pb-0">
      <h3 className="mb-3 text-sm font-extrabold text-[#39271c]">
        {title}
      </h3>
      {children}
    </section>
  );
}

function ActiveFilter({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-[#f0e5dc] px-3 py-2 text-xs font-bold text-[#6e4b35] transition hover:bg-[#ead7c9]"
    >
      {label}
      <X size={13} />
    </button>
  );
}

```

## FILE: src\pages\ForCreators.jsx
```
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '../components/layout/PageHero';

const faqs = [
  ['Do I need a minimum follower count?', 'It depends on the campaign. Each listing shows its follower requirement, and you can filter by follower range.'],
  ['Is there a fee to apply?', 'No. Applying is free and happens on the brand or agency form.'],
  ['When do I get paid?', 'Payment terms are stated on every paid campaign, for example payment within 15 business days of go live.'],
  ['What is barter?', 'Barter campaigns give you a product in exchange for content. There is no cash payout.'],
];
const perks = ['Payout and tiers shown before you apply', 'Filters for follower range, payout and category', 'Deliverables and ad rights spelled out', 'Direct application with the brand or agency'];

export default function ForCreators() {
  return (
    <>
      <PageHero title="Built for creators of every size" subtitle="From 5k followers to 500k, find collaborations that respect your time and your audience." />
      <div className="max-w-5xl mx-auto px-5 lg:px-8 mt-14 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-extrabold">What you get</h2>
          <ul className="mt-5 space-y-4">{perks.map((p) => <li key={p} className="flex gap-3"><span className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 grid place-items-center shrink-0"><Check className="w-3.5 h-3.5" /></span>{p}</li>)}</ul>
          <Link to="/campaigns" className="btn btn-primary mt-8">Find your campaign<ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold">Common questions</h2>
          <div className="mt-5 space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="card px-5 py-4 group">
                <summary className="font-bold cursor-pointer list-none flex justify-between gap-3">{q}<span className="text-violet-600 group-open:rotate-45 transition-transform text-xl leading-none">+</span></summary>
                <p className="mt-3 text-[#5d5877] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

```

## FILE: src\pages\Home.jsx
```
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, User, Building2, Users, Megaphone, 
  Heart, Check, ChevronRight, ChevronLeft, Send, Mail, 
  Compass, FileCheck2, Video, Wallet, PlusCircle, 
  BarChart2, ShieldCheck, Zap, Layers, DollarSign
} from 'lucide-react';
import { fetchCampaigns, applyUrl } from '../services/api';
import { payoutLabel, FALLBACK_IMG } from '../utils/format';

const CATEGORIES = ['All Campaigns', 'Beauty', 'Fashion', 'Food & Beverage', 'Lifestyle', 'Tech'];

const FALLBACK_CAMPAIGNS = [
  {
    id: 'mamaearth-1',
    brandName: 'mamaearth',
    brandColor: 'text-emerald-700',
    verified: true,
    badge: 'â˜… Featured',
    badgeStyle: 'bg-[#fff5ea] text-[#d97706] border-[#fde68a]',
    campaignTitle: 'New Sunscreen Campaign',
    tags: ['Instagram Reel', 'Pan India'],
    payout: 'â‚¹20,000',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 'puma-2',
    brandName: 'PUMA',
    brandColor: 'text-slate-900',
    verified: true,
    badge: 'ðŸ”¥ Trending',
    badgeStyle: 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]',
    campaignTitle: 'Fall Collection Promo',
    tags: ['Instagram + YouTube', 'Activewear'],
    payout: 'â‚¹25,000',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 'swiggy-3',
    brandName: 'Swiggy',
    brandColor: 'text-orange-600',
    verified: true,
    badge: null,
    campaignTitle: 'Food Delivery Creator Campaign',
    tags: ['Instagram Reel', 'Metro Cities'],
    payout: 'â‚¹10,000',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=90',
  },
  {
    id: 'boat-4',
    brandName: 'boAt',
    brandColor: 'text-slate-900',
    verified: true,
    badge: null,
    campaignTitle: 'New Audio Series Launch',
    tags: ['Instagram + YouTube', 'Pan India'],
    payout: 'â‚¹18,000',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=90',
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All Campaigns');
  const [liveCampaigns, setLiveCampaigns] = useState([]);
  const [totalCampaigns, setTotalCampaigns] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  
  // Fetch live campaigns from backend API
  useEffect(() => {
    let alive = true;
    setLoading(true);

    const queryCat = activeCategory === 'All Campaigns' ? '' : activeCategory.split(' ')[0];
    fetchCampaigns({ category: queryCat || undefined, page: 0, size: 8 })
      .then((data) => {
        if (!alive) return;
        const items = data?.content || [];
        setLiveCampaigns(items);
        setTotalCampaigns(data?.totalElements || items.length);
      })
      .catch(() => {
        if (alive) setLiveCampaigns([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => { alive = false; };
  }, [activeCategory]);

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Choose campaigns to display (API data first, or rich fallbacks if DB empty)
  const displayCampaigns = liveCampaigns.length > 0 ? liveCampaigns : FALLBACK_CAMPAIGNS;

  return (
    <div className="ih-page bg-[#fbf8f5] text-[#241b17] font-sans antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap');
        .ih-page{font-family:'DM Sans',sans-serif;background:#fbf8f5;color:#241b17}
        .ih-page h1,.ih-page h2,.ih-page h3,.ih-page .font-display{font-family:'Manrope','DM Sans',sans-serif}
        .ih-page img{display:block}
        .ih-page .ih-image{transition:transform .7s cubic-bezier(.2,.7,.2,1),filter .4s}
        .ih-page a:focus-visible,.ih-page button:focus-visible,.ih-page input:focus-visible{outline:3px solid #c78b69;outline-offset:3px}
        .ih-page .ih-glass{background:rgba(255,255,255,.88);backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.75)}
        .ih-page .ih-kicker{letter-spacing:.16em;text-transform:uppercase}
        @media(prefers-reduced-motion:reduce){.ih-page *{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
      `}</style>
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION â€” premium creator marketplace                             */}
      {/* ========================================================================= */}
      <section className="relative isolate overflow-hidden bg-[#fbf8f5]">
        <div className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-[#f0d9ca]/45 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 -top-24 h-[34rem] w-[34rem] rounded-full bg-[#ead5c8]/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-8 lg:pb-24 lg:pt-20">
          {/* Copy */}
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e8d5c8] bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[.17em] text-[#80543e] shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b97855] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#b97855]" />
              </span>
              India's creator collaboration hub
            </div>

            <h1 className="mt-7 max-w-[680px] font-['Manrope'] text-[2.7rem] font-extrabold leading-[1.04] tracking-[-.055em] text-[#241711] sm:text-6xl lg:text-[4.35rem]">
              Make your influence
              <span className="mt-1 block text-[#a66b4d]">work for you.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#716158] sm:text-lg">
              Discover real brand campaigns, pitch your creativity, and build partnerships that value your work. One place for creators, brands and agencies to grow together.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/campaigns"
                className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-xl bg-[#24140b] px-6 py-4 text-sm font-bold text-white shadow-[0_12px_28px_rgba(36,20,11,.18)] transition hover:-translate-y-1 hover:bg-[#3a2419]"
              >
                Explore campaigns
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/brands"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-[#dfd1c7] bg-white/85 px-6 py-4 text-sm font-bold text-[#34241b] transition hover:-translate-y-1 hover:border-[#b9896e] hover:bg-white"
              >
                <Building2 className="h-4 w-4 text-[#a66b4d]" />
                I'm a brand / agency
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-[#796b62]">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#a66b4d]" /> Clear campaign details</span>
              <span className="inline-flex items-center gap-2"><Wallet className="h-4 w-4 text-[#a66b4d]" /> Payouts shown upfront</span>
              <span className="inline-flex items-center gap-2"><Users className="h-4 w-4 text-[#a66b4d]" /> Creator-first platform</span>
            </div>

            <div className="mt-11 grid max-w-[510px] grid-cols-3 border-t border-[#e9ded6] pt-6">
              <div className="pr-3">
                <p className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-[#241711] sm:text-3xl">10K<span className="text-[#a66b4d]">+</span></p>
                <p className="mt-1 text-[11px] font-medium text-[#87776d] sm:text-xs">Creator community</p>
              </div>
              <div className="border-l border-[#e9ded6] px-4">
                <p className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-[#241711] sm:text-3xl">500<span className="text-[#a66b4d]">+</span></p>
                <p className="mt-1 text-[11px] font-medium text-[#87776d] sm:text-xs">Brands & agencies</p>
              </div>
              <div className="border-l border-[#e9ded6] pl-4">
                <p className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-[#241711] sm:text-3xl">{totalCampaigns > 0 ? `${totalCampaigns}+` : '2K+'}</p>
                <p className="mt-1 text-[11px] font-medium text-[#87776d] sm:text-xs">Campaign opportunities</p>
              </div>
            </div>
          </div>

          {/* Visual collage */}
          <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-[#ead4c5] via-[#f8eee7] to-[#e7c6b2] opacity-80 blur-xl" />
            <div className="relative grid grid-cols-[1.1fr_.82fr] items-center gap-3 sm:gap-4">
              <div className="relative overflow-hidden rounded-[2rem] rounded-tr-[5.5rem] bg-[#e8d6ca] shadow-[0_24px_65px_rgba(67,42,29,.18)]">
                <img
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1100&q=90"
                  alt="Fashion creator in an editorial campaign shoot"
                  className="ih-image aspect-[4/5] w-full object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#21150f]/75 to-transparent p-5 pt-16 text-white">
                  <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/75">Create with confidence</p>
                  <p className="mt-1 font-['Manrope'] text-lg font-extrabold">Your next big collab.</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="relative overflow-hidden rounded-[1.6rem] rounded-tl-[3.5rem] bg-[#e6d6ca] shadow-[0_18px_45px_rgba(67,42,29,.13)]">
                  <img
                    src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85"
                    alt="Premium skincare products for a beauty campaign"
                    className="ih-image aspect-[1/1.05] w-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#4c3022]">Beauty campaigns</span>
                </div>
                <div className="relative overflow-hidden rounded-[1.6rem] rounded-br-[3.5rem] bg-[#e6d6ca] shadow-[0_18px_45px_rgba(67,42,29,.13)]">
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"
                    alt="Sneaker product for a fashion campaign"
                    className="ih-image aspect-[1/1.05] w-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/50 bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#4c3022]">Fashion & lifestyle</span>
                </div>
              </div>
            </div>

            {/* Campaign opportunity card */}
            <div className="absolute -left-3 top-[43%] z-20 max-w-[205px] rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-[0_18px_48px_rgba(45,28,18,.18)] backdrop-blur sm:-left-8 sm:max-w-[225px] sm:p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[9px] font-bold uppercase tracking-[.15em] text-[#9a725b]">Live opportunity</span>
                <span className="rounded-full bg-[#edf7ef] px-2 py-1 text-[9px] font-bold text-[#39754b]">Open</span>
              </div>
              <p className="mt-2 font-['Manrope'] text-sm font-extrabold text-[#291b14]">Beauty creator campaign</p>
              <div className="mt-2 flex items-end justify-between">
                <div><p className="text-[9px] text-[#8c7a6e]">Creator payout</p><p className="font-['Manrope'] text-lg font-extrabold text-[#9a6042]">â‚¹15,000</p></div>
                <Link to="/campaigns" className="grid h-8 w-8 place-items-center rounded-full bg-[#24140b] text-white transition hover:bg-[#a66b4d]" aria-label="Explore campaigns"><ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>

            {/* Floating social proof */}
            <div className="absolute -bottom-5 right-2 z-20 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_16px_40px_rgba(45,28,18,.14)] sm:right-5">
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80" alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="" className="h-8 w-8 rounded-full border-2 border-white object-cover" />
              </div>
              <div><p className="text-[11px] font-extrabold text-[#2b1d15]">Made for creators</p><p className="text-[10px] text-[#88776d]">And the brands they love</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Creator reel / campaign visual break */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 -mt-2 pb-12">
        <div className="relative overflow-hidden rounded-[26px] bg-[#2b211c] min-h-[210px] lg:min-h-[250px] shadow-[0_20px_60px_rgba(40,25,18,.13)]">
          <video autoPlay muted loop playsInline preload="metadata" poster="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=90" aria-label="Lifestyle campaign video" className="absolute inset-0 w-full h-full object-cover opacity-40">
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#211713] via-[#211713]/75 to-transparent" />
          <div className="relative z-10 max-w-2xl px-7 py-9 lg:px-12 lg:py-12 text-white">
            <p className="ih-kicker text-[10px] font-bold text-[#e8bda4] mb-3">A better way to collaborate</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-.04em] leading-tight">Your next brand story starts here.</h2>
            <p className="text-sm text-white/75 mt-3 max-w-lg leading-relaxed">Discover briefs that fit your niche, create content you are proud of, and build lasting brand relationships.</p>
            <Link to="/campaigns" className="inline-flex items-center gap-2 mt-5 rounded-xl bg-white text-[#2b211c] px-5 py-3 text-xs font-bold hover:bg-[#f5e7de] transition">Explore creator opportunities <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="absolute right-7 bottom-7 hidden sm:flex items-center gap-3 ih-glass rounded-2xl p-3 text-[#2b211c]">
            <div className="w-10 h-10 rounded-xl bg-[#ead5c6] flex items-center justify-center"><Video className="w-5 h-5" /></div>
            <div><p className="text-xs font-extrabold">Creator-first campaigns</p><p className="text-[10px] text-[#75655c]">Briefs Â· Content Â· Collaboration</p></div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUSTED BY LEADING BRANDS                                              */}
      {/* ========================================================================= */}
      <section className="py-8 border-y border-[#f0eae3] bg-[#fffaf5]">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs font-bold uppercase tracking-wider text-[#8c7a6e] shrink-0">
            Trusted by leading brands & agencies
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 sm:gap-12 opacity-85 grayscale hover:grayscale-0 transition-all text-sm font-black text-slate-800">
            <span className="font-extrabold tracking-tighter text-lg">PUMA</span>
            <span className="text-emerald-700 tracking-tight font-black text-base">mamaearth</span>
            <span className="text-slate-900 font-black text-lg tracking-wider">boAt</span>
            <span className="font-extrabold italic text-rose-600 tracking-tight text-lg">NYKAA</span>
            <span className="text-orange-600 font-black tracking-tight text-base">Swiggy</span>
            <span className="text-rose-600 font-black italic tracking-tighter text-lg">zomato</span>
            <span className="text-slate-900 font-serif tracking-widest text-xs font-bold">L'ORÃ‰AL</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. EXPLORE LIVE CAMPAIGNS                                                 */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-5 lg:px-8">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl lg:text-[34px] font-extrabold text-[#241b17] tracking-[-.035em]">Explore Live Campaigns</h2>
            <p className="text-sm text-[#736359] mt-1">Apply to handpicked brand campaigns and start creating.</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition ${
                  activeCategory === cat
                    ? 'bg-[#24140b] text-white shadow-sm'
                    : 'bg-white border border-[#e8dfd7] text-[#55473f] hover:border-[#cbbeb3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayCampaigns.slice(0, 4).map((c) => {
            const isFav = favorites.has(c.id);
            const payout = c.payout || payoutLabel(c);
            const detailUrl = `/campaigns/${c.id}`;
            const applyLink = c.applyProxyUrl || applyUrl(c.id);
            const imgSrc = c.images?.[0] || c.image || FALLBACK_IMG;
            const tags = c.tags || (c.categories?.length ? c.categories : ['Brand Deal', 'Pan India']);

            return (
              <div
                key={c.id}
                className="bg-white rounded-[22px] border border-[#eee5de] overflow-hidden shadow-[0_8px_30px_rgba(52,35,25,.045)] hover:shadow-[0_18px_45px_rgba(52,35,25,.11)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Card Top Image & Badges */}
                <div className="relative aspect-[4/3] bg-[#eee4dc] overflow-hidden">
                  <Link to={detailUrl}>
                    <img 
                      src={imgSrc} 
                      alt={c.brandName} 
                      className="ih-image w-full h-full object-cover hover:scale-105" 
                    />
                  </Link>
                  
                  {c.badge ? (
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold border ${c.badgeStyle || 'bg-[#fff5ea] text-[#d97706] border-[#fde68a]'}`}>
                      {c.badge}
                    </span>
                  ) : (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold border bg-white/90 text-[#24140b] border-white">
                      Verified
                    </span>
                  )}

                  <button 
                    type="button" 
                    onClick={() => toggleFavorite(c.id)}
                    aria-label="Save to favorites"
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition shadow-sm ${
                      isFav ? 'text-rose-500 fill-rose-500' : 'text-slate-500 hover:text-rose-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-extrabold mb-1">
                      <span className={c.brandColor || 'text-slate-900'}>{c.brandName}</span>
                      <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-black">
                        âœ“
                      </span>
                    </div>

                    <h3 className="font-extrabold text-[15px] text-slate-900 leading-snug line-clamp-1">
                      <Link to={detailUrl} className="hover:text-orange-600 transition">
                        {c.campaignTitle}
                      </Link>
                    </h3>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {tags.slice(0, 2).map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-[#faf7f4] border border-[#eee7e0] text-[10px] font-medium text-[#65574f]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-[#f4eee8] flex items-center justify-between">
                    <p className="text-base font-extrabold text-[#1f140e] leading-none">{payout}</p>
                    <a
                      href={applyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-[#24140b] text-white text-xs font-semibold hover:bg-black transition flex items-center gap-1"
                    >
                      Apply Now â†’
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOW IT WORKS â€” editorial split experience                              */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#f4ece5] py-20 lg:py-24">
        <div className="pointer-events-none absolute -right-28 top-12 h-96 w-96 rounded-full border border-[#d9c2b2]/60" />
        <div className="pointer-events-none absolute -right-12 top-28 h-72 w-72 rounded-full border border-[#d9c2b2]/50" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_.65fr] lg:items-end">
            <div>
              <span className="ih-kicker text-[10px] font-bold text-[#a36c4e]">A simpler way to collaborate</span>
              <h2 className="mt-4 max-w-2xl font-['Manrope'] text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-[#241711] sm:text-5xl">
                From first click to
                <span className="text-[#a66b4d]"> great collaboration.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#76665b] lg:justify-self-end">
              Whether you create content or build a brand, everything you need to start a meaningful partnership is in one place.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {/* Creator journey */}
            <article className="group relative min-h-[520px] overflow-hidden rounded-[2rem] bg-[#21150f] text-white shadow-[0_24px_65px_rgba(55,34,22,.15)]">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=90"
                alt="Creator preparing a lifestyle campaign shoot"
                className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c100b] via-[#1c100b]/55 to-[#1c100b]/5" />
              <div className="relative flex h-full min-h-[520px] flex-col justify-between p-7 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/90 backdrop-blur">For creators</span>
                  <span className="font-['Manrope'] text-sm font-bold text-white/65">01 / 02</span>
                </div>
                <div className="max-w-lg">
                  <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#edbd9f]">Your creativity. Your next opportunity.</p>
                  <h3 className="mt-3 font-['Manrope'] text-3xl font-extrabold leading-tight tracking-[-.04em] sm:text-4xl">Find brands that fit your voice.</h3>
                  <p className="mt-4 max-w-md text-sm leading-7 text-white/75">Explore real briefs, understand the deliverables and payout before applying, then manage your collaboration with clarity.</p>
                  <div className="mt-7 grid grid-cols-4 gap-2 border-t border-white/20 pt-5">
                    {[
                      [Compass, 'Discover'],
                      [FileCheck2, 'Apply'],
                      [Video, 'Create'],
                      [Wallet, 'Get paid'],
                    ].map(([Icon, label], index) => (
                      <div key={label} className="min-w-0">
                        <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/12 text-[#f0bd9f]"><Icon className="h-4 w-4" /></span>
                        <span className="block text-xs font-bold text-white">{label}</span>
                        <span className="mt-1 block text-[10px] text-white/45">0{index + 1}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/campaigns" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#f0c3a8] px-5 py-3 text-sm font-bold text-[#28180f] transition hover:-translate-y-0.5 hover:bg-[#f7d4c0]">
                    Explore creator campaigns <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>

            {/* Brand journey */}
            <article className="relative overflow-hidden rounded-[2rem] border border-[#e7d8cd] bg-[#fffdfb] p-7 shadow-[0_20px_55px_rgba(55,34,22,.07)] sm:p-9">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-[#ead9cd] bg-[#f8eee7] px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#8f5e43]">For brands & agencies</span>
                <span className="font-['Manrope'] text-sm font-bold text-[#b7a397]">02 / 02</span>
              </div>
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#a36c4e]">One brief. The right creators.</p>
                <h3 className="mt-3 max-w-lg font-['Manrope'] text-3xl font-extrabold leading-tight tracking-[-.04em] text-[#241711] sm:text-4xl">Build campaigns people want to be part of.</h3>
                <p className="mt-4 max-w-lg text-sm leading-7 text-[#76665b]">Publish your campaign, discover creators who match your audience, review applications and keep every collaboration moving.</p>
              </div>

              {/* Campaign management visual */}
              <div className="relative mt-8 overflow-hidden rounded-2xl border border-[#eadfd7] bg-[#f8f3ef] p-4 sm:p-5">
                <div className="flex items-center justify-between border-b border-[#e8dcd3] pb-4">
                  <div><p className="text-[10px] font-semibold uppercase tracking-[.13em] text-[#a28d7f]">Campaign workspace</p><p className="mt-1 font-['Manrope'] text-sm font-extrabold text-[#2b1c14]">Summer product launch</p></div>
                  <span className="rounded-full bg-[#e8f3e9] px-3 py-1.5 text-[10px] font-bold text-[#477653]">In review</span>
                </div>
                <div className="grid grid-cols-3 gap-2 py-4">
                  <div className="rounded-xl bg-white p-3"><p className="text-[10px] text-[#988579]">Applications</p><p className="mt-1 font-['Manrope'] text-2xl font-extrabold text-[#2b1c14]">24</p></div>
                  <div className="rounded-xl bg-white p-3"><p className="text-[10px] text-[#988579]">Shortlisted</p><p className="mt-1 font-['Manrope'] text-2xl font-extrabold text-[#2b1c14]">08</p></div>
                  <div className="rounded-xl bg-white p-3"><p className="text-[10px] text-[#988579]">Deliverables</p><p className="mt-1 font-['Manrope'] text-2xl font-extrabold text-[#2b1c14]">12</p></div>
                </div>
                <div className="space-y-3">
                  {[
                    ['Creator discovery', 'Find profiles aligned with your brief', 'âœ“'],
                    ['Application review', 'Compare creator applications', 'âœ“'],
                    ['Campaign tracking', 'Keep deliverables and timelines visible', 'â†—'],
                  ].map(([title, desc, mark]) => (
                    <div key={title} className="flex items-center gap-3 rounded-xl bg-white px-3 py-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f8eee7] text-sm font-bold text-[#a66b4d]">{mark}</span>
                      <div className="min-w-0"><p className="text-xs font-bold text-[#33231a]">{title}</p><p className="mt-0.5 text-[10px] text-[#968579]">{desc}</p></div>
                    </div>
                  ))}
                </div>
              </div>
              <Link to="/signup?role=brand" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#24140b] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#493024]">
                Start a brand campaign <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PLATFORM BENEFITS â€” larger editorial feature blocks                    */}
      {/* ========================================================================= */}
      <section className="bg-[#fbf8f5] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <span className="ih-kicker text-[10px] font-bold text-[#a36c4e]">Made for better partnerships</span>
              <h2 className="mt-4 font-['Manrope'] text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-[#241711] sm:text-5xl">Less chasing.<br /><span className="text-[#a66b4d]">More creating.</span></h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#76665b] lg:justify-self-end">A collaboration should feel exciting, not confusing. InfluencerHub brings the important details together so both sides can focus on doing great work.</p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12">
            <article className="relative min-h-[280px] overflow-hidden rounded-[1.8rem] bg-[#ead8ca] p-7 md:col-span-7 sm:p-9">
              <div className="relative z-10 max-w-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/75 text-[#9d6548]"><ShieldCheck className="h-5 w-5" /></span>
                <h3 className="mt-7 font-['Manrope'] text-2xl font-extrabold tracking-[-.035em] text-[#2a1b13]">Know what you're signing up for.</h3>
                <p className="mt-3 text-sm leading-6 text-[#6e594c]">Campaign expectations, deliverables, timelines and payout details are presented upfront, before you apply.</p>
              </div>
              <div className="pointer-events-none absolute -bottom-24 -right-8 h-72 w-72 rounded-full border-[34px] border-white/25" />
              <div className="pointer-events-none absolute bottom-8 right-10 hidden h-28 w-28 rotate-12 rounded-[2rem] border border-white/60 md:block" />
            </article>

            <article className="relative min-h-[280px] overflow-hidden rounded-[1.8rem] bg-[#2a1a12] p-7 text-white md:col-span-5 sm:p-9">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#efbd9d]"><Wallet className="h-5 w-5" /></span>
              <p className="mt-7 text-xs font-bold uppercase tracking-[.15em] text-[#efbd9d]">Clarity at every step</p>
              <h3 className="mt-3 font-['Manrope'] text-2xl font-extrabold tracking-[-.035em]">A smoother way to work together.</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">Keep applications, communication and campaign progress organised in one experience.</p>
              <div className="absolute -bottom-12 -right-8 h-44 w-44 rounded-full border border-white/15" />
              <div className="absolute -bottom-5 -right-1 h-28 w-28 rounded-full border border-white/15" />
            </article>

            <article className="rounded-[1.8rem] border border-[#eadfd7] bg-white p-7 md:col-span-4 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#a66b4d]"><Users className="h-5 w-5" /></span>
              <h3 className="mt-6 font-['Manrope'] text-xl font-extrabold text-[#291b14]">Better-fit connections</h3>
              <p className="mt-2 text-sm leading-6 text-[#7d6d62]">Bring creators and brands together around shared niches, audiences and campaign goals.</p>
            </article>
            <article className="rounded-[1.8rem] border border-[#eadfd7] bg-white p-7 md:col-span-4 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#a66b4d]"><FileCheck2 className="h-5 w-5" /></span>
              <h3 className="mt-6 font-['Manrope'] text-xl font-extrabold text-[#291b14]">Clear campaign briefs</h3>
              <p className="mt-2 text-sm leading-6 text-[#7d6d62]">Know the content format, expectations and important dates before you commit.</p>
            </article>
            <article className="rounded-[1.8rem] border border-[#eadfd7] bg-white p-7 md:col-span-4 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8eee7] text-[#a66b4d]"><BarChart2 className="h-5 w-5" /></span>
              <h3 className="mt-6 font-['Manrope'] text-xl font-extrabold text-[#291b14]">One organised workflow</h3>
              <p className="mt-2 text-sm leading-6 text-[#7d6d62]">Move from discovery to application and delivery with less back-and-forth.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TESTIMONIAL â€” distinctive quote feature                                */}
      {/* ========================================================================= */}
      <section className="bg-[#f3e9e1] py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:px-8">
          <div>
            <span className="ih-kicker text-[10px] font-bold text-[#a36c4e]">Community voices</span>
            <h2 className="mt-4 max-w-md font-['Manrope'] text-4xl font-extrabold leading-[1.08] tracking-[-.05em] text-[#241711] sm:text-5xl">Good work starts with a good connection.</h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-[#76665b]">A creator-first experience built around clear briefs, relevant opportunities and better collaboration.</p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-white p-7 shadow-[0_22px_60px_rgba(55,34,22,.08)] sm:p-10">
            <span className="absolute right-8 top-1 font-serif text-[9rem] leading-none text-[#f4e8df]">â€œ</span>
            <div className="relative">
              <div className="flex items-center gap-1 text-[#b77755]"><span>â˜…â˜…â˜…â˜…â˜…</span><span className="ml-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#a58e7e]">Creator experience</span></div>
              <blockquote className="mt-7 max-w-2xl font-['Manrope'] text-2xl font-semibold leading-[1.45] tracking-[-.025em] text-[#332219] sm:text-3xl">
                InfluencerHub makes it easier to discover genuine brand campaigns. I can understand the brief, apply with confidence and focus on creating content.
              </blockquote>
              <div className="mt-9 flex items-center justify-between border-t border-[#eee5de] pt-6">
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=240&q=90" alt="Creator portrait" className="h-12 w-12 rounded-full object-cover" />
                  <div><p className="text-sm font-extrabold text-[#2b1c14]">Creator community</p><p className="mt-1 text-xs text-[#8e7d71]">InfluencerHub member</p></div>
                </div>
                <Link to="/campaigns" className="inline-flex items-center gap-2 text-xs font-bold text-[#9b6245] transition hover:text-[#24140b]">Find your next campaign <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. BRAND & AGENCY CONTACT CTA                                              */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-[#fbf8f5] py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.25rem] bg-[#24150e] text-white shadow-[0_28px_80px_rgba(49,29,18,.18)]">
            <div className="pointer-events-none absolute -right-20 -top-32 h-[28rem] w-[28rem] rounded-full border border-[#e9b394]/20" />
            <div className="pointer-events-none absolute -right-4 -top-16 h-[20rem] w-[20rem] rounded-full border border-[#e9b394]/15" />
            <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-[1fr_.8fr] lg:items-center lg:p-14">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e9b394]/25 bg-[#e9b394]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#f0bd9f]"><Megaphone className="h-3.5 w-3.5" /> For brands & agencies</span>
                <h2 className="mt-6 font-['Manrope'] text-4xl font-extrabold leading-[1.08] tracking-[-.05em] sm:text-5xl">Have a campaign in mind?</h2>
                <p className="mt-5 max-w-lg text-sm leading-7 text-white/65">Tell us what you're looking to create. Whether it's your first creator campaign or your next big launch, our team can help you get started.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to="/signup?role=brand" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f0c3a8] px-6 py-3.5 text-sm font-bold text-[#29170f] transition hover:-translate-y-0.5 hover:bg-[#f7d2bc]">Create a brand account <ArrowRight className="h-4 w-4" /></Link>
                  <a href="mailto:contact@adrovis.com?subject=InfluencerHub%20Brand%20Partnership" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition hover:border-[#f0c3a8] hover:bg-white/5"><Mail className="h-4 w-4" /> Talk to our team</a>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-white/15 bg-white/[.07] p-5 backdrop-blur-sm sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[.15em] text-[#efbd9d]">Let's build something meaningful</p>
                  <div className="mt-5 space-y-4">
                    {[
                      [Building2, 'Introduce your brand', 'Tell us about your business and audience.'],
                      [Megaphone, 'Share your campaign goal', 'Launch, awareness, product seeding or more.'],
                      [Users, 'Meet relevant creators', 'Find creators who align with your campaign.'],
                    ].map(([Icon, title, desc], index) => (
                      <div key={title} className="flex gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9b394]/15 text-[#efbd9d]"><Icon className="h-4.5 w-4.5" /></span>
                        <div><p className="text-sm font-bold text-white">{title}</p><p className="mt-1 text-xs leading-5 text-white/50">{desc}</p></div>
                        <span className="ml-auto text-xs font-bold text-white/30">0{index + 1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="text-[10px] uppercase tracking-[.13em] text-white/40">Prefer email?</p>
                    <a href="mailto:contact@adrovis.com" className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#efbd9d] hover:text-white">contact@adrovis.com <ArrowRight className="h-3.5 w-3.5" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
```

## FILE: src\pages\HowItWorks.jsx
```
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageHero from '../components/layout/PageHero';

const steps = [
  ['Find a campaign', 'Browse by category or search by brand. Filter by follower count and minimum payout to see only what fits your profile.'],
  ['Read the full brief', 'The details page lists the payout, follower tiers, deliverables, ad rights, eligibility and every deadline.'],
  ['Apply on the official form', 'Apply Now takes you to the brand or agency form. Your application goes straight to them.'],
  ['Create and get paid', 'Follow the brief, submit your draft by the deadline and go live on the date given. Payment terms are shown on each campaign.'],
];

export default function HowItWorks() {
  return (
    <>
      <PageHero title="How Adrovis works" subtitle="A simple path from finding a campaign to getting paid for it." />
      <div className="max-w-3xl mx-auto px-5 lg:px-8 mt-14">
        <ol className="space-y-5">
          {steps.map(([t, d], i) => (
            <li key={t} className="card p-7 flex gap-6">
              <span className="w-11 h-11 shrink-0 rounded-full bg-violet-600 text-white font-extrabold grid place-items-center">{i + 1}</span>
              <div><h2 className="text-xl font-extrabold">{t}</h2><p className="mt-2 text-[#5d5877] leading-relaxed">{d}</p></div>
            </li>
          ))}
        </ol>
        <div className="text-center mt-12"><Link to="/campaigns" className="btn btn-primary !py-3.5 !px-8">Browse campaigns<ArrowRight className="w-4 h-4" /></Link></div>
      </div>
    </>
  );
}

```

## FILE: src\pages\NotFound.jsx
```
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-5 py-32 text-center">
      <h1 className="text-4xl font-extrabold">Page not found</h1>
      <p className="mt-3 text-[#5d5877]">The page you are looking for does not exist or has moved.</p>
      <Link to="/campaigns" className="btn btn-primary mt-8">Browse campaigns</Link>
    </div>
  );
}

```

## FILE: src\services\api.js
```
const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');
const API = `${BASE}/api/v1`;

export const getBackendUrl = () => BASE;
export const applyUrl = (id) => `${API}/campaigns/${id}/apply`;

async function request(path, params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, v);
  });
  const url = `${API}${path}${qs.toString() ? `?${qs}` : ''}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const body = await res.json();
  if (body && body.success === false) throw new Error(body.message || 'Request failed');
  return body;
}

export const fetchHealth = () => request('/health');
export const fetchCampaigns = async (filter) => (await request('/campaigns', filter)).data;
export const fetchCampaign = async (id) => (await request(`/campaigns/${id}`)).data;
export const fetchAgencies = async () => (await request('/agencies')).data || [];

```

## FILE: src\services\collectorApi.js
```
const BASE = (import.meta.env.VITE_API_URL || 'https://adrovis-influencer-backend.onrender.com').replace(/\/$/, '');
const COLLECTOR_API = `${BASE}/api/v1/collector`;

async function request(path, params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, v);
  });
  const url = `${COLLECTOR_API}${path}${qs.toString() ? `?${qs.toString()}` : ''}`;
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
  return res.json();
}

export const fetchDashboardOverview = (timeRange = 'LAST_7_DAYS') =>
  request('/dashboard/overview', { timeRange });

export const fetchCreatorsTable = (filters = {}) =>
  request('/creators', filters);

export const fetchTeamMembers = () =>
  request('/creators/members');

export const getExportCsvUrl = (filters = {}) => {
  const qs = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') qs.set(k, v);
  });
  return `${COLLECTOR_API}/creators/export?${qs.toString()}`;
};
```

## FILE: src\utils\format.js
```
export const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ede9fe"/><stop offset="1" stop-color="#c4b5fd"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/></svg>`
  );

export const compact = (n) => {
  if (n == null) return '';
  if (n >= 1e6) return `${+(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${+(n / 1e3).toFixed(1)}k`;
  return String(n);
};

export const comp = (c) => c?.compensation || {};
export const elig = (c) => c?.eligibility || {};
export const sched = (c) => c?.schedule || {};
export const isPaid = (c) => c?.campaignType === 'PAID';

export const payoutLabel = (c) => comp(c).summary || (isPaid(c) ? 'Cash payout' : 'Product barter');

export const followersLabel = (c) => {
  const e = elig(c);
  return e.followers_label || (e.min_followers ? `${compact(e.min_followers)}+` : 'Open to all');
};

export const genderLabel = (c) => {
  const g = elig(c).gender;
  if (!g || g === 'NOT_SPECIFIED' || g.toLowerCase() === 'any') return 'Any';
  return g.replace(/_/g, ' ').toLowerCase().replace(/^\w/, (m) => m.toUpperCase());
};

export const formatDate = (v) => {
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return String(v);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const money = (n) => (typeof n === 'number' ? `\u20B9${n.toLocaleString('en-IN')}` : n);
export const initials = (s = '') => s.trim().charAt(0).toUpperCase() || 'B';

```

## FILE: structure.md
```
.\package-lock.json
.\package.json
.\README.md
.\structure.md
.\vercel.json
.\adrovis-web\.gitignore
.\adrovis-web\.oxlintrc.json
.\adrovis-web\index.html
.\adrovis-web\package-lock.json
.\adrovis-web\package.json
.\adrovis-web\README.md
.\adrovis-web\vite.config.js
.\adrovis-web\public\favicon.svg
.\adrovis-web\public\icons.svg
.\adrovis-web\src\App.css
.\adrovis-web\src\App.jsx
.\adrovis-web\src\index.css
.\adrovis-web\src\main.jsx
.\adrovis-web\src\assets\hero.png
.\adrovis-web\src\assets\react.svg
.\adrovis-web\src\assets\vite.svg
.\src\App.jsx
.\src\index.css
.\src\admin\AdminPage.jsx
.\src\components\campaign\CampaignCard.jsx
.\src\components\campaign\CampaignRow.jsx
.\src\components\campaign\PaidBadge.jsx
.\src\components\campaign\SafeImg.jsx
.\src\components\layout\Footer.jsx
.\src\components\layout\Logo.jsx
.\src\components\layout\Navbar.jsx
.\src\components\layout\PageHero.jsx
.\src\components\layout\PublicLayout.jsx
.\src\pages\Brands.jsx
.\src\pages\CampaignDetails.jsx
.\src\pages\Campaigns.jsx
.\src\pages\ForCreators.jsx
.\src\pages\Home.jsx
.\src\pages\HowItWorks.jsx
.\src\pages\NotFound.jsx
.\src\services\api.js
.\src\utils\format.js

```

## FILE: tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## FILE: vercel.json
```
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }

```

## FILE: vite.config.js
```
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
```
