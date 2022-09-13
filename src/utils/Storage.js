export class Storage {
  constructor() {
    this.products = [];
  }
  setProduct(product, id) {
    this.products.push({ ...product, id });
  }
  deleteProduct(id) {
    this.products.forEach((product, index) =>
      product.id === id ? this.products.splice(index, 1) : {}
    );
  }
}
