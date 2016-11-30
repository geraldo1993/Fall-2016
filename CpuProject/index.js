var FIFO = function ( conf ) {
	var grunt = [] ;
	time = 0 ;

	var findNext = function () {
		// Strategy For FIFO
		var _conf = JSON.parse(JSON.stringify(conf)) ;
		_conf = _conf.filter(function (obj) {
			return obj.r > 0 && obj.a <= time
		}) ;
		_conf.sort(function (a , b ) { return a.a > b.a } ) ;
		return _conf[0] ;
	}

	_init(conf);

	while ( !_isFinish(conf) ) {
		var _next = findNext() ;
		if ( _next != undefined ) {
			//console.log(time , _next) ;
			var _nextIdx = _next.idx ;
			var _duration = _next.d ;

			conf[_nextIdx].r = 0  ;
			if ( conf[_nextIdx].fr == null ) { conf[_nextIdx].fr = time }
			time += _duration ;
			conf[_nextIdx].f = time  ;

			for ( var i = 0 ; i < _duration ; i++ ) {
				grunt.push(_next.idx) ;
			}
			//console.log("g : " , grunt) ;
		}

		// appned a Stall
		else {
			grunt.push(-1) ;
			time += 1 ;
		}
	}

	console.log("DONE" , grunt , conf ) ;
	console.log(_sum(conf)) ;
} ;

var LIFO = function ( conf ) {
	var grunt = [] ;
	time = 0 ;

	var findNext = function () {
		// Strategy For FIFO
		var _conf = JSON.parse(JSON.stringify(conf)) ;
		_conf = _conf.filter(function (obj) {
			return obj.r > 0 && obj.a <= time
		}) ;
		_conf.sort(function (a , b ) { return a.a < b.a } ) ;
		return _conf[0] ;
	}

	_init(conf);

	while ( !_isFinish(conf) ) {
		var _next = findNext() ;
		if ( _next != undefined ) {
			//console.log(time , _next) ;
			var _nextIdx = _next.idx ;
			var _duration = _next.d ;

			conf[_nextIdx].r = 0  ;
			if ( conf[_nextIdx].fr == null ) { conf[_nextIdx].fr = time }
			time += _duration ;
			conf[_nextIdx].f = time  ;

			for ( var i = 0 ; i < _duration ; i++ ) {
				grunt.push(_next.idx) ;
			}
			//console.log("g : " , grunt) ;
		}

		// appned a Stall
		else {
			grunt.push(-1) ;
			time += 1 ;
		}
	}
	console.log("DONE" , grunt , conf ) ;
	console.log(_sum(conf)) ;
} ;


var SJF = function (conf) {
	var grunt = [] ;
	time = 0 ;

	var findNext = function () {
		var _conf = JSON.parse(JSON.stringify(conf)) ;
		_conf = _conf.filter(function (obj) {
			return obj.r > 0 && obj.a <= time
		}) ;
		_conf.sort(function (a , b ) { return a.d > b.d } ) ;
		return _conf[0] ;
	}

	_init(conf);

	while ( !_isFinish(conf) ) {
		var _next = findNext() ;
		if ( _next != undefined ) {
			//console.log(time , _next) ;
			var _nextIdx = _next.idx ;
			var _duration = _next.d ;

			conf[_nextIdx].r = 0  ;
			if ( conf[_nextIdx].fr == null ) { conf[_nextIdx].fr = time }
			time += _duration ;
			conf[_nextIdx].f = time  ;

			for ( var i = 0 ; i < _duration ; i++ ) {
				grunt.push(_next.idx) ;
			}
			//console.log("g : " , grunt) ;
		}

		// appned a Stall
		else {
			grunt.push(-1) ;
			time += 1 ;
		}
	}
	console.log("DONE" , grunt , conf ) ;
	console.log(_sum(conf)) ;

} ;

var RR = function ( q , conf ) {
	var grunt = [] ;
	time = 0 ;
	var queue = [] ;

	var checkArrival = function () {
		for ( var i = 0 ; i < conf.length ; i++ ) {
			if ( conf[i].a == time ) {
				queue.push(conf[i]) ;
			}
		}
	}

	var findNext = function () {
		if ( queue.length < 1 ) {
			return undefined ;
		}
		else if ( queue.length == 1 ) {
			return queue[0]
		}
		else {
			return queue[0];
		}
	}

	_init(conf);
	checkArrival() ;

	while ( !_isFinish(conf) ) {
		var _next = findNext() ;
		//console.log(time , _next) ;
		if ( _next != undefined ) {
			var _nextIdx = _next.idx ;


			if ( conf[_nextIdx].r > q ) {
				conf[_nextIdx].r -= q  ;
				for ( var i = 0 ; i < q ; i++ ) {
					grunt.push(_next.idx) ;
				}
			}
			else if ( conf[_nextIdx].r == q ) {
				for ( var i = 0 ; i < conf[i].r ; i++ ) {
					grunt.push[_nextIdx] ;
				}
				conf[_nextIdx].r = 0 ;
				conf[_nextIdx].f = time + q ;
			}
			else {
				for ( var i = 0 ; i < conf[i].r ; i++ ) {
					grunt.push[_nextIdx] ;
				}
				var _stall = q - conf[i].r ;
				for ( var i = 0 ; i < _stall ; i++ ) {
					grunt.push(-1) ;
				}
				conf[_nextIdx].f = time + conf[_nextIdx].r ;
				conf[_nextIdx].r = 0 ;
			}

			if ( conf[_nextIdx].fr == null ) { conf[_nextIdx].fr = time }
			for ( var i = 0 ; i < q ; i++ ) {
				time++ ;
				checkArrival() ;
			}

			queue.push(queue.shift()) ;
			//console.log("g : " , grunt) ;
		}

		// appned a Stall
		else {
			grunt.push(-1) ;
			time += 1 ;
			checkArrival() ;
		}

	}
	console.log("DONE" , grunt , conf ) ;
	console.log(_sum(conf)) ;
}

var _init = function (conf) {
	for ( var i = 0 ; i < conf.length ; i ++ ) {
		conf[i].fr = null ;
		conf[i].f = null ;
		conf[i].idx = i ;
		conf[i].r = conf[i].d ;
	}
}

var _sum = function (conf) {
	var _avgrespTime = 0 ;
	var _avgWaitingTime = 0 ;
	var _turnaroundTime = 0 ;

	for ( var i = 0 ; i < conf.length ; i++ ){
		_avgWaitingTime += ( conf[i].f - conf[i].d - conf[i].a ) ;
		_avgrespTime += ( conf[i].fr - conf[i].a ) ;
		_turnaroundTime += ( conf[i].f - conf[i].a ) ;
	} ;

	var _count = conf.length ;
	return {
		avgWaitingTime : _avgWaitingTime/_count ,
		turnaroundTime : _turnaroundTime/_count ,
		avgrespTime : _avgrespTime/_count
	}
} ;

var _isFinish = function ( conf ) {
	for ( var i = 0 ; i < conf.length ; i++ ) {
		if ( conf[i].r > 0 ) {
			return false ;
		}
	}
	return true ;
}


var test = [
	{ a : 5 , d : 5 } ,
	{ a : 1 , d : 8 } ,
	{ a : 2 , d : 9 } ,
	{ a : 30 , d : 2 } ,
	{ a : 6 , d : 1 } ,
] ;

LIFO(test) ;
FIFO(test) ;
SJF(test) ;
RR(2, test) ;
