import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
//import { useParams } from "react-router-dom"
import { Input } from '@chakra-ui/react'


import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button, ButtonGroup } from '@chakra-ui/react'


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
  
  const navigate = useNavigate()

  const {eventId} = useParams()

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
          await axios.put(`http://localhost:5005//events/${eventId}`, project)

          //once the project is created
          //redirect the user to the list of projects
          navigate(`/events/${eventId}`)


      }catch(error){
          console.log('error creating the new event',error)
      }
  }


  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5005//events/${id}`)
      navigate('/allevents/')
      
    } catch (error) {
      console.log('error deleting the project', error)
    }
  }


  const getSingleEvent = async id => {
    try {
      const response = await axios.get(`http://localhost:5005/events/${id}`)
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

  useEffect(()=>{
    getSingleEvent(eventId)
  }, [eventId])


return (
  <div className='addEvent' >
  <div>
  <Text opacity= '0.4' as='b' fontSize='200%' color='tomato'>EDIT EVENT</Text>

  <form onSubmit={handleSubmit} > 


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

  <Input
  color='tomato'
  placeholder='where'
  _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={where} onChange={handleWhere} />

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
  placeholder='secret key (for later edit)'
  _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={secret_key} onChange={handleSecret_key} />

  <br/>

  <Button
    type='submit'
    size='md'
    height='48px'
    width='200px'
    border='2px'
    borderColor='tomato'
    backgroundColor={'white'}
    onClick={handleSubmit}
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
onClick={deleteProject}
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
    borderRadius='lg'
  />
  <Stack mt='6' spacing='3'>
    <Heading size='md'>{title}</Heading>
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
