import {useState} from 'react';
import '../styles/register.css';
import axios from 'axios';

const RegisterComponent = () => {

    const [usernameMessage, setUsernameMessage] = useState(null);
    const [emailMessage, setEmailMessage] = useState(null);
    const [paswordMessage, setpasswordMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if(!username)
            return setUsernameMessage({text: 'Please enter a username.'});
        if(!email)
            return setEmailMessage({text: 'Please enter an email.'});
        if(!password)
            return setpasswordMessage({text: 'Please enter a password.'});
        try{
            const response = await axios.post('http://localhost:5000/register', {username: username, email: email, password: password});
        }catch(err){
            console.log(err);
            if(err.status === 409)
                return setErrorMessage({text: 'Username and/or email is already in use.'});   
            }
            setErrorMessage({text: 'Server error has caused registration to fail.'});
    }

    return (
        <main className='main'>
            <form className='form' onSubmit={handleRegister}>
                <h2 className='form-header'>Let's get started</h2>
                {errorMessage && <p className='server-error-message'>{errorMessage.text}</p>}
                <fieldset className='form-fieldset'>
                    <label className='form-label' htmlFor='username'>Username:</label>
                    <input className='form-input' type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    {usernameMessage && <p className='error-message'>{usernameMessage.text}</p>}
                </fieldset>
                <fieldset className='form-fieldset'>
                    <label className='form-label' htmlFor='email'>Email:</label>
                    <input className='form-input' type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    {emailMessage && <p className='error-message'>{emailMessage.text}</p>}
                </fieldset>
                <fieldset className='form-fieldset'>
                    <label className='form-label' htmlFor='password'>Password:</label>
                    <input className='form-input' type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    {paswordMessage && <p className='error-message'>{paswordMessage.text}</p>}
                </fieldset>
                <button className='form-button' type='submit'>Continue</button>
            </form>
        </main>
    )
}

export default RegisterComponent;