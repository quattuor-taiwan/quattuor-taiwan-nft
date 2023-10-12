// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable {
    
    
    mapping(uint256 => uint256) private validate;

    uint256 private constant FEE = 0.0001 ether;

    constructor(address initialOwner)
        ERC721("NFT-With-Expire", "MTK")
        Ownable(initialOwner)
    {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/QmNkVRUGRhrKcQG6sqWBahLTqLUwNJThGhdRUwTW9UY9UJ/";
    }

    function safeMint(address to, uint256 tokenId, string memory uri)
        public
        onlyOwner
    {
        require(tokenId < 5, "over the limit");
        _safeMint(to, tokenId);
        validate[tokenId] = block.timestamp + 30 days;
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function charge(uint256 tokenId) public payable returns (uint256 requestId) {
        require(_ownerOf(tokenId) != address(0), "The token is not valiable");
        require(msg.value >= FEE, "The value is not enough");
        uint256 value = block.timestamp + 30 days;
        validate[tokenId] = value;
        return value;
    }

    function getExpireTime(uint256 tokenId) public view returns (uint256) {
        return validate[tokenId];
    }

    function withdrawAll() public onlyOwner {
        (bool success,) = msg.sender.call{value: address(this).balance}("WithdrawAll");
        require(success, "tx failed");
    }

    receive() external payable {}
}