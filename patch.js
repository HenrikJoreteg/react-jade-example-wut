var isNumber = require('amp-is-number');


module.exports = function (diff) {
    var findEl = function (el, pathNames) {
        var current = el;
        var path;
        for (var i = 0, l = pathNames.length; i < l; i++) {
            path = pathNames[i];
            if (current && (path === 'children' || isNumber(path))) {
                current = current[path];
            } else {
                if (path === 'preText') {
                    current.innerText = diff.rhs
                }
            }
        }
    }
    switch (diff.kind) {
    case 'E':
        return function (el) {
            findEl(el, diff.path);
        }
        break;
    }

}
