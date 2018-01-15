var AUDIO = null;//vue组件
var AUDIO_ID = { //歌曲id
	BFQ : document.getElementById("myaudio")  ,//播放器id
	RANGE : document.getElementById("range"),//进度条
	PLAYING : document.getElementById("playing"),//播放按钮
	ONTIME : document.getElementById("audioOnTime"),
	WORD:document.querySelector("#audioWord")
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
	hm = Math.floor(hm);
	var m = hm%60;
	if(m<10) m  = "0"+m;
	return Math.floor(hm/60)+":"+m;
}
//歌曲查找对象
var AudioOpera = {
	//歌曲搜索
	searchAudio:function(audioSearchContent){
		var jsonp = document.createElement("script");
		var url = "http://songsearch.kugou.com/song_search_v2?callback=AudioOpera.audioListShow&keyword=" + audioSearchContent;
		jsonp.src = url;
		jsonp.id = "jsonp";
		document.body.appendChild(jsonp);
	},
	//歌曲搜索回调方法
	audioListShow:function(json){
		//	清空列表
		AUDIO.audioSearchList.splice(0, AUDIO.audioSearchList.length);
		console.log(json)
		//遍历循环添加数据
		for(var i in json.data.lists) {
			AUDIO.audioSearchList.push({
				name: json.data.lists[i].SongName,
				geshou: json.data.lists[i].SingerName,
				time: json.data.lists[i].AlbumName,
				FileHash:json.data.lists[i].FileHash,
				Audioid:json.data.lists[i].Audioid
			});
		}
		document.body.removeChild(window.parent.document.getElementById("jsonp"));
	},
	//歌曲添加
	audioAdd:function(index){
		for(var i in AUDIO.menuList){
			if(AUDIO.audioSearchList[index].Audioid == 	AUDIO.menuList[i].Audioid){
				mui.toast("歌单中存在此歌曲", {
					duration: 'short',
					type: 'div'
				});
				return;
			}
		}
		AUDIO.menuList.push(AUDIO.audioSearchList[index]);
		mui.toast("歌曲添加成功", {
			duration: 'short',
			type: 'div'
		});
	}
}
//歌曲对象
function Audio(data) {
	//获取进度条
	this.range = document.querySelector("#range");
	//获取播放器
	this.myaudio = document.querySelector("#myaudio");
	//一行歌词
	this.audioWord = document.querySelector("#audioWord");
	//获取现在歌曲时间
	this.audioOnTime = document.querySelector(".audioRange-time");
	//获取歌词集
	this.lyrics = data.lyrics;
	//歌词时间
	this.lyricsTime = [];
	//歌词页
	this.Ong = document.querySelectorAll(".mui-slider-item")[2];
	this.parrer = /\[[0-9]{2}\:[0-9]{2}\.[0-9]{2}\]/g;
	// 解析歌词
	this.getAudioWord = function() {
		if(this.lyrics == "") {
			this.lyrics = "[00:00.50]暂无歌词"
		}
		var time = this.lyrics.match(this.parrer);
		for(var i = 0; i < time.length; i++) {
			var t = time[i].slice(1, -1).split(':');
			this.lyricsTime[i] = parseInt(t[0], 10) * 60 + parseFloat(t[1], 10);
			t = null;
		}
		var ly = this.lyrics.split(this.parrer);
		ly.splice(0, 1);
		return {
			"lyrics": ly,
			"lyrics_time": this.lyricsTime
		};
	};
	this.synAudioWord = function() {
		var arrAwl = document.getElementsByClassName("audio_word_line");
		var audioWordCase = document.querySelector(".audio_word_case");
		var thio = this;
		var awh = thio.audioWord.offsetHeight;
		//播放开始
		this.myaudio.oncanplay = function() {
			thio.range.max = this.duration;
			for(var j in arrAwl) {
				arrAwl[j].className = "audio_word_line";
			}
			audioWordCase.style.top = (awh / 2) + "px";
			arrAwl[0].classList.add("audio_word_line_show");
		}
		//播放进行中
		this.myaudio.ontimeupdate = function() {
			thio.range.value = this.currentTime;
			thio.audioOnTime.innerHTML = zhuanhua(this.currentTime);
			if(thio.Ong.className == "mui-slider-item mui-active") {
				var awlh = arrAwl[0].offsetHeight;
				for(var i = 0; i < thio.lyricsTime.length; i++) {
					if(this.currentTime > thio.lyricsTime[i] && this.currentTime < thio.lyricsTime[i + 1]) {
						//						if(i > 0 && arrAwl[i - 1].classList.length == 2) {
						//							arrAwl[i - 1].classList.remove("audio_word_line_show");
						//						}
						for(var j in arrAwl) {
							arrAwl[j].className = "audio_word_line";
						}
						arrAwl[i].classList.add("audio_word_line_show");
						audioWordCase.style.top = -((i + 1) * (awlh) - awh / 2) + "px";
						break;
					}
				}
			}
		};
		//播放结束
		this.myaudio.onended = function() {
			AUDIO.audioAlter(1);
		}
		this.range.addEventListener("change", function() {
			try {
				thio.myaudio.currentTime = this.value;
				for(var i = 0; i < thio.time2.length; i++) {
					if(thio.arrAwl[i].classList.length == 2) {
						thio.arrAwl[i].classList.remove("audio-word-line-show");
					}
				}
			} catch(e) {}
		})
	};
}