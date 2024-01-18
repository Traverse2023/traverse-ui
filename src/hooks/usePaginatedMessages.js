import { useEffect, useState } from 'react';
import { getPaginatedMessages } from "../api/storageService";

export default function usePaginatedMessages(groupId, channelName, pageNumber) {
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [messages, setMessages] = useState([])



    useEffect(() => {

    }, [])

    useEffect(() => {
        setLoading(true)
        setError(false)
        getPaginatedMessages(groupId, channelName, pageNumber)
            .then(value => {
                setMessages(prevMessages => {
                    return [...value, ...prevMessages]
                })

                setHasMore(value.messageCount - messages.length > 0)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setError(true)
            })
    }, [groupId, channelName, pageNumber])
    return { messages, error, loading, hasMore }
}
