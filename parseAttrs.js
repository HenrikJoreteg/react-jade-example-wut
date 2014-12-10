var attrRE = /([\w-]+)|['"]{1}([^'"]*)['"]{1}/g

module.exports = function (str) {
    var i = 0;
    var key;
    var res = {};

    str.replace(attrRE, function (match) {
        if (i % 2) {
            res[key] = match.replace(/['"]/g, '');
        } else {
            key = match;
        }
        i++
    });

    return res;
};
