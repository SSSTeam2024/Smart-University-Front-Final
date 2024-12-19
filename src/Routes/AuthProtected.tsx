import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "Common/Hooks/UserHooks";

import { logoutUser } from "slices/thunk";
import axios from 'axios';
import { setCredentials } from "features/account/authSlice";

import Cookies from 'js-cookie';
import { useGetUserMutation } from "features/account/accountSlice";
import { selectCurrentUser } from "features/account/authSlice";
import { RootState } from "../app/store";


import { useSelector } from 'react-redux';
import { useFetchUserPermissionsByUserIdQuery } from "features/userPermissions/userPermissionSlice";

const AuthProtected = (props: any) => {

  const [canAccess, setCanAccess] = useState<boolean | null>(null);
  const urlPath = window.location.pathname;

const tokenc = Cookies.get('astk');
const dispatch = useDispatch();

useEffect(() => {
  if (!tokenc) {
    setCanAccess(false);
  } else {
    axios.post(`${process.env.REACT_APP_API_URL}/user/get-user-by-token`, {
      token: tokenc,
    })
    .then((res: any) => {
      const user = {
        user: res 
      };
      dispatch(setCredentials(user));
      if(urlPath === "/"){
        setCanAccess(true);
      } else if(urlPath !== "/"){
        const access = res.permissions.some((permission: any) => permission.path === urlPath);
      setCanAccess(access);
      }
    })
    .catch(() => {
      setCanAccess(false);
    });
  }
}, [tokenc, urlPath, dispatch]);

if (canAccess === null) {
  return <div>Loading...</div>;
}

if (canAccess === false) {
  if(!tokenc){
    return <Navigate to="/login" />;
  } else if(tokenc)
  return <Navigate to="/login" />;
}

return <>{props.children}</>;
};


const AccessRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };

// import React, { useEffect } from "react";
// import { Navigate, Route } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Cookies from 'js-cookie';
// import { useSelector } from 'react-redux';
// import { RootState } from "../app/store";
// import { useFetchUserPermissionsByUserIdQuery } from "features/userPermissions/userPermissionSlice";
// import { selectCurrentUser, setCredentials } from "features/account/authSlice";

// const AuthProtected = (props: any) => {
//   const user: any = useSelector((state: RootState) => selectCurrentUser(state));
//   const { data: userPermissions, isError, isLoading } = useFetchUserPermissionsByUserIdQuery({ userId: user?._id });

//   const tokenc = Cookies.get('astk');
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchUserByToken = async () => {
//       if (tokenc) {
//         try {
//           const rawResponse = await fetch('http://localhost:5000/api/user/get-user-by-token', {
//             method: 'POST',
//             headers: {
//               'Accept': 'application/json',
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${tokenc}`
//             }
//           });
          
//           const content = await rawResponse.json();
//           dispatch(setCredentials({ user: content }));
//           console.log("Fetched user:", content);
         
//         } catch (error) {
//           console.error('Error fetching user by token:', error);
//         }
//       }
//     };

//     fetchUserByToken();
//   }, [tokenc, dispatch]);

//   if (!tokenc) {
//     return <Navigate to="/login" />;
//   }

//   // Determine if the current route is authorized based on user permissions
//   const isAuthorized = (currentPath: string) => {
//     if (!userPermissions) {
//       return false; // No permissions loaded yet
//     }

//     // Extract paths from user permissions
//     const authorizedPaths = userPermissions.map(permission => permission.path);
//     console.log("authorizedPaths",authorizedPaths)

//     // Check if current path is in authorized paths
//     return authorizedPaths.includes(currentPath);
//   };

//   // Render children if authorized, otherwise redirect to unauthorized page
//   if (isError || isLoading || !isAuthorized(props.path)) {
//     return <Navigate to="/auth-404" />;
//   }

//   return <>{props.children}</>;
// };

// const AccessRoute = ({ component: Component, ...rest }: any) => {
//   return (
//     <Route
//       {...rest}
//       render={(props: any) => <Component {...props} />}
//     />
//   );
// };

// export { AuthProtected, AccessRoute };