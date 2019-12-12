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
    let story_id = homePostInfoList[id]["StoryId"]
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