# Button Components
*by: William J. Horn*

Button components come in four varieties:
  - `<StatelessButton>`
  - `<StatefulButton>`
  - `<StatelessLink>`
  - `<StatefulLink>`

Stateless buttons are the templates for stateful buttons. They have **no state** but they can be passed a `state={}` prop, where you can manually define a state for the button. This can then be used to dynamically render the component.

Stateful buttons **do** hold internal state, which is then passed down to the stateless buttons.

# API

### `<StatelessButton>` Props:

* `onClick` 
* `onSelect`
* `onUnselect`
* `eventData`
* `ignoreContext`
* `state`
* `className`
* `leftIcon`
* `rightIcon`
* `leftIconSelected`
* `rightIconSelected`
* `leftIconHovered`
* `rightIconHovered`


### className:

```jsx
<StatelessButton
className={{
  self: "text-one"
}}
>
```

You can use special state selectors inside of `className` to apply tailwind classes based on the component's `state` prop:

```jsx
<StatelessButton
className={{
  self: "text-one",

  __selected: { self: "text-two" },
  __hovered: { self: "text-three" }
}}
>
```

`className` also supports icon changes:

```jsx
<StatelessButton
className={{
  leftIcon: { src: "icon-one.svg" },

  __selected: { 
    leftIcon: { src: "text-three" } 
  }
}}
>
```

### onClick:

Click handler that runs when the button is clicked. Only difference between default `onClick` is button components will pass custom event data to the callback:

```jsx
<StatelessButton
onClick={
  eventData => {
    console.log("clicked with event data: ", eventData);
  }
}
>
```

### eventData:

Extended props that will get passed into the event data object for click/input events:

```jsx
const onClick = function(eventData) {
  console.log("new event prop: ", eventData.newData); 
}

<StatelessButton
eventData={{ newData: "new data" }}
onClick={onClick}
>
```
When clicked:
> `"new event prop: new data"`
