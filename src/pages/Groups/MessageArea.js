import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SocketContext } from "../../context/friends-socket-context";
import { GroupContext } from "../../context/group-context";
import { AuthContext } from "../../context/auth-context";
import usePaginatedMessages from "../../hooks/usePaginatedMessages";
import AgoraRTC from "agora-rtc-sdk-ng";
import AgoraUIKit from 'agora-react-uikit';

const MessageArea = () => {

    const auth = useContext(AuthContext)
    const groupControl = useContext(GroupContext);
    const [typedMsg, setTypedMsg] = useState("")
    const { chatsSocketApi } = useContext(SocketContext)

    const [newMessageData, setNewMessageData] = useState()
    const [pageNumber, setPageNumber] = useState(1)
    const { messages, error, loading, hasMore } = usePaginatedMessages(groupControl.selectedGroup.groupId, groupControl.selectedChannel, pageNumber, newMessageData)

    const scrollDiv = useRef(null)
    const typedMsgChangeHandler = (event) => {
        setTypedMsg(event.target.value)
    }

    const observer = useRef()
    const topMessageRef = useCallback(item => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                console.log(hasMore)
                console.log('Last message is now visible on screen. Prompting get next page of messages if available')
                setPageNumber(prevPageNumber => prevPageNumber + 1);
            }
        })
        if (item) observer.current.observe(item)
    }, [hasMore])

    const sendMsg = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            console.log('Enter key pressed', typedMsg)
            if (typedMsg.length > 0) {
                const message_info = {
                    msg: typedMsg,
                    channelName: groupControl.selectedChannel,
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

    let initialRender = useRef(true)


    useEffect(() => {
        //scrollDiv.current.scrollIntoView({ block: "end" });
        chatsSocketApi.receiveAddedToGroupNotificationListener((senderEmail, recipientEmail) => {
            console.log('receiveAddedToGroupNotificationListener', senderEmail, recipientEmail)
            setNewMessageData(`${senderEmail} has added ${recipientEmail}`)
        })

        chatsSocketApi.receiveMessageListener((messageData) => {
            console.log('44', messageData)
            setNewMessageData(messageData);
        })


    }, []);

    useLayoutEffect(() => {
        if (scrollDiv?.current) {
            scrollDiv.current.scrollTop = scrollDiv.current.scrollHeight;
        }
    }, [scrollDiv])



    const APP_ID = "056e7ee25ec24b4586f17ec177e121d1"
    const TOKEN = "007eJxTYBAzuFt2stBvl9GWrIYIgwXnFzSwN+6S3HQyjo2pom5TFpcCg4GpWap5aqqRaWqykUmSiamFWZqheWqyobl5qqGRYYqhjVlTakMgI8MmjuksjAwQCOKzMOQmZuYxMAAAu3Uc7A=="
    const CHANNEL = "main"

    // const AgoraUI = () => {
    //     const [videoCall, setVideoCall] = useState(true);
    //     const rtcProps = {
    //         appId: APP_ID,
    //         channel: CHANNEL,
    //         token: TOKEN
    //     };
    //
    //     const callbacks = {
    //         EndCall: () => setVideoCall(false),
    //     };
    //
    //     const rtmProps = {};
    //     const styleProps = {};
    //     return videoCall ? (
    //         <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
    //             <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} rtmProps={rtmProps} styleProps={styleProps} />
    //         </div>
    //     ) : (
    //         <h3 onClick={() => setVideoCall(true)}>Start Call</h3>
    //     );
    // };

    const [streamJoined, setStreamJoined] = useState(false)
    return (
        <div className="messageArea">
            <header># general</header>
            <div className="text-area">
                <div>{loading && 'Loading...'}</div>
                <div>{error && error}</div>
                {/*{streamJoined ?*/}
                {/*    <div id="stream-wrapper">*/}
                {/*        <div id="video-streams">*/}
                {/*            <AgoraUI />*/}
                {messages.map((msg, index) => {
                    if (0 === index) {
                        return (
                            <div ref={topMessageRef} key={msg._id} className="msg-container">
                                <img className="pfp" />
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
                            </div>
                        )
                    }
                    else if (index === messages.length - 1) {
                        return (
                            <div key={msg._id} className="msg-container">
                                <img className="pfp" />
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
                            </div>
                        )
                    }
                    else {
                        return (
                            <div key={msg._id} className="msg-container">
                                <img className="pfp" />
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
                    }
                })}
            </div>
            <div ref={scrollDiv}></div>

            <div className="msg-input-div">
                <button className="plus">+</button>
                {/*<button onClick={() => setStreamJoined(prevState => !prevState)}>{streamJoined? "Leave Stream" : "Join Stream"}</button>*/}
                <textarea value={typedMsg} rows={0} className="msg-input" onChange={typedMsgChangeHandler} onKeyDown={sendMsg} />
            </div>
        </div>
    );
};

export default MessageArea;
