define(["jquery","underscore","backbone"],function(e,i,t){var s=t.View.extend({el:"#loader",initialize:function(){this.listenTo(this.model.youtube,"request",this.show),this.listenTo(this.model.youtube,"sync",this.hide),this.listenTo(t,"app:loader-start",this.show),this.listenTo(t,"app:loader-end",this.hide)},show:function(){this.$el.removeClass("hidden")},hide:function(){this.$el.addClass("hidden")}});return s});