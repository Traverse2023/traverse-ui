import Draggable from "react-draggable";
import {useEffect, useState} from "react";
import {LocalVideoTrack, useLocalCameraTrack} from "agora-rtc-react";

const PortableMedia = () => {
    const [showControls, setShowControls] = useState(false);
    const [lastClickTime, setLastClickTime] = useState(null);
    const [hasBeenDragged, setHasBeenDragged] = useState(false)
    // const toggleControls = () => {
    //     console.log('invoking toggle', isDragging)
    // };
    // const handleMouseDown = () => {
    //     const currentTime = new Date().getTime();
    //     setLastClickTime(currentTime)
    // };

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
                        <LocalVideoTrack track={localCameraTrack} play={true} style={{width: "200px", height: "100px", zIndex: "99999999999999"}}/>

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