import React, {useContext, useEffect, useState} from "react";
import {GroupContext} from "../context/group-context.jsx";
import {
    LocalVideoTrack,
    RemoteVideoTrack,
    useLocalCameraTrack, useLocalScreenTrack,
    usePublish,
    useRemoteUsers,
    useRemoteVideoTracks
} from 'agora-rtc-react'
import {VideoPlayerEnum} from "../hooks/call-hook.js";
import {faMicrophone, faMicrophoneSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const VideoPlayer = () => {

    const { cameraOn, videoPlayerType, setVideoPlayerType, selectedVoiceChannel , isMuted, setIsMuted, shareScreen} = useContext(GroupContext)

    const {localCameraTrack} = useLocalCameraTrack(cameraOn)
    const {screenTrack} = useLocalScreenTrack(shareScreen, {}, "disable")

    useEffect(() => {
        localCameraTrack?.setEnabled(cameraOn)
    }, [cameraOn]);

    useEffect(() => {
        screenTrack?.setEnabled(shareScreen)
    }, [shareScreen]);

    usePublish([localCameraTrack, screenTrack])

    const remoteUsers = useRemoteUsers()
    const {videoTracks} = useRemoteVideoTracks(remoteUsers)

    const [page, setPage] = useState(0);
    const max = 10

    const next = () => {
        setPage((prev) => {
            return prev + 1;
        });
    };

    const prev = () => {
        setPage((prev) => {
            return prev - 1;
        });
    };


    const currentChildren = () => {
        // @ts-ignore
        let x = []
        if (page === 0) {
            if (cameraOn) {
                x.push(<LocalVideoTrack track={localCameraTrack} play={true}
                                      style={{width: "300px", height: "200px", zIndex: "99999999999999"}}/>);
            } else {
                x.push(<div style={{width: "300px", height: "200px", zIndex: "99999999999999", backgroundColor: "white"}}></div>)
            }
            if (shareScreen) {
                x.push(<LocalVideoTrack track={screenTrack} play={true}
                                        style={{width: "300px", height: "200px", zIndex: "99999999999999"}}/>)
            }
        }
        for (let i = page * max; i < page * max + max; i++) {
            if (i >= page * max && i < page * max + max && i < remoteUsers.length) {
                //TODO potential problem is screen share and video call both use same field in remoteUsers(videoTracks).
                // It seems like the most recently selected option is selected i.e. you can't have video camera and screenshare. not ideal.
                // maybe look at to see if screensharagoraprovider client can be brought here and be used to differentiate with the og client.
                x.push(remoteUsers[i].hasVideo ? <RemoteVideoTrack track={remoteUsers[i].videoTrack} play={true}  style={{width: "300px", height: "200px", zIndex: "99999999999999", cursor: "pointer"}}/> : <div style={{width: "300px", height: "200px", zIndex: "99999999999999", backgroundColor: "white"}}></div>)
            }
        }
        // @ts-ignore
        return x;
    };

    let videoPlayerStyle: any = {
        // display: "grid"
    }

    if (videoPlayerType === VideoPlayerEnum.FIT) {
        videoPlayerStyle = {
            ...videoPlayerStyle,
             backgroundColor: 'black'
        }
    } else if (videoPlayerType === VideoPlayerEnum.FULL) {
        videoPlayerStyle = {
            ...videoPlayerStyle,
            margin: "0 auto",
            color: "white",
            zIndex: "99",
            position: 'absolute', width: '100%', height: '100%', backgroundColor: 'black', top: "50%", left: "50%", transform: "translate(-50%, -50%)"
        }
    }

    return (
        <div style={videoPlayerStyle} className="video-player-area">
            <div className="video-player-header">
                <p style={{color: 'white', paddingLeft: "5px"}}>{selectedVoiceChannel}</p>
            </div>
            <div className="prev-videos">
                {page > 0 && <button style={{color: "black"}} onClick={prev}>Prev</button>}
                <button style={{color: "black"}} onClick={prev}>Prev</button>
            </div>
            <div className="videos" style={{display: "flex", justifyContent: "center",
                alignItems: "center", gap: "10px",
                flexWrap: "wrap"}}>
            {currentChildren()}
            </div>
            {/*<div>*/}
            {/*    Page {page + 1}*/}
            {/*</div>*/}
            <div className="next-videos">
                {remoteUsers.length+1 > (page + 1) * max && <button onClick={next}>Next</button>}
                <button onClick={next}>Next</button>
            </div>
            <div className="full-media-controls">
                {/*@ts-ignore*/}
                <div onClick={() => setIsMuted(prevState => !prevState)} style={{backgroundColor: 'white', borderRadius: "50%", padding: "5px 10px 5px 10px"}}>
                    {/*@ts-ignore*/}
                    <FontAwesomeIcon icon={isMuted ?  faMicrophoneSlash : faMicrophone } className="media-control-icon"/>
                </div>
                {
                    (() => {
                        switch (videoPlayerType){
                            case VideoPlayerEnum.FIT:
                                return <button onClick={() => {setVideoPlayerType(VideoPlayerEnum.FULL)}}>Full Screen</button>
                            case VideoPlayerEnum.FULL:
                                return <button onClick={() => {setVideoPlayerType(VideoPlayerEnum.FIT)}}>Fit Screen</button>
                            default:
                                return null
                        }
                    })()
                }
                <button onClick={() => setVideoPlayerType(VideoPlayerEnum.PORTABLE)}>Pop Out</button>
            </div>
        </div>
    )
}

export default VideoPlayer
