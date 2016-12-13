/**
 * Created by dev8 on 07/12/2016.
 */

let ExceptionManager = require("./exception.js");
let util = require('util');
let fs = require('fs');

if (!Object.values) {
    const reduce = Function.bind.call(Function.call, Array.prototype.reduce);
    const isEnumerable = Function.bind.call(Function.call, Object.prototype.propertyIsEnumerable);
    const concat = Function.bind.call(Function.call, Array.prototype.concat);
    const keys = Reflect.ownKeys;
    Object.values = function values(O) {
        return reduce(keys(O), (v, k) => concat(v, typeof k === 'string' && isEnumerable(O, k) ? [O[k]] : []), []);
    };
}

function Cellule(){
    if(!(this.constructor == Cellule))
    {
        throw new ExceptionManager.ListException('Cellule would be called with new keyword');
    }

    this.value = undefined;
    this.next = undefined;
    this.previous = undefined;


}

function Cursor(){
    if(!(this.constructor == Cursor))
    {
        throw new ExceptionManager.ListException('Cursor would be called with new keyword');
    }

    this.after = undefined;
    this.before = undefined;
}

function CDLinkedList(){
    if(!(this instanceof CDLinkedList))
    {
        throw new ExceptionManager.ListException('CDLinkedList would be called with new keyword');
    }

    this.racine = undefined;

    this.cursorAfter = undefined;
    this.cursorBefore = undefined;
    this.length = undefined;

    CDLinkedList.init(this);
}

CDLinkedList.init = function(list){
    list.racine = new Cellule();
    list.racine.next = list.racine;
    list.racine.previous = list.racine;

    list.cursorAfter = list.racine;
    list.cursorBefore = list.racine;
    list.length = 0;
};


CDLinkedList.prototype = {

};



CDLinkedList.prototype.insertAfterCursor = function(value){
    let newCell = new Cellule();
    newCell.value = value;
    newCell.next = this.cursorAfter;
    newCell.previous = this.cursorBefore;
    newCell.previous.next = newCell;
    newCell.next.previous = newCell;
    this.cursorBefore = newCell;
    this.length++;
};

CDLinkedList.prototype.insertAtEnd = function(value){
    this.insertAtIndex(value, this.length);
};

CDLinkedList.prototype.insertAtEndSpread = function(iterValue,  fonctionMap, thisArg){
    if(!CDLinkedList.isIterable(iterValue))
    {
        if(typeof iterValue === 'object')
        {
            iterValue = Object.values(iterValue);
        }
        else{
            iterValue = [iterValue];
        }
    }
    for(let i of iterValue)
    {
        if(typeof fonctionMap === 'function')
        {
            let fonctionMapBind = fonctionMap.bind(thisArg);
            this.insertAtEnd(fonctionMapBind(i));
        }
        else{

            this.insertAtEnd(i);
        }
    }
};

CDLinkedList.prototype.insertAtBegin = function(value){
    this.insertAtIndex(value, 0);
};

CDLinkedList.prototype.insertAtBeginSpread = function(iterValue,  fonctionMap, thisArg){
    if(!CDLinkedList.isIterable(iterValue))
    {
        if(typeof iterValue === 'object')
        {
            iterValue = Object.values(iterValue);
        }
        else{
            iterValue = [iterValue];
        }
    }

    let $index = 0;
    for(let i of iterValue)
    {
        if(typeof fonctionMap === 'function')
        {
            let fonctionMapBind = fonctionMap.bind(thisArg);
            this.insertAtIndex(fonctionMapBind(i), $index++);
        }
        else{
            this.insertAtIndex(i, $index++);
        }
    }

};

CDLinkedList.prototype.insertAtIndex = function(value, index){

    let toHead = this.length === 0;
    if(!(index >= 0))
    {
        index = this.length - Math.abs(index)
    }

    let cursor = this.getCursor();
    this.moveCursorAtIndex(index);
    this.insertAfterCursor(value);
    this.setCursor(cursor);

    if(toHead){
        this.moveCursorAtIndex(0);
    }
};

