import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Divider, Button, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'



const EventCard = ({ event }) => {
    return (

    <Card maxW='lg'mx="auto" >
      <CardBody>
      <Box display="flex" justifyContent="center" alignItems="center">
          <Image
              src={event.picture}
              borderRadius='lg'
              margin={'0'}
          />
          </Box>
          <Stack mt='6' spacing='3'>
            <Heading color='tomato' size='xl'>{event.title}</Heading>
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

        <Link to={`/allevents/${event.id}`} >
                  
          <Button flex='1' variant='ghost'>
            see details
          </Button>

        </Link>
      </CardFooter>
    </Card>
    )
} 

export default EventCard