'use client'

import { Container, Group, Text } from '@mantine/core'
import { useEffect, useState } from 'react'

export const StatusChecker = (props: { url: string }) => {
    const [status, setStatus] = useState<string | null>(null)
    const [lastChecked, setLastChecked] = useState<number | null>(null)

    const checkStatus = async () => {
        try {
            const response = await fetch(props.url)
            if (response.status == 200) {
                setStatus('Ok')
            } else {
                setStatus('Down')
            }
            setLastChecked(Date.now())
        } catch (error) {
            console.error('Error:', error)
            setStatus('Down')
            setLastChecked(Date.now())
        }
    }

    // Check the server status every 10 seconds
    // clear the interval when the component is unmounted
    useEffect(() => {
        checkStatus()
        const interval = setInterval(checkStatus, 10000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <Group>
                <Text size="xs" fs="italic" c="dimmed">
                    Server Status: {status ?? 'Unknown'}{' '}
                    {status === 'Ok' ? '✅' : status === 'Down' ? '❌' : '❓'}{' '}
                    [last checked:{' '}
                    {lastChecked
                        ? new Date(lastChecked).toLocaleTimeString()
                        : 'never'}
                    ]
                </Text>
            </Group>
        </div>
    )
}
