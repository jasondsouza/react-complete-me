(function(name, context, mod_def) {
  if (typeof module === "object" && moulde.exports) module.exports = mod_def();
  else if (typeof define === "function" && define.amd) define(mod_def);
  else context[name] = definition();
})("suggestion-cache", this, function() {

/**
 * Caches suggestions.
 * TODO: threshold LRU.
 */
var SuggestionCache = function() {
  var _cache = {};
  var _last_cache = new Date();

  var _normalize_q = function(q) {
    return q.toLowerCase();
  }

  this.lookup = function(q) {
    return _cache[_normalize_q(q)];
  };

  this.add = function(q, resp) {
    _cache[_normalize_q(q)] = resp;
    _last_cache = new Date();
  };

  this.last_cache = function() {
    return _last_cache;
  };
};

return SuggestionCache;

});
