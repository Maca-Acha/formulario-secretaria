import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";

export const Mapa = withScriptjs(withGoogleMap(() =>
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{ lat: -34.61315, lng: -58.37723 }} 
        >
            <Marker position={{ lat: -34.61315, lng: -58.37723 }} /> 
        </GoogleMap>
        ));

export const AutocompletarDireccion = withGoogleMap((props) => 
    <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        onPlacesChanged={props.onPlacesChanged}
    >
        <input
        type="text"
        placeholder="Buscar dirección"
        style={{ width: "100%" }}
        />
    </StandaloneSearchBox>
    );


/* import {Mapa, AutocompletarDireccion} from "./Mapa" */

/* const onSearchBoxMounted = (ref) => {
    this.searchBox = ref;
};

const onPlacesChanged = () => {
const places = this.searchBox.getPlaces();
console.log(places); // Aquí puedes manejar la selección de la dirección
}; */

/* <div>
    <Mapa
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=places`} // Reemplaza TU_API_KEY por tu clave de API de Google Maps
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
    <AutocompletarDireccion
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&libraries=places`} // Reemplaza TU_API_KEY por tu clave de API de Google Maps
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `40px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        onSearchBoxMounted={onSearchBoxMounted}
        onPlacesChanged={onPlacesChanged}
    />
</div> */