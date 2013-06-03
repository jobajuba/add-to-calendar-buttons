var createAddToCalendarLinks = function(params) {

  // Create the result element, this is what will be returned
  var result = document.createElement('div');
  var msInMinutes = 60 * 1000;

  var formatTime = function(date) {
    return date.toISOString().replace(/[-:]|(\.\d{3})/g, '');
  };

  var GENERATORS = function(event) {
    var startTime = formatTime(event.start);
    var endTime = formatTime(new Date(event.start.getTime() + (event.duration * msInMinutes)));
    var google = function(event) {
      var href = encodeURI([
        'https://www.google.com/calendar/render',
        '?action=TEMPLATE',
        '&text=' + (event.title || ''),
        '&dates=' + (startTime || ''),
        '/' + (endTime || ''),
        '&details=' + (event.description || ''),
        '&location=' + (event.address || ''),
        '&sprop=&sprop=name:'
      ].join(''));
      return '<a class="icon-google" target="_blank" href="' + href + '">Add to Google</a>';
    };

    var yahoo = function(event) {
      // Yahoo dates are crazy, we need to convert the duration from minutes to hh:mm
      var yahooHourDuration = event.duration < 600 ? '0' + Math.floor((event.duration / 60)) : Math.floor((event.duration / 60));
      var yahooMinuteDuration = event.duration % 60 < 10 ? '0' + event.duration % 60 : event.duration % 60;
      var yahooEventDuration = yahooHourDuration + yahooMinuteDuration;

      var href = encodeURI([
        'http://calendar.yahoo.com/?v=60&view=d&type=20',
        '&title=' + (event.title || ''),
        '&st=' + (formatTime(new Date(event.start - (240 * 60000))) || ''),
        '&dur=' + ( yahooEventDuration || ''),
        '&desc=' + (event.description || ''),
        '&in_loc=' + (event.address || '')
      ].join(''));
      return '<a class="icon-yahoo" target="_blank" href="' + href + '">Add to Yahoo</a>';
    };

    return {
      google: google(event),
      yahoo: yahoo(event)
    };
  };

  // Make sure we have the necessary event data, such as start time and event duration
  if (params.data && params.data.start && params.data.duration) {
    var generatedCalendars = GENERATORS(params.data);
    
    Object.keys(generatedCalendars).forEach(function(services) {
      result.innerHTML += '<li>' + generatedCalendars[services] + '</li>';
    });

  } else {
    console.log('Event details missing.');
    return;
  }

  // Add Class and ID to div if either one is passed as an option
  var randomID = Math.floor(Math.random() * 1000000); // Generate a 6-digit random ID, in case you have several calendars on the same page
  result.className = 'add-to-calendar' + ((params.options && params.options.class) ? (' ' + params.options.class) : '');
  result.id = 'add-to-calendar-' + randomID + ((params.options &&  params.options.id) ? (' ' + params.options.id) : '');

  return result;
};