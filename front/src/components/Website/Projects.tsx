import { useEffect, useState, useCallback } from "react";
import {
  getAllProjects,
  getAllProjectTypes,
  addProjectType,
  deleteProjectImage,
  addManyProjectImages,
  editProjectById,
  addProject,
} from "../../constants/fetchMethods";
import { Project, ProjectType, ProjectImage } from "../../constants/types";
import { FetchAPI } from "../methods/fetch";
import { Column } from "../Table/types";
import { Table } from "../Table/Table";
import ProjectTypeDropdown from "./ProjectTypeDropdown";
import { Check, X, Trash } from "lucide-react";
import { CustomSelect } from "../inputs/CustomSelect";
import ValidationPopUp from "../ValidationPopUp/ValidationPopUp";
import ImageMultiInput from "../inputs/ImageMultiInput";
import FormAction from "../inputs/FormAction";
import ImageUpload from "../inputs/ImageUpload";

interface ProjectsProps {
  setIsError: (isError: boolean) => void;
  setIsSuccess: (isSuccess: boolean) => void;
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
}

export default function Projects({ setIsError, setIsSuccess, setSuccessMessage, setErrorMessage }: ProjectsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
  const [isValidationRequired, setIsValidationRequired] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [newCoverImage, setNewCoverImage] = useState<File | null>(null);
  const [addCoverImage, setAddCoverImage] = useState<File | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const updateInitialState = {
    id_project: 0,
    name: "",
    description: "",
    cover_image: "",
    project_type: "",
    project_images: [],
    id_project_type: 0,
  };
  const [selectedProject, setSelectedProject] = useState<Project>({
    id_project: 0,
    name: "",
    description: "",
    cover_image: "",
    project_type: "",
    project_images: [],
    id_project_type: 0,
  });

  const [addProjectFormState, setAddProjectFormState] = useState<Project>({
    id_project: 0,
    name: "",
    description: "",
    cover_image: "",
    project_type: "",
    project_images: [],
    id_project_type: 0,
  });
  const [addProjectTypeFormState, setAddProjectTypeFormState] = useState({
    name: "",
  });

  const projectsColumns: Column<Project>[] = [
    {
      key: "id_project",
      header: "",
      sortable: false,
      filterable: false,
      editable: false,
      render: (_value, row: Project) => (
        <input
          type="radio"
          name="project"
          value={row.id_project}
          className="w-4 h-4 text-orange-500"
          onChange={() => (setSelectedProject(row), setFiles([]))}
        />
      ),
      id_key: "id_project",
    },
    {
      key: "project_type",
      header: "Type de projet",
      sortable: true,
      filterable: true,
      editable: false,
      id_key: "id_project",
    },
    {
      key: "name",
      header: "Nom Projet",
      sortable: true,
      filterable: false,
      editable: true,
      id_key: "id_project",
    },
    {
      key: "description",
      header: "Description",
      sortable: true,
      filterable: false,
      editable: false,
      id_key: "id_project",
    },
    {
      key: "cover_image",
      header: "Image",
      sortable: false,
      filterable: false,
      editable: false,
      id_key: "id_project",
      render: (_value, row: Project) => (
        <img src={row.cover_image} alt={row.name} className="w-16 h-16 object-cover rounded-md" />
      ),
    },
  ];

  const handleAddProjectType = async () => {
    try {
      addProjectType.body.name = addProjectTypeFormState.name;
      await FetchAPI(addProjectType);

      setSuccessMessage("Type de projet ajouté !");
      setIsSuccess(true);
      fetchData();
      setAddProjectTypeFormState({
        name: "",
      });
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  const fetchData = useCallback(async () => {
    try {
      const projectsResponse = (await FetchAPI(getAllProjects)) as Project[];

      const projectTypesResponse = (await FetchAPI(getAllProjectTypes)) as ProjectType[];

      setProjects(projectsResponse);
      setProjectTypes(projectTypesResponse);
    } catch (error) {
      setIsError(true);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    }
  }, [setIsError, setErrorMessage]);

  const handleChangeAddProjectType = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setAddProjectTypeFormState({
      ...addProjectTypeFormState,
      [name]: value,
    });
  };

  const handleSubmitEditProject = async () => {
    try {
      console.log(selectedProject);
      const formData = new FormData();
      formData.append("id_project", selectedProject.id_project.toString());
      formData.append("name", selectedProject.name);
      formData.append("description", selectedProject.description);
      formData.append("id_project_type", selectedProject.id_project_type.toString());
      newCoverImage ? formData.append("cover_image", newCoverImage) : null;

      const request = {
        ...editProjectById,
        body: formData,
      };

      const jsonResponse = (await FetchAPI(request)) as { project: Project };

      setSelectedProject(jsonResponse.project);

      setIsSuccess(true);
      setSuccessMessage("Projet modifié !");
      setIsValidationRequired(false);
      fetchData();
    } catch (error) {
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue s'est produite.");
    }
  };

  const handleSubmitAddProject = async () => {
    try {
      if (!addCoverImage) throw new Error("Aucun fichier reçu");

      const formData = new FormData();
      formData.append("name", addProjectFormState.name);
      formData.append("description", addProjectFormState.description);
      formData.append("cover_image", addCoverImage);
      formData.append("id_project_type", addProjectFormState.id_project_type.toString());
      if (files.length > 0) {
        files.forEach((f) => formData.append("images", f));
      }
      const request = {
        ...addProject,
        body: formData,
      };

      const jsonResponse = (await FetchAPI(request)) as { project: Project };
      await setSelectedProject(jsonResponse.project);

      setIsSuccess(true);
      setSuccessMessage("Projet ajouté !");
      setIsValidationRequired(false);
      fetchData();
    } catch (error) {
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue s'est produite.");
    }
  };

  const handleDeleteProjectImage = async (result: boolean) => {
    if (result) {
      try {
        deleteProjectImage.body.id_project_image = imageToDelete;
        (await FetchAPI(deleteProjectImage)) as unknown as string;
        setIsSuccess(true);
        setSuccessMessage("Image supprimée.");
        setImageToDelete(0);
        setIsValidationRequired(false);
        fetchData();
      } catch (error) {
        setIsError(true);
        setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue s'est produite.");
      }
    } else {
      setIsError(true);
      setErrorMessage("Vous n'avez pas sélectionné d'image de projet");
    }
  };

  const handleEditProject = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSelectedProject({
      ...selectedProject,
      [name]: value,
    });
  };

  const handleAddProject = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddProjectFormState({
      ...addProjectFormState,
      [name]: value,
    });
  };

  const handleAddImages = async () => {
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("images", f));
      fd.append("id_project", selectedProject.id_project.toString());

      const request = {
        ...addManyProjectImages,
        body: fd,
      };

      (await FetchAPI(request)) as unknown as string;
      setIsSuccess(true);
      setSuccessMessage("Images ajoutées.");
      setIsValidationRequired(false);
      fetchData();
    } catch (error) {
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue s'est produite.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const isValid =
      addProjectFormState.name.trim() !== "" &&
      addProjectFormState.description.trim() !== "" &&
      addProjectFormState.id_project_type !== 0 &&
      addCoverImage !== null;
    setIsFormValid(isValid);
  }, [addProjectFormState, addCoverImage]);

  return (
    <div className="max-w-full p-8">
      {isValidationRequired ? (
        <ValidationPopUp question="Confirmer la suppression" onClose={handleDeleteProjectImage} />
      ) : null}
      <h1 className="text-2xl font-bold mb-4 py-4 dark:text-neutral-300">Gallerie</h1>
      <div className="flex flex-row gap-4 items-center p-4 border-y border-gray-200 dark:border-neutral-600">
        <h2 className="text-l font-bold py-2 dark:text-neutral-300">Type de projet :</h2>
        <ProjectTypeDropdown projectTypes={projectTypes} />
        <div className="flex row w-64">
          <input
            type="text"
            name="name"
            placeholder="Ajouter Type de projet"
            className="rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none rounded-lg focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
            onChange={(e) => {
              handleChangeAddProjectType(e);
            }}
            value={addProjectTypeFormState.name}
          />
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg m-1 flex items-center"
            onClick={handleAddProjectType}
          >
            <Check size={20} />
          </button>
        </div>
      </div>
      <div>
        {selectedProject.id_project > 0 ? (
          <div className="mb-4 w-full flex flex-col">
            <div className="mb-4 w-full flex flex-row py-4 px-2 relative">
              <button
                className="absolute top-4 right-4 dark:text-neutral-300"
                onClick={() => setSelectedProject(updateInitialState)}
              >
                <X />
              </button>
              <div className="flex flex-col w-1/2 ">
                <h2 className="text-l font-bold py-2 dark:text-neutral-300 mb-2">Modifier le projet :</h2>
                <div className="flex flex-row gap-4">
                  <div className="text-sm text-gray-500">
                    <label className="dark:text-neutral-300" htmlFor="name">
                      Nom Projet
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nom"
                      className="rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none rounded-lg focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
                      value={selectedProject.name}
                      onChange={handleEditProject}
                    />
                  </div>
                  <div className="text-sm text-gray-500 w-1/2">
                    <CustomSelect
                      label="Type de projet"
                      options={projectTypes} // [{ id_project_type, name, ... }]
                      value={selectedProject.id_project_type} // string|number|null
                      onChange={(v) => {
                        if (typeof v === "number") {
                          setSelectedProject({ ...selectedProject, id_project_type: v });
                        }
                      }} // v = id_project_type
                      placeholder="Choisir un type…"
                      valueField="id_project_type" // ← clé à utiliser pour la value
                      labelField="name" // ← clé à utiliser pour le label
                    />
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <label className="dark:text-neutral-300" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    className="rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none rounded-lg focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
                    value={selectedProject.description}
                    rows={4}
                    onChange={handleEditProject}
                  />
                </div>
                <div>
                  <FormAction handleSubmit={handleSubmitEditProject} text="modifier" isDisabled={false} />
                </div>
                <div>
                  <div className="p-6 space-y-4 flex flex-col align-center border border-dashed border-zinc-300 rounded-lg">
                    <h3 className="dark:text-neutral-300">Ajouter des images</h3>
                    <ImageMultiInput maxFiles={12} maxSizeMB={10} onChange={setFiles} name="images" />
                    <button onClick={handleAddImages} className="rounded-lg bg-black px-4 py-2 text-white">
                      Envoyer {files.length} image(s)
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-1/2 px-12 justify-center">
                <img src={selectedProject.cover_image} alt={selectedProject.name + " image"} className="max-w-1/1" />
                <ImageUpload onImageUpload={setNewCoverImage} />
              </div>
            </div>
            <div className="flex flex-row gap-4 flex-wrap">
              {selectedProject.project_images && selectedProject.project_images.length > 0 ? (
                selectedProject.project_images.map((image: ProjectImage) => (
                  <div key={image.id_project_image} className="relative flex flex-col items-center">
                    <button
                      aria-label="Action"
                      className="absolute -top-2 -right-2 z-10 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-lg shadow"
                      onClick={() => {
                        setIsValidationRequired(true);
                        setImageToDelete(image.id_project_image);
                      }}
                    >
                      <Trash size={16} />
                    </button>

                    <img
                      src={image.path}
                      alt={`Project Image ${image.id_project_image}`}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">Aucune image pour ce projet</div>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-4 w-full flex flex-col">
            <div className="mb-4 w-full flex flex-row border-t py-4 px-2">
              <div className="flex flex-col w-2/3 items-center justify-center px-4">
                <h2 className="text-l font-bold py-2 dark:text-neutral-300 mb-2">Ajouter un projet :</h2>
                <div className="flex flex-row gap-4 w-full">
                  <div className="text-sm text-gray-500">
                    <label className="dark:text-neutral-300">Nom Projet</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nom"
                      className="rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none rounded-lg focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
                      value={addProjectFormState.name}
                      onChange={handleAddProject}
                    />
                  </div>
                  <div className="text-sm text-gray-500 w-1/2">
                    <CustomSelect
                      label="Type de projet"
                      options={projectTypes} // [{ id_project_type, name, ... }]
                      value={addProjectFormState.id_project_type} // string|number|null
                      onChange={(v) => {
                        if (typeof v === "number") {
                          setAddProjectFormState({ ...addProjectFormState, id_project_type: v });
                        }
                      }} // v = id_project_type
                      placeholder="Choisir un type…"
                      valueField="id_project_type" // ← clé à utiliser pour la value
                      labelField="name" // ← clé à utiliser pour le label
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-500 w-full">
                  <label className="dark:text-neutral-300">Description</label>
                  <textarea
                    name="description"
                    placeholder="Description"
                    className="rounded-md appearance-none relative block w-full px-3 dark:bg-neutral-900 py-2 border border-neutral-300 dark:border-neutral-500 placeholder-neutral-500 text-gray-900 dark:text-neutral-300 focus:outline-none rounded-lg focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm m-1"
                    value={addProjectFormState.description}
                    rows={4}
                    onChange={handleAddProject}
                  />
                </div>
                <div className="w-64">
                  <ImageUpload onImageUpload={setAddCoverImage} />
                  <FormAction handleSubmit={handleSubmitAddProject} text="Ajouter" isDisabled={!isFormValid} />
                </div>
              </div>
              <div>
                <div className="p-6 space-y-4 flex flex-col align-center border border-dashed border-zinc-300 rounded-lg items-center justify-center">
                  <h3 className="dark:text-neutral-300">Ajouter des images</h3>
                  <ImageMultiInput maxFiles={12} maxSizeMB={10} onChange={setFiles} name="images" />
                  <span className="dark:text-neutral-300">{files.length} image(s) sélectionnée(s)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {projects.length > 0 ? <Table data={projects} columns={projectsColumns} onDataChange={setProjects} /> : null}
    </div>
  );
}
