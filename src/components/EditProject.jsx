import { useState, useEffect, useRef, useContext } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
//import { useParams } from "react-router-dom"
import { Input} from '@chakra-ui/react'
import { LoadScript, Autocomplete } from '@react-google-maps/api';


import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button, ButtonGroup, Box, Flex } from '@chakra-ui/react'

import { EventsContext } from "../context/Events.context";


const libraries = ['places'];

const EditProject = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [picture, setPicture] = useState('')
  const [date, setDate] = useState('')
  const [where, setWhere] = useState('')
  const [social, setSocial] = useState('')
  const [user, setUser] = useState('')
  const [genre, setGenre] = useState('')
  const [secret_key, setSecret_key] = useState('')
  const [keyAut, setKeyAut] = useState('')
  const [status, setStatus] = useState('');
  
  const navigate = useNavigate()

  const autocompleteRef = useRef(null);

  const {eventId} = useParams()
  const {getEvents} = useContext(EventsContext)

              useEffect(() => {
                
                axios
                .get(`https://fora-server-second-try.vercel.app/events/${eventId}`)
                .then((response) => {
                  const oneEvent = response.data
                  setTitle(oneEvent.title)
                  setDescription(oneEvent.description)
                  setGenre(oneEvent.genre)
                  setPicture(oneEvent.picture)
                  setDate(oneEvent.date)
                  setWhere(oneEvent.where)
                  setSocial(oneEvent.social)
                  setUser(oneEvent.user)
                  setSecret_key(oneEvent.secret_key)
                })
                .catch((error) => console.log(error))

              },[eventId])

              const handleFormSubmit = async (e) => {
                e.preventDefault()
                const requestBody = {title, description, genre, picture, date,where, social, user, secret_key}


                if(keyAut === secret_key){

                  try{

                    await axios.put(`https://fora-server-second-try.vercel.app/events/${eventId}`, requestBody)
                    getEvents()
                    navigate(`/allevents/${eventId}`)
                  }catch(error){
                    console.log("error", error);
                  }
                
                  }else {
                    setStatus("Wrong key");
                  }
                    }

              const handleDeleteEvent = async () => {                    //  <== ADD
                // Make a DELETE request to delete the project


                if(keyAut === secret_key){

                  try{

                    await axios
                    .delete(`https://fora-server-second-try.vercel.app/events/${eventId}`)
                    getEvents()
                      navigate(`/allevents/`)
                  }catch (error){
                      console.log('error',error)
                  }
                
                }else {
                  setStatus("Wrong key");
                
                }
  

              };  


              const handleTitle = (event) =>{
                setTitle(event.target.value)
            }
            const handleDescriprion = (event) =>{
                setDescription(event.target.value)
            }
          
            const handlePicture = (event) => {
                setPicture(event.target.value)
            }
          
            const handleDate = (event) => {
                setDate(event.target.value)
            }
          
            const handleSocial = (event) => {
                setSocial(event.target.value)
            }
          
            const handleWhere = (event) => {
                setWhere(event.target.value)
            }
          
            const handleByUser = (event) => {
              setUser(event.target.value)
            }
           
            const handleGenre = (event) => {
                setGenre(event.target.value)
            }
          
           /*  const handleSecret_key = (event) => {
                setSecret_key(event.target.value)
            } */

          
                const handleKeyAut = (event) => {
                  setKeyAut(event.target.value)
              }


/* 
  const handleTitle = (event) =>{
      setTitle(event.target.value)
  }
  const handleDescriprion = (event) =>{
      setDescription(event.target.value)
  }

  const handlePicture = (event) => {
      setPicture(event.target.value)
  }

  const handleDate = (event) => {
      setDate(event.target.value)
  }

  const handleSocial = (event) => {
      setSocial(event.target.value)
  }

  const handleWhere = (event) => {
      setWhere(event.target.value)
  }

  const handleByUser = (event) => {
    setUser(event.target.value)
  }
 
  const handleGenre = (event) => {
      setGenre(event.target.value)
  }

  const handleSecret_key = (event) => {
      setSecret_key(event.target.value)
  }

  const handleSubmit = async (event) => {
      event.preventDefault()

    
      try{
          const project ={
               title, description, genre, picture, date, social, user, secret_key
          }
          await axios.put(`https://fora-server-second-try.vercel.app//events/${eventId}`, project)

          
          //once the project is created
          //redirect the user to the list of projects
          navigate(`/events/${eventId}`)


      }catch(error){
          console.log('error creating the new event',error)
      }
  }


  const deleteProject = async (id) => {
    try {
      await axios.delete(`https://fora-server-second-try.vercel.app//events/${id}`)
      navigate('/allevents/')
      
    } catch (error) {
      console.log('error deleting the project', error)
    }
  }


  const getSingleEvent = async id => {
    try {
      const response = await axios.get(`https://fora-server-second-try.vercel.app/events/${id}`)
      setSingleEvent(response.data)
      setTitle(response.data.title)
      setDescription(response.data.description)
      setGenre(response.data.genre)
      setPicture(response.data.picture)
      setDate(response.data.date)
      setWhere(response.data.where)
      setUser(response.data.user)
      setSocial(response.data.social)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    getSingleEvent(eventId)
  }, [eventId])
 */

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    const address = place?.formatted_address || '';
    setWhere(address);
  };


