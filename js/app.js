'use strict';
var hours = ['6am','7am','8am', '9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
var trafficTrends = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
// Array holding all location objects
var allLocationObjects =[];
var form = document.getElementById('form');
form.addEventListener('submit', addNewLocation);

function addNewLocation(event) {
  event.preventDefault();
  var location = event.target.location.value;
  var minCustomers = parseInt(event.target.minimumCustomers.value);
  var maxCustomers = parseInt(event.target.maximumCustomers.value);
  var averagePurchase = parseFloat(event.target.averagePurchase.value);
  new CookiesPerLocation(location,minCustomers,maxCustomers,averagePurchase);
  allLocationObjects[allLocationObjects.length-1].render();

  replaceHourlyTotals('cookieChart');
  replaceHourlyTotals('cookieStaff');
}

function createTableHeader(table) {
  // make thead
  var parent = document.getElementById(table);
  var thead = document.createElement('thead');
  parent.appendChild(thead);
  // make tr
  var tr = document.createElement('tr');
  thead.appendChild(tr);
  // make first space empty
  var timeHeader = document.createElement('th');
  timeHeader.textContent = '';
  tr.appendChild(timeHeader);
  // put times in
  for (var i = 0; i < hours.length; i++){
    timeHeader = document.createElement('th');
    timeHeader.textContent = hours[i];
    tr.appendChild(timeHeader);
  }
  // put Total in
  timeHeader = document.createElement('th');
  timeHeader.textContent = 'Totals:';
  tr.appendChild(timeHeader);
}

function CookiesPerLocation(location, minimumCustomers, maximumCustomers, avgCookieSale) {
  this.location = location;
  this.minimumCustomers = minimumCustomers;
  this.maximumCustomers = maximumCustomers;
  this.avgCookieSale = avgCookieSale;
  this.cookieArray = [],
  this.staffNeededArray = [],
  this.total = 0;
  this.staffTotal = 0;
  allLocationObjects.push(this);
}

// Find average cookies per hour based on traffic trends
CookiesPerLocation.prototype.cookiesSoldPerHour = function(x){
  var customer = Math.ceil(Math.random()*((Math.ceil(this.maximumCustomers*trafficTrends[x]) - this.minimumCustomers) + 1) + this.minimumCustomers);
  var cookiesPerHour = Math.round((this.avgCookieSale) * customer);
  return cookiesPerHour;
};

// Find staff needed per hour based on cookie sales
CookiesPerLocation.prototype.staffNeededPerHour = function(cookies){
  var staffNeeded = Math.ceil(cookies/20);
  if (staffNeeded < 2) {staffNeeded = 2;}
  return staffNeeded;
};

// Makes cookie array and staff needed array
CookiesPerLocation.prototype.makeCookieArray = function(){
  console.log(this.location);
  for (var i = 0; i < hours.length; i++) {
    var soldThisHour = this.cookiesSoldPerHour(i);
    var staffThisHour = this.staffNeededPerHour(soldThisHour);
    this.cookieArray.push(soldThisHour);
    this.staffNeededArray.push(staffThisHour);
    console.log(`current ${soldThisHour}`);
    this.total += soldThisHour;
    this.staffTotal += staffThisHour;
    console.log(`total ${this.total}`);
  }
  this.cookieArray.push(this.total);
  this.staffNeededArray.push(this.staffTotal);
};

// Renders cookie and staff table
CookiesPerLocation.prototype.render = function(){
  this.makeCookieArray();
  var parent = document.getElementById('cookieChart');
  var locationRow = document.createElement('tr');
  parent.appendChild(locationRow);
  var rowTitle = document.createElement('th');
  rowTitle.textContent = this.location;
  locationRow.appendChild(rowTitle);
  for (var j = 0; j < this.cookieArray.length; j++) {
    var cookieData = document.createElement('td');
    cookieData.textContent = this.cookieArray[j];
    locationRow.appendChild(cookieData);
  }
  // make second table
  parent = document.getElementById('cookieStaff');
  locationRow = document.createElement('tr');
  parent.appendChild(locationRow);
  rowTitle = document.createElement('th');
  rowTitle.textContent = this.location;
  locationRow.appendChild(rowTitle);
  for (var k = 0; k < this.cookieArray.length; k++) {
    var staffData = document.createElement('td');
    staffData.textContent = this.staffNeededArray[k];
    locationRow.appendChild(staffData);
  }
};

// Total cookie sales per hour accross locations
function getTotals(){
  var totals = [];
  for (var i = 0; i < (hours.length + 1); i++) {
    var hourlyTotal = 0;
    for(var j = 0; j < allLocationObjects.length; j++) {
      hourlyTotal += allLocationObjects[j].cookieArray[i];
    }
    totals.push(hourlyTotal);
  }
  return totals;
}

// Total staff needed per hour accross locations
function getStaffTotals(){
  var totals = [];
  var hourlyTotal = 0;
  for (var i = 0; i < (hours.length + 1); i++) {
    for (var j = 0; j < allLocationObjects.length; j++) {
      hourlyTotal += allLocationObjects[j].staffNeededArray[i];
    }
    totals.push(hourlyTotal);
  }
  return totals;
}

// Renders hourly totals for both tables
function renderHourlyTotals(table){
  // make tfoot
  var parent = document.getElementById(table);
  var tfoot = document.createElement('tfoot');
  parent.appendChild(tfoot);
  // make row
  var tr = document.createElement('tr');
  tfoot.appendChild(tr);
  // make first line
  var totalsTitle = document.createElement('th');
  totalsTitle.textContent = 'Totals:';
  tr.appendChild(totalsTitle);
  // add data
  for (var i = 0; i < getTotals().length; i++){
    var hourTotal = document.createElement('td');
    if (table === 'cookieChart') {
      hourTotal.textContent = getTotals()[i];
    } else if (table === 'cookieStaff') {
      hourTotal.textContent = getStaffTotals()[i];
    }
    tr.appendChild(hourTotal);
  }
}
function replaceHourlyTotals(table){
  var parent = document.getElementById(table);
  var tfoot = parent.getElementsByTagName('tfoot')[0];
  var tr = tfoot.getElementsByTagName('tr')[0];

  // loop to change contents of tds
  for (var i = 0; i < getTotals().length; i++){
    var td = tr.getElementsByTagName('td')[i];
    if (table === 'cookieChart') {
      td.textContent = getTotals()[i];
    } else if (table === 'cookieStaff') {
      td.textContent = getStaffTotals()[i];
    }
  }
}

new CookiesPerLocation('Seattle',23,65,6.3);
new CookiesPerLocation('Tokyo',3,24,1.2);
new CookiesPerLocation('Dubai',11,38,3.7);
new CookiesPerLocation('Paris', 20, 38, 2.3);
new CookiesPerLocation('Lima',2,16,4.6);

createTableHeader('cookieChart');
createTableHeader('cookieStaff');

for (var i = 0; i < allLocationObjects.length; i++){
  allLocationObjects[i].render();
}

renderHourlyTotals('cookieChart');
renderHourlyTotals('cookieStaff');
