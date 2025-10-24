import { Routes, Route } from "react-router-dom";
import DashboardView from "../views/DashboardView";
import DetalheEspacoView from "../views/DetalheEspacoView";
import Login from "../views/Login";
import PrivateRoute from "../components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardView />
          </PrivateRoute>
        }
      />
      <Route
        path="/espaco/:nome"
        element={
          <PrivateRoute>
            <DetalheEspacoView />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
