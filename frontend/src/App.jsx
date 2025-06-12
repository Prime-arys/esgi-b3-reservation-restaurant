import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./utils/AuthContext";
import Wrapper from "./components/App/Wrapper";
import "./App.css";
import { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Menu = lazy(() => import("./pages/Menu"));

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Wrapper>
        <AppInner />
      </Wrapper>
    </QueryClientProvider>

  );
}

function AppInner() {
  const Context = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={<Navigate to={!Context.isLogged ? "/login" :
              Context.user.role === "ADMIN" ? "/reservations" : "/my-reservations"} replace />}
          />
          <Route
            path="login"
            element={
              <Login />
            }
          />
          <Route
            path="register"
            element={
              <Register />
            }
          />
          <Route
            path="menu"
            element={
              <Menu />
            }
          />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;