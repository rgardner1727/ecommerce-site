import {useState, useContext} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import '../styles/form.css';
import axios from 'axios';
import FormHeaderComponent from './FormHeaderComponent';

const LoginComponent = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameOrEmailMessage, setUsernameOrEmailMessage] = useState(null);
    const [passwordMessage, setPasswordMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const authenticationContext = useContext(AuthenticationContext);
    const setToken = authenticationContext.setToken;

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if(!usernameOrEmail)
            return setUsernameOrEmailMessage({text: 'Please enter your username or email'});
        if(!password)
            return setPasswordMessage({text: 'Please enter your password'});
        try{
            const response = await axios.post('http://localhost:5000/login', {usernameOrEmail, password});
            if(response.status !== 201)
                throw new Error();
            setToken(response.data.token);
            return navigate('/home');
        }catch(err){
            if(err.status === 404)
                return setUsernameOrEmailMessage({text: 'Account with the entered username or email does not exist.'});
            if(err.status === 401)
                return setPasswordMessage({text: 'Incorrect password provided.'});
            return setErrorMessage({text: 'A server error has caused the login attempt to fail.'});
        }
    }

    const handleUsernameOrEmailOnChange = (e) => {
        if(usernameOrEmailMessage)
            setUsernameOrEmailMessage(null);
        setUsernameOrEmail(e.target.value);
    }

    const handlePasswordOnChange = (e) => {
        if(passwordMessage)
            setPasswordMessage(null);
        setPassword(e.target.value);
    }

    return (
        <>
            <FormHeaderComponent/>
            <main className='main'>
                <form className='form' onSubmit={handleLogin}>
                    <h2 className='form-header'>Time to login</h2>
                    {errorMessage && <p className='server-error-message'>{errorMessage.text}</p>}
                    <fieldset className='form-fieldset'>
                        <label className='form-label' htmlFor='usernameOrEmail'>Username or Email:</label>
                        <input className='form-input' type='text' id='usernameOrEmail' value={usernameOrEmail} onChange={(e) => handleUsernameOrEmailOnChange(e)}/>
                        {usernameOrEmailMessage && <p className='error-message'>{usernameOrEmailMessage.text}</p>}
                    </fieldset>
                    <fieldset className='form-fieldset'>
                        <label className='form-label' htmlFor='password'>Password:</label>
                        <input className='form-input' type='password' id='password' value={password} onChange={(e) => handlePasswordOnChange(e)}/>
                        {passwordMessage && <p className='error-message'>{passwordMessage.text}</p>}
                    </fieldset>
                    <button className='form-button' type='submit'>Continue</button>
                    <Link className='alternate-link' to='/register'>Or create an account here</Link>
                </form>
            </main>
        </>
    )
}

export default LoginComponent;