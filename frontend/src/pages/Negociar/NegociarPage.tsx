import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOpcoesNegociacao } from '../../services/api';
import {
    Box,
    Button,
    Heading,
    Text,
    Container,
    Center,
    Stack,
    Divider,
    Flex,
    Badge,
    Icon,
    Spinner,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';  

const NegociarPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state || {};
    const [opcoes, setOpcoes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setErro('Nenhum ID fornecido.');
            setLoading(false);
            return;
        }

        const fetchOpcoes = async () => {
            try {
                const data = await getOpcoesNegociacao(id);
                setOpcoes(data);
            } catch (error: any) {
                setErro(error.response?.data?.error || 'Erro ao buscar opções.');
            } finally {
                setLoading(false);
            }
        };

        fetchOpcoes();
    }, [id]);

    if (loading) {
        return (
            <Center height="100vh">
                <Spinner size="lg" color="teal.500" />
            </Center>
        );
    }

    if (erro) {
        return (
            <Center height="100vh">
                <Container maxW="lg">
                    <Alert status="error" borderRadius="md">
                        <AlertIcon />
                        <AlertTitle>Erro</AlertTitle>
                        <AlertDescription>{erro}</AlertDescription>
                    </Alert>
                </Container>
            </Center>
        );
    }

    return (
        <Center height="100vh" py={6}>
            <Container maxW="2xl">
                <Box bg="white" p={8} rounded="md" shadow="lg">
                    <Heading size="lg" mb={6} textAlign="center">
                        Opções de Negociação
                    </Heading>
                    <Stack spacing={6}>
                        {opcoes.map((opcao) => (
                            <Box key={opcao.id} bg="gray.50" p={6} borderRadius="md" shadow="sm">
                                <Heading size="md" mb={3}>
                                    <Flex align="center">
                                        <Badge colorScheme={opcao.tipo === 'à vista' ? 'green' : 'blue'} mr={3}>
                                            {opcao.tipo === 'à vista' ? 'À Vista' : 'Parcelado'}
                                        </Badge>
                                        {opcao.tipo === 'à vista' ? (
                                            <Icon as={FaCheckCircle} color="green.400" />
                                        ) : (
                                            <Icon as={FaTimesCircle} color="red.400" />
                                        )}
                                    </Flex>
                                </Heading>
                                <Text mb={3}>
                                    {opcao.tipo === 'à vista'
                                        ? 'Pague a dívida toda de uma vez e aproveite descontos exclusivos!'
                                        : 'Parcelamento disponível com juros reduzidos!'}
                                </Text>
                                <Divider />
                                <Flex justify="space-between" mt={3}>
                                    <Text fontWeight="bold">
                                        Desconto sobre a Multa: {opcao.desconto_multa}%
                                    </Text>
                                    <Text fontWeight="bold">
                                        Desconto sobre os Juros: {opcao.desconto_juros}%
                                    </Text>
                                </Flex>
                                <Text mt={2}>
                                    {opcao.parcelas
                                        ? `Quantidade de Parcelas: ${opcao.parcelas}`
                                        : 'Sem parcelamento disponível.'}
                                </Text>
                                <Flex justify="flex-end" mt={4}>
                                    <Button
                                        colorScheme="teal"
                                        onClick={() => navigate('/confirmar-negociacao', { state: { opcao } })}
                                    >
                                        {opcao.tipo === 'à vista' ? 'Pagar à Vista' : 'Escolher Parcelamento'}
                                    </Button>
                                </Flex>
                            </Box>
                        ))}
                    </Stack>
                    <Box textAlign="center" mt={6}>
                        <Button colorScheme="gray" onClick={() => navigate(-1)} size="sm">
                            Voltar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Center>
    );
};

export default NegociarPage;
