snippet = {

	init: function(path) {
		var count = 0;
		snippet.timedUpdate();
		var myTimer = setInterval(function(){	
			snippet.timedUpdate();	
		}, 60*100*10);
				
	},

	slideShow : function() {//CREATE A slideShow
		
	},

	timedUpdate : function() {
  		snippet.makeQuery(42.371227435069805, -71.02455139160156, "Logan Airport"); // Logan Airport
  		snippet.makeQuery(42.36057345238455, -71.09561920166016, "MIT"); // MIT
		snippet.makeQuery(42.367676308265196, -71.10660552978516, "Central Square"); //Central Square
		snippet.makeQuery(42.373002923187165, -71.1141586303711, "Harvard"); // Harvard
		snippet.makeQuery(42.35296235855687, -71.08034133911133, "Back Bay"); // BackBay
		snippet.makeQuery(42.361207668593636, -71.06077194213867, "Beacon Hill"); // Beacon Hill
		snippet.makeQuery(42.34915646596519, -71.06952667236328, "Boston Gardens"); // Boston Gardens
		snippet.makeQuery(42.342939679141914, -71.08634948730469, "South End"); // South End
		snippet.makeQuery(42.341797753508665, -71.10763549804688, "Brighton"); // Brighton
		snippet.makeQuery(42.337737405512826, -71.07398986816406, "Roxbury Crossing"); //Roxbury Crossing
		snippet.makeQuery(42.31590854308647, -71.08394622802734, "Roxbury"); //Roxbury
		snippet.makeQuery(42.32986973516181, -71.10694885253906, "Mission Hill"); //Mission Hill
		snippet.makeQuery(42.30964086428392, -71.11542463302612, "Jamaica Plain"); //Jamaica PLain
		snippet.makeQuery(42.30930762844371, -71.05948448181152, "South Boston"); //Dorchester South Boston
		snippet.makeQuery(42.32961592295752, -71.05888366699219, "North Dorchester"); //North Dorchester
		snippet.makeQuery(42.28619897559957, -71.07742309570312, "South Dorchester"); //South Dorchester
		snippet.makeQuery(42.28061099545887, -71.09699249267578, "Mattapan"); //Mattapan
		snippet.makeQuery(42.28264304558087, -71.1203384399414, "Roslinedale") ;//Roslinedale
		snippet.makeQuery(42.28875467633035, -71.08325958251953, "Harambee");//Harambee
		snippet.makeQuery(42.3875968, -71.0994968, "Somerville");//Somerville
	},
	makeQuery : function(geolatval, geolonval, loc) {
		var srcString = 'https://api.instagram.com/v1/media/search?lat='+geolatval+'\&lng='+geolonval+'\&client_id=74baf9e956ba440d97c94927a9631eae&distance=4000&callback=parseData&count=15' //5000 is the largest supported radius
		$.ajax({
			type: "GET", 
			dataType:"jsonp", 
			cache: false, 
			url: srcString, 
			success: function(data){
				var $row = $('#slider').find('#'+ data.data[0].id);//need to simplify/ traces through to much of the DOM
				if($row.attr('id')== undefined){snippet.populateFields(data, loc);}else{};	
			}
		});
	return false;
	},

	populateFields: function(data, loc) {
		console.log(data);			
		var location = loc;
		var userData = data.data[0];
		var imageId = userData.id;	
		var userName = userData.user.full_name;
		var userHandle = userData.user.username;
		var timestamp = snippet.dateToString(userData.created_time);
		var thumbnail = userData.images.thumbnail.url;
		
		var $row = $('#cell').clone().appendTo('#slider');
		$row.attr('id', imageId);
		var $imgHolder = $row.find('.image').find("img");
		$imgHolder.attr("src", thumbnail);
		var $location = $row.find('.location').html(location);	
		var $timestamp = $row.find('.timestamp').html(timestamp[0]);
		var $day = $('#main').find("#today").html(timestamp[1]);
		
		$row.hover(function(){snippet.hoverImage(data.data[0])});
	},

	hoverImage: function(evt){
		var userData = evt;
		var stdImageUrl = userData.images.standard_resolution.url;
		if(userData.caption == null){var captionTxt = "";}else{var captionTxt = userData.caption.text;};
		var userHandle = userData.user.username;

		var $row = $('#display').find('.stdImage');
		var $imgHolder = $row.find("img");
		$imgHolder.attr("src", stdImageUrl);
		var $captionTxt = $('#display').find('.caption').html(captionTxt + "..." + userHandle);	
	},

	dateToString : function(mDate) {
		var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var d = new Date();
		d.setTime(mDate*1000);
		suffix = "am";
		hour = d.getHours();
		mins = d.getUTCMinutes();
		if (mins < 10) mins = "0"+mins;
		if (hour > 11) {
			suffix = "pm";
			hour = hour - 12;
		}
		if (hour == 0) hour = 12;
		dayofmonth = d.getUTCDate();
		month = months[d.getMonth()];
		day = days[d.getDay()];
		dateStringA = hour+":"+mins+suffix
		dateStringB = " "+day+" "+d.getMonth()+"/"+dayofmonth+"/11";
		
		return [dateStringA, dateStringB];
	}	
}