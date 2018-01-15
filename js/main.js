AUDIO = new Vue({
	el: "#audio",
	data: {
		//当前显示页面
		pagingShowClass:1,
		//查询歌曲显示页
		audioSearch: false,
		//搜索框内容
		audioSearchContent: "",
		//搜索的歌曲列表
		audioSearchList: [],
		//歌库列表
		menuList: [],
		//当前播放歌曲的信息
		newAudioData: {
			song_name: "rabiitAudio", //歌曲名称
			author_name: "兔子只吃胡萝卜", //歌手名称
			album_name: "来自github", //专辑名称
			img: "./image/log.jpg", //歌曲图片
			lyrics: [], //歌词
			lyrics_time: [], //歌词对应的时间
			play_url: "", //音乐路径
			timelength: "00:00", //音乐长度
			audiolyrics: null, //歌词制作对象
			isPaly: true //是否在播放中
		},
		rang: {
			img: "./image/audioPlay.png"
		},
		newAudioPlay: 0
	},
	methods: {
		//查询歌曲显示页面
		audioSearchShow: function(bool) {
			this.audioSearch = bool;
		},
		//搜索点击按钮
		audioSearchPlay: function() {
			//当搜索框里不为空时进行的操作
			if(this.audioSearchContent.replace(/(^s*)|(s*$)/g, "").length != 0) {
				AudioOpera.searchAudio(this.audioSearchContent);
			}
		},
		//添加歌曲到歌库
		audioListAdd: function(index) {
			AudioOpera.audioAdd(index);
		},
		//播放歌曲进行的操作
		audioPlay: function(index) {
			this.newAudioPlay = (index + 1);
			var data = JSON.parse((new ajax(HOST.HREF + this.menuList[index].FileHash)).data);
			//导入歌曲信息
			this.newAudioData.song_name = data.data.song_name;
			this.newAudioData.author_name = data.data.author_name;
			this.newAudioData.album_name = data.data.album_name;
			this.newAudioData.img = data.data.img;
			this.newAudioData.audiolyrics = new Audio(data.data);
			var lyricsArr = this.newAudioData.audiolyrics.getAudioWord();
			this.newAudioData.lyrics = lyricsArr.lyrics;
			this.newAudioData.lyrics_time = lyricsArr.lyrics_time;
			this.newAudioData.play_url = data.data.play_url;
			this.newAudioData.timelength = zhuanhua(data.data.timelength / 1000);
			this.newAudioData.audiolyrics.synAudioWord();
			try {
				document.querySelector("#myaudio").play();
			} catch(e) {
				console.log(e);
			}
			this.rang.img = "./image/audioPause.png";
		},
		//音乐播放按钮
		aduioPaly: function() {
			if(this.newAudioData.audiolyrics) {
				if(this.newAudioData.isPaly) {
					document.querySelector("#myaudio").pause();
					this.rang.img = "./image/audioPlay.png";
					this.newAudioData.isPaly = false;
				} else {
					document.querySelector("#myaudio").play();
					this.rang.img = "./image/audioPause.png";
					this.newAudioData.isPaly = true;
				}
			}
		},
		//音乐切换
		audioAlter: function(n) {
			if(this.newAudioPlay + n <= 0) {
				this.audioPlay(this.menuList.length - 1);
				this.newAudioPlay = this.menuList.length;
				return;
			}
			if(this.newAudioPlay + n > this.menuList.length) {
				this.audioPlay(0);
				this.newAudioPlay = 1;
				return;
			}
			this.newAudioPlay = this.newAudioPlay + n;
			this.audioPlay(this.newAudioPlay - 1);
		},
		//歌单音乐删除
		audioDelect: function(n) {
			this.menuList.splice(n, 1);
			mui.toast("歌曲已删除", {
				duration: 'short',
				type: 'div'
			});
		}
	}
});
//显示制定翻页
mui(document.querySelector('.mui-slider')).slider().gotoItem(1);
//添加slider监视事件
document.querySelector('.mui-slider').addEventListener('slide', function(event) {
	AUDIO.pagingShowClass = event.detail.slideNumber;
});
