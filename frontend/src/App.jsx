import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/protectedroute";
import Intro from "./pages/intro";
import Outro from "./pages/outro";
import RegisterSuccess from "./pages/registersuccess";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />
        
        <Route
  path="/register-success"
  element={<RegisterSuccess />}
/>
<Route
  path="/intro"
  element={<Intro />}
/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/outro"
  element={<Outro />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;