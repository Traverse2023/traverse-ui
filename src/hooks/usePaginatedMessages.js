import { useEffect, useState } from 'react';
import { getPaginatedMessages } from "../api/storageService";

export default function usePaginatedMessages(groupId, channelName, pageNumber, newMessage) {
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [messages, setMessages] = useState([])

    const getMessages = (group, channel, page) => {

    }
    useEffect(() => {
        console.log("State refreshed due to new message")
        setLoading(true)
        setError(false)
        if (newMessage) {
            setMessages(prevMessages => {
                return [...prevMessages, newMessage]
            })
        }
        setLoading(false)
    }, [newMessage])

    useEffect(() => {
        console.log("Messages state refreshed due to load more message history")
        setLoading(true)
        setError(false)
        getPaginatedMessages(groupId, channelName, pageNumber)
            .then(value => {
                console.log(value)
                if (value) {
                    setMessages(prevMessages => {
                        return [...value, ...prevMessages]
                    })
                }
                else {
                    setMessages([])
                }


                //setHasMore(value.messageCount - messages.length > 0)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setError(true)
            })
    }, [pageNumber])

    useEffect(() => {
        console.log("Messages state refreshed due to load new group or channel")
        setLoading(true)
        setError(false)
        getPaginatedMessages(groupId, channelName, 1)
            .then(value => {
                console.log(`Get messages: ${value}`)
                if (value) {
                    setMessages(value)
                }
                else {
                    setMessages([])
                }
                //setHasMore(value.messageCount - messages.length > 0)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setError(true)
            })
    }, [groupId, channelName])

    return { messages, error, loading, hasMore }
}
