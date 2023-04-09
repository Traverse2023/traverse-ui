import React, { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = React.useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [email, setEmail] = React.useState(false);

    const acceptLogin = useCallback((email, token, expirationDate) => {
        const tokenExpirationDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);
        setToken(token);
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", tokenExpirationDate);
        setEmail(email);
    }, []);

    const acceptLogout = useCallback(() => {
        setToken(null);
        localStorage.clear();
        setEmail(null);
        setTokenExpirationDate(null);
    });

    useEffect(() => {
        if (
            localStorage.getItem("token") &&
            localStorage.getItem("email") &&
            new Date(localStorage.getItem("expiration")) > new Date()
        ) {
            acceptLogin(
                localStorage.getItem("email"),
                localStorage.getItem("token"),
                new Date(localStorage.getItem("expiration"))
            );
        }
    }, [acceptLogin]);

    useEffect(() => {
        if (token && tokenExpirationDate) {
            const remainingTime =
                tokenExpirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(acceptLogout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, acceptLogout, tokenExpirationDate]);

    return { token, email, acceptLogin, acceptLogout };
};
