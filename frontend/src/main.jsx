import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import EcommerceApp from './components/EcommerceApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EcommerceApp/>
  </StrictMode>,
)
