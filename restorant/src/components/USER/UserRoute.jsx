import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import apiFetch from "../../api/api.js";

const UserRoute = ({children})=>{
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        apiFetch("/check-auth/", { credentials: "include" })
            .then(data => {
                console.log("CHECK AUTH (frontend)", data);
                setStatus(data.is_authenticated ? "ok" : "denied");
            })
            .catch(err => {
                console.log("CHECK AUTH ERROR", err);
                setStatus("denied");
            });
    }, []);

    if (status === "loading") return <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
    if (status === "denied") return <Navigate to="/login" replace />;

    return children;
};

export default UserRoute;
