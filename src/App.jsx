import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Table from "./Components/Table";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Config/firebase";

export default function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div role="status">
          <div
            className="loader"
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #3498db",
              borderRadius: "50%",
              animation: "spin 2s linear infinite",
            }}
          ></div>
          <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  if (error) return <p>Error: {error.message}</p>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/CRUD-Firebase/connexion"
          element={user ? <Navigate to="/CRUD-Firebase/" /> : <Connexion />}
        />
        <Route
          path="/CRUD-Firebase/inscription"
          element={user ? <Navigate to="/CRUD-Firebase/" /> : <Inscription />}
        />
        <Route
          path="/CRUD-Firebase/"
          element={
            user ? <Table /> : <Navigate to="/CRUD-Firebase/connexion" />
          }
        />
        <Route
          path="/CRUD-Firebase/*"
          element={
            <Navigate
              to={user ? "/CRUD-Firebase/" : "/CRUD-Firebase/connexion"}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
