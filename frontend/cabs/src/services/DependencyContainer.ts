import { asClass, createContainer } from "awilix"
import { OlaMapsService } from "./OlaMapsService"
import { PlacesService } from "./PlacesService"
import { ChromeService } from "./ChromeService"
import OlaService from "./UberService"
import UberService from "./UberService"
import CabsService from "./CabsSerivce"

 const globalContainer = createContainer()
 
// globalContainer.register(OlaMapsService.name,asClass(OlaMapsService).singleton())
// globalContainer.register(PlacesSerice.name,asClass(PlacesSerice).singleton())
globalContainer.register({
    placesSerice:asClass(PlacesService),
    olaMapsService:asClass(OlaMapsService),
    // olaService:asClass(OlaService),
    // uberService:asClass(UberService),
    //cabsService:asClass(CabsService)
    
})

export default globalContainer;