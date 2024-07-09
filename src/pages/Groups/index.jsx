import React, {useContext} from "react";
import NavBar from "../../components/NavBar";
import {GroupContext} from "../../context/group-context.tsx";
import ControlCenter from "./ControlCenter";
import GroupSelector from "./GroupSelector";
import Members from "./Members";
import MessageArea from "./MessageArea";
import SubGroupSelector from "./SubGroupSelector";

const Groups = () => {

    const {selectedGroup} = useContext(GroupContext)

    return (
        <div style={{ height: "100%" }}>

            <div className="groupsContainer">
                <GroupSelector />
                {selectedGroup.groupId !== "control-center" ? (
                    <>
                        <SubGroupSelector />
                        <MessageArea />
                        <Members />
                    </>
                ) : (
                    <ControlCenter />
                )}
            </div>
        </div>
    );
};

export default Groups;
