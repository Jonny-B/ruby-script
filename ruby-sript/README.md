# ruby-script
Tired of context switching?

Creating a class called Collection that adds all of Ruby's Array methods to Javascript.

## GitHub Repo
Feel free to contribute or log issues!

https://github.com/Jonny-B/ruby-script

## Usage

```
npm install ruby-script
```
```js
let Collection = require('ruby-script');

let collection = Collection([1,2,3,4]);

collection.collect((n) => {return n+1})
//=> [2,3,4,5]
```

# API

### Collection

### isCollection
 Returns _true_ for _collections_.
 
```js
let collection = Collection([1,2,3,4]);

collection.isCollection();
//=> true
```

### clear
 Removes all elements of _this_.
 
```js
let collection = Collection([1,2,3,4]);

collection.clear();
//=> []
```

### collect
Invokes the given function once for each element of collection.

Creates a new collection with the result returned by the function.

Returns the collection unaltered if no block is given.

```js
let collection = Collection([1,2,3,4]);

collection.collect((n) => {return n+1})
//=> [2,3,4,5]
```
### combination
 
When invoked, yields all combinations of length _n_ of elements from the array and returns the combinations
as a collection of collections.
 
```js
let collection = Collection([1,2,3,4]);

collection.combination(1);
//=> [[1],[2],[3],[4]]
collection.combination(2);
//=> [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
collection.combination(3);
//=> [[1,2,3], [1,2,4], [1,3,4], [2,3,4]]
collection.combination(4);
//=> [[1,2,3,4]]
collection.combination(0);
//=> [[]]
collection.combination(5);
//=> []
```

### compact
Returns a copy of _this_ with all instances of _undefined_ and _null_ removed.

```js
let collection = Collection([1,undefined,2,null,3,4]);

collection.compact()
//=> [1,2,3,4]
```

### concat
Overrides Arrays concat on the Collection class.

Appends the elements of array/collection to self.

Optional second argument allows second array to be appended.
```js
let collection = Collection([1,2,3]);

collection.concat(4);
//=> [1,2,3,4]

let collection2 = Collection([4]);
collection.concat(collection2);
//=> [1,2,3,4]

collection2 = Collection([5]);
collection.concat(4, collection2)
//=> [1,2,3,4,5]
```

### count
Return the number of elements in collection.

If an argument is given, counts the number of elements which equal argument using _===_.

If a block is given, counts the number of elements for which the block returns true.

```js
let collection = Collection(['1','1',2,[3,4]]);

collection.count(4);
//=> 4

collection.count('1');
//=> 2

collection.count(1);
//=> 0

collection.count(2);
//=> 1

collection.count([3,4]);
//=> 1

collection.count([3,4,5]);
//=> 0
```

### cycle
Returns an extended Collection with values duplicated _n_ times.

Calls the given block for each element _n_ times or forever if _null_ is given and returns result of block as new
Collection.

Returns _null_ if a non-positive integer or the Collection is empty.

```js
collection = Collection([1,2,3]);

collection.cycle(2);
//=> [1,2,3,1,2,3]

collection.cycle(2, (n) => {return n*2});
//=> [2,4,6,2,4,6]

collection.cycle(-2, (n) => {return n*2});
//=> null

collection2 = Collection([]);
collection2.cycle(2, (n) => {return n*2});
//=> null
```

### delete
Deletes all items from _this_ that are equal to argument.

Returns the last deleted item, or _null_ if no matching item is found.

If the optional code block is given, the result of the block is return if the item is not found. (To remove nil or 
undefined elements use _.compact_).

Returns _null_ if no block is provided and item is not found.

```js
collection = Collection([1,2,3,4,2]);

collection.delete(2);
//=> 2
//=> collection -> [1,3,4]

collection.delete(1);
//=> 1
//=> collection -> [2,3,4,2]

collection.delete(5, () => {return 'not found'});
//=> 'not found'
//=> collection -> [1,2,3,4,2]

collection.delete(5, () => {return 'not found'});
//=> null
```

### delete_at
Deletes the element at the specified index, returning that element, or null if the index is out of range.

See also .slice

```js
collection = Collection([1,2,3,4,5]);

collection.delete_at(2);
//=> 3
//=> collection -> [1,2,4,5]

collection.delete_at(10);
//=> null
```

### delete_if
Deletes every element of this for which block evaluates to true.

The array is changed instantly every time the block is called, not after the iteration is over.

Returns the collection unaltered if no block is given.

