import { BrowserRouter, Switch, Route, Redirect,Link } from "react-router-dom";
import Home from './Pages/Home';

import './Style/App.css';

function App() {
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;
