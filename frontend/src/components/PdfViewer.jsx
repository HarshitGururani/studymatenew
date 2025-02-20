import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = ({ url }) => {
  console.log("PDF URL:", url, typeof url); // Debugging log

  if (!url || typeof url !== "string") {
    return <div>Error: Invalid PDF URL</div>;
  }

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="flex justify-center items-center w-full h-screen border rounded-lg shadow-md overflow-hidden">
      <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
        <Viewer
          fileUrl={url}
          plugins={[defaultLayoutPluginInstance]}
          theme={"dark"}
          defaultScale={0.7}
        />
      </Worker>
    </div>
  );
};

export default PdfViewer;
