'use strict';

var seattle = {

  location: 'Seattle',
  minCust: 23,
  maxCust: 65,
  avgCookieSale: 6.3,
  cookieArray: [],

  cookiesSoldPerHour: function(){
    var customer = Math.random()*(this.maxCust - this.minCust) + this.minCust;
    var cookiesPerHour = Math.floor((this.avgCookieSale) * customer);
    return cookiesPerHour;
  },

  makeCookieArray: function(){
    console.log(this.location);
    var total = 0;
    var hour = '';
    for (var i = 0; i < 14; i++) {
      if (i + 6 > 12) {
        hour = `${i - 6}pm`;
      } else if (i === 6) {
        hour = '12pm';
      } else {
        hour = `${i + 6}am`;
      }
      var soldThisHour = this.cookiesSoldPerHour();
      this.cookieArray.push(`${hour}: ${soldThisHour}`);
      console.log(`current ${soldThisHour}`);
      total += soldThisHour;
      console.log(`total ${total}`);
    }
    this.cookieArray.push(`Total: ${total}`);
  },

  addListToPage: function(){
    this.makeCookieArray();
    for (var j = 0; j < this.cookieArray.length; j++) {
      var parent = document.getElementById(this.location.toLowerCase());
      var listItem = document.createElement('li');
      listItem.textContent = this.cookieArray[j];
      parent.appendChild(listItem);
    }
  }
};

var tokyo = {
  location: 'Tokyo',
  minCust: 3,
  maxCust: 24,
  avgCookieSale: 1.2,
  cookieArray: [],

  cookiesSoldPerHour: function() {
    var customer = Math.random()*(this.maxCust - this.minCust) + this.minCust;
    var cookiesPerHour = Math.floor((this.avgCookieSale) * customer);
    return cookiesPerHour;
  },

  makeCookieArray: function(){
    console.log(this.location);
    var total = 0;
    var hour = '';
    for (var i = 0; i < 14; i++) {
      if (i + 6 > 12) {
        hour = `${i - 6}pm`;
      } else if (i === 6) {
        hour = '12pm';
      } else {
        hour = `${i + 6}am`;
      }
      var soldThisHour = this.cookiesSoldPerHour();
      this.cookieArray.push(`${hour}: ${soldThisHour}`);
      console.log(`current ${soldThisHour}`);
      total += soldThisHour;
      console.log(`total ${total}`);
    }
    this.cookieArray.push(`Total: ${total}`);
  },

  addListToPage: function(){
    this.makeCookieArray();
    for (var j = 0; j < this.cookieArray.length; j++) {
      var parent = document.getElementById(this.location.toLowerCase());
      var listItem = document.createElement('li');
      listItem.textContent = this.cookieArray[j];
      parent.appendChild(listItem);
    }
  }
};

var dubai = {
  location: 'Dubai',
  minCust: 11,
  maxCust: 38,
  avgCookieSale: 3.7,
  cookieArray: [],

  cookiesSoldPerHour: function() {
    var customer = Math.random()*(this.maxCust - this.minCust) + this.minCust;
    var cookiesPerHour = Math.floor((this.avgCookieSale)*customer);
    return cookiesPerHour;
  },

  makeCookieArray: function(){
    console.log(this.location);
    var total = 0;
    var hour = '';
    for (var i = 0; i < 14; i++) {
      if (i + 6 > 12) {
        hour = `${i - 6}pm`;
      } else if (i === 6) {
        hour = '12pm';
      } else {
        hour = `${i + 6}am`;
      }
      var soldThisHour = this.cookiesSoldPerHour();
      this.cookieArray.push(`${hour}: ${soldThisHour}`);
      console.log(`current ${soldThisHour}`);
      total += soldThisHour;
      console.log(`total ${total}`);
    }
    this.cookieArray.push(`Total: ${total}`);
  },

  addListToPage: function(){
    this.makeCookieArray();
    for (var j = 0; j < this.cookieArray.length; j++){
      var parent = document.getElementById(this.location.toLowerCase());
      var listItem = document.createElement('li');
      listItem.textContent = this.cookieArray[j];
      parent.appendChild(listItem);
    }
  }
};

var paris = {
  location: 'Paris',
  minCust: 20,
  maxCust: 38,
  avgCookieSale: 2.3,
  cookieArray: [],

  cookiesSoldPerHour: function() {
    var customer = Math.random()*(this.maxCust - this.minCust) + this.minCust;
    var cookiesPerHour = Math.floor((this.avgCookieSale)*customer);
    return cookiesPerHour;
  },

  makeCookieArray: function(){
    console.log(this.location);
    var total = 0;
    var hour = '';
    for (var i = 0; i < 14; i++) {
      if (i + 6 > 12) {
        hour = `${i - 6}pm`;
      } else if (i === 6) {
        hour = '12pm';
      } else {
        hour = `${i + 6}am`;
      }
      var soldThisHour = this.cookiesSoldPerHour();
      this.cookieArray.push(`${hour}: ${soldThisHour}`);
      console.log(`current ${soldThisHour}`);
      total += soldThisHour;
      console.log(`total ${total}`);
    }
    this.cookieArray.push(`Total: ${total}`);
  },

  addListToPage: function(){
    this.makeCookieArray();
    for (var j = 0; j < this.cookieArray.length; j++){
      var parent = document.getElementById(this.location.toLowerCase());
      var listItem = document.createElement('li');
      listItem.textContent = this.cookieArray[j];
      parent.appendChild(listItem);
    }
  }
};


var lima = {
  location: 'Lima',
  minCust: 2,
  maxCust: 16,
  avgCookieSale: 4.6,
  cookieArray: [],

  cookiesSoldPerHour: function() {
    var customer = Math.random()*(this.maxCust - this.minCust) + this.minCust;
    var cookiesPerHour = Math.floor((this.avgCookieSale)*customer);
    return cookiesPerHour;
  },

  makeCookieArray: function(){
    console.log(this.location);
    var total = 0;
    var hour = '';
    for (var i = 0; i < 14; i++) {
      if (i + 6 > 12) {
        hour = `${i - 6}pm`;
      } else if (i === 6) {
        hour = '12pm';
      } else {
        hour = `${i + 6}am`;
      }
      var soldThisHour = this.cookiesSoldPerHour();
      this.cookieArray.push(`${hour}: ${soldThisHour}`);
      console.log(`current ${soldThisHour}`);
      total += soldThisHour;
      console.log(`total ${total}`);
    }
    this.cookieArray.push(`Total: ${total}`);
  },

  addListToPage: function(){
    this.makeCookieArray();
    for (var j = 0; j < this.cookieArray.length; j++) {
      var parent = document.getElementById(this.location.toLowerCase());
      var listItem = document.createElement('li');
      listItem.textContent = this.cookieArray[j];
      parent.appendChild(listItem);
    }
  }
};

seattle.addListToPage();
tokyo.addListToPage();
dubai.addListToPage();
paris.addListToPage();
lima.addListToPage();

