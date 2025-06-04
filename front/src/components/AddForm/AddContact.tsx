import { useState, useEffect } from "react";
import { Phone, Smartphone, Mail, User } from "lucide-react";
import { ContactType } from "../../constants/types";
import { FetchAPI } from "../methods/fetch";
import { addContact } from "../../constants/fetchMethods";
import DisplayError from "../Error/DisplayError";
import FormAction from "../inputs/FormAction";

interface AddContact {
  createdContact?: (newData: ContactType) => void;
  id_client: number;
}

export default function AddContact({ createdContact, id_client }: AddContact) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  console.log(id_client);

  const [formState, setFormState] = useState({
    name: "",
    mail: "",
    mobile: "",
    landline: "",
  });

  const initialFormState = {
    name: "",
    mail: "",
    mobile: "",
    landline: "",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      addContact.body.name = formState.name;
      addContact.body.mail = formState.mail;
      addContact.body.mobile = formState.mobile;
      addContact.body.landline = formState.landline;
      addContact.body.id_client = id_client;
      console.log(addContact.body);
      const jsonResponse = (await FetchAPI(addContact)) as { contact: ContactType };
      console.log(jsonResponse);
      if (createdContact) {
        createdContact(jsonResponse.contact);
      }
      setFormState(initialFormState);
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
        console.log(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    const isValid = formState.name.trim() !== "" && formState.mail.trim() !== "";

    setIsFormValid(isValid);
  }, [formState]);

  return (
    <>
      {isError ? (
        <DisplayError errorMessage={errorMessage} />
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl dark:text-neutral-400 py-4">Ajouter un contact</h2>

          <hr className="border-neutral-300 dark:border-neutral-500 my-4" />
          <div className="flex flex-row items-center w-full gap-2">
            <div className=" w-3/12">
              <label htmlFor="name" className="block text-md font-medium text-neutral-700 dark:text-neutral-300 p-1">
                * Nom{" "}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-neutral-700 dark:text-neutral-300">
                  <User size="1.2rem" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full ps-10 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  placeholder="Prénom Nom"
                />
              </div>
            </div>
            <div className=" w-5/12">
              <label htmlFor="mail" className="block text-md font-medium text-neutral-700 dark:text-neutral-300 p-1">
                * Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-neutral-700 dark:text-neutral-300">
                  <Mail size="1.2rem" />
                </div>
                <input
                  type="text"
                  id="mail"
                  name="mail"
                  value={formState.mail}
                  onChange={handleChange}
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full ps-10 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  placeholder="Adresse email"
                />
              </div>
            </div>

            <div className=" w-2/12">
              <label htmlFor="mobile" className="block text-md font-medium text-neutral-700 dark:text-neutral-300 p-1">
                Téléphone mobile
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-neutral-700 dark:text-neutral-300">
                  <Smartphone size="1.2rem" />
                </div>
                <input
                  type="text"
                  id="mobile"
                  name="mobile"
                  value={formState.mobile}
                  onChange={handleChange}
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full ps-10 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  placeholder="téléphone mobile"
                />
              </div>
            </div>

            <div className="w-2/12">
              <label
                htmlFor="landline"
                className="block text-md font-medium text-neutral-700 dark:text-neutral-300 p-1"
              >
                Tel Fixe
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-neutral-700 dark:text-neutral-300">
                  <Phone size="1.2rem" />
                </div>
                <input
                  type="text"
                  id="landline"
                  name="landline"
                  value={formState.landline}
                  onChange={handleChange}
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full ps-10 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                  placeholder="Téléphone fixe"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-2/6">
              <FormAction
                isDisabled={!isFormValid}
                text="Ajouter"
                handleSubmit={(event) => handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>)}
              />
            </div>
          </div>
        </form>
      )}
    </>
  );
}
