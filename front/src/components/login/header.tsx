import LogoATS from "../../assets/Logos/horizontal-logo.png";

export default function Header() {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img alt="" className="h-14 w-auto" src={LogoATS} />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connexion</h2>
    </div>
  );
}
