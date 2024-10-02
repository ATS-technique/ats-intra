import pathAPI from "../pathAPI";

const UserList = {
  method: "GET",
  Authorization: true,
  path: pathAPI.USER_LIST,
  body: {},
};
export { UserList };

const Activate = {
  method: "POST",
  Authorization: true,
  path: pathAPI.ACTIVATE,
  body: { id: "" },
};
export { Activate };

const Deactivate = {
  method: "POST",
  Authorization: true,
  path: pathAPI.DEACTIVATE,
  body: { id: "" },
};
export { Deactivate };

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
export { UpdateUser };

const updatePasswordForce = {
  method: "POST",
  Authorization: true,
  path: pathAPI.FORCE_PASSWORD_UPDATE,
  body: {
    id: "",
    passwordUpdated: "",
  },
};
export { updatePasswordForce };

const updateScreenMode = {
  method: "POST",
  Authorization: true,
  path: pathAPI.SCREEN_MODE_UPDATE,
  body: {
    id: 0,
    screenMode: "",
  },
};
export { updateScreenMode };
