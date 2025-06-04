import { useState, useEffect, useCallback } from "react";
import { Table } from "../components/Table/Table";
import DisplayError from "../components/Error/DisplayError";
import {
  getAllOrders,
  editOrderById,
  getAllClients,
  getMaxQuoteNumber,
  addOrder,
  getClientContactsById,
} from "../constants/fetchMethods";
import { FetchAPI } from "../components/methods/fetch";
import { orderColumns } from "../constants/tablesColumns";
import { dateFormating, dateUnformating } from "../utils/dateFormating";
import { Plus, MessageCircleMore, Construction, NotebookPen, CircleHelp, Tag, MapPinned } from "lucide-react";
import { ToggleButton } from "../components/toggleButton/ToggleButton";
import { SlidingPanel } from "../components/slidingPanel/SlidingPanel";
import { OrderType, ClientType, ContactType } from "../constants/types";
import AddContact from "../components/AddForm/AddContact";
import AddClient from "../components/AddForm/AddClient";
import FormAction from "../components/inputs/FormAction";

export default function Orders() {
  const [orderList, setOrdersList] = useState<OrderType[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isPanelClientOpen, setIsPanelClientOpen] = useState(false);
  const [isPanelContactOpen, setIsPanelContactOpen] = useState(false);
  const [clientList, setClientList] = useState<ClientType[]>([]);
  const [contactList, setContactList] = useState<ContactType[]>([]);
  const [newQuoteNumber, setNewQuoteNumber] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);

  const [orderFormState, setFormState] = useState({
    quote_number: newQuoteNumber,
    site_name: "",
    site_address: "",
    ordered_at: "",
    comment: "",
    reference: "",
    object: "",
    id_client: 0,
    id_contact: 0,
  });

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      quote_number: newQuoteNumber,
    }));
  }, [newQuoteNumber]);

  useEffect(() => {
    const isValid =
      orderFormState.quote_number > 0 &&
      orderFormState.site_name.trim() !== "" &&
      orderFormState.site_address.trim() !== "" &&
      orderFormState.ordered_at.trim() !== "" &&
      orderFormState.object.trim() !== "" &&
      orderFormState.id_client > 0;
    setIsFormValid(isValid);
  }, [orderFormState]);

  const orderInitialFormState = {
    quote_number: newQuoteNumber,
    site_name: "",
    site_address: "",
    ordered_at: "",
    comment: "",
    reference: "",
    object: "",
    id_client: 0,
    id_contact: 0,
  };

  const fetchNewQuoteNumber = useCallback(async () => {
    try {
      const jsonResponse = (await FetchAPI(getMaxQuoteNumber)) as { maxQuoteNumber: number };
      let lastQuoteNumber = jsonResponse.maxQuoteNumber;
      lastQuoteNumber++;
      setNewQuoteNumber(lastQuoteNumber);
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  }, [setNewQuoteNumber, setIsError, setErrorMessage]);

  const handleEditRow = async (newData: OrderType[]) => {
    try {
      const updatedOrders = await Promise.all(
        newData.map(async (order: OrderType) => {
          editOrderById.body = dateUnformating(order) as OrderType;
          console.log(editOrderById);
          return await FetchAPI(editOrderById);
        }),
      );
      console.log(updatedOrders);
    } catch (error) {
      setIsError(true);
      console.log(error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  const handleNewClient = async (newClient: ClientType) => {
    clientList.push(newClient);
    setIsPanelClientOpen(false);
    setFormState((prev) => ({
      ...prev,
      id_client: newClient.id_client,
    }));
  };

  const handleNewContact = async (newContact: ContactType) => {
    contactList.push(newContact);
    setIsPanelContactOpen(false);
    setFormState((prev) => ({
      ...prev,
      id_contact: newContact.id_contact,
    }));
  };

  const fetchData = useCallback(async () => {
    try {
      const jsonResponse = (await FetchAPI(getAllOrders)) as OrderType[];
      const formattedData = dateFormating(jsonResponse) as OrderType[];
      setOrdersList(formattedData);
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  }, [setOrdersList, setIsError, setErrorMessage]);

  const handleChangeAddOrder = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...orderFormState,
      [name]: value,
    });
    console.log(orderFormState);
  };

  console.log(orderList);

  const getClientContacts = async (id: number) => {
    try {
      const jsonResponse = await FetchAPI(getClientContactsById(id));
      return jsonResponse as ContactType[];
    } catch (error) {
      setIsError(true);
    }
  };

  const handleAddOrder = async () => {
    try {
      addOrder.body.comment = orderFormState.comment;
      addOrder.body.id_client = orderFormState.id_client;
      addOrder.body.object = orderFormState.object;
      addOrder.body.ordered_at = orderFormState.ordered_at;
      addOrder.body.site_address = orderFormState.site_address;
      addOrder.body.site_name = orderFormState.site_name;
      addOrder.body.quote_number = orderFormState.quote_number;
      addOrder.body.reference = orderFormState.reference;
      addOrder.body.id_contact = orderFormState.id_contact;
      console.log(addOrder);
      await FetchAPI(addOrder);
      setFormState(orderInitialFormState);
      setClientList([]);
      setContactList([]);
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  const fetchClients = useCallback(async () => {
    try {
      const jsonResponse = (await FetchAPI(getAllClients)) as ClientType[];
      const formattedData = dateFormating(jsonResponse) as ClientType[];
      setClientList(formattedData);
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  }, [setClientList, setIsError, setErrorMessage]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (orderFormState.id_client > 0) {
        const contacts = await getClientContacts(orderFormState.id_client);
        setContactList((contacts as ContactType[]) || []);
        console.log(contacts);
      } else {
        setContactList([]);
      }
    };
    fetchContacts();
  }, [orderFormState.id_client]);

  useEffect(() => {
    fetchData();
    fetchClients();
    fetchNewQuoteNumber();
    setFormState((prev) => ({
      ...prev,
      quote_number: newQuoteNumber,
    }));
  }, [fetchData, fetchClients, fetchNewQuoteNumber, newQuoteNumber]);

  return (
    <>
      <div className="p-8 gap-4 h-screen overflow-scroll">
        <div className="flex justify-between items-center space-between w-full">
          <h1 className="text-3xl dark:text-neutral-400 py-4">Listes des commandes</h1>
          <ToggleButton
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            label="Ajouter"
            isOpen={isPanelOpen}
            icon={<Plus />}
            OpenedLabel="Fermer"
          />
        </div>

        <SlidingPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
          <h1 className="text-2xl dark:text-neutral-400">Ajouter une commandes</h1>
          <hr className="border-neutral-300 dark:border-neutral-500 my-4" />
          <div className="w-full flex items-center gap-4">
            <div className="flex flex-row">
              {clientList ? (
                <select
                  name="id_client"
                  className="rounded-md dark:border-neutral-500 sm:text-sm p-2 bg-white dark:bg-neutral-700 dark:text-neutral-300"
                  value={orderFormState.id_client}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setFormState((prev) => ({
                      ...prev,
                      id_client: value,
                      id_contact: 0,
                    }));
                    if (value == 0) {
                      setIsPanelContactOpen(false);
                    }
                  }}
                >
                  <option value="0">Client</option>
                  {clientList.map((client, index) => (
                    <option key={index} value={client.id_client}>
                      {client.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div>Aucun client</div>
              )}
              {orderFormState.id_client == 0 ? (
                <ToggleButton
                  onClick={() => setIsPanelClientOpen(!isPanelClientOpen)}
                  label=""
                  isOpen={isPanelClientOpen}
                  icon={<Plus />}
                  OpenedLabel=""
                />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-row">
              <select
                name="id_contact"
                className="rounded-md dark:border-neutral-500 sm:text-sm p-2 bg-white dark:bg-neutral-700 dark:text-neutral-300"
                value={orderFormState.id_contact}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setFormState((prev) => ({ ...prev, id_contact: value }));
                }}
              >
                <option value="0">Contact</option>
                {contactList.length > 0 ? (
                  contactList.map((contact, index) => (
                    <option key={index} value={contact.id_contact}>
                      {contact.name}
                    </option>
                  ))
                ) : (
                  <option value="">Aucun Contact</option>
                )}
              </select>
              {orderFormState.id_client > 0 ? (
                <ToggleButton
                  onClick={() => setIsPanelContactOpen(!isPanelContactOpen)}
                  label=""
                  isOpen={isPanelContactOpen}
                  icon={<Plus />}
                  OpenedLabel=""
                />
              ) : (
                ""
              )}
            </div>
          </div>
          {orderFormState.id_client > 0 ? (
            <SlidingPanel isOpen={isPanelContactOpen} onClose={() => setIsPanelContactOpen(false)}>
              <AddContact createdContact={handleNewContact} id_client={orderFormState.id_client} />
              <hr className="border-neutral-300 dark:border-neutral-500 my-4" />
            </SlidingPanel>
          ) : (
            ""
          )}

          <SlidingPanel isOpen={isPanelClientOpen} onClose={() => setIsPanelClientOpen(false)}>
            <AddClient createdClient={handleNewClient} />
            <hr className="border-neutral-300 dark:border-neutral-500 my-4" />
          </SlidingPanel>

          <div className="flex flex-row items-center  w-full gap-4">
            <div className=" w-2/12">
              <label
                htmlFor="quote_number"
                className="block text-md font-medium text-neutral -700 dark:text-neutral-300 p-1"
              >
                * Numéro de devis
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <NotebookPen color="neutral" size="1.2rem" />
                </div>
                <input
                  type="number"
                  id="quote_number"
                  name="quote_number"
                  value={orderFormState.quote_number}
                  onChange={handleChangeAddOrder}
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="N° devis"
                />
              </div>
            </div>
            <div className=" w-4/12">
              <label
                htmlFor="site_name"
                className="block text-md font-medium text-neutral-700 dark:text-neutral-300 p-1"
              >
                * Chantier
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Construction color="neutral" size="1.2rem" />
                </div>
                <input
                  type="text"
                  id="site_name"
                  name="site_name"
                  value={orderFormState.site_name}
                  onChange={handleChangeAddOrder}
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nom chantier"
                />
              </div>
            </div>
            <div className=" w-6/12">
              <label
                htmlFor="quote_number"
                className="block text-md font-medium text-neutral-700 dark:text-neutral-300 p-1"
              >
                * Objet
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <CircleHelp color="neutral" size="1.2rem" />
                </div>
                <input
                  type="text"
                  id="object"
                  name="object"
                  value={orderFormState.object}
                  onChange={handleChangeAddOrder}
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="0bject"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center w-full gap-4">
            <div className=" w-2/12">
              <label
                htmlFor="ordered_at"
                className="block text-md font-medium text-neutral-700 dark:text-neutral-300 p-1"
              >
                * Date commande
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="ordered_at"
                  name="ordered_at"
                  value={orderFormState.ordered_at}
                  onChange={handleChangeAddOrder}
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nom client"
                />
              </div>
            </div>
            <div className=" w-5/12">
              <label
                htmlFor="site_address"
                className="block text-md font-medium text-neutral-700 dark:text-neutral-300 p-1"
              >
                * Adresse chantier
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <MapPinned color="neutral" size="1.2rem" />
                </div>
                <input
                  type="text"
                  id="site_address"
                  name="site_address"
                  value={orderFormState.site_address}
                  onChange={handleChangeAddOrder}
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Adresse"
                />
              </div>
            </div>

            <div className=" w-3/12">
              <label
                htmlFor="ordered_at"
                className="block text-md font-medium text-neutral-700 dark:text-neutral-300 p-1"
              >
                Référence
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <Tag color="neutral" size="1.2rem" />
                </div>
                <input
                  type="text"
                  id="reference"
                  name="reference"
                  value={orderFormState.reference}
                  onChange={handleChangeAddOrder}
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Référence"
                />
              </div>
            </div>
          </div>
          <div className=" w-full flex items-center flex-col">
            <div className="w-1/2">
              <label
                htmlFor="ordered_at"
                className="block text-md font-medium text-neutral-700 dark:text-neutral-300 p-1"
              >
                Commentaire
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <MessageCircleMore color="neutral" size="1.2rem" />
                </div>
                <textarea
                  id="comment"
                  name="comment"
                  value={orderFormState.comment}
                  onChange={handleChangeAddOrder}
                  className="bg-neutral-50 border border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Commentaire commande"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-2/6">
              <FormAction handleSubmit={handleAddOrder} text="Ajouter" isDisabled={!isFormValid} />
            </div>
          </div>
        </SlidingPanel>
        <div className="w-full overflow-scroll">
          {isError ? (
            <DisplayError errorMessage={errorMessage} />
          ) : (
            <Table data={orderList} columns={orderColumns} onDataChange={setOrdersList} editRow={handleEditRow} />
          )}
        </div>
      </div>
    </>
  );
}
