import { EnumCollection, EnumItem } from './Enum';

const SearchResultType = new EnumCollection({
  History: new EnumItem({ value: 'history' }),
  Database: new EnumItem({ value: 'database' }),
});

export default SearchResultType;