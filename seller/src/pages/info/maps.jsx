import React, { useRef } from 'react'
import { useJsApiLoader, GoogleMap, Marker, Autocomplete } from "@react-google-maps/api"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

function Maps({ mapRef, location, setLocation, viewOnly }) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_KEY,
        libraries: ['places']
    })

    const autocompleteRef = useRef();

    if (!isLoaded) {
        return <p>Loading...</p>
    }

    function handleLoad(map) {
        mapRef.current = map;
    }



    function handleCenterChanged() {
        if (!mapRef.current) return;
        const newPos = mapRef.current.getCenter().toJSON();
    }

    const onLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete
    }

    const onPlaceChanged = () => {
        const place = autocompleteRef.current.getPlace()
        setLocation(place.geometry.location.toJSON())
    }

    const onLoadMarker = marker => {
        console.log('marker: ', marker)
    }



    return (
        <div style={{
            height: '100vh',
            width: "100%"
        }}>
            <GoogleMap
                mapContainerStyle={{
                    height: "100%",
                    width: "100%"
                }}
                id="map"
                center={location}
                zoom={16}
                onLoad={handleLoad}
                onCenterChanged={handleCenterChanged}
            >
                {
                    !viewOnly && <img
                        src="https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png"
                        alt="marker"
                        className='absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-1 object-contain'
                        style={{
                            height: "50px",
                            width: "50px"
                        }}
                    />
                }
                {
                    !viewOnly &&
                    <div>
                        <div class="absolute top-[60px] right-[10px] left-[10px] ">
                            <Autocomplete
                                onLoad={onLoad}
                                onPlaceChanged={onPlaceChanged}
                            >
                                <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Place here" required={false} />
                            </Autocomplete>

                        </div>
                    </div>
                }


                {
                    viewOnly &&
                    <Marker
                        icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                        position={location}

                    />
                }

            </GoogleMap>
        </div>
    )
}

export default Maps