function get_rotate_array(int_rotate, array_position) {
	var array_cube = new Array(int_rotate+1) ;
	for(var i = 0; i <= int_rotate; i++) {
		array_cube[i] = new Array(4) ;
		for(var j = 0; j < 4; j++){
			array_cube[i][j] = [[(array_position[i][j] % 4)], [ Math.floor(array_position[i][j] / 4 )]];
		}
	}
	return array_cube;
}

var object_score = {
	score: 0,
	line: 0,
	speed: 200
};

var cubeCombine = {
	xPosition: 4,
	yPosition: 0,
	cubesNum: 0,
	rotation: 0
};

var nextCubeCombine = {
	cubesNum: 0
};

function combineCube(int_rotate, array_position, array_rotationShift, str_color) {
	this.int_rotate = int_rotate;
	this.array_position = array_position;
	this.get_rotate_array = get_rotate_array(int_rotate, array_position) ;
	this.array_rotationShift = array_rotationShift;
	this.str_color = str_color;
}

var array_cubes = new Array(7) ;
array_cubes[0] = new combineCube(1, [[0, 1, 2, 3], [0, 4, 8, 12]], [3, -3], "'diamond.jpg'") ;//I
array_cubes[1] = new combineCube(0, [[0, 1, 4, 5]] , [0], "'blue.jpg'") ;//O
array_cubes[2] = new combineCube(3, [[1, 4, 5, 6], [1, 4, 5, 9], [4, 5, 6, 9], [1, 5, 6, 9]], [1, -1, -1, 1], "'green.jpg'") ;//T
array_cubes[3] = new combineCube(3, [[0, 4, 5, 6], [1, 5, 8, 9], [4, 5, 6, 10], [2, 1, 5, 9]], [1, -1, -1, 1], "'yellow.jpg'") ;//L
array_cubes[4] = new combineCube(3, [[2, 4, 5, 6], [0, 1, 5, 9], [4, 5, 6, 8], [1, 5, 9, 10]], [1, -1, -1, 1], "'red.jpg'") ;
array_cubes[5] = new combineCube(1, [[0, 4, 5, 9], [5, 6, 8, 9]], [-1, 1], "'purple.jpg'") ;//N
array_cubes[6] = new combineCube(1, [[0, 1, 5, 6], [2, 5, 6, 9]], [-1, 1], "'pink.jpg'") ;

function cubeCombineInit() {
	cubeCombine.xPosition = 4;
	cubeCombine.yPosition = 0;
	cubeCombine.cubesNum = nextCubeCombine.cubesNum;
	cubeCombine.rotation = 0;
	cubeCombine.array_shape = array_cubes[cubeCombine.cubesNum].get_rotate_array;
}

function init_area_array() {
	var array_area = new Array(21) ;
	for(var i = 0; i < 21; i ++) {
		array_area[i] = new Array(12) ;
		for(var j = 0; j < 11; j ++) {
			array_area[i][j] = 7;
		}
		array_area[i][11] = 11;
	}
	return array_area;
}

var array_area = init_area_array();

function goRight() {
	for(var i = 0; i < 4; i ++) {
		var int_cubeXPosition = Number(cubeCombine.array_shape[cubeCombine.rotation][i][0]) + cubeCombine.xPosition;
		var int_cubeYPosition = Number(cubeCombine.array_shape[cubeCombine.rotation][i][1]) + cubeCombine.yPosition;
		if(int_cubeXPosition >= 10) {
			return false;
		}
		if(array_area[int_cubeYPosition][int_cubeXPosition + 1] != 7) {
			return false;
		}
	}
	cubeCombine.xPosition += 1;
	return true;
}

function goLeft() {
	for(var i = 0; i < 4; i ++) {
		var int_cubeXPosition = Number(cubeCombine.array_shape[cubeCombine.rotation][i][0]) + cubeCombine.xPosition;
		var int_cubeYPosition = Number(cubeCombine.array_shape[cubeCombine.rotation][i][1]) + cubeCombine.yPosition;
		if(int_cubeXPosition <= 0) {
			return false;
		}
		if(array_area[int_cubeYPosition][int_cubeXPosition - 1] != 7) {
			return false;
		}
	}
	cubeCombine.xPosition -= 1;
	return true;
}

function goDown() {
	for(var i = 0; i < 4; i ++) {
		var int_cubeXPosition = Number(cubeCombine.array_shape[cubeCombine.rotation][i][0]) + cubeCombine.xPosition;
		var int_cubeYPosition = Number(cubeCombine.array_shape[cubeCombine.rotation][i][1]) + cubeCombine.yPosition;
		if(int_cubeYPosition >= 20) {
			return false;
		}
		if(array_area[int_cubeYPosition + 1][int_cubeXPosition] != 7) {
			return false;
		}
	}
	cubeCombine.yPosition += 1;
	return true;
}

