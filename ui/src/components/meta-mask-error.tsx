import { useMetaMask } from "../hooks/useMetaMask"

export const MetaMaskError = () => {
    const { error, errorMessage, clearError } = useMetaMask()
    return (
        <>
            {error &&
                <div className={` fixed bottom-0 w-full h-9 p-4 flex items-center text-gray-200 ${error ? 'bg-red-500' : 'bg-white'}`}
                    onClick={clearError}>
                    <strong>Error:</strong> {errorMessage}
                </div>
            }
        </>
    )
}