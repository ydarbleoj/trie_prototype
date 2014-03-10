window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},  
  initialize: function() {
    this.router = new this.Routers.Main();
    Backbone.history.start({pushState: true});

    App.autocompleter = new Autocompleter();
    var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onmessage = function(m) { 
      App.autocompleter.add(m.data); 
    };

  }
};
$(document).ready(function(){
  App.initialize();
});

// router 
App.Routers.Main = Backbone.Router.extend({
  routes: { 
    "":          "index", 
  },

  index: function(){
    var view = new App.Views.AppIndex();
    $('.container').append(view.render().el);
  }, 

});

//  VIEW 

App.Views.AppIndex = Backbone.View.extend({

  id: "search_temp",

  events: {
    "keyup #search_bar": "search_fnc"
  },

  template: function(){ return "<form><input id=\"search_bar\" type=\"text\"> search field</input></form>"}, 

  render: function() {
    $(this.el).html(this.template());
    return this;
  }, 

  search_fnc: function() {
    $('#titles').empty();
    var wiki_title = $('#search_bar').val();
    var results = App.autocompleter.complete(wiki_title);
    $.each(results, function(index, value){
      $('#titles').append("<li><a href=\"https://en.wikipedia.org/wiki/"+ value + "\">"+ value + "</li>");
    });
  }, 

  params_search: function(param) {
    var results = App.autocompleter.complete(param);
    $.each(results, function(index, value){
      $("#titles").append("<li><a href=\"https://en.wikipedia.org/wiki/"+ value + "\">"+ value + "</li>");
        $('#titles').html(results);
    });
  }

});


 
 //  auto_search: function(param){
 //    var results = App.autocompleter.complete(param);
 //     $.each(results, function(index, value){
 //          $("#titles").append("<li><a href=\"https://en.wikipedia.org/wiki/"+ value + "\">"+ value + "</li>");
 //          // $("#titles").html(results);
 //        });
 //  }





