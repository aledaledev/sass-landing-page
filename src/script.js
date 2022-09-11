import { id } from "./ids.js";
class Product {
  constructor([name, price, year]) {
    (this.name = name), (this.price = price), (this.year = year);
  }
}
class Ui {
  //metodo estatico
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const ul = document.createElement("ul");
    ul.classList.add("ul");
    //dataset es util
    ul.dataset.id = id();
    const fragment = document.createDocumentFragment();
    const props = Object.keys(product);
    props.map((key) => {
      const span = document.createElement("span");
      span.classList.add("font-semibold");
      //ojo con las keys de los objetos
      span.innerHTML = product[key];
      const li = document.createElement("li");
      li.classList.add("props");
      //transforma elemento a string
      li.innerHTML = `product ${key}: ${span.outerHTML}`;
      fragment.appendChild(li);
    });
    const a = document.createElement("a");
    //varias clases
    a.classList.add("btn", "bg-red-500", "cursor-pointer");
    a.id = ul.dataset.id;
    a.innerHTML = "delete";
    const li = document.createElement("li");
    li.classList.add("p-2");
    li.appendChild(a);
    fragment.appendChild(li);
    ul.appendChild(fragment);
    productList.appendChild(ul);
  }

  resetForm(){
    document.getElementById("product-form").reset()
  }

  static deleteProduct(e) {
    const dlt = e.target.id;
    const productList = document.getElementById("product-list");
    //filter no funciona porque no se guarda en ningun lado
    document.querySelectorAll("[data-id]").forEach((elem) => {
      if (elem.dataset.id === dlt) productList.removeChild(elem);
    });
  }
  showMessage(message,cssClass) {

  }
}

const saveProduct = (e)=>{
    e.preventDefault();
    //convertir de nodelist a array
    const inputs = [...document.querySelectorAll("[data-prop]")];
    const productProps = inputs.map((input) => input.value);
    //inputs.map((input) => (input.value = ""));
    const product = new Product(productProps);
    const ui = new Ui()
    ui.addProduct(product);
    ui.resetForm();
    //ui.showMessage();
}
document
  .getElementById("product-form")
  .addEventListener("submit",saveProduct);
document
  .querySelectorAll("a")
  .forEach((product) => product.addEventListener("click", ()=>{
    const ui = new Ui();
    ui.deleteProduct
    //ui.showMessage()
  }));