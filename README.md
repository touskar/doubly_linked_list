doubly_linked_list - Iterable Circular Doubly linked list implementation
=====================================================

Iterable Circular Doubly linked list implementation.
The principle of a doubly-linked list is to keep for each element of the list a pointer to the previous element and to the next element.

<a href="http://sidsonaidson.github.io/doubly_linked_list/">CDLinkedList</a>


![alt tag](https://raw.githubusercontent.com/sidsonAidson/doubly_linked_list/master/img/img2.png)


In this implementation we create special element, which will be the root of our list (also called sentinel).
<a href="https://en.wikipedia.org/wiki/Sentinel_node">Sentinel on wikiPedia</a>

 This element will be both before the first element and after the last element. It is he who will allow us to quietly manipulate the list without risking anything.


![alt tag](https://raw.githubusercontent.com/sidsonAidson/doubly_linked_list/master/img/img1.png)

In addition we have another element called "cursor" which a virtual element placed between two cells (an element of the chain), either between the first cell and the sentinel or between the last cell and the sentinel.
Type declaration can look like this in pseudo-code

```
cellule
{
    Value value;
    cellule* next;
    cellule* previous;
};

cursor
{
    cellule* after;
    cellule* before;
};

CDLinkedList
{
    cellule* racine;//sentinel
    cellule* cursorAfter;
    cellule* cursorBefore;
    ......
    .....
};


```

![alt tag](https://raw.githubusercontent.com/sidsonAidson/doubly_linked_list/master/img/img3.png)

CDLinkedList is iterable and can be used with for..of :

``` javascript
let myList = new CDLinkedList();
...........
.............
for(let elem of myList)
{
    console.log(elem)
}
...
```

 * Tags: list, array, linked list


##Performance
Comparison between Array and CDLinkedList.
The exercise consists in creating a sequence of size "length" and then removing the first element from it until it becomes empty ('Shift Method');
See the folder '/ example /'
Here are the results:
``` javascript
............
let b = [];
for(let i = 0; i < length;i++)
{
    b.push({index:i});
}
for(let i = 0; i < length ;i++)
{
   b.shift();
}
.........

let a = new CDLinkedList();
for(let i = 0; i < length;i++)
{
    a.push({index:i});
}
for(let i = 0; i < length;i++)
{
   a.shift();
}
...........
/// Result
//{NumberElem:{res1:res, res2:res}}

{"10.000":{"benchCDLinkedList":{"s":0,"ms":7.252621},"benchJsArray":{"s":0,"ms":8.156139}}}
........
{"50.000":{"benchCDLinkedList":{"s":0,"ms":15.221335},"benchJsArray":{"s":0,"ms":23.047444}}}
........
{"60.000":{"benchCDLinkedList":{"s":0,"ms":20.891216},"benchJsArray":{"s":11,"ms":568.639012}}}
...........
{"160000":{"benchCDLinkedList":{"s":0,"ms":133.833382},"benchJsArray":{"s":76,"ms":11.752886}}}
...........
{"190.000":{"benchCDLinkedList":{"s":0,"ms":134.712147},"benchJsArray":{"s":109,"ms":837.268698}}}
........
{"1.700.000":{"benchCDLinkedList":{"s":1,"ms":62.657239},"benchJsArray":{timeOut}}}
........
{"3.000.000":{"benchCDLinkedList":{"s":2,"ms":144.959251},"benchJsArray":{timeOut}}}
........
{"4.600.000":{"benchCDLinkedList":{"s":3,"ms":12.921694},"benchJsArray":{timeOut}}}
........
{"5300000":{"benchCDLinkedList":{"s":4,"ms":207.52613},"benchJsArray":{timeOut}}}
........
{"6.700.000":{"benchCDLinkedList":{"s":5,"ms":5.378216},"benchJsArray":{timeOut}}}


```

##Installation
```
npm install fast-doubly-linked-list
```

##Usage

``` javascript

let manager = require('fast-doubly-linked-list');

let CDLinkedList = manager.CDLinkedList;
let Cursor = manager.Cursor;
let Cellule = manager.Cellule;

let a =  CDLinkedList.from('sidson aidson', (el) => {
    return el.charCodeAt(0);
});
a.log();
a.insertAtEndSpread([19,20,21,22]);
a.log();

a.moveCursorToNext();
a.moveCursorToNext();

a.insertAfterCursor(2);
a.insertAfterCursor(3);

a.log();

a.moveCursorAtIndex(3);
console.log(a.cursorBefore.value);
console.log(a.cursorAfter.value);
a.insertAfterCursor(0);
a.log();
a.setAtIndex({},0);
a.log();

console.log(a.getAtIndex(0));

```
#####Used like LIF0:
``` javascript

let Lifo = require('fast-doubly-linked-list').CDLinkedList;
let myLifo = new Lifo();

myLifo.push(1);
myLifo.push(2);
console.log(myLifo.pop());// 2
```

#####Used like FIFO

``` javascript
let Fifo = require('fast-doubly-linked-list').CDLinkedList;
let myFifo = new Fifo();

myFifo.push(1);
myFifo.push(2);
console.log(myFifo.shift());// 1
```

#####Used like Deque

``` javascript
let Deque = require('fast-doubly-linked-list').CDLinkedList;
let myDeque = new Deque();

myDeque.push(1);
myDeque.push(2);
myDeque.unshift(0);
myDeque.pop();
myDeque.log();//List <0, 1>
```


##API
Several of Array method are implemeted for CDLinkedList and take same params like their namesake Array method
###Method

```
.concat
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat">See on mdn</a>
```
.every,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every">See on mdn</a>
```
.fill,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill">See on mdn</a>
```
.filter,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">See on mdn</a>
```
.find,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find">See on mdn</a>
```
.findIndex,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findindex">See on mdn</a>
```
.forEach,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/foreach">See on mdn</a>
```
.includes,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes">See on mdn</a>
```
.indexOf,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexof">See on mdn</a>
```
.lastIndexOf,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastindexof">See on mdn</a>
```
.map,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map">See on mdn</a>
```
.pop,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop">See on mdn</a>
```
.push,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push">See on mdn</a>
```
.reduce,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce">See on mdn</a>
```
.reduceRight,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight">See on mdn</a>
```
.shift,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift">See on mdn</a>
```
.slice,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice">See on mdn</a>
```
.some,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some">See on mdn</a>
```
.sort,
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort">See on mdn</a>
```
.unshift
```
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift">See on mdn</a>

##Aditional addition:

``` javascript
.allIndexOf
.toArray
::from(iterable) // static method CDLinkedList.from([1,2,3]) return new Instance of CDLinkedList with predifined value
```

####.insertAfterCursor(value)
+ Insert value after cursor position
```
let a =  CDLinkedList.from([2,3,4]);
a.log(); // List <2, 3, 4>
a.moveCursorAtEnd();
a.insertAfterCursor(5);
a.log();// List <2, 3, 4, 5>
```

####.insertAtEnd(value)
+ equivalent of ```push``` method
```
let a =  CDLinkedList.from([2,3,4]);
a.log();//List <2, 3, 4>
a.moveCursorAtIndex(2);
a.insertAtEnd(8);// equivalent of a.push(8)
a.log();// List <2, 3, 4, 8>

```


####.insertAtEndSpread(iterableValue, [[fonctionMap],[ thisArgs]])
+ insert multiple value at end
```
let a =  CDLinkedList.from([2,3,4]);
a.log();//List <2, 3, 4>
a.moveCursorAtIndex(2);
a.insertAtEnd([8,9,10]);
a.log();// List <2, 3, 4, 8,9,10>
a.insertAtEndSpread([8,9,10], (el) => {
    return String(el);
});
a.log();// List <2, 3, 4, 8,9,10, '8','9','10'>

```

####.insertAtBegin(value)
+ insert new elem at begin of list
```
let a =  CDLinkedList.from([2,3,4]);
a.log();//List <2, 3, 4>
a.moveCursorAtIndex(2);
a.insertAtBegin(8);
a.log();// List <8,2, 3, 4>

```

####.insertAtBeginSpread(iterableValue, [[fonctionMap],[ thisArgs]])
+ insert multiple value at begin of list
```
let a =  CDLinkedList.from([2,3,4]);
a.log();//List <2, 3, 4>
a.moveCursorAtIndex(2);
a.insertAtBeginSpread('sidson aidson', (el) => {
   return el.charCodeAt(0)
});
a.log(); // List <115, 105, 100, 115, 111, 110, 32, 97, 105, 100, 115, 111, 110, 2, 3, 4>

```

####.insertAtIndex(value, index)
+ insert new elem at given index .Accept negative index
```
let a =  CDLinkedList.from([2,3,4]);
a.log();//List <2, 3, 4>
a.insertAtIndex({h:12,b:23,l:45},2);
a.log();// List <2, 3, {h:12,b:23,l:45}, 4>

```

####.insertAtIndexSpread(iterableValue, index,[[fonctionMap],[ thisArgs]])
+ insert new elem at given index .Accept negative index
```
let a =  CDLinkedList.from([2,3,4]);
a.log();//List <2, 3, 4>
a.insertAtIndexSpread({h:12,b:23,l:45},2);
a.log();// List <2, 3, 12,23,45, 4>
// not output diff between a.insertAtIndex({h:12,b:23,l:45},2);
// and a.insertAtIndexSpread({h:12,b:23,l:45},2);

```

### .removeAfterCursor()
+ remove element after cursor

### .removeAtEnd()
+ remove element at end of list(last). like `pop` method but return ```undefined```

### .removeAtBegin()
+ remove element at begin of list(first). like `shift` method but return ```undefined```

### .removeAtIndex(index)
+ remove element at index of list .

###.clear()
+ clear list

###.moveCursorAtIndex(index)
+ move cursor at given index

###.getCursor()
+ return current cursor state

###.setCursor(cursor)
+ restore cursor state

###.moveCursorAtEnd()
+ move cursor at end of list

###.moveCursorAtBegin()
+ move cursor at begin of list

###.moveCursorToNext()
+ move cursor to next elem

###.moveCursorToPrevious()
+ move cursor to previous elem

###.setAfterCursor(value)
+ set value of element after cursor
``` javascript
let a =  CDLinkedList.from([2,3,4]);
a.log();//List <2, 3, 4>
a.insertAtIndex({},2);
a.log();// List <2, 3, {}, 4>
a.moveCursorAtIndex(0);
a.setAfterCursor('Hello');
a.log()//List <'Hello', 3, 2, {}>
```

###.getAfterCursor()
+ get elem after cursor


###.getAtIndex(index)
+ get elem at index

###.getAtBegin()
+ like ```shift``` but don't remove elem

###.getAtEnd()
+ like ```pop``` but don't remove elem

###.setAtIndex(value)

###.setAtEnd(value)

###.setAtBegin(value)


###.log()
+ print list on stdout



