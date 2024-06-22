import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProviderWrapper } from './context/Theme.context.jsx'


// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Router>
    <ThemeProviderWrapper>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      
    </ThemeProviderWrapper>
  </Router>
    
  </React.StrictMode>,
)
