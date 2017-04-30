var $ = require('jquery');
var jQuery = $;
import _ from 'underscore';
require('./jquery.elastic.js')
require('./jquery.fastlinksInput.js')

window.addEventListener('load', () => {
  console.log("Hello from test_injector.js. Let's load the jquery");

  $('textarea').fastlinksInput({
    onDataRequest:function (mode, query, callback) {
      var data = [
        { id:1, name:'Kenneth Auchenberg', 'avatar':'http://cdn0.4dots.com/i/customavatars/avatar7112_1.gif', 'type':'contact' },
        { id:2, name:'Jon Froda', 'avatar':'http://cdn0.4dots.com/i/customavatars/avatar7112_1.gif', 'type':'contact' },
        { id:3, name:'Anders Pollas', 'avatar':'http://cdn0.4dots.com/i/customavatars/avatar7112_1.gif', 'type':'contact' },
        { id:4, name:'Kasper Hulthin', 'avatar':'http://cdn0.4dots.com/i/customavatars/avatar7112_1.gif', 'type':'contact' },
        { id:5, name:'Andreas Haugstrup', 'avatar':'http://cdn0.4dots.com/i/customavatars/avatar7112_1.gif', 'type':'contact' },
        { id:6, name:'Pete Lacey', 'avatar':'http://cdn0.4dots.com/i/customavatars/avatar7112_1.gif', 'type':'contact' }
      ];

      data = _.filter(data, function(item) { return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 });
      console.log("Hello! we're ready to fast link")
      callback.call(this, data);
    }
  });
});