```js
collection = Collection([1,2,3,4,5]);

collection.delete_if((x) => {return x%2 === 0});
//=> collection -> [1,3,5]

collection.delete_if();
//=> [1,2,3,4,5]
```

### dig
Extracts the nested value specified by the sequence of ids by calling dig at each step, returning _undefined_ if any intermediate step is _undefined_.

```js
collection = Collection([[1, [2, 3]]]);

collection.dig(0,1,1);
//=> 3

collection.dig(1,2,3);
//=> undefined

collection.dig(0,0);
//=> error
```

### drop
Drops first n elements from Collection and returns the rest of the elements in an array.

If a negative number is given, raise an ArgumentError

See also .take
```js
collection = Collection([1, 2, 3, 4, 5]);

collection.drop(3);
//=> [4 ,5]

collection.drop(-1);
//=> Argument Error

collection.drop('1');
//=> Argument Error
```

### drop_while
Drops elements up to, but not including, the first element for which the block return _null_ or _false_ and returns an 
_collection_ containing the remaining elements
```js
collection = Collection([1, 2, 3, 4, 5]);

collection.drop_while((i) => {return i < 3});
//=> [3, 4, 5]

collection2 = Collection([3,4,5]);
collection2.drop_while((i) => {return collection[i] > i});
//=> [5]
```

### each
Calls the given function once for each element in _this_, passing that element as a parameter. Returns the _Collection_
itself.

If no block is given, returns the _Collection_ itself.
```js
collection = Collection([1, 2, 3]);

collection.each((x) => {`${console.log(x)} --`})
//=> produces -> 1 -- 2 -- 3 --
```

### each_index
Same as _.each_, but passes the _index_ of the element instead of the element itself.

If no block is given, returns _this_.
```js
collection = Collection([1, 2, 3]);

collection.each((x) => {`${console.log(x)} --`})
//=> produces -> 0 -- 1 -- 2 --
```

### each_with_index
Calls _callback_ with _two_ arguments, the element and its index, for each item in _Collection_.
Given arguments are passed through to _.each_.

If no callback is given, returns _this_

```js
collection = Collection(['a', 'b', 'c']);

collection.each_with_index((x, i) => {`${console.log(x)} ${i} --`})
//=> produces -> a 0 -- b 1 -- c 2
```

### empty
Returns true if _this_ contains no elements.

```js
collection = Collection(['a', 'b', 'c']);
collection.empty();
//=> false

emptyCollection = Collection([]);
emptyCollection.empty();
//=> true
```

### eql
Returns true if _this_ and _other_ are are both collections, or _other_ is an array, with the same content.

```js
collection = Collection([1,2,3]);

collection.equal(Collection([1,2,3]));
//=> true

collection.equal([1,2,3]);
//=> true

collection.equal([1,2]);
//=> false
```

### fetch
Tries to return the element at position _index_, but throws an exception if the referenced index lies outside of the array
bounds. This error can be prevented by supplying a second argument, which will act as a default value.

Alternatively, if a _callback_ is given it will only be executed when an invalid index is referenced.

Negative values of _index_ count from the end of the array.

```js
collection = Collection([1,2,3,4]);

collection.fetch(1);
//=> 2

collection.fetch(-1);
//=> 4

collection.fetch(4, 'cat');
//=> cat

collection.fetch(100, (i) => {`${i} is out of bounds`});
//=> produces -> "100 is out of bounds"

```

### fill
The first three forms set the selected elements of _this_ (which may be the entire _collection_) to the provided value.

A start of _null_ is equivalent to zero.

A length of _null_ is equivalent to the length of the array.

The last three forms fill the _collection_ with the value of the given block, which is passed the absolute index of each element to be filled.

Negative values of _start_ count from the end of the _collection_, where _-1_ is the last element.

```js
collection = Collection([1,2,3,4]);

collection.fill('x');
//=> ['x', 'x', 'x', 'x']

collection.fill('x', 2); 
//=> [1,2,'x','x']

collection.fill('x', -3); 
//=> [1,'x','x','x']

collection.fill('x', 1, 2);
//=> [1,'x','x',4]

collection.fill('x', [0,2]);
//=> ['x', 'x', x, 4]

collection.fill((i) => {return i*i});
//=> [0, 1, 4, 9]

collection.fill(-2, (i) => {return `x${i}`});
//=> [1, 2, 'x2', 'x3']
```

### find_index
Returns the _index_ of the first object in _collection_ such that the element is === to the _value_ provided.

If a block is given instead of a value, returns the _index_ of the first element for which the block returns _true_.
Returns _null_ if no match is found.

