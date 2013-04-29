define([
  "jquery",
  "bigbird"
],
function($, BigBird) {

  return BigBird.Module.extend({

    el: $(".js-stream"),
    newItemsInStream: 0,

    template: [
      "<li class='stream__item is-hidden'>",
      "<div class='stream__item__content'>",
      "<h2>{{title}}</h2>",
      "<p>{{description}}</p>",
      "<time>{{datetime}}</time>",
      "</div>",
      "</li>"
    ].join("\n"),

    proxied: [
      "onItemReceive"
    ],

    subscriptions: {
      addToStream: "onItemReceive"
    },

    onItemReceive: function() {
      this.newItemsInStream++;
      this.createStreamItem.apply(this, arguments);
    },

    createStreamItem: function(e, item) {
      var template = this.template;
      var node;

      template = template.replace(/\{\{title\}\}/m, item.title);
      template = template.replace(/\{\{description\}\}/m, item.description);
      template = template.replace(/\{\{datetime\}\}/m,
                                  new Date().toISOString());

      node = $(template);
      node.prependTo(this.$el);

      var queryHeight = node.height();
      node.removeClass("is-hidden");
    }

  });

});
