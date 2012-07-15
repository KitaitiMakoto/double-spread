DoubleSpread = {
    Controller: {
        pages: 2,
        views: [],
        back: function(number) {
            if (number === undefined)
                number = this.pages;
            for (var i in this.views) {
                var view = this.views[i];
                // To do: try and catch exception thrown by model
		try {
                    view.model = view.model.previous(number);
		} catch (e if e == "NoPageError") {
                    // NullModel?
                }
	    }
            this.refresh();
        },
        forward: function(number) {
            if (number === undefined)
                number = this.pages;
            for (var i in this.views) {
                var view = this.views[i];
                // To do: try and catch exception thrown by model
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


        // Dummy
        this.lastPage = 7;
    },

    View: function($node) {
        this.$node = $node;
        this.model = null;
    }
};
DoubleSpread.Model.prototype.previous = function(number) {
    // Dummey implementation
    // Should throw exception when no page
    if (number === undefined)
        number = 1;
    if (previousId = this.id - number < 0) {
        throw "NoPageError";
    }
    return new DoubleSpread.Model(previousId);
}
DoubleSpread.Model.prototype.next = function(number) {
    // Dummey implementation
    // Should throw exception when no page
    if (number === undefined)
        number = 1;
    if (nextId = this.id - number > this.lastPage) {
        throw "NoPageError";
    }
    return new DoubleSpread.Model(nextId);
}
DoubleSpread.View.prototype.render = function() {
    this.$node.html(this.model.content);
};
