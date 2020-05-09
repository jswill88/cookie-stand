'use strict';

// Global Variables
var hours = ['6am','7am','8am', '9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
var trafficTrends = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4];
var allLocationObjects =[];

// Set up form
var form = document.getElementById('form');
form.addEventListener('submit', addNewLocation);

// Constructor
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
  // Need to check if traffic trends bring max below min. If so, return min
  if (this.maximumCustomers * trafficTrends[x] > this.minimumCustomers) {
    var customer = Math.floor(Math.random()*(this.maximumCustomers*trafficTrends[x] - this.minimumCustomers + 1) + this.minimumCustomers);
  } else {
    customer = this.minimumCustomers;
  }
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
  for (var i = 0; i < hours.length; i++) {
    var soldThisHour = this.cookiesSoldPerHour(i);
    var staffThisHour = this.staffNeededPerHour(soldThisHour);
    this.cookieArray.push(soldThisHour);
    this.staffNeededArray.push(staffThisHour);
    this.total += soldThisHour;
    this.staffTotal += staffThisHour;
  }
  this.cookieArray.push(this.total);
  this.staffNeededArray.push(this.staffTotal);
};

// Renders cookie and staff table
CookiesPerLocation.prototype.render = function(){
  this.makeCookieArray();
  var locationRow = makeNewRow('cookieChart','tr');
  appendElement(locationRow,'th',this.location);
  for (var j = 0; j < this.cookieArray.length; j++) {
    appendElement(locationRow, 'td', this.cookieArray[j]);
  }

  // Make staff table
  locationRow = makeNewRow('cookieStaff','tr');
  appendElement(locationRow,'th',this.location);
  for (var k = 0; k < this.cookieArray.length; k++) {
    appendElement(locationRow, 'td', this.staffNeededArray[k]);
  }
};

// Global Functions
// Append element to table parent
function makeNewRow(tableId, elementType){
  var parent = document.getElementById(tableId);
  var tr = document.createElement(elementType);
  parent.appendChild(tr);
  return tr;
}

// Append a child element with text to parent
function appendElement(parent, child, elementText) {
  var childElement = document.createElement(child);
  childElement.textContent = elementText;
  parent.appendChild(childElement);
}

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
  for (var i = 0; i < (hours.length + 1); i++) {
    var hourlyTotal = 0;
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
  var tfoot = makeNewRow(table,'tfoot');
  // make row
  var tr = document.createElement('tr');
  tfoot.appendChild(tr);
  // make first line
  appendElement(tr,'th','Totals:');
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

// Replace hourly totals when new location is added
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

function createTableHeader(table) {
  // make thead
  var thead = makeNewRow(table,'thead');
  // make tr
  var tr = document.createElement('tr');
  thead.appendChild(tr);
  // make first space empty
  appendElement(tr,'th','');
  // put times in
  for (var i = 0; i < hours.length; i++){
    appendElement(tr, 'th', hours[i]);
  }
  appendElement(tr, 'th', 'Totals:');
}

// Function to create add a location from user input
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

// Add objects to array
new CookiesPerLocation('Seattle',23,65,6.3);
new CookiesPerLocation('Tokyo',3,24,1.2);
new CookiesPerLocation('Dubai',11,38,3.7);
new CookiesPerLocation('Paris', 20, 38, 2.3);
new CookiesPerLocation('Lima',2,16,4.6);

// Render table
for (var i = 0; i < allLocationObjects.length; i++){
  allLocationObjects[i].render();
}
createTableHeader('cookieChart');
createTableHeader('cookieStaff');
renderHourlyTotals('cookieChart');
renderHourlyTotals('cookieStaff');
