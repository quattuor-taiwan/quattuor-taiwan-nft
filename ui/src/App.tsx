import { MetaMaskContextProvider } from './hooks/useMetaMask'
import { Home } from './components/home'
import { MetaMaskError } from './components/meta-mask-error'
import { Navigation } from './components/navigation'

function App() {
  return (
    <MetaMaskContextProvider>
      <div className='flex flex-col h-full w-full'>
        <Navigation />
        <Home />
        <MetaMaskError />
      </div>
    </MetaMaskContextProvider>
  )
}

export default App
