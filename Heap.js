
class IntHeap {
    /**
     * TODO: Should be implemented with inheritance (open/close principal)
     * TODO: Cause of the async nature should this Heap get locked as soon as an operation is on-going
     *
     * Integer Heap
     * 
     * @param {string} type
     * 
     * @constructor
     */
    constructor(type) {
        this.items = [];
        this.type = type || 'min';
    }

    /**
     * Checks if the current heap is empty and throws an error if this is the case
     *
     * @method isEmpty
     * 
     * @returns {void}
     */
    isEmpty() {
        if (this.items.length === 0) {
            throw new Error('EMPTY HEAP!');
        }
    }

    /**
     * Removes items by value
     *
     * @method removeByValue
     *
     * @param {number} item
     * 
     * @returns {boolean}
     */
    async removeByValue(item) {
        let indexToRemove;
        let parent;
        const itemsToRemove = await this.findIndicies(item).length;

        for (let i = 0; i < itemsToRemove; i++) {
            indexToRemove = await this.findIndex(item);

            if (indexToRemove === (this.items.length - 1)) {
                this.items.pop();
                return true;
            } 

            this.items[indexToRemove] = this.items.pop();
            parent = this.parent(indexToRemove);

            if (
                this.hasLeftChild(indexToRemove)
                && (
                    !parent ||
                    this.comparePair(parent, this.items[indexToRemove])
                )
            ) {
                this.heapifyDown(indexToRemove);
                
                return true;
            }

            this.heapifyUp(indexToRemove);
        }

        return true;
    }

    /**
     * Returns all indicies where the value is equal the passed item (int)
     *
     * @method findIndicies
     *
     * @param {number} item
     *
     * @returns {Array<number>}
     */
    async findIndicies(item) {
        let result = [];

        this.items.forEach(function(value, index) {
            if (value === item) {
                result.push(index);
            }
        });

        return result;
    }

    /**
     * Returns all items with their indexes where the value is equal the passed item (int)
     *
     * @method find
     *
     * @param {number} item
     *
     * @returns {Array<Object<index, value>}
     */
    async find(item) {
        let result = [];

        this.items.forEach(function(value, index) {
            if (value === item) {
                result.push({
                    index: index,
                    value: value
                });
            }
        });

        return result;
    }

    /**
     * Returns the first matching index
     *
     * @method findIndex
     *
     * @param {number} item
     *
     * @returns {Array<number>}
     */
    async findIndex(item) {
        return this.items.findIndex(function(value) {
            return item === value;
        });
    }

    /**
     * Compares the two given items by the configured type of this heap
     *
     * @method comparePair
     * 
     * @param {number} itemOne
     * @param {number} itemTwo
     * 
     * @returns {boolean}
     */
    comparePair(itemOne, itemTwo) {
        if (this.type === 'min') {
            return itemOne <= itemTwo;
        } 
        
        if (this.type === 'max') {
            return itemOne >= itemTwo; 
        }

        throw new Error('No valid heap type defined!');
    }

    /**
     * Swaps indexOne with indexTwo
     *
     * @method swap
     *
     * @param {number} indexOne 
     * @param {number} indexTwo
     *
     * @returns {void}
     */
    swap(indexOne, indexTwo) {
        const temp = this.items[indexOne];
        this.items[indexOne] = this.items[indexTwo];
        this.items[indexTwo] = temp;
    }

    /**
     * Returns the top value of the heap
     *
     * @method peek
     *
     * @returns {number}
     */
    peek() {
        this.isEmpty();

        return this.item[0];
    }

    /**
     * Returns the verry first item of the heap and reorders the heap after
     *
     * @method poll
     *
     * @returns {number}
     */
    async poll() {
        this.isEmpty();

        // Store item in funcStack
        const item = this.items[0];

        // Set last item as first
        this.items[0] = this.items[this.items.length - 1]

        // Remove last item
        this.items.pop();

        await this.heapifyDown();

        return item;
    }

    /**
     * Returns the verry first item of the heap and reorders the heap after
     *
     * @method add
     *
     * @param {number} item
     * 
     * @returns {void}
     */
    async add(item) {
        // Add item to end of the array
        this.items.push(item)

        // Re-order heap from down to top
        await this.heapifyUp();
    }

    /**
     * Re-orders the heap from down to top
     *
     * @method heapifyUp
     * 
     * @returns {void}
     */
    async heapifyUp() {
        let index = this.items.length;
        let parentIndex;

        while (this.hasParent(index) && this.comparePair(this.parent(index), this.items[index])) {
            parentIndex = this.getParentIndex();
            swap(parentIndex, index);
            index = parentIndex;
        }
        
        return;
    }

    /**
     * Re-orders the heap from top to down
     *
     * @method heapifyDown
     * 
     * @returns {void}
     */
    async heapifyDown() {
        const index = 0;
        let smallerChildIndex;

        while(this.hasLeftChild(index)) {
            smallerChildIndex = this.getLeftChildIndex(index);

            if (this.hasRightChild(index) && this.comparePair(this.rightChild(index), this.leftChild(index))) {
                smallerChildIndex = this.getRightChildIndex(index);
            }

            if (this.items[index] < this.items[smallerChildIndex]) {
                break;
            }

            this.swap(index, smallerChildIndex);
            index = smallerChildIndex;
        }

        return;
    }

    /**
     * Returns the left child index by the given parent index of the heap
     *
     * @method getLeftChildIndex
     *
     * @param {number} parentIndex
     *
     * @returns {number}
     */
    getLeftChildIndex(parentIndex) {
        return 2 * parentIndex + 1;
    }

    /**
     * Returns the right child index by the given parent index of the heap
     *
     * @method getRightChildIndex
     *
     * @param {number} parentIndex
     *
     * @returns {number}
     */
    getRightChildIndex(parentIndex) {
        return 2 * parentIndex + 2;
    }

    /**
     * Returns the parent index by the given child index of the heap.
     *
     * Note: Math floor is required to not have invalid decimals as index returned
     *
     * @method getParentIndex 
     *
     * @param {number} childIndex
     *
     * @returns {number}
     */
    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    /**
     * Returns true if the given index does have a left child
     *
     * @method hasLeftChild
     *
     * @param {number} index
     *
     * @returns {boolean}
     */
    hasLeftChild(index) {
        return this.getLeftChildIndex(index) < this.items.length;
    }

    /**
     * Returns true if the given index does have a right child
     *
     * @method hasRightChild
     *
     * @param {number} index
     *
     * @returns {boolean}
     */
    hasRightChild(index) {
        return this.getRightChildIndex(index) < this.items.length;
    }

    /**
     * Returns true if the given index does have a parent node
     *
     * @method hasParent
     *
     * @param {number} index
     *
     * @returns {boolean}
     */
    hasParent(index) {
        return this.getParentIndex(index) >= 0;
    }

    /**
     * Returns the left child of the given index
     *
     * @method leftChild
     *
     * @param {number} index
     *
     * @returns {number}
     */
    leftChild(index) {
        return this.items[this.getLeftChildIndex(index)];
    }

    /**
     * Returns the right child of the given index
     *
     * @method rightChild
     *
     * @param {number} index
     *
     * @returns {number}
     */
    rightChild(index) {
        return this.items[this.getRightChildIndex(index)];
    }

    /**
     * Returns the parent of the given index
     *
     * @method parent
     *
     * @param {number} index
     *
     * @returns {number}
     */
    parent(index) {
        return this.items[this.getParentIndex(index)];
    }
}
