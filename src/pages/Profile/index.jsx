import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getFriends } from "../../api/main-service.js";
import NavBar from "../../components/NavBar";
import { AuthContext } from "../../context/auth-context";
import Other from "./Other";
import Self from "./Self";

const Profile = () => {
    const { email } = useParams();
    const auth = useContext(AuthContext);
    if (email === auth.email) {
        return <Self />;
    }
    return <Other />;
};

export default Profile;
