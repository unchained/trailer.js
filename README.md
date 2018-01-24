# Trailer.js

Similar to Headroom.js, Trailer hides your header as you scroll down and gradually reveals it as you scroll up,
giving your users more screen space for the content they want, while keeping the navigation at hand. 

![Trailer.js demo](https://i.imgur.com/xHRXmsp.gif)

## Getting Started

Install the latest version of Trailer: 

* [Download a .zip of the latest version](https://github.com/unchained/trailer.js/archive/master.zip)
* Clone the repo: `git clone https://github.com/unchained/trailer.js.git`
* Install with [npm](https://www.npmjs.com/): `npm install trailer.js`

### Usage
Make sure the target element is 
```css
position: fixed;
```
when applying Trailer to it.
Works well for example with the Bootstrap 4 fixed navbar.

It is also recommended to apply 
```css
transform: translateZ(0);
```
to eliminate jumping of the element while scrolling on some browsers.

Then initialize in your Javascript file:
```javascript
import Trailer from 'trailer.js'; // or `const Trailer = require('trailer.js').default;`
const trailer = new Trailer('.navbar', {/*...options*/});
```
### Documentation

### new Trailer([selector](#selector), [[options]](#options))

#### selector
Type: `String` 

Selector for the header element


#### [options]
Type: `Object`

The options object can contain the following:
* **revealAtBottom**: *String* — Should the navbar slide out at page bottom?, default `true`.
* **bottomOffset**: *Number*, *Function* or *String* — Offset from the bottom of the body where the header should be fully visible if `revealAtBottom=true`. Can be a number, function returning a number or element selector string. Passing a selector calculates the height of element automatically.
### Dependencies

There are no required dependencies.

## Development

How to get a development environment running:

Install the latest version of gulp 4

```
npm install gulpjs/gulp-cli -g
npm install gulpjs/gulp#4.0 --save-dev
```

install any other npm dependencies

```
npm install
```

compile and start a watcher

```
gulp develop
```

## Built With

* [Gulp](https://gulpjs.com/) - The build tool
* [Babel](https://babeljs.io/) - Transpiling ES2015 to ES5 + UMD support

## Contributing

* Javascript follows ESLint rules listed in the [.eslintrc.json](.eslintrc.json) file.
* Feel free to fork the repo and make pull requests :) 

## Versioning

We use [SemVer](http://semver.org/) for versioning. 

## Authors

* **UNCHAINED.studio** - *Initial work* - [https://unchained.studio](https://unchained.studio)

See also the list of [contributors](https://github.com/unchained/trailer.js/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to [Osvaldas Valutis](https://osvaldas.info/) for the [article](https://osvaldas.info/auto-hide-sticky-header) and it's code examples which were used as a base for this plugin.  
