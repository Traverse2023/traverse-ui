import React, {useContext, useEffect, useRef, useState} from "react";
import {SocketContext} from "../../context/friends-socket-context";
import {GroupContext} from "../../context/group-context";
import {AuthContext} from "../../context/auth-context";
import axios from "axios";
import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraUIKit from 'agora-react-uikit';

const MessageArea = () => {

    const auth = useContext(AuthContext)
    const groupControl = useContext(GroupContext);
    const { chatsSocketApi } = useContext(SocketContext)

    const [messages, setMessages] = useState([])

    const [typedMsg, setTypedMsg] = useState("")

    const typedMsgChangeHandler = (event) => {
        setTypedMsg(event.target.value)
    }

    const sendMsg = (event) => {
        if (event.key === 'Enter'){
            event.preventDefault()
            console.log('Enter key pressed', typedMsg)
            if (typedMsg.length > 0) {
                const message_info = {
                    msg: typedMsg,
                    firstName: auth.firstName,
                    lastName: auth.lastName,
                    pfpURL: auth.pfpURL,
                    members: groupControl.members,
                    groupName: groupControl.selectedGroup.groupName
                }
                chatsSocketApi.sendMessage(groupControl.selectedGroup.groupId, message_info)
                setTypedMsg('')
            }
        }
    }

    useEffect(async () => {
        const response = await axios.get(`${process.env.REACT_APP_STORAGE_SERVICE_URL}/api/v1/messages/${groupControl.selectedGroup.groupId}/general`)
        console.log('39', response)
        if (response.data) setMessages(response.data)
        else setMessages([])
    }, [groupControl.selectedGroup.groupId])

    useEffect(() => {
        // chatsSocketApi.joinMessageListener((joinMsg) => {
        //     console.log('line9MsgArea', joinMsg)
        //     setMessages(prevState => {
        //         return [...prevState,  joinMsg]
        //     })
        // })

        chatsSocketApi.receiveAddedToGroupNotificationListener((senderEmail, recipientEmail) => {
            console.log('receiveAddedToGroupNotificationListener', senderEmail, recipientEmail)
            setMessages(prevState => {
                return [...prevState,  `${senderEmail} has added ${recipientEmail}`]
            })
        })

        chatsSocketApi.receiveMessageListener((messageInfo) => {
            console.log('44', messageInfo)
            // const currMsgs = [...messages]
            // currMsgs.push(messageInfo)
            setMessages(prevState => {
                return [...prevState, messageInfo]
            })
        })
    }, []);

    useEffect(() => {
        console.log('52', messages)
    }, [messages])

    const APP_ID = "056e7ee25ec24b4586f17ec177e121d1"
    const TOKEN = "007eJxTYBAzuFt2stBvl9GWrIYIgwXnFzSwN+6S3HQyjo2pom5TFpcCg4GpWap5aqqRaWqykUmSiamFWZqheWqyobl5qqGRYYqhjVlTakMgI8MmjuksjAwQCOKzMOQmZuYxMAAAu3Uc7A=="
    const CHANNEL = "main"

    const AgoraUI = () => {
        const [videoCall, setVideoCall] = useState(true);
        const rtcProps = {
            appId: APP_ID,
            channel: CHANNEL,
            token: TOKEN
        };

        const callbacks = {
            EndCall: () => setVideoCall(false),
        };

        const rtmProps = {};
        const styleProps = {};
        return videoCall ? (
            <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
                <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} rtmProps={rtmProps} styleProps={styleProps} />
            </div>
        ) : (
            <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
        );
    };

    const [streamJoined, setStreamJoined] = useState(false)
    return (
        <div className="messageArea">
            <header># general</header>
            <div className="text-area">
                {/*{streamJoined ?*/}
                {/*    <div id="stream-wrapper">*/}
                {/*        <div id="video-streams">*/}
                {/*            <AgoraUI />*/}
                {messages.map((msg) => {
                    return (
                        <div className="msg-container">
                            <img className="pfp" src={msg.pfpURL}/>
                            <div className="name-msg">
                                {
                                    typeof msg === 'object' && msg !== null ?
                                        <ul>
                                            <li>{msg.firstName} {msg.lastName} {msg.time}</li> <br />
                                            <li>{msg.text}</li>
                                        </ul> :
                                        <ul>
                                            <li>{msg}</li> <br />
                                        </ul>
                                }
                            </div>
                            <br />
                        </div>)
                        // <div id="stream-controls">
                        //     <button id="leave-btn">Leave Stream</button>
                        //     <button id="mic-btn">Mic On</button>
                        //     <button id="camera-btn">Camera On</button>
                        // </div>
                    // </div>
                })}
            </div>
            <div className="msg-input-div">
                <button className="plus">+</button>
                <button onClick={() => setStreamJoined(prevState => !prevState)}>{streamJoined? "Leave Stream" : "Join Stream"}</button>
                <textarea value={typedMsg} rows={0} className="msg-input" onChange={typedMsgChangeHandler} onKeyDown={sendMsg}/>
            </div>
        </div>
    );
};

export default MessageArea;
