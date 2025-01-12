import { ChromeService } from "./ChromeService";
import globalContainer from "./DependencyContainer";

export default class UberService {
  private netorkManager!: ChromeService;
  constructor() {
    this.netorkManager = globalContainer.resolve<ChromeService>(
      "cabsNetworkingService"
    );
    this.netorkManager.initilize("https://m.uber.com/go/home").subscribe();
  }
}
