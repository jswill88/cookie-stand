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
    var hour = '';
    for (var i = 6; i < 20; i++) {
      if (i > 12) {
        hour = `${i-12}pm`;
      }
      else {
        hour = `${i}am`;
      }
      var soldThisHour = this.cookiesSoldPerHour();
      cookieArray.push(`${hour}: ${soldThisHour}`);
      total = total + soldThisHour;
    }
    cookieArray.push(`Total: ${total}`);
    return cookieArray;
  }
};
