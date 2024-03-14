import { useEffect, useState } from "react";
import {
    LocalVideoTrack,
    RemoteVideoTrack,
    useLocalCameraTrack,
    useRemoteUsers,
    useRemoteVideoTracks
} from "agora-rtc-react";

export default function VideoTrackPagination({localTrack, remoteTracks, max}) {

    const [page, setPage] = useState(0);

    const remoteUsers = useRemoteUsers()
    const {localCameraTrack} = useLocalCameraTrack()
    const {videoTracks} = useRemoteVideoTracks(remoteUsers)

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
        let x = []
        if (page === 0) {
            x = [<LocalVideoTrack track={localCameraTrack} play={true} style={{position: "absolute"}}/>];
        }
        console.log('invoking videoTracks in curr children', videoTracks)
        for (let i = page * max; i < page * max + max; i++) {
            if (i >= page * max && i < page * max + max) {
                console.log('invoking videoTrack', videoTracks[i])
                x.push(<RemoteVideoTrack track={videoTracks[i]} play={true} style={{position: "absolute"}}/>);
            }
        }
        console.log('invoking x', x)
        return x;
    };

    return (
        <div>
            <div
                style={{
                    width: "50%",
                    margin: "0 auto",
                    display: "flex",
                    flexWrap: "wrap"

                }}
            >
                {currentChildren()}
            </div>

            Page {page + 1}
            {page > 0 && <button onClick={prev}>Prev</button>}
            {remoteTracks.length+1 > (page + 1) * max && <button onClick={next}>Next</button>}
        </div>
    );
}