
"use client";

// import stringIsEmpty from '../lib/helpers/stringIsEmpty';
// import Icon from "./Icon";
// import Button from "./buttons/Button";
// // import { useAppContext } from "../providers/AppProvider";
// import removeExtraWhitespace from "../lib/helpers/removeExtraWhitespace";
// import useLocalStorageRequest from "../hooks/useLocalStorageRequest";
import { twMerge } from "tailwind-merge";
import Icon from './Graphics/Icon';
import stringIsEmpty from '@/util/stringIsEmpty';
import Button from './Buttons/Button';
import removeExtraWhitespace from '@/util/removeExtraWhitespace';
import useLocalStorageRequest from '@/hooks/useLocalStorageRequest';
import Enum from '../enum';
import { v4 as uuidv4 } from 'uuid';
import { useState, useRef, useEffect } from 'react';
import mergeClass from '@/util/mergeClass';

const SearchBar = ({
  className: importedClassName={},
  placeholder, 
  onSearch=search => console.log('searched for: ', search),
  historyDomain=Enum.StorageKeys.SearchHistoryDomain.Primary.value,
  historySize=3,
  leftIcon,
  rightIcon,
}) => {
  // Get search history getters/setters for local storage
  const [getSearchHistory, updateSearchHistory] = useLocalStorageRequest(
    Enum.StorageKeys.SearchHistory.value, { [historyDomain]: [] }
  );

  // Create search state for when the search bar is interacted with
  const [searchState, setSearchState] = useState(Enum.SearchState.Idle.value);
  const searchBarRef = useRef(null);
  const searchFieldRef = useRef(null);

  // Force unfocus on search bar
  const unfocusSearch = () => {
    searchFieldRef.current.blur();
    setSearchState(Enum.SearchState.Idle.value);
  }

  // When search bar is unfocused
  const onSearchUnfocus = (event) => {
    // if (!event.path.some(el => el === searchBarRef.current)) {
    //   unfocusSearch();
    // }
    if (!searchBarRef.current.contains(event.target)) {
      unfocusSearch();
    }
  }

  // Window events for detecting when using is unfocusing the search bar
  // todo: centralize this logic in the top level component, and pass a callback to handle this instead of making a new event listener
  useEffect(() => {
    window.addEventListener('mousedown', onSearchUnfocus);
    window.addEventListener('blur', unfocusSearch);
    console.log('running search bar');
    return () => {
      window.removeEventListener('mousedown', onSearchUnfocus);
      window.removeEventListener('blur', unfocusSearch);
    }
  }, []);

  // When the search bar is focused
  const onSearchFocus = () => {
    setSearchState(Enum.SearchState.Focused.value);
  }

  const filterSearch = (searchQuery) => {
    unfocusSearch();
    const filteredQuery = removeExtraWhitespace(searchQuery);

    // Check for whitespace-exclusive searches
    if (stringIsEmpty(filteredQuery)) {
      return;
    }

    // Update search history
    updateSearchHistory(prev => {
      let finalResults = prev[historyDomain] || [];
      const duplicateIndex = finalResults.indexOf(filteredQuery);

      // Check for duplicate searches. If duplicate is found, just re-order the search results
      if (duplicateIndex > -1) {
        finalResults.splice(duplicateIndex, 1);
        finalResults.unshift(filteredQuery);

      } else {
        finalResults = [filteredQuery, ...finalResults]; 
      }

      // Clip search results to history size limit
      if (finalResults.length > historySize) {
        finalResults = finalResults.slice(0, historySize);
      }
      
      return {...prev, [historyDomain]: finalResults };
    });
    
    onSearch(filteredQuery);
  }

  // When a search is invoked through the search result drop-down menu
  const onSearchResultQuery = (result) => {
    searchFieldRef.current.value = result;
    filterSearch(result);
  }

  // When a search is submitted in the search bar
  const onEnter = (event) => {
    if (event.key === Enum.Keys.Enter.value) {
      filterSearch(searchFieldRef.current.value);
    }
  }

  let className = {
    self: "relative rounded bg-search-bar",

    historyList: {
      self: "absolute w-full rounded-b-md top-full z-[1000] bg-search-bar",
      inner: {
        self: "px-3 py-2 overflow-y-auto max-h-[200px]",
        resultButton: {
          //text-search-bar-result bg-search-bar-result hover:bg-search-bar-result-hover
          self: "w-full text-left text-search-bar-result bg-search-bar-result font-medium transition-colors duration-200 rounded hover:bg-search-bar-result-hover items-center ",
        },
      }
    }
  }

  className = mergeClass(
    className,
    importedClassName
  );

  // Render out a single search result
  const renderSearchResult = (result) => (
    <Button 
    key={uuidv4()}
    onClick={() => onSearchResultQuery(result)}
    className={className.historyList.inner.resultButton}>
      {result}
    </Button>
  );

  // The drop-down search results when the search bar is focused
  const renderSearchResults = () => {
    const historyLogs = getSearchHistory(historyDomain);
    
    if (searchState === Enum.SearchState.Focused.value && historyLogs.length > 0) {
      return (
        <div className={className.historyList.self}>
          <div className={className.historyList.inner.self}>
            {
              historyLogs.map(result => {
                return renderSearchResult(result);
              })
            }
          </div>
        </div>
      );
    }

    return <></>;
  }

  if (searchState === Enum.SearchState.Focused.value) {
    className.self = twMerge(className.self, "rounded-b-none");
  }

  return (
    <div
    ref={searchBarRef}
    className={className.self}>
      
      <div className="flex items-center p-2">
        <Icon src={leftIcon}/>

        <input 
        ref={searchFieldRef} 
        onKeyUp={onEnter}
        onFocus={onSearchFocus} 
        className="w-full h-full mx-2 text-[#d9d8df]" 
        type="text" 
        placeholder={placeholder} 
        />

        <Icon src={rightIcon}/>
      </div>

      {renderSearchResults()}
    </div>
  );
};

export default SearchBar;