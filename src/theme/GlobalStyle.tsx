import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Oswald:wght@500;600;700&display=swap');

  :root {
    color-scheme: dark;
  }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    background: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.ivory};
    font-family: ${({ theme }) => theme.font.body};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  #root {
    min-height: 100vh;
  }

  h1, h2, h3, h4 {
    margin: 0;
    font-family: ${({ theme }) => theme.font.display};
    letter-spacing: -0.01em;
  }

  p {
    margin: 0;
  }

  a, button {
    font-family: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    color: inherit;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.maroonBright};
    color: ${({ theme }) => theme.colors.white};
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.gold};
    outline-offset: 3px;
    border-radius: 4px;
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.maroonDeepest};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.maroon};
    border-radius: 999px;
  }
`;
