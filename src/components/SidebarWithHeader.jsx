import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Input

} from '@chakra-ui/react'
import {
  FiMenu,
  FiChevronDown,

} from 'react-icons/fi'
import{Routes, Route, Link, useNavigate} from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { EventsContext } from '../context/Events.context'






import foraLogo from '../assets/FORA LOGO.png'
import perfilLogo from '../assets/perfil logo.png'
import Projects from './Projects'
import AllProjects from './AllProjects'
import AddProject from './AddProject'
import ProjectDetails from './ProjectDetails'
import Teapot from '../pages/Teapot'
import EditProject from './EditProject'


const LinkItems =  [


  
  { name: 'TODAY', to: '/events/today' },
  { name: 'ALL EVENTS', to: '/events/all' },
  { name: 'PLACE', type: 'place' },
  { name: 'WHEN', to:'/events/when', type: 'date' },
  {name: 'PAST EVENTS' , to: '/events/past'} 
]




const SidebarContent = ({ onClose, ...rest }) => {
  const {filterEvents}= useContext(EventsContext)


  const [selectedDate, setSelectedDate] = useState('');
  const [search, setSearch] = useState('');
  const [showDateInput, setShowDateInput] = useState(false);
  const [showPlaceInput, setShowPlaceInput] = useState(false);

  
  const navigate = useNavigate()

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setShowDateInput(false); 
    navigate(`/events/when/${event.target.value}`); 
    onClose()
  };

  const handlePlaceSearch = (event) => {
    setSearch(event.target.value)
    filterEvents(event.target.value)


  }

  useEffect(() => {

  }, [search])

  return (
    <Box
    //pt={'100px'}
      transition="3s ease"
      bg={useColorModeValue('white')}
      borderRight="1px"
      borderRightColor={useColorModeValue('white')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="40" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily='"Kode Mono", monospace' fontWeight="bold 700">
          WHAT 
          IS 
          HAPPENING?
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
         {LinkItems.map((link) => (
          <>

          <NavItem
          fontSize={"xl"}
          key={link.name}
          link={link}
          showDateInput={showDateInput}
          showPlaceInput={showPlaceInput}
          setShowDateInput={setShowDateInput}
          handleDateChange={handleDateChange}
          setShowPlaceInput={setShowPlaceInput}
          handlePlaceSearch={handlePlaceSearch}
          onClose={onClose}>
          {link.name}
        </NavItem>
        {showPlaceInput && link.name === 'PLACE' && (
            <Box p="4" mx="4">
              <Input type="text" value={search} onChange={handlePlaceSearch} onKeyDown={(e) => {if(e.key === 'Enter') onClose()}} />
            </Box>
          )}
          </>
      ))} 
          {showDateInput && (
            <Box p="4" mx="4">
              <Input type="date" value={selectedDate} onChange={handleDateChange} />
            </Box>
          )}
        </Box>

      )
    }

    const NavItem = ({ link, showDateInput, setShowDateInput,onClose,showPlaceInput, setShowPlaceInput }) => {
  if (link.type === 'date') {
    return (
      <Box mt="4">
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="none"
          role="group"
          cursor="pointer"
          onClick={() => {setShowDateInput(!showDateInput) } }
          _hover={{ color: 'red' }}
        >
          <Text fontSize="xl">{link.name}</Text>
        </Flex>
      </Box>
    );
  } else if(link.type === 'place') {
    return (
      <Box mt="4">
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="none"
          role="group"
          cursor="pointer"
          onClick={() => {setShowPlaceInput(!showPlaceInput) } }
          _hover={{ color: 'red' }}
          
        >
          <Link to={link.to} style={{ textDecoration: 'none' }}>
            <Text fontSize="xl">{link.name}</Text>
          </Link>
        </Flex>
      </Box>
    );
  } else {
    return (
      <Box mt="4">
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="none"
          role="group"
          cursor="pointer"
          onClick={onClose}
          _hover={{ color: 'red' }}
          
        >
          <Link to={link.to} style={{ textDecoration: 'none' }}>
            <Text fontSize="xl">{link.name}</Text>
          </Link>
        </Flex>
      </Box>
    );
  }
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (<>
    
    <Flex
      position="fixed"
      top="0"
      left="0"
      right="0"
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="-60px"
      alignItems="center"
      justifyContent={{ base: 'space-between', md: 'space-between' }}
      zIndex="1100" 
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Box display="flex" justifyContent="center" flex="1" >
        <Link to='/events/today' >
        <Image
          src={foraLogo}
          width={'550px'}
          height={'auto'}
          pl={'0px'}
        />
        </Link>
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }} >
              <HStack>
                <Image
                  size={'lg'}
                  src={perfilLogo} 
                borderRadius={'0px'}
                width = {'50px'}
                left = {'-10px'}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="center"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="xl">username</Text>
                
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
            fontSize="xl"
              bg={useColorModeValue('white')}
              borderColor={useColorModeValue('white')}>
              <MenuItem  >your profile</MenuItem>
              <Link to='/events/new' >
              <MenuItem   >create event</MenuItem>

              </Link>
              <MenuItem>saved events</MenuItem>
              <MenuDivider />
              <MenuItem>log in</MenuItem>
              <MenuItem>log out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
    </>
  )
}

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('white')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      
      <Box  ml={{ base: 0, md: 60 }}
        pt={{ base: '60px', md: '200px' }}
        p="4"
        pb="4"
        mt={{ base: '200px', md: '0' }}
        display="flex"
        justifyContent="center">

          <Routes>
          <Route path='/' element={<AllProjects  />} ></Route>
          <Route path='/events/:filter' element={<Projects  />} ></Route>
          <Route path='/events/:filter/:date' element={<Projects  />} ></Route> 
          {/* <Route path='/allevents' element={<Projects  />} ></Route> */}
          <Route path='/events/new' element={<AddProject  />} ></Route>
          <Route path='/allevents/:eventId' element={<ProjectDetails  />} ></Route>
          <Route path='/events/:eventId/editproject' element={<EditProject />} ></Route>
          <Route path='*' element={<Teapot  />} ></Route>
          {/* <Route path='/events/*' element={<Teapot  />} ></Route> */}

          </Routes>

        {/* Content */}
      </Box>
    </Box>
  
  )
}

export default SidebarWithHeader