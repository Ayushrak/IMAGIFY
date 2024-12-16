import { createContext, useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const [user, setUser] = useState(false);
    const [showLogin,setShowLogin] = useState(false);
    const [token,setToken] = useState(localStorage.getItem("toke"));
    const [credit,setCredit] = useState(false);


    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const navigate = useNavigate();

    const loadCreditsData = async () => {
        try {
            console.log("Token:", token); // Debugging
            const { data } = await axios.get(backendUrl + "/api/user/credits", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("API Response:", data);
            if (data.success) {
                setCredit(data.credits);
                setUser(data.user);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 401) {
                logout();
            } else {
                toast.error(error.message);
            }
        }
    };

    const generateImage = async (prompt)=>{
        try {
            const {data} = await axios.post(backendUrl + "/api/image/generate-image",{prompt},{headers:{
                Authorization: `Bearer ${token}`
            }});
            console.log(data);
            if(data.success){
                loadCreditsData();
                return data.resultImage;
            }
        } catch (error) {
            toast.error(data.message);
            loadCreditsData();
            if(data.creditBalance === 0){
                navigate("/buy");
            }
        }
    }

    useEffect(()=>{
        if(token){
            loadCreditsData();
        }
    },[token])

    const logout = ()=>{
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
    }

    const value = { user, setUser, showLogin, setShowLogin ,backendUrl , token,setToken,credit,setCredit , loadCreditsData,logout,generateImage  };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
