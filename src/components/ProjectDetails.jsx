
import {  useParams, Link,  Link as RouterLink } from 'react-router-dom'
import { Card, CardBody,Image, Stack, Heading, } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
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
      const response = await axios.get(`https://fora-server-second-try.vercel.app/events/${id}`)
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

      <Center  maxHeight="130vh" minHeight="60vh" flexDirection="column" >
        <Box width={'100%'}>
        {!singleEvent && (<><Text>OOPS NO EVENT FOUND, TOO BAD </Text></>)}
    
        {singleEvent &&  ( 

                      <Card borderBottomRadius={"none"}  maxW='lg' h={'100vh'}  border="none" boxShadow="none" >
                        <CardBody borderBottomRadius={"none"} p='0' >
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Image
                                src={singleEvent.picture}
                                
                                borderRadius='none'
                                margin={'0'}
                            />
                            </Box>
                            <Stack mt='6' spacing='3'>
                            <Heading color='tomato' size='xl'>{singleEvent.title}</Heading>

                            <Text fontSize={"lg"}>
                                {singleEvent.description}
                            </Text>

                            <Link to={singleEvent.social} color="blue.500" target='_blank'>
                              <Text color="tomato" fontSize="sm">{singleEvent.social}</Text>
                             
                            </Link>
                            
                            <Text color='tomato' fontSize='md'>
                                {singleEvent.date}
                            </Text>
                            <Text color='tomato' fontSize='md'>
                                {singleEvent.where}
                            </Text>


                            </Stack>
                        </CardBody>
                        <Divider />
                        <Text color='tomato' fontSize='md'>
                                created by : {singleEvent.user}
                          
                        </Text>
                        <Divider />
                        
                        <Text color='tomato' fontSize='sm'>
                               {singleEvent.genre}
                          
                        </Text>
                        <Divider />

                        <Center>
                        <CardFooter p={'0'}
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{'& > button': {
                                minW: '100px',},}} >
                                
                                {/* <Button fontSize='lg' flex='1' variant='ghost' >
                                save event
                                </Button>
                                */}

                            {/* <Link to={`/allevents/${singleEvent.id}`} >
                                <Button fontSize='lg' flex='1' variant='ghost'>
                                more events by {singleEvent.user}
                                </Button>
                            </Link> */}

                            <Link to={`/events/${singleEvent.id}/editproject`} >
                                <Button m={''} fontSize='md' flex='1' variant='tomato' _hover={{ color: 'red' }}>
                                EDIT THIS EVENT
                                </Button>
                            </Link>

                        </CardFooter>
                        
                        </Center>
          <Button mt='' variant={'tomato'} h={'20px'} pb={'20px'} pt={'10px'} _hover={{ color: 'red' }}>
            <RouterLink to="/events/all">
              BACK TO EVENTS
            </RouterLink>
          </Button>
                    </Card>
)}
         </Box>
    
      </Center>

        </> 
        )
      }

    



    


export default ProjectDetails
