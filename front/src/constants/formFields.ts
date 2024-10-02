const loginFields = [
  {
    labelText: "mail address",
    labelFor: "mail",
    id: "mail",
    name: "mail",
    type: "mail",
    autoComplete: "mail",
    isRequired: true,
    placeholder: "Adresse E-mail",
  },
  {
    labelText: "Password",
    labelFor: "password",
    id: "password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    isRequired: true,
    placeholder: "Mot de passe",
  },
];

export { loginFields };

const UpdateUserFields = [
  {
    labelText: "Adresse Mail",
    labelFor: "mailUpdated",
    id: "mailUpdated",
    name: "mailUpdated",
    type: "mail",
    autoComplete: "",
    isRequired: false,
    placeholder: "Adresse E-mail",
  },
  {
    labelText: "Nom",
    labelFor: "nameUpdated",
    id: "nameUpdated",
    name: "nameUpdated",
    type: "text",
    autoComplete: "",
    isRequired: false,
    placeholder: "Prénom Nom",
  },
];

export { UpdateUserFields };

const UpdatePasswordForceFields = [
  {
    labelText: "Nouveau mot de passe",
    labelFor: "newPassword",
    id: "newPassword",
    name: "newPassword",
    type: "password",
    autoComplete: "",
    isRequired: true,
    placeholder: "Mot de passe",
  },
  {
    labelText: "Confirmez le mot de passe",
    labelFor: "newPasswordConfirm",
    id: "newPasswordConfirm",
    name: "newPasswordConfirm",
    type: "password",
    autoComplete: "",
    isRequired: true,
    placeholder: "Mot de passe",
  },
];

export { UpdatePasswordForceFields };