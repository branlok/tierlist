import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import TierlistView from "./features/TierlistView";
import Home from "./features/Home/Home";

//Setups
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import GlobalStyles from "./GlobalStyles";
TimeAgo.addDefaultLocale(en)

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/build/:id" exact>
          <TierlistView />
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
