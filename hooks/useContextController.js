"use client";

import { useComponentContext } from "@/providers/Providers";
import Enum from "@/enum";
import emptyFunc, { truthyFunc } from "@/util/defaultFunctions";
import mergeClass from "@/util/mergeClass";

const {
  FirstProvider: enum_FirstProvider,

  ButtonGroup: enum_ButtonGroup,
  DropdownSelection: enum_DropdownSelection,
} = Enum.ProviderNames;

const groupContexts = {
  // contexts that can't be combined with each other
  mutuallyExclusive: {
    [enum_FirstProvider.value]: {
      provider: enum_FirstProvider,
      useContext: () => useComponentContext(enum_FirstProvider),
      methods: {
        __getEventData() {
          return {
            firstProvider: true,
            state: this.__getState()
          }
        },

        __setStateInitial() {
          this.__setState({
            __testState: false,
            __testActive: false,
          });
        },

        __updateActiveData() {
          if (this.__getState().__testState) {
            this.__provider.activeData.current[this.id] = this.__getEventData();
          } else {
            delete this.__provider.activeData.current[this.id];
          }
        },

        onClick() {
          console.log("SYSTEM CLICK");
          this.__props.onClick({ data: "test" });
        }
      }
    },

    /*
      * // ================================ // *
      * // --------- BUTTON GROUP --------- // *
      * // ================================ // *
    */
    [enum_ButtonGroup.value]: {
      provider: enum_ButtonGroup,
      useContext: () => useComponentContext(enum_ButtonGroup),
      methods: {
        __getEventData() {
          return {
            inGroup: true,
            value: this.value,
            state: this.__getState(),
            controller: this,
            ...this.eventData
          }
        },

        __collapseClassName() {
          this.importedClassName = mergeClass(
            this.__provider.className.buttons,
            this.importedClassName
          );
        },

        __setStateInitial() {
          this.__setState({
            __groupSelected: this.__provider.findActiveId(this.id).found,
            ...this.__provider.importedState,
            ...this.__props.importedState,
            // __groupSelected: this.__provider.findActiveId(this.id).found,
          });
        },

        __updateActiveData() {
          if (this.__getState().__groupSelected) {
            this.__provider.activeData.current[this.id] = this.__getEventData();
          } else {
            delete this.__provider.activeData.current[this.id];
          }
        },

        onClick() {
          const buttonGroup = this.__provider;
          
          // import props from ButtonGroup provider
          const {
            selectionLimit,
            activeIds,
            unselectLastChoice,
            activeData,
            onSelectionLimitReached,
            updateActiveIds,
          } = buttonGroup;

          /*
            * note: for future micro-optimization, conditionally check if these 
            * functions exist instead of giving them a default function.
          */
          const {
            onSelect=truthyFunc,
            onUnselect=truthyFunc,
            onClick=truthyFunc,
          } = this.__props;

          const selected = !this.__getState().__groupSelected;

          /*
            short-hand functions for firing button group callbacks and
            direct button events.

            * note: you must return 'true' from within a callback given directly to the button 
            * in order for the callback to bubble back up to the button group callback.
          */
          const fireOnSelect = (...args) => {
            if (onSelect(...args)) buttonGroup.onSelect(...args);
          }
        
          const fireOnUnselect = (...args) => {
            if (onUnselect(...args)) buttonGroup.onUnselect(...args);
          }
      
          const fireOnClick = (...args) => {
            if (onClick(...args)) buttonGroup.onClick(...args);
          }
  
          if (selectionLimit > -1 && activeIds.length >= selectionLimit && selected) {
            if (unselectLastChoice) {
              const unselectedButtonId = activeIds[activeIds.length - 1];
      
              if (unselectedButtonId !== this.id) {
                const unselectedButtonData = activeData.current[unselectedButtonId];
                unselectedButtonData.state.__groupSelected = false;
                
                fireOnUnselect(unselectedButtonData);
                updateActiveIds(unselectedButtonId, unselectedButtonData.state.__groupSelected);
              }
      
            } else {
    
              onSelectionLimitReached(this.__getEventData());
              return;
            }
          }
    
          this.__updateState({
            __groupSelected: selected
          });

          fireOnClick(this.__getEventData());
      
          if (selected) {
            fireOnSelect(this.__getEventData());
          } else {
            fireOnUnselect(this.__getEventData());
          }
      
          updateActiveIds(this.id, selected);
        }
      }
    },

    /*
      * // ================================ // *
      * // ------ DROPDOWN SELECTION ------ // *
      * // ================================ // *
    */
    [enum_DropdownSelection.value]: {
      provider: enum_DropdownSelection,
      useContext: () => useComponentContext(enum_DropdownSelection),
      methods: {
        __getEventData() {
          return {
            inDropdown: true,
            value: this.value,
            text: this.text,
            state: this.__getState(),
            controller: this,
            ...this.eventData
          }
        },

        __collapseClassName() {
          this.importedClassName = mergeClass(
            this.__provider.className.menuItems,
            this.importedClassName
          );
        },

        __setStateInitial() {
          this.__setState({
            __dropdownSelected: this.__provider.selectedId === this.id,
            ...this.__provider.importedState,
            ...this.__props.importedState,
          });
        },

        __updateActiveData() {
          if (this.__getState().__dropdownSelected) {
            this.__provider.activeData.current.active = this.__getEventData();
          }
        },

        onClick() {
          const dropdownGroup = this.__provider;

          const {
            activeData,
            setSelectedId,
            setMenuOpen,
          } = dropdownGroup;

          const {
            onClick=truthyFunc,
          } = this.__props;

          if (!this.__getState().__dropdownSelected) {
            activeData.current.active = this.__getEventData();
            setSelectedId(this.id);
            setMenuOpen(false);
            onClick(this.__getEventData());
            // selectedItemData.current = buttonData;
            // group_setSelectedId(buttonProps.id);
            // group_setMenuOpen(false);
          }
        }
      }
    }
  },

  // contexts that can be combined
  inclusive: {

  }
}


