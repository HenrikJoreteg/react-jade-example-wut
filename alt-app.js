var parse = require('./parse');
var stringify = require('./stringify');
var patch = require('./patch');
var objectDiff = require('deep-diff');
var domify = require('domify');



var view1 = {
    template: require('./template2.jade'),
    initialize: function () {
        this.time = 47
        
        this.el = domify(this.template(this));

        document.body.appendChild(this.el);

        if (!this.ast) {
            this.ast = parse(this.el.outerHTML);
        }

        window.el = this.el;

        
        var count = 0;
        var interval = setInterval(function () {
            console.time('mine')
            this.setTime();
            console.timeEnd('mine')

            count++
            if (count > 100) clearInterval(interval);
        }.bind(this), 100);

        this.render();
    },
    render: function () {
        

        var diff = objectDiff(this.ast, parse(this.template(this)));

        if (diff) {
            var patchFunc = patch(diff[0]);
            //console.log(patchFunc);
            patchFunc(this.el);
        } else {
            //console.log('no diff');
        }
    
    },
    setTime: function () {
        this.time = Date.now();
        this.render();
    }
}

setTimeout(function () {
    view1.initialize()
}, 500)

