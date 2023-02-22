import React, { useEffect } from "react";
import Goto from '../Goto';
import { FaLock } from 'react-icons/fa';
import { FaUser } from "react-icons/fa";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { clientId, onSuccess, onFailure } from "./logic/login";

import {
  Main, 
  DivArea, 
  LoginArea, 
  InputArea,
  ButtonsArea,
  InputLogin,   
  DivImage,
  Title,
  Subtitle,
  Line} from "./LoginStyles";
import { gapi } from "gapi-script";

const Login = () =>{
  useEffect(() => {
    function start(){
      gapi.client.init({
        clientId: clientId,
        scope: ""
      })
    }

    gapi.load('client:auth2', start);
  });



  return(
    <Main>
      <DivArea>
        <DivImage src="https://images.unsplash.com/photo-1515847049296-a281d6401047?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"/>                
        <LoginArea>
          <Title>Your To Do List</Title>
          <Line/>
          <Subtitle>Log in to your account</Subtitle>

          <InputArea>
            <FaUser color={"var(--color-header-background)"}/>
            <InputLogin id="loginInput" type="text" placeholder="email"/>
          </InputArea>

          <InputArea>            
            <FaLock color={"var(--color-header-background)"}/> 
            <InputLogin id="passwordInput" type="password" placeholder="Password"/>
          </InputArea>
          
          <ButtonsArea>
            <Goto txt="Login" destiny="/Home"/>
            <Goto txt="Sign Up" destiny="/Subscribe"/>      
          </ButtonsArea>             
          <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            style={{"backgroundColor": "black"}}
          />
        </LoginArea>     
      </DivArea>
    </Main>
  );
};

export default Login;
