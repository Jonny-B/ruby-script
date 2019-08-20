// import * as helpers from './helpers'

const Collection = (array) => {
    return new Collect(array);
};

class Collect extends Array {
    constructor(array) {
        // call the constructor of the Array class
        super(array.length);

        // copy the values from `array` onto `this`;
        Object.assign(this, array);
    }

    isCollection() {
        return true;
    }

    clear() {
        console.log('clear method called');
        this.length = 0;
    }

    collect(callback) {
        let collectedArray = this.slice();
        if (callback === undefined || callback === null) {
            return collectedArray;
        }
        for (let i = 0; i < collectedArray.length; i++) {
            collectedArray.splice(i, 1, callback(collectedArray[i]))
        }

        return collectedArray
    }

    combination(int) {
        let allArray = new Collect([]);

        let combos = (array, iterations, pushBack, startIndex = 0, exitIndex = iterations) => {
            // pushBack stack
            if (pushBack.length === iterations)
                allArray.push(pushBack.slice(0, iterations));

            if (exitIndex < 0) return;
            for (let i = startIndex; i < array.length; i++) {
                pushBack.push(array[i]);
                combos(array, iterations, pushBack, i + 1, exitIndex - 1);
                pushBack.pop();
            }
        };

        let pushBack = new Collect([]);
        combos(this, int, pushBack);
        return allArray
    }

    compact() {
        let compactArray = new Collect([]);
        for (let i = 0; i < this.length; i++) {
            if (this[i] !== null && this[i] !== undefined) {
                compactArray.push(this[i])
            }
        }
        return compactArray
    }

    concat(array1, array2 = null) {
        for (let i = 0; i < array1.length; i++) {
            this.push(array1[i])
        }
        if (array2 !== null) {
            for (let i = 0; i < array2.length; i++) {
                this.push(array2[i])
            }
        }
    }

    count(element = null) {
        if (element === null) {
            let count = 0;
            for (let i = 0; i < this.length; i++) {
                count++;
            }
            return count
        } else if (Array.isArray(element)) {
            let count = 0;
            for (let i = 0; i < this.length; i++) {
                if (Array.isArray(this[i]) && this[i].length === element.length) {
                    let match;
                    for (let j = 0; j < this[i].length; j++) {
                        this[i][j] === element[j] ? match = true : match = false;
                        if (match === false) break;
                    }
                    if (match === true) count++;
                }
            }
            return count;
        } else if (typeof element === 'function') {
            let count = 0;
            for (let i = 0; i < this.length; i++) {
                if (element(this[i])) count++
            }
            return count;
        } else {
            let count = 0;
            for (let i = 0; i < this.length; i++) {
                if (this[i] === element) count++;
            }
            return count;
        }
    }

    cycle(int, callback = null) {
        if (int < 0 || this.length === 0) return null;
        let result = new Collect([]);
        for (let i = 0; i < int; i++) {
            for (let j = 0; j < this.length; j++) {
                if (callback === null) {
                    result.push(this[j])
                } else {
                    result.push(callback(this[j]))
                }
            }
        }
        return result;
    }

    delete(value, callback = null) {
        let result;
        for (let i = 0; i < this.length; i++) {
            if (this[i] === value) {
                result = this[i];
                this.splice(i, 1)
            }
        }

        if (result === undefined) {
            return callback === null ? null : callback();
        } else {
            return result;
        }
    }

    delete_at(index) {
        if (index > this.length) return null;
        let del_value;
        for (let i = 0; i < this.length; i++) {
            if (i === index) {
                del_value = this.splice(i, 1)[0];
            }
        }

        return del_value
    }

    delete_if(callback) {
        for (let i = 0; i < this.length; i++) {
            let result = callback(this[i]);
            if (result === true) this.splice(i, 1)
        }
        return this;
    }


