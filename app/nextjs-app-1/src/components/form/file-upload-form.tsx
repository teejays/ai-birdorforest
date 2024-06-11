"use client"

import { useState } from "react";

// A functional component that renders a simple file upload form.
export const FileUploadForm = (props: {
  // The function to call when the form is submitted.
  onSubmit: (file: File) => void;
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedFile(file);
      }
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (selectedFile) {
        // TODO: Send the selectedFile to the server
        console.log("File selected:", selectedFile);
        props.onSubmit(selectedFile);
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };
  