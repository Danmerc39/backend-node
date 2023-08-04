const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate(){
    for (let index = 0; index < 100; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }

  async findAll(){
    const query = 'SELECT * FROM tasks';
    const response = await this.pool.query(query);
    return response.rows;
  };

  async findOne(id){
    const product = this.products.find( product => product.id === id);
    if (!product) {
      throw boom.notFound('Product not found');
    }else if(product.isBlocked){
      throw boom.conflict('Acceso al producto denegado');
    }
    return product;
  }

  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, data){
    const index = this.products.findIndex( product => product.id === id);
    if (index === -1) {
      throw boom.notFound("Product nof found");
    }
    this.products[index] = {
      ...this.products[index],
      ...data
    }
    return this.products[index]
  }

  async delete(id){
    const index = this.products.findIndex( product => product.id === id);
    if (index === -1) {
      throw new Error(`Product ${id} not exists`)
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
