import Image from "next/image";
import hero from "../../public/assets/heroImage.png";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Features from "./Features";

const Hero = () => {
  return (
    <section className="flex flex-col items-center mt-4 md:mt-0">
      <div className="grid md:grid-cols-2 place-items-center rounded-md px-3 mt-2 mx-auto max-w-[1080px]">
        <div className="text-box text-center md:text-left">
          <h1 className="mb-5 h3 font-medium">
            Empower Your{" "}
            <span className="p-2 bg-purple-950 text-white font-bold">BCA</span>{" "}
            Journey: Powerful Resources for Every Semester
          </h1>
          <p className="body-2 text-muted-foreground">
            Start your Bachelor of Computer Applications (BCA) journey with all
            the necessary tools for each semester. These resources are designed
            to help you with basic and advanced concepts throughout your
            studies.
          </p>
        </div>
        <div className="m-2 border shadow-2xl rounded-xl flex items-center justify-center w-full">
          <Image src={hero} alt="" className="w-[70%] md:w-[90%]" />
        </div>
      </div>

      <div className="flex text-white rounded-xl md:hidden mt-1">
        <Link href={"/semesters"}>
          <Button
            className="flex items-center gap-1 bg-purple-600"
            size={"default"}
          >
            Start Learning
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        </Link>
      </div>

      <Features />
    </section>
  );
};
export default Hero;
