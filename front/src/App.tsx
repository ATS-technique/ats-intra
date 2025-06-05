import MyRouter from "./MyRouter";

function App() {
  console.log(import.meta.env.VITE_API_URL);
  return (
    <>
      <MyRouter />
    </>
  );
}

export default App;
