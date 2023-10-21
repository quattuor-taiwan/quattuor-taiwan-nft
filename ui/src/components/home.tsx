
import Web3 from "web3";
import { useMetaMask } from "../hooks/useMetaMask"
import { CONTRACT_ADDRESS, FRIEND_TECH_ABI, formatChainAsNum } from "../utils"
import { useEffect } from "react";

export const Home = () => {
    const { wallet } = useMetaMask()

    useEffect(() => {
        const web3 = new Web3('https://mainnet.base.org');

        const friendTechContract = new web3.eth.Contract(FRIEND_TECH_ABI, CONTRACT_ADDRESS);

        friendTechContract.methods.owner().call().then(owner => {
            console.log(owner);
        })
    }, [])

    return (
        <div className="h-max p-4">
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