CDLinkedList.prototype.insertAtIndexSpread = function(iterValue, index, fonctionMap, thisArg){
    if(!CDLinkedList.isIterable(iterValue))
    {
        if(typeof iterValue === 'object')
        {
            iterValue = Object.values(iterValue);
        }
        else{
            iterValue = [iterValue];
        }
    }

    if(!(index >= 0))
    {
        index = this.length - Math.abs(index)
    }

    let $index = index;
    for(let i of [...iterValue])
    {
        if(typeof fonctionMap === 'function')
        {
            let fonctionMapBind = fonctionMap.bind(thisArg);
            this.insertAtIndex(fonctionMapBind(i), $index++);
        }
        this.insertAtIndex(i, $index++);
    }

};






CDLinkedList.prototype.removeAfterCursor = function(){

    if(this.length <= 0)
    {
        return;
    }

    this.cursorBefore = this.cursorBefore.previous;
    this.cursorBefore.next = this.cursorAfter;
    this.cursorAfter.previous = this.cursorBefore;
    this.length--;
};


CDLinkedList.prototype.removeAtEnd = function(){
    this.removeAtIndex(this.length - 1);
};

CDLinkedList.prototype.removeAtBegin = function(){
    this.removeAtIndex(0);
};

CDLinkedList.prototype.removeAtIndex = function(index){
    if(this.length <= 0)
    {
        return;
    }

    if(!(index >= 0))
    {
        index = this.length - Math.abs(index) - 1;
    }

    if(index >= this.length)
    {
        index = index - this.length
    }


    let  cursor = this.getCursor();

    this.moveCursorAtIndex(index+1);

    this.removeAfterCursor();
    this.setCursor(cursor);
};

CDLinkedList.prototype.clear = function(){
    CDLinkedList.init(this);
};

CDLinkedList.prototype.moveCursorAtIndex = function(index){
    if(!(index >= 0))
    {
        index = this.length - Math.abs(index)
    }
    this.cursorAfter = this.racine.next;
    this.cursorBefore = this.racine;
    let i = 0;
    while (i < index)
    {
        this.moveCursorToNext();
        i++;
    }
};

CDLinkedList.prototype.getCursor = function(){
    let cursor = new Cursor();
    cursor.after = this.cursorAfter;
    cursor.before = this.cursorBefore;
    return cursor;
};

CDLinkedList.prototype.setCursor = function(cursor){
    this.cursorAfter = cursor.after;
    this.cursorBefore = cursor.before;
};

CDLinkedList.prototype.moveCursorAtEnd = function(){
    this.moveCursorAtIndex(this.length);
};

CDLinkedList.prototype.moveCursorAtBegin = function(){
    this.moveCursorAtIndex(0);
};

//TODO
CDLinkedList.prototype.moveCursorToNext = function(){
    this.cursorBefore = this.cursorAfter;
    this.cursorAfter = this.cursorAfter.next;

};

CDLinkedList.prototype.moveCursorToPrevious = function(){
    this.cursorAfter = this.cursorBefore;
    this.cursorBefore = this.cursorBefore.previous;
};



CDLinkedList.prototype.setAfterCursor = function(value){
    let cellule = this.cursorAfter;
    cellule.value = value;
};



CDLinkedList.prototype.getAfterCursor = function(){
    let cellule = this.cursorBefore;
    return cellule.value;
};




CDLinkedList.prototype.getAtEnd = function(){
    return this.getAtIndex(this.length - 1 < 0 ? 0 : this.length - 1);
};

CDLinkedList.prototype.getAtBegin = function(){
    return this.getAtIndex(0);
};

CDLinkedList.prototype.setAtEnd = function(value){
    this.setAtIndex(value, this.length - 1 < 0 ? 0 : this.length - 1);
};

CDLinkedList.prototype.setAtBegin = function(value){
    this.setAtIndex(value, 0);
};

CDLinkedList.prototype.setAtIndex = function(value, index){
    if(!(index >= 0))
    {
        index = this.length - Math.abs(index)
    }

    let cursor = this.getCursor();
    this.moveCursorAtIndex(index);
    this.setAfterCursor(value);
    this.setCursor(cursor);
};

