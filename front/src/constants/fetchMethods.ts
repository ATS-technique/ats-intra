import pathAPI from "../pathAPI";

export const UserList = {
  method: "GET",
  Authorization: true,
  path: pathAPI.USER_LIST,
  body: null,
};

export const Activate = {
  method: "POST",
  Authorization: true,
  path: pathAPI.ACTIVATE,
  body: { id: "" },
};

export const Deactivate = {
  method: "POST",
  Authorization: true,
  path: pathAPI.DEACTIVATE,
  body: { id: "" },
};

export const UpdateUser = {
  method: "POST",
  Authorization: true,
  path: pathAPI.UPDATE_USER,
  body: {
    id: "",
    nameUpdated: "",
    mailUpdated: "",
  },
};

export const Register = {
  method: "POST",
  Authorization: true,
  path: pathAPI.REGISTER,
  body: {
    name: "",
    mail: "",
    password: "",
    is_active: true,
  },
};

export const updatePasswordForce = {
  method: "POST",
  Authorization: true,
  path: pathAPI.FORCE_PASSWORD_UPDATE,
  body: {
    id: "",
    passwordUpdated: "",
  },
};

export const updateScreenMode = {
  method: "POST",
  Authorization: true,
  path: pathAPI.SCREEN_MODE_UPDATE,
  body: {
    id: 0,
    screenMode: "",
  },
};

export const getAllClients = {
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_ALL_CLIENTS,
  body: null,
};

export const addClient = {
  method: "POST",
  Authorization: true,
  path: pathAPI.ADD_CLIENT,
  body: {
    name: "",
    pro: false,
    tel: "",
    mail: "",
    address: "",
    post_code: "",
    city: "",
    siren: "",
  },
};

export const editClientById = {
  method: "POST",
  Authorization: true,
  path: pathAPI.EDIT_CLIENT_FIELD,
  body: {
    id_client: 0,
    name: "",
    pro: false,
    tel: "",
    mail: "",
    address: "",
    post_code: 0,
    city: "",
    siren: "",
  },
};

export const getAllOrders = {
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_ALL_ORDERS,
  body: null,
};

export const editOrderById = {
  method: "POST",
  Authorization: true,
  path: pathAPI.EDIT_ORDER_FIELD,
  body: {
    id_client: 0,
    site_name: "",
    ordered_at: "",
    deposit_rate: 0,
    site_address: "",
  },
};

export const getOrderById = (id_client: string) => ({
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_ORDER_BY_ID + id_client,
  body: null,
});

export const getProductsByOrder = (id_client: string) => ({
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_PRODUCTS_BY_ORDER + id_client,
  body: null,
});

export const getClientContactsById = (id_client: number) => ({
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_CLIENT_CONTACTS + id_client,
  body: null,
});

export const getArticles = {
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_ARTICLES,
  body: null,
};

export const getTags = {
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_TAGS,
  body: null,
};

export const addArticle = {
  method: "POST",
  Authorization: true,
  path: pathAPI.ADD_ARTICLE,
  body: {},
};

export const getMaxQuoteNumber = {
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_MAX_QUOYE_NUMBER,
  body: null,
};

export const addOrder = {
  method: "POST",
  Authorization: true,
  path: pathAPI.ADD_ORDER,
  body: {
    quote_number: 0,
    site_name: "",
    site_address: "",
    ordered_at: "",
    deposit_rate: 0,
    comment: "",
    reference: "",
    object: "",
    id_client: 0,
    id_contact: 0,
    id_user: localStorage.getItem("loggedUser"),
  },
};

export const addContact = {
  method: "POST",
  Authorization: true,
  path: pathAPI.ADD_CONTACT,
  body: {
    id_client: 0,
    name: "",
    mail: "",
    mobile: "",
    landline: "",
  },
};

export const validateOrder = {
  method: "POST",
  Authorization: true,
  path: pathAPI.VALIDATE_ORDER,
  body: {
    id_order: 0,
    validated: false,
  },
};

export const billOrder = {
  method: "POST",
  Authorization: true,
  path: pathAPI.VALIDATE_ORDER,
  body: {
    id_order: 0,
    validated: false,
    billed: false,
  },
};

export const payOrder = {
  method: "POST",
  Authorization: true,
  path: pathAPI.VALIDATE_ORDER,
  body: {
    id_order: 0,
    paid: false,
    billed: false,
    payment_date: "",
  },
};

export const addPressMention = {
  method: "POST",
  Authorization: true,
  path: pathAPI.ADD_PRESS_MENTION,
  body: {},
};

export const getAllPressMentions = {
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_PRESS_MENTIONS,
  body: null,
};

export const editPressMention = {
  method: "POST",
  Authorization: true,
  path: pathAPI.EDIT_PRESS_MENTION,
  body: {},
};

export const deletePressMention = {
  method: "POST",
  Authorization: true,  
  path: pathAPI.DELETE_PRESS_MENTION,
  body: {
    id_press_mention: 0,
  },
};

export const getAllProjects = {
  method: "GET",
  Authorization: true,
  path: pathAPI.PROJECTS_LIST,
  body: null,
};  

export const addProject = {
  method: "POST",
  Authorization: true,
  path: pathAPI.PROJECTS_ADD,
  body: {},
};

export const getOneProject = {  
  method: "GET",
  Authorization: true,
  path: pathAPI.PROJECTS_GET_ONE,
  body: null,
};

export const getProjectByType = {
  method: "GET",
  Authorization: true,
  path: pathAPI.PROJECTS_GET_PROJECT_BY_TYPE,
  body: null,
};

export const getAllProjectTypes = {
  method: "GET",
  Authorization: true,
  path: pathAPI.PROJECT_TYPES_LIST,
  body: null,
};

export const addProjectType = {
  method: "POST",
  Authorization: true,
  path: pathAPI.PROJECT_TYPES_ADD,
  body: {
    name: "",
  },
};

export const getOneProjectType = {
  method: "GET",
  Authorization: true,
  path: pathAPI.PROJECT_TYPES_GET_ONE,
  body: null,
};

export const getAllProjectImages = {
  method: "GET",
  Authorization: true,
  path: pathAPI.PROJECT_IMAGES_LIST,
  body: null,
};

export const addProjectImage = {
  method: "POST",
  Authorization: true,
  path: pathAPI.PROJECT_IMAGES_ADD,
  body: {
    id_project: 0,
    path: "",
  },
};

export const addManyProjectImages = {
  method: "POST",
  Authorization: true,
  path: pathAPI.PROJECT_IMAGES_ADD_MANY,
  body: {
    id_project: 0,
  },
};

export const getOneProjectImage = {
  method: "GET",
  Authorization: true,
  path: pathAPI.PROJECT_IMAGES_GET_ONE,
  body: null,
};

export const deleteProjectImage = {
  method: "DELETE",
  Authorization: true,
  path: pathAPI.PROJECT_IMAGES_DELETE,
  body: {
    id_project_image: 0,
  },
};

export const editProjectById = {
  method: "PUT",
  Authorization: true,
  path: pathAPI.PROJECTS_UPDATE,
  body: {
    id_project: 0,
    name: "",
    description: "",
    cover_image: "",
  },
};