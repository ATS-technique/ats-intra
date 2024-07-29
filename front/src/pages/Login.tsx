import Header from "../components/login/header";
import LoginComponent from "../components/login/LoginComponent";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-gray-100">
      <div className="p-10 border border-neutral-200 rounded-lg w-[30vw] bg-white">
        <Header />
        <LoginComponent />
      </div>
    </div>
  );
}
