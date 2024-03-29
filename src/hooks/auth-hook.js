import React, { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = React.useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [email, setEmail] = React.useState(false);
    const [firstName, setFirstName] = React.useState(false)
    const [lastName, setLastName] = React.useState(false)
    const [pfpURL, setPfpURL] = React.useState(false)

    const acceptLogin = useCallback((email, firstName, lastName, pfpURL, token, expirationDate) => {
        const tokenExpirationDate =
            expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpirationDate);
        setToken(token);
        localStorage.setItem("email", email);
        localStorage.setItem("token", token);
        localStorage.setItem("firstName", firstName)
        localStorage.setItem("lastName", lastName)
        localStorage.setItem("expiration", tokenExpirationDate);
        localStorage.setItem("pfpURL", pfpURL)
        setEmail(email);
        setFirstName(firstName)
        setLastName(lastName)
        setPfpURL(pfpURL)
    }, []);

    const acceptLogout = useCallback(() => {
        setToken(null);
        localStorage.clear();
        setEmail(null);
        setTokenExpirationDate(null);
    });

    const updatePfpUrl = useCallback((location) => {
        setPfpURL(location)
        localStorage.setItem("pfpURL", location)
    })

    useEffect(() => {
        if (
            localStorage.getItem("token") &&
            localStorage.getItem("email") &&
            new Date(localStorage.getItem("expiration")) > new Date()
        ) {
            acceptLogin(
                localStorage.getItem("email"),
                localStorage.getItem("firstName"),
                localStorage.getItem("lastName"),
                localStorage.getItem("pfpURL"),
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

    return { token, email, firstName, lastName, pfpURL, acceptLogin, acceptLogout, updatePfpUrl };
};
