# OuiCal

A simple JS script that enables you to add an "add to calendar" button to your events.

Call 'createAddToCalendarLinks' with your event info, pass in any optional parameters such as a class and/ or id and boom! Insert your add-to-calendar div wherever you'd like.

## Example

    createAddToCalendarLinks({
      options: {
        class: 'my-class',
        id: 'my-id'
      },
      data: {
        title: 'Billiard And Drinks',             // Event title
        start: new Date('June 15, 2013 19:00'),   // Event start date
        duration: 120,                            // Event duration (IN MINUTES)
        address: '714 Moon Street, New York',
        description: 'Get together with coworkers and shoot some pool.'
      }
    });

[Here is the live example](http://carlsednaoui.github.io/ouical/example.html)

## GitHub Project Page
[Official Project Page](http://carlsednaoui.github.io/ouical/)

## License
[MIT](http://opensource.org/licenses/MIT)

## TODO
- Make this fail gracefully when no Data is passed
- Allow multiple calendars on one page
- Allow user to pass in end time v.s. only event duration
- Add option for all-day events?