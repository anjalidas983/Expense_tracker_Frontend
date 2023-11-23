import React,{useContext,createContext,useState,useEffect} from "react";




const AuthContext=createContext()

export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}){
    const [accessToken,setAccessToken]=useState(localStorage.getItem('access') || null);

    const   login= (newAccessToken)=>{
         setAccessToken(newAccessToken)
         localStorage.setItem('access',newAccessToken);
    }

    const  logout=()=>{
        setAccessToken(null)
        localStorage.removeItem('access');
       
    }
   
    
    const isAuthenticated = !!accessToken;

    useEffect(() => {
      
      if (!localStorage.getItem("access")) {
        
        logout();
        

      }
    });


   
    return (
        <AuthContext.Provider value={{accessToken,login,logout,isAuthenticated}}>
            {children}

        </AuthContext.Provider>
        )

}
