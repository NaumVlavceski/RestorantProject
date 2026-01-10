import {useEffect, useState} from "react";
import apiFetch from "../api/api.js";

const useOrderSingleByTable = (tableId) => {
    const [order,setOrder] = useState([]);
    useEffect(() => {
        // fetch(`http://127.0.0.1:8000/order/${tableId}/`)
        apiFetch(`/order/${tableId}/`)
            // .then(res => res.json())
            .then(data => {
                setOrder(data);
            })
    }, [tableId])
    return order;
}

export default useOrderSingleByTable;