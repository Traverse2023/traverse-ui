import React, {createRef, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import { SocketContext } from "../../context/friends-socket-context";
import { GroupContext } from "../../context/group-context.tsx";
import { AuthContext } from "../../context/auth-context";
import usePaginatedMessages from "../../hooks/usePaginatedMessages";
import VideoPlayer from "../../components/VideoPlayer.tsx";
import {useInView} from 'react-intersection-observer';


function scrollToBottom(botRef){
    if (botRef.current) {
        botRef.current.scrollIntoView({ block: "end"});
    } else {
        console.log("not yet")
    }
}
const MessageArea = () => {

    const auth = useContext(AuthContext)
    const {selectedGroup,selectedTextChannel, members, cameraOn} = useContext(GroupContext);
    const [typedMsg, setTypedMsg] = useState("")
    const { chatsSocketApi } = useContext(SocketContext)

    const [newMessageData, setNewMessageData] = useState("");
    const [page, setPage] = useState(0);
    const { messages, error, loading, hasMore } = usePaginatedMessages(selectedGroup.groupId, selectedTextChannel, page, newMessageData);

    const typedMsgChangeHandler = (event) => {
        setTypedMsg(event.target.value);
    }
    const { ref, inView } = useInView();
    const bottomRef = useRef(null);

    useEffect(() => {
        if (inView && hasMore) {setPage(prev => prev+1);}
    }, [inView])



    const sendMsg = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            console.log('Enter key pressed', typedMsg)
            if (typedMsg.length > 0) {
                const message_info = {
                    msg: typedMsg,
                    channelName: selectedTextChannel,
                    email: auth.email,
                    members: members,
                    groupName: selectedGroup.groupName
                }
                chatsSocketApi.sendMessage(selectedGroup.groupId, message_info)
                setTypedMsg('')
            }
        }
    }



    useEffect(() => {


        chatsSocketApi.receiveAddedToGroupNotificationListener((senderEmail, recipientEmail) => {
            console.log('receiveAddedToGroupNotificationListener', senderEmail, recipientEmail)
            setNewMessageData(`${senderEmail} has added ${recipientEmail}`)
        })

        chatsSocketApi.receiveMessageListener((messageData) => {
            console.log('44', messageData)
            setNewMessageData(messageData);
        })


    }, []);

    useEffect(() => {
        console.log("Scroll down...")
        scrollToBottom(bottomRef);
    }, [selectedGroup])

    useLayoutEffect(() => {
        scrollToBottom(bottomRef);
    })


    return (
        cameraOn ?
                <VideoPlayer /> :

        <div className="messageArea">
            <header># {selectedTextChannel}</header>
            <div className="text-area">
                <div ref={ref}><li>top</li></div>
                {messages.map((msg) => {

                    return (
                        <div key={msg.id} className="msg-container">
                            <img className="pfp"/>
                            <div className="name-msg">
                                {
                                    typeof msg === 'object' && msg !== null ?
                                        <ul>
                                            <li>{msg.firstName} {msg.lastName} {msg.time}</li>
                                            <br/>
                                            <li>{msg.text}</li>
                                        </ul> :
                                        <ul>
                                            <li>{msg}</li>
                                            <br/>
                                        </ul>
                                }
                            </div>
                            <br/>
                        </div>)

                })}
                <div ref={bottomRef}><li>bottom</li></div>
            </div>
                <>
                    <div className="msg-input-div">
                        <button className="plus">+</button>
                        {/*<button onClick={() => setStreamJoined(prevState => !prevState)}>{streamJoined? "Leave Stream" : "Join Stream"}</button>*/}
                        <textarea value={typedMsg} rows={0} className="msg-input" onChange={typedMsgChangeHandler} onKeyDown={sendMsg} />
                    </div>
                </>



        </div>
    );
};

export default MessageArea;
