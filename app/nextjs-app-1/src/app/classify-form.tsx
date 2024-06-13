'use client'

import { FileUploadForm } from '@/components/form/file-upload-form'
import { Group, Text } from '@mantine/core'
import { useState } from 'react'

export const ClassifyForm = (props: {}) => {
    interface Response {
        prediction: string
        probability: string
    }

    const [response, setResponse] = useState<Response | null>(null)

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
        }
    }

    return (
        <div>
            <FileUploadForm onSubmit={onFileSubmit} />
            {response && (
                <div>
                    <Text size="xl" fw={500} td="underline">
                        Results
                    </Text>
                    <Group>
                        <Text fw={500}>Prediction:</Text>{' '}
                        <Text>{response.prediction}</Text>
                    </Group>
                    <Group>
                        <Text fw={500}>Probability:</Text>{' '}
                        <Text>{response.probability}</Text>
                    </Group>
                </div>
            )}
        </div>
    )
}
