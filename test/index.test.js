const assert = require('assert')
const request = require('supertest')('http://localhost:8080/productos')
const expect = require('chai').expect
const axios = require('axios')

const url = 'http://localhost:8080/productos';
const urlModify = 'http://localhost:8080/productos/3';

let producto = {
    id: 3,
    nombre: 'Nombre del producto', 
    codigo: 1376, 
    precio: 65,
    stock: 5
}

let newStock = 18;

describe("Test API REST", ()=>{
    describe('test GET', () => {
        it('debería retornar un status 200', async()=> {
            let response = await request.get(url);
            expect(response.status).to.eql(200);
        })
    })

    describe('test POST', ()=> {
        it('debería incorporar un producto', async()=>{
            let response = await request.post(url).send(producto);
            expect(response.status).to.eql(200);
        })
    })

    describe('test update/PUT', ()=>{
        it('debería updatear el producto c/stock 18', async()=>{
            let response = await request.put(urlModify.send({stock: newStock}));
            expect(response.status).to.eql(200);
        })
    })
})