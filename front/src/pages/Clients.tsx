import { useState, useEffect, useCallback } from "react";
import { Table } from "../components/Table/Table.tsx";
import DisplayError from "../components/Error/DisplayError.tsx";
import { getAllClients, editClientById } from "../constants/fetchMethods.ts";
import { FetchAPI } from "../components/methods/fetch.tsx";
import { clientColumns } from "../constants/tablesColumns.tsx";
import { Plus } from "lucide-react";
import { ToggleButton } from "../components/toggleButton/ToggleButton.tsx";
import { SlidingPanel } from "../components/slidingPanel/SlidingPanel.tsx";
import AddClient from "../components/AddForm/AddClient.tsx";
import { ClientType } from "../constants/types.ts";

export default function Clients() {
  const [clientList, setClientsList] = useState<ClientType[]>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEditRow = async (newData: ClientType[]) => {
    try {
      const updatedClients = await Promise.all(
        newData.map(async (client) => {
          editClientById.body = client;
          console.log(editClientById);
          return await FetchAPI(editClientById);
        }),
      );
      console.log(updatedClients);
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

  const fetchData = useCallback(async () => {
    try {
      const jsonResponse = (await FetchAPI(getAllClients)) as ClientType[];
      setClientsList(jsonResponse);
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  }, [setClientsList, setIsError, setErrorMessage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <>
      <div className="p-8 max-w-full overflow-scroll">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl dark:text-neutral-400 py-4">Listes des clients</h1>
          <ToggleButton
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            label="Ajouter"
            isOpen={isPanelOpen}
            icon={<Plus />}
            OpenedLabel="Fermer"
          />
        </div>

        <SlidingPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
          <AddClient />
        </SlidingPanel>
        <div className="w-full overflow-scroll">
          {isError ? (
            <DisplayError errorMessage={errorMessage} />
          ) : (
            <Table data={clientList} columns={clientColumns} onDataChange={setClientsList} editRow={handleEditRow} />
          )}
        </div>
      </div>
    </>
  );
}
