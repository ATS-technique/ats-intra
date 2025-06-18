// import MarkdownEditor from '@uiw/react-markdown-editor';
import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react"; // Importing the X icon from react-icons
import { FetchAPI } from "../methods/fetch";
import { addArticle, getArticles, getTags } from "../../constants/fetchMethods";
import { Table } from "../Table/Table";
import { dateTimeFormatting } from "../../utils/dateFormating";
import ImageUpload from "../inputs/ImageUpload";
import { Column } from "../Table/types";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";

interface Article {
  id_article: number;
  title: string;
  image: File;
  description: string;
  createdAt: Date;
}

interface Tag {
  id_tag: number;
  name: string;
}

interface ArticlesProps {
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Article({ setIsError, setErrorMessage, setIsSuccess, setSuccessMessage }: ArticlesProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article>();
  const [newTitle, setNewTitle] = useState<string>("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [newArticleImage, setNewArticleImage] = useState<File | null>(null);
  const [newArticleDescription, setNewArticleDescription] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const articleColumns: Column<Article>[] = [
    {
      key: "id_article",
      header: "",
      sortable: false,
      filterable: false,
      editable: false,
      render: (_value, row) => (
        <input
          type="radio"
          name="article"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={() => setSelectedArticle(row as Article)}
        />
      ),
      id_key: "id_article",
    },
    {
      key: "title",
      header: "Titre",
      sortable: true,
      filterable: true,
      editable: false,
      id_key: "id_article",
    },
    {
      key: "createdAt",
      header: "Date parution",
      sortable: true,
      filterable: true,
      editable: false,
      id_key: "id_article",
    },
  ];

  const defaultArticle: Article = {
    id_article: 0,
    title: "",
    image: new File([], ""),
    description: "",
    createdAt: new Date(),
  };

  const fetchData = useCallback(async () => {
    try {
      const articlesJson = (await FetchAPI(getArticles)) as Article[];
      setArticles(dateTimeFormatting(articlesJson) as Article[]); // Stocke directement l'objet Order
      const tagsJson = (await FetchAPI(getTags)) as Tag[];
      setTags(tagsJson as Tag[]);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue s'est produite.");
    }
  }, [setIsError, setErrorMessage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const newArticle = useCallback(async () => {
    try {
      if (newTitle !== "" && newArticleImage) {
        const formData = new FormData();

        formData.append("title", newTitle);
        formData.append("description", newArticleDescription);
        formData.append("image", newArticleImage);

        const request = {
          ...addArticle,
          body: formData,
        };

        const jsonResponse = (await FetchAPI(request)) as { article: Article };

        setSelectedArticle(jsonResponse.article);
        fetchData();
        setIsSuccess(true);
        setSuccessMessage("Article ajouté avec succès");
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
    setIsSuccess,
    setSuccessMessage,
    newTitle,
    newArticleImage,
    newArticleDescription,
    fetchData,
  ]);

  const onSelectTag = (e: MultiSelectChangeEvent) => {
    setSelectedTags(e.value);
  };

  return (
    <div className="flex flex-col justify-center items-center dark:bg-neutral-800 px-8 overflow-scroll">
      {selectedArticle && selectedArticle.id_article !== 0 ? (
        <div className="flex flex-col justify-center items-center w-full h-auto bg-gray-100 dark:bg-neutral-800 py-8 px-16">
          <button>
            <X size={20} className="absolute top-20 right-12" onClick={() => setSelectedArticle(defaultArticle)} />
          </button>
          <MultiSelect
            value={selectedTags}
            options={tags}
            optionLabel="name"
            optionValue="id_tag"
            onChange={onSelectTag}
            placeholder="Ajouter des tags"
            display="chip"
            className="!bg-white dark:!bg-neutral-900 !text-black dark:!text-neutral-200 !border !border-neutral-300 dark:!border-neutral-600"
          />

          <input
            type="text"
            className="rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
            placeholder="Titre article"
            required
            defaultValue={selectedArticle.title}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            defaultValue={selectedArticle.description}
            onChange={(e) => setNewArticleDescription(e.target.value)}
            id="message"
            rows={4}
            className="m-1 rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none rounded-lg focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Description article"
          ></textarea>
          {selectedArticle.image instanceof File ? (
            <img
              src={URL.createObjectURL(selectedArticle.image)}
              alt="Aperçu"
              className="w-48 h-48 object-cover rounded-lg border"
            />
          ) : (
            <img
              src={selectedArticle.image as unknown as string} // TypeScript workaround
              alt="Image"
              className="w-48 h-48 object-cover rounded-lg border"
            />
          )}
          <pre>
            <pre>{JSON.stringify(selectedArticle)}</pre>
          </pre>
        </div>
      ) : (
        <div className="flex flex-col justify-center w-full items-center h-auto bg-gray-100 dark:bg-neutral-800 py-8 px-16">
          <input
            type="text"
            className="rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
            placeholder="Titre article"
            required
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <textarea
            onChange={(e) => setNewArticleDescription(e.target.value)}
            id="message"
            rows={4}
            className="m-1 rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none rounded-lg focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="Description article"
          ></textarea>

          <ImageUpload onImageUpload={setNewArticleImage} />
          <button
            onClick={newArticle}
            className="group w-64 relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 m-4"
          >
            Ajouter un article
          </button>
          <p>Aucun article sélectionné</p>
        </div>
      )}
      {<Table data={articles} columns={articleColumns} onDataChange={setArticles} />}
    </div>
  );
}
