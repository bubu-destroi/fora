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
} from '@chakra-ui/react'
import {
 /*  FiStar,
  FiSettings, */
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi'
import{Routes, Route, Link} from 'react-router-dom'


import foraLogo from '../assets/FORA LOGO.png'
import perfilLogo from '../assets/perfil logo.png'
import Projects from './Projects'
import AllProjects from './AllProjects'
import AddProject from './AddProject'
import ProjectDetails from './ProjectDetails'


const LinkItems = [
  
  { name: 'TODAY', to: '/events/today' },
  { name: 'WHEN', to: '/events/when' },
  { name: 'WHERE',to: '/events/where' },/* 
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
] */]




const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white')}
      borderRight="1px"
      borderRightColor={useColorModeValue('white')}
      w={{ base: 'full', md: 30 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="40" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          WHAT IS HAPPENING?
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
         {LinkItems.map((link) => (
        <NavItem key={link.name} href={link.to}>
          {link.name}
        </NavItem>

      ))} 
    </Box>
  )
}

const NavItem = ({  children, href, ...rest}) => {
  return (
    <Box
      as="a"
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          //bg: 'cyan.400',
          color: 'red',
        }}
        {...rest}>
       {/*  {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )} */}
        
        {children}
      </Flex>
      
    </Box>
  )
}

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 8, md: 20 }}
      height="40"
      alignItems="center"
      bg={useColorModeValue('white')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('white')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        {/* <img src={foraLogo} alt="" /> fica ao lado do botao do meu e ante do icon de perfil no modo tlm */}
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
        <img src={foraLogo} alt="" width={'80%'} />
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }} >
              <HStack>
                <Image
                  size={'lg'}
                  src={perfilLogo} 
                borderRadius={'0px'}
                width = {'50px'}
                left = {'-10px'}

            
                //objectFit={'fill'}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">username</Text>
                  <Text fontSize="xs" color="gray.600">
                    menu
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
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
      <Box ml={{ base: 0, md: 60 }} p="4">

      <Routes>
      <Route path='/events/:filter' element={<Projects  />} ></Route>
      <Route path='/allevents' element={<AllProjects  />} ></Route>
      <Route path='/events/new' element={<AddProject  />} ></Route>
      <Route path='events/:id' element={<ProjectDetails  />} ></Route>

      </Routes>

        {/* Content */}
      </Box>
    </Box>
  )
}

export default SidebarWithHeader