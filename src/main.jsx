import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { EventsProviderWrapper } from './context/Events.context.jsx'


// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Router>
    <EventsProviderWrapper>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      
    </EventsProviderWrapper>
  </Router>
    
  </React.StrictMode>,
)
