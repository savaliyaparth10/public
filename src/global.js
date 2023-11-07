import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  .float-right{
    float : right;
  }
  
  .text-right{
    text-align : right;
  }

  .text-center{
    text-align : center;
  }
  `
