
var categoryList = [];
var category = 'All';
var search = '';

// "All" + every category found in the menu (no repeats)
function makeCategoryList() {
  categoryList = ['All'];
  for (var i = 0; i < data.menu.length; i++) {
    if (categoryList.indexOf(data.menu[i].category) == -1) { categoryList.push(data.menu[i].category); }
  }
}

// ---------- CATEGORIES AND SEARCH ----------
function drawCategories() {
  var html = '';
  for (var c = 0; c < categoryList.length; c++) {
    var cls = '';
    if (categoryList[c] == category) { cls = 'active'; }
    html += '<button class="' + cls + '" onclick="pickCategory(' + c + ')">' + safe(categoryList[c]) + '</button>';
  }
  document.getElementById('category-list').innerHTML = html;
}

function pickCategory(c) {
  category = categoryList[c];
  drawCategories();
  drawFood();
}

function onSearch() {
  search = document.getElementById('search-box').value;
  drawFood();
}

// ---------- FOOD GRID ----------
// true if this food matches the chosen category and the search text
function foodMatches(m) {
  var okCategory = (category == 'All' || m.category == category);
  var okSearch = (m.name.toLowerCase().indexOf(search.toLowerCase()) != -1);
  return okCategory && okSearch;
}

function foodCard(i) {
  var m = data.menu[i];
  var picture = '';
  if (m.image != '') { picture = '<img src="' + safe(m.image) + '" onerror="this.style.display=\'none\'">'; }
  var cls = 'food-card';
  if (m.available == false) { cls = 'food-card unavailable'; }
  return '<button class="' + cls + '" onclick="addFood(' + i + ')"><span class="food-picture">' + safe(m.name.charAt(0)) + picture + '</span>' +
         '<strong>' + safe(m.name) + '</strong><span class="price">' + money(m.price) + '</span></button>';
}

function drawFood() {
  var html = '';
  for (var i = 0; i < data.menu.length; i++) {
    if (foodMatches(data.menu[i])) { html += foodCard(i); }
  }
  if (html == '') { html = '<p>No food found.</p>'; }
  document.getElementById('food-grid').innerHTML = html;
}
