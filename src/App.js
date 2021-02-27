import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//components
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout";
import MovieDetail from "./Pages/MovieDetail";
//Layout
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout/AdminLayout";
//Style
import "./Style/App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={["/", "/movie/:movieId", "/checkout"]}>
          <MainLayout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/movie/:movieId"
                component={MovieDetail}
              ></Route>
              <Route exact path="/checkout" component={Checkout} />
            </Switch>
          </MainLayout>
        </Route>
        <Route exact path={["/login"]}>
          <AdminLayout>
            <Switch>
              <Route exact path="/login" component={Login} />
            </Switch>
          </AdminLayout>
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
