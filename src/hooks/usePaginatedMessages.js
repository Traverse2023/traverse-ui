import { useEffect, useState } from 'react';
import { getPaginatedMessages } from "../api/storageService";

export default function usePaginatedMessages(groupId, channelName, pageNumber, newMessage) {
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [messages, setMessages] = useState([])

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

    // Called when scrool reaches last message to load additional page of messages
    useEffect(() => {
        console.log(`Loading page ${pageNumber} from group: ${groupId}, channel: ${channelName}`)
        setLoading(true)
        setError(false)
        getPaginatedMessages(groupId, channelName, pageNumber)
            .then(value => {
                if (value) {
                    setMessages(prevMessages => {
                        return [...value.messages, ...prevMessages]
                    })
                    messages.forEach(m => { console.log(m.text) })
                }
                else {
                    console.log("no messages")
                    setMessages([])
                }
                console.log(`Messages remaining in DB: ${value.messageCount - messages.length}`)
                setHasMore(value.messageCount - messages.length > 0)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setError(true)
            })
    }, [pageNumber])

    // Initial render use effect gets database messages using groupId and channelName
    useEffect(() => {
        console.log("Messages state refreshed due to load new group or channel")
        setLoading(true)
        setError(false)
        getPaginatedMessages(groupId, channelName, 1)
            .then(value => {
                console.log("Messages received")
                value.messages.forEach(m => { console.log(m.text) })
                if (value) {
                    setMessages(value.messages)
                }
                else {
                    setMessages([])
                }
                setHasMore(value.messageCount - messages.length > 0)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setError(true)
            })
    }, [groupId, channelName])

    return { messages, error, loading, hasMore }
}
