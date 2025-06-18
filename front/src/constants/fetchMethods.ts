import pathAPI from "../pathAPI";

const UserList = {
  method: "GET",
  Authorization: true,
  path: pathAPI.USER_LIST,
  body: null,
};

const Activate = {
  method: "POST",
  Authorization: true,
  path: pathAPI.ACTIVATE,
  body: { id: "" },
};

const Deactivate = {
  method: "POST",
  Authorization: true,
  path: pathAPI.DEACTIVATE,
  body: { id: "" },
};

const UpdateUser = {
  method: "POST",
  Authorization: true,
  path: pathAPI.UPDATE_USER,
  body: {
    id: "",
    nameUpdated: "",
    mailUpdated: "",
  },
};

const updatePasswordForce = {
  method: "POST",
  Authorization: true,
  path: pathAPI.FORCE_PASSWORD_UPDATE,
  body: {
    id: "",
    passwordUpdated: "",
  },
};

const updateScreenMode = {
  method: "POST",
  Authorization: true,
  path: pathAPI.SCREEN_MODE_UPDATE,
  body: {
    id: 0,
    screenMode: "",
  },
};

const getAllClients = {
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_ALL_CLIENTS,
  body: null,
};

const addClient = {
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

const editClientById = {
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

const getAllOrders = {
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_ALL_ORDERS,
  body: null,
};

const editOrderById = {
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

const getOrderById = (id_client: string) => ({
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_ORDER_BY_ID + id_client,
  body: null,
});

const getProductsByOrder = (id_client: string) => ({
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_PRODUCTS_BY_ORDER + id_client,
  body: null,
});

const getClientContactsById = (id_client: number) => ({
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_CLIENT_CONTACTS + id_client,
  body: null,
});

const getArticles = {
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_ARTICLES,
  body: null,
};

const getTags = {
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_TAGS,
  body: null,
};

const addArticle = {
  method: "POST",
  Authorization: true,
  path: pathAPI.ADD_ARTICLE,
  body: {},
};

const getMaxQuoteNumber = {
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_MAX_QUOYE_NUMBER,
  body: null,
};

const addOrder = {
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

const addContact = {
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

const validateOrder = {
  method: "POST",
  Authorization: true,
  path: pathAPI.VALIDATE_ORDER,
  body: {
    id_order: 0,
    validated: false,
  },
};

const billOrder = {
  method: "POST",
  Authorization: true,
  path: pathAPI.VALIDATE_ORDER,
  body: {
    id_order: 0,
    validated: false,
    billed: false,
  },
};

const payOrder = {
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

const addPressMention = {
  method: "POST",
  Authorization: true,
  path: pathAPI.ADD_PRESS_MENTION,
  body: {},
};

const getAllPressMentions = {
  method: "GET",
  Authorization: true,
  path: pathAPI.GET_PRESS_MENTIONS,
  body: null,
};

const editPressMention = {
  method: "POST",
  Authorization: true,
  path: pathAPI.EDIT_PRESS_MENTION,
  body: {},
};

const deletePressMention = {
  method: "POST",
  Authorization: true,  
  path: pathAPI.DELETE_PRESS_MENTION,
  body: {
    id_press_mention: 0,
  },
};



export {
  UserList,
  Activate,
  Deactivate,
  UpdateUser,
  updatePasswordForce,
  updateScreenMode,
  getAllClients,
  addClient,
  editClientById,
  getAllOrders,
  editOrderById,
  getOrderById,
  getProductsByOrder,
  getArticles,
  addArticle,
  getMaxQuoteNumber,
  addOrder,
  getClientContactsById,
  addContact,
  validateOrder,
  billOrder,
  payOrder,
  getTags,
  addPressMention,
  getAllPressMentions,
  editPressMention,
  deletePressMention,
};
