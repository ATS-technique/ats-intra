import { useState } from "react";
import { loginFields } from "../../constants/formFields";
import Input from "../inputs/input";
import FormAction from "../inputs/FormAction";
import pathAPI from "../../pathAPI";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const fields = loginFields;
const fieldsState: { [key: string]: string } = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

interface LoginComponentProps {
  handleError: (isError: boolean, errorMessage: string) => void;
}

export default function LoginComponent({ handleError }: LoginComponentProps) {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    authenticateUser();
  };

  const navigate = useNavigate();
  const { login } = useAuth();

  const authenticateUser = async () => {
    try {
      const response = await fetch(pathAPI.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginState),
      });

      const status = response.status;
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message);
      }
      // Gérer la réponse de l'API
      if (status === 200) {
        console.log("Login successful:", data);
        login(data.token, data.user.is_dark, data.user.name, data.user.id_user);
        navigate("/accueil");
      } else {
        console.log("Connexion échouée:", data);
        handleError(true, data);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      if (error instanceof Error) {
        handleError(true, error.message);
      } else {
        handleError(true, "Une  erreure incononue s est produite");
      }
    }
  };

  return (
    <div>
      <form className="mt-8 space-y-6">
        <div className="-space-y-px">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={loginState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
        </div>
        <FormAction handleSubmit={handleSubmit} text="Login" isDisabled={false} />
      </form>
    </div>
  );
}
