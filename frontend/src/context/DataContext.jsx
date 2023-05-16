import { createContext, useState } from "react";
import Axios from 'axios';



export const DataContext = createContext();

export const ContextProvider = ({ children }) => {

    const addAppointment = (inputs) => {
        Axios.post(`http://localhost:8000/api/posts/`, inputs).then((response) => {
            console.log(response)
        }).catch((err) => console.log(err));
    }
    const updateAppointment = (id,inputs) => {
        Axios.put(`http://localhost:8000/api/posts/${id}`, inputs).then((response) => {
            console.log(response)
        }).catch((err) => console.log(err));
    }

    return (
        <DataContext.Provider value={{  addAppointment, updateAppointment }}>
            {children}
        </DataContext.Provider>
    );
}