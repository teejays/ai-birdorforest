'use client'

import { FileUploadForm } from '@/components/form/file-upload-form'
import { useState } from 'react'

export const ClassifyForm = (props: {}) => {
    const [response, setResponse] = useState<JSON | null>(null)

    // Read the env variable SERVER_HOST in this react component
    const serverHost = process.env.SERVER_HOST || '127.0.0.1:8000'

    const onFileSubmit = (file: File) => {
        // Send the selected image file to server in a post request
        const formData = new FormData()
        formData.append('image', file)
        fetch(`http://${serverHost}/classify`, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json() as Promise<JSON>)
            .then((result) => {
                console.log('Success:', result)
                setResponse(result)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    return (
        <div>
            <FileUploadForm onSubmit={onFileSubmit} />
            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
        </div>
    )
}
