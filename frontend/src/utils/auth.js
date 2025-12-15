export const isLoggedIn = () => {
  return !!localStorage.getItem("sessionToken");
};



export const logout = () => {
  localStorage.removeItem("sessionToken");
};
