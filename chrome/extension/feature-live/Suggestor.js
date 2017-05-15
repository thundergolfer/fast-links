class suggestor{
  function get(){
    return $("search_suggestions");
  }
  function create(){
    Common.injectHTML(
      "body",
      "div",
      "id = 'search_suggestions'",
    );
    return $("search_suggestions");
  }
  function attach(target){
    this.get().css("left", target.offset().left + target.outerWidth());
    this.get().css("top", target.offset().top());
  }
  function set(arr){
    if(arr.length === 0){
      this.hide();
    }
    else{
      this.get().addClass("active");
      var html_str = "<ol>";
      arr.sort(function(v1,v2){
        return ((v1.visitCount + v1.typedCount*2) - (v2.visitCount + v2.typedCount*2))
      });
      arr.forEach(function(v){
          html_str += "<li url='" + v.url + "' title='" + v.title +"'>" + nicefyURL(v.url) + " | " + v.title.substring(0,21) + "</li>")
      })

      html_str += "</ol>";
      this.get().html();
    }
  }
  function attach(){
    this.get().css("left",suggestor.get().offset().left + suggestor.get().outerWidth());
    this.get().css("top",suggestor.get().offset().top);
  }
  function hide(){
    this.get().removeClass("active");
  }
  function accept(){
    var suggestor  = this.get().find("ol > .selected");
    var entry = listener.get();
    var header =
    var format;
    if(exports.platform.reddit){
      format = "[" +  +"]"
    }
    t.val(t.val().replace("%" + t.prop("search_value"),
    "[" + (t.prop("search_value").length > 0 ? t.prop("search_value") :s.attr("title")) + "](" + s.attr("url") + ")" ));
    $('textarea').trigger('change');
    stopListening(t);
  }
}
