import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import TierlistView from "./features/TierlistView";

import { createGlobalStyle } from "styled-components";
import Home from "./features/Redirect/Home";

const GlobalStyle = createGlobalStyle`
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
/* 
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;900&display=swap'); */

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
	/* font-family:Arial, Helvetica, sans-serif;  */
  font-family: 'Montserrat', sans-serif;
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
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact>
          {/* <TierlistView /> */}
          <Home />
        </Route>
        <Route path="/build/:id" exact>
          <TierlistView />
        </Route>
      </Switch>
    </Router>
  );
}

let StyledSidebar = styled.div`
  height: 100vh;
  width: 400px;
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 1;
  /* mix-blend-mode: overlay; */
`;

let StyledPageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  z-index: -1;
  overflow: scroll;
`;

let StyledLeftColumn = styled.div`
  position: absolute;
  height: 100%;
  width: 150px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
  mix-blend-mode: overlay;
  pointer-events: none;
`;

let StyledRightColumn = styled.div`
  height: auto;
  width: 100%;
  background-color: #2d1365;
  z-index: -1;
  display: flex;
  flex-direction: column;

  div {
    height: 125px;
    width: 100%;
  }
  .header {
    height: 300px;
    width: 100%;
    flex-shrink: 0;
  }
  .title {
    width: 150px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
  }
  .row1 {
    background-color: #c1b7db;
  }
  .row2 {
    background-color: #8c7cbe;
  }
  .row3 {
    background-color: #7a67b2;
  }
`;

export default App;
