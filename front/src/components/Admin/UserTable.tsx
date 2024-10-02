import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserSlash, faUserPen, faLock } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { FetchAPI } from "../methods/fetch";
import { Activate, Deactivate, updatePasswordForce, UpdateUser } from "../../constants/fetchMethods";
import { UpdateUserFields, UpdatePasswordForceFields } from "../../constants/formFields";
import Input from "../inputs/input";
import FormAction from "../inputs/FormAction";
import CancelAction from "../inputs/CancelAction";

const fields = UpdateUserFields;
const fieldsState: { [key: string]: string } = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const fieldsPassword = UpdatePasswordForceFields;
const fieldsPasswordState: { [key: string]: string } = {};
fields.forEach((fieldPassword) => (fieldsPasswordState[fieldPassword.id] = ""));

interface User {
  id_user: number;
  name: string;
  mail: string;
  createdAt: string;
  is_active: boolean;
}

interface UsersItemProps {
  users: User[];
}

const UserTable: React.FC<UsersItemProps> = ({ users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [isResponse, setIsResponse] = useState(false);
  const [response, setResponse] = useState("");
  const [UpdateUserState, setUpdateUserState] = useState(fieldsState);
  const [UpdatedPassWordState, setUpdatePassWordState] = useState(fieldsPasswordState);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (action === "edit") {
      setUpdateUserState((prevState) => {
        const newState = { ...prevState, [id]: value };
        console.log(newState);
        return newState;
      });
    } else if (action === "editPassword") {
      setUpdatePassWordState((prevState) => {
        const newState = { ...prevState, [id]: value };
        if (newState.newPassword === newState.newPasswordConfirm) {
          setPasswordMatch(true);
        } else {
          setPasswordMatch(false);
        }
        console.log(newState);
        return newState;
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  const handleClick = (user: User, action: string) => {
    setSelectedUser(user);
    setAction(action);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (selectedUser && action) {
      if (action === "activate") {
        try {
          Activate.body.id = JSON.stringify(selectedUser.id_user);
          const jsonResponse = (await FetchAPI(Activate)) as { message: string }[];
          const message = jsonResponse.toString();
          setIsResponse(true);
          setResponse(message);
        } catch (error) {
          setIsResponse(true);
          if (error instanceof Error) {
            setResponse(error.message);
          } else {
            setResponse("An unknown error occurred");
          }
        }
      } else if (action === "deactivate") {
        try {
          Deactivate.body.id = JSON.stringify(selectedUser.id_user);
          const jsonResponse = (await FetchAPI(Deactivate)) as { message: string }[];
          const message = jsonResponse.toString();
          setIsResponse(true);
          setResponse(message);
        } catch (error) {
          setIsResponse(true);
          if (error instanceof Error) {
            setResponse(error.message);
          } else {
            setResponse("An unknown error occurred");
          }
        }
      } else if (action === "edit") {
        try {
          UpdateUser.body.id = JSON.stringify(selectedUser.id_user);
          UpdateUser.body.nameUpdated =
            UpdateUserState.nameUpdated === "" ? selectedUser.name : UpdateUserState.nameUpdated;
          UpdateUser.body.mailUpdated =
            UpdateUserState.mailUpdated === "" ? selectedUser.mail : UpdateUserState.mailUpdated;
          const jsonResponse = (await FetchAPI(UpdateUser)) as { message: string }[];
          const message = jsonResponse.toString();
          setIsResponse(true);
          setResponse(message);
        } catch (error) {
          setIsResponse(true);
          if (error instanceof Error) {
            setResponse(error.message);
          } else {
            setResponse("An unknown error occurred");
          }
        }
      } else if (action === "editPassword") {
        try {
          updatePasswordForce.body.id = JSON.stringify(selectedUser.id_user);
          updatePasswordForce.body.passwordUpdated = UpdatedPassWordState.newPassword;
          const jsonResponse = (await FetchAPI(updatePasswordForce)) as { message: string }[];
          const message = jsonResponse.toString();
          setIsResponse(true);
          setResponse(message);
        } catch (error) {
          setIsResponse(true);
          if (error instanceof Error) {
            setResponse(error.message);
          } else {
            setResponse("An unknown error occurred");
          }
        }
      }

      setSelectedUser(null);
      setAction(null);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setAction(null);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setAction(null);
    setIsResponse(false);
    setResponse("");
    window.location.reload();
  };

  return (
    <div className="mt-4 w-full">
      <div className="px-4 bg-white dark:bg-neutral-900  shadow-md rounded mx-4 my-2 flex ">
        <p className="w-2/12 py-4 text-center dark:text-neutral-400">
          <strong>Nom</strong>
        </p>
        <p className="w-3/12 py-4 text-center dark:text-neutral-400">
          <strong>Mail</strong>
        </p>
        <p className="w-3/12 py-4 text-center dark:text-neutral-400">
          <strong>Date de création</strong>
        </p>
        <p className="w-1/12 py-4 text-center dark:text-neutral-400">
          <strong>État</strong>
        </p>
        <p className="w-1/12 py-4 text-center dark:text-neutral-400">
          <strong>Modifier</strong>
        </p>
        <p className="w-2/12 py-4 text-center dark:text-neutral-400">
          <strong>Mot de passe</strong>
        </p>
      </div>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.id_user} className="px-4 bg-white dark:bg-neutral-900 shadow-md rounded mx-4 my-2 flex ">
            <p className="w-2/12 py-4 text-center dark:text-neutral-400">{user.name}</p>
            <p className="w-3/12 py-4 text-center dark:text-neutral-400">{user.mail}</p>
            <p className="w-3/12 py-4 text-center dark:text-neutral-400">{formatDate(user.createdAt)}</p>
            <p className="w-1/12 py-4 text-center dark:text-neutral-400">
              {user.is_active ? (
                <FontAwesomeIcon
                  icon={faUserCheck}
                  className="text-green-500 hover:text-green-400 cursor-pointer"
                  onClick={() => handleClick(user, "deactivate")}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUserSlash}
                  className="text-red-500 hover:text-red-400 cursor-pointer"
                  onClick={() => handleClick(user, "activate")}
                />
              )}
            </p>
            <p className="w-1/12 py-4 text-center">
              {user.is_active ? (
                <FontAwesomeIcon
                  icon={faUserPen}
                  className="dark:text-neutral-400 dark:hover:text-neutral-300 hover:text-neutral-700 cursor-pointer"
                  onClick={() => handleClick(user, "edit")}
                />
              ) : (
                ""
              )}
            </p>
            <p className="w-2/12 py-4 text-center dark:text-neutral-400">
              {user.is_active ? (
                <FontAwesomeIcon
                  icon={faLock}
                  className="dark:text-neutral-400 dark:hover:text-neutral-300 hover:text-neutral-700 cursor-pointer"
                  onClick={() => handleClick(user, "editPassword")}
                />
              ) : (
                ""
              )}
            </p>
          </div>
        ))
      ) : (
        <p className="text-center w-full py-4">Aucun utilisateur trouvé</p>
      )}

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-neutral-800 dark:text-neutral-300 p-4 rounded shadow-lg w-[50vw] text-center flex flex-col justify-between">
            {action === "edit" ? (
              <>
                <p className="text-2xl py-8">Modifier les informations de {selectedUser.name}</p>
                <div className="px-24">
                  {fields.map((field) => (
                    <Input
                      key={field.id}
                      handleChange={handleChange}
                      value={UpdateUserState[field.id]}
                      labelText={field.labelText}
                      labelFor={field.labelFor}
                      id={field.id}
                      name={field.name}
                      type={field.type}
                      isRequired={field.isRequired}
                      placeholder={
                        field.name === "mailUpdated"
                          ? selectedUser.mail
                          : field.name === "nameUpdated"
                            ? selectedUser.name
                            : ""
                      }
                    />
                  ))}
                </div>
                <div className="flex justify-end mt-4">
                  <div className="mx-2">
                    <CancelAction handleClose={handleCancel} text="Annuler" />
                  </div>
                  <div className="mx-2">
                    <FormAction handleSubmit={handleSubmit} text="Modifier" isDisabled={false} />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {action === "activate" ? (
              <>
                <p className="text-xl py-8">Voulez-vous réactiver le compte de {selectedUser.name} ?</p>
                <div className="flex justify-end mt-4">
                  <div className="mx-2">
                    <CancelAction handleClose={handleCancel} text="Annuler" />
                  </div>
                  <div className="mx-2">
                    <FormAction handleSubmit={handleSubmit} text="Confirmer" isDisabled={false} />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {action === "deactivate" ? (
              <>
                <p className="text-xl py-8">Voulez-vous désactiver le compte de {selectedUser.name} ?</p>
                <div className="flex justify-end mt-4">
                  <div className="mx-2">
                    <CancelAction handleClose={handleCancel} text="Annuler" />
                  </div>
                  <div className="mx-2">
                    <FormAction handleSubmit={handleSubmit} text="Confirmer" isDisabled={false} />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {action === "editPassword" ? (
              <>
                <p className="text-2xl py-8">Modifier le mot de passe de {selectedUser.name}</p>
                <div className="px-32">
                  {fieldsPassword.map((fieldPassword) => (
                    <Input
                      key={fieldPassword.id}
                      handleChange={handleChange}
                      value={UpdateUserState[fieldPassword.id]}
                      labelText={fieldPassword.labelText}
                      labelFor={fieldPassword.labelFor}
                      id={fieldPassword.id}
                      name={fieldPassword.name}
                      type={fieldPassword.type}
                      isRequired={fieldPassword.isRequired}
                      placeholder={fieldPassword.placeholder}
                    />
                  ))}
                </div>
                {passwordMatch ? (
                  <p className="text-green-500 py-8">Les mots de passe correspondent</p>
                ) : (
                  <p className="text-red-500 py-8">Les mots de passe ne correspondent pas</p>
                )}
                <div className="flex justify-end">
                  <div className="mx-2">
                    <CancelAction handleClose={handleCancel} text="Annuler" />
                  </div>
                  <div className="mx-2">
                    <FormAction
                      handleSubmit={handleSubmit}
                      text="Confirmer"
                      isDisabled={passwordMatch ? false : true}
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      {isModalOpen && isResponse && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-neutral-800 dark:text-neutral-300 p-4 rounded shadow-lg w-[50vw] text-center flex flex-col justify-between">
            <p className="text-2xl py-8">{response}</p>
            <div className="flex justify-end mt-4">
              <div>
                <CancelAction handleClose={handleClose} text="Fermer" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
