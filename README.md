
## Installation

```sh
git clone https://github.com/lourd/node-async-iterator-playground
cd node-async-iterator-playground
node --harmony_async_iteration test.js
```

### Debugging

1. `node --inspect-brk --harmony_async_iteration test.js`
2. Open Chrome, go to `chrome://inspect`
3. `test.js` should be listed under the "Remote Target" section. Click on the **inspect** link

If you're a VSCode user, you can also open the project and run the debugger from within `test.js` to step through the code in your editor.

## Prior Art
* [The Inspiration](https://twitter.com/stephenbelanger/status/925558288439218176)
* [The Proposal](https://github.com/tc39/proposal-async-iteration)
* [Further Reading](https://jakearchibald.com/2017/async-iterators-and-generators/)