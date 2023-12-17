
"use client";

import React from 'react';
import { StatelessButton, StatelessLinkButton, StatefulButton, StatefulLinkButton } from './Buttons/Buttons';
import ButtonGroup from './Buttons/ButtonGroup';
import { usePathname } from 'next/navigation';
import Icon from './Graphics/Icon';
import { StatelessImageButton, StatefulImageButton } from './Buttons/ImageButton';

const SingleComponent = function({
  
}) {
  const urlPathname = usePathname();


  return (
    <div className="p-5">

    {/* <StatelessButton onClick={data=>console.log(data)} something="lol">Something</StatelessButton> */}

    {/* <ButtonGroup
    onClick={data => console.log("GROUP CLICK: ", data)}
    onSelect={data=>console.log("GROUP SELECT: ", data)}
    onUnselect={data=>console.log("GROUP UNSELECT: ", data)}
    rightIcon="/icons/favorite_icon.svg"
    rightIconSelected="/icons/search_icon.svg"
    >
      <StatefulButton 
      id="one" 
      onClick={data=>{console.log(data); return true} } 
      // onUnselect={data=>{console.log("unselected: ", data); return true}}
      >
        Tester
      </StatefulButton>
    </ButtonGroup> */}

    <ButtonGroup onClick={() => console.log("GROUP CLICK LOL")}>
      <StatefulLinkButton id="1" href="/">Howdy Partner</StatefulLinkButton>
      <StatefulLinkButton id="2" href="/test-page">Howdy Friend</StatefulLinkButton>
    </ButtonGroup>


    <StatefulButton>Test</StatefulButton>

    {/* <ButtonGroup>
      <StatefulButton id="one" rightIcon="/icons/search_icon.svg" rightIconSelected="/icons/star_icon.svg" rightIconHovered="/icons/star_fill_icon.svg">
        Hey There
      </StatefulButton>
      <StatefulButton id="two" rightIcon="/icons/search_icon.svg" rightIconSelected="/icons/star_icon.svg" rightIconHovered="/icons/star_fill_icon.svg">
        Hey There
      </StatefulButton>
      <StatefulButton onSelect={() => console.log("selected")} id="three" rightIcon="/icons/search_icon.svg" rightIconSelected="/icons/star_icon.svg" rightIconHovered="/icons/star_fill_icon.svg">
        Hey There
      </StatefulButton>
    </ButtonGroup>

    <StatefulButton onSelect={() => console.log("selected")} id="three" rightIcon="/icons/search_icon.svg" rightIconSelected="/icons/star_icon.svg" rightIconHovered="/icons/star_fill_icon.svg">
        Hey There
      </StatefulButton> */}
    
    
    {/* <StatelessImageButton
    onClick={() => console.log("clicked")}
    srcHovered="/icons/favorite_icon.svg"
    src="/icons/close_icon.svg"
    />

    <StatefulImageButton
    srcSelected="/icons/search_icon.svg"
    srcHovered="/icons/favorite_icon.svg"
    src="/icons/close_icon.svg"
    onClick={() => console.log("clicked")}
    /> */}



    {/* <ButtonGroup
    defaultSelect={["two"]}
    selectionLimit={1}
    unselectLastChoice
    rightIconSelected="/icons/star_icon.svg"
    >
      <StatefulButton 
      id="one"
      onClick={data => console.log(data)}
      rightIconHovered="/icons/history_icon.svg"
      rightIconSelected="/icons/label_icon.svg"
      rightIcon="/icons/search_icon.svg">
        Hover Test
      </StatefulButton>

      <StatelessLinkButton 
      id="two"
      href="/" 
      rightIcon="/icons/profile_icon.svg"
      rightIconHovered="/icons/star_fill_icon.svg"
      state={{__hovered: true}}
      onClick={data=>console.log("link data: ", data)}>
        Link test
      </StatelessLinkButton>

      <StatelessButton 
      id="three"
      // state={{__selected: true}}
      onClick={data => console.log("stateless: ", data)}>
        Stateless
      </StatelessButton>

      <StatefulLinkButton 
      className={{
        __selected: {
          self: "bg-green-500 hover:bg-green-400"
        }
      }}
      id="four"
      rightIconHovered="/icons/search_icon.svg"
      // rightIconSelected="/icons/search_icon.svg"
      onClick={data=> console.log("stateful link: ", data)}
      href="/test-page">
        Stateful Link
      </StatefulLinkButton>
    </ButtonGroup>

    <ButtonGroup
    leftIcon="/icons/star_icon.svg"
    leftIconSelected="/icons/star_fill_icon.svg"
    className={{
      buttons: {
        __selected: {
          self: "bg-green-500 hover:bg-green-400"
        }
      }
    }}
    >
      <StatefulLinkButton id="home" href="/home">Home</StatefulLinkButton>
      <StatefulLinkButton id="about" href="/about">About</StatefulLinkButton>
      <StatefulLinkButton id="learn" href="/learn">Learn</StatefulLinkButton>
    </ButtonGroup> */}
      
    </div>
  );
};

export default SingleComponent;