CDLinkedList.prototype.getAtIndex = function(index){
    if(!(index >= 0))
    {
        index = this.length - Math.abs(index)
    }


    let cursor = this.getCursor();
    this.moveCursorAtIndex(index + 1);

    let data = this.getAfterCursor();
    this.setCursor(cursor);

    return data;
};


CDLinkedList.prototype.log = function(sep){
    sep = sep || ', ';
    let cellule = this.racine.next;
    let out = `List <`;
    while (cellule !== this.racine)
    {
        let value = cellule.value;
        out += `${util.inspect(value)}`;
        cellule = cellule.next;
        if (cellule != this.racine)
            out += sep;
    }
    out += '>';
    console.log(out);
};

CDLinkedList.prototype[Symbol.iterator] = function*(){

    let cellule = this.racine.next;
    while (cellule !== this.racine)
    {
        yield  cellule.value;
        cellule = cellule.next;
    }
};

CDLinkedList.isIterable = function(obj){
    try{
        return typeof obj[Symbol.iterator] === 'function';
    }
    catch(e){
        return false;
    }
};


CDLinkedList.prototype.toArray = function(){
    return [...this];
};

CDLinkedList.from = function (iterValue, fonctionMap, thisArg){
    let list = new CDLinkedList();
    list.insertAtEndSpread(iterValue, fonctionMap, thisArg);
    return list;
};

CDLinkedList.prototype.concat = function(list){
    let concated = CDLinkedList.from(this);
    concated.insertAtEndSpread(list);

    return concated;
};

CDLinkedList.prototype.sort = function(fnCompare){
    const comparator = (left, rigth) => {
        if(typeof fnCompare === 'function')
        {
            return fnCompare(left, rigth) || 0;
        }

        return left - rigth;
    };

    const swap = (items, firstIndex, secondIndex) => {
        let temp = items.getAtIndex(firstIndex);//items[firstIndex];

        items.setAtIndex(items.getAtIndex(secondIndex), firstIndex)
        items.setAtIndex(temp, secondIndex);
    };

    const partition = (items, left, right) => {

        var pivot   = items.getAtIndex(Math.floor((right + left) / 2)),
            i       = left,
            j       = right;



        while (i <= j) {

            while ((comparator(items.getAtIndex(i), pivot) < 0)) {
                i++;
            }


            while (comparator(items.getAtIndex(j), pivot) > 0) {
                j--;
            }

            if (i <= j) {
                swap(items, i, j);
                i++;
                j--;
            }
        }

        return i;
    };

    const quickSort = (items, left, right) => {

        let index;

        if (items.length > 1) {

            index = partition(items, left, right);

            if (left < index - 1) {
                quickSort(items, left, index - 1);
            }

            if (index < right) {
                quickSort(items, index, right);
            }

        }

        return items;
    };

    let newCDLinkedList = CDLinkedList.from(this);
    return quickSort(newCDLinkedList, 0, newCDLinkedList.length - 1);

};

CDLinkedList.prototype.every = function(fn, thisArg){
    for(let cnt = 0; cnt < this.length; cnt++)
    {
        if(typeof fn == 'function')
        {
            let fnBind = fn.bind(thisArg);
            let predicate = fnBind(this.getAtIndex(cnt), cnt, this);

            if(!predicate)
            {
                return false;
            }
        }
    }

    return true;
};

CDLinkedList.prototype.some = function(fn, thisArg){
    for(let cnt = 0; cnt < this.length; cnt++)
    {
        if(typeof fn == 'function')
        {
            let fnBind = fn.bind(thisArg);
            let predicate = fnBind(this.getAtIndex(cnt), cnt, this);

            if(predicate)
            {
                return true;
            }
        }
    }

    return false;
};

CDLinkedList.prototype.findIndex = function(fn, thisArg){
    for(let cnt = 0; cnt < this.length; cnt++)
    {
        if(typeof fn == 'function')
        {
            let fnBind = fn.bind(thisArg);
            let predicate = fnBind(this.getAtIndex(cnt), cnt, this);

            if(predicate)
            {
                return cnt;
            }
        }
    }

    return -1;
};

