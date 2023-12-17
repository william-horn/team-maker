
"use client";

import React from 'react';
import { StatelessButton, StatelessLinkButton, StatefulButton, StatefulLinkButton } from './Buttons/Buttons';
import ButtonGroup from './Buttons/ButtonGroup';
import { usePathname } from 'next/navigation';
import Icon from './Graphics/Icon';
import { StatelessImageButton, StatefulImageButton } from './Buttons/ImageButton';
import DropdownSelection from './Buttons/DropdownV2';

const SingleComponent = function({
  
}) {
  const urlPathname = usePathname();


  return (
    <div className="p-5">


      <DropdownSelection>
        <StatelessButton id="one">First</StatelessButton>
        <StatefulButton id="two">Second</StatefulButton>
      </DropdownSelection>

      {/* <DropdownUrl>

      </DropdownUrl> */}

    </div>
  );
};

export default SingleComponent;

