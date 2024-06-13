'use client'

import { Button, FileButton, Group, Text } from '@mantine/core'
import pica from 'pica'
import { useState } from 'react'

// A functional component that renders a simple file upload form.
export const FileUploadForm = (props: {
    // The function to call when the form is submitted.
    onSubmit: (file: File) => Promise<void>
    onFileChange?: (file: File | null) => void
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [submitting, setSubmitting] = useState(false)

    const onFileChange = (file: File | null) => {
        setSelectedFile(file)
        if (props.onFileChange) {
            props.onFileChange(file)
        }
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (selectedFile) {
            console.log('File selected:', selectedFile)
            setSubmitting(true)
            try {
                const resizedFile = await resizeImage(selectedFile)
                console.log('Resized file:', resizedFile)
                await props.onSubmit(selectedFile)
                setSubmitting(false)
            } catch (error) {
                console.error('Error:', error)
            }
        }
    }

    // Resize the image to 255x255 pixels. This code has been adapted from ChatGPT.
    const resizeImage = async (file: File): Promise<File> => {
        const picaInstance = pica()
        const img = new Image()
        const url = URL.createObjectURL(file)
        img.src = url

        await new Promise((resolve) => {
            img.onload = resolve
        })

        const canvas = document.createElement('canvas')
        canvas.width = 255 // Desired width
        canvas.height = 255 // Desired height

        const resultCanvas = await picaInstance.resize(img, canvas)
        const blob = await picaInstance.toBlob(resultCanvas, 'image/jpeg', 0.8) // Quality 0.8

        return new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <FileButton
                    onChange={onFileChange}
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
