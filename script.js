const API_URL = "https://fakestoreapi.com/products";
let editId = null;

// ================= ELEMENT =================
const productsPage = document.getElementById("productsPage");
const formPage = document.getElementById("formPage");
const formTitle = document.getElementById("formTitle");

const nameInput = document.getElementById("name");
const categoryInput = document.getElementById("category");
const priceInput = document.getElementById("price");
const descInput = document.getElementById("desc");

// ================= READ =================
async function renderProducts() {
  const list = document.getElementById("productList");
  list.innerHTML = "Loading...";

  try {
    const res = await fetch(API_URL);
    const products = await res.json();

    list.innerHTML = "";
    products.forEach(p => {
      list.innerHTML += `
        <div class="card">
          <h3>${p.title}</h3>
          <p><b>Category:</b> ${p.category}</p>
          <p><b>Price:</b> $${p.price}</p>
          <p>${p.description}</p>
          <div class="actions">
            <span onclick="editProduct(${p.id})">✏️</span>
            <span onclick="deleteProduct(${p.id})">🗑️</span>
          </div>
        </div>
      `;
    });
  } catch (error) {
    list.innerHTML = "Failed to load products";
    console.error(error);
  }
}

// ================= ADD =================
function openAddForm() {
  editId = null;
  formTitle.innerText = "Add Product";
  productsPage.classList.add("hidden");
  formPage.classList.remove("hidden");
  clearForm();
}

// ================= EDIT =================
async function editProduct(id) {
  editId = id;

  const res = await fetch(`${API_URL}/${id}`);
  const p = await res.json();

  nameInput.value = p.title;
  categoryInput.value = p.category;
  priceInput.value = p.price;
  descInput.value = p.description;

  formTitle.innerText = "Update Product";
  productsPage.classList.add("hidden");
  formPage.classList.remove("hidden");
}

// ================= SAVE =================
async function saveProduct() {
  const data = {
    title: nameInput.value,
    price: Number(priceInput.value),
    description: descInput.value,
    category: categoryInput.value,
    image: "https://i.pravatar.cc"
  };

  try {
    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
    }

    showProducts();
  } catch (error) {
    console.error("Save error:", error);
  }
}

// ================= DELETE =================
async function deleteProduct(id) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    renderProducts();
  } catch (error) {
    console.error("Delete error:", error);
  }
}

// ================= NAV =================
function showProducts() {
  formPage.classList.add("hidden");
  productsPage.classList.remove("hidden");
  renderProducts();
}

// ================= UTIL =================
function clearForm() {
  nameInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  descInput.value = "";
}

// ================= INIT =================
renderProducts();
