# JDom

JDom is a helper class that creates DOM elements from JSON-structured data. This class allows you to create, update, and remove HTML nodes by directly manipulating DOM elements. A performance-optimization algorithm, like a diffing algorithm in React, might be added in future versions.

## Features

- Create DOM elements from JSON-structured data.
- Set attributes, content, and event listeners on elements.
- Append children elements.
- Remove elements from the DOM.

## Installation

You can include JDom in your project by importing the 

JDom1.0.js

 file.

```html
<script type="module">
    import JDom from './path/to/JDom1.0.js';
</script>
```

## Usage

### Creating an Element

To create a new JDom instance, you need to provide a configuration object that describes the structure of the DOM element.

```javascript
const btnGroup = new JDom({
    tag: "div",
    attr: {
        id: "btnGroup",
        className: "btn-group"
    }
}).render("#app");
```

You can include children when creating an instance.

```javascript
const btnGroup = new JDom({
    tag: "div",
    attr: {
        id: "btnGroup",
        className: "btn-group"
    },
    children: [
        {
            tag: "h1",
            content: "Hello, World!",
            attr: {
                id: "title"
            }
        }
    ]
}).render("#app");
```

### Adding Content and Children

You can add content and children to the created element.

```javascript
btnGroup.add({
    tag: "button",
    content: "Button 1",
    attr: {
        id: "btn1"
    }
});

btnGroup.add({
    tag: "button",
    content: "Button 2",
    attr: {
        id: "btn2",
        className: "btn",
        style: {
            backgroundColor: "red",
            color: "white"
        }
    }
});
```

### Removing an Element

You can remove an element from the DOM by calling the `remove` method.

```javascript
btnGroup.remove();
```

If you want to remove a specific element by selector:

```javascript
btnGroup.remove("#btn1");
```

## API

### Constructor

#### [`new JDom(node)`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Faayang%2FDocuments%2FLibraries%2FhostedAPI%2Futils%2FJDom1.0.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A5%2C%22character%22%3A21%7D%7D%5D%2C%22b8011408-019c-46ec-b5bd-1858b14067e2%22%5D "Go to definition")

Creates a new JDom instance.

- [`node`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Faayang%2FDocuments%2FLibraries%2FhostedAPI%2Futils%2FJDom1.0.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A16%2C%22character%22%3A16%7D%7D%5D%2C%22b8011408-019c-46ec-b5bd-1858b14067e2%22%5D "Go to definition") (Object): The structure of the DOM element.
  - [`tag`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Faayang%2FDocuments%2FLibraries%2FhostedAPI%2Futils%2FJDom1.0.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A28%2C%22character%22%3A48%7D%7D%5D%2C%22b8011408-019c-46ec-b5bd-1858b14067e2%22%5D "Go to definition") (String): The tag name of the top-level element.
  - [`attr`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Faayang%2FDocuments%2FLibraries%2FhostedAPI%2Futils%2FJDom1.0.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A31%2C%22character%22%3A17%7D%7D%5D%2C%22b8011408-019c-46ec-b5bd-1858b14067e2%22%5D "Go to definition") (Object, optional): Attributes to set on the element.
  - [`content`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Faayang%2FDocuments%2FLibraries%2FhostedAPI%2Futils%2FJDom1.0.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A44%2C%22character%22%3A17%7D%7D%5D%2C%22b8011408-019c-46ec-b5bd-1858b14067e2%22%5D "Go to definition") (string|HTMLElement|JDom, optional): Content to append to the element.
  - [`events`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Faayang%2FDocuments%2FLibraries%2FhostedAPI%2Futils%2FJDom1.0.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A49%2C%22character%22%3A17%7D%7D%5D%2C%22b8011408-019c-46ec-b5bd-1858b14067e2%22%5D "Go to definition") (Object, optional): Events to add to the element, e.g., `{ click: (e) => { console.log("clicked!") } }`.
  - [`children`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Faayang%2FDocuments%2FLibraries%2FhostedAPI%2Futils%2FJDom1.0.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A14%2C%22character%22%3A61%7D%7D%5D%2C%22b8011408-019c-46ec-b5bd-1858b14067e2%22%5D "Go to definition") (Array.<Object|string|HTMLElement|JDom>, optional): Children to append to the element.

### Methods

#### [`_createElement(node)`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Faayang%2FDocuments%2FLibraries%2FhostedAPI%2Futils%2FJDom1.0.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A18%2C%22character%22%3A28%7D%7D%5D%2C%22b8011408-019c-46ec-b5bd-1858b14067e2%22%5D "Go to definition")

Creates an element and attaches event listeners.

- [`node`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Faayang%2FDocuments%2FLibraries%2FhostedAPI%2Futils%2FJDom1.0.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A16%2C%22character%22%3A16%7D%7D%5D%2C%22b8011408-019c-46ec-b5bd-1858b14067e2%22%5D "Go to definition") (Object): The node configuration object.
- Returns: [`HTMLElement`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Faayang%2FDocuments%2FLibraries%2FhostedAPI%2Futils%2FJDom1.0.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A12%2C%22character%22%3A22%7D%7D%5D%2C%22b8011408-019c-46ec-b5bd-1858b14067e2%22%5D "Go to definition") - The created element.

#### `render(targetSelector)`

Renders the current element to the specified target in the DOM.

- `targetSelector` (string): The CSS selector of the target element.
- Returns: [`JDom`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Faayang%2FDocuments%2FLibraries%2FhostedAPI%2Futils%2FJDom1.0.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A5%2C%22character%22%3A21%7D%7D%5D%2C%22b8011408-019c-46ec-b5bd-1858b14067e2%22%5D "Go to definition") - The current instance for chaining.

#### `add(node)`

Adds a child element to the current element.

- [`node`](command:_github.copilot.openSymbolFromReferences?%5B%22%22%2C%5B%7B%22uri%22%3A%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Faayang%2FDocuments%2FLibraries%2FhostedAPI%2Futils%2FJDom1.0.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22pos%22%3A%7B%22line%22%3A16%2C%22character%22%3A16%7D%7D%5D%2C%22b8011408-019c-46ec-b5bd-1858b14067e2%22%5D "Go to definition") (Object): The structure of the child element.

#### `remove(selector)`

Removes the current element or the specified element from the DOM.

- `selector` (String, optional): The id or class name of the element to be removed.

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JDom Example</title>
</head>
<body>
    <div id="app"></div>
    
    <script type="module">
        import JDom from './path/to/JDom1.0.js';
        
        const btnGroup = new JDom({
            tag: "div",
            attr: {
                id: "btnGroup",
                className: "btn-group"
            }
        }).render("#app");
        
        btnGroup.add({
            tag: "button",
            content: "Button 1",
            attr: {
                id: "btn1"
            }
        });
        
        btnGroup.add({
            tag: "button",
            content: "Button 2",
            attr: {
                id: "btn2",
                className: "btn",
                style: {
                    backgroundColor: "red",
                    color: "white"
                }
            }
        });
    </script>
</body>
</html>
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.