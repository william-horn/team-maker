import { EnumCollection, EnumItem } from './Enum';

const SearchState = new EnumCollection({
  Idle: new EnumItem({ value: 'idle' }),
  Focused: new EnumItem({ value: 'focused' }),
  Blurred: new EnumItem({ value: 'blurred' }),
});

export default SearchState;