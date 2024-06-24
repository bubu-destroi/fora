'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
} from '@chakra-ui/react'
import { MdLocalShipping } from 'react-icons/md'

import {  useParams, Link,   } from 'react-router-dom' 
//import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
//import EventCard from './EventCard'
import { Center,Divider, CardFooter} from '@chakra-ui/react'

export default function EventDetails()  {

  const [singleEvent, setSingleEvent] = useState(null);

    const {eventId} = useParams(); //syntax para apanhar a variável q eu criei no Route  /:projectId
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
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            rounded={'md'}
            src={singleEvent.picture}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {singleEvent.title}
            </Heading>
           {/*  <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              $350.00 USD
            </Text> */}
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}>{singleEvent.description}
              </Text>
              
            </VStack>
          </Stack>
          <Box>
                            <Stack mt='6' spacing='3'>
                            <Heading color='tomato' size='lg'>{singleEvent.title}</Heading>
                            <Text>
                                {singleEvent.description}
                            </Text>
                            <Text>
                                {singleEvent.social}
                            </Text>
                            <Text color='tomato' fontSize='2xl'>
                                {singleEvent.date}
                            </Text>
                            <Text color='tomato' fontSize='2xl'>
                                {singleEvent.where}
                            </Text>
                            </Stack>
                        <Divider />
                        <Center>
                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{'& > button': {
                                minW: '136px',},}} >
                                
                                <Button fontSize='2xl' flex='1' variant='ghost' >
                                save event
                      
                                </Button>

                            <Link to={`/allevents/${singleEvent.id}`} >
                                <Button fontSize='2xl' flex='1' variant='ghost'>
                                see details
                                </Button>
                            </Link>

                        </CardFooter>
                        </Center>
                  </Box>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('gray.900', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}