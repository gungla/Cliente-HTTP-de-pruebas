const axios = require('axios')

const url = 'http://localhost:8080/productos';
const urlModify = 'http://localhost:8080/productos/3';


let producto = {
    id: 4,
    nombre: 'AMCF1 OFFICIAL TEAM POLO', 
    codigo: 1376, 
    precio: 65,
    stock: 5
}

const axiosGet = async () => {
    try {
        const resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.log(err);
    }
};

const axiosPost = async () => {
    try {
        const resp = await axios.post(url, producto);
        console.log(resp.data);
    } catch (err) {
        console.log(err);
    }
};

const axiosPut = async () => {
    try {
        const resp = await axios.put(urlModify, {stock: 18});
        console.log(resp.data);
    } catch (err) {
        console.log(err);
    }
};

const axiosDelete = async () => {
    try {
        const resp = await axios.delete(urlModify);
        console.log(resp.data);
    } catch (err) {
        console.log(err);
    }
};

axiosGet();
axiosPost();
axiosPut();
axiosDelete();