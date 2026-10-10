
function drawTables() {
  var tiles = '';
  for (var i = 0; i < data.tables.length; i++) { tiles += tableTile(i); }
  byId('table-board').innerHTML = tiles;
}

function tableTile(i) {
  var t = data.tables[i];
  var s = findOpenByTable(t.no);
  var r = reservationFor(t.no);
  if (s != null) { return occupiedTile(i, t, s); }
  if (r != -1) { return reservedTile(i, t, data.reservations[r]); }
  return freeTile(i, t);
}

// the seat badge + the big table number (same on every tile)
function tileTop(t) {
  return '<b class="seat-badge">' + t.seats + ' seats</b><strong class="table-number">' + safe(t.no) + '</strong>';
}

function freeTile(i, t) {
  return '<button class="table-tile free" onclick="clickTable(' + i + ')">' + tileTop(t) +
         '<b class="state">Available</b><small>Tap to seat or reserve</small></button>';
}

function occupiedTile(i, t, s) {
  var mins = Math.floor((Date.now() - s.openedAt) / 60000);
  return '<button class="table-tile taken" onclick="clickTable(' + i + ')">' + tileTop(t) + '<b class="state">Occupied</b>' +
         '<small>' + safe(s.name) + '</small><small>' + mins + ' min · ' + s.orders.length + ' order(s)</small>' +
         '<b class="bill-amount">' + money(subtotal(s)) + '</b></button>';
}

function reservedTile(i, t, res) {
  return '<button class="table-tile reserved" onclick="clickTable(' + i + ')">' + tileTop(t) + '<b class="state">Reserved</b>' +
         '<small>' + safe(res.name) + '</small><small>' + whenText(res.at) + '</small>' +
         '<b class="bill-amount">' + res.guests + ' pax</b></button>';
}