/*
  getCurrentContext(null): 

  return {
    props: {...context.rest, ...props},     // final props
    payload: context,                       // data from context provider
    methods: context.methods,               // methods attached to context
  }
*/
export const useCurrentContext = (props={}) => {

  const { 
    mutuallyExclusive: mutuallyExclusiveContexts, 
    inclusive: inclusiveContexts 
  } = groupContexts;

  const finalContext = {
    ...props,             // contains all UPDATED props
    eventData: props.eventData || {},

    __props: props,       // contains all ORIGINAL props merged with provider context
    __provider: {},       // contains provider context
    // __contextMethods: {},
    __handlers: {         // contains handler functions for context methods (several may exist for nested contexts)
      /*  
        onClick: [
          () => {...},
          () => {...}
        ]
      */
    },

    __hasContext: false,  // if a context exists

    /*
      returns the object that gets passed to event handler callback functions.
      can be re-defined inside context 'method' fields.
    */
    __getEventData() {
      // const eventData = this.eventData || {};

      return {
        status: "no context",
        value: this.value,
        state: this.__getState(),
        controller: this,
        ...this.eventData
      }
    },

    __getState() {
      return this.importedState;
    },

    __setState(newState) {
      this.importedState = newState;
    },

    __updateState(updatedState) {
      for (let key in updatedState) {
        this.importedState[key] = updatedState[key];
      }

      this.importedState.__selected = this.__isSelected();
    },

    __setStateInitial() {
      this.__setState(this.importedState);
    },

    __updateActiveData() {
      if (!this.__hasContext) {
        // console.warn("Cannot update active data - no context available");
        return;
      }
    },

    // merge className objects from provider and component
    __collapseClassName() {
      if (!this.__hasContext) {
        // console.warn("Cannot collapse className - no context available");
        return;
      }

      this.importedClassName = mergeClass(
        // * note: 'finalContext.__provider.className' should always be an object. default is {}
        this.__provider.className,
        this.importedClassName
      );
    },

    __registerComponent() {
      if (!this.__hasContext) {
        // console.warn("Cannot register component - no context in which to register");
        return;
      }

      this.__provider.registeredIds.current[this.id] = this.__getEventData();
    },

    __validateProps() {
      if (!this.id && this.__hasContext) {
        console.warn("No 'id' prop was given to sub-component - assigning 'default' by default.");
        this.id = "default";
      }
    },

    // todo: generalize selected states to make this cleaner
    __isSelected() {
      const state = this.__getState();
      return state.__groupSelected
        || state.__locallySelected
        || state.__dropdownSelected
        || false;
    },

    __getRestProps() {
      // default to rest props from button components
      const {
        onClick,
        onSelect,
        onUnselect,
        eventData,
        ignoreContext,
        importedState,
        importedClassName,
        leftIcon,
        rightIcon,
        leftIconSelected,
        rightIconSelected,
        leftIconHovered,
        rightIconHovered,
        id,
        value,
        ...rest
      } = this.__props;

      return rest;
    },

    onClick() {
      if (this.__props.onClick) {
        this.__props.onClick(this.__getEventData());
      }
    },

    /*
      * note: if you need to merge default methods with custom set methods, you can do:

      myMethod() {
        if (this.__contextMethods.myMethod()) {
          * (default behavior here)
        }
      }

      this also means you will need to remove the code that over-writes all default
      methods with the custom context methods.
    */
  };

  if (props.ignoreContext) {
    return finalContext;
  }

  let lastExclusiveContextName;

  // first scan for mutually exclusive contexts
  for (let contextName in mutuallyExclusiveContexts) {
    const contextData = mutuallyExclusiveContexts[contextName];
    const context = contextData.useContext();

    // catch nested mutually-exclusive contexts
    if (context && lastExclusiveContextName) {
      throw Error(`Cannot nest mutually exclusive contexts: [${lastExclusiveContextName}, ${contextName}] are not compatible.`);

    } else if (context) {
      lastExclusiveContextName = contextName;

      /*
        * note: this may be optimized by omitting the spread operator '...' for combining 
        * context and props, with simply just indexing props first and then using 'context.rest'
        * as a fallback.
      */
      finalContext.__props = {...context.rest, ...props};
      finalContext.__provider = context;
      finalContext.__hasContext = true;
      finalContext.__contextData = contextData;
      // finalContext.__contextMethods = contextData.methods;

      // copy method names over to finalContext, and let those functions be called on 'finalContext'
      // for (let methodName in contextData.methods) {
      //   finalContext[methodName] = (...args) => contextData.methods[methodName].call(finalContext, ...args);
      // }
      for (let methodName in contextData.methods) {
        finalContext[methodName] = contextData.methods[methodName];
      }
    }
  }

  // * BETA FEATURE
  for (let contextName in inclusiveContexts) {
    const contextData = inclusiveContexts[contextName]
    const context = contextData.useContext();

    /*
      * note: when combining contexts, be sure to also account for combining context methods. 
      * for example, if two merging contexts both have an 'onClick' function, store both of them
      * so they are both fired when clicked.
      * 
      * for a ButtonGroup, 'onClick' may affect the '__groupSelected' state, whereas for
      * the DropdownSelection group, 'onClick' will affect the '__dropdownSelected' state.
    */
    
    /*
      ! note: this should be some kind of deep-copy, so one inclusive context isn't 
      ! just over-writing the other.
    */
    if (context) {
      // finalContext = {...finalContext, ...context}
    }
  }

  return finalContext;
}

export const useContextController = (props) => {
  const currentContext = useCurrentContext(props);

  // ensure all prop rules are obeyed
  // * note: validateProps should be called first to set/validate default props
  currentContext.__validateProps();

  // set the initial default state with or without context
  currentContext.__setStateInitial();

  // once initial state is selected, set the "any" state selected prop
  currentContext.__updateState({
    __selected: currentContext.__isSelected()
  });

  // merge provider class names with direct component class names
  currentContext.__collapseClassName();

  // update active data based on this component's state
  currentContext.__updateActiveData();

  // all group providers should have a 'registeredIds' fields, holding all event data for all sub-components.
  currentContext.__registerComponent();

  return currentContext;
}
