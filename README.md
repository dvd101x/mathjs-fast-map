# mathjs-fast-map

This is a workbench intended to help speed up some mathjs functions. With a fast benchmark showing granular results in a box plot.

# Tests

This has some HTML tests that uses observable plot to check for speed. They run best in chrome due to the sub muilisecond resolution of `performance.now()`.

Some insights:
-  Importance of running the recurse function with the right number of arguments.
-  Getting an index takes much more time.
-  When the callback includes an index, the new method is faster with index.push instead of index concat. It mutates the index similar to what happesn with `for(let i...` and it's never `for(const i`
-  For is faster than map if used with for recursion.

Some things I thought might work but didn't:
- How different the callback shortcut try if an implementation can be found and then do run the implementation. In Firefox is faster and in chromium is slower within a margin of error.

# TODO

- [ ] Plan the PR phase
- [ ] Merge devlop into the branch
- [ ] Work on it

# Done

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