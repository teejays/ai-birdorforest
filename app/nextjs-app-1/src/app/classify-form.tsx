'use client'

import { FileUploadForm } from '@/components/form/file-upload-form'
import { Alert, Group, Text } from '@mantine/core'

import { useState } from 'react'

export const ClassifyForm = (props: {}) => {
    interface Response {
        prediction: string
        probability: string
    }

    const [response, setResponse] = useState<Response | null>(null)
    const [err, setErr] = useState<any | null>(null)

    // Reset the response and error when a new file is selected
    const onFileChange = (file: File | null) => {
        setResponse(null)
        setErr(null)
    }

    // Read the env variable SERVER_HOST in this react component
    const serverHost =
        process.env.NEXT_PUBLIC_SERVER_HOST || 'http://127.0.0.1:8000'

    const onFileSubmit = async (file: File) => {
        // Send the selected image file to server in a post request
        try {
            const formData = new FormData()
            formData.append('image', file)
            const response = await fetch(`${serverHost}/classify`, {
                method: 'POST',
                body: formData,
            })
            const result = (await response.json()) as Response
            console.log('Success:', result)
            setResponse(result)
        } catch (error) {
            console.error('Error:', error)
            setErr(error)
        }
    }

    return (
        <div>
            <FileUploadForm
                onFileChange={onFileChange}
                onSubmit={onFileSubmit}
            />
            {response && (
                <div>
                    <Text>
                        ✅ I think this is a {response.prediction}{' '}
                        {response.prediction === 'bird'
                            ? '🦜'
                            : response.prediction === 'forest'
                            ? '🌳'
                            : '❓'}
                        . I am{' '}
                        {Math.floor(parseFloat(response.probability) * 1000) /
                            10}
                        % confident.
                    </Text>
                </div>
            )}
            {err && (
                <Alert
                    title="Error"
                    color="red"
                    withCloseButton
                    onClose={() => setErr(null)}
                >
                    {err.toString()}
                </Alert>
            )}
        </div>
    )
}
