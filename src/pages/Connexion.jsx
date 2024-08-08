import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import InputField from "../Components/InputField";
import { auth } from "../Config/firebase";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Vérification des champs vides
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Connexion réussie !");
      navigate("/CRUD-Firebase/"); // Redirection après connexion réussie
    } catch (error) {
      toast.error("Veuillez vérifier vos informations."); // Afficher une notification en cas d'échec de la connexion
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="relative min-h-screen flex items-center justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover relative items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1525302220185-c387a117886e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
        }}
      >
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <div className="max-w-md w-full space-y-8 px-12 py-4 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Welcome Back!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Connectez-vous à votre compte
            </p>
          </div>
          <div className="flex flex-row justify-center items-center space-x-3">
            <Link
              to="#"
              className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg text-white bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300"
            >
              <FaGoogle className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="h-px w-16 bg-gray-300"></span>
            <span className="text-gray-500 font-normal">OU</span>
            <span className="h-px w-16 bg-gray-300"></span>
          </div>
          <form onSubmit={handleSignIn} className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <InputField
              type="text"
              placeholder="Adresse mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              type="password"
              placeholder="Mots de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 bg-indigo-500 focus:ring-indigo-400 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  se souvenir de moi
                </label>
              </div>
              <div className="text-sm">
                <Link
                  to="#"
                  className="font-medium text-indigo-500 hover:text-indigo-500"
                >
                  Mot de passe oublié?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
                disabled={loading} // Désactiver le bouton pendant le chargement
              >
                {loading ? "Chargement..." : "Connexion"}
              </button>
            </div>
            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              <span>Vous n'avez pas de compte?</span>
              <Link
                to="/CRUD-Firebase/inscription"
                className="text-indigo-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
              >
                Inscrivez-vous
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
