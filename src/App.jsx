
import './App.css'

import SidebarWithHeader from './components/SidebarWithHeader'
import theme from '../src/components/theme'
import { ChakraProvider } from '@chakra-ui/react';
import Places from "./components/Places"

/* import foraLogo from '../src/assets/FORA LOGO.png' */





function App()  {




  return (

   <div className={`App ${theme}`}>
   {/* <Navbar/> */}
   
   {/* <img src={foraLogo} alt="" />
 */}
 <ChakraProvider theme={theme}>
   <SidebarWithHeader />
  <Places/>
   </ChakraProvider>
   {/* <Routes>
    <Route path = '/' element={<Homepage/>} />
    <Route path='/about' element={<About/>} ></Route>
    <Route path='/events' element={<Projects  />} ></Route>
   <Route path='/events/:id' element={<ProjectDetails/>} ></Route> 
    <Route path='/events/new' element= {<AddProject/>}></Route>
    <Route path='/events/:id/edit' element={<EditProject />} > </Route>

    <Route path= '*' element={<Teapot />}/>
   </Routes> */}


   </div>
  )
}

export default App
