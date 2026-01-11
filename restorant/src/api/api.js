// const BASE_URL = "http://localhost:8000";
//
// const apiFetch = async (endpoint, options = {}) => {
//     const isFormData = options.body instanceof FormData;
//     const method = (options.method || "GET").toUpperCase()
//     if (method === 'POST' && isFormData) {
//         console.log("VO POST and isForm")
//         const response = await fetch(`${BASE_URL}${endpoint}`, {
//             credentials:'include',
//             method: method,
//             body: options.body
//         });
//         console.log(response)
//         if (!response.ok) {
//             throw new Error(`API error: ${response.status}`);
//         }
//         return response.json();
//
//     } else if (method === 'POST') {
//         console.log("VO POST")
//         await fetch(`${BASE_URL}${endpoint}`, {
//             method: method,
//             body: options.body
//         });
//     }else{
//         const response = await fetch(`${BASE_URL}${endpoint}`, {
//             credentials: "include",
//             headers: isFormData
//                 ? options.headers
//                 : {
//                     "Content-Type": "application/json",
//                     ...options.headers,
//                 },
//             ...options,
//         });
//         if (!response.ok) {
//             throw new Error(`API error: ${response.status}`);
//         }
//
//         return response.json();
//     }
// };

// export default apiFetch;
const BASE_URL = import.meta.env.VITE_API_URL;
console.log("API",BASE_URL)

const apiFetch = async (endpoint, options = {}) => {
    const url = `${BASE_URL}${endpoint}`;
    const method = (options.method || "GET").toUpperCase();
    const headers = { ...(options.headers || {}) };
    const isFormData = options.body instanceof FormData;

    const expectResponse = options.expectResponse ? options.expectResponse : true
    let body = options.body;
    if (body && !isFormData && typeof body === "object" && !(body instanceof Blob)) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(body);
    }

    const credentials= options.credentials === false ? 'omit' : options.credentials ?? 'include';
    const res = await fetch(url, {
        ...options,
        method,
        headers,
        body,
        credentials
    });
    console.log("Res",res)
    if (!expectResponse){
        return null
    }

    // Пробај да прочиташ JSON, ако не - текст
    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await res.json()
        : await res.text();
    if (!res.ok) {
        const msg =
            typeof data === "string"
                ? data
                : (data?.errors || data?.detail || `API error: ${res.status}`);
        throw new Error(msg);
    }

    return data;
};

export default apiFetch;
