import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import React, {useContext, useEffect, useState} from "react";
import {GroupContext} from "../../context/group-context.tsx";


const TextChannel = ({channelName}) => {
    const {selectedTextChannel, setSelectedTextChannel} = useContext(GroupContext);
    const [channelStyle, setChannelStyle] = React.useState("channel inactive");

    useEffect(() => {
        if (channelName == selectedTextChannel) {
            setChannelStyle("channel active");
        } else {
            setChannelStyle("channel inactive");
        }
    }, [selectedTextChannel])

    return (
        <div className={channelStyle} onClick={() => {setSelectedTextChannel(channelName)}}>
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
        </div>
    )
}

export default TextChannel;