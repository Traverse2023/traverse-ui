import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import React, {useContext, useEffect} from "react";
import cloneDeep from "lodash/cloneDeep.js";
import {SocketContext} from "../../context/friends-socket-context.js";
import {AuthContext} from "../../context/auth-context.js";
import {GroupContext} from "../../context/group-context.js";

const VoiceChannel = ({channelName, channels, addUser}) => {
    const { chatsSocketApi } = useContext(SocketContext)
    const auth = useContext(AuthContext)
    const groupControl = useContext(GroupContext)
    useEffect(() => {
        // console.log('24configuid', config.uid)
        chatsSocketApi.joinCallListener((member, channelName) => {
            console.log(member, "joining call")
            addUser(channelName, member)
        })
    }, []);
    const joinVoiceChannel = () => {
        chatsSocketApi.joinCall({
            email: auth.email,
            firstName: auth.firstName,
            lastName: auth.lastName,
            pfp: auth.pfpURL
        }, groupControl.selectedGroup, channelName)
    }
    return (
        <>
            <div className="channel" onClick={joinVoiceChannel}>
                <h1>#</h1>
                <h6>{channelName}</h6>
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                        <Tooltip className="tooltip">Edit Channel</Tooltip>
                    }
                >
                    <button>*</button>
                </OverlayTrigger>
                {/* <button>*</button> */}

            </div>
            <div style={{paddingLeft: "30px", marginTop: '-5px', paddingBottom: "5px"}}>
                {channels.get(channelName)?.map(member => (
                    <div style={{display: "flex", alignItems: "center", alignContent: "center", paddingTop: "15px"}}>
                        <img src={member.pfp} style={{width: '20px', paddingRight: "10px"}}/>
                        <div style={{textAlign: "center", fontSize: "14px"}}>{member.firstName+' '+member.lastName}</div>
                    </div>
                ))}
            </div>
        </>
    )
}


export default VoiceChannel