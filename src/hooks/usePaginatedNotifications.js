import { useEffect, useState } from 'react';
import {getMessages, getNotifications} from "../api/storageService";

export default function usePaginatedNotifications(userId, page, newNotification) {
    const [hasMore, setHasMore] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [cursor, setCursor] = useState(null);

    // Called when scroll reaches last message to load additional page of messages
    useEffect(() => {
        console.log(`Loading notifications for user: ${userId}`)
        setLoading(true)
        setError(false)
        getNotifications(userId, cursor)
            .then(value => {
                if (value) {
                    setCursor(value.cursor ? value.cursor : null);
                    setNotifications(prevNotifications => {
                        return [...value.notifications, ...prevNotifications]
                    })
                }
                else {
                    console.log("no messages")
                    setNotifications([])
                }
                setHasMore(cursor);
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setNotifications([error.toString()])
                setError(true)
            })
    }, [page])

    useEffect(() => {
        setLoading(true)
        setError(false)
        if (newNotification) {
            console.log(`Received message: ${newNotification}`)
            setNotifications(prev => {
                return [...prev, newNotification]
            })
        }
        setLoading(false)
    }, [newNotification]);

    return { notifications, error, loading, hasMore }
}