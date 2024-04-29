import React, {useContext, useEffect, useState} from "react";
import {GroupContext} from "../context/group-context.jsx";
import {
    LocalVideoTrack,
    RemoteVideoTrack,
    useLocalCameraTrack,
    usePublish,
    useRemoteUsers,
    useRemoteVideoTracks
} from 'agora-rtc-react'
import {VideoPlayerEnum} from "../hooks/call-hook.js";
import {faMicrophone, faMicrophoneSlash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const VideoPlayer = () => {

    const { videoPlayerType, setVideoPlayerType, selectedVoiceChannel , isMuted, setIsMuted} = useContext(GroupContext)

    useEffect(() => {
        console.log('videoplayer rendered')
    }, []);

    const {localCameraTrack} = useLocalCameraTrack()
    usePublish([localCameraTrack])

    const remoteUsers = useRemoteUsers()
    const {videoTracks} = useRemoteVideoTracks(remoteUsers)

    // useEffect(() => {
    //     console.log('invoking videoTracks', videoTracks)
    //     console.log('invoking remoteUsers', remoteUsers)
    // }, [videoTracks])

    const [page, setPage] = useState(0);
    const max = 10

    // const remoteUsers = useRemoteUsers()
    // const {localCameraTrack} = useLocalCameraTrack()
    // const {videoTracks} = useRemoteVideoTracks(remoteUsers)

    useEffect(() => {
        console.log('invoking localTrack', localCameraTrack)
        console.log('invoking remoteUsers', remoteUsers)
        console.log('invoking remoteTracks', videoTracks)
    }, [localCameraTrack, remoteUsers, videoTracks])

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
            x = [<LocalVideoTrack track={localCameraTrack} play={true} style={{width: "300px", height: "200px", zIndex: "99999999999999"}}/>];
        }
        console.log('invoking videoTracks in curr children', remoteUsers)
        for (let i = page * max; i < page * max + max; i++) {
            if (i >= page * max && i < page * max + max && i < remoteUsers.length) {
                console.log('invoking videoTrack', remoteUsers[i])
                console.log('invoking i', i)
                x.push(<RemoteVideoTrack track={remoteUsers[i].videoTrack} play={true}  style={{width: "300px", height: "200px", zIndex: "99999999999999"}}/>);
            }
        }
        // @ts-ignore
        console.log('invoking x', x)
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


    useEffect(() => {
        console.log('invoking isMuted', isMuted)
    }, [isMuted]);

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
