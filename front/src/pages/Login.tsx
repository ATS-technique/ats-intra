import Header from "../components/login/Header";
import LoginComponent from "../components/login/LoginComponent";
import { useState, useEffect } from "react";
import DisplayError from "../components/Error/DisplayError";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/accueil");
    }
  });

  const handleError = (error: boolean, message: string) => {
    setError(error);
    setErrorMessage(message);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100">
      <div className={`p-10 border  rounded-lg w-[30vw] bg-white ${isError ? "border-red-500" : "border-neutral-200"}`}>
        {isError && (
          <div className="mb-8">
            <DisplayError errorMessage={errorMessage} />
          </div>
        )}
        <Header />
        <LoginComponent handleError={handleError} />
      </div>
    </div>
  );
}
