// ==UserScript==
// @name        Unbooked time
// @namespace   jlamUnbooked
// @description Calculates the unbooked time in a redmine system since the first ticket of the day
// @include     https://code.credil.org/*
// @version     1
// @grant       none
// ==/UserScript==
  

// Now do the jlam stuff
console.log(new Error().lineNumber + "... ");


$("#header").append("Unbooked time GM script running...");

//1. Calculate the amount of hours since the earliest ticket logging 

var myTimeEntries = 'https://code.credil.org/users/419';

$.ajax({
	url: myTimeEntries,
	dataType: "html",
	success: function(data) {
		console.log(new Error().lineNumber + "... ");
		var arrayOfTimes = [];

		console.log(new Error().lineNumber + "... ");		
		
		var elems = $(data).find('#activity > dl:nth-child(2) > dt.time-entry > span:nth-child(1)');
		
		for(var i = 0, l = elems.length; i < l; i++) {
			console.log(new Error().lineNumber + "... ");
		    arrayOfTimes.push( $(elems[i]).text());
		}
		

		console.log(new Error().lineNumber + "... ");

		// Sort it
		arrayOfTimes.sort();

		console.log(new Error().lineNumber + "... ");
		
		var minTime = arrayOfTimes[0];

		var d = new Date();
		var month = d.getMonth()+1;
		var day = d.getDate();

		console.log(new Error().lineNumber + "... ");

		var todayStr = d.getFullYear() + '/' +
		    (month<10 ? '0' : '') + month + '/' +
		    (day<10 ? '0' : '') + day;

		//create date format          
		var timeStart = new Date(todayStr + ' ' + minTime);
		var timeEnd = $.now();

		var hourDiff = Math.round((timeEnd - timeStart)/1000/60/60*100)/100;             

		
		//2. Get total hours done.
		var todayStrWtihHyphen = d.getFullYear() + '-' +
	    (month<10 ? '0' : '') + month + '-' +
	    (day<10 ? '0' : '') + day;
		
		var totalTimeURL = 'https://code.credil.org/timesheet/report?timesheet[date_from]='+ todayStrWtihHyphen +'&timesheet[date_to]='+ todayStrWtihHyphen +'&timesheet[users][]=419';

		console.log(new Error().lineNumber + "... ");

		$.ajax({
			url: totalTimeURL,
			dataType: "html",
			beforeSend: function(xhr) {
		        xhr.setRequestHeader(
		            'X-Requested-With',
		            {
		                toString: function() { return ''; }
		            }
		        );
		    },
			success: function(data) {
				console.log("SUCCESS!! with url " + totalTimeURL);
				var timeHeader = $(data).find('#time_entries > h2:nth-child(2)');
				
				console.log(timeHeader.text());
				
				var totalTime = timeHeader.text().match('[0-9]+\,[0-9]*')[0];
				
				var unbookedTime = parseFloat(hourDiff) - parseFloat(totalTime);
				
				console.log('UnbookedTime, hourDiff, totalTime: ' + unbookedTime + ', ' + hourDiff + ', ' + totalTime);
				
				var stringToAppend = '<div align="right">'+ unbookedTime +'</div>';

				$("#header").append(stringToAppend);

				console.log(new Error().lineNumber + "... ");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("Get total time failed with url " + totalTimeURL);
			}
		});
		
		


	},
	error: function(jqXHR, textStatus, errorThrown) {
		console.log(new Error().lineNumber + "... ");
		console.log('Get my times unsuccesfull');
	}
});





console.log(new Error().lineNumber + "... ");


