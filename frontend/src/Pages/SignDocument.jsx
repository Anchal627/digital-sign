import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { PDFDocument } from "pdf-lib";

export default function SignDocument() {
  const sigCanvas = useRef(null);

  const [file, setFile] = useState(null);

  // Function to clear the signature
  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  // Function to sign the document and download it
  const signDocument = async () => {
    if (!file) {
      alert("Please upload a PDF file first.");
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = async () => {
      const pdfDoc = await PDFDocument.load(reader.result);
      const page = pdfDoc.getPages()[0];

      const signatureDataURL = sigCanvas.current.toDataURL("image/png");
      const signatureImage = await pdfDoc.embedPng(signatureDataURL);
      const { width, height } = page.getSize();

      // Adjust position for responsiveness
      page.drawImage(signatureImage, {
        x: width * 0.7, // Positioned dynamically
        y: height * 0.1,
        width: width * 0.2,
        height: height * 0.1,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      // Download the modified PDF
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "signed_document.pdf";
      link.click();
    };
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Sign Your Document
        </h2>

        <p className="text-gray-600 text-center mb-4">
          Upload and sign your document securely.
        </p>

        {/* File Input */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full border p-2 rounded-md mb-4"
        />

        {/* Signature Canvas */}
        <div className="border border-gray-300 p-4 rounded-lg bg-gray-50 mb-4">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              className: "w-full h-32 sm:h-40 md:h-48",
            }}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={clearSignature}
            className="w-full bg-green-400 text-white py-2 rounded-md hover:bg-gray-600"
          >
            Clear Signature
          </button>
          <button
            onClick={signDocument}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Sign & Download
          </button>
        </div>
      </div>
    </div>
  );
}