    dig(...indices) {
        // returning null if any intermediate step is null
        if (this[indices] === null) return null;

        // when we get to the end of indices we are done digging.
        if (indices.length === 1) return this[indices];

        // remove current index from indices
        let digValue = typeof (this) === "object" ? this[indices[0]] : this;
        let indexes = indices.splice(indices[0]);

        try {
            // create a new collection that has been dug out of 'this'
            let collection = new Collect(digValue);

            return collection.dig(...indexes);
        } catch (err) {
            // Will get type error if we try to instantiate a Collection with a non array value.
            throw 'While digging an object was found from which dig could not be called'

        }
    }

    drop(value) {
        if (typeof (value) !== 'number' || value < 0) throw 'Argument Error';

        let copy = this;
        for (let i = 0; i < value; i++) {
            copy.shift();
        }
        return copy;
    }

    drop_while(callback) {
        let copy = this;

        for (let i = 0; i < copy.length; i++) {
            let result = callback(i);
            if (result === null || result === false) break;
            copy.shift();
        }
        return copy;
    }

    each(callback = null) {
        if (callback === null) return this;
        for (let i = 0; i < this.length; i++) {
            callback(this[i])
        }
        return this;
    }

    each_index(callback = null) {
        if (callback === null) return this;
        for (let i = 0; i < this.length; i++) {
            callback(i)
        }
        return this;
    }

    each_with_index(callback = null) {
        if (callback === null) return this;

        for (let i = 0; i < this.length; i++) {
            callback(this[i], i)
        }
        return this;
    }

    // include(value){
    //     for(let i = 0; i < this.length; i++){
    //         if(this[i] === value) return true;
    //     }
    // }

    empty() {
        return this.length === 0;
    }

    eql(value) {
        let result = true;
        if (this === value) result = false;
        if (this.length !== value.length) result = false;
        for (let i = 0; i < this.length; i++) {
            if (this[i] !== value[i]) result = false
        }
        return result;
    }

    fetch(index, opt = null) {
        let i = index;
        //Handling negative integers
        if (i < 0) {
            i = this.length + index;
        }

        if (i >= this.length) {
            if (opt === null) {
                throw `${i} is out of bounds`;
            } else if (typeof (opt) === 'function') {
                opt(i);
            } else {
                return opt;
            }
        }
        return this[i]
    }

    fill(value, start = 0, finish = this.length) {
        // handle when .fill(range, callback) syntax is used
        if (typeof (value) === 'number' && typeof (start) === 'function') {
            let s = start;
            let v = value;
            value = s;
            start = v;
        }

        if (typeof (start) !== 'number' && typeof (start) !== 'function') {
            // when a range is passed in
            finish = start[1];
            start = start[0];
        } else {
            start = start < 0 ? this.length + start : start;
        }

        if (finish < 0) return;

        for (let i = 0; i < this.length; i++) {
            if (i >= start && i <= finish) {
                if (typeof (value) !== 'function') {
                    this[i] = value;
                } else {
                    this[i] = value(i);
                }
            }
        }
        return value;
    }

    find_index(value) {
        if (value === undefined) return this;
        for (let i = 0; i < this.length; i++) {
            if (typeof value === 'function') {
                if (value(this[i])) return i;
            } else {
                if (this[i] === value) return i;
            }
        }

        return null
    }

    first(value = null) {
        if (value === null) {
            return this[0];
        } else {
            let result = new Collect([]);
            for (let i = 0; i < value; i++) {
                result.push(this[i])
            }
            return result.compact();
        }
    }

    flatten(stop = -1, result = new Collect([]), count = 0) {
        for (let i = 0; i < this.length; i++) {
            if (Array.isArray(this[i])) {
                let recurse = new Collect(this[i]);
                if (count === stop) {
                    result.push(this[i]);
                    break
                }
                recurse.flatten(stop, result, count + 1)
            } else (
                result.push(this[i])
            );
        }
        return result
    }

    flatten_(stop = -1, result = new Collect([]), count = 0, original = this) {
        let flatten = Collection(this);
        this.length = 0;
        let flattened = false;
        for (let i = 0; i < flatten.length; i++) {
            if (Array.isArray(flatten[i])) {
                flattened = true;
                let recurse = new Collect(flatten[i]);
                if (count === stop) {
                    result.push(flatten[i]);
                    original.push(flatten[i]);
                    break
                }
                recurse.flatten_(stop, result, count + 1, original)
            } else {
                result.push(flatten[i]);
                original.push(flatten[i]);
            }
        }

        return flattened ? result : null;
    }

