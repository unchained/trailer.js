module.exports = class Trailer {
  /**
   * Turns an element into a trailing header.
   * @param {string} selector - Selector for the header element
   * @param {Object} [options] - Plugin's options object
   * @param {boolean} [options.revealAtBottom=true] - Should the navbar slide out at page bottom?
   * @param {number|function|string} [options.bottomOffset=0] - Offset from the bottom of the body where the header should be fully visible if revealAtBottom=true. Can be a number, function returning a number or element selector string. Passing a selector calculates the height of element automatically.
   */
  constructor(selector, options) {
    const _this = this;
    const defaults = {
      revealAtBottom: true,
      bottomOffset: 0,
    };
    this.options = Object.assign({}, defaults, options);
    this.selector = selector;
    this.wScrollLast = window.scrollY;
    if (this.options.revealAtBottom) {
      this.options.calculatedBottomOffset = this.calculateBottomOffset();
      window.addEventListener('resize', _this.debounce(() => {
        this.options.calculatedBottomOffset = this.calculateBottomOffset();
      }, 200));
    }
    this.init();
  }

  init() {
    const _this = this;
    window.addEventListener('scroll', () => {
      const wScrollCurrent = window.scrollY;
      const element = document.querySelector(this.selector);
      const elHeight = this.outerHeight(element);
      const wScrollDiff = this.wScrollLast - wScrollCurrent;
      const dHeight = this.outerHeight(document.body, true);
      const wHeight = window.innerHeight;

      let elTop = parseInt(window.getComputedStyle(element).top, 10) + wScrollDiff;
      if (wScrollCurrent <= 0) { // scrolled to the very top; element sticks to the top
        element.style.top = '0px';
      } else if (wScrollDiff > 0) { // scrolled up; element slides in
        element.style.top = `${(elTop > 0 ? 0 : elTop)}px`;
      } else if (wScrollDiff < 0) { // scrolled down
        if (_this.options.revealAtBottom && (wScrollCurrent + wHeight >= dHeight - elHeight - _this.options.calculatedBottomOffset)) { // scrolled to the very bottom; reveal at bottom
          elTop = (wScrollCurrent + wHeight + _this.options.calculatedBottomOffset) - dHeight;
          element.style.top = `${(elTop < 0 ? elTop : 0)}px`;
        } else { // scrolled down; element slides out
          element.style.top = `${(Math.abs(elTop) > elHeight ? -elHeight : elTop)}px`;
        }
      }

      this.wScrollLast = wScrollCurrent;
    });
  }

  calculateBottomOffset() {
    const _this = this;
    const {bottomOffset} = _this.options;
    switch (typeof bottomOffset) {
      case 'number':
        return bottomOffset;
      case 'function':
        return bottomOffset();
      case 'string':
        return _this.outerHeight(document.querySelector(bottomOffset));
      default:
        throw new Error(`Unexpected bottomOffset type ${typeof bottomOffset}`);
    }
  }

  outerHeight(el, includeMargin = false) {
    if (!includeMargin) {
      return el.offsetHeight;
    } else {
      const style = window.getComputedStyle(el);
      return (el.offsetHeight + parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10));
    }
  }

  debounce(fn, wait = 1) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn.call(this, ...args), wait);
    };
  }
};
