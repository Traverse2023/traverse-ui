import React, {useContext, useEffect, useState} from "react";
import {SocketContext} from "../../context/friends-socket-context";
import {GroupContext} from "../../context/group-context";
import {AuthContext} from "../../context/auth-context";
import axios from "axios";

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
                    pfpURL: auth.pfpURL
                }
                chatsSocketApi.sendMessage(groupControl.selectedGroup, message_info)
                setTypedMsg('')
            }
        }
    }

    useEffect(async () => {
        const response = await axios.get(`${process.env.REACT_APP_STORAGE_SERVICE_URL}/api/v1/messages/${groupControl.selectedGroup}/general`)
        console.log('39', response)
        if (response.data) setMessages(response.data)
        else setMessages([])
    }, [groupControl.selectedGroup])

    // useEffect(() => {
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
    // }, []);

    useEffect(() => {
        console.log('52', messages)
    }, [messages])


    //
    // chatsSocketApi.socket.on('joinMessage', (joinMsg) => {
    //     console.log('line9MsgArea', joinMsg)
    // });

    return (
        <div className="messageArea">
            <header># general</header>
            <div className="text-area">
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
                        </div>
                    );
                })}
            </div>
            <div className="msg-input-div">
                <button className="plus">+</button>
                <textarea value={typedMsg} rows={0} className="msg-input" onChange={typedMsgChangeHandler} onKeyDown={sendMsg}/>
            </div>
        </div>
    );
};

export default MessageArea;
