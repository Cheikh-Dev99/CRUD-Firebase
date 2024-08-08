import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import FormField from "./FormField";

export default function Modal({ isOpen, onClose, onAddUser, selectedUser }) {
  const [formValues, setFormValues] = useState({
    prenom: "",
    nom: "",
    age: "",
    adresse: "",
    ville: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (selectedUser) {
        setFormValues({
          id: selectedUser.id || "",
          prenom: selectedUser.name.prenom,
          nom: selectedUser.name.nom,
          age: selectedUser.age[0].replace(" ans", ""),
          adresse: selectedUser.adresse,
          ville: selectedUser.ville,
          email: selectedUser.email,
        });
      } else {
        setFormValues({
          id: "",
          prenom: "",
          nom: "",
          age: "",
          adresse: "",
          ville: "",
          email: "",
        });
      }
    }
  }, [isOpen, selectedUser]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.prenom) newErrors.prenom = "Le prénom est requis";
    if (!formValues.nom) newErrors.nom = "Le nom est requis";
    if (!formValues.age) newErrors.age = "L'âge est requis";
    if (!formValues.adresse) newErrors.adresse = "L'adresse est requise";
    if (!formValues.ville) newErrors.ville = "La ville est requise";
    if (!formValues.email) newErrors.email = "L'email est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newUser = {
      id: formValues.id,
      name: {
        prenom: formValues.prenom,
        nom: formValues.nom,
      },
      age: [`${formValues.age} ans`],
      adresse: formValues.adresse,
      ville: formValues.ville,
      email: formValues.email,
    };

    onAddUser(newUser);

    setFormValues({
      id: "",
      prenom: "",
      nom: "",
      age: "",
      adresse: "",
      ville: "",
      email: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster bg-black bg-opacity-70">
      <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Ajout d'utilisateur</p>
            <div className="modal-close cursor-pointer z-50" onClick={onClose}>
              <FaTimes className="text-black" />
            </div>
          </div>
          <div className="my-5">
            <FormField
              formValues={formValues}
              handleChange={handleChange}
              errors={errors}
            />
          </div>
          <div className="flex justify-end pt-2">
            <button
              className="focus:outline-none px-4 bg-teal-500 p-1 ml-3 rounded-lg text-white hover:bg-teal-400"
              onClick={handleSubmit}
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}