See also .rindex.

_This_ is returned if neither a block nor a value is given.

```js
collection = Collection([1,2,3,4]);

collection.find_index(2);
//=> 1

collection.find_index(5);
//=> null

collection.find_index((e) => {return e === 3});
//=> 2

```

### first
Returns the first element, or the first n elements, of the _collection_. If the collection is empty, the first form returns
_undefined_ and the second form returns an empty _collection_. See also .last for the opposite effect.

```js
collection = Collection([1,2,3,4]);

collection.first();
//=> 1

collection.first(2);
//=> [1,2]

collection2 = Collection([]);

collection2.first();
//=> undefined

collection2.first(2);
//=> []
```

### flatten
Returns a new _collection_ that is a one-dimensional flattening of _this_ (recursively).

That is, for every element that is an array, extract its elements into the new array.

The optional level argument determines the level of recursion to flatten

```js
collection = Collection([1, [2, 3, 4], [5,[6]]]);

collection.flatten();
//=> [1,2,3,4,5,6]

collection.flatten(1);
//=> [1,2,3,4,5,[6]]
```

### flatten_
Flattens _this_ in place.

Returns _null_ if no modifications were made (i.e, the _collection_ contains no sub-collections or sub-arrays)

The optional level argument determines the level of recursion to flatten
```js
collection = Collection([1, [2, 3, 4], [5,[6]]]);
collection = Collection2([1, 2, 3, 4]);

collection.flatten_();
//=> [1,2,3,4,5,6]

collection.flatten_(1);
//=> [1,2,3,4,5,[6]]

collection2.flatten_()
//=> null
```

### include
Returns _true_ if the given _value_ is present in _this_ (that is, if any element _===_ value)
otherwise return _false_.

```js
collection = Collection([1,2,3,4,[5]]);

collection.include(4);
//=> true

collection.include(5);
//=> false

collection.include([5])
//=> true
```

### index
Returns the _index_ of the first element in _collection_ such that the element is _===_ to the supplied value.

If a _function_ is given instead of an argument, returns the _index_ of the first object for which the block returns _true_.
Returns _null_ if no match is found.

See also .rindex

_this_ is returned if neither a block nor argument is given.

```js
collection = Collection([1,2,3,4]);

collection.index(4);
//=> 3

collection.index(5);
//=> null

collection.index((element) => { return element * 2 === 4})
//=> 1
```

### initialize_copy
Replaces the contents of _this_ with the contents of other _array_ or _collection_, truncating or expanding if necessary.

See also .replace
```js
collection = Collection([1,2,3,4]);

collection.initialize_copy(['a','b','c'])
//=> ['a','b','c']
```

### insert
Inserts the given value(s) before the element with the given index.

Negative indices count backwards from the end of the _collection_, where _-1_ is the last element. If a negative index
is used, the given values will be inserted after that element, so using an index of _-1_ will insert the values at the
_collection_.

```js
collection = Collection([1,2,4,5]);

collection.insert(2,3);
//=> [1,2,3,4,5]

collection.insert(-1,6);
//=> [1,2,4,5,6]

collection.insert(-1,6,7,8)
//=> [1,2,4,5,6,7,8]
```

### inspect
Creates a string representation of _this_.

See also .to_s

```js
collection = Collection([1,2,3,4]);
collection2 = Collection(['a', 'b', 'c']);
collection3 = Collection([{test: 1}]);

collection.inspect();
//=> "[1,2,3,4]"

collection2.inspect();
//=> "[\"a\", \"b\", \"c\"]"

collection3.inspect();
//=> "[{test: 1}]"
```

### join
Returns a string created by converting each element of the array to a string, separated by the given separator. 
If the separator is _null_ it uses an empty string.

```js
collection = Collection([1,2,3,4]);

collection.join();
//=> "1234"

collection.join("-");
//=> "1-2-3-4"
```

### keep_if
Deletes every element of _this_ for which the given block evaluates for _false_

See also _.select_

```js
collection = Collection([1,2,3,4]);

collection.keep_if((x) => {return x === 2});
//=> [2]
```

### last
Returns the last element(s) of self. If the array is empty, the first form returns _null_.

See also _.first_ for the opposite effect.

```js
collection = Collection([1,2,3,4]);

collection.last();
//=> 4

collection.last(2);
//=> [3,4]
```

### length
Returns the number of element in _this_. May be zero.

```js
collection = Collection1([1,2,3,4]);
collection = Collection2([]);

collection1.length();
//=> 4

collection.length();
//=> 0
```
