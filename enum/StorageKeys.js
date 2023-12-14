import { EnumCollection, EnumItem } from './Enum';

const StorageKeys = new EnumCollection({
  Theme: new EnumItem({
    value: 'current-theme',
    info: 'the currently selected theme'
  }),

  SearchHistory: new EnumItem({
    value: 'search-history',
    info: 'locally saved search queries'
  }),

  SearchHistoryDomain: new EnumCollection({
    Primary: new EnumItem({ value: 'primary' }),
    Secondary: new EnumItem({ value: 'secondary' }),
  }),
}, {
  valuePrefix: 'raven:'
})

export default StorageKeys;