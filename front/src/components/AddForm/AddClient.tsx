import { useState } from "react";
import { Phone, Mail, BriefcaseBusiness, MapPinned, MapPin, Mailbox, Building } from "lucide-react";
import { ClientType } from "../../constants/types";
import { FetchAPI } from "../methods/fetch";
import { addClient } from "../../constants/fetchMethods";
import DisplayError from "../Error/DisplayError";
import FormAction from "../inputs/FormAction";

interface AddClient {
  createdClient?: (newData: ClientType) => void;
}

export default function AddClient({ createdClient }: AddClient) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formState, setFormState] = useState({
    name: "",
    pro: false,
    tel: "",
    mail: "",
    address: "",
    post_code: "",
    city: "",
    siren: "",
  });

  const initialFormState = {
    name: "",
    pro: false,
    tel: "",
    mail: "",
    address: "",
    post_code: "",
    city: "",
    siren: "",
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
      addClient.body.name = formState.name;
      addClient.body.pro = formState.pro;
      addClient.body.tel = formState.tel;
      addClient.body.mail = formState.mail;
      addClient.body.address = formState.address;
      addClient.body.post_code = formState.post_code;
      addClient.body.city = formState.city;
      addClient.body.siren = formState.siren;

      const jsonResponse = (await FetchAPI(addClient)) as { client: ClientType };
      console.log(jsonResponse);
      if (createdClient) {
        createdClient(jsonResponse.client);
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

  return (
    <>
      {isError ? (
        <DisplayError errorMessage={errorMessage} />
      ) : (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl dark:text-neutral-400 py-4">Ajouter un client</h2>
          <hr className="border-neutral-300 dark:border-neutral-500 my-4" />
          <div className="flex flex-row items-center py-2 w-full gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <BriefcaseBusiness color="gray" size="1.2rem" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nom client"
              />
            </div>
            <div className="relative w-1/3">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <Mail color="gray" size="1.2rem" />
              </div>
              <input
                type="email"
                name="mail"
                id="email"
                value={formState.mail}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mail : exemple@mail.com"
              />
            </div>
            <div className="relative w-1/6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <Phone color="gray" size="1.2rem" />
              </div>
              <input
                type="tel"
                id="tel"
                name="tel"
                value={formState.tel}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="N° téléphone"
              />
            </div>
            <div className="flex flex-row items-center gap-4">
              <label htmlFor="" className="text-gray-400">
                Pro
              </label>
              <label className="flex items-center cursor-pointer relative">
                <input
                  type="checkbox"
                  name="pro"
                  checked={formState.pro}
                  onChange={handleChange}
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded  border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                  id="check"
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
            </div>
          </div>
          <div className="flex flex-row items-center py-2 w-full gap-4">
            <div className="relative w-1/3">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <MapPinned color="gray" size="1.2rem" />
              </div>
              <input
                type="text"
                name="address"
                id="address"
                value={formState.address}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Adresse"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <MapPin color="gray" size="1.2rem" />
              </div>
              <input
                type="text"
                name="city"
                id="city"
                value={formState.city}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Ville"
              />
            </div>
            <div className="relative w-1/6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <Mailbox color="gray" size="1.2rem" />
              </div>
              <input
                type="text"
                name="post_code"
                id="post_code"
                value={formState.post_code}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Code Postal"
              />
            </div>
            <div className="relative w-1/6">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <Building color="gray" size="1.2rem" />
              </div>
              <input
                type="text"
                name="siren"
                id="siren"
                value={formState.siren}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="SIREN"
              />
            </div>
          </div>
          <div className="w-1/6">
            <FormAction
              isDisabled={false}
              text="Ajouter"
              handleSubmit={(event) => handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>)}
            />
          </div>
        </form>
      )}
    </>
  );
}
