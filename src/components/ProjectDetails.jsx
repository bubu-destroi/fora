
import {  useParams } from 'react-router-dom'
//import { Link } from 'react-router-dom'
import { useEffect, useState , Link} from 'react'
import axios from 'axios'
import EventCard from './EventCard'
import { Text , Button} from '@chakra-ui/react'

function ProjectDetails() {

  const [singleEvent, setSingleEvent] = useState(null)


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


    {!singleEvent && (<><Text>OOPS NO EVENT FOUND, TOO BAD </Text></>)}
    
    {singleEvent &&  (
      <EventCard event={singleEvent} />
    )}
         

          
    <Button flex='1' variant='ghost' >
          <Text>
            <Link to='/allevents'> 
              BACK TO EVENTS
            </Link> 
          </Text>
    
    </Button>

        </div>
      )
      }

    



    


export default ProjectDetails
