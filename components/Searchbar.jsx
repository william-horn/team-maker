
"use client";

import { twMerge } from "tailwind-merge";
import Icon from './Graphics/Icon';
import stringIsEmpty from '@/util/stringIsEmpty';
import Button from './Buttons/Button';
import removeExtraWhitespace from '@/util/removeExtraWhitespace';
import { useLocalStorageRequest, useLocalStorageState } from '@/hooks/useLocalStorageRequest';
import { filterSearchResults } from "@/util/filterSearchResults";
import Enum from '../enum';
import { v4 as uuidv4 } from 'uuid';
import { useState, useRef, useEffect } from 'react';
import mergeClass from '@/util/mergeClass';
import emptyFunc from "@/util/emptyFunc";
import Text from "./Typography/Text";
import ImageButton from './Buttons/ImageButton';

const SearchBar = ({
  className: importedClassName={},
  placeholder="Search...", 

  onSearch=search => console.log('searched for: ', search),
  onHistoryResultIconClick=emptyFunc,

  historyDomain=Enum.StorageKeys.SearchHistoryDomain.Primary.value,

  historySize=100,
  displayResultsSize=3,
  displayHistorySize=3,

  // historyResultIcon,
  // searchResultIcon,

  leftIcon="/icons/search_icon.svg",
  rightIcon,
}) => {
  // Get search history getters/setters for local storage
  const [getSearchHistory, updateSearchHistory] = useLocalStorageState(
    Enum.StorageKeys.SearchHistory.value, { [historyDomain]: [] }
  );

  // Create search state for when the search bar is interacted with
  const [searchState, setSearchState] = useState(Enum.SearchState.Idle.value);
  const [searchInput, setSearchInput] = useState("");
  const searchBarRef = useRef(null);
  const searchFieldRef = useRef(null);

  // Force unfocus on search bar
  const unfocusSearch = () => {
    searchFieldRef.current.blur();
    searchFieldRef.current.value = removeExtraWhitespace(searchFieldRef.current.value);

    setSearchState(Enum.SearchState.Idle.value);
  }

  // When search bar is unfocused
  const onSearchUnfocus = (event) => {
    event.stopPropagation();

    if (!searchBarRef.current.contains(event.target)) {
      unfocusSearch();
      return;
    }
  }

  // Window events for detecting when using is unfocusing the search bar
  // todo: centralize this logic in the top level component, and pass a callback to handle this instead of making a new event listener
  //* important: when using more than one search bar, you may get repeating messages in output window. this is okay for now.
  useEffect(() => {
    window.addEventListener('mousedown', onSearchUnfocus);
    // window.addEventListener('blur', unfocusSearch);
    return () => {
      return window.removeEventListener('mousedown', onSearchUnfocus);
      // window.removeEventListener('blur', unfocusSearch);
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
    setSearchInput(result);
    filterSearch(result);
  }

  // When a search is submitted in the search bar
  const onEnter = (event) => {
    if (event.key === Enum.Keys.Enter.value) {
      // filterSearch(searchFieldRef.current.value);
      filterSearch(searchInput);
    }
  }

  let className = {
    self: "relative rounded bg-search-bar",

    searchTextbox: {
      self: "w-full h-full mx-2 text-search-bar-result"
    },

    historyList: {
      self: "absolute w-full rounded-b-md top-full z-[1000] bg-search-bar",
      inner: {
        self: "px-3 py-2 overflow-y-auto max-h-[200px]",
        resultButton: {
          //text-search-bar-result bg-search-bar-result hover:bg-search-bar-result-hover
          self: "w-full text-left text-search-bar-result bg-search-bar-result font-medium transition-colors duration-200 rounded hover:bg-search-bar-result-hover items-center hover:underline",
        },
        historyResult: {
          self: "italic text-[#dbdbdb]"
        },
        databaseResult: {},
      }
    },

    __selected: {
      self: "rounded-b-none"
    }
  }

  className = mergeClass(
    className,
    importedClassName,
    { 
      _isSelected: searchState === Enum.SearchState.Focused.value
        || searchState === Enum.SearchState.Typing.value 
    }
  );

  // Render out a single search result
  const renderSearchResult = (resultData) => {
    const key = uuidv4();
    
    return (
      <div key={key} className="flex">
        {
          resultData.type === Enum.SearchResultType.History.value
            ? <ImageButton
              onClick={() => {
                updateSearchHistory(prev => {
                  let finalResults = prev[historyDomain];
                  
                  finalResults.splice(
                    finalResults.indexOf(resultData.source), 
                    1
                  );
      
                  return {...prev, [historyDomain]: finalResults }
                });
              }}
              className={{
                self: "hover:bg-transparent",
                inner: {
                  self: "hover:bg-button-hover-primary hover:rounded"
                }
              }}
              hoverImage="/icons/trash_icon.svg"
              src="/icons/history_icon.svg"
              />
            : <ImageButton
              onClick={() => onSearchResultQuery(resultData.source)}
              className={{
                self: "hover:bg-transparent",
                inner: {
                  self: "hover:bg-button-hover-primary hover:rounded"
                }
              }}
              src="/icons/search_icon.svg"
              />
        }
        <Button 
        key={key}
        onClick={() => onSearchResultQuery(resultData.source)}
        className={
          mergeClass(
            className.historyList.inner.resultButton, 
            resultData.type === Enum.SearchResultType.History.value 
              ? className.historyList.inner.historyResult
              : className.historyList.inner.databaseResult
          )
        }>
          {
            resultData.tags.map(tagData => {
              switch (tagData.type) {
                case Enum.SearchMatchType.FirstMatch:
                  return <span key={tagData.key} className="text-[#d58eff]">{tagData.source}</span>

                case Enum.SearchMatchType.WordMatch:
                  return <span key={tagData.key} className="text-[#fff7b9]">{tagData.source}</span>

                case Enum.SearchMatchType.AnyMatch:
                  return <span key={tagData.key} className="text-[#8effdb]">{tagData.source}</span>

                case Enum.SearchMatchType.Normal:
                  return <span key={tagData.key}>{tagData.source}</span>
              }
            })
          }
        </Button>
      </div>
    );
  };

  //* EXPENSIVE function
  const getSearchResults = () => {
    // pull from search result arrays
    const historyLogs = (getSearchHistory(historyDomain) || []);
    const otherLogs = [
      "testing",
      "this is some test seed data",
      "where do i find the nearest mall",
      "malistare's boots of wissom",
      "moolinda woo's robe of song",
      "dragonspyre's cap of mourning",
      "stormkeeper's staff",
      "where do i find stats page?",
      "is this a new website",
      "who created this website?",
      "can i hack on this game",
      "where might i find the final boss?",
      "boss fights",
      "pack drops",
      "minion drops",
      "what minions drop aeon gear?"
    ]; 

    // convert search result arrays to arrays of result data
    const historyResults = filterSearchResults(
      historyLogs, 
      searchInput,
      Enum.SearchResultType.History.value
    )
    .slice(0, displayHistorySize)
    .sort((a, b) => b.priority - a.priority);

    const otherResults = filterSearchResults(
      otherLogs,
      searchInput,
      Enum.SearchResultType.Database.value
    ).sort((a, b) => b.priority - a.priority);

    // compile all result data arrays down to one, and sort by search match type
    const allResults = [
      ...historyResults,
      ...otherResults
    ]
    .slice(0, displayResultsSize)
    // .sort((a, b) => b.priority - a.priority);

    return allResults;
  }

  // The drop-down search results when the search bar is focused
  const renderSearchResults = () => {
    if ((searchState === Enum.SearchState.Focused.value || searchState === Enum.SearchState.Typing.value)) {
      const searchResults = getSearchResults();
      
      return (
        <div className={className.historyList.self}>
          <div className={className.historyList.inner.self}>
            { 
              searchResults.length > 0
                ? searchResults.map(renderSearchResult)
                : <Text className={{ self: "italic pt-2 text-xs" }}>No matches found for this search</Text>
            }
          </div>
        </div>
      );
    }

    return <></>;
  }

  const onSearchTyping = () => {
    setSearchState(Enum.SearchState.Typing.value);
    setSearchInput(searchFieldRef.current.value);
  }

  // if (searchState === Enum.SearchState.Focused.value) {
  //   className.self = twMerge(className.self, "rounded-b-none");
  // }

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
        onChange={onSearchTyping}
        className={className.searchTextbox.self}
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