import { ChakraBaseProvider, Select, extendBaseTheme } from '@chakra-ui/react';
import { MetaMaskContextProvider } from './hooks/useMetaMask'
import { Home } from './components/home'
import { MetaMaskError } from './components/meta-mask-error'
import { Navigation } from './components/navigation'

const theme = extendBaseTheme({
  components: {
    Select
  },
});

function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <MetaMaskContextProvider>
        <div className='flex flex-col h-full w-full'>
          <Navigation />
          <Home />
          <MetaMaskError />
        </div>
      </MetaMaskContextProvider>
    </ChakraBaseProvider>
  )
}

export default App
