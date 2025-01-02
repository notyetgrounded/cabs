import { asClass, createContainer } from "awilix"
import { OlaMapsService } from "./OlaMapsService"
import { PlacesSerice } from "./PlacesSerice"

 const globalContainer = createContainer()
 
// globalContainer.register(OlaMapsService.name,asClass(OlaMapsService).singleton())
// globalContainer.register(PlacesSerice.name,asClass(PlacesSerice).singleton())
globalContainer.register({
    placesSerice:asClass(PlacesSerice),
    olaMapsService:asClass(OlaMapsService),
    
})

export default globalContainer;