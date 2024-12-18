import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainRoutes } from './routes/MainRoutes';
import { useState } from 'react';
import initialTheme from './theme/theme'; // Tema customizado
function App() {
  const [currentTheme] = useState(initialTheme); // Armazenando tema no estado

  return (
    <ChakraProvider theme={currentTheme}> {/* Usando o tema customizado */}
      <Router>
        <MainRoutes /> {/* Suas rotas */}
      </Router>
    </ChakraProvider>
  );
}

export default App;
