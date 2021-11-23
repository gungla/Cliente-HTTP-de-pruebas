const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//app.use('/api/producto', router);
//app.use(express.static(__dirname + 'public'));

const productoModel = require('./db/producto');

const portCL = process.argv[2] || 8080;


app.get('/productos', (req, res) => {

    productoModel.find( {} )
        .then((productos) => res.send(productos))
        .catch((err) => res.send({error:`no hay productos cargados: ${err}`}));
})

app.post('/productos', (req, res) => {
    const {id, nombre, codigo, precio, stock} = req.body;

    //let id = (productos.length)+1;

    const producto = {
        id, 
        nombre, 
        codigo, 
        precio,
        stock
    }

    const productSaved = new productoModel(producto);
    productSaved.save()
        .then(() => res.sendStatus(201))
        .catch((err) => res.send(err))
})

app.get('/productos/:id', (req, res)=>{ //get info by id
    const { id } = req.params;

    productoModel.findOne({id: id})
        .then((producto) => res.send(producto))
        .catch((err)=>res.send(err))
    
})

app.put('/productos/:id', (req, res) => {

    const { id } = req.params;
    const {stock} = req.body;

    productoModel.updateOne({id: id}, {
        $set: {stock: stock}
    })
        .then((updatedProduct) => res.send(updatedProduct))
        .catch((err)=>res.send(err))
})

app.delete('/productos/:id', (req, res) => {
    const { id } = req.params;

    productoModel.deleteOne({id: id})
        .then(()=>res.sendStatus(200))
        .catch((err)=>res.send(err))
})

app.listen( process.env.PORT|| portCL, ()=>{
    console.log(`Running on PORT ${portCL}`);
    mongoose.connect('mongodb://localhost:27017/ecommerce', 
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    )
        .then( () => console.log('Base de datos conectada') )
        .catch( (err) => console.log(err) );
})