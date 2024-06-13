'use client'

import { Button, FileButton, Group, Text } from '@mantine/core'
import { useState } from 'react'

// A functional component that renders a simple file upload form.
export const FileUploadForm = (props: {
    // The function to call when the form is submitted.
    onSubmit: (file: File) => Promise<void>
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (selectedFile) {
            console.log('File selected:', selectedFile)
            setSubmitting(true)
            try {
                const response = await props.onSubmit(selectedFile)
                setSubmitting(false)
            } catch (error) {
                console.error('Error:', error)
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FileButton
                    onChange={setSelectedFile}
                    accept="image/png,image/jpeg"
                >
                    {(props) => (
                        <Button {...props}>
                            {selectedFile ? 'Change image' : 'Upload image'}{' '}
                        </Button>
                    )}
                </FileButton>
                {selectedFile && (
                    <div>
                        <Text size="sm" mt="sm">
                            Picked file: {selectedFile.name}
                        </Text>
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected file"
                            style={{ maxWidth: '150px' }}
                        />
                    </div>
                )}

                <Group justify="flex-start" mt="md">
                    <Button
                        type="submit"
                        disabled={
                            selectedFile === null
                                ? true
                                : submitting
                                ? true
                                : false
                        }
                    >
                        {submitting ? 'Processing' : 'Submit'}
                    </Button>
                </Group>
            </form>
        </div>
    )
}
