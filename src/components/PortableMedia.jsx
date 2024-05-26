import Draggable from "react-draggable";
import {useContext, useEffect, useState} from "react";
import {LocalVideoTrack, RemoteVideoTrack, useLocalCameraTrack, useRemoteUsers} from "agora-rtc-react";
import {GroupContext} from "../context/group-context.tsx";

const PortableMedia = () => {
    const [showControls, setShowControls] = useState(true);
    const [lastClickTime, setLastClickTime] = useState(null);
    const [hasBeenDragged, setHasBeenDragged] = useState(false)

    const {speakerUid, currentUserUid} = useContext(GroupContext)

    const remoteUsers = useRemoteUsers()

    useEffect(() => {
        if (speakerUid) {
            if (speakerUid === currentUserUid) {
                setActiveSpeakerVideoTrack({local: true, localCameraTrack})
            } else {
                remoteUsers.forEach(user => {
                    if (user.uid === speakerUid) {
                        setActiveSpeakerVideoTrack({local: false, track: user.videoTrack})
                    }
                })
            }
        }
    }, [speakerUid]);

    const [activeSpeakerVideoTrack, setActiveSpeakerVideoTrack] = useState({})


    const handleMouseUp = async () => {
        await new Promise((res, rej) => {
            if (!hasBeenDragged) {
                setShowControls(!showControls);
            }
            res('')
        })
        setHasBeenDragged(false)
    };

    const handleDrag = (e, ui) => {
        // Set isDragging to true during drag
        console.log("hasebeendragged")
        setHasBeenDragged(true)
    };

    const {localCameraTrack} = useLocalCameraTrack()
    // const handleStop = () => {
    //     // Set isDragging to false when drag stops
    //     setIsDragging(false);
    // };

    // useEffect(() => {
    //     console.log('isDragging', isDragging)
    // }, [isDragging]);
    return (
        <div className="media-container">
            <Draggable
                handle=".handle"
                // onStart={() => setIsDragging(true)}
                onDrag={handleDrag}
                // onStop={handleStop}

            >
                <div>
                    <div className={`mini-media-controls ${showControls ? 'visible-controls' : ''}`}>
                        {
                            activeSpeakerVideoTrack.local ?
                                <LocalVideoTrack track={localCameraTrack} play={true} style={{width: "200px", height: "100px", zIndex: "99999999999999"}}/>
                                :
                                <RemoteVideoTrack track={activeSpeakerVideoTrack.track} play={true} style={{width: "200px", height: "100px", zIndex: "99999999999999"}}/>
                        }

                    </div>
                    <div className="handle floating-button"
                         // onMouseDown={handleMouseDown}
                         onMouseUp={handleMouseUp}
                         // onClick={toggleControls}
                    >Button</div>
                </div>
            </Draggable>
        </div>
    )
}

export default PortableMedia