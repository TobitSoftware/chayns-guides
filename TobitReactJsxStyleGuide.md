# Tobit.Software React/JSX Style Guide
There are some basic rules you have to consider. We think this is a very handsome way to work with React and chayns®.
* Only one React component per file.
    * But multiple Stateless or Pure components are allowed in one file.
* Use JSX syntax when writing React component. 

# Content
1. [Project structure](#project-structure)
2. [Naming](#naming )
3. [PropType](#proptypes)
4. [Component](#component )
5. [Properties](#properties)
6. [Methods](#methods)
7. [Spacing](#spacing)
8. [Alignment](#alignment )
9. [Quotes](#quotes)
10. [Parentheses](#parentheses)
11. [Tag](#tags)
12. [Refs](#refs)
13. [chayns®](#chayns-with-react)
14. [Source](#source)

## Project structure
* This is a possible structure for a project with `React` and `Redux`.

```
..
src
|-actions
  |-todo.js
|-components
  |-header
    |-headline
      |-Headline.jsx
      |-headline.scss
    |-intro
      |-Intro.jsx
      |-intro.scss
  |-todos
      |-Todos.jsx
      |-todos.scss
      |-todo
         |-Todo.jsx
         |-TodoContainer.js
         |-todo.scss
  |-addTodo
    |-AddTodo.jsx
    |-AddTodoContainer.js
    |-AddTodo.scss
|-reducers
  |-Todo.js
|-index.jsx
|-index.html
...
  
```
## Naming 
* **Filename**: Use PascalCase for filenames  `ChaynsUser.jsx`
* **ReferenceNaming**: PascalCase for React components, camelCase for their instances.

```jsx
import  ChaynsUser from './ChaynsUser';

const chaynsUser = <ChaynsUser />;
```

* **ComponentNaming**:  Use the filename as the component name. You can use a `index.jsx` if the directory name has the same name as the component. **Better** rename the directory. 

```jsx
import  ChaynsUser from './ChaynsUser';
```

* **Properties** Avoid using DOM component prop names for different purposes e.g. don't use "style" or "className" as prop names.

```jsx
import SchoolClass from './SchoolClass';

<SchoolClass schoolClassName ="Science-Laboratory" />
```

## PropTypes
* PropTypes will help you to keep your code clean and structured.
* Always define defaultProps for all non-required props.

```jsx
import React, { PropTypes } from 'react'

const propTypes ={
    userId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    nameAffix: PropTypes.string
};

const defaultProps= {
    nameAffix: 'Hello'
};

class User extends React.Component{

    render(){
        return(
            <div id={this.props.userId}>
                {this.props.nameAffix + this.props.firstName}
            </div>
        )
    }
}

User.propTypes = propTypes;
User.defaultProps = defaultProps;

export default User
```
* This can be used with the plugin `transform-class-properties`

```jsx
import React, { PropTypes } from 'react'

export default class User extends React.Component{

static propTypes ={
    userId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    greeting: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

static defaultProps= {
    greeting: 'Hello, '
};

    render(){
        return(
            <div id={this.props.userId}>
                {this.props.nameAffix + this.props.firstName}
            </div>
        )
    }
}
```
 
## Component 
* Declare your React component with `extends React.Component`.
* Keep your render function short and clean.
* You can use stateless components to minimize your render function. Especially if you can use the stateless components multiple times.

```jsx
export default class Tapp extends React.Component {
    render(){
        return(
            <div className="tapp">
                <div className="tapp__intro">
                    <h1>My Tapp</h1>
                    This is a new Tapp
                </div>
                <Accordion />
            </div>
        )
    }
}
``` 

* Stateless components

```jsx
const company = ({name})=> (
    <Manager>
        {getWage(name)}
    </Manager>
);
```

### Component structure

#### extends React.Component
 1.  optional static methods
 2.  constructor
 3.  getChildContext
 5.  componentDidMount
 7.  shouldComponentUpdate
 9.  componentDidUpdate
 11. eventHandlers like `onClickUACGroup()`
 12. getter for render like `getUACGroup()`
 12. optional render methods like `renderUACGroup()`
 13. render

## Properties
* Always use camelCase for your prop names.

```jsx
<User
    userName = "Max Mustermann"
    userId={123456789}
/>
```
* Leave out the values when the prop is expelicity `true`.

```jsx
<User hidden />
```

* Always include an alt prop on `<img>` tags. 
* Don't use words like "image", "photo" or "picture" in `<img>` alt props.
* Don't use `accessKey`.
* Use unique IDs as `key`.

## Methods
* Use arrow functions if possible and useful.
* Bind event handlers for the render methods in the constructor.

```jsx
export default class extends React.Component {
    constructor(props) {
        super(props);

        this.onClickStar = this.onClickStar.bind(this);
    }

    onClickStar() {
        // do something
    }

    render() {
        return (<Star onClick={this.onClickStar} />)
    }
}
```
* Don't use underscore prefix. JacaScript has no private method, so it makes less sense. 


## Spacing
* Use a single space for self-closing tags.
 
```jsx
 <Order />
```
* Don't use spaces in your curly braces.

```jsx
<Order element={currentOrder} />
```


## Alignment 
* Use this alignmentstyles for your components.

```jsx
<User
    userName = "Max Mustermann"
    userId={123456789}
/>
```
```jsx
// only one property
<Order id="1234567891011" />
```
```jsx
//children
<User
    userName = "Max Mustermann"
    userId={123456789}
>
    <Orders />
</User>

```

## Quotes
* Use single quotes (') for JavaScript and double quotes (") for JSX. 

```jsx
<User
   userName = "Max Mustermann"
   userId={123456789}
   style = {{ margin: '10px' }}
/>
```


## Parentheses
* Wrap JSX in parentheses when they span more then one line.

```jsx
render(){
    return (
        <div>
            <User
                userName = "Max Mustermann"
                userId={123456789}
                style = {{ margin: '10px' }}
            />
        </div>
    )
}
```
```jsx
render(){
    return ( <Order>{ItemName}</Order> )
}
```

## Tags
* Use self-close tags when the tag has no child.
* If the component has multi-line properties, set the closing tag in a new line.

```jsx
<div className="tapp" />
```
```jsx
<div 
    className = "tapp"
    style = {{ overflow : 'hidden' }} 
/>
```

## Refs
* Use ref callbacks.

```jsx
<User ref={(ref) => {this.userRef = ref}} />
```


## chayns® with React
* By using chayns® you have to be sure chayns® is ready. Therefor put the `ReactDOM.render()` in your `chayns.ready`.

```jsx
chayns.ready.then(function resolved() {

    ReactDOM.render(
            <div className="tapp">
                <Intro />
            </div>,
            document.querySelector('#app')
    );
    
}).catch(function rejected() {
    console.log('no chayns environment found');
}).then(function always() {
    console.log('Will always be executed');
});
```


### Source
* Our StyleGuide based on [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)
