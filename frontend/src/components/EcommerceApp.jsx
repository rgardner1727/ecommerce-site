import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthenticationProvider } from '../contexts/AuthenticationContext';

import RegisterComponent from './RegisterComponent';
import LoginComponent from './LoginComponent';
import FooterComponent from './FooterComponent';

const EcommerceApp = () => {
    return (
        <AuthenticationProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/register' element={<RegisterComponent/>}/>
                    <Route path='/login' element={<LoginComponent/>}/>
                </Routes>
            </BrowserRouter>
            <FooterComponent/>
        </AuthenticationProvider>
    )
}

export default EcommerceApp;