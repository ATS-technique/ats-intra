const BASE_API_URL = "http://localhost:3000/api/"; // Remplacez par l'adresse de votre API

enum pathAPI {
  USER_LIST = BASE_API_URL + "users/usersList",
  REGISTER = BASE_API_URL + "users/register",
  LOGIN = BASE_API_URL + "users/login",
  PROFILE = BASE_API_URL + "users/profile",
  ACTIVATE = BASE_API_URL + "users/activate",
  DEACTIVATE = BASE_API_URL + "users/deactivate",
  UPDATE_PASSWORD = BASE_API_URL + "users/updatePassword",
  UPDATE_USER = BASE_API_URL + "users/updateUser",
  FORCE_PASSWORD_UPDATE = BASE_API_URL + "users/forcePasswordUpdate",
  SCREEN_MODE_UPDATE = BASE_API_URL + "users/updateScreenMode",
}
export default pathAPI;
