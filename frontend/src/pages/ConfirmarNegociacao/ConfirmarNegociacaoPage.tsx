import { useLocation, useNavigate } from 'react-router-dom';
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
} from '@chakra-ui/react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ConfirmarNegociacaoPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        id,
        opcao,
        valorPrincipal,
        multa,
        juros,
        valorFinalAVista,
        valorFinalParcelado,
    } = location.state || {};

    if (!id || !opcao) {
        return (
            <Center minHeight="100vh">
                <Text>Erro: Nenhuma negociação encontrada.</Text>
            </Center>
        );
    }

    const valorTotal = parseFloat(valorPrincipal) + parseFloat(multa) + parseFloat(juros);
    const valorTotalComDesconto =
        opcao.tipo === 'À Vista'
            ? parseFloat(valorFinalAVista)
            : parseFloat(valorFinalParcelado);

    return (
        <Center minHeight="100vh" py={6}>
            <Container maxW="2xl">
                <Box bg="white" p={8} rounded="md" shadow="lg">
                    <Heading size="lg" mb={6} textAlign="center">
                        Confirmar Negociação
                    </Heading>
                    <Stack spacing={6}>
                        <Box bg="gray.50" p={6} borderRadius="md" shadow="sm">
                            <Heading size="md" mb={3}>
                                Detalhes da Dívida
                            </Heading>
                            <Text>
                                <strong>Valor Principal:</strong> R$ {valorPrincipal}
                            </Text>
                            <Text>
                                <strong>Multa:</strong> R$ {multa}
                            </Text>
                            <Text>
                                <strong>Juros:</strong> R$ {juros}
                            </Text>
                            <Divider mt={4} />
                            <Text mt={2}>
                                <strong>Valor Total Inicial:</strong> R$ {valorTotal.toFixed(2)}
                            </Text>
                        </Box>

                        <Box bg="gray.50" p={6} borderRadius="md" shadow="sm">
                            <Heading size="md" mb={3}>
                                Resumo da Negociação
                            </Heading>
                            <Flex align="center">
                                <Badge
                                    colorScheme={opcao.tipo?.toLowerCase() === 'à vista' ? 'green' : 'blue'}
                                    mr={3}
                                >
                                    {opcao.tipo?.toLowerCase() === 'à vista' ? 'À Vista' : 'Parcelado'}
                                </Badge>
                                {opcao.tipo === 'À Vista' ? (
                                    <Icon as={FaCheckCircle} color="green.400" />
                                ) : (
                                    <Icon as={FaTimesCircle} color="red.400" />
                                )}
                            </Flex>
                            <Text mb={3}>
                                {opcao.tipo === 'À Vista'
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
                            <Box mt={4} p={4} bg="gray.100" borderRadius="md">
                                <Text fontWeight="bold">Valor Total da Negociação:</Text>
                                <Text>R$ {valorTotalComDesconto.toFixed(2)}</Text>
                            </Box>
                        </Box>

                        <Text textAlign="center" fontSize="lg" mt={4}>
                            Confirme a sua escolha e aguarde o processamento da negociação.
                        </Text>

                        <Flex justify="space-between" mt={6}>
                            <Button colorScheme="teal" onClick={() => navigate('/')}>
                                Voltar
                            </Button>
                            <Button colorScheme="blue" onClick={() => navigate('/negociacao-processada')}>
                                Confirmar e Finalizar
                            </Button>
                        </Flex>
                    </Stack>
                </Box>
            </Container>
        </Center>
    );
};

export default ConfirmarNegociacaoPage;
