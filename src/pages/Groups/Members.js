const FriendsComponent = ({ arr }) => {
    console.log(arr);
    return (
        <ul>
            {arr.map((user) => {
                return (
                    <li>
                        <div className="pfp"></div> <span>{user}</span>
                    </li>
                );
            })}
        </ul>
    );
};

const Members = () => {
    return (
        <div className="members">
            <h4>Online</h4>
            <FriendsComponent arr={["belal", "rox", "moe"]} />

            <h4>Offline</h4>
            <FriendsComponent arr={["juhan", "shakib", "farhan"]} />
        </div>
    );
};

export default Members;
