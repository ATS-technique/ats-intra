// import MarkdownEditor from '@uiw/react-markdown-editor';
import { useState, useEffect, useCallback } from "react";
import { Eye } from "lucide-react"; // Importing the X icon from react-icons
import { FetchAPI } from "../methods/fetch";
import { addPressMention, getAllPressMentions } from "../../constants/fetchMethods";
import { Table } from "../Table/Table";
import { dateTimeFormatting } from "../../utils/dateFormating";
import ImageUpload from "../inputs/ImageUpload";
import { Column } from "../Table/types";
import FormAction from "../inputs/FormAction";

interface PressMention {
  id_press_mention: number;
  media_name: string;
  article_name: string;
  article_url: string;
  description: string;
  date: string;
  link_text: string;
  image_path: string;
}

interface PressMentionProps {
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function PressMentions({ setIsError, setErrorMessage }: PressMentionProps) {
  const [PressMentions, setPressMentions] = useState<PressMention[]>([]);
  const [newPressMentionImage, setNewPressMentionImage] = useState<File | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const [pressMentionFormState, setFormState] = useState({
    media_name: "Art Deco 80",
    article_name: "Clair de Jour",
    article_url: "ats-serrurerie.com",
    description: "Fournisseur de serrurerie et métallerie",
    date: "Mai 2025",
    link_text: "Clique ici pour en savoir plus",
  });

  const pressMentionsColumns: Column<PressMention>[] = [
    {
      key: "id_press_mention",
      header: "",
      sortable: false,
      filterable: false,
      editable: false,
      render: (value) => (
        <a
          href={"./pressMention?=" + value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          <Eye className="w-4 h-4" />
        </a>
      ),
      id_key: "id_article",
    },
    {
      key: "article_name",
      header: "Nom article",
      sortable: true,
      filterable: true,
      editable: false,
      id_key: "id_article",
    },
    {
      key: "media_name",
      header: "Nom media",
      sortable: true,
      filterable: true,
      editable: false,
      id_key: "id_article",
    },
    {
      key: "date",
      header: "Date de parution",
      sortable: true,
      filterable: true,
      editable: true,
      id_key: "id_article",
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
      pressMentionFormState.link_text.trim() !== "" &&
      newPressMentionImage !== null;
    setIsFormValid(isValid);
  }, [fetchData, setIsFormValid, pressMentionFormState, newPressMentionImage]);

  function isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

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

        const jsonResponse = (await FetchAPI(request)) as { pressMention: PressMention };

        console.log(jsonResponse);
      } else {
        setIsError(true);
        setErrorMessage("Veuillez remplir tous les champs");
      }
    } catch (error) {
      setIsError(true);
      console.error("Erreur lors de l'ajout de l'article :", error);
      setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue s'est produite.");
    }
  }, [setErrorMessage, setIsError, newPressMentionImage, pressMentionFormState]);

  const handleChangeAddPressMention = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...pressMentionFormState,
      [name]: value,
    });
    console.log(pressMentionFormState);
  };

  return (
    <div className="flex flex-col justify-center items-center dark:bg-neutral-800 px-8 overflow-scroll">
      <div className="flex flex-col justify-center w-full items-center h-auto bg-gray-100 dark:bg-neutral-800 py-8 px-16">
        <input
          type="text"
          id="media_name"
          name="media_name"
          value={pressMentionFormState.media_name}
          className="rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
          placeholder="Nom media*"
          required
          onChange={handleChangeAddPressMention}
        />
        <input
          type="text"
          id="article_name"
          name="article_name"
          value={pressMentionFormState.article_name}
          className="rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
          placeholder="Titre article"
          onChange={handleChangeAddPressMention}
        />
        <input
          type="text"
          id="date"
          name="date"
          value={pressMentionFormState.date}
          className="rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
          placeholder="Date de parution*"
          required
          onChange={handleChangeAddPressMention}
        />
        <input
          type="text"
          id="article_url"
          name="article_url"
          value={pressMentionFormState.article_url}
          className="rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
          placeholder="Lien article*"
          required
          onChange={handleChangeAddPressMention}
        />
        <input
          type="text"
          id="link_text"
          name="link_text"
          value={pressMentionFormState.link_text}
          className="rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
          placeholder="Texte du lien*"
          onChange={handleChangeAddPressMention}
        />
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
            <FormAction handleSubmit={handleAddPressMention} text="Ajouter" isDisabled={!isFormValid} />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full h-auto bg-gray-100 dark:bg-neutral-800 py-8 px-16">
        <Table data={PressMentions} columns={pressMentionsColumns} onDataChange={setPressMentions} />
      </div>
    </div>
  );
}
