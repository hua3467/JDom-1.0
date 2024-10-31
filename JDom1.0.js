/**
 * JDom is a helper class that creates DOM elements from JSON-structured data.
 * This class creates, updates, and removes HTML nodes by directly manipulating DOM elements.
 * A performance-optimization algorithm, like a diffing algorithm in React, might be added in future versions.
 */
export default class JDom {
     /**
     * Creates a new JDom instance.
     * 
     * @param {Object} node - The structure of the DOM element.
     * @param {String} node.type - The tag name of the top-level element.
     * @param {Object} [node.attr] - Attributes to set on the element.
     * @param {string|HTMLElement|JDom} [node.content] - Content to append to the element.
     * @param {Object} [node.events] - Events to add to the element, e.g., { click: (e) => { console.log("clicked!") } }.
     * @param {Array.<Object|string|HTMLElement|JDom>} [node.children] - Children to append to the element.
     */
    constructor(node) {
        this.node = node;
        this.element = this._createElement(this.node);
        this.isJDOM = true;
    }

       /**
     * Creates an element and attaches event listeners.
     * @param {Object} node - The node configuration object.
     * @returns {HTMLElement} The created element.
     */
    _createElement(node) {
        const ele = document.createElement(node.tag || 'div');
    
        // Set attributes
        if (node.attr) {
            for (const [key, value] of Object.entries(node.attr)) {
                if (key.startsWith("data-")) {
                    ele.dataset[key.substring(5)] = value;
                } else if (key === "style" && typeof value === "object") {
                    Object.assign(ele.style, value);
                } else {
                    ele.setAttribute(key, value);
                }
            }
        }
    
        // Set content
        if (node.content) {
            this._appendContent(ele, node.content);
        }
    
        // Add events
        if (node.events) {
            if (!this.eventListeners) {
                this.eventListeners = new Map();
            }
            for (const [event, handler] of Object.entries(node.events)) {
                ele.addEventListener(event, handler);
                this.eventListeners.set(event, handler);
            }
        }
    
        // Append children
        if (node.children) {
            for (const child of node.children) {
                if (child) {
                    if (child.isJDOM) {
                        ele.appendChild(child.element);
                    } else if (typeof child === "string") {
                        ele.appendChild(this._getDomFromString(child));
                    } else if (child instanceof HTMLElement) {
                        ele.appendChild(child);
                    } else if (typeof child === "object") {
                        const childEle = this._createElement(child);
                        ele.appendChild(childEle);
                    }
                }
            }
        }
    
        return ele;
    }
    /**
     * Appends content to an element.
     * @param {HTMLElement} ele - The element to append content to.
     * @param {string|HTMLElement|JDom} content - The content to append.
     */
    _appendContent(ele, content) {
        if (content.isJDOM) {
            ele.appendChild(content.element);
        } else if (typeof content === "string") {
            ele.appendChild(document.createTextNode(content));
        } else if (content instanceof HTMLElement) {
            ele.appendChild(content);
        }
    }

    /**
     * Renders the element into the DOM.
     * @param {string|HTMLElement} target - The target selector or element to render into.
     * @param {string} [position="append"] - Position to insert the element ('append' or 'prepend').
     * @returns {JDom} - Returns the instance for chaining.
     */
    render(target, position = "after") {
        const container = typeof target === "string" ? document.querySelector(target) : target;
        if (position === "after") {
            container.appendChild(this.element);
        } else if (position === "before") {
            container.insertBefore(this.element, container.firstChild);
        }
        return this;
    }


     /**
     * Appends new content to the current element.
     * 
     * @param {string|HTMLElement|JDom} newContent - The content to append. This can be a string, an existing HTML element, or a JDom instance.
     * @param {string} [position="after"] - The position to append the new content. 
     *                                      Use "after" to append as the last child, or "before" to insert as the first child.
     */
    add(newContent, position = "after") {
        const newElement = this._createElement(newContent);
        if (position === "after") {
            this.element.appendChild(newElement);
        } else if (position === "before") {
            this.element.insertBefore(newElement, this.element.firstChild);
        }
    }

