
var apigClient = apigClientFactory.newClient();


function gotouploadsearch(){
    let urlinfo = window.location.search;
    let searchparams = new URLSearchParams(urlinfo)
    flag = document.getElementById('inputflag').value;
    if (flag !== 'none'){
        let img = 'https://music-tmp.s3.amazonaws.com/tmp.jpg';
        location.href = 'upload_search.html' + user_key + '&music_url=None' + '&image_url=' + img;

    } else {
        let img = 'none';
        location.href = 'upload_search.html' + user_key + '&music_url=None' + '&image_url=' + img;

    }
}



function addmusicupload(music){
    let  urlinfo = window.location.search;
    let searchparams = new URLSearchParams(urlinfo)
    let img = searchparams.get("image_url")
    location.href = 'upload.html' + user_key + '&music_url=' + music + '&image_url=' + img;

}
//https://music-tmp.s3.amazonaws.com/tmp.jpg
function uploadImage(filename){
    toDataURL('/home/jerry/Desktop/' + filename, function(dataUrl) {
    //console.log('RESULT:', dataUrl)
    let base64res = dataUrl.split(',')[1]

      let base64body = {
            "content":base64res,
            "name":"tmp.jpg",
            "bucket":"music-tmp"
        }
        apigClient.uploadBinaryPost({}, base64body, {})
            .then(function(result){
              // Add success callback code here.
              console.log('success')
            }).catch( function(result){
                console.log('fail')
              // Add error callback code here.
            });

    })
}


function updateupload(){
   
    let  urlinfo = window.location.search;
    let searchparams = new URLSearchParams(urlinfo)
    let music = searchparams.get("music_url");
    if (music != 'none'){
        document.getElementById('story_music_url').src = music;
        document.getElementById('story_music_url').height = 80;
    }

    let img = searchparams.get("image_url");
    if (img != 'none'){
        document.getElementById('addPic').src = img
    }
}


var music_body = {
  "messages": [
    {
      "request_type": "search_music",
      "unconstructed": {
        "user_id": user_val,
        "search_content": "pokemon"
      }
    }
  ]
}

function music_search(){
    apigClient.getMusicPost({},music_body, {}).then((res)=>{
                console.log(res);
                data = res['data']['body'];
                var i;
                for (i = 0; i < data.length && i<10; i++) {
                    update_search_music(data[i],i);
                }

            })
 
}

function update_search_music(data,j){

    let search_music_id = 'search' + j + '_music_id';
    let visible = document.getElementById(search_music_id)
    visible.classList.remove("invisible")

    var api_song= data['song']; // 
    var api_artist= data['artist']; // 
    var api_album= data['album_pic'];
    var api_add_song= data['url']; //

    let song = 'search' + j + '_song' 
    console.log(song,j) 

    document.getElementById(song).innerHTML = api_song;

    let artist = 'search' + j + '_artist' 
    document.getElementById(artist).innerHTML = api_artist;

    let album = 'search' + j + '_album' ;
    document.getElementById(album).src = api_album;

    let songurl = 'search' + j + '_url';
    document.getElementById(songurl).value = api_add_song;
    console.log(api_add_song)


}