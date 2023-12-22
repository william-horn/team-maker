"use client";

import Button from "./Buttons/Button";
import Text from "./Typography/Text";
import Icon from "./Graphics/Icon";
import Heading from "./Typography/Heading";
import ButtonGroup from "./Buttons/ButtonGroup";
import ImageButton from "./Buttons/ImageButtons";
import Dropdown from "./Buttons/DropdownSelection";
import Quantifier from "./Buttons/Quantifier";
import SearchBar from "./Searchbar";
// import Form from "./Form";

const ClientComponent = ({ children }) => {

  const onSelect = (choice) => {
    // console.log("choice: ", choice);
  }

  return (
    <div className="p-5">

      
      <Quantifier
      className={{self: "inline-flex"}}
      increment={1}
      defaultValue={0}
      upperLimit={100000}
      lowerLimit={-100000}
      />

      <div className="h-[10px] my-5 w-full bg-black"></div>

      <div className="flex gap-2">
        <Dropdown
        placeholder="Category"
        rightIconUnselected="/icons/arrow_down_icon.svg"
        rightIconSelected="/icons/arrow_up_icon.svg"
        leftIconUnselected="/icons/search_icon.svg"
        leftIconSelected="/icons/search_icon.svg"
        itemData={{
          "packs": { value: 0, text: "Packs" },
          "creatures": { value: 0, text: "Creatures" },
          "chests": { value: 0, text: "Chests" },
          "plants": { value: 0, text: "Plants" },
          "all": { value: 0, text: "All" },
        }}
        className={{
          menuButton: {
            self: "min-w-[10rem] justify-center gap-1"
          },
        }}
        >
          <Dropdown.Item id="all">All</Dropdown.Item>
          <Dropdown.Item id="packs">Packs</Dropdown.Item>
          <Dropdown.Item id="creatures">Creatures</Dropdown.Item>
          <Dropdown.Item id="chests">Chests</Dropdown.Item>
          <Dropdown.Item id="plants">Plants</Dropdown.Item>
        </Dropdown>
        
        <SearchBar
        displayHistorySize={50}
        displayResultsSize={50}
        className={{ self: "xl:w-[25rem] lg:w-[20rem] sm:w-[18rem] w-[13rem]" }}
        />
      </div>

      <div className="h-[10px] my-5 w-full bg-black"></div>

      <div className="w-[30%] mx-auto">
        <SearchBar 
        displayHistorySize={5}
        displayResultsSize={100}
        // historyResultIcon="/icons/history_icon.svg"
        // searchResultIcon="/icons/search_icon.svg"
        />
      </div>

      <div className="h-[10px] my-5 w-full bg-black"></div>

      <Text className={{ self: "inline" }}>Wand Drops: </Text>
      <Quantifier
      className={{self: "inline-flex"}}
      increment={1}
      defaultValue={0}
      upperLimit={100000}
      lowerLimit={-100000}
      />

      <div className="h-[10px] my-5 w-full bg-black"></div>

      <Text className={{ self: "inline" }}>Please select a number: </Text>
      <Quantifier
      className={{self: "inline-flex"}}
      increment={9}
      defaultValue={5}
      upperLimit={100000}
      lowerLimit={-100000}
      />

      <div className="h-[10px] my-5 w-full bg-black"></div>

      <ButtonGroup
      mode="checkbox"
      selectionLimit="2"
      defaultSelect={["two"]}
      unselectLastChoice
      onSelect={onSelect}
      rightIconUnselected="/icons/arrow_down_icon.svg"
      rightIconSelected="/icons/arrow_up_icon.svg"
      // itemPreset={buttonPreset1}
      className={{
        self: "gap-1",
        selectButton: {
          self: "bg-green-500",
          __selected: {
            self: "bg-red-500"
          }
        },
        checkboxButton: {
          self: "transition-all bg-transparent",
          __selected: {
            self: "bg-red-500"
          }
        }
      }}
      itemData={{
        "one": { value: "uno" },
        "two": { value: "dos" },
        "three": { value: "tres" },
        "four": { value: "quatro" },
      }}
      >
        <ButtonGroup.Button id="one">Lorem ipsum dolor sit amet.</ButtonGroup.Button>
        <ButtonGroup.Button id="two">Lorem ipsum dolor sit amet.</ButtonGroup.Button>
        <ButtonGroup.Button id="three">Lorem ipsum dolor sit amet consectetur.</ButtonGroup.Button>

        <ButtonGroup.Button id="four">
          Choice Four
        </ButtonGroup.Button>

      </ButtonGroup>

      <div className="h-[10px] my-5 w-full bg-black"></div>

      <Text>Hello, world! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem, consequuntur.</Text>
      
      <Button
      onSelect={onSelect}
      className={{
        self: "bg-blue-500",
        __selected: {
          self: "bg-red-500"
        }
      }}>
        Fun Button
      </Button>

      <Button className={{self: "flex"}}>Just a Normal Button</Button>

      <Button rightIcon="/icons/arrow_down_icon.svg">Menu</Button>

      <Heading className={{self: "font-bold"}}>Some Heading</Heading>
      <Text>Some paragraph test</Text>

      <Button href="https://www.youtube.com">YouTube</Button>

      <div className="h-[10px] my-5 w-full bg-black"></div>

      <Dropdown
      mode="select"
      hideMenuOnBlur={true}
      toggleOnHover={false}
      toggleOnClick={true}
      // placeholder="Select State"
      // defaultSelect="two"
      defaultValue="def"
      rightIconUnselected="/icons/arrow_down_icon.svg"
      rightIconSelected="/icons/trash_icon.svg"
      className={{
        list: {
          self: "overflow-y-scroll w-[200%]"
        },  
        menuButton: {
          __selected: {
            self: "rounded-b-none"
          }
        }
      }}
      itemData={{
        "one": { value: "uno", text: "Item One" },
        "two": { value: "dos", text: "Item Two" },
        "three": { value: "tres", text: "Item Three" },
        "four": { value: "quatro", text: "Item Four" },
        "five": { value: "sinco", text: "Item Five" },
      }}>
        <Dropdown.Item id="one">Item One</Dropdown.Item>
        <Dropdown.Item id="two">Item Two</Dropdown.Item>
        <Dropdown.Item id="three">Item Three</Dropdown.Item>
        <Dropdown.Item id="four">Item Four</Dropdown.Item>
        <Dropdown.Item id="five">Item Five</Dropdown.Item>
      </Dropdown>

      <Text className={{ self: "inline" }}>Would you like to continue (Yes/No)? </Text>
      <ButtonGroup
      mode="checkbox"
      selectionLimit={1}
      unselectLastChoice
      className={{
        self: "flex-row inline-flex"
      }}
      itemData={{
        "yes": { value: true },
        "no": { value: false }
      }}
      >
        <ButtonGroup.Button id="yes" className={{ text: { self: "text-green-500" }}}>Yes</ButtonGroup.Button>
        <ButtonGroup.Button id="no" className={{ text: { self: "text-red-500" }}}>No</ButtonGroup.Button>
      </ButtonGroup>


      <Dropdown
      mode="weblink"
      hideMenuOnBlur={true}
      toggleOnHover={true}
      toggleOnClick={true}
      // placeholder="Select State"
      // defaultSelect="two"
      defaultValue="def"
      rightIconUnselected="/icons/arrow_down_icon.svg"
      rightIconSelected="/icons/trash_icon.svg"
      className={{
        list: {
          self: "overflow-y-scroll w-[200%]"
        },  
        menuButton: {
          __selected: {
            self: "rounded-b-none"
          }
        }
      }}
      itemData={{
        "one": { value: "uno", text: "Item One" },
        "two": { value: "dos", text: "Item Two" },
        "three": { value: "tres", text: "Item Three" },
        "four": { value: "quatro", text: "Item Four" },
        "five": { value: "sinco", text: "Item Five" },
      }}>
        <Dropdown.Item id="one" href="https://www.youtube.com">Item One</Dropdown.Item>
        <Dropdown.Item id="two" href="https://www.youtube.com">Item Two</Dropdown.Item>
        <Dropdown.Item id="three" href="https://www.youtube.com">Item Three</Dropdown.Item>
        <Dropdown.Item id="four" href="https://www.youtube.com">Item Four</Dropdown.Item>
        <Dropdown.Item id="five" href="https://www.youtube.com">Item Five</Dropdown.Item>
      </Dropdown>

{/* 
      <Button>Normal</Button>

      <Button className={{__selected: { self: " text-error" }}}>
        Something
      </Button> */}

      {/* <Button
      className={{
        self: "text-green-500", 
        inner: {
          self: "p-0"
        }}}
      >
        Something
      </Button> */}

    </div>
  );
};

export default ClientComponent;