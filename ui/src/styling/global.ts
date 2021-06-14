
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
html, body, #root {
    height: 100%;
    width: 100%;
    position: relative;
    background-color: rgb(255,255,255);
}

body {
}

#root {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

button {
    background: none;     
    border: none;
    padding: 0;
    cursor: pointer;
}

input {
    background: none;     
    border: none;
    padding: 0;
    box-sizing: border-box;
    
    ::selection {
        background-color: rgba(0,0,0,0.3);
        color: rgba(255,255,255,0.6);  
    }
}

.number {
    font-family: 'Varela Round', sans-serif;
    font-feature-settings: 'tnum';
    font-variant-numeric: tabular-nums;
    clear: both;
}

a {
  color: inherit;
  text-decoration: inherit;
}
`;