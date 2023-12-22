import { Tab } from "@headlessui/react";
import React from "react";
import { Fragment } from "react";
interface TabProps {
  type: string;
  tabName: any;
  content: any;
}
const UiTab = ({ tabName, type, content }: TabProps) => {
  return (
    <Tab.Group vertical>
      <Tab.List className="border-b">
        {
        tabName.length > 0 && (
          tabName.map((tabTitle: string, index: number) => (
            <Tab key={index} as={Fragment}>
              {({ selected }) => (
                <button
                  className={`px-[30px] py-[5px] text-[18px] text-gray-600 ${
                    selected
                      ? "font-semibold border-b border-orange-500"
                      : "font-regular"
                  }`}
                >
                  {tabTitle}
                </button>
              )}
            </Tab>
          ))

        )
        }
      </Tab.List>
      <Tab.Panels className="p-4">
        <Tab.Panel>
          <div>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div></div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default UiTab;
