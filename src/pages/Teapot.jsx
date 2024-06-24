import { Link } from "react-router-dom";
import { Heading, Center, Box, Image} from '@chakra-ui/react'


const imgURL = 'https://www.telegraph.co.uk/multimedia/archive/02419/jobs0_3_2419481b.jpg';

function Teapot() {
  return (
    <div>
     <Center  height="80vh" flexDirection="column">
     <Box width={'100%'}>
      <Heading  color='tomato' size='4xl'>COMPU´ER SAYS NOEEEE</Heading>

      <Link pt={'20px'} to='/allevents'>
      <Box display="flex" justifyContent="center" alignItems="center">
                            <Image
                                src={imgURL}
                                
                                borderRadius='none'
                                margin={'0'}
                            />
                            </Box>

      <Heading pt={'60px'} pb={"20px"}  color='tomato' size='4xl'>COMPU´ER SAYS YES?</Heading>
      </Link>
      </Box>
      </Center>

      
    </div>
  )
}

export default Teapot
