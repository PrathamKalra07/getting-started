//---------------------> C:\Users\shiva\Desktop\ew-sign-signpad\src\components\Common\commonPDF.jsx
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`;

const CommonPDFViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    setLoading(true);
  }, []); 

  return (
    <div className="common_pdf_viewer">
      {loading && <div className="loading_container">Loading PDF..</div>}

      {error && <div className="error_message">PDF failed to load {error}</div>}

      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
          setError("");
          setLoading(false); 
        }}
        onLoadError={(err) => {
          setError(err.message);
          setLoading(false);
        }}
      >
        {Array.from(new Array(numPages), (_, index) => (
          <div key={index} className="pdf_page_container">
            <Page pageNumber={index + 1} />
          </div>
        ))}
      </Document>
    </div>
  );
};

export default CommonPDFViewer;
