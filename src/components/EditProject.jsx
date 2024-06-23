import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
//import { useParams } from "react-router-dom"
import { Input } from '@chakra-ui/react'


import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button, ButtonGroup } from '@chakra-ui/react'


const EditProject = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [picture, setPicture] = useState('')
  const [date, setDate] = useState('')
  const [where, setWhere] = useState('')
  const [social, setSocial] = useState('https://')
  const [secret_key, setSecret_key] = useState('')
  const navigate = useNavigate()

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

  const handleSecret_key = (event) => {
      setSecret_key(event.target.value)
  }

  const handleSubmit = async (event) => {
      event.preventDefault()
      let id = Math.random() * 1000
      try{
          const project ={
              id, title, description, picture, date, social, secret_key
          }
          await axios.post(`http://localhost:5005/events`, project)
          //once the project is created
          //redirect the user to the list of projects
          navigate('/allevents')


      }catch(error){
          console.log('error creating the new event',error)
      }
  }

 useEffect(()=>{
      
    }, [title, description, picture, date, social])


return (
  <div className='addEvent' >
  <div>
  <Text opacity= '0.4' as='b' fontSize='200%' color='tomato'>CREATE YOUR EVENT</Text>

  <form onSubmit={handleSubmit} > 

 
      
 {/*  <label htmlFor="">title</label>
  <input type="text" name='title' value={title} onChange={handleTitle} />
  <br/>
  

  <label htmlFor="">description</label>
  <textarea itemType="text" name='description' value={description} onChange={handleDescriprion}></textarea>
  <br/> */}

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

 {/*  <label htmlFor="">picture url</label>
  <input type="text" name='picture' value={picture} onChange={handlePicture} />
   */}
  <Input
  color='tomato'
  placeholder='picture url'
  _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'}  value={picture} onChange={handlePicture} />

  <br/>


 {/*  <label htmlFor="">when</label>
  <input type="date" name='date' value={date} onChange={handleDate} />
  <br/> */}

  <Input color='tomato'
  placeholder='when' opacity=' 0.4' width={'100%'} size='md' type='date' value={date} onChange={handleDate}  />
  <br />

  <Input
  color='tomato'
  placeholder='where'
  _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={where} onChange={handleWhere} />

  <br/>

  {/* <label htmlFor="">where</label>
  <input type="text" name='where' value={where} onChange={handleWhere} />
  <br/> */}

  {/* <label htmlFor="">link to social media</label>
  <input type="url" name='social_media' value={social} onChange={handleSocial}/>
  <br/> */}

  <Input
  color='tomato'
  placeholder='link to social media'
  _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={social} onChange={handleSocial} />

  <br/>

 {/*  <label htmlFor="">secret key for edit/delete</label>
  <input type="text" name='secret_key' value={secret_key} onChange={handleSecret_key} />
  <br/>
*/}
  <Input
  color='tomato'
  placeholder='secret key (for later edit)'
  _placeholder={{ opacity: 0.4, color: 'inherit' } } width={'100%'} value={secret_key} onChange={handleSecret_key} />

  <br/>

  {/* <button type='submit'>add event</button> */}

  <Button
  type='submit'
size='md'
height='48px'
width='200px'
border='2px'
borderColor='tomato'
backgroundColor={'white'}
>
add event
</Button>
</form>

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
