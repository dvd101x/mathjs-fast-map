# mathjs-fast-map

This is a workbench intended to help speed up some mathjs functions. With a fast benchmark showing granular results in a box plot.

The result is a static website found here

https://dvd101x.github.io/mathjs-fast-map/

# Tests

This has some HTML tests that uses observable plot to check for speed. They run best in chrome due to the sub muilisecond resolution of `performance.now()`.

## Insights

-  Importance of running the recurse function with the right number of arguments.
-  If the callback includes the index (second argument) it takes significantly longer.
-  When the callback includes index, the new method is faster with `index.push` instead of `index.concat`. It mutates the index similar to what happesn with `for(let i...` and it's never `for(const i`
-  `.forEach` is faster than `.map` if used with `.forEach` recursion.
-  It is possible to clone the index only for the callback function (thus maintaining some of the benefits)
  -  Cloning an index behaves very differently between `[...index]`, `index.slice()` and `index.concat()`.
   - In Chrome `index.concat()` is fastest followed by `[...index]` being about 10% slower.
   - In Safari `index.slice()` is fastest followed by `[...index]` being about 45% slower.
   - Will work with `[...index]` as it seems like a good compromise.

## Didn't work

- For typed functions, I thought it might be faster to keep track of the latest implementation that worked and try that first before trying the full typed function. In Firefox is faster and in Chrome is slower within a margin of error.

# TODO

- [ ] Plan the PR phase
- [ ] Merge devlop into the branch

# Done

- [x] Add a clone index alternative and tests.
- [x] Switch logic to itereate on all tests each trials
- [x] Make a boolean stating if it should be fast (for testing)
- [x] Fix issue with index (was missing index pop)
- [x] Test 1 arg vs (abs)
- [x] Test 2 arg
- [x] Test forEach  
- [x] Test forEach 2 arg
- [x] Compare the effect in callback with 1, 2 or 3 arguments.
  - [x] Found significant improvements by mutating index and having separate recurse functions.
- [x] Make the typed implementation shortcut and compare.
  - [x] If it's not that significatn forget about it. 
  - [x] The significance depends on browser within the margin of error.
- [x] Now test the implications of typed functions
  - [x] Make a shortcut (No significant improvements, in chrome, slight improvement in ffox)
  - [x] If the number of arguments has only one signature, then get only it's implementation.
  - [x] Probably it would be best to do it within the same function that checks for number of arguments. 