return (
 <>
   <Flex p={{ base: 4, md: 8 }} direction={{ base: "column", md: "row" }} gap={8}>
   <Box flex={{base: "1", md: "50%"}}>
      <form onSubmit={handleFormSubmit} > 
          <Text opacity= '0.9' as='b' fontSize='2xl' color='tomato'>EDIT EVENT</Text>
          <Stack spacing={0}>
          <Input
          color='tomato'
          placeholder='event title'
          _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={title} onChange={handleTitle} />
         
          <Input
          color='tomato'
          placeholder='event description'
          _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={description} onChange={handleDescriprion} />
    
          <Input
            type='text'
            color='tomato'
            placeholder='genre'
            _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={genre} onChange={handleGenre} />

          <Input
          color='tomato'
          placeholder='picture url'
          _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'}  value={picture} onChange={handlePicture} />

          <Input color='tomato'
          placeholder='when' opacity=' 0.4' width={'100%'} size='md' type='date' value={date} onChange={handleDate}  />

          <LoadScript googleMapsApiKey='AIzaSyDSbSrNsYCqg7GV5daI7wa7h3b1eu7zHPk' libraries={libraries} fontFamily='"Kode Mono", monospace' fontWeight="bold 700">
                        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={onPlaceChanged} fontFamily='"Kode Mono", monospace' fontWeight="bold 700">
                          <Input
                            type='text'
                            color='tomato'
                            placeholder='where'
                            _placeholder={{ opacity: 0.4, color: 'inherit' }}
                            width={'100%'}
                            value={where}
                            onChange={handleWhere}
                          />
                        </Autocomplete>
                      </LoadScript>
          
          <Input
            color='tomato'
            placeholder='author name'
            _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={user} onChange={handleByUser} />
  
          <Input
          color='tomato'
          placeholder='link to social media'
          _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={social} onChange={handleSocial} />
  
          <Input
          color='tomato'
          placeholder='type the secret key'
          _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={keyAut} onChange={handleKeyAut} />


          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Button
            type='submit'
            size='md'
            height='48px'
            width='200px'
            border='2px'
            borderColor='tomato'
            backgroundColor={'white'}
            >
            UPDATE EVENT
          </Button>

          <Button
            type='submit'
          size='md'
          height='48px'
          width='200px'
          border='2px'
          borderColor='tomato'
          backgroundColor={'white'}
          onClick={handleDeleteEvent}
          >
          DELETE EVENT
          </Button> 
          </Stack>
            {status && <Text color="red">{status}</Text>}
          </Stack>
        </form>
        </Box>

<Box flex={{base: "1", md: "50%"}} mt={{base:4, md:0}}>
      <Text opacity= '0.9' as='b' fontSize='2xl' color='tomato'>PREVIEW</Text>
        <Card maxW='lg'>
      <CardBody>
          <Box width='260px' height='260px' overflow='hidden' borderRadius='none' display='flex' justifyContent='center' alignItems='center'>
            <Image src={picture} borderRadius='none' margin='0' />
          </Box>
        <Stack mt='1' spacing='1'>
          <Heading color='tomato' size='lg'>{title}</Heading>
          <Text>
            {description}
          </Text>
          <Text>
            {social}
          </Text>
          <Text color='black' fontSize='xl'>
            {date}
          </Text>
          <Text color='black' fontSize='md'>
            {where}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
      
        </ButtonGroup>
      </CardFooter>
      </Card>
      </Box>
      </Flex>

    </>

)}

export default EditProject
