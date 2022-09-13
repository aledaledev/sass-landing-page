import { Storage } from "./utils/Storage.js";
import { Ui } from "./components/Ui.js";
import { saveProduct } from "./components/saveProduct.js";

(() => {
  const storage = new Storage();
  const products = JSON.parse(localStorage.getItem("products"));
  const ui = new Ui();
  if (products) {
    products.map((product) => {
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

  const inputs = [...document.querySelectorAll("[data-prop]")];
  inputs.map((input) =>
    input.addEventListener("input", () =>
      input.value !== "" ? input.classList.remove("border-red-600") : {}
    )
  );
})();
