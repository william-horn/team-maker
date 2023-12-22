import { EnumCollection, EnumItem } from './Enum';

const ProviderNames = new EnumCollection({
  // * value: provider name
  // production
  ButtonGroup: new EnumItem({ value: 'ButtonGroup', name: 'ButtonGroup' }),
  DropdownSelection: new EnumItem({ value: 'DropdownSelection' }),
  // test providers
  FirstProvider: new EnumItem({ value: 'FirstProvider' }),
  SecondProvider: new EnumItem({ value: 'SecondProvider' }),
  ThirdProvider: new EnumItem({ value: 'ThirdProvider' }),
});

export default ProviderNames;