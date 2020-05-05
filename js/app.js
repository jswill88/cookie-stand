'use strict';
var hours = ['6:00am','7:00am','8:00am', '9:00am','10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm','6:00pm','7:00pm'];

function createTableHeader() {
  // make thead
  var parent = document.getElementById('cookieChart');
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
  timeHeader.textContent = 'Total';
  tr.appendChild(timeHeader);
}

function CookiesPerLocation(location, minimumCustomers, maximumCustomers, avgCookieSale) {
  this.location = location;
  this.minimumCustomers = minimumCustomers;
  this.maximumCustomers = maximumCustomers;
  this.avgCookieSale = avgCookieSale;
  this.cookieArray = [],
  this.total = 0;
}

CookiesPerLocation.prototype.cookiesSoldPerHour = function(){
  var customer = Math.floor(Math.random()*(this.maximumCustomers - this.minimumCustomers + 1) + this.minimumCustomers);
  var cookiesPerHour = Math.round((this.avgCookieSale) * customer);
  return cookiesPerHour;
};

CookiesPerLocation.prototype.makeCookieArray = function(){
  console.log(this.location);
  for (var i = 0; i < hours.length; i++) {
    var soldThisHour = this.cookiesSoldPerHour();
    this.cookieArray.push(soldThisHour);
    console.log(`current ${soldThisHour}`);
    this.total += soldThisHour;
    console.log(`total ${this.total}`);
  }
  this.cookieArray.push(this.total);
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

function renderHourlyTotals(){
  // make tfoot
  var parent = document.getElementById('cookieChart');
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
    hourTotal.textContent = getTotals()[i];
    tr.appendChild(hourTotal);
  }
}

var seattle = new CookiesPerLocation('Seattle',23,65,6.3);
var tokyo = new CookiesPerLocation('Tokyo',3,24,1.2);
var dubai = new CookiesPerLocation('Dubai',11,38,3.7);
var paris = new CookiesPerLocation('Paris', 20, 38, 2.3);
var lima = new CookiesPerLocation('Lima',2,16,4.6);


createTableHeader();
seattle.render();
tokyo.render();
dubai.render();
paris.render();
lima.render();
getTotals();
renderHourlyTotals();

