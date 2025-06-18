import UserTable from "../components/Admin/UserTable";
import DisplayError from "../components/Error/DisplayError";
import DisplaySuccess from "../components/Error/DisplaySuccess";
import { FetchAPI } from "../components/methods/fetch";
import { Register, UserList } from "../constants/fetchMethods";
import { useState, useEffect } from "react";
import { UserType } from "../constants/types";
import { Plus, X } from "lucide-react";
import FormAction from "../components/inputs/FormAction";

const initialFormState = {
  id_user: 0,
  name: "",
  mail: "",
  password: "",
};

export default function Admin() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [userFormState, setUserFormState] = useState({
    id_user: 0,
    name: "",
    mail: "",
    password: "",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const jsonResponse = (await FetchAPI(UserList)) as {
        id_user: number;
        name: string;
        mail: string;
        createdAt: string;
        is_active: boolean;
      }[];
      setUsers(jsonResponse);
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  const handleAddUser = async () => {
    try {
      if (!isFormValid) {
        setIsError(true);
        setErrorMessage("Veuillez remplir tous les champs");
        return;
      }

      Register.body = {
        name: userFormState.name,
        mail: userFormState.mail,
        password: userFormState.password,
        is_active: true,
      };

      (await FetchAPI(Register)) as { user: UserType };

      setIsSuccess(true);
      setSuccessMessage("Utilisateur ajouté !");
      fetchData();
      setIsFormOpen(false);
      setUserFormState(initialFormState);
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur inconnue s'est produite.");
      }
    }
  };

  const handleChangeAddUserForm = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserFormState({
      ...userFormState,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchData();
    const isValid =
      userFormState.name.trim() !== "" && userFormState.mail.trim() !== "" && userFormState.password.trim() !== "";
    setIsFormValid(isValid);
  }, [setIsFormValid, userFormState]);

  return (
    <div className="flex flex-col flex flex-col items-center h-screen w-full">
      {isError ? <DisplayError errorMessage={errorMessage} onClose={() => setIsError(false)} /> : null}
      {isSuccess ? <DisplaySuccess message={successMessage} onClose={() => setIsSuccess(false)} /> : null}
      <div className="w-full">
        <button
          className=" rounded bg-neutral-200 flex items-center px-4 py-2 justify-center m-4"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? (
            <>
              Fermer <X size={20} />
            </>
          ) : (
            <>
              Ajouter <Plus size={20} />
            </>
          )}
        </button>
        {isFormOpen && (
          <div className="flex flex-col items-center justify-center p-4 rounded shadow-md">
            <h2>Ajouter un utilisateur</h2>
            <input
              type="text"
              name="name"
              value={userFormState.name}
              onChange={handleChangeAddUserForm}
              placeholder="Nom"
              className="rounded-md appearance-none relative block w-64 px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
            />
            <input
              type="text"
              name="mail"
              value={userFormState.mail}
              onChange={handleChangeAddUserForm}
              placeholder="Email"
              className="rounded-md appearance-none relative block w-64 px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={handleChangeAddUserForm}
              className="rounded-md appearance-none relative block w-64 px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
              value={userFormState.password}
            />
            <div className="w-32">
              <FormAction handleSubmit={handleAddUser} text="Ajouter" isDisabled={!isFormValid} />
            </div>
          </div>
        )}
      </div>
      <UserTable users={users} />
    </div>
  );
}
