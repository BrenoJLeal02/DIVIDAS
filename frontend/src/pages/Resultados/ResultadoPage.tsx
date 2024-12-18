import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getDividaDetalhe } from '../../services/api';
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Spinner,
  Center,
  HStack,
} from '@chakra-ui/react';

export function ResultadoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};
  const [resultado, setResultado] = useState<any | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (!id) {
      setErro('Nenhum ID fornecido.');
      return;
    }

    console.log('ID fornecido:', id);

    const fetchData = async () => {
      try {
        const data = await getDividaDetalhe(id);
        if (data) {
          setResultado(data);
        } else {
          setErro('Dívida não encontrada.');
          toast({
            title: 'Dívida não encontrada.',
            description: 'Não conseguimos encontrar os dados dessa dívida.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error: any) {
        console.error(error);
        setErro(error.response?.data?.error || 'Erro ao buscar dados.');
        toast({
          title: 'Erro ao buscar dados',
          description: error.response?.data?.error || 'Algo deu errado ao tentar buscar os detalhes.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [id, toast]);

  if (erro) {
    return (
      <Center height="100vh" width="100%">
        <Container maxW="full" py={8}>
          <Box bg="white" p={6} rounded="md" shadow="md">
            <Heading as="h1" size="lg" textAlign="center" mb={4}>
              Resultado da Consulta
            </Heading>
            <Text color="red.500" textAlign="center">{erro}</Text>
          </Box>
        </Container>
      </Center>
    );
  }

  if (!resultado) {
    return (
      <Center height="100vh" width="100%">
        <Container maxW="full" py={8}>
          <Box bg="white" p={6} rounded="md" shadow="md" textAlign="center">
            <Spinner size="lg" color="teal.500" />
            <Text mt={4}>Carregando...</Text>
          </Box>
        </Container>
      </Center>
    );
  }

  // Calculando o valor total (Valor principal + Multa + Juros)
  const valorTotal = (
    parseFloat(resultado.valor_principal) + 
    parseFloat(resultado.multa) + 
    parseFloat(resultado.juros)
  ).toFixed(2);

  return (
    <Center height="100vh" width="100%">
      <Container maxW="full" py={8}>
        <Box bg="white" p={6} rounded="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center" mb={6}>
            Resultado da Consulta
          </Heading>

          {/* Exibição dos dados do usuário */}
          <Stack spacing={4} mb={6}>
            <Text><strong>Contribuinte:</strong> {resultado.contribuinte}</Text>
            {resultado.cnpj && <Text><strong>CNPJ:</strong> {resultado.cnpj}</Text>}
            {resultado.cpf && <Text><strong>CPF:</strong> {resultado.cpf}</Text>}
          </Stack>

          {/* Accordion com os detalhes financeiros */}
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <strong>Débitos administrativos - R$ {valorTotal}</strong>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {/* Tabela com os detalhes financeiros */}
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Descrição</Th>
                      <Th>Valor</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Valor Principal</Td>
                      <Td>R$ {resultado.valor_principal}</Td>
                    </Tr>
                    <Tr>
                      <Td>Multa</Td>
                      <Td>R$ {resultado.multa}</Td>
                    </Tr>
                    <Tr>
                      <Td>Juros</Td>
                      <Td>R$ {resultado.juros}</Td>
                    </Tr>
                    <Tr>
                      <Td><strong>Total</strong></Td>
                      <Td><strong>R$ {valorTotal}</strong></Td>
                    </Tr>
                  </Tbody>
                </Table>

                {/* Botão Negociar */}
                <HStack justify="flex-end" mt={4}>
                  <Button
                    size="md"
                    colorScheme="teal"
                    onClick={() => navigate('/negociar')} // Navega para a página de negociação
                  >
                    Negociar
                  </Button>
                </HStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          {/* Botão Nova Consulta */}
          <Button
            colorScheme="teal"
            mt={6}
            onClick={() => navigate('/')} // Navega para a página inicial de consulta
          >
            Nova Consulta
          </Button>
        </Box>
      </Container>
    </Center>
  );
}