    /**
     * Clears the contents of the specified container.
     * @param {string|HTMLElement} target - The target selector or element to clear.
     */
    static clear(target) {
        const container = typeof target === "string" ? document.querySelector(target) : target;
        container.innerHTML = '';
    }

    /**
     * Updates the current element with new content.
     * @param {Object} newContent - The new content to update the element with.
     */
    update(newContent) {
        const newElement = this._createElement(newContent);
        this.element.replaceWith(newElement);
        this.element = newElement;
    }

     /**
     * Removes the current element from the DOM.
     * @param {String} [selector] (Optional)The id or class name of the element to be removed.
     */
    remove(selector) {
        if (selector) {
            const elementsToRemove = document.querySelectorAll(selector);
            elementsToRemove.forEach(element => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
        } else {
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
    }

    /**
     * Hides the current element or the specified element.
     * @param {String} [selector] (Optional)The id or class name of the element to be hidden.
     */
    hide(selector){
        if (selector){
            const elementsToHide = document.querySelectorAll(selector);
            elementsToHide.forEach(element => {
                element.style.display = 'none';
            });
        } else {
            this.element.style.display = 'none';
        }
    }

             /**
         * Shows the current element or the specified element.
         * @param {String} [selector] (Optional) The id or class name of the element to be shown.
         */
        show(selector) {
            const showElement = (element) => {
                const previousDisplay = element.getAttribute('data-previous-display');
                if (previousDisplay) {
                    element.style.display = previousDisplay;
                } else {
                    element.style.removeProperty('display');
                }
            };
        
            if (selector) {
                const elementsToShow = document.querySelectorAll(selector);
                elementsToShow.forEach(element => {
                    showElement(element);
                });
            } else {
                showElement(this.element);
            }
        }

    /**
     * Update the style of the instance of current object.
     * @param {Object} styleJson - The style object to update the element with. this element will be passed to node.attr.style. An example of styleJson is {color: 'red', backgroundColor: 'blue'}
     */
    updateStyle(styleJson) {
        if (typeof styleJson !== 'object' || styleJson === null) {
            throw new Error('Invalid styleJson object');
        }

        for (const [key, value] of Object.entries(styleJson)) {
            this.element.style[key] = value;
        }
    }

/**
 * Adds an event listener to the current or selected element.
 * If the same type of event already exists, it removes the previous one and adds the new event.
 * @param {string} type - The event type, e.g., 'click'.
 * @param {Function} callback - The callback function for the event.
 * @param {string|HTMLElement} [selector] - Optional selector or element to attach the event to.
 */
event(type, callback, selector) {
    const target = selector
        ? (typeof selector === "string"
            ? document.querySelector(selector)
            : selector)
        : this.element;

    if (target) {
        // Store the event listeners in a Map to manage them
        if (!this.eventListeners) {
            this.eventListeners = new Map();
        }

        const existingEvent = this.eventListeners.get(type);
        if (existingEvent) {
            target.removeEventListener(type, existingEvent);
            console.warn(`An existing ${type} event listener has been removed.`);
        }

        target.addEventListener(type, callback);
        this.eventListeners.set(type, callback);
    }
}

    /**
     * Removes an event listener of the specified type from the current element.
     * @param {string} type - The event type, e.g., 'click'.
     */
    _removeEvent(type) {
        if (this.eventListeners) { // Check if eventListeners Map exists
            const existingEvent = this.eventListeners.get(type);
            if (existingEvent) {
                this.element.removeEventListener(type, existingEvent);
                this.eventListeners.delete(type);
            }
        }
    }

    /**
     * Converts an HTML string into a DOM element.
     * @param {string} str - The HTML string.
     * @returns {HTMLElement|null} - The DOM element.
     */
    _getDomFromString(str) {
        const template = document.createElement('template');
        template.innerHTML = str.trim();
        return template.content.firstChild;
    }
}