function checkRotation(changePosition, int_rotateNo) {
	for(var i = 0; i < 4; i ++) {
		var int_cubeXPosition = Number(cubeCombine.array_shape[int_rotateNo][i][0]) + cubeCombine.xPosition + changePosition;
		var int_cubeYPosition = Number(cubeCombine.array_shape[int_rotateNo][i][1]) + cubeCombine.yPosition;
		if(int_cubeXPosition > 10 || int_cubeXPosition < 0) {
			return true;
		}
		if(array_area[int_cubeYPosition][int_cubeXPosition] != 7) {
			return true;
		}
	}
	cubeCombine.xPosition += changePosition;
	$('.cubeCombine') .css('left', '+=' + (changePosition * 25) ) ;
	return false;
}

function doRotation() {
	var int_rotateNo;
	var bool = true;
	var int_shift = array_cubes[cubeCombine.cubesNum].array_rotationShift[cubeCombine.rotation];
	if(cubeCombine.rotation < array_cubes[cubeCombine.cubesNum].int_rotate) {
		int_rotateNo = cubeCombine.rotation + 1;
	}else{
		int_rotateNo = 0;
	}
	if(int_shift >= 0) {
		for(var j = 0; (j <= int_shift && bool) ; j++) {
			bool = checkRotation(j, int_rotateNo) ;
		}
	}else{
		for(var j = 0; (j >= int_shift && bool) ; j--) {
			bool = checkRotation(j, int_rotateNo) ;
		}
	}
	if(bool) {
		return false;
	}
	else{
		cubeCombine.rotation = int_rotateNo;
		return true;
	}
}

function cubeSettle() {
	clearInterval(cubeCombine.autoDown) ;
	for(var i = 0; i < 4; i ++) {
		var int_cubeXPosition = Number(cubeCombine.array_shape[cubeCombine.rotation][i][0]) + cubeCombine.xPosition;
		var int_cubeYPosition = Number(cubeCombine.array_shape[cubeCombine.rotation][i][1]) + cubeCombine.yPosition;
		array_area[int_cubeYPosition][int_cubeXPosition] = cubeCombine.cubesNum;
		$('#' + int_cubeYPosition) .append('<div class="cube" style="left: ' + (int_cubeXPosition * 25) + 'px; top: 0px; background-image: url(' + array_cubes[cubeCombine.cubesNum].str_color + ');"></div>') ;
		array_area[int_cubeYPosition][11] --;
	}
	$('.cubeCombine') .empty() ;
	var int_switchArray = 20;
	for(var i = 20; i >= 0; i --) {
		if(array_area[i][11] == 0) {
			$('#' + i) .fadeOut('normal',function() {
				$(this) .remove() ;
			}) ;
		}else{
			array_area[int_switchArray] = array_area[i].slice(0);
			$('#' + i) .animate({top:'+=' + (25 * (int_switchArray - i)) + 'px'}, 200, 'linear') ;
			$('#' + i) .attr('id', int_switchArray) ;
			int_switchArray -= 1;
		}
	}
	if(int_switchArray >= 0){
		object_score.line += (int_switchArray + 1) ;
		object_score.score += ((int_switchArray + 2) * (int_switchArray + 1) ) / 2 + int_switchArray
		$('.scoreWord').remove() ;
		$('.scoreLine').remove() ;
		$('.backGround') .append("<p class='scoreWord'>Score: " + object_score.score + "</p>") ;
		$('.backGround') .append("<p class='scoreLine'>Line: " + object_score.line + "</p>") ;
	}
	for(; int_switchArray >= 0; int_switchArray --) {
		for(var j = 0; j < 11; j ++) {
			array_area[int_switchArray][j] = 7;
		}
		array_area[int_switchArray][11] = 11;
		$('.cubeArea') .append('<div class="cubeLine" id="' + int_switchArray + '" style= "top: ' + int_switchArray * 25 + 'px; left: 0px;"></div>') ;
	}
	$('.nextArea') .empty() ;
	cubeCombineInit();
	nextCubeCombine.cubesNum = Math.floor(Math.random() * 7) ;
	$('.cubeCombine') .css('left', (cubeCombine.xPosition * 25) ) ;
	$('.cubeCombine') .css('top', 0) ;
	for(var i=0; i<4; i ++) {
		$('.cubeCombine').append('<div class="cube" style="left: ' + (cubeCombine.array_shape[0][i][0] * 25) + 'px; top: ' + (cubeCombine.array_shape[0][i][1] * 25) + 'px; background-image: url(' + array_cubes[cubeCombine.cubesNum].str_color + ');"></div>') ;
		$('.nextArea').append('<div class="cube" style="left: ' + (array_cubes[nextCubeCombine.cubesNum].get_rotate_array[0][i][0] * 25 + 5) + 'px; top: ' + (array_cubes[nextCubeCombine.cubesNum].get_rotate_array[0][i][1] * 25 + 5) + 'px; background-image: url(' + array_cubes[nextCubeCombine.cubesNum].str_color + ');"></div>') ;	
	}
	if(checkRotation(0, cubeCombine.rotation) ) {
		$('.cubeArea') .fadeOut(2000) ;
		$('.nextArea') .fadeOut(2000, function(){
			$('.backGround') .empty() ;
			$('.backGround') .append("<p class='scoreWord'>Score: " + object_score.score + "</p>") ;
			$('.backGround') .append("<p class='scoreLine'>Line: " + object_score.line + "</p>") ;
		}) ;
	}else{
		cubeCombine.autoDown = setInterval(function() {
			if(goDown()) {
				$('.cubeCombine') .css('top', '+=25') ;
			}else{
				cubeSettle() ;
				}
		} , object_score.speed) ;
	}
}

