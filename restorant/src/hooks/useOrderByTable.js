import {useEffect} from "react";
import apiFetch from "../api/api.js";

const useOrderByTable = (tableId, setOrderByTable) => {
    useEffect(() => {
        if (!tableId) return;

        const fetchOrder = async () => {
            try {
                // const res = await fetch(`http://127.0.0.1:8000/order/${tableId}/`);
                const data = await apiFetch(`/order/${tableId}/`);
                // const data = await res.json();
                setOrderByTable(data);
            } catch (err) {
                console.error(err);
            }
        }

        fetchOrder();
    }, [tableId, setOrderByTable]);
}

export default useOrderByTable;