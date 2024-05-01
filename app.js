import express, { query } from 'express';
import ProductManager from './fs-promesas-async-await';
import { parse } from 'path';

const app = express()
const PORT = process.env.PORT || 8080
const manager = new ProductManager('./Backend-Manejo-de-archivos-clas4-/product.js')

app.use(express.urlencoded({extended: true}))
app.get('/products', async (req, res)=>{
    const productos = await manager.getProducts()
    const prod = []
    let limit = parseInt(req, query.limit)
    if(limit && limit <= productos.length){
        for (let i = 0; i < limit; i++){
            prod.push(productos[i])
        }
        return res.send(prods)
    }else {
        res.send({productos})
    }
})

app.get('/products/:pid', async (req, res) =>{
    const productos = await manager.getProducts()
    let prodID = parseInt(req.params.pid)
    let Producto = productos.find(p => p.id === prodID)
    if(!Producto) 
    return res.send({error: `El Producto ${prodID} no esta`}) 
    res.sed({producto})
})



app.listen(PORT, ()=>{console.log(`El Server se encuentra activo en el puerto ${PORT}`)})