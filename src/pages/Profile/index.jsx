import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Other from "./Other";
import Self from "./Self";
import {useAuth} from "../../hooks/useAuth.tsx";

const Profile = () => {
    const { userId } = useParams();
    const { user } = useAuth();
    if (userId === user.id) {
        return <Self />;
    }
    return <Other />;
};

export default Profile;
