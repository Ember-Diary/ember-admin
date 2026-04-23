import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { Emotions } from './pages/Emotions';
import { Fortunes } from './pages/Fortunes';
import { Legal } from './pages/Legal';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';
import { Users } from './pages/Users';

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
          <Route path="/legal" element={<Legal />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
