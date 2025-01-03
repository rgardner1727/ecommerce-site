import {Link, useLocation} from 'react-router-dom';
import '../styles/form-header.css';

const FormHeaderComponent = () => {
    const location = useLocation();
    const url = location.pathname;
    return (
        <header className='header'>
            <nav className='nav'>
                <a className='nav-title' href='https://www.linkedin.com/in/ryan-gardner-020920306'>Ecomm</a>
                <ul className='nav-list'>
                    {
                        url.includes('/login') ? 
                        <>
                            <li className='nav-item-optional'>Need an account?</li>
                            <li className='nav-item'><Link className='nav-item-link' to='/register'>Register</Link></li>
                        </> : 
                        <>
                            <li className='nav-item-optional'>Already have an account?</li>
                            <li className='nav-item'><Link className='nav-item-link' to='/login'>Login</Link></li>
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default FormHeaderComponent;