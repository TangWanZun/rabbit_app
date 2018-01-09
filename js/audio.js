//歌曲搜索
function searchAudio(audioSearchContent){
	var jsonp = document.createElement("script");
	var url = "http://songsearch.kugou.com/song_search_v2?callback=audioListShow&keyword="+audioSearchContent;
	jsonp.src = url;
	jsonp.id = "jsonp";
	document.body.appendChild(jsonp);
}
//歌曲搜索回调方法
function audioListShow(json){
	//	清空列表
	AUDIO.audioSearchList.splice(0,AUDIO.audioSearchList.length);
	console.log(json);
	//遍历循环添加数据
	for(let i in json.data.lists){
//	    createAudioList(json.data.lists[i],i+1);
	    AUDIO.audioSearchList.push({
	    	name:json.data.lists[i].SongName,
	    	geshou:json.data.lists[i].SingerName,
	    	time:json.data.lists[i].AlbumName
	    });
	}
	document.body.removeChild(window.parent.document.getElementById("jsonp"));
}
function createAudioList(audioListViow,n){
//	AUDIO.$data.audios.push({name:audioListViow.SongName,geshou:audioListViow.SingerName,time:audioListViow.AlbumName});
}
//歌曲添加
function audioAdd(n){
	AUDIO_ARR.$data.audios.push(AUDIO_LIST.$data.audios[n]);
	mui.toast("歌曲添加成功",{duration:'short', type:'div' });
}

