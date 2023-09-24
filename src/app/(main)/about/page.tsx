import { Metadata } from "next";
import MainAboutMe from "@/components/aboutMe/MainAboutMe";

export const metadata: Metadata = {
  title: "علیرضا عابدی | درباره من",
  description:
    "در این صفحه میتوانید با من و توانایی های من بیشتر آشنا شوید و من را بیشتر بشناسید.",
};

const About = () => {
  return <MainAboutMe />;
};

export default About;
