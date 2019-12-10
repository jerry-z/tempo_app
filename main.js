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


