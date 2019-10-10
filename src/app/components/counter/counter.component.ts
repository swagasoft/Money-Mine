import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $.fn.jQuerySimpleCounter = function( options ) {
	    var settings = $.extend({
	        start:  0,
	        end:    100,
	        easing: 'swing',
	        duration: 400,
	        complete: ''
	    }, options );

	    var thisElement = $(this);

	    $({count: settings.start}).animate({count: settings.end}, {
			duration: settings.duration,
			easing: settings.easing,
			step: function() {
				var mathCount = Math.ceil(this.count);
				thisElement.text(mathCount);
			},
			complete: settings.complete
		});
	};


$('#number1').jQuerySimpleCounter({end: 1,duration: 5000});
$('#number2').jQuerySimpleCounter({end: 6.2,duration: 5000});
$('#number3').jQuerySimpleCounter({end: 1,duration: 5000});
$('#number4').jQuerySimpleCounter({end: 1274,duration: 15500});


  }

}
