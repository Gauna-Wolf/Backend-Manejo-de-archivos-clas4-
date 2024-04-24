const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf8");
                this.products = JSON.parse(products);
                return this.products
            } else return [];
        } catch(error) {
            console.log(error);
        }
    }

    async addProducts (title, description, code, price, thumbnail, stock) {
        try {
            await this.getProducts();
            const checkCode = await this.products.find((e)=>e.code === code);
            if (checkCode) {
                throw new error ('Product'+title + 'ya fue agregado')
            }
            if (!description || !title || !price || !thumbnail ||!stock || !code){
                throw new error ('Todos los campos deben ser obligatorios')
            }
            const products = {
                id: this.#getMaxId() + 1,
                description,
                title,
                price,
                thumbnail,
                code,
                stock
            }
            this.products.push(products);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 4), 'utf8');
        } catch (error) {
            console.log(error);
        }
    }

    #getMaxId(){
        let maxId = 0;
        this.products.map((product)=>{
            if (products.id > maxId) maxId = product.id;
        });
        return maxId;
    }

    async getProductByid (id) {
        const products = await fs.promises.readFile(this.path, 'utf8');
        this.products =JSON.parse(products)
        const getProdById = this.products.find((e) => e.id === id);
        if (getProdById) {
            return getProdById;
        }
        return console.log("productos no encontrados");
        return this.products
    };
    
    async updateProduct(id, updatedProperties) {
        const productoUpdate = await this.getProductByid(id);
        if (productoUpdate) {
            Object.assign(productoUpdate, updatedProperties);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 4), 'utf8');
            return productoUpdate;
        }
    }

    async deleteProduct(id) {
        const deleteProduct = await this.getProductByid(id)
        if (deleteProduct){
            this.products = this.products.filter((e)=> e.id!== id);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 4), 'utf8');
            return deleteProduct;
        }
        return console.log('productos no encontrados');
    }
    
}

const productManager = new ProductManager('./product.json');

const test = async() => {
    console.log(await productManager.getProducts())
    await productManager.addProducts('Teclado Mecanico Gamer', 'Gtc Kgg-011 Rgb Switch Blue 80% Tkl', 12000, "https://http2.mlstatic.com/D_NQ_NP_708620-MLA72982548112_112023-O.webp",5, 15)
    await productManager.addProducts('Escritorio GAMER CON LUZ LED RGB ', 'RGB+Control 24 Botones', 139999, "https://acdn.mitiendanube.com/stores/002/251/378/products/escritorio-gamer-led1-fb43425bf3ca564a1f16819492011121-1024-1024.webp",3, 30)
    await productManager.addProducts('GABINETE GAMER AUREOX PICTOR ARX 370G 4 COOLERS', 'Gabinete sin accesorios', 8021998, "https://www.fullh4rd.com.ar/img/productos/6/gabinete-gamer-aureox-pictor-arx-370g-4-coolers-0.jpg",12, 20)

    await productManager.updateProduct(2, { title: "Homero Simpsons", stock: 4 })
    console.log(await productManager.deleteProduct(2))
    console.log(await productManager.getProducts())
    console.log(await productManager.getProductByid(3));
}
test()
