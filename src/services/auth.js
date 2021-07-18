export const isAuthenticated = () => localStorage.getItem("user") !== null;
export const getToken = () => localStorage.getItem("token");
export const login = data => {
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.access_token);
};
export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
};
