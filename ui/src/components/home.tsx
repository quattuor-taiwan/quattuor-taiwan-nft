

import { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import { mainnet, sepolia, useAccount, useConnect, useEnsName } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { switchNetwork } from "wagmi/actions";

interface ISelectOption {
    label: string;
    chainId: number;
}

export const Home = () => {
    const [chainArray, setChainArray] = useState<Array<ISelectOption>>([]);
    const [chain, setChain] = useState<ISelectOption>();
    const { address, isConnected } = useAccount();

    useEffect(() => {
        const defaultChainArray = [
            {
                label: 'Ethereum Mainnet',
                chainId: mainnet.id
            }, {
                label: 'Ethereum Sepolia',
                chainId: sepolia.id
            }
        ];

        setChainArray(defaultChainArray);
        setChain(defaultChainArray[0]);
    }, []);

    const onChangeChain = async (value: number) => {
        const originChain = chain;
        const selectedChain = chainArray.find(chain => chain.chainId === value);
        if (selectedChain) {
            setChain(selectedChain);

            if (isConnected) {
                try {
                    const network = await switchNetwork({
                        chainId: selectedChain.chainId,
                    });
                    console.log(network)
                } catch (error) {
                    // TODO:optimize notification
                    alert(error);
                    setChain(originChain);
                }
            }
        }
    }

    const { data: ensName } = useEnsName({ address })
    const { connect } = useConnect({
        chainId: chain?.chainId || mainnet.id,
        connector: new InjectedConnector(),
    })

    // const { data, isError, isLoading: isLoadingBalance } = useBalance({
    //     address,
    // })
    // const { chain, chains } = getNetwork()
    // const { chain } = useNetwork();
    // const { chains, error, isLoading: isLoadingNetwork, pendingChainId, switchNetwork } = useSwitchNetwork();

    return (
        <div className="h-max p-4">
            <div>
                Chain Id: {chain?.chainId}
            </div>

            <Select value={chain?.chainId} onChange={event => { onChangeChain(parseInt(event.currentTarget.value)) }} icon={<></>}>
                {
                    chainArray.map(chain => {
                        return <option key={chain.chainId} value={chain.chainId}>
                            {chain.label}
                        </option>
                    })
                }
            </Select>

            {
                isConnected ?
                    <div>Connected to {ensName ?? address}</div> :
                    <button onClick={() => connect()}>Connect Wallet</button>
            }
        </div>
    )
}