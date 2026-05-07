//axios
//tanstack queries (production ready applications)
import { getAuthUser } from "../lib/api.js";

import { useQuery } from "@tanstack/react-query";
import React from 'react'

const useAuthUser = () => {
  
    
const authUser = useQuery({
  queryKey: ["authUser"],
  queryFn: getAuthUser,
  retry: false, //don't retry on failure
});

return {isLoading : authUser.isLoading, authUser : authUser.data?.user};

}

export default useAuthUser;










