(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.Trailer = mod.exports;
  }
})(this, function (module) {
  'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  module.exports = function () {
    /**
     * Turns an element into a trailing header.
     * @param {string} selector - Selector for the header element
     * @param {Object} [options] - Plugin's options object
     * @param {boolean} [options.revealAtBottom=true] - Should the navbar slide out at page bottom?
     * @param {number|function|string} [options.bottomOffset=0] - Offset from the bottom of the body where the header should be fully visible if revealAtBottom=true. Can be a number, function returning a number or element selector string. Passing a selector calculates the height of element automatically.
     */
    function Trailer(selector, options) {
      var _this2 = this;

      _classCallCheck(this, Trailer);

      var _this = this;
      var defaults = {
        revealAtBottom: true,
        bottomOffset: 0
      };
      this.options = Object.assign({}, defaults, options);
      this.selector = selector;
      this.wScrollLast = window.scrollY;
      if (this.options.revealAtBottom) {
        this.options.calculatedBottomOffset = this.calculateBottomOffset();
        window.addEventListener('resize', _this.debounce(function () {
          _this2.options.calculatedBottomOffset = _this2.calculateBottomOffset();
        }, 200));
      }
      this.init();
    }

    _createClass(Trailer, [{
      key: 'init',
      value: function init() {
        var _this3 = this;

        var _this = this;
        window.addEventListener('scroll', function () {
          var wScrollCurrent = window.scrollY;
          var element = document.querySelector(_this3.selector);
          var elHeight = _this3.outerHeight(element);
          var wScrollDiff = _this3.wScrollLast - wScrollCurrent;
          var dHeight = _this3.outerHeight(document.body, true);
          var wHeight = window.innerHeight;

          var elTop = parseInt(window.getComputedStyle(element).top, 10) + wScrollDiff;
          if (wScrollCurrent <= 0) {
            // scrolled to the very top; element sticks to the top
            element.style.top = '0px';
          } else if (wScrollDiff > 0) {
            // scrolled up; element slides in
            element.style.top = (elTop > 0 ? 0 : elTop) + 'px';
          } else if (wScrollDiff < 0) {
            // scrolled down
            if (_this.options.revealAtBottom && wScrollCurrent + wHeight >= dHeight - elHeight - _this.options.calculatedBottomOffset) {
              // scrolled to the very bottom; reveal at bottom
              elTop = wScrollCurrent + wHeight + _this.options.calculatedBottomOffset - dHeight;
              element.style.top = (elTop < 0 ? elTop : 0) + 'px';
            } else {
              // scrolled down; element slides out
              element.style.top = (Math.abs(elTop) > elHeight ? -elHeight : elTop) + 'px';
            }
          }

          _this3.wScrollLast = wScrollCurrent;
        });
      }
    }, {
      key: 'calculateBottomOffset',
      value: function calculateBottomOffset() {
        var _this = this;
        var bottomOffset = _this.options.bottomOffset;

        switch (typeof bottomOffset === 'undefined' ? 'undefined' : _typeof(bottomOffset)) {
          case 'number':
            return bottomOffset;
          case 'function':
            return bottomOffset();
          case 'string':
            return _this.outerHeight(document.querySelector(bottomOffset));
          default:
            throw new Error('Unexpected bottomOffset type ' + (typeof bottomOffset === 'undefined' ? 'undefined' : _typeof(bottomOffset)));
        }
      }
    }, {
      key: 'outerHeight',
      value: function outerHeight(el) {
        var includeMargin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if (!includeMargin) {
          return el.offsetHeight;
        } else {
          var style = window.getComputedStyle(el);
          return el.offsetHeight + parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
        }
      }
    }, {
      key: 'debounce',
      value: function debounce(fn) {
        var _this4 = this;

        var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        var timeout = void 0;
        return function () {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          clearTimeout(timeout);
          timeout = setTimeout(function () {
            return fn.call.apply(fn, [_this4].concat(args));
          }, wait);
        };
      }
    }]);

    return Trailer;
  }();
});