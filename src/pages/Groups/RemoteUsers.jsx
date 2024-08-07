
import {useContext, useEffect} from "react";
import {RemoteAudioTrack} from "agora-rtc-react";
export function RenderRemoteUsers({ videoTracks, audioTracks }) {
    useEffect(() => {
        console.log('audioTracks', audioTracks)
    }, [audioTracks]);
    const auth = useContext()
    return (
        <>
            {/*{videoTracks.map((track) => (*/}
            {/*    <div key={track.getUserId()}>*/}
            {/*        <RemoteVideoPlayer cover={auth.pfpURL} key={track.getUserId()} track={track} />*/}
            {/*        <label>{`${auth.email(track.getUserId())}{${track.getUserId()}}`}</label>*/}
            {/*    </div>*/}
            {/*))}*/}
            {audioTracks.map(track => (
                <RemoteAudioTrack key={track.getUserId()} play={true} track={track} />
            ))}
        </>
    );
}