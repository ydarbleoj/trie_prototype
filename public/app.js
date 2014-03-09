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
  routes: { "": "index" },

  index: function(){
    var view = new App.Views.AppIndex();
    $('.container').append(view.render().el);
  }
});

//  VIEW --> INDEX 

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
    var new_search = $('#search_bar').val();
    var results = App.autocompleter.complete(new_search);
    // $.each(results, function(index, value){
      $('#titles').html(results);
    // })
  }
});

//  VIEW --> SHOW 

App.Views.AppShow = Backbone.View.extend({ 

  id: "", 

  events: {

  }, 

  render: function() {

  }

})




