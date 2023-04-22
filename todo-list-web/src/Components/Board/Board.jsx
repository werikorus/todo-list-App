import React, {useRef, useEffect, useState} from "react";
import { useStyles } from  "./BoardStyles";
import { ItemsTasks1, ItemsTasks2 } from "../../Mock/ItemsTasksMock";
import CardTasks from "../CardTasks/CardTasks";
import CardFooter from "../CardFooter/CardFooter";
import Aside from "../Aside/Aside";
import { getListsByUserId } from "../../Services/ListsAPI";

const Board = (prop) =>{
  const classes = useStyles();  
  const list = useRef([]);
  const [currentLists, setCurrentLists] = useState([]);
  const idUser = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
  
  useEffect(()=>{(
    async () =>{
      const data = await getListsByUserId(idUser);
      list.current = data;
      setCurrentLists(list.current);
    })();
  },[]);

  return(
    <div className={classes.boardArea}>
      <Aside Items={currentLists}/>
      <ul className={classes.areaItems}>
        {ItemsTasks1.map((item, key) => 
          <CardTasks 
            item={item} 
            key={key} 
            idItem={item.id}
          />
        )}        
      </ul>       
      <CardFooter />           
    </div>
  );
};

export default Board;
