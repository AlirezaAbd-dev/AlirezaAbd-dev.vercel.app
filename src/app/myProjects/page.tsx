import { Metadata } from "next";
import MainMyProject from "@/components/myProjects/MainMyProject";

export const metadata: Metadata = {
  title: "علیرضا عابدی | پروژه های من",
  description: `در این صفحه میتوانید پروژه هایی که توسط من ساخته شده را ببینید و برای
  دیدن جزئیات بیشتر میتوانید با کلیک روی دکمه اطلاعات بیشتر وارد
  ریپازیتوری پروژه در گیتهاب شوید.`,
};

const MyProjects = () => {
  return <MainMyProject />;
};

export default MyProjects;
