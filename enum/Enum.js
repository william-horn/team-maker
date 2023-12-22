/*
  global enum methods
*/
const enumCollectionPrototype = {
  _test() {
    return 'Enum Collection';
  },

  getEnumItems() {
    return Object.values(this.enumItems);
  }
}

const enumItemPrototype = {
  _test() {
    return 'Enum Item';
  }
}

/*
unique enum methods

const collectionMethods = {
  getName() {
    return 'my_collection'
 }
}

const itemMethods = {
  getName() {
    return this.name;
  }
}

const bobMethods = {
  setName() {
    this.name = 'not bob'
  }
}

const enumCollection = new EnumCollection({
  bob: new EnumItem({ name: 'Bob' }, { methods: bobMethods }),
  frank: new EnumItem({ name: 'Frank' })
}, {
  collectionMethods,
  itemMethods
});

enumCollection.getName() -> 'my_collection'
enumCollection.bob.getName() -> 'Bob'
enumCollection.bob.setName()
enumCollection.bob.getName() -> 'not bob'
*/

export const EnumItem = function(fields, options={}) {
  const {
    methods={}
  } = options;

  Object.assign(this, {...fields, ...methods});

  this.fields = fields;
  this.methods = methods;
  this._customType = 'EnumItem';
}

export const EnumCollection = function(enumItems, options={}) {
  const {
    valuePrefix,
    collectionMethods={},
    itemMethods={}
  } = options;

  for (let key in enumItems) {
    const enumItem = enumItems[key];

    if (valuePrefix) {
      enumItem.value = valuePrefix + enumItem.value;
    }

    enumItems[key] = {...enumItem, ...itemMethods};
  }

  Object.assign(this, {...enumItems, ...collectionMethods});

  this.enumItems = enumItems;
  this.methods = collectionMethods;
  this._customType = 'EnumCollection';
}

Object.assign(EnumItem.prototype, enumItemPrototype);
Object.assign(EnumCollection.prototype, enumCollectionPrototype);