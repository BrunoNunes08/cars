export const getUserLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user;
}

export const postUserLoggedIn = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}