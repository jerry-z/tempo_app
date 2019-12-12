

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
 

var apigClient = apigClientFactory.newClient();
function getUserPostInfo(){
    apigClient.getNewsfeedPost({},profbody, {}).then((res)=>{
                console.log(res);
                console.log(user_val)
                data = res['data']['body'];
                var i;
                for (i = 0; i < data.length && i<2; i++) {
                    updatePost(data[i],i);
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

}

function loadeditprofile() {
  document.getElementById('account_pic').src = 'https://s3.amazonaws.com/music-user-image/' +user_val + '.jpg';

}