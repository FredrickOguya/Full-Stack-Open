import { useRef } from "react";
import { createContext, useState } from "react";

const NotificationContext = createContext()
export const NotificationProvider = ({children}) => {
    const [notification, setNotification] = useState(null)
    const timoutRef = useRef(null)

    const showNotification = (message) => {
        setNotification(message)

        if(timoutRef.current) {
            clearTimeout(timoutRef.current)
        }
        timoutRef.current = setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    return <NotificationContext.Provider value={{notification, showNotification}}>
        {children}
    </NotificationContext.Provider>
}

export { NotificationContext}