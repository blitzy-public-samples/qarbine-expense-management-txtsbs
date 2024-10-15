import React, { useState } from 'react';
import Tesseract from 'tesseract.js'; // Version 2.1.1
// Tesseract.js is used to integrate OCR technology for automatic receipt scanning and data extraction.
// Requirement addressed: TR-F002.2
// Location: Technical Specification / 5.2 Feature ID: F-002 / Technical Requirements / TR-F002.2

const ReceiptUpload: React.FC = () => {
  // State to hold the selected receipt file
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  // State to hold the receipt image preview URL
  const [receiptPreview, setReceiptPreview] = useState<string>('');

  // State to indicate if OCR processing is in progress
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // State to hold the extracted text from the receipt image
  const [extractedText, setExtractedText] = useState<string>('');

  // Function to handle receipt file selection
  // Updates the receiptFile and receiptPreview states when a file is selected
  // Requirement addressed: Allow attachment of digital receipts or photos of physical receipts (TR-F002.4)
  // Location: Technical Specification / 5.2 Feature ID: F-002 / Technical Requirements / TR-F002.4
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setReceiptFile(file);
      // Generate a preview URL for the selected image file
      const previewUrl = URL.createObjectURL(file);
      setReceiptPreview(previewUrl);
    }
  };

  // Function to perform OCR on the selected receipt image
  // Uses Tesseract.js to extract text from the image and updates the extractedText state
  // Requirement addressed: Integrate OCR technology for automatic receipt scanning and data extraction (TR-F002.2)
  // Location: Technical Specification / 5.2 Feature ID: F-002 / Technical Requirements / TR-F002.2
  const handleExtractText = async () => {
    if (receiptFile) {
      setIsProcessing(true); // Set processing state to true
      try {
        // Perform OCR using Tesseract.js on the selected image file
        const result = await Tesseract.recognize(receiptFile, 'eng');
        setExtractedText(result.data.text); // Update state with extracted text
        // TODO: Handle the extracted text as needed (e.g., populate form fields)
      } catch (error) {
        console.error('Error during OCR processing:', error);
        // TODO: Implement error handling and user feedback
      }
      setIsProcessing(false); // Reset processing state
    }
  };

  return (
    <div>
      {/* File input to select receipt image */}
      {/* Allows user to choose an image file from their device */}
      {/* Requirement addressed: TR-F002.4 */}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {/* Display the selected receipt image as a preview */}
      {receiptPreview && (
        <div>
          <img src={receiptPreview} alt="Receipt Preview" style={{ maxWidth: '300px' }} />
        </div>
      )}

      {/* Button to initiate OCR processing of the receipt image */}
      {/* Disabled if no file is selected or if processing is in progress */}
      {/* Requirement addressed: TR-F002.2 */}
      <button onClick={handleExtractText} disabled={!receiptFile || isProcessing}>
        {isProcessing ? 'Processing...' : 'Extract Text'}
      </button>

      {/* Display the extracted text from the receipt */}
      {extractedText && (
        <div>
          <h3>Extracted Text:</h3>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default ReceiptUpload;