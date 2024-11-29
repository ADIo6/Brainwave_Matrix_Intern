import { useState } from 'react';

import {Box, boxClasses,TextField, Button, styled, Typography} from '@mui/material';
import { convertLength } from '@mui/material/styles/cssUtils';

const Component = styled(Box)`
width: 400px;
margin: auto;
box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);

`;
const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
padding: 25px 35px;
display: flex;
flex: 1;
flex-direction: column;
& > div, & > button, & > p{
margin-top: 20px;

}
`;

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
const signUpInitialValues = {
    name: '',
    email:'',
    password:''

}

const Login = () =>{
    
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const [account, toggleAccount] = useState('login');
    const [signUp, setSignUp] = useState(signUpInitialValues);
    const toggleSignUp = ()=>{
       account === 'signup'? toggleAccount('login'): toggleAccount('signup');
    }
    
    const onInputChange = (e)=>{
        setSignUp( {...signUp, [e.target.name] : e.target.value});
    }
    return(
        <Component>
            <Box>
            <Image src={imageURL} alt="Login"/>
            {
                account ==='login'?
            
                <Wrapper>

                    <TextField variant="standard" label = "Enter user name" />
                    <TextField variant="standard" label = "Enter password"/>
                    <LoginButton variant="contained">Login</LoginButton>
                    <Text style={{textAlign: 'center'}}>OR</Text>
                    <SignupButton onClick={() => toggleSignUp()} >Create an account</SignupButton>
                </Wrapper> 
                :
                <Wrapper>

                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='name' label = "Enter name" />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='email' label = "Enter your email id" />
                    <TextField variant="standard" onChange={(e) => onInputChange(e)} name='password' label = "Enter password"/>

                    <SignupButton variant="contained">SignUp</SignupButton>
                    <Text style={{textAlign: 'center'}}>OR</Text>
                    <LoginButton onClick={() => toggleSignUp()} >Already have an account</LoginButton>

                </Wrapper>
            }
            </Box>
        </Component>

    )
}

export default Login;