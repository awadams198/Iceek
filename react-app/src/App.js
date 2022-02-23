import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/Login/LoginForm";
import SignUpForm from "./components/auth/SignUp/SignUpForm";
import NavBar from "./components/NavBar/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import CreateArenaForm from "./components/PostArena/PostArena";
import ViewAllArenas from "./components/ViewAllArenas/ViewAllArenas";
import SingleArena from "./components/SingleArena/SingleArena";
import SplashPage from "./components/SplashPage/SplashPage";
import EditArenaForm from "./components/editArenaForm/EditArenaForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  if (!isLoaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar isLoaded={isLoaded} />
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
          </Route>
          <ProtectedRoute path="/arenas/" exact={true}>
            <ViewAllArenas />
          </ProtectedRoute>
          <Route path="/arenas/new" exact={true}>
            <CreateArenaForm />
          </Route>
          <Route path="/arenas/:id" exact={true}>
            <SingleArena />
          </Route>
          <Route path="/arenas/:id/edit" exact={true}>
            <EditArenaForm />
          </Route>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <Route path="/" exact={true}>
            <SplashPage isLoaded={isLoaded} />
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
