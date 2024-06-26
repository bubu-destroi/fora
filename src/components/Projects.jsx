import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import {  useParams } from 'react-router-dom'
import {  SimpleGrid} from '@chakra-ui/react'
import {Box, Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button, Center } from '@chakra-ui/react'
import { EventsContext } from "../context/Events.context"

const Projects  = () =>{
    const {events}= useContext(EventsContext)
    // const [events, setEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])
    const {filter, date} = useParams()
   // const navigate = useNavigate()
    


    const filterToday = events => {

        const todayDate = new Date()
        const year = todayDate.getFullYear()
        const month = todayDate.getMonth();
        const day = todayDate.getDate()
        console.log(year, month, day)

        const filteredEvents = events.filter(event => {
            if(!event.date) {
                return false
            }
            
            const eventDate = new Date(event.date)
            const eventYear = eventDate.getFullYear()
            const eventMonth = eventDate.getMonth();
            const eventDay = eventDate.getDate()
            console.log(eventYear, eventMonth, eventDay)

            
            if(year === eventYear && month === eventMonth && day === eventDay) {
                return true
            }else{
                setFilteredEvents
            }
    
        })

        setFilteredEvents(filteredEvents)

    }

    const filterDate = (events, selectedDate )=> {

        const date = new Date(selectedDate)
        const year = date.getFullYear()
        const month = date.getMonth();
        const day = date.getDate()
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
    }

    /* const filterPlace = (events, searchQuery) => {
        
        }
 */
        const filterFromToday = events => {
            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);
    
            const filteredEvents = events.filter(event => {
                if (!event.date) {
                    return false;
                }
    
                const eventDate = new Date(event.date);
                return eventDate >= todayDate;
            });
            const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
            setFilteredEvents(sortedEvents);
        };
        const filterPast = events => {
            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);
    
            const filteredEvents = events.filter(event => {
                if (!event.date) {
                    return false;
                }
    
                const eventDate = new Date(event.date);
                return eventDate <= todayDate;
            });
            const sortedEvents = filteredEvents.sort((a, b) => new Date(b.date) - new Date(a.date))
    
            setFilteredEvents(sortedEvents);
        };

    useEffect(()=>{
        console.log('mounting')
        const filterEvents = async (events) =>{
            try{
                // const response = await axios.get('https://fora-server-second-try.vercel.app/events')
                // // const response = await axios.get('https://0e416d24-c972-4cdd-8f5e-b60908b2b586.mock.pstmn.io/events')
                // console.log(response.data)
                // setEvents(response.data)
    
                if(filter==='today') {
                    filterToday(events)
                }else if(filter === 'when'){
                    filterDate(events, date)
    
                }else if(filter==="all") {
                    
                    filterFromToday(events)
                }else if(filter === "past") {
                    filterPast(events)
                } 

            }catch (error) {
                console.log('error fetching the events', error)
            }
        }
        filterEvents(events)
    }, [filter, date,events])

    if(!filteredEvents.length) {
        return (
            <div>
                <p>Not found</p>
                
            
            </div>
        )
    }
   
    return(
        <div className="filteredEvents">

            <Heading pt={'0px'} pb={'10px'} color='tomato' size='xl'>{filter} events</Heading>
            <Heading pt={'10px'} pb={'10px'} color='gray.600' size='xl'>{date}</Heading>
            <Link to={`/events/new`} >
                                                
                <Button flex='1' variant='ghost' >
                     <Text color='tomato' fontSize='lg'>CREATE A NEW EVENT</Text>
                 </Button>
                       
             </Link>
 
           

            {/* <Link to= '/events/new'>

            <button>Add a new event</button>


            </Link> */}

            <SimpleGrid  spacing={8} templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)'}}> 
            {filteredEvents.map(event => {
                return( 
                    <>
                    <SimpleGrid key={event.id} spacing={4} templateColumns='repeat(auto-fit, minmax(200px, 1fr))'>

                    <Card maxW='lg' borderRadius='none' >
                        <CardBody p='1'>
                        <Box display="flex" justifyContent="center" alignItems="center" p='0' >
                            <Box 
                                width="300px" 
                                height="300px" 
                                overflow="hidden" 
                                borderRadius="none"
                                display="flex" 
                                justifyContent="center" 
                                alignItems="center"
                                pb='6'
                                >
                                <Link to={`/allevents/${event.id}`} >
                                <Image
                                    src={event.picture}
                                    borderRadius="none"
                                    margin="0"
                                    p={'0'}
                                    />
                                    </Link>
                            </Box>
                        </Box>
                            <Stack mt='6' spacing='3' p=''>
                            <Heading color='tomato' size='md'>{event.title}</Heading>
                            <Text fontSize='sm'>
                                {event.description}
                            </Text>
                            <Text color='tomato' fontSize='xs'>
                                {event.genre}
                            </Text>
                            <Link to={event.social} color="blue.500" target='_blank'>
                            <Text color='' fontSize='sm' >
                                {event.social}
                            </Text>
                            </Link>
                            <Text color='tomato' fontSize='sm'>
                                {event.date}
                            </Text>
                            <Text color='tomato' fontSize='sm'>
                                {event.where}
                            </Text>
                            </Stack>
                        </CardBody>
                        <Divider color={'rgba(255, 99, 71, 0.2)'}/>
                        <Center>
                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{'& > button': {
                                minW: '136px',},}} >

                               {/*  <Button fontSize='xl' flex='1' variant='ghost' >
                                save event
                                </Button> */}

                            <Link to={`/allevents/${event.id}`} >
                                <Button fontSize='md' flex='1' variant='ghost' _hover={{ color: 'red' }}>
                                see details
                                </Button>
                            </Link>
                        </CardFooter>
                        </Center>
                    </Card>
            </SimpleGrid>
                </>)  })}
            </SimpleGrid>
        </div>
    )
} 

export default Projects