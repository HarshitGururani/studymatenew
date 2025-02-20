"use client";
import ContentWrapper from "@/components/ContentWrapper";
import { useQueries } from "react-query";
import * as apiClient from "../../apiClient";
import Carousel from "@/components/Carousel";
const SemestersPage = () => {
  const semesters = [1, 2, 3, 4];

  const queries = useQueries(
    semesters.map((sem) => ({
      queryKey: ["semester", sem],
      queryFn: () => apiClient.subjects(sem),
    }))
  );

  // Check if any query is still loading
  const isLoading = queries.some((query) => query.isLoading);
  if (isLoading) return <p className="text-center text-lg">Loading...</p>;

  // Check if any query has an error
  const isError = queries.some((query) => query.isError);
  if (isError)
    return (
      <p className="text-center text-lg text-red-500">Failed to load data</p>
    );

  const semesterData = queries.map((query) => query.data || []);
  console.log(semesterData);

  semesterData.forEach((sem, index) => {
    console.log(`Semester ${semesters[index]} Data:`, sem);
  });

  return (
    <ContentWrapper className="mt-8">
      {semesterData.map((data, index) => (
        <Carousel data={data} title={`Semester ${index + 1}`} key={index} />
      ))}
    </ContentWrapper>
  );
};
export default SemestersPage;
