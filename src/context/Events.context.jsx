import { createContext , useEffect, useState} from "react";
import axios from "axios";

const EventsContext = createContext()

const EventsProviderWrapper = props =>{ //can deconstruct the props eg: {{children}} and then return just {children}

    const [events, setEvents] = useState([])
    const [allEvents, setAllEvents] = useState([])

    const getEvents = async () =>{
        try{
            const response = await axios.get('https://fora-server-second-try.vercel.app/events')
            // const response = await axios.get('https://0e416d24-c972-4cdd-8f5e-b60908b2b586.mock.pstmn.io/events')
            setEvents(response.data)
            setAllEvents(response.data)


        }catch (error) {
            console.log('error fetching the events', error)
        }
    }

    const filterEvents = (place) => {
        const filteredEvents = allEvents.filter(event=> event.where && event.where.toLowerCase().includes(place.toLowerCase()))

        setEvents(filteredEvents)
    }

    const filterSearch = (search) => {
        const filteredEvents = allEvents.filter(ev=> 
            ev.title && ev.title.toLowerCase().includes(search.toLowerCase()) ||
        ev.description && ev.description.toLowerCase().includes(search.toLowerCase()) ||
        ev.genre && ev.genre.toLowerCase().includes(search.toLowerCase()) ||
        ev.user && ev.user.toLowerCase().includes(search.toLowerCase()) ||
        ev.where && ev.where.toLowerCase().includes(search.toLowerCase()))

        setEvents(filteredEvents)
    }

    useEffect(() => {
getEvents()
    },[])

    return(
        <EventsContext.Provider value={{events, filterEvents,allEvents,getEvents, filterSearch }} >
            {props.children}
        </EventsContext.Provider>
    )
}

export {EventsContext, EventsProviderWrapper}