<div align='center'>
  <img src='media/fig-combined.png' />
  <br>
  <a href='https://travis-ci.org/nikersify/figify'><img src='https://travis-ci.org/nikersify/figify.svg?branch=master'/></a>
  <a href='https://www.npmjs.com/package/figify'><img src='https://img.shields.io/npm/v/figify.svg'/></a>
  <img src='https://img.shields.io/badge/stability-experimental-orange.svg'/>
  <a href='https://github.com/sindresorhus/xo'><img src='https://img.shields.io/badge/code_style-XO-5ed9c7.svg'/></a>

  <span style='font-style: italic;'>Experimental, component-based JavaScript UI framework.</span>

</div>

# introduction
Fig is a simple and **experimental** user interface framework attempting to bring [pug templates](https://pugjs.org/) into the world of dynamically rendered client-side content. Not yet ready for production or anything serious, just exploring what's possible with today's javascript ecosystem. Please refer to the project's main website for a [guide](https://fig.nikerino.com/docs/guide) and [api reference](https://fig.nikerino.com/docs/api) - fig.nikerino.com :sparkles:

# builds

| Build      | Size    | Gzipped |
|------------|---------|---------|
| fig.js     | ~31kB   | ~9kg    |
| fig.min.js | ~14kB   | ~5kb    |

# updates
Any updates to the installed version of the framework should be done with care, fig is at the stage where every semver *minor* update can break your app in unexpected and weird ways. Remember to checkout the [changelog](changelog.md) before upgrading to newer versions!

# contributing
Fork & clone the repo:
```bash
$ git clone https://github.com/<username>/fig`
$ cd fig/
```

Get the dependencies, you know the drill. Note that this project installs a TON of packages [(695 at the time of writing)](http://i.imgur.com/W2P0Ul6.jpg)  if you're having troubles downloading them with npm, consider upgrading to [yarn](https://yarnpkg.com)!
```bash
$ npm install
# OR
$ yarn
```

Start the watch scripts:
```bash
$ npm run build:watch
$ npm run test:watch
```

Hack away! :rocket:

Before sending any PRs, remember to run the following lint script, thank you :heart:

```bash
$ npm run lint
```

# license
MIT

# related

- [figify](https://github.com/nikersify/fig) - fig.js browserify transform
- [fig-compiler](https://github.com/nikersify/fig-compiler) - fig.js component compiler
- [fig-web](https://github.com/nikersify/fig-web) - fig.js website
