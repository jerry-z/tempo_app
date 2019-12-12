function likebuttoncustomized(x) {
    let id = x.id.split('_')[1]
    console.log(id)
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
  if ( x.classList.contains( "far") ) {
        x.classList.remove( "far" );
        x.classList.add( "fas" );
    }
    else {
        x.classList.remove( "fas" );
        x.classList.add( "far" );
    }

}