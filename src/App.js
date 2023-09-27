
import { ChakraProvider } from '@chakra-ui/react';
import Portfolio from './Portfolio';

function App() {
  return (
    <ChakraProvider>
      <Portfolio />
    </ChakraProvider>
  );
}

export default App;
