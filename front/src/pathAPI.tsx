const BASE_API_URL = import.meta.env.VITE_API_URL;

const pathAPI = {
  /* User Methods */
  USER_LIST: BASE_API_URL + "users/usersList",
  REGISTER: BASE_API_URL + "users/register",
  LOGIN: BASE_API_URL + "users/login",
  PROFILE: BASE_API_URL + "users/profile",
  ACTIVATE: BASE_API_URL + "users/activate",
  DEACTIVATE: BASE_API_URL + "users/deactivate",
  UPDATE_PASSWORD: BASE_API_URL + "users/updatePassword",
  UPDATE_USER: BASE_API_URL + "users/updateUser",
  FORCE_PASSWORD_UPDATE: BASE_API_URL + "users/forcePasswordUpdate",
  SCREEN_MODE_UPDATE: BASE_API_URL + "users/updateScreenMode",

  /* Client Methods */
  GET_ALL_CLIENTS: BASE_API_URL + "clients/getAll",
  EDIT_CLIENT_FIELD: BASE_API_URL + "clients/editClientById",
  ADD_CLIENT: BASE_API_URL + "clients/addClient",

  /* Order Methods */
  GET_ALL_ORDERS: BASE_API_URL + "orders/getAll",
  GET_ORDER_BY_ID: BASE_API_URL + "orders/getOrderById/",
  VALIDATE_ORDER: BASE_API_URL + "orders/validateOrder",
  EDIT_ORDER_FIELD: BASE_API_URL + "orders/editOrderById",
  ADD_ORDER: BASE_API_URL + "orders/add",
  GET_MAX_QUOYE_NUMBER: BASE_API_URL + "orders/getMaxQuoteNumber",

  /* Articles Methods */
  ADD_ARTICLE: BASE_API_URL + "articles/addArticle",
  GET_ARTICLES: BASE_API_URL + "articles/getAll",

  /* Contact Methods */
  ADD_CONTACT: BASE_API_URL + "contacts/add",
  GET_CLIENT_CONTACTS: BASE_API_URL + "contacts/getContactByIdClient/",

  /* Product Methods */
  GET_PRODUCTS_BY_ORDER: BASE_API_URL + "products/getProductByOrder/",

  /* Tags Methods */
  GET_TAGS: BASE_API_URL + "tags/getAllTags",

  /* Press Mention Methods */
  ADD_PRESS_MENTION: BASE_API_URL + "pressMentions/addPressMention",
  GET_PRESS_MENTIONS: BASE_API_URL + "pressMentions/getAllPressMentions",
};

export default pathAPI;
