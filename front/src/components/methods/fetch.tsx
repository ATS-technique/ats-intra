
interface Action {
    method: string;
    Authorization: boolean;
    path: string;
    body: object;
}

export const FetchAPI = async (action: Action): Promise<object> => {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    
    if (action.Authorization) {
        headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    }

    const options: RequestInit = {
        method: action.method,
        headers: headers,
    };

    if (action.body && action.method !== "GET") {
        options.body = JSON.stringify(action.body);
    }
    const response = await fetch(action.path, options);
    const jsonResponse = await response.json();

    if (!response.ok ) {
        throw new Error(`Error ${response.status}: ${jsonResponse.message || 'Erreure Inconnue'}`);
    }

    if(action.method === "GET"){
        return jsonResponse ;
    }else{
        return jsonResponse.message ;
    }
}