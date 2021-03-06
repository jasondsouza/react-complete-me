/** @jsx React.DOM */
define([
  "react",
  "query-string",
  "textfield-watcher"
], function(React, QueryString, TextfieldWatcher) {

/**
 * The Searchbar of the ReactCompleteMe auto-completer.
 */
var Searchbar = React.createClass({
  _q: null,
  _textfield_watcher: null,

  getInitialState: function() {
    this._q = new QueryString(this.props.update_callback);

    this._textfield_watcher = new TextfieldWatcher({
      handle_up: this.go_up_suggestion,
      handle_down: this.go_down_suggestion,
      handle_backspace: this.backspace,
      handle_delete: this.delete,
      handle_enter: this.enter,
      handle_text: this.handle_keypress,
      handle_keyup: this.handle_keyup
    });

    return null;
  },

  handle_keypress: function(ev) {
  },

  handle_keyup: function(ev) {
    this._keyups_since_cache += 1;
    this.set_q_to_current_input();
  },

  go_up_suggestion: function(ev) {
    ev.preventDefault();
    var $searchbar = this.refs.searchbar.getDOMNode(),
        value = this.props.go_up_suggestion();
    if (value === "") return;

    $searchbar.value = value;
  },

  go_down_suggestion: function(ev) {
    var $searchbar = this.refs.searchbar.getDOMNode(),
        value = this.props.go_down_suggestion();
    if (value === "") return;

    $searchbar.value = value;
  },

  backspace: function(ev) {
  },

  delete: function(ev) {
  },

  enter: function(ev) {
    var suggested = this.props.do_autosuggest(ev);
    if (suggested) return;
    this.submit(ev);
  },

  submit: function(ev) {
    var $searchbar = this.refs.searchbar.getDOMNode(),
        val = $searchbar.value;
    this._q.set(val);
    val = this._q.escape();
    if (val.length === 0) return;

    this.props.on_submit(ev, $searchbar.value);
    this.props.clear();
  },

  set_q_to_current_input: function() {
    var $searchbar = this.refs.searchbar.getDOMNode();
    this._q.set($searchbar.value);
  },

  get_escaped_q: function() {
    return this._q.escape();
  },

  get_q: function() {
    return this.refs.searchbar.getDOMNode().value;
  },

  clear: function() {
    this.refs.searchbar.getDOMNode().value = "";
  },

  render: function() {
    return (
      <input
            type="textfield"
            name="q"
            className="autosuggest-searchbar"
            onKeyDown={this._textfield_watcher.handle_keydown}
            onKeyPress={this._textfield_watcher.handle_keypress}
            onKeyUp={this._textfield_watcher.handle_keyup}
            autoComplete="off"
            ref="searchbar" />
    );
  }
});

return Searchbar;

});
