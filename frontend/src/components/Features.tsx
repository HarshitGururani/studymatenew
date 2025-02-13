import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Features = () => {
  return (
    <section className="my-16">
      <div>
        <h1 className="text-3xl mb-8 flex items-center justify-center font-bold">
          Features
        </h1>
        <div className=" flex flex-col md:flex-row md:gap-6 gap-2 items-center">
          <div className="h-[16rem] w-[22rem] border-2 border-[rgba(75,30,133,0.52)] rounded-xl bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-4 flex justify-center flex-col gap-3 backdrop-blur-[12px] shadow-md">
            <div>
              <h1 className="text-lg md:text-xl font-medium mb-4 ">
                Comprehensive Semester-wise Resources
              </h1>
              <p className="text-sm">
                Access a well-organized repository of resources tailored for
                each semester of your BCA program at SSJU
              </p>
            </div>

            <Link
              href={"/semesters"}
              className="h-fit w-fit px-[1rem] py-[0.25rem] border-[1px] rounded-full flex justify-center items-center gap-2 overflow-hidden backdrop-blur-[12px]"
            >
              <p>Explore</p>
              <ArrowRight className="size-5" />
            </Link>
          </div>

          <div className=" flex flex-col md:flex-row gap-6 md:gap-32 items-center ">
            <div className="h-[16rem] w-[22rem] border-2 border-[rgba(75,30,133,0.52)] rounded-xl bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-4 flex justify-center flex-col gap-3 backdrop-blur-[12px] shadow-md">
              <div>
                <h1 className="text-lg md:text-xl font-medium mb-4 ">
                  PYQ, and Recommended YouTube Channels
                </h1>
                <p className="text-sm">
                  Access well-organized notes previous year questions for each
                  subject. Get top YouTube channel recommendations to complement
                  your learning.
                </p>
              </div>
            </div>
          </div>

          <div className=" flex flex-col md:flex-row gap-6 md:gap-32 items-center ">
            <div className="h-[16rem] w-[22rem] border-2 border-[rgba(75,30,133,0.52)] rounded-xl bg-gradient-to-br from-[rgba(75,30,133,1)] to-[rgba(75,30,133,0.01)] text-white font-nunito p-4 flex justify-center flex-col gap-3 backdrop-blur-[12px] shadow-sm">
              <div>
                <h1 className="text-lg md:text-xl font-medium mb-4 ">
                  Comprehensive Semester-wise Resources
                </h1>
                <p className="text-sm">
                  Access a well-organized repository of resources tailored for
                  each semester of your BCA program at SSJU
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Features;
