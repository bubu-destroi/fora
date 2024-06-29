
import  { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  SimpleGrid,
  Box,
  AbsoluteCenter,
  Text,
  Button,
  Center,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
} from '@chakra-ui/react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  const [date, setDate] = useState('');
  const [where, setWhere] = useState('');
  const [social, setSocial] = useState('https://');
  const [user, setUser] = useState('theme context here');
  const [genre, setGenre] = useState('');
  const [secret_key, setSecret_key] = useState('');

  const navigate = useNavigate();
  const autocompleteRef = useRef(null);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handlePicture = (event) => {
    setPicture(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleSocial = (event) => {
    setSocial(event.target.value);
  };

  const handleWhere = (event) => {
    setWhere(event.target.value);
  };

  const handleByUser = (event) => {
    setUser(event.target.value);
  };

  const handleGenre = (event) => {
    setGenre(event.target.value);
  };

  const handleSecret_key = (event) => {
    setSecret_key(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let id = Math.random() * 1000;
    console.log('este é o id', id)
    try {
      const project = {
        id,
        title,
        description,
        genre,
        picture,
        date,
        where,
        social,
        secret_key,
      };
      await axios.post(`https://fora-server.onrender.com/events`, project);
      navigate(`/allevents/${id}`);
    } catch (error) {
      console.log('error creating the new event', error);
    }
  };

  useEffect(() => {}, [title, description, genre, picture, date, where, social, user]);

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    const address = place?.formatted_address || '';
    setWhere(address);
  };

  return (
    <Center display={'flex'} h={'400px'}>
      <Box position='relative'>
        <AbsoluteCenter axis='both'>
          <SimpleGrid spacing={6} templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}>
            <form onSubmit={handleSubmit}>
              <Text opacity='0.9' as='b' fontSize='200%' color='tomato'>
                CREATE YOUR EVENT
              </Text>

              <Input color='tomato' placeholder='event title' _placeholder={{ opacity: 0.4, color: 'inherit' }} width={'100%'} value={title} onChange={handleTitle} />
              <br />
              <Input color='tomato' placeholder='event description' _placeholder={{ opacity: 0.4, color: 'inherit' }} width={'100%'} value={description} onChange={handleDescription} />
              <br />
              <Input type='text' color='tomato' placeholder='genre' _placeholder={{ opacity: 0.4, color: 'inherit' }} width={'100%'} value={genre} onChange={handleGenre} />
              <br />
              <Input color='tomato' placeholder='picture url' _placeholder={{ opacity: 0.4, color: 'inherit' }} width={'100%'} value={picture} onChange={handlePicture} />
              <br />
              <Input color='tomato' placeholder='when' opacity=' 0.4' width={'100%'} size='md' type='date' value={date} onChange={handleDate} />
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
              <br />
              <Input color='tomato' placeholder='author name' _placeholder={{ opacity: 0.4, color: 'inherit' }} width={'100%'} value={user} onChange={handleByUser} />
              <br />
              <Input type='url' color='tomato' placeholder='link to social media' _placeholder={{ opacity: 0.4, color: 'inherit' }} width={'100%'} value={social} onChange={handleSocial} />
              <br />
              <Input color='tomato' placeholder='secret key (for later edit)' _placeholder={{ opacity: 0.4, color: 'inherit' }} width={'100%'} value={secret_key} onChange={handleSecret_key} />
              <br />
              <Button type='submit' size='md' height='48px' width='200px' border='2px' borderColor='tomato' backgroundColor={'white'}>
                create
              </Button>
            </form>
            <div>
              <Card width='300px' maxW='md' variant='outline'>
                <Text opacity='0.9' as='b' fontSize='200%' color='tomato'>
                  PREVIEW
                </Text>
                <CardBody>
                  <Box width='260px' height='260px' overflow='hidden' borderRadius='none' display='flex' justifyContent='center' alignItems='center'>
                    <Image src={picture} borderRadius='none' margin='0' />
                  </Box>
                  <Stack mt='6' spacing='3'>
                    <Heading color='tomato' size='lg'>
                      {title}
                    </Heading>
                    <Text>{description}</Text>
                    <Text>{social}</Text>
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
                  <ButtonGroup spacing='2'></ButtonGroup>
                </CardFooter>
              </Card>
            </div>
          </SimpleGrid>
        </AbsoluteCenter>
      </Box>
    </Center>
  );
};

export default AddProject;

