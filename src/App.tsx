import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Emotions } from "./pages/Emotions";
import { Fortunes } from "./pages/Fortunes";
import { Settings } from "./pages/Settings";

export const App = () => {
  return (
    <BrowserRouter basename="/ember-admin">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/emotions" element={<Emotions />} />
          <Route path="/fortunes" element={<Fortunes />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
