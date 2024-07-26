import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMicrophone, faMicrophoneSlash, faPhone, faVideo, faVideoSlash, faPlaneSlash, faPlane} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useEffect} from "react";
import {GroupContext} from "../../context/group-context.tsx";
import {useLocalMicrophoneTrack, useRTCClient} from "agora-rtc-react";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {SocketContext} from "../../context/friends-socket-context.js";
import {useAuth} from "../../hooks/useAuth.tsx";

const MediaControls = () => {
    const {user} = useAuth()
    const {setInCall, selectedGroup,
        selectedVoiceChannel, inCall, setShowVideoView,
        setIsMuted, setCameraOn, setSelectedVoiceChannel,
        cameraOn, isMuted, showVideoView, shareScreen, setShareScreen} = useContext(GroupContext)
    const { chatsSocketApi } = useContext(SocketContext)
    const client = useRTCClient();
    const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
    const disconnectVoiceChannel = async() => {
        setInCall(false);
        console.log('localmictrack', localMicrophoneTrack);

        await localMicrophoneTrack?.setEnabled(false);
        localMicrophoneTrack?.stop();
        await client.leave();
        setSelectedVoiceChannel(null);
        chatsSocketApi.disconnectCall({
            id: user.id
        }, selectedGroup, selectedVoiceChannel)
        // groupControl.setTriggerDisconnect(prevState => !prevState)
    }
    const mute = async () => {
        console.log('mute')
        setIsMuted(true)
        // await localMicrophoneTrack?.setMuted(true);
    }
    const unmute = async () => {
        setIsMuted(false)
        console.log('unmute')
        // await localMicrophoneTrack?.setEnabled(true);
    }

    const turnOnCamera = () => {
        console.log("turning on camera")
        setCameraOn(true)
    }

    useEffect(() => {
        console.log('invoking cameraON', cameraOn)
    }, [cameraOn]);



    return (
        inCall ?
            <div className="media-controls">
                {
                    isMuted ?
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
                {cameraOn ?
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip className="tooltip">Turn Off Camera</Tooltip>
                        }
                    >
                            <FontAwesomeIcon onClick={() => {
                                setCameraOn(false)
                                console.log(`Camera on: ${cameraOn} in controls`)
                            }
                            } icon={faVideoSlash} className="media-control-icon"/>
                    </OverlayTrigger>
                    :
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip className="tooltip">Turn On Camera</Tooltip>
                        }
                    >
                        <FontAwesomeIcon onClick={() => {
                            setCameraOn(true)
                            setShowVideoView(true)
                            console.log(`Camera on: ${cameraOn}\nShowVideoView: ${showVideoView}`)
                        }} icon={faVideo} className="media-control-icon"/>
                    </OverlayTrigger>
                }

                {shareScreen ?
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip className="tooltip">Share Screen</Tooltip>
                        }
                    >
                        <FontAwesomeIcon onClick={() => {
                            setShareScreen(prevState => !prevState)
                        }} icon={faPlaneSlash} className="media-control-icon"/>
                    </OverlayTrigger>
                    :
                    <OverlayTrigger
                        placement="top"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                            <Tooltip className="tooltip">Share Screen</Tooltip>
                        }
                    >
                        <FontAwesomeIcon onClick={() => {
                            setShareScreen(prevState => !prevState)
                            setShowVideoView(true)
                        }} icon={faPlane} className="media-control-icon"/>
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