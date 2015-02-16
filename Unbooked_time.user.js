// ==UserScript==
// @name        Unbooked time
// @namespace   jlamUnbooked
// @description Calculates the unbooked time in a redmine system since the first ticket of the day
// @include     https://code.credil.org/*
// @version     1
// @grant       none
// ==/UserScript==
  
$("#header").append("Unbooked time GM script running...");

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
$("#header").append(new Error().lineNumber + "... ");

var url = "https://code.credil.org/timesheet/report?timesheet%5Bdate_from%5D=2015-02-16&timesheet%5Bdate_to%5D=2015-02-16&timesheet%5Busers%5D%5B%5D=419 #time_entries > h2:nth-child(2)";
var url = "https://code.credil.org/timesheet/report?timesheet[date_from]=2015-02-16&timesheet[date_to]=2015-02-16&timesheet[users][]=419";




$("#header").append(new Error().lineNumber + "... ");

$.ajax(
    {
        type: "GET",
        url: url,
        error: function(jqXHR, textStatus, errorThrown) {$("#header").append("Got " + errorThrown + " for " + url);},
        success: function(msg)
        {
           $("#header").append(new Error().lineNumber + "... ");
            $("#header").append(msg);

        }
    });

var hoursSpent = 'None';


$("#header").append(new Error().lineNumber + "... ");

$("#header").append(hoursSpent);

$("#header").append(new Error().lineNumber + "... ");


var stringToAppend = '<div align="right">'+ hourDiff +'</div>';

$("#header").append(stringToAppend);

