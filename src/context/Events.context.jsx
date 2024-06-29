import { createContext , useEffect, useState} from "react";
import axios from "axios";

const EventsContext = createContext()

const EventsProviderWrapper = props =>{ //can deconstruct the props eg: {{children}} and then return just {children}

    const [events, setEvents] = useState([])
    const [allEvents, setAllEvents] = useState([])

    const getEvents = async () =>{
        try{
            const response = await axios.get('https://fora-server.onrender.com/events')
            // const response = await axios.get('https://0e416d24-c972-4cdd-8f5e-b60908b2b586.mock.pstmn.io/events')
            console.log(response.data)
            setEvents(response.data)
            setAllEvents(response.data)


        }catch (error) {
            console.log('error fetching the events', error)
        }
    }

    const filterEvents = (search) => {
        const filteredEvents = allEvents.filter(event=> event.where.toLowerCase().includes(search.toLowerCase()))

        setEvents(filteredEvents)
    }

    useEffect(() => {
getEvents()
    },[])

    return(
        <EventsContext.Provider value={{events, filterEvents,allEvents }} >
            {props.children}
        </EventsContext.Provider>
    )
}

export {EventsContext, EventsProviderWrapper}