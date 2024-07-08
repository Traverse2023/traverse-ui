import NavBar from "../../components/NavBar";
import UserRes from "./UserRes";

const Search = () => {
    return (
        <div>
            <div className="sticky-top">
                <div
                    style={{
                        height: "fit-content",
                        width: "100%",
                        backgroundColor: "white",
                    }}
                >
                    <ul className="search-tabs">
                        <li className="">Posts</li>
                        <li className="select-tab-horizontal">People</li>
                    </ul>
                </div>
            </div>
            <div className="search-results">
                <UserRes />
            </div>
        </div>
    );
};

export default Search;
