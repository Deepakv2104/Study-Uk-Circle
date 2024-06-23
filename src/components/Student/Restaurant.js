import React from 'react'
import { useParams } from 'react-router-dom'
import * as Tabs from "@radix-ui/react-tabs";

const tabItems = [
  "Menu",
  "Location",
  "Billing",
];

const Restaurant = () => {
    let {restaurantName} = useParams()
  return (
    <div>
        <h1>{restaurantName}</h1>
        <Tabs.Root
    className="max-w-screen-xl  px-0 md:px-8 bg-gray-900"
    defaultValue="Overview"
  >
    <Tabs.List
      className="w-full border-b flex items-center gap-x-3 overflow-x-auto text-l"
      aria-label="Manage your account"
    >
      {tabItems.map((item, idx) => (
        <Tabs.Trigger
          key={idx}
          className="group outline-none py-1.5 border-b-2 border-white text-gray-200 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600"
          value={item}
        >
          <div className="py-1.5 px-3 rounded-lg duration-150 group-hover:text-blue-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium">
            {item}
          </div>
        </Tabs.Trigger>
      ))}
    </Tabs.List>
    {tabItems.map((item, idx) => (
      <Tabs.Content key={idx} className="py-6" value={item}>
        <p className="text-xs leading-normal">
          This is <b>{item}</b> Tab
        </p>
      </Tabs.Content>
    ))}
  </Tabs.Root>
    </div>
  )
}

export default Restaurant