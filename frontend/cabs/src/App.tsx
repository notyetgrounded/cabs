import { useEffect } from "react";
import "./App.css";
import { CabBooking } from "./pages/CabBooking";

function App() {
  useEffect(() => {
    chrome.tabs.query({url:chrome.runtime.getURL('index.html')}).then((tabs)=>{
      if(tabs.length===0)
      chrome.tabs.create({url:chrome.runtime.getURL('index.html')})
    })}, [])

  return (
    <>
    <CabBooking></CabBooking>
    </>
  );
}

export default App;
