import ProbeCard from "./components/ProbeCard.jsx";

function App() {
  return (
    <>
      <h1>Voyager en direct</h1>
      <ProbeCard probe="voyager1" label="Voyager 1" />
      <ProbeCard probe="voyager2" label="Voyager 2" />
    </>
  );
}

export default App;
