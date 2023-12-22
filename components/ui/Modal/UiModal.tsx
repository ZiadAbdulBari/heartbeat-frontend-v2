import { Children, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
interface ModalProps {
  isModalOpen: boolean;
  title: string;
  data: any;
  setIsModalOpen: (arg: boolean) => any;
  children:React.ReactNode
}
const UiModal = ({ isModalOpen, setIsModalOpen, data, title,children }: ModalProps) => {
  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="absolute top-0 left-0 h-screen w-full z-10">
      <div className="w-full bg-stone-950/[.5] h-screen z-20">
        <Dialog.Panel className="bg-gray-50 absolute top-[50%] left-[50%] -translate-y-[50%] -translate-x-[50%] h-[70vh] w-[50%]  rounded-[20px] z-40">
          <div>
            <div className="flex justify-between bg-blue rounded-t-[20px] p-[15px]">
              <div className="title">
                <Dialog.Title className="font-semibold text-[22px] text-white">{title}</Dialog.Title>
              </div>
              <div className="close cursor-pointer" onClick={() => setIsModalOpen(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="30" height="30">
                  <path
                    d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                    className="fill-red"
                  ></path>
                </svg>
              </div>
            </div>
            <div className='p-[30px]'>{children}</div>
            <button onClick={() => setIsModalOpen(false)}></button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UiModal;

