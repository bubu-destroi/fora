import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


const EventCard = ({event}) => {
    return (

<Card maxW='sm'>
  <CardBody>
    <Image
      src={event.picture}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading color='tomato' size='md'>{event.title}</Heading>
      <Text>
        {event.description}
      </Text>
      <Text>
        {event.social}
      </Text>
      <Text color='tomato' fontSize='2xl'>
        {event.date}
      </Text>
      <Text color='tomato' fontSize='2xl'>
        {event.where}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  {/* <CardFooter justify='space-between'
    flexWrap='wrap' >
  
    <ButtonGroup  spacing='7'>
        <Button
        // type='submit'
        size='md'
        height='48px'
        width='fit'
        border='1px'
        borderColor='tomato'
        backgroundColor={'white'}
        >
        save now
        </Button>
        <Button
        //type='submit'
        
        size='md'
        height='48px'
        width='fit'
        border='1px'
        borderColor='tomato' 
        
        backgroundColor={'white'}
        >
        see details
    </Button>
    </ButtonGroup>
    
  </CardFooter> */}

  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <Button flex='1' variant='ghost' >
      save event
    </Button>

    <Link to={`/events/${event.id}`} >
              
    <Button flex='1' variant='ghost'>
      see details
    </Button>

    </Link>

{/*     <Button flex='1' variant='ghost' >
      Share
    </Button> */}
  </CardFooter>
</Card>
    )
}

export default EventCard