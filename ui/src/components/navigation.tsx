
import { useMetaMask } from "../hooks/useMetaMask"
import { formatAddress } from "../utils";

export const Navigation = () => {
    const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask();

    return (
        <div className="px-16 py-4 h-9 text-gray-200 bg-black flex items-center">
            <span>
                Friend Tech Stack
            </span>
            <div className="flex-1" />
            <span>
                {!hasProvider &&
                    <a href="https://metamask.io" target="_blank">
                        Install MetaMask
                    </a>
                }
                {window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&
                    <button disabled={isConnecting} onClick={connectMetaMask}>
                        Connect MetaMask
                    </button>
                }
                {hasProvider && wallet.accounts.length > 0 &&
                    <a
                        className="text_link tooltip-bottom"
                        href={`https://etherscan.io/address/${wallet.accounts[0]}`}
                        target="_blank"
                        data-tooltip="Open in Block Explorer"
                    >
                        {formatAddress(wallet.accounts[0])}
                    </a>
                }
            </span>
        </div>
    )
}