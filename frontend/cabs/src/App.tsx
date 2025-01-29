import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CabBooking } from "./pages/CabBooking";
import globalContainer from "./services/DependencyContainer";

function App() {
  const [_, _s] = useState(()=>{
    chrome.tabs.query({url:chrome.runtime.getURL('index.html')}).then((tabs)=>{
      if(tabs.length===0)
      chrome.tabs.create({url:chrome.runtime.getURL('index.html')})
    })
    //return globalContainer.resolve("cabsService")
     });

  return (
    <>
    <CabBooking></CabBooking>
    </>
  );
}

export default App;
