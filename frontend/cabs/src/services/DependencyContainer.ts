import { asClass, createContainer } from "awilix"
import { OlaMapsService } from "./OlaMapsService"
import { PlacesService } from "./PlacesService"

 const globalContainer = createContainer()
 
// globalContainer.register(OlaMapsService.name,asClass(OlaMapsService).singleton())
// globalContainer.register(PlacesSerice.name,asClass(PlacesSerice).singleton())
globalContainer.register({
    placesSerice:asClass(PlacesService),
    olaMapsService:asClass(OlaMapsService),
    // olaService:asClass(OlaService),
    // uberService:asClass(UberService),
    // cabsService:asClass(CabsService)
    
})

export default globalContainer;