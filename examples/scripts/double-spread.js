DoubleSpread = {
    Controller: {
        pages: 2,
        views: [],
        back: function(number) {
            if (number === undefined)
                number = this.pages;
            for (var i in this.views) {
                var view = this.views[i];
                view.model = view.model.previous(number);
	    }
            this.refresh();
        },
        forward: function(number) {
            if (number === undefined)
                number = this.pages;
            for (var i in this.views) {
                var view = this.views[i];
                view.model = view.model.next(number);
	    }
            this.refresh();
        },
        refresh: function() {
            for (var i in this.views) {
                this.views[i].render();
	    }
	},
    },

    Model: function(id) {
        // Dummy implementation
        this.id = id;
        this.content = "<h1>Page " + this.id + "</h1>";
    },

    View: function($node) {
        this.$node = $node;
        this.model = null;
    }
};
DoubleSpread.Model.prototype.previous = function(number) {
    // Dummey implementation
    if (number === undefined)
        number = 1;
    return new DoubleSpread.Model(this.id - number);
}
DoubleSpread.Model.prototype.next = function(number) {
    // Dummey implementation
    if (number === undefined)
        number = 1;
    return new DoubleSpread.Model(this.id + number);
}
DoubleSpread.View.prototype.render = function() {
    this.$node.html(this.model.content);
};
