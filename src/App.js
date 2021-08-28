import React,{useEffect,useState} from "react";
import Header from "./components/Header/Header";
import {getPlacesData} from './api'
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { CssBaseline, Grid } from "@material-ui/core";
function App() {
  const [places,setPlaces]=useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);
  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    if (bounds) {
      setIsLoading(true);

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          console.log(data);
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
          setRating('');
          setIsLoading(false);
        });
    }
  }, [type, bounds]);
  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();

    setCoords({ lat, lng });
  };

  return (
    <div>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad}></Header>
      <Grid container direction="row" spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List 
           isLoading={isLoading}
             places={filteredPlaces.length ? filteredPlaces : places}
           childClicked={childClicked}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          
          
          ></List>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
          setChildClicked={setChildClicked}
          setBounds={setBounds}
          setCoords={setCoords}
          coords={coords}
          places={filteredPlaces.length ? filteredPlaces : places}
          ></Map>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
