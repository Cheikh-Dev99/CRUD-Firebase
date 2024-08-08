import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import InputField from "../Components/InputField";
import { auth } from "../Config/firebase";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";

export default function Inscription() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Vérification des champs vides
    if (!prenom || !nom || !email || !password || !confirmPassword) {
      toast("Veuillez remplir tous les champs.");
      return;
    }

    // Vérification de la correspondance des mots de passe
    if (password !== confirmPassword) {
      toast("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Inscription réussie !");
      console.log("User after sign up:", auth.currentUser);
      navigate("/CRUD-Firebase/connexion");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast("L'adresse e-mail est déjà utilisée.");
      } else {
        toast(error.message);
      }
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
        <div className="max-w-xl w-full space-y-8 px-12 py-4 bg-white rounded-xl z-10">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Inscription
            </h2>
            <p className="mt-2 text-sm text-gray-600">Inscrivez-vous</p>
          </div>
          <div className="flex flex-row justify-center items-center space-x-3">
            <Link
              to="#"
              className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg text-white bg-blue-900 hover:shadow-lg cursor-pointer transition ease-in duration-300"
            >
              <FaGoogle className="w-4 h-4" />
            </Link>
          </div>
          <form onSubmit={handleSignUp} className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="relative flex justify-between items-center">
              <InputField
                type="text"
                placeholder="Prenom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
              <InputField
                type="text"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
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
            <InputField
              type="password"
              placeholder="Confirmation mots de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div>
              <button
                type="submit"
                className="w-full flex justify-center bg-indigo-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300"
                disabled={loading} // Désactiver le bouton pendant le chargement
              >
                {loading ? "Chargement..." : "Inscription"}
              </button>
            </div>
            <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
              <span>Vous avez déjà un compte?</span>
              <Link
                to="/CRUD-Firebase/connexion"
                className="text-indigo-500 hover:text-indigo-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
              >
                Connectez-vous
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}