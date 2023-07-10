import Axios from "axios";

const fetchIpInfo = async () => {
  try {
    const { data } = await Axios.get("https://geolocation-db.com/json/");

    // return data;
    const {
      country_code,
      country_name,
      city,
      postal,
      latitude,
      longitude,
      IPv4,
      state,
    } = data;

    return {
      country_code: country_code ? country_code : "",
      country_name: country_name ? country_name : "",
      city: city ? city : "",
      postal: postal ? postal : "",
      latitude: latitude ? latitude : "",
      longitude: longitude ? longitude : "",
      IPv4: IPv4 ? IPv4 : "",
      state: state ? state : "",
    };
  } catch (err) {
    console.log(err);
  }
};
export { fetchIpInfo };
