/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { SubjectType } from "../../../backend/src/shared/types";
interface CarouselProps {
  data: SubjectType[];
  title: string;
}
const Carousel = ({ data, title }: CarouselProps) => {
  return (
    <>
      <h1 className="font-bold md:text-3xl text-2xl text-center text-purple-950 mb-10">
        {title}
      </h1>
      <div className="flex md:gap-8 lg:gap-16 md:items-center md:justify-center my-2 justify-start overflow-x-scroll gap-2 md:overflow-x-hidden mx-3 md:mx-0 overflow-y-hidden mb-10 scrollbar-none">
        {data?.map((items) => (
          <div className="carouselItem" key={items._id}>
            <div className="cursor-pointer p-3 md:w-[220px] md:h-[300px] w-[170px] h-[260px] bg-slate-50 rounded-md flex flex-col items-center justify-center">
              <Link href={`/semesters/${items._id}`}>
                <img
                  src={items?.backgroundUrl}
                  alt=""
                  className="object-contain"
                />
                <h3 className="mt-3 body-1 font-bold text-slate-900">
                  {items?.title}
                </h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Carousel;
