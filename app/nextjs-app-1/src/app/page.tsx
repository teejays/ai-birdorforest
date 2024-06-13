import { ClassifyForm } from '@/app/classify-form'
import { Container, Group, Text, Title } from '@mantine/core'

const Home = (props: {}) => {
    return (
        <Container>
            <Title order={1}>Image Classification</Title>
            <Text>
                This is a simple image classification app. Upload an image and
                the server will classify it to either a bird 🦜 or a forest 🌳.
            </Text>
            <ClassifyForm />
        </Container>
    )
}

export default Home
