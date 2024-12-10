import {useContext, useEffect, useState} from "react";
import {getFriendsWhoAreNotMembers, getMembers} from "../../api/main-service.js";
import {GroupContext} from "../../context/group-context.tsx";
import Modal from "../../components/Modal";
import {SocketContext} from "../../context/friends-socket-context";
import { Link, useNavigate } from 'react-router-dom';

// Component to render a list of friends
const FriendsComponent = ({ arr }) => {
    return (
        <ul>
            {arr.map((user) => {
                return (
                    <li key={user.id}>
                        <Link to={`/profile/${user.id}`} style={{display: "flex", alignItems: "center", gap: "5px"}}>
                            {/*<img className="pfp" src={user.pfpURL} /> <span>{`${user.firstName} ${user.lastName}`}</span>*/}
                            <img className="pfp" src="./imgs/bryan.png" /> <span>{`${user.firstName} ${user.lastName}`}</span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

// Component for managing group members
const Members = () => {
    const { chatsSocketApi } = useContext(SocketContext)
    const groupControl = useContext(GroupContext);
    const { members, setMembers } = useContext(GroupContext);
    const [addMemberModal, setAddMemberModal] = useState(false);
    const [friendsWhoAreNotMembers, setFriendsWhoAreNotMembers] = useState([])
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [searchText, setSearchText] = useState('');

    // Load friends who are not members when the modal is opened
    useEffect(() => {
        getFriendsWhoAreNotMembers(groupControl.selectedGroup.groupId)
            .then((response) => {
                setFriendsWhoAreNotMembers(response);
            })
            .catch((err) => console.error(err));
    }, [addMemberModal]);
    useEffect(() => {
        chatsSocketApi.receiveAddedToGroupNotificationListener((users) => {

        })
    }, []);

    // Handler to add selected members to the group
    const addMemberHandler = async () => {
        try {
            await chatsSocketApi.addMembers(selectedFriends, groupControl.selectedGroup.groupId);
            setAddMemberModal(false);
            setMembers([...members, ...selectedFriends]);

            // Scroll to the bottom of the list of filtered friends
            const list = document.getElementById('filteredFriendsList');
            const lastItem = list.lastElementChild;
            lastItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } catch (err) {
            console.error(err);
        }
    };

    // Load group members when the group changes
    useEffect(() => {
        getMembers(groupControl.selectedGroup.groupId)
            .then((response) => {
                setMembers(response);
            })
            .catch((err) => console.error(err));
    }, [groupControl.selectedGroup.groupId]);

    // Handler to update the search text
    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    // Filter friends based on the search text and exclude those already selected
    const filteredFriends = friendsWhoAreNotMembers.filter(
        friend =>
            friend.firstName.toLowerCase().includes(searchText) ||
            friend.lastName.toLowerCase().includes(searchText)
    ).filter(
        friend => !selectedFriends.find(selectedFriend => selectedFriend.email === friend.email)
    );

    return (
        <div className="members">
            <div className="button-container">
                <button onClick={() => setAddMemberModal(true)}>Add Member</button>
            </div>
            <h4>Online</h4>

            <FriendsComponent arr={members}/>

            <h4>Offline</h4>

            <Modal show={addMemberModal} setModalStatus={setAddMemberModal} style={{
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '15px',
                maxWidth: '320px',
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto',
            }}>
                <label className="addMember"></label>
                <br/>
                <br/>
                <input
                    type="text"
                    value={searchText}
                    onChange={handleSearchTextChange}
                    placeholder="Search"
                />
                <br/><br/>
                <div className="filteredFriendsListWrapper">
                    <ul id="filteredFriendsList" className="filteredFriendsList">
                        {filteredFriends.map((friend, i) => (
                            <li key={i}>
                                <div
                                    onClick={() => setSelectedFriends([...selectedFriends, friend])}
                                    className="friend-name"
                                >
                                    {friend.firstName} {friend.lastName}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                {selectedFriends.length > 0 && (
                    <div>
                        <hr style={{width: "260px", margin: "10px auto"}}/>
                        {/* Horizontal line with reduced margin */}
                        <div className="selected-text">Selected:</div>
                        <ul className="selected-friends-list">
                            {selectedFriends.map((friend, index) => (
                                <li key={friend.email}>
                                    <button
                                        onClick={() => setSelectedFriends(selectedFriends.filter(f => f.email !== friend.email))}
                                        className="remove-button"
                                    >
                                        <span>{friend.firstName} {friend.lastName}</span>
                                        <span>&#10006;</span> {/* This is the "x" character */}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <button
                    onClick={addMemberHandler}
                    disabled={selectedFriends.length === 0}
                    className="add-button"
                    style={{
                        backgroundColor: selectedFriends.length === 0 ? 'gray' : '#F0B62B',
                        color: 'white'
                    }}
                >Add Members
                </button>
            </Modal>
        </div>
    );
};

export default Members;