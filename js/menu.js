
// ---------- SHOW THE MENU ----------
function drawPage() {
  var rows = '';
  for (var i = 0; i < data.menu.length; i++) { rows += menuRow(i); }
  if (rows == '') { rows = '<tr><td colspan="6">No food yet. Press "+ Add food".</td></tr>'; }
  document.getElementById('menu-rows').innerHTML = rows;
}

function menuRow(i) {
  var m = data.menu[i];
  var statusText = 'Available';
  var statusClass = 'small';
  if (m.available == false) { statusText = 'Unavailable'; statusClass = 'small light-button'; }
  return '<tr><td>' + safe(m.name) + '</td><td>' + safe(m.category) + '</td><td>' + money(m.price) + '</td><td><small>' + safe(m.image) + '</small></td>' +
         '<td><button class="' + statusClass + '" onclick="toggleFood(' + i + ')">' + statusText + '</button></td>' +
         '<td><button class="small light-button" onclick="editFood(' + i + ')">Edit</button> ' +
         '<button class="small danger-button" onclick="deleteFood(' + i + ')">Delete</button></td></tr>';
}

// ---------- ASK THE USER (each returns null if the user cancels or types something wrong) ----------
// true if another food already has this name (skip = the food we are editing, -1 when adding)
function nameExists(name, skip) {
  for (var i = 0; i < data.menu.length; i++) {
    if (i != skip && data.menu[i].name.toLowerCase() == name.toLowerCase()) { return true; }
  }
  return false;
}

// the categories used in the menu, as text. Example: "Ulam, Vegetables, Drinks"
function categoryNames() {
  var names = [];
  for (var i = 0; i < data.menu.length; i++) {
    if (names.indexOf(data.menu[i].category) == -1) { names.push(data.menu[i].category); }
  }
  return names.join(', ');
}

function askName(oldName, skip) {
  var name = prompt('Food name:', oldName);
  if (name == null) { return null; }
  name = name.trim();
  if (name == '') { alert('Please type a food name.'); return null; }
  if (nameExists(name, skip)) { alert('There is already a food named ' + name + '.'); return null; }
  return name;
}

function askCategory(oldCategory) {
  var category = prompt('Category (' + categoryNames() + ' - or type a new one):', oldCategory);
  if (category == null) { return null; }
  category = category.trim();
  if (category == '') { alert('Please type a category.'); return null; }
  return category;
}

function askPrice(oldPrice) {
  var price = parseFloat(prompt('Price in pesos:', oldPrice));
  if (isNaN(price) || price < 0) { alert('Invalid price.'); return null; }
  return round2(price);
}

// cancel keeps the old image
function askImage(oldImage) {
  var image = prompt('Image file path (example: images/adobo.jpg). Leave blank for none:', oldImage);
  if (image == null) { return oldImage; }
  return image.trim();
}

// ---------- ADD, EDIT, TOGGLE, DELETE ----------
function newMenuItem() {
  var name = askName('', -1);
  if (name == null) { return; }
  var category = askCategory('Ulam');
  if (category == null) { return; }
  var price = askPrice('');
  if (price == null) { return; }
  var image = askImage('');
  data.menu.push({name: name, category: category, price: price, image: image, available: true});
  saveData();
  drawPage();
}

function editFood(i) {
  var m = data.menu[i];
  var name = askName(m.name, i);
  if (name == null) { return; }
  var category = askCategory(m.category);
  if (category == null) { return; }
  var price = askPrice(m.price);
  if (price == null) { return; }
  var image = askImage(m.image);
  m.name = name;
  m.category = category;
  m.price = price;
  m.image = image;
  saveData();
  drawPage();
}

function toggleFood(i) {
  data.menu[i].available = !data.menu[i].available;
  saveData();
  drawPage();
}

function deleteFood(i) {
  if (confirm('Delete ' + data.menu[i].name + ' from the menu?')) {
    data.menu.splice(i, 1);
    saveData();
    drawPage();
  }
}
