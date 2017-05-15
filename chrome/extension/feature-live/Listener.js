class listener{
  function get(){
    return $(".listener").first();
  }
  function set(target){
    target.addClass("listener");
  }
  function delete( target ){
    $(target).each( function(t){
      $(t).removeClass("listener");
      $(t).prop("search_term", "");
    }
  }
  function reset(){
    this.delete(".listener");
  }
}
