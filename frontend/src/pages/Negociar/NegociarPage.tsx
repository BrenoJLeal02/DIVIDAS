import { useEffect, useState, useMemo } from 'react';
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
    Select,
} from '@chakra-ui/react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const NegociarPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, valorPrincipal, multa, juros } = location.state || {};
    const [opcoes, setOpcoes] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [erro, setErro] = useState<string | null>(null);
    const [parcelasSelecionadas, setParcelasSelecionadas] = useState<number | null>(null);
    const [simulacao, setSimulacao] = useState<{ valorTotal: number, parcelas: number, valorParcela: number } | null>(null);

    // Função para calcular valores com desconto
    const calcularValorComDesconto = (valor: string, desconto: number) => {
        return parseFloat(valor) * (1 - desconto / 100);
    };

    useEffect(() => {
        if (!id) {
            setErro('Nenhum ID fornecido.');
            setLoading(false);
            return;
        }

        const fetchOpcoes = async () => {
            try {
                const data = await getOpcoesNegociacao(id);
                if (!data || data.length === 0) {
                    setErro('Nenhuma opção de negociação encontrada.');
                } else {
                    setOpcoes(data);
                }
            } catch (error: any) {
                console.error(error);
                setErro(error.response?.data?.error || 'Erro ao buscar opções.');
            } finally {
                setLoading(false);
            }
        };

        fetchOpcoes();
    }, [id]);

    const handleParcelasChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const parcelas = Number(event.target.value);
        setParcelasSelecionadas(parcelas);
    
        if (parcelas > 0) {
            const opcaoSelecionada = opcoes.find(opcao => opcao.parcelas === parcelas);
    
            if (opcaoSelecionada) {
                const descontoMulta = opcaoSelecionada.desconto_multa || 0;
                const descontoJuros = opcaoSelecionada.desconto_juros || 0;
    
                // Valores com descontos aplicados
                const multaComDesconto = calcularValorComDesconto(multa, descontoMulta);
                const jurosComDesconto = calcularValorComDesconto(juros, descontoJuros);
    
                // Saldo inicial após descontos
                const saldoInicial = parseFloat(valorPrincipal) + multaComDesconto + jurosComDesconto;
    
                // Juros mensais (1% como exemplo, pode ser ajustado)
                const taxaJurosMensal = 0.01;
    
                // Valor total com juros compostos no parcelamento
                const valorTotal = saldoInicial * Math.pow(1 + taxaJurosMensal, parcelas);
    
                // Valor de cada parcela
                const valorParcela = valorTotal / parcelas;
    
                setSimulacao({ valorTotal, parcelas, valorParcela });
            }
        } else {
            setSimulacao(null);
        }
    };
    

    const calcularValorFinalAVista = useMemo(() => {
        const descontoMulta = opcoes.find(opcao => opcao.tipo === 'À Vista')?.desconto_multa || 0;
        const descontoJuros = opcoes.find(opcao => opcao.tipo === 'À Vista')?.desconto_juros || 0;

        const multaComDesconto = calcularValorComDesconto(multa, descontoMulta);
        const jurosComDesconto = calcularValorComDesconto(juros, descontoJuros);

        return (parseFloat(valorPrincipal) + multaComDesconto + jurosComDesconto).toFixed(2);
    }, [opcoes, multa, juros, valorPrincipal]);

    const calcularValorFinalParcelado = useMemo(() => (opcao: any) => {
        const descontoMulta = opcao.desconto_multa || 0;
        const descontoJuros = opcao.desconto_juros || 0;

        const multaComDesconto = calcularValorComDesconto(multa, descontoMulta);
        const jurosComDesconto = calcularValorComDesconto(juros, descontoJuros);

        return (parseFloat(valorPrincipal) + multaComDesconto + jurosComDesconto).toFixed(2);
    }, [multa, juros, valorPrincipal]);

    if (loading) {
        return (
            <Center minHeight="100vh">
                <Spinner size="lg" color="teal.500" />
            </Center>
        );
    }

    if (erro) {
        return (
            <Center minHeight="100vh">
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
        <Center minHeight="100vh" py={6}>
            <Container maxW="2xl">
                <Box bg="white" p={8} rounded="md" shadow="lg">
                    <Heading size="lg" mb={6} textAlign="center">
                        Opções de Negociação
                    </Heading>
                    <Stack spacing={6}>
                        <Box bg="gray.50" p={6} borderRadius="md" shadow="sm">
                            <Heading size="md" mb={3}>
                                Detalhes da Dívida
                            </Heading>
                            <Text><strong>Valor Principal:</strong> R$ {valorPrincipal}</Text>
                            <Text><strong>Multa:</strong> R$ {multa}</Text>
                            <Text><strong>Juros:</strong> R$ {juros}</Text>
                            <Divider mt={4} />
                            <Text mt={2}><strong>Valor Total Inicial:</strong> R$ {(parseFloat(valorPrincipal) + parseFloat(multa) + parseFloat(juros)).toFixed(2)}</Text>
                        </Box>
                        {opcoes.map((opcao) => (
                            <Box key={opcao.id} bg="gray.50" p={6} borderRadius="md" shadow="sm">
                                <Heading size="md" mb={3}>
                                    <Flex align="center">
                                        <Badge colorScheme={opcao.tipo?.toLowerCase() === 'à vista' ? 'green' : 'blue'} mr={3}>
                                            {opcao.tipo?.toLowerCase() === 'à vista' ? 'À Vista' : 'Parcelado'}
                                        </Badge>
                                        {opcao.tipo === 'À Vista' ? (
                                            <Icon as={FaCheckCircle} color="green.400" />
                                        ) : (
                                            <Icon as={FaTimesCircle} color="red.400" />
                                        )}
                                    </Flex>
                                </Heading>
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

                                {opcao.tipo === 'Parcelado' && opcao.parcelas && (
                                    <Flex direction="column" mt={4}>
                                        <Text fontWeight="bold" mb={2}>
                                            Escolha o número de parcelas:
                                        </Text>
                                        <Select
                                            value={parcelasSelecionadas || ''}
                                            onChange={handleParcelasChange}
                                            placeholder="Selecione o número de parcelas"
                                        >
                                            {Array.from({ length: opcao.parcelas }, (_, index) => {
                                                const parcelas = index + 1;
                                                const valorTotal = parseFloat(valorPrincipal) + calcularValorComDesconto(multa, opcao.desconto_multa) + calcularValorComDesconto(juros, opcao.desconto_juros);
                                                const valorParcela = valorTotal / parcelas;

                                                return (
                                                    <option key={index} value={parcelas}>
                                                        {parcelas}x - R$ {valorParcela.toFixed(2)}
                                                    </option>
                                                );
                                            })}
                                        </Select>

                                        {simulacao && (
                                            <></>
                                            // <Box mt={4} p={4} bg="gray.100" borderRadius="md">
                                            //     <Text fontWeight="bold">
                                            //         Simulação de Parcelamento:
                                            //     </Text>
                                            //     <Text>
                                            //         Valor total com juros: R$ {simulacao.valorTotal.toFixed(2)}
                                            //     </Text>
                                            //     <Text>
                                            //         Número de Parcelas: {simulacao.parcelas}
                                            //     </Text>
                                            //     <Text>
                                            //         Valor da Parcela: R$ {simulacao.valorParcela.toFixed(2)}
                                            //     </Text>
                                            // </Box>
                                        )}
                                    </Flex>
                                )}

                                {opcao.tipo === 'À Vista' && (
                                    <Box mt={4} p={4} bg="gray.100" borderRadius="md">
                                        <Text fontWeight="bold">
                                            Valor à vista com desconto:
                                        </Text>
                                        <Text>
                                            R$ {calcularValorFinalAVista}
                                        </Text>
                                    </Box>
                                )}

                                {opcao.tipo === 'Parcelado' && (
                                    <Box mt={4} p={4} bg="gray.100" borderRadius="md">
                                        <Text fontWeight="bold">
                                            Valor parcelado com descontos:
                                        </Text>
                                        <Text>
                                            R$ {calcularValorFinalParcelado(opcao)}
                                        </Text>
                                    </Box>
                                )}

                                <Flex justify="flex-end" mt={4}>
                                    <Button
                                        colorScheme="teal"
                                        onClick={() =>
                                            navigate('/confirmar-negociacao', {
                                                state: {
                                                    id,
                                                    opcao,
                                                    parcelasSelecionadas,
                                                    valorPrincipal,
                                                    multa,
                                                    juros,
                                                    valorFinalAVista: calcularValorFinalAVista,
                                                    valorFinalParcelado: calcularValorFinalParcelado(opcao),
                                                },
                                            })
                                        }
                                        isDisabled={opcao.tipo === 'Parcelado' && !parcelasSelecionadas}
                                    >
                                        {opcao.tipo === 'À Vista' ? 'Pagar à Vista' : 'Escolher Parcelamento'}
                                    </Button>
                                </Flex>
                            </Box>
                        ))}
                    </Stack>
                    <Box textAlign="center" mt={6}>
                        <Button colorScheme="teal" onClick={() => navigate(-1)}>
                            Voltar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Center>
    );
};

export default NegociarPage;
