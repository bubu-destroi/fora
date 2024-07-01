import { Link } from "react-router-dom"
import { useContext , useEffect, useState} from "react"
//import axios  from "axios"
//import {  useNavigate, useParams } from 'react-router-dom'
//import EventCard from './EventCard'
import {Divider, Box,Stack, Card, CardBody, CardFooter, Button, Heading, Text, SimpleGrid, Image } from '@chakra-ui/react'
import { EventsContext } from "../context/Events.context"

const AllProjects  = ({search, place}) =>{
    const {events}= useContext(EventsContext)
    const [filteredEvents, setFilteredEvents] = useState([])
/*     const [filteredEvents, setFilteredEvents] = useState([])
 */

    // const [events, setEvents] = useState([])
  

         /*    const getAllEvents = async () =>{
                try{
                    const response = await axios.get('https://fora-server-second-try.vercel.app/events')
                    // const response = await axios.get('https://0e416d24-c972-4cdd-8f5e-b60908b2b586.mock.pstmn.io/events')
                    console.log(response.data)
                            setEvents(response.data)
            
                }catch (error) {
                    console.log('error fetching the events', error)
                }
            } */

            

  /*   const filterToday = events => {

        const todayDate = new Date()
        const year = todayDate.getFullYear()
        const month = todayDate.getMonth();
        const day = todayDate.getDate()
        console.log(year, month, day)

        const filteredEvents = events.filter(event => {
            const eventDate = new Date(event.date)
            const eventYear = eventDate.getFullYear()
            const eventMonth = eventDate.getMonth();
            const eventDay = eventDate.getDate()
            console.log(eventYear, eventMonth, eventDay)

            
            if(year === eventYear && month === eventMonth && day === eventDay) {
                return true
            }
    
        })

        setFilteredEvents(filteredEvents)
    } */

    // useEffect(()=>{

    //     const getAllEvents = async () =>{
    //         try{
    //             const response = await axios.get('https://fora-server-second-try.vercel.app/events')
    //             // const response = await axios.get('https://0e416d24-c972-4cdd-8f5e-b60908b2b586.mock.pstmn.io/events')
    //             console.log(response.data)
    //                     setEvents(response.data)
        
    //         }catch (error) {
    //             console.log('error fetching the events', error)
    //         }
    //     }
    //     console.log('mounting')
    //     getAllEvents()
    // }, [])
   

/*     useEffect(() =>{
        filterFutureEvents(allEvents)
    }, [allEvents])


    const filterFutureEvents = (events) => {
        const today = new Date()
        today.setHours(0,0,0,0)

        const futureEvents = events.filter(event => {
            const eventDate = new Date(event.date)
            console.log(`Event Date: ${eventDate}, Today: ${today}`)
            return event.date >= today
        })

        setFilteredEvents(futureEvents)

    } */

        useEffect(() => {
            let filtered = events
            if(search){
                filtered = filtered.filter( event => {
                  event.title.toLowerCase().includes(search)
                  event.description.toLowerCase().includes(search)
                  event.genre.toLowerCase().includes(search)
                  event.user.toLowerCase().includes(search)
                  event.where.toLowerCase().includes(search)
                  event.social.toLowerCase().includes(search)
                })
                setFilteredEvents(filtered)
            }
            if (place) {
                filtered = filtered.filter(event=>{
                    event.where.toLowerCase().includes(place) })
            }
            setFilteredEvents(filtered)
        }, [events, search, place])

    return(
        <div>
        <Heading   pb={"20px"}  color='tomato' size='xl'>ALL EVENTS</Heading>
 
        <Link to={`/events/new`} >
                                    
             <Button pt={"20px"} pb={"20px"} flex='1' variant='ghost' >
                <Text color='tomato' fontSize='lg'>CREATE A NEW EVENT</Text>
             </Button>

        </Link>


            <SimpleGrid  spacing={4} templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}>
           
           
            {filteredEvents.map(event => {return( 
                    <>

                    <SimpleGrid key={event.id} spacing={4} templateColumns='repeat(auto-fit, minmax(200px, 1fr))'>
                    

                    <Card maxW='lg' 
                    
                    >
                        <CardBody>
                        <Box display="flex" justifyContent="center" alignItems="center" >
                            <Box 
                                width="300px" 
                                height="300px" 
                                overflow="hidden" 
                                borderRadius="none"
                                display="flex" 
                                justifyContent="center" 
                                alignItems="center"
                                >
                                
                            
                                <Image
                                    src={event.picture}
                                    borderRadius="none"
                                    margin="0"
                                    />
                            </Box>
                        </Box>
                            
                            <Stack mt='6' spacing='3'>
                            <Heading color='tomato' fontSize='lg'>{event.title}</Heading>
                            <Text fontSize='sm'>
                                {event.description}
                            </Text>
                            
                            <Text color='tomato' fontSize='sm'>
                                {event.genre}
                            </Text>

                            <Text fontSize='sm'>
                                {event.social}
                            </Text>
                            <Text color='tomato' fontSize='md'>
                                {event.date}
                            </Text>
                            <Text color='tomato' fontSize='sm'>
                                {event.where}
                            </Text>
                           
                            
                            </Stack>
                        </CardBody>
                        <Divider />

                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{'& > button': {
                                minW: '136px',},}} >
{/* 
                                <Button fontSize='lg' flex='1' variant='ghost' >
                                save event
                                </Button>
 */}
                            <Link to={`/allevents/${event.id}`} >
                                <Button fontSize='lg' flex='1' variant='ghost'>
                                see details
                                </Button>
                            </Link>

                        </CardFooter>
                    </Card>

                       
            </SimpleGrid>
                </> 
                )
            })}
  
  
</SimpleGrid>

           
            {/* {filteredEvents.map(event => {
                return(
                    <div key={event.id} >
                    <Link to={`/events/${event.id}`} >
                        <h2>{event.title}</h2>

                    </Link>

                        <p>{event.description}</p>
                    </div>
                )
            })} */}
        </div>
    )
} 

export default AllProjects