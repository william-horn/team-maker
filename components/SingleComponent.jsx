
"use client";

import React from 'react';
import { StatelessButton, StatelessLinkButton, StatefulButton, StatefulLinkButton } from './Buttons/Buttons';
import ButtonGroup from './Buttons/ButtonGroup';
import { usePathname } from 'next/navigation';
import Icon from './Graphics/Icon';
import { StatelessImageButton, StatefulImageButton } from './Buttons/ImageButton';
import DropdownSelection from './Buttons/Dropdown';
import Text from './Typography/Text';
import Quantifier from './Buttons/Quantifier';
import Heading from './Typography/Heading';
import SearchBar from './Searchbar';

const SingleComponent = function({
  
}) {


  return (
    <div className="p-5">
      <Heading>Header</Heading>
      <SearchBar
      displayHistorySize={50}
      displayResultsSize={50}
      />

    </div>
  );
};

export default SingleComponent;

