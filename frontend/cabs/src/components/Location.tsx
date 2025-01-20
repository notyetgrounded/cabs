import { Button, Card } from "@mui/material";
import SearchLocation from "./SearchLocation";
import { useEffect, useState } from "react";
import { Map, Marker } from "maplibre-gl";
import { PlacesService } from "../services/PlacesService";
import globalContainer from "../services/DependencyContainer";
import { Predictions } from "../services/OlaMapsService";

export default function Location(props: any) {
  const [destination, setDesination] = useState<Predictions | null>(null);
  const [source, setSource] = useState<Predictions | null>(null);
  // const [destMarkerActive, setDestMarkerActive] = useState(true);
  // const [sourceMarkerActive, setSourceMarkerActive] = useState(false);
  const [destMarker, setDestMarker] = useState<Marker>();
  const [sourceMarker, setSourceMarker] = useState<Marker>();
  const [myMap, setMyMap] = useState<Map>();

  useEffect(() => {
    const placesSerice = globalContainer.resolve<PlacesService>("placesSerice");
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
      <Card style={{zIndex:'10', width:'fit-content'}}>
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
      </Card>
      <div id="map" style={{ height: "90vh", width: "100vw" }}></div>
    </div>
  );
}
