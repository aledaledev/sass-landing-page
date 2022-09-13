export class Ui {
  addProduct(product, id) {
    const productList = document.getElementById("product-list");
    const ul = document.createElement("ul");
    const fragment = document.createDocumentFragment();
    const props = Object.keys(product);
    ul.classList.add("ul");
    ul.dataset.id = id;
    props.map((key) => {
      const span = document.createElement("span");
      const li = document.createElement("li");
      span.classList.add("font-semibold");
      span.innerHTML = product[key];
      li.classList.add("props");
      li.innerHTML = `product ${key}: ${span.outerHTML}`;
      fragment.appendChild(li);
    });
    const a = document.createElement("a");
    const li = document.createElement("li");
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
    const productList = document.getElementById("product-list");
    document.querySelectorAll("[data-id]").forEach((elem) => {
      if (elem.dataset.id === id) productList.removeChild(elem);
    });
  }

  showMessage(message, bgColorClass) {
    const fragment = document.createDocumentFragment();
    const messagesBlock = document.getElementById("message");
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.className = "message";
    p.innerHTML = `product ${message} succefully`;
    div.classList.add("message-content","ease-linear","duration-500",bgColorClass);
    div.appendChild(p);
    fragment.appendChild(div);
    messagesBlock.appendChild(fragment);
    setTimeout(() => (div.style.opacity = 0), 1500);
    setTimeout(() => div.remove(), 2000);
  }
}
