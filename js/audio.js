//歌曲搜索
function searchAudio(){
	var jsonp = document.createElement("script");
	var url = "http://songsearch.kugou.com/song_search_v2?callback=rabbit_1213&keyword="+document.getElementById("inquire-input").value;
	jsonp.src = url;
	jsonp.id = "jsonp";
	document.body.appendChild(jsonp);
}

function rabbit_1213(json){
	AUDIO_LIST = json;
	window.frames["main"].audioListShow(json);
	document.body.removeChild(document.getElementById("jsonp"));
}

//父元素的回调方法
function audioListShow(json){
		document.getElementById("audioList").innerHTML="";
		for(var i = 0; i<json.data.lists.length;i++){
		    createAudioList(json.data.lists[i],i+1);
		}
//		window.parent.document.body.removeChild(window.parent.document.getElementById("jsonp"));
}
function createAudioList(audioListViow,n){
	var node = document.createElement("div");
	node.className = "tr-into";
	node.innerHTML = '<div class="row row-0">'+n+'　</div><div class="row row-1">'+audioListViow.SongName+'</div><div  class="row row-2">'+audioListViow.SingerName+'</div><div  class="row row-2">'+audioListViow.AlbumName+'</div><div class="row row-3"><div class="audio-add" onclick="audioAdd('+n+')">+</div></div>';
	document.getElementById("audioList").appendChild(node);
}
//歌曲添加
function audioAdd(n){
	window.parent.AUDIO_ARR.push	(window.parent.AUDIO_LIST.data.lists[n-1]);
	window.parent.myAlert.show();
}


//searchAudio();
document.getElementById("inquiry").onclick = searchAudio;