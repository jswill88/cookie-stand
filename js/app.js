'use strict';

// eslint-disable-next-line no-unused-vars
var seattle = {
  location: 'Seattle',
  minCust: 23,
  maxCust: 65,
  avgCookieSale: 6.3,
  cookiesSoldPerHour: function(){
    var customer = Math.floor(Math.random()*(this.maxCust - this.minCust) + 23);
    return Math.floor((this.avgCookieSale)*customer);
  },
  makeCookieArray: function(){
    var cookieArray = [];
    var total = 0;
    for (var i = 0; i < 14; i++) {
      cookieArray.push(this.cookiesSoldPerHour());
      total = total + this.makeCookieArray()[i];
    }
    return [cookieArray,total];
  }
};