CDLinkedList.prototype.map = function(fn, thisArg){
    let cdList = CDLinkedList.from(this);
    for(let cnt = 0; cnt < cdList.length; cnt++)
    {
        if(typeof fn == 'function')
        {
            let fnBind = fn.bind(thisArg);
            let mapped = fnBind(this.getAtIndex(cnt), cnt, this);
            cdList.setAtIndex(mapped, cnt);
        }
    }

    return cdList;
};

CDLinkedList.prototype.forEach = function(fn, thisArg){
    for(let cnt = 0; cnt < this.length; cnt++)
    {
        if(typeof fn == 'function')
        {
            let fnBind = fn.bind(thisArg);
            let mapped = fnBind(this.getAtIndex(cnt), cnt, this);
            this.setAtIndex(mapped, cnt);
        }
    }
};

CDLinkedList.prototype.filter = function(fn, thisArg){
    let cdList = new CDLinkedList();
    for(let cnt = 0; cnt < this.length; cnt++)
    {
        if(typeof fn == 'function')
        {
            let fnBind = fn.bind(thisArg);
            let predicate = fnBind(this.getAtIndex(cnt), cnt, this);

            if(predicate)
            {
                cdList.insertAfterCursor(this.getAtIndex(cnt));
            }
        }
    }

    return cdList;
};

CDLinkedList.prototype.includes = function(value, start){
    start = start || 0;
    for(let cnt = start; cnt < this.length; cnt++)
    {
        let $value = this.getAtIndex(cnt);

        if($value === value)
        {
            return true;
        }
    }

    return false;
};

CDLinkedList.prototype.indexOf = function(value, start){
    start = start || 0;
    for(let cnt = start; cnt < this.length; cnt++)
    {
        let $value = this.getAtIndex(cnt);

        if($value === value)
        {
            return cnt;
        }
    }

    return -1;
};

CDLinkedList.prototype.allIndexOf = function (value, start){

    let idx = this.indexOf(value, start);
    let indices = [];

    while (idx != -1) {
        indices.push(idx);
        idx = this.indexOf(value, idx + 1);
    }

    return indices;
};

CDLinkedList.prototype.lastIndexOf = function(value, start){
    let indices = this.allIndexOf(value, start);
    if(indices.length === 0)
    {
        return -1;
    }

    return indices[indices.length - 1];

};

CDLinkedList.prototype.fill = function(value, start, end){
    start = start || 0;
    end = end || this.length;

    for(let cnt = start; cnt < end; cnt++)
    {
        this.setAtIndex(value,cnt);
    }
};

CDLinkedList.prototype.pop = function(){
    let value = this.getAtEnd();
    this.removeAtEnd();
    return value;

};

CDLinkedList.prototype.slice = function(start, end){
    start = start || 0;
    if(start < 0){
        start = this.length - Math.abs(start);
    }
    end = end || this.length;

    let slicedList = new CDLinkedList();

    for(let cnt = start; cnt < end; cnt++){
        slicedList.push(this.getAtIndex(cnt));
    }

    return slicedList;
};

CDLinkedList.prototype.shift = function(){
    let value = this.getAtBegin();
    this.removeAtBegin();
    return value;
};

CDLinkedList.prototype.unshift = function(){
    let values = Array.from(arguments);
    this.insertAtBeginSpread(values);
    return this.length;
};

CDLinkedList.prototype.push = function(value){
    this.insertAtEnd(value);
};

CDLinkedList.prototype.reduce = function(fn, initialValue){
    let accumulator = initialValue;
    for(let cnt = 0; cnt < this.length; cnt++)
    {
        if(typeof fn == 'function')
        {
            let value = this.getAtIndex(cnt);
            if(value === undefined)
            {
                continue;
            }
            accumulator = fn(accumulator, value, cnt, this);
        }
    }

    return accumulator;
};

CDLinkedList.prototype.reduceRight = function(fn, initialValue){
    let accumulator = initialValue;
    for(let cnt = this.length - 1; cnt >= 0; cnt--)
    {
        if(typeof fn == 'function')
        {
            let value = this.getAtIndex(cnt);
            if(value === undefined)
            {
                continue;
            }
            accumulator = fn(accumulator, value, cnt, this);
        }
    }

    return accumulator;
};

module.exports = {
    CDLinkedList:CDLinkedList,
    Cellule:Cellule,
    Cursor:Cursor
};
