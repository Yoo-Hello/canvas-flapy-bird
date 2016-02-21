window.onload=function(){
    var a=1;
	var dird={
		x:140,y:284,w:30,h:30
	}
	var guandaoT=[
	    {x:345,y:0,w:60,h:220},
		{x:535,y:0,w:60,h:220}
	]
	var guandaoB=[
		{x:345,y:338,w:60,h:230},
		{x:535,y:338,w:60,h:230}
	]
	var canvas=document.querySelector('#canvas');
	var ctx=document.querySelector('#canvas').getContext('2d');
    var e=canvas.offsetWidth;
    
    var imgT = document.querySelector('#guandaoT');
    var imgB = document.querySelector('#guandaoB');
	var xsn1 = document.querySelector('#xsn1');
    var start = document.querySelector('#start');



	var draw=function(){
		ctx.clearRect(0,0,320,568);
		var sjs=Math.random()*100+180;
		//画鸟
        ctx.save();
        ctx.fillStyle="rgba(255,255,255,0)";
		a+=0.05;
		dird.y += a*a;
		ctx.fillRect(140,dird.y,dird.w,dird.h);
        ctx.drawImage(xsn1,140,dird.y,dird.w,dird.h);
        ctx.stroke();

		//管道
        ctx.save();
		var vs;
        
        //ctx.fillStyle="rgba(255,255,255,0)"
    	for(var i=0;i<guandaoT.length;i++){
    		var d=guandaoT[i];
    		if(recvsrec(dird,d)){
    			vs=true;
    		}
    		d.x -= 2;
    		if(d.x <= -50){
    			d.x = 345;
    			d.h = sjs;
    		}
    		ctx.fillRect(d.x,d.y,d.w,d.h);
            ctx.drawImage(imgT,d.x,d.y,d.w,d.h);
    	}
    	for(var i=0;i<guandaoB.length;i++){
    		var d=guandaoB[i];
    		console.log(d);
    		if(recvsrec(dird,d)){
    			vs=true;
    		}
    		d.x -= 2;
    		if(d.x <= -50){
    			d.x = 345;
    			d.h = sjs+128;
    			d.y = sjs+128;
    		}
    		ctx.fillRect(d.x,d.y,d.w,d.h);
            ctx.drawImage(imgB,d.x,d.y,d.w,d.h);

    	}
    	if(vs){
    		return;
    	}
		ctx.stroke();
		//边界判断
		if(dird.y>=568-40||dird.y<= 0){
			return;
		}else{
			window.requestAnimationFrame(draw);
		}
	}

    //开始游戏按钮
    start.onclick=function(){
        window.requestAnimationFrame(draw);
        start.style.display="none";
    }

    //自由落体
	canvas.onclick=function(){
		a=1;
		dird.y-=40;
	}
    
    //判定碰撞柱子
	var recvsrec =  function(rect0,rect1){
        if (rect0.x >= rect1.x && rect0.x >= rect1.x + rect1.w) {
            return false;
        } else if (rect0.x <= rect1.x && rect0.x + rect0.w <= rect1.x) {
             return false;
        } else if (rect0.y >= rect1.y && rect0.y >= rect1.y + rect1.h) {
            return false;
        } else if (rect0.y <= rect1.y && rect0.y + rect0.h <= rect1.y) {
            return false;
        }
    return true;
    };
}