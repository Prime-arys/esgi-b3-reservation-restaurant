import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./utils/Auth";
import Wrapper from "./components/App/Wrapper";
import "./App.css";
import { lazy } from "react";

const Login = lazy(() => import("./pages/Login"));
const Hello = lazy(() => import("./pages/Hello"));

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
  console.log("Context", Context);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={<Navigate to={!Context.isLogged ? "/login" : "/hello"} replace />}
          />
          <Route
            path="login"
            element={
              <Login />
            }
          />
          <Route
            path="hello"
            element={
              Context.isLogged ? (
                <Hello />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;