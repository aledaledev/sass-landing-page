import { id } from "./ids.js";
class Product {
  constructor([name, price, year]) {
    (this.name = name), (this.price = price), (this.year = year);
  }
}
class Ui {
  //metodo estatico
  addProduct(product, id) {
    const productList = document.getElementById("product-list");
    const ul = document.createElement("ul");
    const fragment = document.createDocumentFragment();
    ul.classList.add("ul");
    //dataset es util
    ul.dataset.id = id;
    const props = Object.keys(product);
    props.map((key) => {
      const span = document.createElement("span");
      const li = document.createElement("li");
      span.classList.add("font-semibold");
      //ojo con las keys de los objetos
      span.innerHTML = product[key];
      li.classList.add("props");
      //transforma elemento a string
      li.innerHTML = `product ${key}: ${span.outerHTML}`;
      fragment.appendChild(li);
    });
    const a = document.createElement("a");
    const li = document.createElement("li");
    //varias clases
    a.classList.add("btn", "bg-red-500", "cursor-pointer");
    a.id = id;
    a.innerHTML = "delete";
    li.classList.add("p-2");
    li.appendChild(a);
    fragment.appendChild(li);
    ul.appendChild(fragment);
    productList.appendChild(ul);
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }

  deleteProduct(id) {
    const dlt = id;
    const productList = document.getElementById("product-list");
    //filter no funciona porque no se guarda en ningun lado
    document.querySelectorAll("[data-id]").forEach((elem) => {
      if (elem.dataset.id === dlt) productList.removeChild(elem);
    });
  }
  showMessage(message, bgColorClass) {
    const fragment = document.createDocumentFragment();
    const messagesBlock = document.getElementById("message");
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.className = "message";
    p.innerHTML = `product ${message} succefully`;
    div.classList.add(
      "message-content",
      "ease-linear",
      "duration-500",
      bgColorClass
    );
    div.appendChild(p);
    fragment.appendChild(div);
    messagesBlock.appendChild(fragment);
    setTimeout(() => (div.style.opacity = 0), 1500);
    //remove() elimina al elemento directamente
    setTimeout(() => div.remove(), 2000);
  }
}

class Storage {
  constructor() {
    this.products = [];
  }
  setProduct(product, id) {
    this.products.push({ ...product, id });
  }
  deleteProduct(id) {
    this.products.forEach((product, index) =>
    //splice modifica al array original
      product.id === id ? this.products.splice(index, 1) : {}
    );
  }
  getProduct() {
    return this.products;
  }
}

(() => {
  const saveProduct = (e) => {
    e.preventDefault();
    //convertir de nodelist a array
    const inputs = [...document.querySelectorAll("[data-prop]")];
    inputs.map((input) =>
      //ternario one line
      input.value === "" ? input.classList.add("border-red-600") : {}
    );
    //inputs.map((input) => (input.value = ""));
    const productProps = inputs.map((input) => input.value);
    //includes = god
    if (productProps.includes("")) return;
    const product = new Product(productProps);
    //no podes llamar const = funcion
    const ID = id();
    const ui = new Ui();
    ui.addProduct(product, ID);
    ui.resetForm();
    ui.showMessage("added", "bg-green-400");
    storage.setProduct(product, ID);
    localStorage.setItem("products", JSON.stringify(storage.products));
  };

  const storage = new Storage();
  const products = JSON.parse(localStorage.getItem("products"));
  const ui = new Ui();
  if (products) {
    products.map((product) => {
      //rest
      const { id, ...props } = product;
      storage.setProduct(props, id);
      ui.addProduct(props, id);
    });
  }

  document
    .getElementById("product-form")
    .addEventListener("submit", saveProduct);
  document.getElementById("product-list").addEventListener("click", (e) => {
    if (e.target.nodeName === "A") {
      const ui = new Ui();
      const id = e.target.id;
      ui.deleteProduct(id);
      ui.showMessage("deleted", "bg-blue-400");
      storage.deleteProduct(id);
      localStorage.setItem("products", JSON.stringify(storage.products));
    }
  });
})();

(() => {
  const inputs = [...document.querySelectorAll("[data-prop]")];
  inputs.map((input) =>
    input.addEventListener("input", () =>
      input.value !== "" ? input.classList.remove("border-red-600") : {}
    )
  );
})();