    include(value) {
        for (let i = 0; i < this.length; i++) {
            if (Array.isArray(value)) {
                let collection = new Collect(value);
                if (collection.eql(this[i])) return true;
            }
            if (value === this[i]) return true;
        }

        return false
    }

    index(value) {
        if (value === undefined) return this;
        for (let i = 0; i < this.length; i++) {
            if (typeof value === 'function') {
                if (value(this[i])) return i
            } else {
                if (value === this[i]) return i
            }
        }
        return null;
    }

    initialize_copy(copy) {
        this.clear();
        for (let i = 0; i < copy.length; i++) {
            this.push(copy[i])
        }
        return this;
    }

    insert(index, ...values) {
        let ind;
        index < 0 ? ind = this.length + index : ind = index;
        let insert = Collection(this);
        this.length = 0;
        for (let i = 0; i < insert.length; i++) {
            if (i === ind && index < 1) {
                this.push(insert[i]);
                this.push(values);
            } else if (i === ind) {
                this.push(values);
                this.push(insert[i]);
            } else {
                this.push(insert[i])
            }
        }

        this.flatten_()
    }

    inspect() {
        let insp = ``;

        const processValue = (value) => {
            if (typeof value === 'string') {
                return `\"${value}\"`
            } else if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    return Collection(value).inspect();
                } else {
                    let result = '';
                    for (let i = 0; i < Object.keys(value).length; i++) {
                        if (Object.keys(value).length === 1) {
                            result += `{${Object.keys(value)[i]}: ${processValue(value[Object.keys(value)[i]])}}`
                        } else if (i === 0) {
                            result += `{${Object.keys(value)[i]}: ${processValue(value[Object.keys(value)[i]])}, `
                        } else if (i === Object.keys(value).length - 1) {
                            result += `${Object.keys(value)[i]}: ${processValue(value[Object.keys(value)[i]])}}`
                        } else {
                            result += `${Object.keys(value)[i]}: ${processValue(value[Object.keys(value)[i]])}, `
                        }
                    }
                    return result;
                }
            } else {
                return value
            }
        };

        for (let i = 0; i < this.length; i++) {
            if (this.length === 1) {
                insp += `[${processValue(this[i])}]`
            } else if (i === 0) {
                insp += `[${processValue(this[i])}, `
            } else if (i === this.length - 1) {
                insp += `${processValue(this[i])}]`
            } else {
                insp += `${processValue(this[i])}, `
            }
        }

        return insp;
    }

    join(separator = "") {
        let join = "";
        this.flatten_();

        const processValue = (value) => {
             if (typeof value === 'object') {
                if (Array.isArray(value)) {
                    return Collection(value).inspect();
                } else {
                    let result = '';
                    for (let i = 0; i < Object.keys(value).length; i++) {
                        if (Object.keys(value).length === 1) {
                            result += `{${Object.keys(value)[i]}: ${processValue(value[Object.keys(value)[i]])}}`
                        } else if (i === 0) {
                            result += `{${Object.keys(value)[i]}: ${processValue(value[Object.keys(value)[i]])}, `
                        } else if (i === Object.keys(value).length - 1) {
                            result += `${Object.keys(value)[i]}: ${processValue(value[Object.keys(value)[i]])}}`
                        } else {
                            result += `${Object.keys(value)[i]}: ${processValue(value[Object.keys(value)[i]])}, `
                        }
                    }
                    return result;
                }
            } else {
                return value
            }
        };

        for (let i = 0; i < this.length; i++) {
            if (this.length === 0) {
                join = "";
            } else if (this.length === 1) {
                join += `${processValue(this[i])}`
            } else if (i === this.length - 1) {
                join += `${processValue(this[i])}`
            } else {
                join += `${processValue(this[i])}${separator}`
            }
        }
        return join;
    }
}

module.exports = Collection;
