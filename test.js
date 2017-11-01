let assert = require('assert')

let delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function pipe(...streams) {
  let i = 0;
  return streams.reduce((last, next) => {
    console.log('reduction', ++i, last, next.name);
    let res = next(last)
    return res;
  }, null)
}

function words() {
  console.log("running words");
  return ['foo', 'bar', 'baz']
}

async function* delayer(items) {
  console.log("running delayer");
  for (let item of items) {
    await delay(500 + Math.floor(Math.random() * 1000));
    console.log("delayer yielding item", item);
    yield item;
  }
}

async function* upper(iter) {
  console.log("running upper");
  for await (let chunk of iter) {
    console.log("upper got a chunk");
    yield chunk.toUpperCase();
  }
}

async function concat(iter) {
  const chunks = []
  for await (let chunk of iter) {
    console.log("concat got a chunk");
    chunks.push(chunk)
  }
  return chunks.join()
}

async function main() {
  /**
   * For awhile I had just this and was wondering why the delayer and upper
   * functions weren't being called. It's because the iterators were only
   * being created, but never kicked off. If nothing ever calls `next` on the
   * iterator, or if no for-of loop uses the iterator, then the function
   * never starts. Be sure the final function in the series returns a Promise
   */
  // await pipe(words, delayer, upper);
  return await pipe(words, delayer, upper, concat);
}

main()
  .then(res => console.log("done", res))
  .catch(err => console.warn("Uh oh", err))