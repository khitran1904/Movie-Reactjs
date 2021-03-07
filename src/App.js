import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//components
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout";
import MovieDetail from "./Pages/MovieDetail";
import Signup from "./Pages/Signup";
//Layout
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout/AdminLayout";
import AuthLayout from "./Layout/AuthLayout";
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
              <Route exact path="/movie/:movieId" component={MovieDetail} />
              <Route exact path="/checkout" component={Checkout} />
            </Switch>
          </MainLayout>
        </Route>
        <Route>
          <AuthLayout exact path={["/login", "/signup"]}>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
            </Switch>
          </AuthLayout>
        </Route>
        <Route>
          <AdminLayout>
            <Switch></Switch>
          </AdminLayout>
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
