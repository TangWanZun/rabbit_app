//歌曲搜索
function searchAudio(){
	var jsonp = document.createElement("script");
	var url = "http://songsearch.kugou.com/song_search_v2?callback=audioListShow&keyword="+document.getElementById("inquire-input").value;
	jsonp.src = url;
	jsonp.id = "jsonp";
	document.body.appendChild(jsonp);
}

//function rabbit_1213(json){
//	audioListShow(json);
//}

//searchAudio();
document.getElementById("inquiry").onclick = searchAudio;


//父元素的回调方法
function audioListShow(json){
//	console.log(json);
	AUDIO_LIST.$data.audios.splice(0,AUDIO_LIST.$data.audios.length);
//	window.parent.AUDIO_LIST = new Vue({
//			el:"#gedan",
//			data:{
//				audios:[
//					{name:"晴天",geshou:"周杰伦",time:"3:14"},
//					{name:"晴天",geshou:"周杰伦",time:"3:14"},
//					{name:"晴天",geshou:"周杰伦",time:"3:14"}
//				]
//			}
//		});
//		document.getElementById("audioList").innerHTML="";
	for(var i = 0; i<json.data.lists.length;i++){
	    createAudioList(json.data.lists[i],i+1);
	}
	document.body.removeChild(window.parent.document.getElementById("jsonp"));
}
function createAudioList(audioListViow,n){
	AUDIO_LIST.$data.audios.push({name:audioListViow.SongName,geshou:audioListViow.SingerName,time:audioListViow.AlbumName});
//	var node = document.createElement("div");
//	node.className = "tr-into";
//	node.innerHTML = '<div class="row row-0">'+n+'　</div><div class="row row-1">'+audioListViow.SongName+'</div><div  class="row row-2">'+audioListViow.SingerName+'</div><div  class="row row-2">'+audioListViow.AlbumName+'</div><div class="row row-3"><div class="audio-add" onclick="audioAdd('+n+')">+</div></div>';
//	document.getElementById("audioList").appendChild(node);
}
//歌曲添加
function audioAdd(n){
	AUDIO_ARR.$data.audios.push(AUDIO_LIST.$data.audios[n]);
	mui.toast("歌曲添加成功",{duration:'short', type:'div' });
}

