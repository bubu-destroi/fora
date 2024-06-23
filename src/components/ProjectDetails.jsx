
import {  useParams } from 'react-router-dom'
//import { Link } from 'react-router-dom'
import { useEffect, useState , Link} from 'react'
import axios from 'axios'
import EventCard from './EventCard'
//import AddTask from './AddTask'
import { Text } from '@chakra-ui/react'

function ProjectDetails() {

  const [singleEvent, setSingleEvent] = useState({})
  /* const navigate = useNavigate() */


    const {eventId} = useParams() //syntax para apanhar a variável q eu criei no Route  /:projectId
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
    <div key={eventId} >
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
    </div> */}

    {!singleEvent && (<><Text>OOPS NO EVENT FOUND, TOO BAD </Text></>)}
    
    {singleEvent &&  (
      <EventCard/>
    )}
         

          {/* {project.tasks.map(task => {
            return (
              <div key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>
            );
          })} */}

          {/* <AddTask projectId={projectId} refreshPage={getSingleProject} /> */}
          
          <Text>
          <Link to='/allevents'> 
            BACK TO EVENTS
          </Link> 
          </Text>


        </div>
      )
      }

    



    


export default ProjectDetails
