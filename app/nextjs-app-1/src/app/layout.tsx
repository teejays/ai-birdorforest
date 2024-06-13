// core styles are required for all packages
import '@mantine/core/styles.css'

import { createTheme, ColorSchemeScript, MantineProvider } from '@mantine/core'

const theme = createTheme({
    /** Put your mantine theme override here */
})

const RootLayout = ({ children }: { children: any }) => {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
                <title>Bird or Forest</title>
            </head>
            <body>
                <MantineProvider theme={theme}>{children}</MantineProvider>
            </body>
        </html>
    )
}

export default RootLayout
