import {useEffect, useState} from "react";
import apiFetch from "../api/api.js";

const useYourOrder = (tableId) => {
    const [order,setOrder] = useState([]);
    useEffect(() => {
        // fetch(`http://127.0.0.1:8000/your_order/${tableId}/`)
        //     .then(res => res.json())
        apiFetch(`/your_order/${tableId}/`)
            .then(data => {
                setOrder(data);
            })
    }, [tableId])
    return order;
}

export default useYourOrder;