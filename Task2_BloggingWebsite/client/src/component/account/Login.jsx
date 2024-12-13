import { useState, useContext } from 'react';
import {Box, TextField, Button, styled, Typography} from '@mui/material';
// import { convertLength } from '@mui/material/styles/cssUtils';
// import { signUpUser } from '../../../../server/controller/user-controller.js'; 


import { API } from '../../service/api.js';

import { DataContext } from '../../context/DataProvider.jsx';

import { useNavigate } from 'react-router-dom';


const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`

const Image = styled('img')({
    width: 200,
    margin: 'auto',
    display: 'flex',
    padding: '30px 0 0',
    objectFit: 'cover'
});

const Wrapper = styled(Box)`
padding: 25px 35px;
display: flex;
flex: 1;
flex-direction: column;
& > div, & > button, & > p{
margin-top: 20px;
}
`

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;     
`
const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
    
`

const Text = styled(Typography)`
    color: #878787;
    font-size: 16px;
`
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top:10px;
    font-weight:600;
`
const loginInitialValues ={
    email:"",
    password:""
}

const signUpInitialValues ={
    name: "",
    email: "",      //^^username
    password: ""
}


const Login = ({ isUserAuthenticated }) =>{
    
    const imageURL = 'https://res.cloudinary.com/diad3z03m/image/upload/c_crop,w_400,h_200/v1733921098/Blog_1_gfqrb2.png';
    const [account, toggleAccount] = useState('login');
    const [signup, setSignUp] = useState(signUpInitialValues);
    const [login,setLogin] = useState(loginInitialValues);
    const [error, setError] = useState('');

    const { setAccount } = useContext(DataContext);
    const navigate = useNavigate();

    const toggleSignUp = ()=>{
       account === 'signup'? toggleAccount('login'): toggleAccount('signup');
    }
    
    const onInputChange = (e) => {
        setSignUp( { ...signup, [e.target.name]: e.target.value || ''});
    }

    const signUpUser = async () => {
     let response = await API.userSignup(signup);
     console.log('Processed API Response:', response);
     if(response.isSuccess){
        setError('');
        setSignUp(signUpInitialValues);
        toggleAccount('login');
     }else{
        setError('Something went wrong!! Please try again later');
     }
    };

    const onValueChange = (e) =>{
        setLogin({  ...login, [e.target.name]: e.target.value });

    }

    const loginUser = async () =>{
      let response = await API.userLogin(login);
      if(response.isSuccess){
        setError('');

        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

        setAccount({ email: response.data.email, name: response.data.name});

        isUserAuthenticated(true);

        navigate('/');
      }
      else{
        setError('Somthing went wrong. Please try again later');
      }
    };


    return(
        <Component>
            <Box>
            <Image src={imageURL} alt="Login"/>
            {
                account ==='login'?
            
                <Wrapper>

                    <TextField variant="standard" value={login.email} onChange={(e)=> onValueChange(e)} name="email" label = "Enter your email" />
                    <TextField type='password' variant="standard" value={login.password} onChange= {(e) => onValueChange(e)} name="password" label = "Enter your password"/>
                    
                    {error && <Error>{error}</Error>}

                    <LoginButton variant="contained" onClick={()=> loginUser()}>Login</LoginButton>
                    <Text style={{textAlign: 'center'}}>OR</Text>
                    <SignupButton onClick={() => toggleSignUp()} >Create an account</SignupButton>
                </Wrapper> 
                :                               //^^ username
                <Wrapper> 

                    <TextField variant="standard" value={signup.name || ''} onChange={(e) => onInputChange(e)} name='name' label = "Enter your name" />
                    <TextField variant="standard" value={signup.email ||''} onChange={(e) => onInputChange(e)} name='email' label = "Enter your email" />   
                    <TextField type='password' variant="standard" value={signup.password || ''} onChange={(e) => onInputChange(e)} name='password' label = "Enter password"/>
                    
                    { error && <Error>{error}</Error>}
                    
                    <SignupButton onClick={() => signUpUser()} variant="contained">SignUp</SignupButton>
                    <Text style={{textAlign: 'center'}}>OR</Text>
                    <LoginButton onClick={() => toggleSignUp()} >Already have an account</LoginButton>

                </Wrapper>
            }
            </Box>
        </Component>

    )
}

export default Login;