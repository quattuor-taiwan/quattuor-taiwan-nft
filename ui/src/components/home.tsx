

import { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import { useMetaMask } from "../hooks/useMetaMask"
import { formatChainAsNum } from "../utils"

interface ISelectOption {
    label: string;
    value: string;
}

enum Network {
    EthereumMainnet = 'eth-mainnet',
    EthereumSepolia = 'eth-sepolia'
}

export const Home = () => {
    const { wallet } = useMetaMask();
    const [networkArray, setNetworkArray] = useState<Array<ISelectOption>>([]);
    const [network, setNetwork] = useState<Network>(Network.EthereumMainnet);

    // useEffect(() => {
    //     const web3 = new Web3('https://mainnet.base.org');

    //     const friendTechContract = new web3.eth.Contract(FRIEND_TECH_ABI, CONTRACT_ADDRESS);

    //     friendTechContract.methods.owner().call().then(owner => {
    //         console.log(owner);
    //     })
    // }, [network]);

    useEffect(() => {
        const defaultNetworkArray = [
            {
                label: 'Ethereum Mainnet',
                value: 'eth-mainnet'
            }, {
                label: 'Ethereum Sepolia',
                value: 'eth-sepolia'
            }
        ];

        setNetworkArray(defaultNetworkArray);
    }, [])

    const onChangeNetwork = (event: React.FormEvent<HTMLSelectElement>) => {
        const value = event.currentTarget.value as Network;
        switch (value) {
            case Network.EthereumMainnet:
                setNetwork(Network.EthereumMainnet);
                break;
            case Network.EthereumSepolia:
                setNetwork(Network.EthereumSepolia);
                break;
            default:
                break;
        }
    }

    return (
        <div className="h-max p-4">
            <Select value={network} onChange={(event) => { onChangeNetwork(event) }} icon={<></>}>
                {
                    networkArray.map(network => {
                        return <option key={network.value} value={network.value}>
                            {network.label}
                        </option>
                    })
                }
            </Select>

            <div>
                Wallet Info:
            </div>
            {wallet.accounts.length > 0 ?
                <>
                    <div>Wallet Accounts: {wallet.accounts[0]}</div>
                    <div>Wallet Balance: {wallet.balance}</div>
                    <div>Hex ChainId: {wallet.chainId}</div>
                    <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
                </> :
                <>
                    N/A
                </>
            }
        </div>
    )
}