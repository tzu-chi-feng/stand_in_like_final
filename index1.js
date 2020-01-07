
	
    var database = firebase.database().ref();
   
    
    database.once('value', function (snapshot) {
		//console.log(snapshot.val());
		var name = [];
		var keys = [];
		var rank = [];
		var score=[];
        var values = Object.values(snapshot.val()); 
        keys = Object.keys(snapshot.val())[0];
        console.log(values);
       
		
        values.forEach(function(e) {
         console.log(e.score);
		 // score.push (e.score);
		});
        score.sort(function(a,b){return a<b?1:-1});
        console.log(score);
        for(var i = 0 ; i<10; i++){
          rank[i] = score[i];
        }
		console.log(rank);
	});
        


//获取背景音乐
var bgm = document.querySelector(".bgm")
var gameover_bgm = document.querySelector(".gameover_bgm")
var up_bgm = document.querySelector(".up_bgm")
	//音乐默认关闭状态
bgm.pause();
gameover_bgm.pause();
up_bgm.pause()
var canvas = document.querySelector(".canvas");//获取最外层div
var thisScore = document.querySelector(".thisScore")
var historyScore = document.querySelector(".historyScore")
var conduitTimer = null; //创建管道定时器
var scoreDiv = document.querySelector('#scroing')//获取分数div
var speed = 0,
	speedMax = 8; //速度变量
var DownTimer = null; //下降计时器
var upTimer = null; //上升计时器
var crashTextTimer = null; //碰撞检测计时器
var isGameOver = true; //游戏开关
var score = 0; //分数
//获取鸟div
var bird = document.getElementById("flybird");


//鸟下降
function down() {
	speed = 5;
	bird.id = 'flybird_down';
	up_bgm.pause();//關閉鳥上升音樂
	//当鸟下落速度达到最大值speedMax时，保持不变
	if(speed >= speedMax) {
		speed = speedMax;
	}
	bird.style.top = bird.offsetTop + speed + 'px';
	floorText(); //落地检测;
	judge();//管子檢測;
}

//小鸟上升
function up() {
	speed -= 1;
	bird.id = 'flybird_up';
	up_bgm.play();
    if(speed <= 0) {
        speed = 0;
        clearInterval(upTimer);
        DownTimer=setInterval(down,30);
        }
        bird.style.top=bird.offsetTop -speed + 'px';
		} //鸟跳动的方法；
	floorText();//落地檢測;
	judge();//管子檢測;	

function birdJump(){
	speed = speedMax;
    if(isGameOver){
    // 每次向上跳时，先将向上、向下计时器清楚，防止叠加 
    clearInterval(upTimer);
    clearInterval(DownTimer);//清除向下的定时器；
    upTimer= setInterval(up,30);
    }
    }
            //判斷小鳥落地或者小鳥跳出上邊界，此時遊戲結束
function floorText(){
 var t1 = bird.offsetTop;
                if(t1 > 396){
		          //游戏结束；
		          gameover();
        	    }
	            if(t1 < 0) {
		          gameover();
         	    }
}
//清除所有计时器；
function clearTimer() {
	var timer = setInterval(function() {}, 30);
	for(i = 0; i < timer; i++) {
		clearInterval(i);
	}
}
//游戏结束
function gameover() {
	//游戏结束背景音乐打开
	gameover_bgm.play();
	isGameOver = false;
	//结束音乐
	bgm.pause();
	clearTimer();
	//小鸟换回原来的样式
	bird.id = 'flybird';
	bird.className = 'birddown';
	bird.style.top = '392px';
	//存储最高纪录
	var historyscore = localStorage.getItem('maxScore');
	//当历史记录不存在或者历史记录小于当前记录时，创建masScore.
	if(historyscore == null || historyscore < score) {
		localStorage.setItem('maxScore', score);
		//刷新记录
		historyscore = score;
	}
	//历史最高纪录
	historyScore.innerHTML = historyscore;	
	//当前分数
	thisScore.innerHTML = score;
	//显示游戏结束画面
	document.querySelector('.gameover').style.display = 'block';



    database.once('value', function (snapshot) {
        var values = Object.values(snapshot.val()); 
        var keys = Object.keys(snapshot.val());
		//console.log(values);
		var name = [];
       values.forEach(function(e) {
		  name.push (e.user);
		});
		
		//console.log(keys);
	    keys.forEach(function(e,index) {
			console.log(e);
			//console.log(input);
			
			if(e == document.getElementById("inpnum").value){
				console.log(index);
				console.log(keys[index]);
			}
			else{
				firebase.database().ref('/').push(
					{user : document.getElementById("inpnum").value ,
					score : this.score}
				)
			}
				});
			});
    

		}

	
	console.log(historyScore);
    console.log(thisScore);
	



	



