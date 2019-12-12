

var profbody = {
      "messages": [
        {
          "request_type": "get_user_news_feed",
          "unconstructed": {
            "user_id": user_val
          }
        }
      ]
    };
 
var info_user = []
var collection_info = []
var apigClient = apigClientFactory.newClient();
function getUserPostInfo(){
    apigClient.getNewsfeedPost({},profbody, {}).then((res)=>{
                console.log(res);
                console.log(user_val)
                data = res['data']['body'];
                var i;
                for (i = 0; i < data.length && i<10; i++) {
                    updatePost(data[i],i);
                    info_user[i] = data[i];
                }

            })
 
}

var bookmarkbody = {
      "messages": [
        {
          "request_type": "get_collection_news_feed",
          "unconstructed": {
            "user_id": user_val
          }
        }
      ]
    };

function getCollectionPostInfo(){
    apigClient.getNewsfeedPost({},bookmarkbody, {}).then((res)=>{
                console.log(res);
                console.log(user_val)
                data = res['data']['body'];
                var i;
                for (i = 0; i < data.length && i<10; i++) {
                    updateBookmarkPost(data[i],i);
                    collection_info[i] = data[i]
                }

            })
 
}


function uploadNewProfPic(filename){
    toDataURL(desktop_path + filename, function(dataUrl) {
    //console.log('RESULT:', dataUrl)
    let base64res = dataUrl.split(',')[1]

      let base64body = {
            "content":base64res,
            "name":user_val + '.jpg',
            "bucket":"music-user-image"
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




let user_bio = {
      "messages": [
        {
          "request_type": "get_user_info",
          "unconstructed": {
            "user_id": user_val
          }
        }
      ]
    }




function getUserBio(){
    apigClient.getUserPost({},user_bio, {}).then((res)=>{
                data = res['data']['body']['bio'];
                document.getElementById('user_profile_description').innerHTML = data
            })
 
}

function updateBioText(text){
  let edit_bio_body = {
      "messages": [
        {
          "request_type": "edit_bio",
          "unconstructed": {
            "user_id": user_val,
            "bio": text
          }
        }
      ]
    }
   apigClient.editUserPost({},edit_bio_body, {}).then((res)=>{
            })
}

function loadUserPage(){
  document.getElementById('account_username').innerHTML = user_val;
  document.getElementById('account_pic').src = 'https://s3.amazonaws.com/music-user-image/' +user_val + '.jpg';// 'https://music-user-image.s3.amazonaws.com/' + user_val +'.jpg';
  getUserPostInfo()
  getUserBio()
  getCollectionPostInfo()

}

function loadeditprofile() {
  document.getElementById('account_pic').src = 'https://s3.amazonaws.com/music-user-image/' +user_val + '.jpg';

}



function updateBookmarkPost(data, i){
    let btasks;
    let j = i;
    let api_postid = data['StoryId'];
    let api_userid = data['UserId'];
    let api_post_desc = data['txtdata'];
    let api_post_profpic  = 'https://s3.amazonaws.com/music-user-image/' +api_userid + '.jpg' //'https://music-user-image.s3.amazonaws.com/' + api_userid +'.jpg';
    let api_post_pic = data['imagedata'];
    let api_post_music_url = data['musicdata']['url'];
    let api_post_comments = data['comments_list'];
    
    // btasks = updateComments(api_post_comments,i)
    // if (btasks.length>0){
    //     initListOfTasks(btasks,i,bookmark=true)
    // }

    let postid = 'book_post' + j + '_id';
    visible = document.getElementById(postid)
    visible.classList.remove("invisible")

    let postuser = 'book_post' + j + '_user';
    document.getElementById(postuser).innerHTML = api_userid;

    let postdesc = 'book_post' + j + '_desc';
    document.getElementById(postdesc).innerHTML = api_post_desc;

    let post_userpic = 'book_post' + j + '_profpic' 
    document.getElementById(post_userpic).src = api_post_profpic;

    let post_pic = 'book_post' + j + '_pic' 
    document.getElementById(post_pic).src = api_post_pic;

    let post_music = 'book_post' + j + '_music_url' 
    document.getElementById(post_music).src = api_post_music_url;

    let like_list = data["like_list"]
    let collection_list = data["collection_list"]

    if (like_list.indexOf(user_val) >= 0){
        let x = document.getElementById("book_likebutton_" + j)
        console.log(x)
        x.classList.remove( "fa-heart-o" );
        x.classList.add( "fa-heart" );

    }
    if (collection_list.indexOf(user_val) >= 0){
        let x = document.getElementById("book_savebutton_" + j)
        x.classList.remove( "far" );
        x.classList.add( "fas" );

    }
}



function fav_music_search(){

    let music_body = {
      "messages": [
        {
          "request_type": "search_favorite_music",
          "unconstructed": {
            "user_id": user_val
          }
        }
      ]
    }


    apigClient.getMusicPost({},music_body, {}).then((res)=>{
                console.log(res,'AAAAAAAAAAAA');
                data = res['data']['body'];
                var i;
                for (i = 0; i < data.length && i<10; i++) {
                    console.log('asdfasdfasdfasd')
                    update_search_music(data[i],i);
                    musicInfoList[i] = data[i];
                }

            })
 
}


function likebuttoncustomized2(x) {
    let id = x.id.split('_')[1]
    console.log(id)
    let story_id = info_user[id]["StoryId"]
    console.log(story_id)

    if ( x.classList.contains( "fa-heart") ) {
        var valid = false
    }
    else {
        var valid = true
    }
    console.log(valid)
    let add_like_body = {
      "messages": [
        {
          "request_type": "add_like",
          "unconstructed": {
            "user_id": user_val,
            "story_id": story_id,
            "like": valid,
          }
        }
      ]
    }

    apigClient.editStoryPost({},add_like_body, {}).then((res)=>{
                console.log(res);
                data = res['data']['body'];
                console.log(data)

            })

    if ( x.classList.contains( "fa-heart") ) {
        x.classList.remove( "fa-heart" );
        x.classList.add( "fa-heart-o" );
    }
    else {
        x.classList.remove( "fa-heart-o" );
        x.classList.add( "fa-heart" );
    }
}



function savebuttoncustomized2(x) {
    let id = x.id.split('_')[1]
    console.log(id)
    var story_id = info_user[id]["StoryId"]
    console.log(story_id)

    if ( x.classList.contains( "far") ) {
        var valid = true
    }
    else {
        var valid = false
    }
    console.log(valid)


    let add_collection_body = {
      "messages": [
        {
          "request_type": "add_collection",
          "unconstructed": {
            "user_id": user_val,
            "story_id": story_id,
            "collection": valid,
          }
        }
      ]
    }

    apigClient.editStoryPost({},add_collection_body, {}).then((res)=>{
                console.log(res);
                data = res['data']['body'];
                console.log(data)


            })


  if ( x.classList.contains( "far") ) {
        x.classList.remove( "far" );
        x.classList.add( "fas" );
    }
    else {
        x.classList.remove( "fas" );
        x.classList.add( "far" );
    }

}


function newcomment2(post) {
    document.getElementById(post + '_new_comment').innerHTML = document.getElementById(post +'_comment').value;
    document.getElementById(post+'_new_com_userid').innerHTML = user_val;
    document.getElementById(post+'_new_com_img').src = 'https://s3.amazonaws.com/music-user-image/' + user_val+ '.jpg';

    let id = post.slice(-1)
    var story_id = info_user[id]["StoryId"]
    console.log(story_id)

    let add_comment_body = {
                  "messages": [
                    {
                      "request_type": "add_comment",
                      "unconstructed": {
                        "user_id": user_val,
                        "story_id": story_id,
                        "comment": document.getElementById(post +'_comment').value
                      }
                    }
                  ]
                }

    apigClient.editStoryPost({},add_comment_body, {}).then((res)=>{
                console.log(res);
                data = res['data']['body'];
                console.log(data)


            })
}




function likebuttoncustomized3(x) {
    let id = x.id.split('_')[2]
    console.log(id)
    let story_id = collection_info[id]["StoryId"]
    console.log(story_id)

    if ( x.classList.contains( "fa-heart") ) {
        var valid = false
    }
    else {
        var valid = true
    }
    console.log(valid)
    let add_like_body = {
      "messages": [
        {
          "request_type": "add_like",
          "unconstructed": {
            "user_id": user_val,
            "story_id": story_id,
            "like": valid,
          }
        }
      ]
    }

    apigClient.editStoryPost({},add_like_body, {}).then((res)=>{
                console.log(res);
                data = res['data']['body'];
                console.log(data)

            })

    if ( x.classList.contains( "fa-heart") ) {
        x.classList.remove( "fa-heart" );
        x.classList.add( "fa-heart-o" );
    }
    else {
        x.classList.remove( "fa-heart-o" );
        x.classList.add( "fa-heart" );
    }
}



function savebuttoncustomized3(x) {
    let id = px.id.split('_')[2]
    console.log(id)
    var story_id = collection_info[id]["StoryId"]
    console.log(story_id)

    if ( x.classList.contains( "far") ) {
        var valid = true
    }
    else {
        var valid = false
    }
    console.log(valid)


    let add_collection_body = {
      "messages": [
        {
          "request_type": "add_collection",
          "unconstructed": {
            "user_id": user_val,
            "story_id": story_id,
            "collection": valid,
          }
        }
      ]
    }

    apigClient.editStoryPost({},add_collection_body, {}).then((res)=>{
                console.log(res);
                data = res['data']['body'];
                console.log(data)


            })


  if ( x.classList.contains( "far") ) {
        x.classList.remove( "far" );
        x.classList.add( "fas" );
    }
    else {
        x.classList.remove( "fas" );
        x.classList.add( "far" );
    }

}


function newcomment3(post) {
    document.getElementById(post + '_new_comment').innerHTML = document.getElementById(post +'_comment').value;
    document.getElementById(post+'_new_com_userid').innerHTML = user_val;
    document.getElementById(post+'_new_com_img').src = 'https://s3.amazonaws.com/music-user-image/' + user_val+ '.jpg';

    let id = post.slice(-1)
    var story_id = collection_info[id]["StoryId"]
    console.log(story_id)

    let add_comment_body = {
                  "messages": [
                    {
                      "request_type": "add_comment",
                      "unconstructed": {
                        "user_id": user_val,
                        "story_id": story_id,
                        "comment": document.getElementById(post +'_comment').value
                      }
                    }
                  ]
                }

    apigClient.editStoryPost({},add_comment_body, {}).then((res)=>{
                console.log(res);
                data = res['data']['body'];
                console.log(data)


            })
}

function deletePost(id){
    var story_id = info_user[id]["StoryId"]
    console.log(story_id)



    let delete_post_body = {
      "messages": [
        {
          "request_type": "delete_story",
          "unconstructed": {
            "user_id": user_val,
            "story_id": story_id,
          }
        }
      ]
    }

    apigClient.editStoryPost({},delete_post_body, {}).then((res)=>{
                console.log(res);
                data = res['data']['body'];
                console.log(data)


            })
    goto_user()
}