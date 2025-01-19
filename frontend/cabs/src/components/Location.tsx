import { Button, Card, colors } from "@mui/material";
import SearchLocation from "./SearchLocation";
import { useContext, useEffect, useState } from "react";
import { LngLat, Map, Marker } from "maplibre-gl";
import { PlacesSerice } from "../services/PlacesSerice";
import globalContainer from "../services/DependencyContainer";
import { Predictions } from "../services/OlaMapsService";
import './Location.css';

export default function Location(props: any) {
  const [destination, setDesination] = useState<Predictions | null>(null);
  const [source, setSource] = useState<Predictions | null>(null);
  const [destMarkerActive, setDestMarkerActive] = useState(true);
  const [sourceMarkerActive, setSourceMarkerActive] = useState(false);
  const [destMarker, setDestMarker] = useState<Marker>();
  const [sourceMarker, setSourceMarker] = useState<Marker>();
  const [myMap, setMyMap] = useState<Map>();

  useEffect(() => {
    const placesSerice = globalContainer.resolve<PlacesSerice>("placesSerice");
    const map = placesSerice.CreateMap({
      container: "map",
      center: [77.61648476788898, 12.931423492103944],
      zoom: 15,
    });
    setMyMap(map);

    if (map) {
      let desMarker = new Marker({ color: "blue", draggable: true })
        .setLngLat([77.61648476788898, 12.931423492103944])
        .addTo(map);
      desMarker.on('dragend',(ob)=>{
        let res= map.queryRenderedFeatures(ob.point
        );
        res;
      })
      setDestMarker(desMarker);
      let srcMarker = new Marker({ color: "red", draggable: true })
        .setLngLat([77.61648476788898, 12.931423492103944])
        .addTo(map);

      setSourceMarker(srcMarker);
    }
  }, []);
  useEffect(() => {
    if (destination && myMap && destMarker)
    {
      destMarker
        .setLngLat([
          destination.geometry.location.lng,
          destination.geometry.location.lat,
        ])
        myMap.setCenter([
          destination.geometry.location.lng,
          destination.geometry.location.lat,
        ])
      };
  }, [destination]);
  useEffect(() => {
    if (source && myMap && sourceMarker) {
      sourceMarker
        .setLngLat([source.geometry.location.lng, source.geometry.location.lat]);
        myMap.setCenter([
          source.geometry.location.lng,
          source.geometry.location.lat,
        ])
        myMap.queryRenderedFeatures
    }
  }, [source]);

  return (
    <div>
      <div  className="user-input-container">
        <SearchLocation
          label={"Destination"}
          location={setDesination}
          // active={setDestMarkerActive}
        ></SearchLocation>
        <SearchLocation
          label={"Source"}
          location={setSource}
          // active={setSourceMarkerActive}
        ></SearchLocation>
        {source !== null && destination !== null && (
          <Button onClick={() => props.UpdateCoordinates(destination, source)}>
            check pricing
          </Button>
        )}
      </div>
      <div id="map" className="map-container"></div>
    </div>
  );
}
