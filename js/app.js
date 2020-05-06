'use strict';
var hours = ['6am','7am','8am', '9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm'];
var trafficTrends = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];

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
}

CookiesPerLocation.prototype.cookiesSoldPerHour = function(x){
  var customer = Math.floor(Math.random()*(Math.ceil(this.maximumCustomers*trafficTrends[x]) - this.minimumCustomers + 1) + this.minimumCustomers);
  var cookiesPerHour = Math.round((this.avgCookieSale) * customer);
  return cookiesPerHour;
};

CookiesPerLocation.prototype.staffNeededPerHour = function(cookies){
  var staffNeeded = Math.ceil(cookies/20);
  if (staffNeeded < 2) {staffNeeded = 2;}
  return staffNeeded;
};

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


function getTotals(){
  var totals = [];
  var hourlyTotal = 0;
  for (var i = 0; i < (hours.length + 1); i++) {
    hourlyTotal = seattle.cookieArray[i] + tokyo.cookieArray[i] + dubai.cookieArray[i] + paris.cookieArray[i] + lima.cookieArray[i];
    totals.push(hourlyTotal);
  }
  return totals;
}

function getStaffTotals(){
  var totals = [];
  var hourlyTotal = 0;
  for (var i = 0; i < (hours.length + 1); i++) {
    hourlyTotal = seattle.staffNeededArray[i] + tokyo.staffNeededArray[i] + dubai.staffNeededArray[i] + paris.staffNeededArray[i] + lima.staffNeededArray[i];
    totals.push(hourlyTotal);
  }
  return totals;
}

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

var seattle = new CookiesPerLocation('Seattle',23,65,6.3);
var tokyo = new CookiesPerLocation('Tokyo',3,24,1.2);
var dubai = new CookiesPerLocation('Dubai',11,38,3.7);
var paris = new CookiesPerLocation('Paris', 20, 38, 2.3);
var lima = new CookiesPerLocation('Lima',2,16,4.6);


createTableHeader('cookieChart');
createTableHeader('cookieStaff');
seattle.render();
tokyo.render();
dubai.render();
paris.render();
lima.render();
renderHourlyTotals('cookieChart');
renderHourlyTotals('cookieStaff');


