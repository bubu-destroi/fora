import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"


const EditProject = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [picture, setPicture] = useState('')
  const [date, setDate] = useState('')
  const [social, setSocial] = useState('')
  const [secret_key, setSecret_key] = useState('')
  const navigate = useNavigate()
    const {id} = useParams()

   
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

  const handleSecret_key = (event) => {
      setSecret_key(event.target.value)
  }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
          const project ={
            title, description, picture, date, social, secret_key
        }
            await axios.put(`https://0e416d24-c972-4cdd-8f5e-b60908b2b586.mock.pstmn.io/events/${id}/edit`, project)
            //once the project is created
            //redirect the user to the list of projects
            navigate(`/events/${id}`)


        }catch(error){
            console.log('error creating the project',error)
        }
    }

    const getSingleProject = async id => {
        try {
          const response = await axios.get(`https://0e416d24-c972-4cdd-8f5e-b60908b2b586.mock.pstmn.io/events/${id}`)
          setTitle(response.data.title)
          setDescription(response.data.description)
        } catch (error) {
          console.log('error', error)
          
        }
      }
    
      useEffect(()=>{
        getSingleProject(id)
      }, [id])


  return (
    <div>
    <h2>Edit event</h2>

    <form onSubmit={handleSubmit} > 

<label htmlFor="">title</label>
<input type="text" name='title' value={title} onChange={handleTitle} />
<br/>

<label htmlFor="">description</label>
<textarea itemType="text" name='description' value={description} onChange={handleDescriprion}></textarea>
<br/>

<label htmlFor="">picture</label>
<input type="image" name='picture' value={picture} onChange={handlePicture} />
<br/>

<label htmlFor="">when</label>
<input type="date" name='date' value={date} onChange={handleDate} />
<br/>

<label htmlFor="">link to social media</label>
<input type="url" name='social_media' value={social} onChange={handleSocial}/>
<br/>

<label htmlFor="">secret key for edit/delete</label>
<input type="text" name='secret_key' value={secret_key} onChange={handleSecret_key} />
<br/>

<button type='submit'>edit event</button>

</form>
      
    </div>
  )
}

export default EditProject
