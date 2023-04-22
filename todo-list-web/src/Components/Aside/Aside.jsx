import React, { useState, useEffect } from "react";
import { useStyles } from "./AsideStyles"; 
import CardLists from "../CardLists";
import ButtonAction from "../ButtonAction";
import { getListsByUserId } from "./../../Services/ListsAPI";

import { useRef } from "react";

const Aside = (props) => {  
  const classes = useStyles();
  const [currentUserId, setCurrentUserId] = useState('');

  const handleGetListByUserId = (userId) => {
    console.log('User id:', userId);
  }
  
  const handleCurrentUserID = (userId, currentListDescription) =>{
    console.log('Current List: ', currentListDescription)
    //setCurrentUserId(userId);
  }

  const handleNewList = () => {
    window.alert('Not implemented yet!');
  }

  return(   
    <aside className={classes.aside}>
      <span>
        {props.Items.length > 0 
          ? "My Lists" 
          : "You haven't any list yet. Create your first one!"
        }
      </span>      
      <ul className={classes.ul}>
      <hr /> 
        {(props.Items.length === 1)
          ? <CardLists 
              title={props.Items.descriptionList} 
              key={props.Items.id}
            />
          : props.Items.map((item, _key) => (
            <CardLists 
              title={item.descriptionList} 
              key={item.id} 
              getTasks={handleCurrentUserID(item.idUser, item.descriptionList)}
            />
          ))}           
        </ul>     
        <br />    
      <ButtonAction 
        txt="Add new List!" 
        clickEvent={handleGetListByUserId(props.Items)}        
      />
    </aside>
  );
};

export default Aside;
