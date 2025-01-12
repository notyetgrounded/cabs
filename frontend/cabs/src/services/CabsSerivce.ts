import globalContainer from "./DependencyContainer";
import OlaService from "./OlaService";
import UberService from "./UberService";

export class CabsService {
  private olaService: OlaService;
  private uberService: UberService;
  constructor() {
    this.olaService = globalContainer.resolve("olaService");
    this.uberService = globalContainer.resolve("uberService");
    
  }
}
