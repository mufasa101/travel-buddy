import axios from "axios";
 export const getPlacesData = async (type, sw, ne) => {
  const url= `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;

  try {
  const {data:{data}}=await axios.get(url,{
    method: 'GET',

    params: {
      bl_latitude: sw.lat,
      bl_longitude: sw.lng,
      tr_longitude: ne.lng,
      tr_latitude: ne.lat,
    },
    headers: {
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY
    }
  });
  return data

}catch(error){
  console.log(error);
}













