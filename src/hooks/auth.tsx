import { useEffect, useState, createContext, ReactNode, useContext } from "react";
import { auth } from '../utils/firebase'

const initialValue: {user: any| null} = {user:null};

export const AuthContext = createContext(initialValue);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: {children:ReactNode}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    auth.onAuthStateChanged((usr) => {
        console.log(usr);
      setUser(usr)});
  }, []);

  return <AuthContext.Provider value={{ user }}> {children} </AuthContext.Provider>
};


