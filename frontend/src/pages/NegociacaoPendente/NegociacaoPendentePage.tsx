import { Box, Container, Heading, Text, Center, Button, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const NegociacaoPendentePage: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulação de carregamento, você pode substituir por uma chamada real de API ou lógica de processamento
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Simula 2 segundos de carregamento
    }, []);

    return (
        <Center minHeight="100vh" py={6}>
            <Container maxW="lg">
                <Box bg="white" p={8} rounded="md" shadow="lg" textAlign="center">
                    <Heading size="lg" mb={6}>
                        Negociação Pendente
                    </Heading>

                    {loading ? (
                        <Spinner size="lg" color="teal.500" />
                    ) : (
                        <>
                            <Text fontSize="lg" mb={4}>
                                Seu pedido de negociação foi recebido e está em processo de análise.
                            </Text>
                            <Text fontSize="lg" mb={6}>
                                Dentro de 24hrs, seu pedido será processado e um e-mail chegará na sua caixa de entrada com mais detalhes.
                            </Text>
                            <Button colorScheme="teal" onClick={() => window.location.href = '/'}>
                                Voltar para a página inicial
                            </Button>
                        </>
                    )}
                </Box>
            </Container>
        </Center>
    );
};

export default NegociacaoPendentePage;
