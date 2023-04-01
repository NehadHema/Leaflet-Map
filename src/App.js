import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import tesla from './data/testadata.json';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const[leaflet,setLeaflet] = useState([]);
  async function getData() {
    let {data} = await axios.get('https://data.sfgov.org/resource/wr8u-xric.json', {
      params: {
        "$limit": 500,
        "$app_token": ''
      }
    });
    console.log(data.results);
    setLeaflet(data.results);
  }

  useEffect(()=>{
    getData();
  },[]);

// console.log(tesla);
  return (
    <>
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
  
  {leaflet.map(leaf=>{
  <Marker key={leaf.id}
   position={[leaf.geo.latitude, leaf.geo.longitude]}>
   <Popup position={[leaf.geo.latitude, leaf.geo.longitude]}>
     <div>
      <h2>{leaf.name}</h2>
      <p>{leaf.description}</p>
     </div>
   </Popup>
    </Marker>}
   
   ) }
</MapContainer>
    
    </>
  );
}

export default App;
