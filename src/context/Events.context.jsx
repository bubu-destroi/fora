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

    const filterEvents = (filters) => {
        let filteredEvents = [...allEvents]

        if(filters.search){

            const searchTerm = filters.search.toLowerCase();
             filteredEvents = filteredEvents.filter(event => 
              (event.where && event.where.toLowerCase().includes(searchTerm)) ||
              (event.title && event.title.toLowerCase().includes(searchTerm)) ||
              (event.description && event.description.toLowerCase().includes(searchTerm))||
              (event.genre && event.genre.toLowerCase().includes(searchTerm)) ||
              (event.user && event.user.toLowerCase().includes(searchTerm))
            );
        }
        if(filters.place){
            const placeTerm = filters.place.toLowerCase()
            filteredEvents = filteredEvents.filter((event) =>
                event.where.toLowerCase().includes(placeTerm)
              )

        }
        setEvents(filteredEvents)

    }



    useEffect(() => {
getEvents()
    },[])

    return(
        <EventsContext.Provider value={{events, filterEvents,allEvents,getEvents }} >
            {props.children}
        </EventsContext.Provider>
    )
}

export {EventsContext, EventsProviderWrapper}