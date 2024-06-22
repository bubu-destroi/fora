
import './App.css'
import { useContext } from 'react'
import { ThemeContext } from './context/Theme.context'
import SidebarWithHeader from './components/SidebarWithHeader'
/* import foraLogo from '../src/assets/FORA LOGO.png' */





function App()  {

  const {theme} = useContext(ThemeContext)


  return (

   <div className={`App ${theme}`}>
   {/* <Navbar/> */}
   
   {/* <img src={foraLogo} alt="" />
 */}

   <SidebarWithHeader />
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
