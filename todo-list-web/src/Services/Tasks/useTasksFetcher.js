import { useMemo } from "react";
import { externalApiServerURL_v1 } from "../../Helper/Helper";
import { useAuthContext } from "../../Hooks/index"
import { useListsContext } from "../../Hooks/index";

export function useTasksFetcher() {
  const { user } = useAuthContext();
  const userId = user?.given_name;
  
  const { currentListId } = useListsContext();

  let data = null;
  fetch(`${externalApiServerURL_v1}/TaskList/ListId/${currentListId}/UserId/${userId}`, {      
    "headers": {
      'content-Type': 'application/json',
      'charset': 'uft-8',
    },
    "method": "GET",
    "signal": new AbortController().signal
  }).then((response) => {
    if(response.ok){
      data = response.json();      
    };
  }).catch((error) => console.log(error));

  const tasks =  useMemo(
    () => data ?? [],
    [data]
  );

  return { tasks };
};