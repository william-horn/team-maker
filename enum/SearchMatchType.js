import { EnumCollection, EnumItem } from './Enum';

const SearchMatchType = new EnumCollection({
  Normal: new EnumItem({ value: 'normal' }),
  FirstMatch: new EnumItem({ value: 'firstMatch' }),
  WordMatch: new EnumItem({ value: 'wordMatch' }),
  AnyMatch: new EnumItem({ value: 'anyMatch' }),
});

export default SearchMatchType;