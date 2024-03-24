import { useEffect, useState } from 'react';
import { getMessages } from "../api/storageService";

export default function usePaginatedMessages(groupId, channelName, page, newMessage) {
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [messages, setMessages] = useState([])
    const [cursor, setCursor] = useState(null);

    // Use effect called when a new message enters chat
    useEffect(() => {
        setLoading(true)
        setError(false)
        if (newMessage) {
            console.log(`Received message: ${newMessage}`)
            setMessages(prevMessages => {
                return [...prevMessages, newMessage]
            })
        }
        setLoading(false)
    }, [newMessage])

    // Called when scroll reaches last message to load additional page of messages
    useEffect(() => {
        if (cursor) {
            console.log(`Loading messages from group: ${groupId}, channel: ${channelName} with page ${page}`)
            setLoading(true)
            setError(false)
            getMessages(groupId, channelName, cursor)
                .then(value => {
                    if (value) {


                        setCursor(value.cursor ? value.cursor : null);
                        setMessages(prevMessages => {
                            return [...value.messages.reverse(), ...prevMessages]
                        })
                        messages.forEach(m => {
                            console.log(m.text)
                        })
                    } else {
                        console.log("no messages")
                        setMessages([])
                    }
                    setHasMore(cursor);
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    setError(true)
                })
        }
    }, [page])

    // Gets appropriate messages on change of group/channel
    useEffect(() => {
        setCursor(null);
        console.log(`Loading messages from group: ${groupId}, channel: ${channelName} and cursor: ${null}`);
        getMessages(groupId, channelName, null)
            .then(value => {

                if (value) {
                    setMessages(value.messages.reverse());
                    if (value?.cursor) {
                        setCursor(value.cursor);
                        setHasMore(value.cursor)
                    } else{
                        setCursor(null);
                        setHasMore(null);
                    }
                }
                else {
                    setMessages([])
                }

                setLoading(false)

            })
            .catch(error => {
                console.log(error)
                setError(true)
            })

    }, [groupId, channelName])

    return { messages, error, loading, hasMore }
}
