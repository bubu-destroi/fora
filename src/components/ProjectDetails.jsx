
import {  useParams, Link,  Link as RouterLink } from 'react-router-dom'
import { Card, CardBody,Image, Stack, Heading, } from '@chakra-ui/react'
//import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
//import EventCard from './EventCard'
import { Text , Button,Center,Box, Divider, CardFooter} from '@chakra-ui/react'

function ProjectDetails() {

  const [singleEvent, setSingleEvent] = useState(null);

    const {eventId} = useParams(); //syntax para apanhar a variável q eu criei no Route  /:projectId
    console.log(eventId)
   /* 
    //find returns the first element matching the condition
    //returns null if no element is found
    //comentado porque estamos a ir buscar num api
    const  foundProject = projects.find(project => project._id === projectId) //comes from useParams() API*/
  
  const getSingleEvent = async id => {
    try {
      const response = await axios.get(`http://localhost:5005/events/${id}`)
      setSingleEvent(response.data)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(()=>{
    getSingleEvent(eventId)
  }, [eventId])



    return (
      <>

      <Center  height="140vh" flexDirection="column">
        <Box width={'100%'}>
        {!singleEvent && (<><Text>OOPS NO EVENT FOUND, TOO BAD </Text></>)}
    
        {singleEvent &&  ( 

                      <Card borderBottomRadius={"none"}  maxW='xl' >
                        <CardBody borderBottomRadius={"none"} >
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Image
                                src={singleEvent.picture}
                                
                                borderRadius='none'
                                margin={'0'}
                            />
                            </Box>
                            <Stack mt='6' spacing='3'>
                            <Heading color='tomato' size='4xl'>{singleEvent.title}</Heading>

                            <Text fontSize={"2xl"}>
                                {singleEvent.description}
                            </Text>

                            <Link href={singleEvent.social} color="blue.500" isExternal>
                              <Text color="tomato" fontSize="2xl">{singleEvent.social}</Text>
                             
                            </Link>
                            
                            <Text color='tomato' fontSize='2xl'>
                                {singleEvent.date}
                            </Text>
                            <Text color='tomato' fontSize='2xl'>
                                {singleEvent.where}
                            </Text>


                            </Stack>
                        </CardBody>
                        <Divider />
                        <Text color='tomato' fontSize='2xl'>
                                created by : username
                          
                        </Text>
                        <Divider />
                        
                        <Text color='tomato' fontSize='2xl'>
                               genre : party/music/lusco fusco
                          
                        </Text>
                        <Divider />

                        <Center>
                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{'& > button': {
                                minW: '136px',},}} >
                                
                                <Button fontSize='2xl' flex='1' variant='ghost' >
                                save event
                                </Button>
                               

                            <Link to={`/allevents/${singleEvent.id}`} >
                                <Button fontSize='2xl' flex='1' variant='ghost'>
                                more events by {singleEvent.user}
                                </Button>
                            </Link>

                            <Link to={`/events/${singleEvent.id}/editproject`} >
                                <Button fontSize='2xl' flex='1' variant='ghost'>
                                EDIT THIS EVENT
                                </Button>
                            </Link>

                        </CardFooter>
                        
                        </Center>
                    </Card>
)}
         </Box>
    
          <Button mt={6}>
            <RouterLink to="/allevents">
              BACK TO EVENTS
            </RouterLink>
          </Button>
      </Center>

        </> 
        )
      }

    



    


export default ProjectDetails
