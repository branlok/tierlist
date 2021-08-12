import { createGlobalStyle, keyframes } from "styled-components";
const GlobalStyles = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	vertical-align: baseline;
  box-sizing: border-box
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
[data-rbd-draggable-id] { will-change: transform; }

input:not([type="radio"]):not([type="checkbox"]) {
    -webkit-appearance: none;
    border-radius: 0;
}

.fullScroll {
  overflow-y: scroll;
  ::-webkit-scrollbar {
    height: 0;
    width: 0;
    color: transparent;
  }
  scrollbar-width: none;
}
`;

export let fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export let leftToRight = keyframes`
from {
  transform: translate(-100%);
  opacity: 0;
}
to {
  transform: translate(0%);
  opacity: 1;
  margin-left: 0;
}
`;

export let blinking = keyframes`
  50% {
    opacity: 0.6;
  }
`;

export let fadeIn03 = keyframes`
from {
  background-color: rgba(0, 0, 0, 0);
}
to {
  background-color: rgba(0, 0, 0, 0.3);
}
`;

export let expandIn = keyframes`
from {
transform: scale(0.9);
opacity: 0;
}
to {
    transform: scale(1);
    opacity: 1;
}
`;

export let floatIn = keyframes`
from {
    transform: translateY(-50px);
    opacity: 0;
}
to {
    transform: translateY(0px);
    opacity: 1;
}
`;

export let bounceIn = keyframes`
from {
    /* transform: scale(0) rotate(90deg); */
    opacity: 0;
    
}
to {
    /* transform: scale(1) rotate(0deg); */
    opacity: 1;
}

`;

export let gradient = keyframes`
    0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;

	}
	100% {
		background-position: 0% 50%;
	}
`;

export default GlobalStyles;
