// Collection.js
// -------------
define(["jquery","backbone","models/Friend"],

  function($, Backbone, Friend) {

    // Creates a new Backbone Collection class object
    var Collection = Backbone.Collection.extend({

      // Tells the Backbone Collection that all of it's models will be of type Model (listed up top as a dependency)
      model: Friend,
      parse: function(response) {
      	console.log(response);
      	return response;
      }
    });

    // Returns the Model class
    return Collection;

  }

);
