
import { OlaMaps } from "../assets/OlaMaps/OlaMapsWebSDK";

const API_Key = "";

export class OlaMapsService {
  constructor(){}
  getPlacesFromOla(input: string, callback: (result: Predictions[]) => void) {
    return fetch(
      `https://api.olamaps.io/places/v1/autocomplete?input=${input}&api_key=${API_Key}`
    )
      .then((response: Response) => {
        return response.json();
      })
      .then((result: OlaAutoCompleteResponse) => callback(result.predictions));
  }

  getOlaMaps() {
    return new OlaMaps({
      apiKey: API_Key,
    });
  }
}



//few prperties are left out as they are not needed now
export interface Predictions {
  structured_formatting: {
    main_text_matched_substrings: {
      offset: number;
      length: number;
    }[];
    secondary_text: string;
    main_text: string;
  };
  description: string;
  geometry: {
    location: {
      lng: number;
      lat: number;
    };
  };
}

interface OlaAutoCompleteResponse {
  predictions: Predictions[];
  info_messages: [];
  error_message: string;
  status: string;
}
