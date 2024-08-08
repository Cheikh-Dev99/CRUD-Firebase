export const columns = [
  {
    accessorKey: "name.prenom",
    header: "Prenom",
    size: 150,
  },
  {
    accessorKey: "name.nom",
    header: "Nom",
    size: 150,
  },
  {
    accessorKey: "age",
    header: "Age",
    size: 150,
  },
  {
    accessorKey: "adresse",
    header: "Adresse",
    size: 200,
  },
  {
    accessorKey: "ville",
    header: "Ville",
    size: 150,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 150,
  },
  {
    accessorKey: "action",
    header: "Bouttons d'action",
    size: 150,
  },
];

export const fields = [
  { id: "prenom", type: "text", name: "prenom", placeholder: "Prenom" },
  { id: "nom", type: "text", name: "nom", placeholder: "Nom" },
  { id: "age", type: "number", name: "age", placeholder: "Age" },
  { id: "adresse", type: "text", name: "adresse", placeholder: "Adresse" },
  { id: "ville", type: "text", name: "ville", placeholder: "Ville" },
  { id: "email", type: "email", name: "email", placeholder: "Email Address" },
];