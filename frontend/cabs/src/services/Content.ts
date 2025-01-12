export default function content():string {
  return `
  console.log("injected the code");
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log("Message received in content script:", message);

      // Handle different message types
      switch (message.type) {
        case "executeScript":
          // Example: Execute a custom script
          try {
            const result = eval(message.script); 
            console.log("Script executed:", result);

            // Send the result back to the extension
            sendResponse({ status: "success", result });
          } catch (error: any) {
            console.error("Error executing script:", error);
            sendResponse({ status: "error", error: error.message });
          }
          break;

        case "fetchData":
          // Example: Perform a network fetch
          fetch(message.url, { method: "GET" })
            .then((response) => response.json())
            .then((data) => {
              console.log("Data fetched:", data);

              // Send the data back to the extension
              sendResponse({ status: "success", data });
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              sendResponse({ status: "error", error: error.message });
            });
          break;

        default:
          // Unknown message type
          console.warn("Unknown message type:", message.type);
          sendResponse({ status: "error", error: "Unknown message type" });
      }

      return true;
    });`;
}
