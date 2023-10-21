# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```


- Contract: 0xBA270Fac745C38b360250Fc25084ae6457bBfDeA

- Generate ABI: `solc --abi ./contracts/core/Non-Fungible-Token.sol -o ./contracts/abi --base-path ./node_modules`