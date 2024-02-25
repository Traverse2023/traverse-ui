import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMicrophone, faMicrophoneSlash, faPhone} from "@fortawesome/free-solid-svg-icons";
import React, {useContext} from "react";
import {GroupContext} from "../../context/group-context.js";
import {useLocalMicrophoneTrack, useRTCClient} from "agora-rtc-react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {SocketContext} from "../../context/friends-socket-context.js";
import {AuthContext} from "../../context/auth-context.js";

const MediaControls = () => {
    const groupControl = useContext(GroupContext)
    const auth = useContext(AuthContext)
    const { chatsSocketApi } = useContext(SocketContext)
    const client = useRTCClient();
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const disconnectVoiceChannel = async() => {
        groupControl.setInCall(false);
        console.log('localmictrack', localMicrophoneTrack);

        await localMicrophoneTrack?.setEnabled(false);
        await localMicrophoneTrack?.stop();
        await client.leave();
        groupControl.setSelectedVoiceChannel(null);
        chatsSocketApi.disconnectCall({
            email: auth.email
        }, groupControl.selectedGroup, groupControl.selectedVoiceChannel)
        // groupControl.setTriggerDisconnect(prevState => !prevState)
    }
    const mute = async () => {
        console.log('mute')
        // groupControl.setIsMuted(true)
        await localMicrophoneTrack?.setMuted(true);
    }
    const unmute = async () => {
        // groupControl.setIsMuted(false)
        console.log('unmute')
        await localMicrophoneTrack?.setEnabled(true);
    }
    return (
        groupControl.inCall ?
            <div className="media-controls">
                {
                    groupControl.isMuted ?
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip className="tooltip">Unmute</Tooltip>
                            }
                        >
                            <FontAwesomeIcon onClick={unmute} icon={faMicrophoneSlash} className="media-control-icon"/>
                        </OverlayTrigger>
                        :
                        <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                                <Tooltip className="tooltip">Mute</Tooltip>
                            }
                        >
                            <FontAwesomeIcon onClick={mute}  icon={faMicrophone} className="media-control-icon"/>
                        </OverlayTrigger>

                }
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                        <Tooltip className="tooltip">Disconnect</Tooltip>
                    }
                >
                    <FontAwesomeIcon onClick={disconnectVoiceChannel} icon={faPhone} style={{rotate: "137deg"}} className="media-control-icon"/>
                </OverlayTrigger>
            </div>
        :
            null
    )
}


export default MediaControls