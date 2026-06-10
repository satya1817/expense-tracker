import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Intro from "./pages/Intro";
import Outro from "./pages/Outro";
import RegisterSuccess from "./pages/RegisterSuccess";
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