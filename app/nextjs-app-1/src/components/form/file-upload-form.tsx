"use client"

import { useState } from "react";

// A functional component that renders a simple file upload form.
export const FileUploadForm = (props: {}) => {
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
        // Send the selected image file to server in a post request
        const formData = new FormData();
        formData.append("image", selectedFile);
        fetch("http://127.0.0.1:8000/classify", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            console.log("Success:", result);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
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
  