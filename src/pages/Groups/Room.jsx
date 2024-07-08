import {
    LocalAudioTrack,
    useCurrentUID,
    useIsConnected,
    useLocalCameraTrack,
    useLocalMicrophoneTrack,
    usePublish,
    useRemoteUsers,
} from "agora-rtc-react";
import {useContext} from "react";

import {} from "../../context/auth-context.js";

export function Room({
                         micOn,
                         cameraOn,
                         renderAction,
                         renderLocalUser,
                         renderRemoteUsers,
                     }) {
    const isConnected = useIsConnected();
    const auth = useContext()
    const uid = useCurrentUID() || 0;
    const userName = auth.firstName + " " + auth.lastName
    const userAvatar = auth.pfpURL

    const remoteUsers = useRemoteUsers();
    const publishedUsers = remoteUsers.filter(user => user.hasAudio || user.hasVideo);

    const selfPublished = micOn || cameraOn;

    const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
    const { localCameraTrack } = useLocalCameraTrack(cameraOn);
    usePublish([localMicrophoneTrack, localCameraTrack]);
    return (
        <>
            {renderAction ? renderAction() : undefined}
            {isConnected &&
                (renderLocalUser ? (
                    renderLocalUser()
                ) : (
                        // <LocalMicrophoneAndCameraUser
                        //     audioTrack={localMicrophoneTrack}
                        //     cameraOn={cameraOn}
                        //     cover={userAvatar}
                        //     micOn={micOn}
                        //     videoTrack={localCameraTrack}
                        // >
                        //     {<label>{`${userName}{${uid}}`}</label>}
                        // </LocalMicrophoneAndCameraUser>
                    <LocalAudioTrack
                        track={localMicrophoneTrack}
                        muted={false}
                        play={false}
                    />
                ))}
            {renderRemoteUsers ? renderRemoteUsers() : undefined}

        </>
    );
}