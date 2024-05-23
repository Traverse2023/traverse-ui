import {useContext, useEffect, useState} from "react";
import { getFriendsWhoAreNotMembers} from "../../api/main-service.js";
import {AuthContext} from "../../context/auth-context";
import {GroupContext} from "../../context/group-context.tsx";
import Modal from "../../components/Modal";
import {SocketContext} from "../../context/friends-socket-context";
// import {Dropdown} from 'react-searchable-dropdown-component';

const FriendsComponent = ({ arr }) => {
    return (
        <ul>
            {arr.map((user) => {
                return (
                    <li key={user.email}>
                        <img className="pfp"   src={user.pfpURL} /> <span>{`${user.firstName} ${user.lastName}`}</span>
                    </li>
                );
            })}
        </ul>
    );
};

const Members = () => {
    const { chatsSocketApi } = useContext(SocketContext)
    const auth = useContext(AuthContext);
    const groupControl = useContext(GroupContext);
    const {members, setMembers} = useContext(GroupContext);
    // const [members, setMembers] = useState([])
    const [addMemberModal, setAddMemberModal] = useState(false);
    const [friendsWhoAreNotMembers, setFriendsWhoAreNotMembers] = useState([])
    const [potentialMember, setPotentialMember] = useState(null)

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

    const addMemberHandler = () => {
        console.log('42', potentialMember.email)
        chatsSocketApi.addMember(potentialMember.email, groupControl.selectedGroup.groupId)
        setAddMemberModal(false)
        const currMembers = [...members]
        currMembers.push(potentialMember)
        setMembers(currMembers)
    };

    const addMemberChangeHandler = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const id =  el.getAttribute('id');
        const name = el.getAttribute('name')
        const [firstName, lastName] = name.split(' ');
        setPotentialMember({email: id, firstName, lastName})
    }

    return (
        <div className="members">
            <button onClick={() => setAddMemberModal(true)}>Add Member</button>
            <h4>Online</h4>
            <FriendsComponent arr={members} key={members}/>

            <h4>Offline</h4>

            <Modal show={addMemberModal} setModalStatus={setAddMemberModal}>
                <label>Add Member</label>
                <br />
                <br />
                {/*<input*/}
                {/*    placeholder="Enter a group name"*/}
                {/*    id="groupName"*/}
                {/*    onChange={groupInfoHandler}*/}
                {/*/>*/}
                <select onChange={addMemberChangeHandler}>
                    <option></option>
                    {friendsWhoAreNotMembers.map((friend, i) =>
                    <option key={friend.id} id={friend.email} name={friend.firstName + " " + friend.lastName} >{friend.firstName} {friend.lastName}</option>)}
                </select>
                <br /><br />
                <button onClick={addMemberHandler}>Add</button>
            </Modal>
        </div>
    );
};

export default Members;
