import { Link } from "react-router-dom";
import { Heading, Center, Box, Image} from '@chakra-ui/react'


const imgURL = 'https://www.telegraph.co.uk/multimedia/archive/02419/jobs0_3_2419481b.jpg';

function Teapot() {
  return (
    <div>
     <Center  height="70vh" flexDirection="column">
     <Box width={'70%'}>
      <Heading  color='tomato' size='xl'>COMPU´ER SAYS NOEEEE</Heading>

      <Box display="flex" justifyContent="center" alignItems="center">
                            <Image
                                src={imgURL}
                                
                                borderRadius='none'
                                margin={'0'}
                            />
                            </Box>
      <Link pt={'20px'} to='/events/all'>
      <Heading pt={''} pb={"20px"}  color='tomato' size='xl'>COMPU´ER SAYS YES?</Heading>
      </Link>

      </Box>
      </Center>

      
    </div>
  )
}

export default Teapot
