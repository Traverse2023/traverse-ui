import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchUsers } from "../../api/withToken";
import FriendOpts from "../../components/FriendsOpts";
import { AuthContext } from "../../context/auth-context";

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
    const auth = useContext(AuthContext);
    const [userResults, setUserResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        searchUsers(auth.token, auth.email, location.state.searchVal)
            .then((response) => {
                setUserResults(response);
            })
            .catch((err) => console.log(err));
    }, [location]);

    return (
        <ul className="people">
            {userResults.map((result, i) => {
                return (
                    <>
                        <li className="person">
                            <div className="pfp"></div>{" "}
                            <h4>
                                {result.firstName} {result.lastName}
                            </h4>
                            <div className="options">
                                {
                                    <FriendOpts
                                        user2Email={result.email}
                                        locationState={location}
                                    />
                                }
                            </div>
                        </li>
                        <br />
                    </>
                );
            })}
        </ul>
    );
};

export default UserRes;
