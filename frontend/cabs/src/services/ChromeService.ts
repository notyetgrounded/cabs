import { from, of, switchMap } from "rxjs";
import content from "./Content";

export class ChromeService {
  constructor() {}

  initilize(baseUrl: string) {
    console.log("creating tab with url", baseUrl);
    return this.getOrCreateTab(baseUrl).pipe(
      switchMap((tab) => this.injectScript(tab.id ?? 0))
    );
  }
  private getOrCreateTab(baseUrl: string) {
    return from(chrome.tabs.query({ url: baseUrl })).pipe(
      switchMap((tabs) => {
        if (tabs.length > 0) return of(tabs[0]);
        return chrome.tabs.create({ url: baseUrl });
      })
    );
  }
  private injectScript(tabId: number) {
    console.log("injecting script in the tab", tabId);
    return from(chrome.debugger.attach({ tabId: tabId }, "1.3")).pipe(
      switchMap(() => {
        return chrome.debugger.sendCommand(
          { tabId: tabId },
          "Runtime.evaluate",
          {
            expression: `
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
    });`,
          }
        );
      }),
      switchMap(() => {
        console.log("injected and detaching");
        return chrome.debugger.detach({ tabId: tabId });
      })
    );
  }
}
