
import Enum from "@/enum";
import { v4 as uuidv4 } from 'uuid';
import { escapeRegex } from "./escapeRegex";

const getTagData = (results, type, resultSource) => {
  let strStart = 0;
  const tagData = [];

  for (let matchData of results) {
    const matchLength = matchData[0].length;
    const endAnchor = matchData.index + matchLength;

    const chunk = resultSource.substring(strStart, matchData.index + matchLength);
    const before = chunk.substring(0, chunk.length - matchLength);
    const now = chunk.substring(chunk.length - matchLength);

    if (before) {
      tagData.push({
        matched: false,
        type: Enum.SearchMatchType.Normal,
        source: before,
        key: uuidv4(),
      })
    }

    tagData.push({
      matched: true,
      type,
      source: now,
      key: uuidv4(),
    });

    strStart = endAnchor;
  }

  if (strStart > 0 && strStart < resultSource.length) {
    tagData.push({
      matched: false,
      type: Enum.SearchMatchType.Normal,
      source: resultSource.substring(strStart, resultSource.length),
      key: uuidv4(),
    })
  }

  return tagData;
}

export const filterSearchResults = (searchResults, searchInput) => {
  const results = [];

  for (let key in searchResults) {
    const result = searchResults[key];

    const resultData = {
      // priority: 3, 
      source: result, 
      tags: [] 
    };

    // If search input matches the result string from the beginning
    if (result.substring(0, searchInput.length) === searchInput) {
      resultData.tags = [
        { 
          matched: true, 
          type: Enum.SearchMatchType.FirstMatch, 
          source: searchInput,
          key: "0",
        },
        { 
          matched: false, 
          type: Enum.SearchMatchType.Normal, 
          source: result.substring(searchInput.length),
          key: "1",
        }
      ];

      resultData.priority = 3;
      results.push(resultData);

      continue;
    }

    // If the search input is a word/phrase (or several) in the result string
    resultData.tags = getTagData(
      result.matchAll(new RegExp(`\\b${escapeRegex(searchInput)}\\b`, 'g')),
      Enum.SearchMatchType.WordMatch,
      result
    );

    if (resultData.tags.length > 0) {
      resultData.priority = 2;
      results.push(resultData);

      continue;
    }

    // If the result string matches ANY occurrence of the search input
    resultData.tags = getTagData(
      result.matchAll(new RegExp(escapeRegex(searchInput), 'g')),
      Enum.SearchMatchType.AnyMatch,
      result
    );

    if (resultData.tags.length > 0) {
      resultData.priority = 1;
      results.push(resultData);

      continue;
    }
  }

  return results;

}