jQuery(document).ready(function($){
		var data = {resource_id: '920092aa-c49d-4c52-96f9-58f7f7502bf2'};
        document.getElementById("timelinestart").innerHTML = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script><html lang="en" class="no-js"<head><meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"><link href="https://fonts.googleapis.com/css?family=Playfair+Display:700,900|Fira+Sans:400,400italic" rel="stylesheet" type="text/css"><link rel="stylesheet" href="css/reset.css"> <!-- CSS reset --><link rel="stylesheet" href="css/style.css"> <!-- Resource style --><script type="text/javascript" src="http://code.jquery.com/jquery-2.2.0.min.js"></script><script src="js/modernizr.js"></script> <!-- Modernizr --><title>Horizontal Timeline | CodyHouse</title></head><body><section class="cd-horizontal-timeline"><div class="timeline"><div class="events-wrapper"><div class="events"><ol><li><a id="efirst" href="#0" data-date="16/01/2014" class="selected"></a></li></ol><span class="filling-line" aria-hidden="true"></span></div> <!-- .events --></div> <!-- .events-wrapper --><ul class="cd-timeline-navigation"><li><a href="#0" class="prev inactive">Prev</a></li><li><a href="#0" class="next">Next</a></li></ul> <!-- .cd-timeline-navigation --></div> <!-- .timeline --><div class="events-content"><ol><li id= "first" class="selected" data-date="16/01/2014"><h2 id="title"></h2><em id="date"></em><p id="summary"></p><p> <a id = "hyperlink"></a></p><p id = "footnote"</p><div><img id = "pic" height = "200px" width = "200px"/>	</div></li></ol></div> <!-- .events-content --></section><script src="js/jquery-2.1.4.js"></script><script src="js/jquery.mobile.custom.min.js"></script><script src="js/main1.js"></script> </body></html>'
	$.ajax({
		url: 'https://data2.opentechinstitute.org/api/action/datastore_search',
		type: 'GET',
		data: data,
		cache: true,
		dataType: 'jsonp',
		success: function(data) {
            //$('#efirst').data('date',JSON.stringify(data.result.records[0].tdate));
		    console.log(JSON.stringify(data.result.records[0].Tdate));
            document.getElementById("efirst").setAttribute('data-date',(JSON.stringify(data.result.records[0].Tdate)).replace(/['"]+/g, ''));
			document.getElementById("first").setAttribute('data-date',(JSON.stringify(data.result.records[0].Tdate)).replace(/['"]+/g, ''));

		    document.getElementById("efirst").innerHTML= (JSON.stringify(data.result.records[0].Date).replace(/['"]+/g, '')); 
            document.getElementById("title").innerHTML=(JSON.stringify(data.result.records[0].Title).replace(/['"]+/g, ''));
		    document.getElementById("date").innerHTML=(JSON.stringify(data.result.records[0].Date).replace(/['"]+/g, ''));
		    document.getElementById("summary").innerHTML=(JSON.stringify(data.result.records[0].FullDescription).replace(/['"]+/g, ''));
		    document.getElementById("hyperlink").innerHTML=(JSON.stringify(data.result.records[0].Hyperlink).replace(/['"]+/g, ''));
			document.getElementById("hyperlink").href =(JSON.stringify(data.result.records[0].Hyperlink).replace(/['"]+/g, ''));				

		    document.getElementById("footnote").innerHTML=(JSON.stringify(data.result.records[0].Footnote).replace(/['"]+/g, ''));
			console.log((JSON.stringify(data.result.records[0].Images).replace(/['"]+/g, '')))
			document.getElementById("pic").src = (JSON.stringify(data.result.records[0].Images).replace(/['"]+/g, ''));
			
            for (i = 1; i < data.result.records.length; i++){
                $(".events ol").append('<li><a id="datedata'+i+'" href="#0"></a></li>');
		        document.getElementById("datedata"+i).setAttribute('data-date',(JSON.stringify(data.result.records[i].Tdate)).replace(/['"]+/g, ''));
		        console.log((JSON.stringify(data.result.records[i].Date).replace(/['"]+/g, '')));
				document.getElementById("datedata"+i).innerHTML= (JSON.stringify(data.result.records[i].Date).replace(/['"]+/g, ''));     }  
            for (i = 1; i < data.result.records.length; i++){
                $(".events-content ol").append('<li id = "dateindata' + i+'" ><h2 id="title'+i+'"></h2><em id="date'+i+'"></em><p id="summary'+i+'"></p><p id = "hyperlink'+i+'"></p> <p id = "footnote'+i+'"></p> <div> <img id="pic'+i+'" width = "200px" height = "200px"></div></li>');
		    	document.getElementById("dateindata"+i).setAttribute('data-date',(JSON.stringify(data.result.records[i].Tdate)).replace(/['"]+/g, ''));

				document.getElementById("title"+i).innerHTML=(JSON.stringify(data.result.records[i].Title).replace(/['"]+/g, ''));
		        document.getElementById("date"+i).innerHTML=(JSON.stringify(data.result.records[i].Date).replace(/['"]+/g, ''));
		        document.getElementById("summary"+i).innerHTML=(JSON.stringify(data.result.records[i].FullDescription).replace(/['"]+/g, ''));
		        document.getElementById("hyperlink"+i).innerHTML=(JSON.stringify(data.result.records[i].Hyperlink).replace(/['"]+/g, ''));
		        document.getElementById("hyperlink"+i).href =(JSON.stringify(data.result.records[i].Hyperlink).replace(/['"]+/g, ''));				
		        document.getElementById("footnote"+i).innerHTML=(JSON.stringify(data.result.records[i].Footnote).replace(/['"]+/g, ''));
				document.getElementById("pic"+i).src = (JSON.stringify(data.result.records[i].Images).replace(/['"]+/g, ''));

  }
  				var timelines = $('.cd-horizontal-timeline');
		eventsMinDistance = 20;

	(timelines.length > 0) && initTimeline(timelines);  
            }
		}
	);
	//var timelines = $('.cd-horizontal-timeline'),
		eventsMinDistance = 60;

	//(timelines.length > 0) && initTimeline(timelines);

	function initTimeline(timelines) {
		timelines.each(function(){
			var timeline = $(this),
				timelineComponents = {};
			//cache timeline components 
			timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
			timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
			timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
			timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
			console.log(timelineComponents['timelineEvents']);
			timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
			timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
			//console.log(parseDate(timelineComponents['timelineEvents']));

			timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
			timelineComponents['eventsContent'] = timeline.children('.events-content');

			//assign a left postion to the single events along the timeline
			setDatePosition(timelineComponents, eventsMinDistance);
			//assign a width to the timeline
			var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
			console.log(timelineTotWidth);
			//the timeline has been initialize - show it
			timeline.addClass('loaded');

			//detect click on the next arrow
			timelineComponents['timelineNavigation'].on('click', '.next', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'next');
			});
			//detect click on the prev arrow
			timelineComponents['timelineNavigation'].on('click', '.prev', function(event){
				event.preventDefault();
				updateSlide(timelineComponents, timelineTotWidth, 'prev');
			});
			//detect click on the a single event - show new event content
			timelineComponents['eventsWrapper'].on('click', 'a', function(event){
				event.preventDefault();
				timelineComponents['timelineEvents'].removeClass('selected');
				$(this).addClass('selected');
				updateOlderEvents($(this));
				updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
				updateVisibleContent($(this), timelineComponents['eventsContent']);
			});

			//on swipe, show next/prev event content
			timelineComponents['eventsContent'].on('swipeleft', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
			});
			timelineComponents['eventsContent'].on('swiperight', function(){
				var mq = checkMQ();
				( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
			});

			//keyboard navigation
			$(document).keyup(function(event){
				if(event.which=='37' && elementInViewport(timeline.get(0)) ) {
					showNewContent(timelineComponents, timelineTotWidth, 'prev');
				} else if( event.which=='39' && elementInViewport(timeline.get(0))) {
					showNewContent(timelineComponents, timelineTotWidth, 'next');
				}
			});
		});
	}

	function updateSlide(timelineComponents, timelineTotWidth, string) {
		//retrieve translateX value of timelineComponents['eventsWrapper']
		var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
			wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
			console.log("translatevalue"+ translateValue);
			console.log("wrapperWidth"+ wrapperWidth);
		//translate the timeline to the left('next')/right('prev') 
		(string == 'next') 
			? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
			: translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
	}

	function showNewContent(timelineComponents, timelineTotWidth, string) {
		//go from one event to the next/previous one
		var visibleContent =  timelineComponents['eventsContent'].find('.selected'),
			newContent = ( string == 'next' ) ? visibleContent.next() : visibleContent.prev();

		if ( newContent.length > 0 ) { //if there's a next/prev event - show it
			var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
				newEvent = ( string == 'next' ) ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');
			
			updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
			updateVisibleContent(newEvent, timelineComponents['eventsContent']);
			newEvent.addClass('selected');
			selectedDate.removeClass('selected');
			updateOlderEvents(newEvent);
			updateTimelinePosition(string, newEvent, timelineComponents);
		}
	}

	function updateTimelinePosition(string, event, timelineComponents) {
		//translate timeline to the left/right according to the position of the selected event
		var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
			timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
			timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
			console.log("eventleft"+eventLeft);
			console.log("timelinewidth"+ timelineWidth);
			console.log("timelineTotWidth"+ timelineTotWidth);
		var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);

        if( (string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate) ) {
        	translateTimeline(timelineComponents, - eventLeft + timelineWidth/2, timelineWidth - timelineTotWidth);
        }
	}

	function translateTimeline(timelineComponents, value, totWidth) {
		var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
		value = (value > 0) ? 0 : value; //only negative translate value
		value = ( !(typeof totWidth === 'undefined') &&  value < totWidth ) ? totWidth : value; //do not translate more than timeline width
		setTransformValue(eventsWrapper, 'translateX', value+'px');
		//update navigation arrows visibility
		(value == 0 ) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
		(value == totWidth ) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
	}

	function updateFilling(selectedEvent, filling, totWidth) {
		//change .filling-line length according to the selected event
		var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
			eventLeft = eventStyle.getPropertyValue("left"),
			eventWidth = eventStyle.getPropertyValue("width");
		eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', ''))/2;
		var scaleValue = eventLeft/totWidth;
		setTransformValue(filling.get(0), 'scaleX', scaleValue);
	}

	function setDatePosition(timelineComponents, min) {
		var distprev = 0;
		var distnew = 0;
		var distanceNorm = 0;
for (i = 0; i < timelineComponents['timelineDates'].length; i++) {
var distance = Math.abs(daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i])),
distanceNorm = Math.round(distance / timelineComponents['eventsMinLapse']) + 2;
distnew = distprev + 100;
timelineComponents['timelineEvents'].eq(i).css('left', distnew + 'px');
distprev = distnew; 
}
	}

	function setTimelineWidth(timelineComponents, width) {
		var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length-1]),
			timeSpanNorm = timeSpan/timelineComponents['eventsMinLapse'],
			timeSpanNorm = Math.round(timeSpanNorm) + 4,
			totalWidth = timeSpanNorm*width*width;
		console.log(timeSpan);
		console.log(timeSpanNorm);
		console.log(totalWidth);
		timelineComponents['eventsWrapper'].css('width', totalWidth+'px');
		updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
		updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);
		totalWidth = (timelineComponents['timelineDates'].length * 100) + 100;
		return totalWidth;
	}

	function updateVisibleContent(event, eventsContent) {
		//console.log(event.data('date'));
		//if(event.data('date') != undefined){
		//event.data('date').replace(/['"]+/g, '');
		var eventDate = event.data('date').replace(/['"]+/g, ''),
			visibleContent = eventsContent.find('.selected'),
			selectedContent = eventsContent.find('[data-date="'+ eventDate +'"]'),
			selectedContentHeight = selectedContent.height();
			console.log("eventdate "+ eventDate);
			console.log("visibleContent "+ JSON.stringify(visibleContent));
			console.log("selectedContent "+ JSON.stringify(selectedContent));
			
			console.log(selectedContent.index());
			console.log(visibleContent.index());
			
		if (selectedContent.index() > visibleContent.index()) {
			var classEnetering = 'selected enter-right',
				classLeaving = 'leave-left';
		} else {
			var classEnetering = 'selected enter-left',
				classLeaving = 'leave-right';
		}
		console.log(classEnetering);
		selectedContent.attr('class', classEnetering);
		console.log(selectedContent.attr('class'));
		console.log(JSON.stringify(selectedContent));
		visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			visibleContent.removeClass('leave-right leave-left');
			selectedContent.removeClass('enter-left enter-right');
		});
		console.log(JSON.stringify(visibleContent));
		eventsContent.css('height', selectedContentHeight+'px');}
//	}

	function updateOlderEvents(event) {
		event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
	}

	function getTranslateValue(timeline) {
		var timelineStyle = window.getComputedStyle(timeline.get(0), null),
			timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
         		timelineStyle.getPropertyValue("-moz-transform") ||
         		timelineStyle.getPropertyValue("-ms-transform") ||
         		timelineStyle.getPropertyValue("-o-transform") ||
         		timelineStyle.getPropertyValue("transform");
				console.log("timelinestyle "+ timelineStyle);
				console.log("timelineTranslate"+ timelineTranslate);
        if( timelineTranslate.indexOf('(') >=0 ) {
        	var timelineTranslate = timelineTranslate.split('(')[1];
    		timelineTranslate = timelineTranslate.split(')')[0];
    		timelineTranslate = timelineTranslate.split(',');
    		var translateValue = timelineTranslate[4];
        } else {
        	var translateValue = 0;
        }

        return Number(translateValue);
	}

	function setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property+"("+value+")";
		element.style["-moz-transform"] = property+"("+value+")";
		element.style["-ms-transform"] = property+"("+value+")";
		element.style["-o-transform"] = property+"("+value+")";
		element.style["transform"] = property+"("+value+")";
	}

	//based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
	function parseDate(events) {
		console.log(events);
		var dateArrays = [];
		var i=0;
		//console.log("i is " +i);
		events.each(function(){
			console.log(i)
			var singleDate = $(this);
			console.log(singleDate);
			if(singleDate.data('date') != undefined){
				dateComp = singleDate.data('date').split("T");
				console.log(dateComp);
			if( dateComp.length > 1 ) { //both DD/MM/YEAR and time are provided
				var dayComp = dateComp[0].split('-'),
					timeComp = dateComp[1].split(':');
					//dayComp[0] = dayComp[0].split('"')[1];
					console.log(dayComp);
					console.log(timeComp);
			} else if( dateComp[0].indexOf(':') >=0 ) { //only time is provide
				var dayComp = ["2000", "0", "0"],
					timeComp = dateComp[0].split(':');
			} else { //only DD/MM/YEAR
				var dayComp = dateComp[0].split('-'),
					timeComp = ["0", "0"];
			}
			console.log(dayComp[2], dayComp[1], dayComp[0]);
			var	newDate = new Date(dayComp[0], dayComp[1]-1, dayComp[2], timeComp[0], timeComp[1]);
			console.log(newDate);
			dateArrays.push(newDate);
			}
			else {
				console.log("this was null");
			}
			i=i+1;
		});
		console.log(dateArrays);
	    return dateArrays;
	}

	function daydiff(first, second) {
	    return Math.round((second-first));
	}

	function minLapse(dates) {
		//determine the minimum distance among events
		var dateDistances = [];
		for (i = 1; i < dates.length; i++) { 
		    var distance = daydiff(dates[i-1], dates[i]);
			console.log("date1: "+dates[i-1]+ "date2: "+dates[i]+ "dist: "+ distance);
		    dateDistances.push(distance);
		}
		return Math.min.apply(null, dateDistances);
	}

	/*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		}

		return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		);
	}

	function checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}
});