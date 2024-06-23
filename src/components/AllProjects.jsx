import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios  from "axios"
//import {  useNavigate, useParams } from 'react-router-dom'
import EventCard from './EventCard'
import {Divider, ButtonGroup,Stack, Card, CardHeader, CardBody, CardFooter, Button, Heading, Text, SimpleGrid, Image } from '@chakra-ui/react'


const AllProjects  = () =>{

    const [events, setEvents] = useState([])
  

            const getAllEvents = async () =>{
                try{
                    const response = await axios.get('http://localhost:5005/events')
                    // const response = await axios.get('https://0e416d24-c972-4cdd-8f5e-b60908b2b586.mock.pstmn.io/events')
                    console.log(response.data)
                            setEvents(response.data)
            
                }catch (error) {
                    console.log('error fetching the events', error)
                }
            }

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

    useEffect(()=>{
        console.log('mounting')
        getAllEvents()
    }, [])
   
    return(
        <div>
            <h1>all events</h1>

            <Link to= '/events/new'>

            <button>add a new event</button>

            </Link>

            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
            {events.map(event => {return( 
                    <>
                    <SimpleGrid spacing={4} templateColumns='repeat(auto-fit, minmax(200px, 1fr))'>

                    <Card maxW='lg' >
                        <CardBody>
                            <Image
                            src={event.picture}
                            display={'responsive'}
                            borderRadius='lg'
                            justifyContent={'center'}
                            margin={'0'}
                            
                            />
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

                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{
                            '& > button': {
                                minW: '136px',
                            },
                            }}
                        >
                            <Button flex='1' variant='ghost' >
                            save event
                            </Button>

                            <Link to={`/events/${event.id}`} >
                                    
                            <Button flex='1' variant='ghost'>
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