import {useState} from 'react';
import '../styles/form.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import FormHeaderComponent from './FormHeaderComponent';

const RegisterComponent = () => {

    const [usernameMessage, setUsernameMessage] = useState(null);
    const [emailMessage, setEmailMessage] = useState(null);
    const [passwordMessage, setPasswordMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if(!username)
            return setUsernameMessage({text: 'Please enter a username.'});
        if(!email)
            return setEmailMessage({text: 'Please enter an email.'});
        if(!password)
            return setPasswordMessage({text: 'Please enter a password.'});
        try{
            const response = await axios.post('http://localhost:5000/register', {username: username, email: email, password: password});
            if(response.status !== 201)
                throw new Error();
            return navigate('/login');

        }catch(err){
            console.log(err);
            if(!err.status === 409)
                return setErrorMessage({text: 'A server error has caused the registration attempt to fail.'});   
            return setErrorMessage({text: 'Username and/or email is already in use.'});
        }
    }

    const handleUsernameOnChange = (e) => {
        if(usernameMessage)
            setUsernameMessage(null);
        setUsername(e.target.value);
    }

    const handleEmailOnChange = (e) => {
        if(emailMessage)
            setEmailMessage(null);
        setEmail(e.target.value);
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
                <form className='form' onSubmit={handleRegister}>
                    <h2 className='form-header'>Let's get started</h2>
                    <fieldset className='form-fieldset'>
                        <label className='form-label' htmlFor='username'>Username:</label>
                        <input className='form-input' type='text' id='username' value={username} onChange={(e) => handleUsernameOnChange(e)}/>
                        {usernameMessage && <p className='error-message'>{usernameMessage.text}</p>}
                    </fieldset>
                    <fieldset className='form-fieldset'>
                        <label className='form-label' htmlFor='email'>Email:</label>
                        <input className='form-input' type='email' id='email' value={email} onChange={(e) => handleEmailOnChange(e)}/>
                        {emailMessage && <p className='error-message'>{emailMessage.text}</p>}
                    </fieldset>
                    <fieldset className='form-fieldset'>
                        <label className='form-label' htmlFor='password'>Password:</label>
                        <input className='form-input' type='password' id='password' value={password} onChange={(e) => handlePasswordOnChange(e)}/>
                        {passwordMessage && <p className='error-message'>{passwordMessage.text}</p>}
                    </fieldset>
                    <button className='form-button' type='submit'>Continue</button>
                    {errorMessage && <p className='server-error-message'>{errorMessage.text}</p>}
                    <Link className='alternate-link' to='/login'>Or login here</Link>
                </form>
            </main>
        </>
    )
}

export default RegisterComponent;