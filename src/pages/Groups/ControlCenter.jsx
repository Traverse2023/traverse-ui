import { useContext, useState } from "react";
import { createGroup } from "../../api/main-service.js";
import Modal from "../../components/Modal";
import { AuthContext } from "../../context/auth-context";

const ControlCenter = () => {
    const [createGroupModal, setCreateGroupModal] = useState(false);
    const [groupInfo, setGroupInfo] = useState();
    const auth = useContext(AuthContext);

    const groupInfoHandler = (event) => {
        setGroupInfo((prev) => {
            return {
                ...prev,
                [event.target.id]: event.target.value,
            };
        });
    };

    const createGroupHandler = () => {
        createGroup(auth.token, groupInfo, auth.email)
            .then((response) => {
                console.log(response);
                window.location = "/groups";
            })
            .catch((err) => console.error(err));
    };

    return (
        <div>
            <button onClick={() => setCreateGroupModal(true)}>
                Create Group
            </button>
            <Modal show={createGroupModal} setModalStatus={setCreateGroupModal}>
                <label>Create a Group</label>
                <br />
                <br />
                <input
                    placeholder="Enter a group name"
                    id="groupName"
                    onChange={groupInfoHandler}
                />
                <button onClick={createGroupHandler}>Create</button>
            </Modal>
        </div>
    );
};

export default ControlCenter;
