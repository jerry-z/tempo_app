function search(){
	if (document.getElementById("user-accounts-tab-just").classList.contains('active')){
		user_search()
	}else{
		music_search()
	}
}

// #############################Search Users##########################################################


var account_search_body = {
  "messages": [
    {
      "request_type": "search_users",
      "unconstructed": {
        "user_id": user_val,
        "search_content": 'jz',
        "new_friend": {
          "user_id": "xyz",
          "first_name": "Xupeng",
          "last_name": "Ai"
        },
        "friend_valid": false
      }
    }
  ]
}

function user_search(){
	console.log('asdf1')
    apigClient.getUserPost({},account_search_body, {}).then((res)=>{
                console.log(res);
                data = res['data']['body'];
                var i;
                for (i = 0; i < data.length && i<10; i++) {
                    update_search_accounts(data[i],i);
                }

            })
 
}

function update_search_accounts(data, j){

    let search_account_id = 'search' + j + '_account_id';
    let visible = document.getElementById(search_account_id)
    visible.classList.remove("invisible")
    var api_firstname= data['FirstName']; //
    var api_lastname= data['LastName']; //

    var api_username= data['UserId']; //
    var api_user_profpic= 'https://music-user-image.s3.amazonaws.com/' + api_username + '.jpg'; //
    var api_adduser= data['followed']; // 

    console.log(api_username, api_user_profpic, api_adduser);
    let username = 'search' + j + '_username';
    let user_profpic = 'search' + j + '_profpic'; 
    let user_add = 'search' + j + '_adduser'

	document.getElementById(username).innerHTML = api_username;
	document.getElementById(user_profpic).src = api_user_profpic;

	if (api_adduser == true) {
		x = document.getElementById(user_add)
        x.classList.remove( "fa-user-plus" );
		x.classList.add( "fa-check" );
	}

    //let adduser = 'search' + j + '_adduser' 
    //document.getElementById(adduser).src = api_adduser; // 
}


// ######################### Search Music ###########################################333
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

var apigClient = apigClientFactory.newClient();
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

    let album = 'search' + j + '_album' 
    document.getElementById(album).src = api_album;

    let add_song = 'search' + j + '_adduser' 
    document.getElementById(add_song).src = api_add_song; //

}


function followuserbuttoncustomized(x) {
    let button_id = x.id.replace("search","")[0]
    let friend_id = 
    console.log(button_id)

    if ( x.classList.contains( "fa-check") ) {
        var valid = false
    }
    else {
        var valid = true
    }




    var add_friend_body={
      "messages": [
        {
          "request_type": "add_friend",
          "unconstructed": {
            "user_id": "davit666lwh",
            "new_friend": friend_id,
            "friend_valid": valid
          }
        }
      ]
    }    

    apigClient.editUserPost({},add_friend_body, {}).then((res)=>{
                console.log(res);
                data = res['data']['body'];
                console.log(data)
                

            })




    if ( x.classList.contains( "fa-check") ) {
        x.classList.remove( "fa-check" );
        x.classList.add( "fa-user-plus" );

    }
    else {
        x.classList.remove( "fa-user-plus" );

        x.classList.add( "fa-check" );
    }

}