$(document) .ready(function() {
	var pause = false ;
	cubeCombine.cubesNum = Math.floor(Math.random() * 7) ;
	nextCubeCombine.cubesNum = Math.floor(Math.random() * 7) ;
	cubeCombine.array_shape = array_cubes[cubeCombine.cubesNum].get_rotate_array;
	$('.backGround') .append("<p class='scoreWord'>Score: " + object_score.score + "</p>") ;
	$('.backGround') .append("<p class='scoreLine'>Lines: " + object_score.line + "</p>") ;
	$('.cubeArea') .append('<div class="cubeCombine" style = "left: ' + (cubeCombine.xPosition * 25) + 'px; top: 0px; "></div>') ;
	for(var i=0; i<4; i ++) {
		$('.cubeCombine').append('<div class="cube" style="left: ' + (cubeCombine.array_shape[0][i][0] * 25) + 'px; top: ' + (cubeCombine.array_shape[0][i][1] * 25) + 'px; background-image: url(' + array_cubes[cubeCombine.cubesNum].str_color + ');"></div>') ;
		$('.nextArea').append('<div class="cube" style="left: ' + (array_cubes[nextCubeCombine.cubesNum].get_rotate_array[0][i][0] * 25 + 5) + 'px; top: ' + (array_cubes[nextCubeCombine.cubesNum].get_rotate_array[0][i][1] * 25 + 5) + 'px; background-image: url(' + array_cubes[nextCubeCombine.cubesNum].str_color + ');"></div>') ;	
	}
	cubeCombine.autoDown = setInterval(function() {
		if(goDown()) {
			$('.cubeCombine') .css('top', '+=25');
		}else{
			cubeSettle();
			}
	} , object_score.speed);
	$(document) .keydown(function(key) {
        switch(parseInt(key.which,10) ) {
			case 37:
				if(!pause && goLeft() ) {
					$('.cubeCombine') .css('left', '-=25') ;
				}
				break;
			case 38:
				if(!pause && doRotation() ) {
					$('.cubeCombine') .empty();
					for(var i=0; i<4; i ++) {
						$('.cubeCombine') .append('<div class="cube" style="left: ' + (cubeCombine.array_shape[cubeCombine.rotation][i][0] * 25) + 'px; top: ' + (cubeCombine.array_shape[cubeCombine.rotation][i][1] * 25) + 'px; background-image: url(' + array_cubes[cubeCombine.cubesNum].str_color + ');"></div>') ;
					}
				}
				break;
			case 39:
				if(!pause && goRight() ) {
					$('.cubeCombine') .css('left', '+=25') ;
				}
				break;
			case 40:
				if(!pause && goDown() ) {
					$('.cubeCombine') .css('top', '+=25') ;
				}else if(!pause) {
					cubeSettle() ;
				}
				break;
			case 80:
				if(!pause){
					clearInterval(cubeCombine.autoDown) ;
					pause = true;
					$('.cubeArea') .css('opacity', 0);
					$('.nextArea') .css('opacity', 0);
					$('.pauseCubeArea') .css('opacity', 100);
					$('.pauseNextArea') .css('opacity', 100);
				}else{
					pause = false;
					$('.cubeArea') .css('opacity', 100);
					$('.nextArea') .css('opacity', 100);
					$('.pauseCubeArea') .css('opacity', 0);
					$('.pauseNextArea') .css('opacity', 0);
					cubeCombine.autoDown = setInterval(function() {
						if(goDown()) {
							$('.cubeCombine') .css('top', '+=25');
						}else{
							cubeSettle();
						}
					} , object_score.speed);
				}
				break;
			default:
				break;
		}
	});
});