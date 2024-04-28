"use client";

import Content from "@/components/Content"

const InputField = function({
  label="Enter value:",
  center,
  vertical=true,
  horizontal,
  inputType='text'
}) {
  return (
    <Content className="flex justify-center m-2 w-fit">
      <label className='mr-2'>{label}</label>
      <input 
      type={inputType}
      className='bg-[#060606] p-1 rounded mr-2 min-w-[50px]'
      />
    </Content>
  )
}

export default InputField;