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
        console.log(`Loading messages from group: ${groupId}, channel: ${channelName}`)
        setLoading(true)
        setError(false)
        getMessages(groupId, channelName, cursor)
            .then(value => {
                if (value) {
                    setCursor(value.cursor ? value.cursor : null);
                    setMessages(prevMessages => {
                        return [...value.messages, ...prevMessages]
                    })
                    messages.forEach(m => { console.log(m.text) })
                }
                else {
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
    }, [page])

    // Initial render use effect gets database messages using groupId and channelName
    useEffect(() => {
        console.log("Messages state refreshed due to load new group or channel")
        setLoading(true)
        setError(false)
        getMessages(groupId, channelName, cursor)
            .then(value => {
                console.log("Messages received")
                value.messages.forEach(m => { console.log(m.text) })
                if (value) {
                    setMessages(value.messages)
                }
                else {
                    setMessages([])
                }
                setHasMore(cursor)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setError(true)
            })
    }, [groupId, channelName])

    return { messages, error, loading, hasMore }
}
