import { API_URL } from "../config.jsx";

export default function getImage() {
  return fetch(`${API_URL}/image`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
}
