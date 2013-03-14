var object_score = {
	combo: 0,
	score: 0,
	shot: 0,
	hit: 0,
	addSpeed: 0,
	headshot: 0,
	life: 0,
	timer: 2000
};
object_score.addScore = function(hitPositionScore) {
	this.combo += 1;
	this.score = hitPositionScore * this.combo + (this.combo-1) * this.combo / 2 + this.score;
};
function targetPass(){
	object_score.life ++;
	$('.lifeWord').remove() ;
	$('.backGround') .append("<p class='lifeWord'> Target Pass: "+ object_score.life +" / 20</p>") ;
	if(object_score.life>=15){
		$('.lifeWord') .css('color', '#FF0000');
	}
	if(object_score.life>=20){
		clearInterval(object_score.runTarget) ;
		$('.target') .stop(true);
		$('.backGround') .empty();
		$('.backGround') .css('opacity', 0.15) ;
		$('body') .append("<p class='scoreBoard' style='Top: 125px'> Total Shots: "+ object_score.shot +"</p>") ;
		$('body') .append("<p class='scoreBoard' style='Top: 150px'> Total Hits: "+ object_score.hit +"</p>") ;
		$('body') .append("<p class='scoreBoard' style='Top: 175px'> Head Shots: "+ object_score.headshot +"</p>") ;
		if(object_score.hit != 0) {
			$('body') .append("<p class='scoreBoard' style='Top: 200px'> Head Shot Rate: "+ (object_score.headshot * 100 / object_score.hit) .toFixed(2) +" %</p>") ;
		}else{
			$('body') .append("<p class='scoreBoard' style='Top: 200px'> Head Shot Rate: N / A</p>") ;
		}
		if(object_score.hit != 0) {
			$('body') .append("<p class='scoreBoard' style='Top: 225px'> Hit Rate: "+ (object_score.hit * 100 / object_score.shot) .toFixed(2) +" %</p>") ;
		}else{
			$('body') .append("<p class='scoreBoard' style='Top: 225px'> Hit Rate: N / A</p>") ;
		}
		$('body') .append("<p class='scoreBoard' style='Top: 250px'> ---------------------------</p>") ;
		$('body') .append("<p class='scoreBoard' style='Top: 275px'> Final Score: "+ object_score.score +"</p>") ;
		$('.scoreBoard') .animate({left:'+=1180px'}, 1000, 'linear');
	}
}
function randomPlace() {
	var float_speed = (80000 - 500 * object_score.addSpeed) / (Math.random() + 5) ;
	var float_x_axes = Math.random();
	var float_y_axes = Math.random() * 210 + 55;
	if(float_x_axes < 0.5) {
		$('.backGround') .append("<div class='target' style='left: 10px; top: " + float_y_axes + "px;'> <div class='targetHead'></div><div class='targetBody'></div> </div>") ;
		$('.target') .animate({left:'+=480px'}, float_speed, 'linear', function() {
			$(this).remove() ;
			targetPass() ;
		}) ;
	}else {
		$('.backGround') .append("<div class='target' style='left: 490px; top: " + float_y_axes + "px;'> <div class='targetHead'></div><div class='targetBody'></div> </div>") ;
		$('.target') .animate({left:'-=480px'}, float_speed, 'linear', function() {
			$(this).remove() ;
			targetPass() ;
		}) ;
	}
}
function hitTarget(int_target_x, int_target_y) {
	object_score.hit += 1;
	if(object_score.addSpeed < 140){
		object_score.addSpeed += 1;
	}
	if(object_score.hit%5 === 0 && object_score.hit <= 120) {
		clearInterval(object_score.runTarget) ;
		randomPlace() ;
		if(object_score.hit >= 60){
			object_score.timer = 2900;
		}
		else if(object_score.hit >= 20){
			object_score.timer = 2200;
		}
		object_score.runTarget = setInterval(function() {
				randomPlace() ;
			if(object_score.timer >= 2200) {
				randomPlace() ;
			}
			if(object_score.timer >= 2900) {
				randomPlace() ;
			}
		}, object_score.timer - 10 * object_score.hit) ;
	}
	$('.scoreWord').remove() ;
	$('.backGround') .append("<p class='scoreWord'>Score: " + object_score.score + "</p>") ;
	if(object_score.combo >= 3) {
		$('.backGround') .append("<div class='comboWord'></div>") ;
		$('.comboWord') .append("<p class='comboWordBack'>Combo:" + object_score.combo + "</p><p class='comboWordFront'>Combo:" + object_score.combo + "</p>") ;
		$('.comboWord') .fadeOut('slow',function() {
			$(this) .remove() ;
		}) ;
	}
	$('.backGround') .append("<div class='hitTarget' style='left: " + int_target_x + "px; top: " + int_target_y + "px;'> <div class='headHit'></div><div class='bodyHit'></div> </div>") ;
	$('.hitTarget') .fadeOut('slow',function() {
		$(this) .remove() ;
	}) ;
}
$(document) .ready(function() {
	object_score.runTarget = setInterval(function() {randomPlace() ;}, object_score.timer) ;
	$('.backGround') .append("<p class='scoreWord'>Score: " + object_score.score + "</p><p class='lifeWord'> Target Pass: "+ object_score.life +" / 20</p>") ;
	$('.backGround') .mousedown(function(e) {
		object_score.shot ++;
		if (e.target.className != "targetHead" && e.target.className != "targetBody") {
			object_score.combo = 0;
		}
	});
	$(document) .on('mousedown', '.targetHead', function() {
		var int_target_x_asex = parseInt($(this) .parent() .css('left'), 10) ;
		var int_target_y_asex = parseInt($(this) .parent() .css('top'), 10) ;
		object_score.addScore(10) ;
		object_score.headshot ++;
		$(this) .parent() .remove() ;
		$(this) .parent() .stop(true) ;
		$('.backGround') .append("<p class='headShot' style='left: " + (int_target_x_asex - 20) + "px; top: " + (int_target_y_asex - 15) + "px;'>HEAD SHOT!!!</p>") ;
		$('.headShot') .animate({
			opacity: 0,
			top: '-=5'
		}, 500, 'linear', function() {
			$(this) .remove() ;
		}) ;
		hitTarget(int_target_x_asex, int_target_y_asex) ;
	});
	$(document) .on('mousedown', '.targetBody', function() {
		var int_target_x_asex = parseInt($(this) .parent() .css('left'), 10) ;
		var int_target_y_asex = parseInt($(this) .parent() .css('top'), 10) ;
		object_score.addScore(5) ;
		$(this) .parent() .remove() ;
		$(this) .parent() .stop(true) ;
		hitTarget(int_target_x_asex, int_target_y_asex) ;
	});
});
