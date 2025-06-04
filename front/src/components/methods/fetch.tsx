interface Action {
  method: string;
  Authorization: boolean;
  path: string;
  body: BodyInit | null | undefined | FormData | object;
}

export const FetchAPI = async (action: Action): Promise<object> => {
  const headers: Record<string, string> = {};

  // N'ajoute pas de Content-Type si body est FormData
  const isFormData = action.body instanceof FormData;

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }
  if (action.Authorization) {
    headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  }

  const options: RequestInit = {
    method: action.method,
    headers: headers,
  };

  if (action.body && action.method !== "GET" && !isFormData) {
    options.body = JSON.stringify(action.body);
  } else if (action.body && action.method !== "GET" && isFormData) {
    options.body = action.body instanceof FormData ? action.body : JSON.stringify(action.body);
  }
  const response = await fetch(action.path, options);
  const jsonResponse = await response.json();

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${jsonResponse.message || "Erreure Inconnue"}`);
  }
  return jsonResponse;
};
