// import MarkdownEditor from '@uiw/react-markdown-editor';
import { useState, useEffect, useCallback } from "react";
import { Eye, X, Trash } from "lucide-react"; // Importing the X icon from react-icons
import { FetchAPI } from "../methods/fetch";
import {
  addPressMention,
  editPressMention,
  getAllPressMentions,
  deletePressMention,
} from "../../constants/fetchMethods";
import { Table } from "../Table/Table";
import { dateTimeFormatting } from "../../utils/dateFormating";
import ImageUpload from "../inputs/ImageUpload";
import { Column } from "../Table/types";
import FormAction from "../inputs/FormAction";
import ValidationPopUp from "../ValidationPopUp/ValidationPopUp";
import { PressMention } from "../../constants/types";

const formInitialState = {
  id_press_mention: 0,
  media_name: "",
  article_name: "",
  article_url: "",
  description: "",
  date: "",
  link_text: "",
  image_path: "",
};

interface PressMentionProps {
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function PressMentions({
  setIsError,
  setErrorMessage,
  setIsSuccess,
  setSuccessMessage,
}: PressMentionProps) {
  const [PressMentions, setPressMentions] = useState<PressMention[]>([]);
  const [newPressMentionImage, setNewPressMentionImage] = useState<File | null>(null);
  const [editPressMentionImage, setEditPressMentionImage] = useState<File | null>(null);
  const [articleToDelete, setArticleToDelete] = useState({
    id_press_mention: 0,
    media_name: "",
    article_name: "",
    article_url: "",
    description: "",
    date: "",
    link_text: "",
    image_path: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedPressMention, setSelectedPressMention] = useState({
    id_press_mention: 0,
    media_name: "",
    article_name: "",
    article_url: "",
    description: "",
    date: "",
    link_text: "",
    image_path: "",
  });

  const [pressMentionFormState, setFormState] = useState({
    media_name: "",
    article_name: "",
    article_url: "",
    description: "",
    date: "",
    link_text: "",
  });

  const pressMentionsColumns: Column<PressMention>[] = [
    {
      key: "id_press_mention",
      header: "",
      sortable: false,
      filterable: false,
      editable: false,
      render: (_value, row: PressMention) => (
        <button onClick={() => setSelectedPressMention(row)}>
          <Eye
            className={`w-4 h-4 ${row.id_press_mention == selectedPressMention.id_press_mention ? "text-orange-500" : "text-neutral-400"}`}
          />
        </button>
      ),
      id_key: "id_press_mention",
    },
    {
      key: "article_name",
      header: "Nom article",
      sortable: true,
      filterable: true,
      editable: false,
      id_key: "id_press_mention",
    },
    {
      key: "media_name",
      header: "Nom media",
      sortable: true,
      filterable: true,
      editable: false,
      id_key: "id_press_mention",
    },
    {
      key: "date",
      header: "Date de parution",
      sortable: true,
      filterable: true,
      editable: true,
      id_key: "id_press_mention",
    },
    {
      key: "article_url",
      header: "Supprimer",
      sortable: false,
      filterable: false,
      editable: false,
      id_key: "id_press_mention",
      render: (_value, row: PressMention) => (
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => {
            setArticleToDelete(row);
          }}
        >
          <Trash className="w-4 h-4" />
        </button>
      ),
    },
    {
      key: "link_text",
      header: "Texte du lien",
      sortable: true,
      filterable: true,
      editable: false,
      id_key: "id_press_mention",
    },
    {
      key: "image_path",
      header: "Image",
      sortable: false,
      filterable: false,
      editable: false,
      render: (value) => <img src={String(value)} alt="Press Mention" className="w-16 h-16 object-cover rounded-md" />,
      id_key: "id_press_mention",
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      const pressMentionsJson = (await FetchAPI(getAllPressMentions)) as PressMention[];
      setPressMentions(dateTimeFormatting(pressMentionsJson) as PressMention[]);
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  }, [setIsError, setErrorMessage]);

  useEffect(() => {
    fetchData();
    const isValid =
      pressMentionFormState.media_name.trim() !== "" &&
      pressMentionFormState.date.trim() !== "" &&
      pressMentionFormState.article_url.trim() !== "" &&
      pressMentionFormState.link_text.trim() !== "";
    setIsFormValid(isValid);
    const isValidEdit =
      selectedPressMention.media_name.trim() !== "" &&
      selectedPressMention.date.trim() !== "" &&
      selectedPressMention.article_url.trim() !== "" &&
      selectedPressMention.link_text.trim() !== "";
    setIsFormValid(isValidEdit);
  }, [fetchData, setIsFormValid, pressMentionFormState, selectedPressMention]);

  function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  const handleDeletePressMention = useCallback(
    async (result: boolean) => {
      if (result) {
        try {
          console.log("Suppression de l'article :", articleToDelete);
          deletePressMention.body.id_press_mention = articleToDelete.id_press_mention;
          (await FetchAPI(deletePressMention)) as unknown as string;
          setIsSuccess(true);
          setSuccessMessage("Article supprimé !");
          setArticleToDelete({ ...formInitialState });
        } catch (error) {
          setIsError(true);
          setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue s'est produite.");
        }
      } else {
        setArticleToDelete({ ...formInitialState });
        console.log(articleToDelete);
      }
    },
    [setIsError, setErrorMessage, setIsSuccess, setSuccessMessage, articleToDelete],
  );

  const handleAddPressMention = useCallback(async () => {
    try {
      if (!isValidUrl(pressMentionFormState.article_url.trim())) {
        setIsError(true);
        setErrorMessage("Veuillez entrer une URL valide");
        return;
      }

      if (pressMentionFormState.media_name !== "" && newPressMentionImage) {
        const formData = new FormData();

        formData.append("media_name", pressMentionFormState.media_name);
        formData.append("article_name", pressMentionFormState.article_name);
        formData.append("article_url", pressMentionFormState.article_url);
        formData.append("description", pressMentionFormState.description);
        formData.append("date", pressMentionFormState.date);
        formData.append("link_text", pressMentionFormState.link_text);
        formData.append("image", newPressMentionImage);

        const request = {
          ...addPressMention,
          body: formData,
        };

        (await FetchAPI(request)) as { pressMention: PressMention };

        setIsSuccess(true);
        setSuccessMessage("Article ajouté !");
        setNewPressMentionImage(null);
        setFormState({
          media_name: "",
          article_name: "",
          article_url: "",
          description: "",
          date: "",
          link_text: "",
        });
        fetchData();
      } else {
        setIsError(true);
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      setIsError(true);
      console.error("Erreur lors de l'ajout de l'article :", error);
      setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue s'est produite.");
    }
  }, [
    setErrorMessage,
    setIsError,
    newPressMentionImage,
    pressMentionFormState,
    setIsSuccess,
    setSuccessMessage,
    fetchData,
    setFormState,
  ]);

  // Function to handle the edit press mention action
  const handleEditPressMention = useCallback(async () => {
    try {
      if (!isValidUrl(selectedPressMention.article_url.trim())) {
        setIsError(true);
        setErrorMessage("Veuillez entrer une URL valide");
        return;
      }

      const formData = new FormData();

      formData.append("id_press_mention", selectedPressMention.id_press_mention.toString());
      formData.append("media_name", selectedPressMention.media_name);
      formData.append("article_name", selectedPressMention.article_name);
      formData.append("article_url", selectedPressMention.article_url);
      formData.append("description", selectedPressMention.description);
      formData.append("date", selectedPressMention.date);
      formData.append("link_text", selectedPressMention.link_text);
      editPressMentionImage ? formData.append("image", editPressMentionImage) : null;

      const request = {
        ...editPressMention,
        body: formData,
      };

      (await FetchAPI(request)) as { pressMention: PressMention };

      setSelectedPressMention(formInitialState as PressMention);
      setIsSuccess(true);
      setSuccessMessage("Article modifié !");
      fetchData();
    } catch (error) {
      setIsError(true);
      console.error("Erreur lors de l'ajout de l'article :", error);
      setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue s'est produite.");
    }
  }, [
    setErrorMessage,
    setIsError,
    editPressMentionImage,
    selectedPressMention,
    setIsSuccess,
    setSuccessMessage,
    fetchData,
  ]);

  const handleChangeAddPressMention = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...pressMentionFormState,
      [name]: value,
    });
  };

  const handleChangeEditPressMention = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setSelectedPressMention({
      ...selectedPressMention,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center dark:bg-neutral-800 px-8 overflow-scroll">
      {articleToDelete.id_press_mention > 0 ? (
        <ValidationPopUp question="Êtes-vous sûr ?" onClose={handleDeletePressMention} />
      ) : null}
      {selectedPressMention.id_press_mention == 0 ? (
        <div className="flex flex-col justify-center w-full items-center h-auto py-8 px-16">
          <h1>Ajouter une mention</h1>
          <div className="flex flex-row justify-evenly items-center w-full">
            <input
              type="text"
              id="media_name"
              name="media_name"
              value={pressMentionFormState.media_name}
              className="rounded-md appearance-none relative block w-1/3 px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
              placeholder="Nom media*"
              required
              onChange={handleChangeAddPressMention}
            />
            <input
              type="text"
              id="article_name"
              name="article_name"
              value={pressMentionFormState.article_name}
              className="rounded-md appearance-none relative block w-1/3 px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
              placeholder="Titre article"
              onChange={handleChangeAddPressMention}
            />
            <input
              type="text"
              id="date"
              name="date"
              value={pressMentionFormState.date}
              className="rounded-md appearance-none relative block  px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1 w- 3/12"
              placeholder="Date de parution*"
              required
              onChange={handleChangeAddPressMention}
            />
          </div>
          <div className="flex flex-row justify-evenly items-center w-full">
            <input
              type="text"
              id="article_url"
              name="article_url"
              value={pressMentionFormState.article_url}
              className="rounded-md appearance-none relative block w-4/6 px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
              placeholder="Lien article*"
              required
              onChange={handleChangeAddPressMention}
            />
            <input
              type="text"
              id="link_text"
              name="link_text"
              value={pressMentionFormState.link_text}
              className="rounded-md appearance-none relative block w-2/6 px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
              placeholder="Texte du lien*"
              onChange={handleChangeAddPressMention}
            />
          </div>
          <textarea
            onChange={handleChangeAddPressMention}
            id="description"
            name="description"
            value={pressMentionFormState.description}
            rows={4}
            className="m-1 rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none rounded-lg focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Description article"
          ></textarea>

          <ImageUpload onImageUpload={setNewPressMentionImage} />

          <div className="w-full flex justify-center">
            <div className="w-2/6">
              <FormAction handleSubmit={handleAddPressMention} text="Ajouter" isDisabled={false} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col  w-full items-center h-auto  dark:bg-neutral-800">
          <button className="absolute top-4 right-4" onClick={() => setSelectedPressMention({ ...formInitialState })}>
            <X />
          </button>
          <h2 className="text-2xl font-bold mb-4">Modifier une mention</h2>
          <div className="flex flex-row justify-center items-center w-full">
            <div className="flex flex-col justify-center w-9/12 items-center h-auto pw-4">
              <div className="flex flex-row justify-evenly items-center w-full">
                <input
                  type="text"
                  id="media_name"
                  name="media_name"
                  value={selectedPressMention.media_name}
                  className="rounded-md appearance-none relative block w-1/3 px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
                  placeholder="Nom media*"
                  required
                  onChange={handleChangeEditPressMention}
                />
                <input
                  type="text"
                  id="article_name"
                  name="article_name"
                  value={selectedPressMention.article_name}
                  className="rounded-md appearance-none relative block w-1/3 px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
                  placeholder="Titre article"
                  onChange={handleChangeEditPressMention}
                />
                <input
                  type="text"
                  id="date"
                  name="date"
                  value={selectedPressMention.date}
                  className="rounded-md appearance-none relative block  px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1 w- 3/12"
                  placeholder="Date de parution*"
                  required
                  onChange={handleChangeEditPressMention}
                />
              </div>
              <div className="flex flex-row justify-evenly items-center w-full">
                <input
                  type="text"
                  id="article_url"
                  name="article_url"
                  value={selectedPressMention.article_url}
                  className="rounded-md appearance-none relative block w-4/6 px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
                  placeholder="Lien article*"
                  required
                  onChange={handleChangeEditPressMention}
                />
                <input
                  type="text"
                  id="link_text"
                  name="link_text"
                  value={selectedPressMention.link_text}
                  className="rounded-md appearance-none relative block w-2/6 px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
                  placeholder="Texte du lien*"
                  onChange={handleChangeEditPressMention}
                />
              </div>
              <textarea
                onChange={handleChangeEditPressMention}
                id="description"
                name="description"
                value={selectedPressMention.description}
                rows={4}
                className="m-1 rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none rounded-lg focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Description article"
              ></textarea>
              <ImageUpload onImageUpload={setEditPressMentionImage} />
            </div>
            <div className="W-3/12 h-auto p-8 overflow-hidden">
              <img src={selectedPressMention.image_path} alt="image article" className="max-w-1/1" />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div className="w-2/6">
              <FormAction handleSubmit={handleEditPressMention} text="Modifier" isDisabled={!isFormValid} />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center items-center w-full h-auto bg-gray-100 dark:bg-neutral-800 py-8 px-16">
        <Table data={PressMentions} columns={pressMentionsColumns} onDataChange={setPressMentions} />
      </div>
    </div>
  );
}
