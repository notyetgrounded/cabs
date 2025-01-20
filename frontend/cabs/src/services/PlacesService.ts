import { Map } from "maplibre-gl";
import { OlaMapsService, Predictions } from "./OlaMapsService";
import  globalContainer  from "./DependencyContainer";
export class PlacesService {
constructor(){}
  getPlaces(input: string, callback: (result: Predictions[]) => void) {
    return globalContainer.resolve<OlaMapsService>("olaMapsService").getPlacesFromOla(input, callback);
  }

  CreateMap(mapOptions: {
    container: string;
    center: [lng: number, lat: number];
    zoom: number;
  }): Map {
    return globalContainer.resolve<OlaMapsService>("olaMapsService").getOlaMaps().init({
      style:
        "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: mapOptions.container,
      center: mapOptions.center,
      zoom: mapOptions.zoom,
    });
  }
}
