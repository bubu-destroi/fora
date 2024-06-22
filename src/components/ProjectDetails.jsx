
import {  useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import EventCard from './EventCard'
//import AddTask from './AddTask'

function ProjectDetails() {

  const [event, setEvent] = useState({})
  const navigate = useNavigate()


    const {id} = useParams() //syntax para apanhar a variável q eu criei no Route  /:projectId
    console.log(id)
   /* 
    //find returns the first element matching the condition
    //returns null if no element is found
    //comentado porque estamos a ir buscar num 
    const  foundProject = projects.find(project => project._id === projectId) //comes from useParams() API*/
  
  const getSingleEvent = async id => {
    try {
      const response = await axios.get(`http://localhost:5005/events/${id}`)
      setEvent(response.data)
    } catch (error) {
      console.log('error', error)
      
    }
  }

  useEffect(()=>{
    getSingleEvent(id)
  }, [id])

 /*  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/events/${id}`)
      navigate('/events')
      
    } catch (error) {
      console.log('error deleting the project', error)
    }
  } */

    return (
    <div>
    {/* <h1>{project.title}</h1>
    {!project && <h3>No event found</h3>} */}
  {/*   {project && ( //carolina ias esquecendo este parentesis! 
    <div> 
    <h2>{project.title}</h2>
    <h3>Tech Stack:{project.technologies}</h3>
    <p>{project.description}</p>
    <Link to={`/projects/${project.id}/edit`}>
      <button>Edit</button>
    </Link>
    <button onClick={()=> deleteProject(project.id)} >Delete</button>
    </div>
    )}

    {project && project.tasks.map (task => {
    return (
      <div key= {task.id} > 
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      </div>
    )} )
    
    } */}
    
    {event && (
        <div key={event.id}>
                <EventCard key={event.id} event={event}/>
                </div>
                ) } 

         

          {/* {project.tasks.map(task => {
            return (
              <div key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
            );
          })} */}

          {/* <AddTask projectId={projectId} refreshPage={getSingleProject} /> */}
          
          


        </div>
      )}

    

/*     <Link to='/events'> Back to events</Link> /* importa sempre a porra do LINK */ 

    


export default ProjectDetails
