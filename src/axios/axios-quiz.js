import axios from "axios";

export default axios.create({
    baseURL: 'https://quizes-react-default-rtdb.europe-west1.firebasedatabase.app'
})