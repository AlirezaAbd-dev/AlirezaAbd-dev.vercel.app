'use client';

import { ObjectId } from 'mongoose';
import { ReactNode, useEffect } from 'react';
import { create } from 'zustand';

export type Store = {
   data: AllDataType | undefined;
   setAllData: (data: AllDataType | undefined) => void;
};

export type AllDataType = {
   name: string;
   yearOfBirth: number;
   city: string;
   email: string;
   phone: string;
   introductions: { text: string; _id: ObjectId }[];
   skills: { _id: string; name: string; rate: number }[];
   educations: {
      _id: string;
      certificate: string;
      duration: string;
      major: string;
      university: string;
   }[];
   projects: {
      _id: string;
      name: string;
      image: string;
      reference: string;
   }[];
};

export const useStore = create<Store>()((set) => ({
   data: undefined,
   setAllData(data) {
      set({ data });
   },
}));

export const StoreContainer = (props: {
   data: AllDataType | undefined;
   children: ReactNode;
}) => {
   const setAllData = useStore((state) => state?.setAllData);

   useEffect(() => {
      setAllData(props.data);
   }, [props.data, setAllData]);

   return props.children;
};
