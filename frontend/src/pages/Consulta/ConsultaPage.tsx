import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postConsulta } from '../../services/api';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Stack,
  useToast,
  Heading,
  Container,
  Center
} from '@chakra-ui/react';

const ConsultaPage: React.FC = () => {
  const [documento, setDocumento] = useState<string>('');
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();
  const toast = useToast();

  // Função para determinar o tipo de documento
  const isCNPJ = (documento: string) => documento.length === 14;
  const isCPF = (documento: string) => documento.length === 11;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    try {
      // Realizar a consulta passando o CPF ou CNPJ
      const response = await postConsulta(isCPF(documento) ? documento : undefined, isCNPJ(documento) ? documento : undefined);
      console.log(response); // Verifique a resposta da API aqui

      if (response?.id) {
        navigate('/resultados', { state: { id: response.id } });
      } else {
        setErro('Dívida não encontrada.');
        toast({
          title: 'Dívida não encontrada.',
          description: 'Não conseguimos encontrar nenhuma dívida com esse CPF ou CNPJ.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error(error); // Verifique o erro
      setErro(error.response?.data?.error || 'Erro ao buscar dados.');
      toast({
        title: 'Erro ao realizar consulta.',
        description: error.response?.data?.error || 'Algo deu errado ao tentar realizar a consulta.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Center height="100vh">
      <Container maxW="lg" py={8}>
        <Box
          bg="white"
          p={6}
          rounded="md"
          shadow="md"
        >
          <Heading as="h1" size="lg" textAlign="center" mb={6}>
            Consulta de Dívidas
          </Heading>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isRequired>
                <FormLabel htmlFor="documento">CPF ou CNPJ:</FormLabel>
                <Input
                  type="text"
                  id="documento"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  placeholder={isCNPJ(documento) ? 'Digite o CNPJ' : 'Digite o CPF'}
                />
              </FormControl>

              <Button
                colorScheme="teal"
                type="submit"
                mt={4}
                width="100%"
              >
                Buscar
              </Button>
            </Stack>
          </form>

          {erro && (
            <Text color="red.500" mt={4} textAlign="center">
              {erro}
            </Text>
          )}
        </Box>
      </Container>
    </Center>
  );
};

export default ConsultaPage;
