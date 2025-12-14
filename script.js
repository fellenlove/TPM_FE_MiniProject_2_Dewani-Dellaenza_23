let products = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    category: 'Electronics',
    price: 'Rp. 799.000',
    desc: 'Compact wireless earbuds delivering crisp audio and seamless Bluetooth connectivity.'
  },
  {
    id: 2,
    name: 'Yoga Mat',
    category: 'Fitness',
    price: 'Rp. 340.000',
    desc: 'Durable, non-slip yoga mat designed for stability and comfort.'
  }
];

let editId = null;

function renderProducts() {
  const list = document.getElementById('productList');
  list.innerHTML = '';

  products.forEach(p => {
    list.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p><b>Category:</b> ${p.category}</p>
        <p><b>Price:</b> ${p.price}</p>
        <p>${p.desc}</p>
        <div class="actions">
          <span onclick="editProduct(${p.id})">✏️</span>
          <span onclick="deleteProduct(${p.id})">🗑️</span>
        </div>
      </div>
    `;
  });
}

function openAddForm() {
  editId = null;
  document.getElementById('formTitle').innerText = 'Add Product';
  document.getElementById('productsPage').classList.add('hidden');
  document.getElementById('formPage').classList.remove('hidden');
  clearForm();
}

function editProduct(id) {
  const p = products.find(item => item.id === id);
  editId = id;

  name.value = p.name;
  category.value = p.category;
  price.value = p.price.replace(/[^0-9]/g, '');
  desc.value = p.desc;

  document.getElementById('formTitle').innerText = 'Update Product';
  document.getElementById('productsPage').classList.add('hidden');
  document.getElementById('formPage').classList.remove('hidden');
}

function saveProduct() {
  const data = {
    name: name.value,
    category: category.value,
    price: 'Rp. ' + price.value,
    desc: desc.value
  };

  if (editId) {
    const index = products.findIndex(p => p.id === editId);
    products[index] = { ...products[index], ...data };
  } else {
    products.push({ id: Date.now(), ...data });
  }

  showProducts();
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  renderProducts();
}

function showProducts() {
  document.getElementById('formPage').classList.add('hidden');
  document.getElementById('productsPage').classList.remove('hidden');
  renderProducts();
}

function clearForm() {
  name.value = category.value = price.value = desc.value = '';
}

renderProducts();