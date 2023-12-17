
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
      placeholder='First 1'
      defaultData={{
        id: "one",
        text: "First",
        value: 100
      }}
      toggleOnHover
      className={{
        dropButton: {
          leftIcon: {
            src: "/icons/search_icon.svg"
          },
          rightIcon: {
            src: "fill"
          }
        },
        menuItems: {
          self: "",
          leftIcon: {
            // src: "/icons/star_icon.svg",
          },
          __dropdownSelected: {
            leftIcon: {
              // src: "/icons/star_fill_icon.svg"
            }
          }
        }
      }}
      >
        <StatelessButton id="one" text="First" value={100} rightIconHovered="/icons/profile_icon.svg">First</StatelessButton>
        <StatelessButton id="two" text="Two" value={200}>Two</StatelessButton>
        <StatelessButton id="three" text="three" value={300}>three</StatelessButton>
        <StatefulButton id="four" text="four" value={400}>four</StatefulButton>
      </DropdownSelection>
{/* 
      <DropdownSelection defaultSelect="one">
        <StatelessButton id="one" text="First">First</StatelessButton>
        <StatefulButton id="two" text="Second">Second</StatefulButton>
      </DropdownSelection>

      <DropdownSelection defaultSelect="one"> 
        <StatelessButton id="one" text="First">First</StatelessButton>
        <StatefulButton id="two" text="Second">Second</StatefulButton>
      </DropdownSelection>

      <DropdownSelection defaultSelect="one">
        <StatelessButton id="one" text="First">First</StatelessButton>
        <StatefulButton id="two" text="Second">Second</StatefulButton>
      </DropdownSelection> */}

      {/* <DropdownUrl>

      </DropdownUrl> */}

    </div>
  );
};

export default SingleComponent;

