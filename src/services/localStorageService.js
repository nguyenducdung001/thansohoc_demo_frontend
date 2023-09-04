export const USER_LOGIN = "USER_LOGIN";

export const userLocalService = {
  set: (userData) => {
    let userJson = JSON.stringify(userData);
    localStorage.setItem(USER_LOGIN, userJson);
  },
  get: () => {
    let userJson = localStorage.getItem(USER_LOGIN);
    if (userJson != null) {
      return JSON.parse(userJson);
    } else {
      return null;
    }
  },
};
