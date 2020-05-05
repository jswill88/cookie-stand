'use strict';
var hours = ['6:00am','7:00am','8:00am', '9:00am','10:00am','11:00am','12:00pm','1:00pm','2:00pm','3:00pm','4:00pm','5:00pm','6:00pm','7:00pm'];

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

CookiesPerLocation.prototype.addListToPage = function(){
  this.makeCookieArray();
  for (var j = 0; j < this.cookieArray.length; j++) {
    var parent = document.getElementById(this.location.toLowerCase());
    var listItem = document.createElement('li');
    listItem.textContent = this.cookieArray[j];
    parent.appendChild(listItem);
  }
};

var seattle = new CookiesPerLocation('Seattle',23,65,6.3);
var tokyo = new CookiesPerLocation('Tokyo',3,24,1.2);
var dubai = new CookiesPerLocation('Dubai',11,38,3.7);
var paris = new CookiesPerLocation('Paris', 20, 38, 2.3);
var lima = new CookiesPerLocation('Lima',2,16,4.6);

seattle.addListToPage();
tokyo.addListToPage();
dubai.addListToPage();
paris.addListToPage();
lima.addListToPage();