//随机函数，用来随机产生钢管的高度
function rand(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}
//创建管道，在点击开始按钮后，通过计时器来创建
function create_pipe() {
	var conduit_group = document.querySelector(".conduit_group");
	var conduitItem = document.createElement("div");
	//给创建的管道一个样式
	conduitItem.className = 'conduitItem';
	//将创建的管道放入外层div
	conduit_group.appendChild(conduitItem);
	var topHeight = rand(60, 223);//管道里面上管道的高度值
	var bottomHeight = 373 - 100 - topHeight;//管道里面下管道的高度值
	//创建上下管道
	conduitItem.innerHTML = '<div class="top_conduit"><div style="height:' + topHeight + 'px"></div></div><div class="bottom_conduit"><div style="height:' + bottomHeight + 'px"></div></div>'
	//获取最外层div的宽度，即为管道可以移动的最大值
	var maxWidth = canvas.offsetWidth;
	//让管道刚开始在canvas外面，一开始看不到
	conduitItem.style.left = maxWidth + 'px';
	//加分开关，每通过一个管道分数才能加1
	conduitItem.AddToscore = true;
	//管道移动方法，通过计时器不断使其的left值递减来实现管道移动。
	conduitItem.movetimer = setInterval(function() {
		maxWidth -= 3;//每30ms向左移动3个像素
		conduitItem.style.left = maxWidth + 'px';
		//在管道跑出去之后，清除使该管道移动的计时器，并将其移除。
		if(maxWidth <= -70) {
        clearInterval(conduitItem.movetimer);
        conduit_group.removeChild(conduitItem);
    }  // 当管道的offsetleft小于30时，即小鸟成功通过管道之后，分数加1
    if(conduitItem.offsetLeft <= 30 && conduitItem.AddToscore == true){
        score++ ; 
        conduitItem.AddToscore = false;
        scoreFn(score);
    }
    },30)
    }
    //鳥和管道碰撞檢測，obj1為小鳥，obj2為上下管道的父集
    //直接獲取上下管道，offsetLeft為0，因此要獲取其父集;
function crashTest(obj1,obj2){
    //小鳥的相關向量
    var l1 = bird.offsetLeft;
    var r1 = l1 + bird.offsetWidth;
    var t1 = bird.offsetTop;
    var b1 = t1 + bird.offsetHeight;
    //管道的相關向量
    var l2 = obj2.offsetLeft;
    var r2 = l2 + obj2.offsetWidth;
    var t2 = obj1.offsetTop;
    var b2 = t2 + obj1.offsetHeight;
    //判斷條件
	if (r1 > l2 && l1 < r2 && b1 > t2 && t1 < b2){
        gameover();
    }
}

function judge() {
	//獲取創造的在當前頁面显示的所有管道，為一個陣列
	var conduitItem = document.querySelector(".conduit_group").querySelectorAll(".conduitItem");//回傳第一個管道
	//querySelector() 返回匹配指定選擇器的第一個元素。使用 querySelectorAll()返回所有的元素 。
	//陣列物件的 length 屬性可以取回陣列的長度，也就是陣列中的元素個數。
	for(var i = 0; i < conduitItem.length; i++) {
		var top_conduit = conduitItem[i].querySelector(".top_conduit");
		var bottom_conduit = conduitItem[i].querySelector(".bottom_conduit");
	    crashTest(top_conduit, conduitItem[i]); 
	    crashTest(bottom_conduit, conduitItem[i]);
	}

}


//显示分数
function scoreFn(score) {
	var newscore = score;
	//将获取的分数转化成字符串
	var testsocre = newscore.toString();
	scoreDiv.innerHTML = null;
	for(var i = 0; i < testsocre.length; i++) {
		var img = document.createElement('img');
		//通过修改图片路径来实现分数不断刷新
		img.src =  testsocre[i] + '.jpg';
		scoreDiv.appendChild(img);
	}
	
}
var start_btn = document.querySelector('.start_btn');
var gameStartDiv = document.querySelector('.game_start');

//var input = document.getElementById("inpnum");

		
//游戏初始化
function init() {
	//为start_btn创建点击事件，即开始按钮
	start_btn.onclick = function() {

		var input = document.getElementById("inpnum").value;
        var aaaaa=function(){
	             console.log(input);
				};
		aaaaa();		

		
		//点击之后，开始界面隐藏
		gameStartDiv.style.display = 'none';
		//小鸟显示出来
		bird.style.display = 'block';
		//使小鸟在中间显示
		bird.style.top = '200px';
		bgm.play();
		//开始创造管道
		conduitTimer = setInterval(create_pipe, 2000)
		//通过点击，来调用birdJump方法，来使小鸟上升
		document.addEventListener('click', birdJump, false)
		crashTestTimer = setInterval(judge, 1000 / 60);
	}
}
init();
//重新开始
var game_restart = document.querySelector(".game_restart")
game_restart.onclick = restart;
var conduit_group = document.querySelector(".conduit_group")

//回到刚开始的
function restart() {
	
	bird.className = 'bird';
	clearTimer();
	scoreDiv.innerHTML = null;
	isGameOver = true;
	speed = 0;
	score=0;
	speedMax = 8;
	document.querySelector('.gameover').style.display = 'none';
	gameStartDiv.style.display = 'block';
	bird.style.display = 'none';
	conduit_group.innerHTML = '';
    }