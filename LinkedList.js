class Node {
    /**
     * @param {any} value
     *
     * @constructor 
     */
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    /**
     * @constructor 
     */
    constructor() {
        this.head = null;
    }

    isEmpty() {
        return !(this.head === null);
    }

    removeHead() {
        this.head = this.head.next;

        return this.head;
    }

    prepend(node) {
        const head = this.head;
        this.head = node;
        node.next = head;
    }

    add(node) {
        if (this.head === null) {
            this.head = node;

            return;
        }

        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }

        current.next = node;

        return true;
    }

    get(index) {
        if (index <= -1 || this.head === null) {
            return void(0);
        }

        let current = this.head;
        let i = 0;

        // (current !== null) until last
        // (i < index) until requested index
        while ((current !== null) && (i < index)) {
            current = current.next;
            i++;
        }

        if (current !== null) {
            return current.value;
        }

        return void(0);
    }

    getNodesByValue(value) {
        const values = [];

        let current = this.head;
        let i = 0;
        
        // Iterate over all 
        while (current !== null) {
            if (current.value === value) {
                values.push(current);
            }

            current = current.next;
            i++;
        }

        return values;
    }

    remove(index) {
        if (index <= -1 || this.head === null) {
            throw new RangeError(`Given index (${index}) does not exist.`);
        }

        // Remove LinkedList Head
        if (index === 0) {
            const removedValue = this.head.value;
            this.head = this.head.next;

            return removedValue;
        }

        let current = this.head;
        let previous = null;

        while ((current !== null) && (i < index)) { // Iterate over all until the searched index appears
            previous = current; // Store previous
            current = current.next; // Define new current 
            i++;
        }

        if (current !== null) {
            // Use the previous.next (current node we want to remove) and set it to current.next (the node after the one we want to remove)
            previous.next = current.next; 

            return current.value; // Return removed data
        }

        throw new RangeError('Node not found!');
    }

    removeNodesByValue(value) {
        const values = [];

        let current = this.head;
        let previous = null;
        
        // Iterate over all 
        while (current !== null) {
            if (current.value === value) {
                values.push(current);
                
                if (current === this.head) {
                    this.head = this.head.next;
                } else {
                    previous.next = current.next;
                }
            }

            previous = current;
            current = current.next;
        }

        return values;
    }
}
