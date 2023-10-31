import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be  used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // provider is a component to englobal other components
  const [user, setUser] = useState(null); // this user will be readed by all the application
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => { //register
    try {
      const res = await registerRequest(user);

      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
      // console.log(error.response.data);
      // setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => { //login
    try {
      const res = await loginRequest(user);
      console.log(res);

      setUser(res.data);
      setIsAuthenticated(true);

    } catch (error) {
      if (Array.isArray(error.response.data)) {
        console.log('errrrorrrr');
        console.log(error);
        return setErrors(error.response.data);
      }
      console.log('errrroradsfasdfasdfasdfasdfasdrrr');
      console.log(error);
      setErrors([error.response.data.message]);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  }

  //the problem with this  useEffect to hide errors after 5 seconds is that using timers in react is a little dangerous
  // it consume resources, so the best way to handle it is like below
  // useEffect(() => {
  //   if(errors.length > 0) {
  //     setTimeout(() => {
  //       setErrors([]);
  //     }, 5000);
  //   }
  // },[errors])

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
        // return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);

        if (!res.data) {
          setIsAuthenticated(false);
          // setLoading(false);
          return;
        } 

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
    
      } catch (error) {
        // console.log(error);
        setIsAuthenticated(false);
        // setUser(null);
        setLoading(false);
      }
    }
    checkLogin()
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup, //This signup will be exported, means that wathever can use it
        signin,
        loading,
        logout,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
