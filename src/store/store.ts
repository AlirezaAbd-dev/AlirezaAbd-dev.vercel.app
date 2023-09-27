'use client';

import axios from 'axios';
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
   introductions: { text: string; _id: ObjectId }[];
   skills: { _id: ObjectId; name: string; rate: number }[];
   educations: {
      _id: ObjectId;
      certificate: string;
      duration: string;
      major: string;
      university: string;
   }[];
   projects: {
      _id: ObjectId;
      name: string;
      image: string;
      reference: string;
   }[];
};

async function getAllData() {
   const response = await axios.get('http://localhost:3000/api/all');
   return response.data as AllDataType;
}

// const data = await getAllData();
// console.log(data);
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
   }, []);

   return props.children;
};
