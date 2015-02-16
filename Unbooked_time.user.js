// ==UserScript==
// @name        Unbooked time
// @namespace   jlamUnbooked
// @description Calculates the unbooked time in a redmine system since the first ticket of the day
// @include     https://code.credil.org/*
// @version     1
// @grant       none
// ==/UserScript==
  


//1. Calculate the amount of hours since the earliest ticket logging 
var arrayOfTimesElemns = $("#activity > dl:nth-child(2) > dt.time-entry > span:nth-child(1)");

var arrayOfTimes = [];

for(var i = 0, l = arrayOfTimesElemns.length; i < l; i++) {
    arrayOfTimes.push( $(arrayOfTimesElemns[i]).text());
}

// Sort it
arrayOfTimes.sort();

var minTime = arrayOfTimes[0];

var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();

var todayStr = d.getFullYear() + '/' +
    (month<10 ? '0' : '') + month + '/' +
    (day<10 ? '0' : '') + day;

//create date format          
var timeStart = new Date(todayStr + ' ' + minTime);
var timeEnd = $.now();

var hourDiff = Math.round((timeEnd - timeStart)/1000/60/60*100)/100;             


//2. Get the amount of hours logged today



var stringToAppend = '<div align="right">'+ hourDiff +'</div>';

$("#header").append(stringToAppend);

