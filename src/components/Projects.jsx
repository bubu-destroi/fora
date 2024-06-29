import { Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import {  useParams, useNavigate } from 'react-router-dom'
import {  SimpleGrid} from '@chakra-ui/react'
import {Box, Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button, Center } from '@chakra-ui/react'
import { EventsContext } from "../context/Events.context"

const Projects  = () =>{
    const {events}= useContext(EventsContext)
    // const [events, setEvents] = useState([])
    const [filteredEvents, setFilteredEvents] = useState([])
    const {filter, date} = useParams()
    const navigate = useNavigate()
    

    const filterToday = events => {

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


    useEffect(()=>{
        console.log('mounting')
        const filterEvents = async (events) =>{
            try{
                // const response = await axios.get('https://fora-server.onrender.com/events')
                // // const response = await axios.get('https://0e416d24-c972-4cdd-8f5e-b60908b2b586.mock.pstmn.io/events')
                // console.log(response.data)
                // setEvents(response.data)
    
                if(filter==='today') {
                    filterToday(events)
                }else if(filter === 'when' && date){
                    filterDate(events, date)
                } else if(filter === 'place') {
                   setFilteredEvents(events)}
                
                else {
                    navigate('/not-found')
                }

            }catch (error) {
                console.log('error fetching the events', error)
            }
        }
        filterEvents(events)
    }, [filter, date])
   
    return(
        <div className="filteredEvents">

            <Heading pt={'0px'} pb={'10px'} color='tomato' size='2xl'>{filter}</Heading>
            <Heading pt={'10px'} pb={'10px'} color='gray.600' size='2xl'>{date}</Heading>
            <Link to={`/events/new`} >
                                                
                <Button flex='1' variant='ghost' >
                     <Text color='tomato' fontSize='xl'>CREATE A NEW EVENT</Text>
                 </Button>
                       
             </Link>
 
           

            {/* <Link to= '/events/new'>

            <button>Add a new event</button>


            </Link> */}

            <SimpleGrid spacing={4} templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}> 
            {filteredEvents.map(event => {
                return( 
                    <>
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fit, minmax(200px, 1fr))'>

                    <Card maxW='lg'>
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
                            <Heading color='tomato' size='lg'>{event.title}</Heading>
                            <Text>
                                {event.description}
                            </Text>
                            <Text>
                                {event.social}
                            </Text>
                            <Text color='tomato' fontSize='2xl'>
                                {event.date}
                            </Text>
                            <Text color='tomato' fontSize='2xl'>
                                {event.where}
                            </Text>
                            </Stack>
                        </CardBody>
                        <Divider />
                        <Center>
                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{'& > button': {
                                minW: '136px',},}} >

                                <Button fontSize='xl' flex='1' variant='ghost' >
                                save event
                                </Button>

                            <Link to={`/allevents/${event.id}`} >
                                <Button fontSize='xl' flex='1' variant='ghost'>
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