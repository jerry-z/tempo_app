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


function goto_home(){location.href = "../home/home.html";}
function goto_search(){location.href = "../search/search.html";}
function goto_upload(){location.href = "../upload/upload.html";}
function goto_user(){location.href = "../user/user.html";}


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
    location.href = "editprofile.html";  
}


function logout(){
    location.href = "../login/login.html";
}




// API GATEWAY FUNCTIONS

//Global
var user_name = 'therealobama';
document.getElementById('account_username').innerHTML = user_name;

var bio = 'This is my bio; etc';
document.getElementById('bio').innerHTML = bio;

var profpic = 'https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg';
document.getElementById('profpic').innerHTML = profpic;


//Home

function getPostInfo(){
    //post1 GET FUNCTIONS
    var post1_id = '123123'; //GET FROM API GATEWAY RESPONSE
    var post1 =document.getElementById('post1_id')
    post1.name = post1_id;
    post1.classList.remove("invisible");

    var post1_user = 'defaultusername'; //GET FROM API GATEWAY RESPONSE
    document.getElementById('post1_user').innerHTML = post1_user;

    var post1_desc = 'post description'; //GET FROM API GATEWAY RESPONSE
    document.getElementById('post1_desc').innerHTML = post1_desc;

    var post1_profpic = 'https://www.biography.com/.image/t_share/MTE4MDAzNDEwNzg5ODI4MTEw/barack-obama-12782369-1-402.jpg'; //GET FROM API GATEWAY RESPONSE
    document.getElementById('post1_profpic').src = post1_profpic;

    var post1_pic = 'https://3.bp.blogspot.com/-zNIwfDE53Hk/XCoHSUkZVaI/AAAAAAAADgE/d7z0EnTFKxQpgTs6uKaa_FzrUAc3MD5ngCHMYCw/s1600/pretty-scenic-wallpaper-and-screensavers-amazing-wallpaper-hd.jpg'; //GET FROM API GATEWAY RESPONSE
    document.getElementById('post1_pic').src = post1_pic;

    var post1_music_url = 'https://open.spotify.com/embed/track/1Vk4yRsz0iBzDiZEoFMQyv?si=sG0HNtydR8yd8lyEHf0l-A' //GET FROM API GATEWAY RESPONSE
    document.getElementById('post1_music_url').src = post1_music_url;

    var post1_bookmark = false //save button  ,get + post 
    document.getElementById('post1_bookmark').innerHTML = post1_bookmark;

    var post1_likes = '' //like button, get + post
    document.getElementById('post1_likes').innerHTML = post1_likes;
}
//Search

