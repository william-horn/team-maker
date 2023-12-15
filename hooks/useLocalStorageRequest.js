"use client";

import { useRef, useState } from 'react';
import emptyFunc from '@/util/emptyFunc';

export const useLocalStorageRequest = (key, value) => {
  if (typeof window === "undefined") return [emptyFunc, emptyFunc];

  let dataRef = useRef(value);
  const saved = JSON.parse(localStorage.getItem(key));

  if (saved) {
    dataRef.current = saved;
    
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const updater = (func) => {
    const updated = func(dataRef.current);

    localStorage.setItem(key, JSON.stringify(updated));
    dataRef.current = updated;
  }

  const getter = (domain) => {
    if (domain) {
      return dataRef.current[domain] || [];
    } else {
      return dataRef.current;
    }
  }

  return [getter, updater];
}

export const useLocalStorageState = (key, value) => {
  if (typeof window === "undefined") return [emptyFunc, emptyFunc];

  const saved = JSON.parse(localStorage.getItem(key));
  const [savedData, setSavedData] = useState(saved || value);

  if (!saved) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  const updater = (func) => {
    setSavedData(prev => {
      const updated = func(prev);
      localStorage.setItem(key, JSON.stringify(updated));
      return updated;
    });
  }

  const getter = (domain) => {
    if (domain) {
      return savedData[domain] || [];
    } else {
      return savedData;
    }
  }

  return [getter, updater];
}

