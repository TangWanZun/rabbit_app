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
		//遍历循环添加数据
		for(let i in json.data.lists) {
			AUDIO.audioSearchList.push({
				name: json.data.lists[i].SongName,
				geshou: json.data.lists[i].SingerName,
				time: json.data.lists[i].AlbumName,
				FileHash:json.data.lists[i].FileHash
			});
		}
		document.body.removeChild(window.parent.document.getElementById("jsonp"));
	},
	//歌曲添加
	audioAdd:function(index){
		AUDIO.menuList.push(AUDIO.audioSearchList[index]);
		mui.toast("歌曲添加成功", {
			duration: 'short',
			type: 'div'
		});
	}
}
