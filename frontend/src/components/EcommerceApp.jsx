import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthenticationProvider } from '../contexts/AuthenticationContext';

import RegisterComponent from './RegisterComponent';

const EcommerceApp = () => {
    return (
        <AuthenticationProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/register' element={<RegisterComponent/>}/>
                </Routes>
            </BrowserRouter>
        </AuthenticationProvider>
    )
}

export default EcommerceApp;