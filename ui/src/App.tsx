import { ChakraBaseProvider, Select, extendBaseTheme } from '@chakra-ui/react';
import { WagmiConfig, configureChains, createConfig, mainnet, sepolia } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { Home } from './components/home'
import { Navigation } from './components/navigation'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

const theme = extendBaseTheme({
  components: {
    Select
  },
});

const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `https://rpc.sepolia.org`,
      }),
    }),
    publicProvider()
  ],
)

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  publicClient
})


function App() {
  return (
    <ChakraBaseProvider theme={theme}>
      <WagmiConfig config={config}>
        <div className='flex flex-col h-full w-full'>
          <Navigation />
          <Home />
        </div>
      </WagmiConfig>
    </ChakraBaseProvider>
  )
}

export default App
