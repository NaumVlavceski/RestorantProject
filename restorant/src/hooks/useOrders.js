import { useState, useEffect, useCallback } from "react";
import apiFetch from "../api/api.js";

const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const fetchOrders = useCallback(async () => {
        try {
            const data = await apiFetch("/orders/");
            setOrders(data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    }, []);

    useEffect(() => {
        fetchOrders();

        // Fetch orders на секои 5 секунди за real-time ажурирање
        const intervalId = setInterval(fetchOrders, 2000);

        // Слушај за custom events
        const handleOrdersUpdated = () => {
            fetchOrders();
        };

        window.addEventListener("ordersUpdated", handleOrdersUpdated);

        return () => {
            clearInterval(intervalId);
            window.removeEventListener("ordersUpdated", handleOrdersUpdated);
        };
    }, [fetchOrders]);

    return orders;
};

export default useOrders;