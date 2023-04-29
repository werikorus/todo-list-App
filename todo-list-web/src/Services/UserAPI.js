import { apiserverURL_v1 } from '../Helper/Helper';
import { externalApiServerURL_v1 } from '../Helper/Helper';
import { externalApiServerURL_v2 } from '../Helper/Helper';

export const getUserById = async (userId) =>{
  try{
    const data = await fetch(`${apiserverURL_v1}/User/${userId}`, {
      "method": "GET",
    });

    if(data){
      const user = await data.json();
      return user;
    }
  }catch(error){
    console.log(error)
  }
}

export const getUsers = async () =>{
  try{
    const data = await fetch(`${apiserverURL_v1}/User`, {
      "method": "GET",
    });

    if(data){
      const users = await data.json();
      return users;
    }
  }catch(error){
    console.log(error)
  }
}

export const setNewUser = async (valuesNewUser) => {
  try{
    return await fetch(`${externalApiServerURL_v1}/Usesr`, {
      headers: {
        'Content-Type': 'application/json', 
        'charset': 'utf-8'
      },
      "method": "POST",
      "body": valuesNewUser,      
      }).then((response)=>{
        if(Response.ok){
          console.log('Registered: ', response);
          return response;
        }else{
          console.log('Not Registered: ', response);
          return response;
        }
      }).catch((error)=>{
        console.log('Error Ocurred: ', error);
      });
  }catch(error){
    console.log(error);
  }
}