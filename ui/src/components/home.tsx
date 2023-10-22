

import { useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import { erc721ABI, mainnet, sepolia, useAccount, useConnect, useContractRead, useEnsName, useToken } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { switchNetwork } from "wagmi/actions";
import { QuattuorABI, QuattuorAddress } from "../utils/common";

interface ISelectOption {
    label: string;
    chainId: number;
}

export const Home = () => {
    const [chainArray, setChainArray] = useState<Array<ISelectOption>>([]);
    const [chain, setChain] = useState<ISelectOption>();
    const { address, isConnected } = useAccount();
    const { data: ensName } = useEnsName({ address });
    const { connect } = useConnect({
        chainId: chain?.chainId || mainnet.id,
        connector: new InjectedConnector(),
    })

    // Contract:
    // 0xBA270Fac745C38b360250Fc25084ae6457bBfDeA
    // Owner(Edison):
    // 0xFE0568Bf57911b9B0C7Fa42a6f557b9e20c3eB18
    // User(Shawn):
    // 0x0eb93fD4b79205B7a8cF65cBca4C7A16Bc499104

    // const { data } = useContractRead({
    //     address: QuattuorAddress,
    //     abi: QuattuorABI,
    //     functionName: 'tokenURI',
    //     args: ['0'],
    // });

    // TODO:fix CORS, fetch NFT from below contract
    const { data } = useContractRead({
        address: '0xe2200bEeeb26A2FCd67973d5443201B7d6a296Ba',
        chainId: sepolia.id,
        abi: erc721ABI,
        functionName: 'balanceOf',
        args: ['0x0eb93fD4b79205B7a8cF65cBca4C7A16Bc499104'],
    })

    console.log(data);

    // const { data } = useToken({
    //     address: QuattuorAddress,
    //     chainId: chain?.chainId
    // })

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