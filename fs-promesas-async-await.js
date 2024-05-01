import fs, { existsSync } from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }
}

getProducts = async() => {
    try {
        if (existsSync(this.path)){
            const products = await fs.promises.readFile(this.path, "utf8");
            return JSON.parse(products);
        } else return [];
    } catch(error) {
        console.log(error);
    }
}

addProducts = async (title, description, code, price, thumbnail, stock) => {
    try {
        const products = await this.getProducts()
        if (!description || !title || !price || !thumbnail ||!stock || !code){
            console.log("Son incorrecto los Datos")
            return
        }
        const product = {
            description,
            title,
            price,
            thumbnail,
            code,
            stock
        };

        const checkCode = products.find(prod => prod.code === product.code)
        if(!checkCode){
            if (products.length === 0){
                product.id =1
            } else {
                product.id =products[products.length - 1].id +1
            }
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '/t'))
        } else{
            console.log("El codigo ya Existe")
        }
    } catch (error) {
        console.log(error);
    }
}

getProductById = async(productId) => {
    try {
        const products = await this.getProducts()
        const checkId = products.find(prodId => prodId.id === productId)
        if(!checkId){
            console.log("No Funciona")
        } else {
            console.log(`Producto Seleccionado es -${checkId.title}-`)
            return checkId
        }
    } catch (error) {
        console.log(error)
    }
};

updateProduct = async(id, updates) => {
    try {
        let products = await this.getProducts()
        products = products.map(prod => {
            if(prod.id === id){
                prod = {...prod, ...updates}
            }
            return prod
        })
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
    } catch (error) {
        console.log(error)
    }
}

deleteProduct = async(id) => {
    try {
        let products = await this.getProducts()
        const checkId = products.find((prod)=> prod.id === id)
        const index = products.indexOf(checkId)
        if (checkId) {
            products.splice(index,1)
        } else{
            console.log(`No Existe`)
        }
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
    } catch (error) {
        console.log(error)        
    }
}

export default ProductManager


// const productManager = new ProductManager('./product.json');

// const test = async() => {
//     console.log(await productManager.getProducts())
//     await productManager.addProducts('Teclado Mecanico Gamer', 'Gtc Kgg-011 Rgb Switch Blue 80% Tkl', 12000, "https://http2.mlstatic.com/D_NQ_NP_708620-MLA72982548112_112023-O.webp",5, 15)
//     await productManager.addProducts('Escritorio GAMER CON LUZ LED RGB ', 'RGB+Control 24 Botones', 139999, "https://acdn.mitiendanube.com/stores/002/251/378/products/escritorio-gamer-led1-fb43425bf3ca564a1f16819492011121-1024-1024.webp",3, 30)
//     await productManager.addProducts('GABINETE GAMER AUREOX PICTOR ARX 370G 4 COOLERS', 'Gabinete sin accesorios', 8021998, "https://www.fullh4rd.com.ar/img/productos/6/gabinete-gamer-aureox-pictor-arx-370g-4-coolers-0.jpg",12, 20)

//     await productManager.updateProduct(2, { title: "Homero Simpsons", stock: 4 })
//     console.log(await productManager.deleteProduct(2))
//     console.log(await productManager.getProducts())
//     console.log(await productManager.getProductByid(3));
// }
// test()
