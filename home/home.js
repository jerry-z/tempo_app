function likebuttoncustomized(x) {
    let id = x.id.split('_')[1]
    console.log(id)
    let story_id = homePostInfoList[id]["StoryId"]
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



function savebuttoncustomized(x) {
    let id = x.id.split('_')[1]
    console.log(id)
    var story_id = homePostInfoList[id]["StoryId"]
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


function newcomment(post) {
    document.getElementById(post + '_new_comment').innerHTML = document.getElementById(post +'_comment').value;
    document.getElementById(post+'_new_com_userid').innerHTML = user_val;
    document.getElementById(post+'_new_com_img').src = 'https://s3.amazonaws.com/music-user-image/' + user_val+ '.jpg';

    let id = post.slice(-1)
    var story_id = homePostInfoList[id]["StoryId"]
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


