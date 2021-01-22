import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from './Pages/Home';
import Login from "./Pages/Login";

import './Style/App.css';

function App() {
  return (
    // <div>
    //   <Home></Home>
    // </div>
    <BrowserRouter>
      <Switch>
        <Route exact path={["/", "/login"]} >
          <Switch >
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
