import React, { useRef } from 'react';

/**
 * UploadDocCard
 * A simple card that lets authorized companies/organizations
 * upload private outbreak-response documents.
 *
 * Props
 * ─────
 * onFileUpload(file) – callback with the selected File object
 */
const UploadDocCard = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const triggerPicker = () => fileInputRef.current?.click();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileUpload) onFileUpload(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      {/* header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Upload Private Document
        </h2>
        <p className="text-sm text-gray-600">
          (Only for companies & organizations)
        </p>
      </div>

      {/* body */}
      <div className="flex flex-col items-center p-6">
        {/* hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.txt,.csv"
          className="hidden"
          onChange={handleChange}
        />

        {/* pick-file button */}
        <button
          onClick={triggerPicker}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow"
        >
          Choose&nbsp;File
        </button>

        {/* helper text */}
        <p className="mt-2 text-xs text-gray-500 text-center">
          Supported: PDF, DOC/DOCX, TXT, CSV
        </p>
      </div>
    </div>
  );
};

export default UploadDocCard;
