import {useContext, useEffect, useState} from "react";
import {getGroups, getMembers, getFriendsWhoAreNotMembers} from "../../api/withToken";
import {AuthContext} from "../../context/auth-context";
import {GroupContext} from "../../context/group-context";
import Modal from "../../components/Modal";
import {SocketContext} from "../../context/friends-socket-context";
// import {Dropdown} from 'react-searchable-dropdown-component';

const FriendsComponent = ({ arr }) => {
    console.log(arr);
    return (
        <ul>
            {arr.map((user) => {
                return (
                    <li>
                        <img className="pfp" src={user.pfpURL} /> <span>{`${user.firstName} ${user.lastName}`}</span>
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
    const [members, setMembers] = useState([])
    const [addMemberModal, setAddMemberModal] = useState(false);
    const [friendsWhoAreNotMembers, setFriendsWhoAreNotMembers] = useState([])
    const [potentialMember, setPotentialMember] = useState(null)

    useEffect(() => {
        getFriendsWhoAreNotMembers(auth.token, auth.email, groupControl.selectedGroup)
            .then((response) => {
                setFriendsWhoAreNotMembers(response);
            })
            .catch((err) => console.error(err));
    }, [addMemberModal]);

    const addMemberHandler = () => {
        console.log('42', potentialMember.email)
        chatsSocketApi.addMember(potentialMember.email, groupControl.selectedGroup)
        setAddMemberModal(false)
        const currMembers = [...members]
        currMembers.push(potentialMember)
        setMembers(currMembers)
    };

    useEffect(() => {
        getMembers(auth.token, groupControl.selectedGroup)
            .then((response) => {
                setMembers(response);
                console.log('54', response)
            })
            .catch((err) => console.error(err));
    }, [groupControl.selectedGroup]);

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
            <FriendsComponent arr={members} />

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
                    <option id={friend.email} name={friend.firstName + " " + friend.lastName} key={i}>{friend.firstName} {friend.lastName}</option>)}
                </select>
                <br /><br />
                <button onClick={addMemberHandler}>Add</button>
            </Modal>
        </div>
    );
};

export default Members;
