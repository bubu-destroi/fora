import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
//import { useParams } from "react-router-dom"
import { Input } from '@chakra-ui/react'
import { LoadScript, Autocomplete } from '@react-google-maps/api';


import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button, ButtonGroup } from '@chakra-ui/react'

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
  const [singleEvent, setSingleEvent] = useState(null);
  const [keyAut, setKeyAut] = useState('')
  
  const navigate = useNavigate()

  const autocompleteRef = useRef(null);

  const {eventId} = useParams()
  

              useEffect(() => {
                axios
                .get(`https://fora-server.onrender.com/events/${eventId}`)
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

              const handleFormSubmit = (e) => {
                e.preventDefault()
                const requestBody = {title, description, genre, picture, date,where, social, user, secret_key}


                if(keyAut === secret_key){


                axios
                .put(`https://fora-server.onrender.com/events/${eventId}`, requestBody)
                .then((response)=> {
                  navigate(`/allevents/${eventId}`)
                })
              }else{ return(
                <Text>WRONG KEY, TRY AGAIN</Text>
              )

                }
              }

              const handleDeleteEvent = () => {                    //  <== ADD
                // Make a DELETE request to delete the project


                if(keyAut === secret_key){


                  axios
                  .delete(`https://fora-server.onrender.com/events/${eventId}`)
                  .then((response)=> {
                    navigate(`/allevents/`)
                  })
                }else{ return(
                  <Text>WRONG KEY, TRY AGAIN</Text>
                )}
  

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
          await axios.put(`https://fora-server.onrender.com//events/${eventId}`, project)

          
          //once the project is created
          //redirect the user to the list of projects
          navigate(`/events/${eventId}`)


      }catch(error){
          console.log('error creating the new event',error)
      }
  }


  const deleteProject = async (id) => {
    try {
      await axios.delete(`https://fora-server.onrender.com//events/${id}`)
      navigate('/allevents/')
      
    } catch (error) {
      console.log('error deleting the project', error)
    }
  }


  const getSingleEvent = async id => {
    try {
      const response = await axios.get(`https://fora-server.onrender.com/events/${id}`)
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
  <div className='addEvent' >
  <div>
  <Text opacity= '0.4' as='b' fontSize='200%' color='tomato'>EDIT EVENT</Text>

  <form onSubmit={handleFormSubmit} > 


  <Input
  color='tomato'
  placeholder='event title'
  _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={title} onChange={handleTitle} />

  <br />

  <Input
  color='tomato'
  placeholder='event description'
  _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={description} onChange={handleDescriprion} />

  <br/>

  <Input
    type='text'
    color='tomato'
    placeholder='genre'
    _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={genre} onChange={handleGenre} />

    <br/>

  <Input
  color='tomato'
  placeholder='picture url'
  _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'}  value={picture} onChange={handlePicture} />

  <br/>


  <Input color='tomato'
  placeholder='when' opacity=' 0.4' width={'100%'} size='md' type='date' value={date} onChange={handleDate}  />
  <br />

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

  <br/>

  <Input
    color='tomato'
    placeholder='author name'
    _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={user} onChange={handleByUser} />

    <br />

  <Input
  color='tomato'
  placeholder='link to social media'
  _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={social} onChange={handleSocial} />

  <br/>
  <Input
  color='tomato'
  placeholder='type the secret key'
  _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={keyAut} onChange={handleKeyAut} />

  <br/>

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



</form>
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


  </div>

<div>

  <Card maxW='sm'>
<CardBody>
<Text opacity= '0.4' as='b' fontSize='200%' color='tomato'>PREVIEW</Text>
  <Image
    src={picture}
    borderRadius='none'
  />
  <Stack mt='6' spacing='3'>
    <Heading color='tomato' size='xl'>{title}</Heading>
    <Text>
      {description}
    </Text>
    <Text>
      {social}
    </Text>
    <Text color='black' fontSize='2xl'>
      {date}
    </Text>
    <Text color='black' fontSize='2xl'>
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
</div>


  </div>
)}

export default EditProject
