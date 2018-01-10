var AUDIO = null;//vue组件
var AUDIO_ID = { //歌曲id
	BFQ : document.getElementById("myaudio")  ,//播放器id
	RANGE : document.getElementById("range"),//进度条
	PLAYING : document.getElementById("playing"),//播放按钮
	ONTIME : document.getElementById("audioOnTime"),
	WORD:document.querySelector(".audio_word_line")
};
var USER = {//用户
	NAME:"游客",
	IMAGE:"./image/logo.png"
};
var HOST = {
//	HREF:"http://192.168.137.39:8080/rabbitAudio/"
	HREF:"http://farm.yijianongchang.shop/Public/Test/game/lib/audioPlay.php?FileHash="
}
function ajax(file){
	this.xml = new XMLHttpRequest();
	var myxml = this.xml;
	var my  = this;
	this.xml.onreadystatechange = function(){
		if(myxml.readyState==4){
			my.data = myxml.responseText;
		}
	};
	this.xml.open('get',file,false);
	this.xml.send(null);
};
//毫秒换算
function zhuanhua(hm){
	hm = Math.floor(hm/1000);
	var m = hm%60;
	if(m<10) m  = "0"+m;
	return Math.floor(hm/60)+":"+m;
}
