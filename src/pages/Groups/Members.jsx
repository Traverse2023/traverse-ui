<<<<<<< Updated upstream
import {useContext, useEffect, useState} from "react";
import {getGroups, getMembers, getFriendsWhoAreNotMembers} from "../../api/withToken";
import {AuthContext} from "../../context/auth-context";
import {GroupContext} from "../../context/group-context.tsx";
import Modal from "../../components/Modal";
import {SocketContext} from "../../context/friends-socket-context";
=======
>>>>>>> Stashed changes
// import {Dropdown} from 'react-searchable-dropdown-component';
import { useContext, useEffect, useState } from "react";
import { getFriendsWhoAreNotMembers, getMembers } from "../../api/withToken";
import { AuthContext } from "../../context/auth-context";
import { GroupContext } from "../../context/group-context";
import Modal from "../../components/Modal";
import { SocketContext } from "../../context/friends-socket-context";
import { Link, useNavigate } from 'react-router-dom';

// Component to render a list of friends
const FriendsComponent = ({ arr }) => {
    return (
        <ul>
            {arr.map((user) => {
                return (
                    <li key={user.email}>
                        <Link to={`/profile/${user.email}`}>
                            <img className="pfp" src={user.pfpURL} alt="profile" /> <span>{`${user.firstName} ${user.lastName}`}</span>
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
    const auth = useContext(AuthContext);
    const groupControl = useContext(GroupContext);
    const { members, setMembers } = useContext(GroupContext);
    const [addMemberModal, setAddMemberModal] = useState(false);
    const [friendsWhoAreNotMembers, setFriendsWhoAreNotMembers] = useState([])
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    // Load friends who are not members when the modal is opened
    useEffect(() => {
        getFriendsWhoAreNotMembers(auth.token, auth.email, groupControl.selectedGroup.groupId)
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
            const memberEmails = selectedFriends.map(friend => friend.email);
            await chatsSocketApi.addMembers(memberEmails, groupControl.selectedGroup.groupId);
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

<<<<<<< Updated upstream
    const addMemberChangeHandler = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const id =  el.getAttribute('id');
        const name = el.getAttribute('name')
        const [firstName, lastName] = name.split(' ');
        setPotentialMember({email: id, firstName, lastName})
    }
=======
    // Load group members when the group changes
    useEffect(() => {
        getMembers(auth.token, groupControl.selectedGroup.groupId)
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
>>>>>>> Stashed changes

    return (
        <div className="members">
            <div className="button-container">
                <button onClick={() => setAddMemberModal(true)}>Add Member</button>
            </div>
            <h4>Online</h4>
            <FriendsComponent arr={members}/>

            <h4>Offline</h4>

            <Modal show={addMemberModal} setModalStatus={setAddMemberModal}>
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
                        backgroundColor: selectedFriends.length === 0 ? 'gray' : '#7F56D9',
                        color: 'white'
                    }}
                >Add Members
                </button>
            </Modal>
        </div>
    );
};

export default Members;