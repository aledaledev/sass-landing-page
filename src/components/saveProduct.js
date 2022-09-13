import { id } from "../utils/id.js";
import { Product } from "../utils/Product.js";
import { Ui } from "./Ui.js";
export const saveProduct = (e) => {
  e.preventDefault();
  const inputs = [...document.querySelectorAll("[data-prop]")];
  inputs.map((input) => input.value === "" ? input.classList.add("border-red-600") : {});
  const productProps = inputs.map((input) => input.value);
  if (productProps.includes("")) return;
  const product = new Product(productProps);
  const ID = id();
  const ui = new Ui();
  ui.addProduct(product, ID);
  ui.resetForm();
  ui.showMessage("added", "bg-green-400");
  storage.setProduct(product, ID);
  localStorage.setItem("products", JSON.stringify(storage.products));
};
