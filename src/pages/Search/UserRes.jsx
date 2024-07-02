import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchUsers } from "../../api/main-service.js";
import FriendOpts from "../../components/FriendsOpts";
import {useAuth} from "../../hooks/useAuth.tsx";

const Spinner = () => {
    return (
        <h1 className="loader">
            <span className="let1">l</span>
            <span className="let2">o</span>
            <span className="let3">a</span>
            <span className="let4">d</span>
            <span className="let5">i</span>
            <span className="let6">n</span>
            <span className="let7">g</span>
        </h1>
    );
};

const UserRes = () => {
    const {user} = useAuth()
    const [userResults, setUserResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        searchUsers(location.state.searchVal)
            .then((response) => {
                setUserResults(response);
            })
            .catch((err) => console.log(err));
    }, [location]);

    return (
        <ul className="people">
            {userResults.length ? userResults.map((user, i) => {
                return (
                    <>
                        <li className="person">
                            <div className="pfp"></div>{" "}
                            <h4>
                                {user.firstName} {user.lastName}
                            </h4>
                            <div className="options">
                                {
                                    <FriendOpts
                                        user2Id={user.id}
                                        locationState={location}
                                        index={i}
                                    />
                                }
                            </div>
                        </li>
                        <br />
                    </>
                );
            }) : <Spinner/>}
        </ul>
    );
};

export default UserRes;
