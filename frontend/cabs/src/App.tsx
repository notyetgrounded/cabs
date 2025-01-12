import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CabBooking } from "./pages/CabBooking";
import globalContainer from "./services/DependencyContainer";

function App() {
  const [_, _s] = useState(()=>{
    chrome.tabs.query({url:'index.html'}).then((tabs)=>{
      if(tabs.length===0)
      chrome.tabs.create({url:chrome.runtime.getURL('index.html')})
    })
    return globalContainer.resolve("cabsService")});

  return (
    <>
      <CabBooking></CabBooking>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  );
}

export default App;
