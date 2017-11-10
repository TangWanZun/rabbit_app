var AUDIO_LIST = null;  //当前查询歌曲集
var AUDIO_ARR =  new Array();//添加歌曲集
var AUDIO_INDEX = 0;//当前播放歌曲位置
var AUDIO_ID = { //歌曲id
	BFQ : document.getElementById("myaudio")  ,//播放器id
	RANGE : document.getElementById("range"),//进度条
	WORD : document.getElementById("audioWord"),//歌词
	PLAYING : document.getElementById("playing"),//播放按钮
	ONTIME : document.getElementById("audioOnTime")
};
var USER = {//用户
	NAME:"游客",
	IMAGE:"./image/logo.png"
};
var HOST = {
//	HREF:"http://192.168.137.39:8080/rabbitAudio/"
	HREF:"http://localhost/rabbit/"
}

