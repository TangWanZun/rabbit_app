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
		if(this.lyrics==""){this.lyrics = "[00:00.50]暂无歌词"}
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
			audioWordCase.style.top =(awh / 2)+ "px";
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
	AUDIO = new Vue({
		el:"#audio",
		data:{
			//查询歌曲显示页
			audioSearch:false,
			//搜索框内容
			audioSearchContent:"",
			//搜索的歌曲列表
			audioSearchList:[],
			//歌库列表
			menuList:[],
			//当前播放歌曲的信息
			newAudioData:{
				song_name:"rabiitAudio",		//歌曲名称
				author_name:"兔子只吃胡萝卜",			//歌手名称
				album_name:"来自github",			//专辑名称
				img:"./image/log.jpg",	//歌曲图片
				lyrics:[],				//歌词
				lyrics_time:[],				//歌词对应的时间
				play_url:"",				//音乐路径
				timelength:"00:00",			//音乐长度
				audiolyrics:null,//歌词制作对象
				isPaly:true   //是否在播放中
			},
			rang:{
				img:"./image/audioPlay.png"
			},
			newAudioPlay:0
		},
		methods:{
			//查询歌曲显示页面
			audioSearchShow:function(bool){
				this.audioSearch = bool;
			},
			//搜索点击按钮
			audioSearchPlay:function(){
				//当搜索框里不为空时进行的操作
				if(this.audioSearchContent.replace(/(^s*)|(s*$)/g, "").length !=0){
					AudioOpera.searchAudio(this.audioSearchContent);
				}
			},
			//添加歌曲到歌库
			audioListAdd:function(index){
				AudioOpera.audioAdd(index);
			},
			//播放歌曲进行的操作
			audioPlay:function(index){
				this.newAudioPlay = (index+1);
				var data = JSON.parse((new ajax(HOST.HREF+this.menuList[index].FileHash)).data);
				//导入歌曲信息
				this.newAudioData.song_name = data.data.song_name;
				this.newAudioData.author_name = data.data.author_name;
				this.newAudioData.album_name = data.data.album_name;
				this.newAudioData.img = data.data.img;
				this.newAudioData.audiolyrics=new Audio(data.data);
				var lyricsArr = this.newAudioData.audiolyrics.getAudioWord();
				this.newAudioData.lyrics = lyricsArr.lyrics;
				this.newAudioData.lyrics_time = lyricsArr.lyrics_time;
				this.newAudioData.play_url = data.data.play_url;
				this.newAudioData.timelength = zhuanhua(data.data.timelength/1000);
				this.newAudioData.audiolyrics.synAudioWord();
				try{
					document.querySelector("#myaudio").play();	
				}catch(e){
					console.log(e);	
				}
				this.rang.img = "./image/audioPause.png";
			},
			//音乐播放按钮
			aduioPaly:function(){
				if(this.newAudioData.audiolyrics){
					if(this.newAudioData.isPaly){
						document.querySelector("#myaudio").pause();
						this.rang.img = "./image/audioPlay.png";
						this.newAudioData.isPaly = false;
					}else{
						document.querySelector("#myaudio").play();
						this.rang.img = "./image/audioPause.png";
						this.newAudioData.isPaly = true;
					}					
				}
			},
			//音乐切换
			audioAlter:function(n){
				if(this.newAudioPlay+n<=0){this.audioPlay(this.menuList.length-1);this.newAudioPlay=this.menuList.length;return;}
				if(this.newAudioPlay+n>this.menuList.length){this.audioPlay(0);this.newAudioPlay=1;return;}
				this.newAudioPlay = this.newAudioPlay+n;
				this.audioPlay(this.newAudioPlay-1);
			},
			//歌单音乐删除
			audioDelect:function(n){
				this.menuList.splice(n,1);
				mui.toast("歌曲已删除", {
					duration: 'short',
					type: 'div'
				});
			}
		}
	});
