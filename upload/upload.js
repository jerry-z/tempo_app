
var apigClient = apigClientFactory.newClient();
var infoList = new Array(10);

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



function addmusicupload(n){
    //, artist, song, albumpic
    let urlinfo = window.location.search;
    let searchparams = new URLSearchParams(urlinfo)
    let img = searchparams.get("image_url")

    let allinfo = infoList[n];
    let music_url = allinfo[0]
    let artist = allinfo[1]
    let song = allinfo[2]
    let albumpic = allinfo[3]

    location.href = 'upload.html' + user_key + '&image_url=' + img + '&music_url=' + music_url
                 + '&artist=' + artist +'&song=' + song + '&albumpic=' + albumpic;

}
//https://music-tmp.s3.amazonaws.com/tmp.jpg
function uploadImage(filename){
    toDataURL(desktop_path + filename, function(dataUrl) {
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




function music_search(text){

    let music_body = {
      "messages": [
        {
          "request_type": "search_music",
          "unconstructed": {
            "user_id": user_val,
            "search_content": text
          }
        }
      ]
    }
    apigClient.getMusicPost({},music_body, {}).then((res)=>{
                console.log(res);
                data = res['data']['body'];
                var i;
                infoList = new Array(10);
                for (i = 0; i < data.length && i<10; i++) {
                    infoList[i] = update_search_music(data[i],i);
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

    return helper(j)
}


function helper(n){
        url = document.getElementById('search' + n + '_url').value
        artist = document.getElementById('search' + n + '_artist').innerHTML
        song = document.getElementById('search' + n + '_song').innerHTML
        albumpic = document.getElementById('search' + n + '_album').src
        return [url,artist,song,albumpic]
      }



function uploadStory() {
    let urlinfo = window.location.search;
    let searchparams = new URLSearchParams(urlinfo)
    let music_url = searchparams.get("music_url");
    let song = searchparams.get("song");
    let artist = searchparams.get("artist");
    let albumpic = searchparams.get("albumpic");

    
    let body = {
          "messages": [
            {
              "request_type": "whatever",
              "unconstructed": {
                "user_id": user_val,
                "new_story": {
                  "txt": document.getElementById('caption_text').value,
                  "img": "S3",
                  "msc": {
                    "album_pic": albumpic,
                    "artist": artist,
                    "song": song,
                    "url": music_url
                  }
                }
              }
            }
          ]
        }

    console.log(body)
    apigClient.uploadStoryPost({},body, {}).then(function(result){
              console.log('success')
            }).catch( function(result){
                console.log('fail')
            });


    }