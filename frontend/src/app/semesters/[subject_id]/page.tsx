/* eslint-disable @next/next/no-img-element */
"use client";
import ContentWrapper from "@/components/ContentWrapper";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import * as apiClient from "../../../apiClient";
import Image from "next/image";
import Link from "next/link";
import PdfViewer from "@/components/PdfViewer";
import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";

const SubjectDetails = () => {
  const router = useRouter();
  const { isLoggedIn } = useAppContext();
  const { subject_id } = useParams();

  useEffect(() => {
    if (!isLoggedIn) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
      }
      router.push("/sign-in");
    }
  }, [isLoggedIn, router]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["subject", subject_id],
    queryFn: () => apiClient.subject(subject_id as string),
    enabled: !!subject_id,
  });

  if (!data) {
    return;
  }

  if (isLoading)
    return <p className="flex items-center justify-center">Loading...</p>;
  if (isError) return <p className="text-destructive">Error loading subject</p>;

  return (
    <div className="w-full pt-[20px] mb-12 md:mb-0 md:pt-6 md:min-h-[700px]">
      <ContentWrapper>
        <div className="flex flex-col gap-6 md:flex-row md:gap-12">
          <div className="flex-shrink-0 md:ml-0 ">
            <div className="p-3">
              <div className="relative w-[60%] md:w-full md:max-w-[390px] aspect-[3/2] ">
                <img
                  src={data.backgroundUrl}
                  alt={`Image of ${data.title}`}
                  className="w-[80%] md:w-full block rounded-xl md:max-w-[360px]"
                />
              </div>
            </div>
            {data.pdf && (
              <div className="flex flex-col items-start md:items-center justify-center gap-4 ml-6 md:ml-0 mt-3 scroll-smooth">
                <Link
                  href={"#pdf"}
                  className="btn w-[140px] h-[40px] scroll-smooth"
                >
                  Pdf
                </Link>
              </div>
            )}
          </div>
          <div className="flex justify-center flex-col">
            <div className="title text-gray-950 text-3xl leading-10 md:leading-[44px] mb-2 font-bold ml-1">
              {data.title}
            </div>
            <div className="subtext text-[14px] md:text-lg leading-6 text-slate-700 mb-12 ml-3">
              {data.text}
            </div>

            {data.videoLink && data.url && data.channelName && (
              <div className="flex flex-col ml-1">
                <h4 className="text-purple-700 h6 font-semibold font-grotesk">
                  Recommended {data.title} Learning Playlists
                </h4>
                <ul className="ml-2 md:ml-10 mt-2">
                  <li className="flex items-center gap-1 mb-4">
                    {data.url[0] && (
                      <>
                        <Image
                          src={data.url[0]}
                          alt=""
                          className="rounded-full w-10 aspect-square"
                          width={40}
                          height={40}
                        />
                        <a
                          href={data?.videoLink?.[0]}
                          target="_blank"
                          className="text-lg"
                        >
                          {data.channelName[0]}
                        </a>
                      </>
                    )}
                  </li>
                  <li className="flex items-center gap-1">
                    {data.url[1] && (
                      <>
                        <Link
                          href={data?.videoLink?.[1]}
                          target="_blank"
                          className={`${
                            data?.videoLink?.[1] ? "block" : "hidden"
                          } text-lg flex items-center`}
                        >
                          <Image
                            src={data.url[1]}
                            alt=""
                            width={"40"}
                            height={"40"}
                            className={`${
                              data.url[1] ? "block" : "hidden"
                            } rounded-full w-10 aspect-square`}
                          />
                          {data.channelName[1]}
                        </Link>
                      </>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10 my-12">
          <div className="flex-1 max-w-3xl" id="#pdf">
            <PdfViewer url={data.pdf} />
          </div>

          {/* Sidebar or additional content */}
          <div className="w-60 h-60 flex items-center justify-center bg-purple-500 text-white font-bold text-lg rounded-lg shadow-lg">
            ChatBot
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};
export default SubjectDetails;
