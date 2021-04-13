import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
//components
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Checkout from "./Pages/Checkout";
import MovieDetail from "./Pages/MovieDetail";
import Signup from "./Pages/Signup";
import BookTickets from "./Pages/BookTickets";
import Account from "./Pages/Account";
import TicketInfo from "./Pages/TicketInfo";

//Layout
import MainLayout from "./Layout/MainLayout";
import AdminLayout from "./Layout/AdminLayout";
import AuthLayout from "./Layout/AuthLayout";
//Style
import "./Style/App.css";
import ScrollToTop from "./Hooks/ScrollToTop";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path={["/", "/movie/:movieId", "/checkout","/bookingTickets/:movieId/:calendarID","/login", "/signup","/account","/ticketInfo"]}>
            <MainLayout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/movie/:movieId" component={MovieDetail} />
                <Route exact path="/checkout" component={Checkout} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/account" component={Account} />
                <Route exact path="/ticketInfo" component={TicketInfo} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/bookingTickets/:movieId/:calendarID" component={BookTickets}/>
              </Switch>
            </MainLayout>
          </Route>
          <Route>
            <AuthLayout exact path={[]}>
              <Switch>
                
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
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
