import axios from "axios";
import { useEffect, useState } from "react";




export function loadImage() {
    const state = useState([]);
    useEffect(() => {
        const result = axios.get(`${url}${api}&page=${page}`)
        console.log(result)
    }, []);

    return state;
}

