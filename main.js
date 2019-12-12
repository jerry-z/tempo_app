var desktop_path = '/home/jerry/Desktop/'


let urlinfo = window.location.search;
let searchparams = new URLSearchParams(urlinfo)
var user_val = searchparams.get("user_key")
//var user_val = 'davit666lwh';
var user_key = '?user_key=' + user_val;




window.onscroll = function() {myFunction()};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}


function goto_home(){location.href = "../home/home.html"+ user_key;}
function goto_search(){location.href = "../search/search.html"+ user_key;}
function goto_upload(){location.href = "../upload/upload.html"+ user_key + "&music_url=none&image_url=none";}
function goto_user(){location.href = "../user/user.html"+ user_key;}


function likebutton(x) {
    if ( x.classList.contains( "fa-heart") ) {
        x.classList.remove( "fa-heart" );
        x.classList.add( "fa-heart-o" );
    }
    else {
        x.classList.remove( "fa-heart-o" );
        x.classList.add( "fa-heart" );
    }
}



function savebutton(x) {
  if ( x.classList.contains( "far") ) {
        x.classList.remove( "far" );
        x.classList.add( "fas" );
    }
    else {
        x.classList.remove( "fas" );
        x.classList.add( "far" );
    }

}


function savemusicbutton(x) {
  if ( x.classList.contains( "fa-circle") ) {
        x.classList.remove( "fa-circle" );
        x.classList.remove( "far" );

        x.classList.add( "fa-record-vinyl" );
        x.classList.add( "fas" );

    }
    else {
        x.classList.remove( "fa-record-vinyl" );
        x.classList.remove( "fas" );

        x.classList.add( "far" );
        x.classList.add( "fa-circle" );
    }

}



function followuserbutton(x) {
  if ( x.classList.contains( "fa-check") ) {
        x.classList.remove( "fa-check" );
        x.classList.add( "fa-user-plus" );

    }
    else {
        x.classList.remove( "fa-user-plus" );

        x.classList.add( "fa-check" );
    }

}

function editprofile(){
    location.href = "editprofile.html" + user_key;  
}


function logout(){
    location.href = "../login/login.html";
}

function updateComments(commentlist,j){

    var comlist = [];

    var i;
    for (i = 0; i < commentlist.length; i++) {
        let userid = commentlist[i]['UserId'];
        let comment = commentlist[i]['comment'];
        let com = {'userId':userid,'comment':comment }
        comlist.push(com)
    }  
    console.log('123213',comlist)

    return comlist
}








function initListOfTasks(tasks,i,bookmark=false) {
    let cardContainer;
    let createTaskCard = (task) => {
        let card = document.createElement('div');
        card.className = 'card cursor-pointer';

        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        let userId = document.createElement('span');
        userId.innerText = task.userId;
        userId.className = 'font-weight-bold divider';
        userId.style = 'margin-left:0.5cm; margin-top:0.2cm;';


        let comment = document.createElement('span');
        comment.innerText = task.comment;
        comment.className = 'card-comment text-muted ';
        comment.style = 'margin-left:0.5cm;'

        let profimg = document.createElement('img');
        profimg.className = 'rounded-circle pull-left';
        profimg.style = 'width: 3rem';

        console.log(task.userId,'1AAAAAA2321')
        profimg.src = 'https://s3.amazonaws.com/music-user-image/' +task.userId+ '.jpg'

        cardBody.appendChild(profimg);
        cardBody.appendChild(userId);
        cardBody.appendChild(comment);

        card.appendChild(cardBody);
        cardContainer.appendChild(card);
    }
    if (cardContainer) {
        document.getElementById('card-container').replaceWith(cardContainer);
        return;
    }

    if (bookmark == true){
        cardContainer = document.getElementById('book_'+ 'card-container'+i); 

    }else{
        cardContainer = document.getElementById('card-container'+i); 

    }
    var f;
    for(f=0; f < tasks.length; f++){
        createTaskCard(tasks[f]);
    };
};

function updatePost(data, i){
    var tasks;
    let j = i;
    var api_postid = data['StoryId'];
    var api_userid = data['UserId'];
    var api_post_desc = data['txtdata'];
    var api_post_profpic  = 'https://s3.amazonaws.com/music-user-image/' +api_userid + '.jpg' //'https://music-user-image.s3.amazonaws.com/' + api_userid +'.jpg';
    var api_post_pic = data['imagedata'];
    console.log('asdfas', api_post_pic)
    var api_post_music_url = data['musicdata']['url'];
    var api_post_comments = data['comments_list'];
    
    tasks = updateComments(api_post_comments,i)
    console.log(tasks.length, 'SFDSDFDS')
    if (tasks.length>0){
        initListOfTasks(tasks,i)
    }

    let postid = 'post' + j + '_id';
    visible = document.getElementById(postid)
    visible.classList.remove("invisible")

    let postuser = 'post' + j + '_user';
    document.getElementById(postuser).innerHTML = api_userid;

    let postdesc = 'post' + j + '_desc';
    document.getElementById(postdesc).innerHTML = api_post_desc;

    let post_userpic = 'post' + j + '_profpic' 
    document.getElementById(post_userpic).src = api_post_profpic;

    let post_pic = 'post' + j + '_pic' 
    document.getElementById(post_pic).src = api_post_pic;

    let post_music = 'post' + j + '_music_url' 
    document.getElementById(post_music).src = api_post_music_url;

    let like_list = data["like_list"]
    let collection_list = data["collection_list"]
    console.log(j)
    console.log(like_list)
    console.log(collection_list)
    if (like_list.indexOf(user_val) >= 0){
        console.log("!!!!!!!!!!!!!")
        let x = document.getElementById("likebutton_" + j)
        console.log(x)
        x.classList.remove( "fa-heart-o" );
        x.classList.add( "fa-heart" );

    }
    if (collection_list.indexOf(user_val) >= 0){
        let x = document.getElementById("savebutton_" + j)
        x.classList.remove( "far" );
        x.classList.add( "fas" );

    }
}


// API GATEWAY FUNCTIONS

//Global
var user_name = 'therealobama';
//document.getElementById('account_username').innerHTML = user_name;

var bio = 'This is my bio; etc';
//document.getElementById('bio').innerHTML = bio;

var profpic = 'https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg';
//document.getElementById('profpic').innerHTML = profpic;


//Home
var body = {
      "messages": [
        {
          "request_type": "get_public_news_feed",
          "unconstructed": {
            "user_id": user_val
          }
        }
      ]
    };
 

var apigClient = apigClientFactory.newClient();
function getPostInfo(){
    apigClient.getNewsfeedPost({},body, {}).then((res)=>{
                console.log(res);
                data = res['data']['body'];
                console.log(data.length)
                var i;
                for (i = 0; i < data.length && i < 10; i++) {
                    updatePost(data[i],i);
                    homePostInfoList[i] = data[i]
                }

            })
 
}


function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = false;
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}
var homePostInfoList = [];