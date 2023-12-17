
"use client";

import React from 'react';
import { StatelessButton, StatelessLinkButton, StatefulButton, StatefulLinkButton } from './Buttons/Buttons';
import ButtonGroup from './Buttons/ButtonGroup';
import { usePathname } from 'next/navigation';
import Icon from './Graphics/Icon';
import { StatelessImageButton, StatefulImageButton } from './Buttons/ImageButton';
import DropdownSelection from './Buttons/Dropdown';

const SingleComponent = function({
  
}) {
  const urlPathname = usePathname();


  return (
    <div className="p-5">


      <DropdownSelection
      className={{
        menuItems: {
          self: "text-lg",
          leftIcon: {
            src: "/icons/star_icon.svg",
          },
          __dropdownSelected: {
            leftIcon: {
              src: "/icons/star_fill_icon.svg"
            }
          }
        }
      }}
      >
        <StatelessButton id="one" text="First" leftIcon="/icons/gem_icon.svg" rightIconHovered="/icons/profile_icon.svg">First</StatelessButton>
        <StatelessButton id="two" text="Two">Two</StatelessButton>
        <StatelessButton id="three" text="three">three</StatelessButton>
        <StatefulButton id="four" text="four" rightIconHovered="/icons/profile_icon.svg">four</StatefulButton>
      </DropdownSelection>

      <DropdownSelection>
        <StatelessButton id="one" text="First">First</StatelessButton>
        <StatefulButton id="two" text="Second">Second</StatefulButton>
      </DropdownSelection>

      <DropdownSelection>
        <StatelessButton id="one" text="First">First</StatelessButton>
        <StatefulButton id="two" text="Second">Second</StatefulButton>
      </DropdownSelection>

      <DropdownSelection>
        <StatelessButton id="one" text="First">First</StatelessButton>
        <StatefulButton id="two" text="Second">Second</StatefulButton>
      </DropdownSelection>

      {/* <DropdownUrl>

      </DropdownUrl> */}

    </div>
  );
};

export default SingleComponent;

