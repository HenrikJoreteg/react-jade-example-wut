var each = require('amp-each');

function attrString(attrs) {
    var buff = [];
    for (var key in attrs) {
        buff.push(key + '="' + attrs[key] + '"');
    }
    if (!buff.length) {
        return '';
    }
    return ' ' + buff.join(' ');
}

function stringify(buff, doc) {
    buff += '<' + doc.name + (doc.attrs ? attrString(doc.attrs) : '') + (doc.selfClosing ? '/>' : '>');
    if (doc.selfClosing) {
        return doc.preText + buff + doc.postText;
    }
    var middle = doc.preText + doc.children.reduce(stringify, '');
    return buff + middle + '</' + doc.name + '>' + doc.postText;
}

module.exports = function (doc) {
    return stringify('', doc);
};
