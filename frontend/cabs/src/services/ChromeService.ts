import { from, map, of, switchMap, tap } from "rxjs";
import content from "./Content";

export class ChromeService {
  private tabId: number = 0;
  constructor() {}

  initilize(baseUrl: string) {
    console.log("creating tab with url", baseUrl);
    return this.getOrCreateTab(baseUrl).pipe(
      tap((tab) => (this.tabId = tab.id ?? 0)),
      switchMap((tab) => this.injectScript(tab.id ?? 0))
    );
  }
  private getOrCreateTab(baseUrl: string) {
    return from(chrome.tabs.query({ url: baseUrl })).pipe(
      switchMap((tabs) => {
        console.log("tab count ", tabs.length, baseUrl,tabs);
        if (tabs.length > 0) return of(tabs[0]);
        return from(chrome.tabs.create({ url: baseUrl }));
      })
    );
  }
  private injectScript(tabId: number) {
    // Read the content.js script from the file system (you can use fetch or get URL)

    return from(
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: () => {
          // Safe script that doesn't depend on CSP
          console.log("Executing script in the page context");

          chrome.runtime.onMessage.addListener(
            (message, sender, sendResponse) => {
              console.log(message);
              if (message.type === "fetchData") {
                fetch(message.input, message.init)
                  .then((response) => response.json())
                  .then((data) => sendResponse({ status: "success", data }))
                  .catch((error) =>
                    sendResponse({ status: "error", error: error.message })
                  );
                return true; // Indicates async response
              }
            }
          );
        },
      })
    );
  }

  fetch<T>(input: RequestInfo | URL, init?: RequestInit) {
    return from(
      chrome.tabs.sendMessage(
        this.tabId, // The target tab ID
        { type: "fetchData", input, init } // Message payload
      )
    ).pipe(
      map((reply) => {
        console.log(reply);
        return reply.data as T;
      })
    );
  }

  getCookie(url: string, name: string) {
    return from(chrome.cookies.get({ url, name }));
  }
}
