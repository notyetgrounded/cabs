import { ChromeService } from "./ChromeService";
import globalContainer from "./DependencyContainer";

export default class OlaService {
  private netorkManager!: ChromeService;
  constructor() {
    this.netorkManager = globalContainer.resolve<ChromeService>(
      "cabsNetworkingService"
    );
    this.netorkManager.initilize("https://book.olacabs.com/").subscribe();
  }
}
