// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol"; 

contract TPNFT is ERC721URIStorage {
    address contractOwner; //Owner of the contract/NFT Project
    using Strings for uint256; //importing all functions of Strings library in uint256
    uint256 tokenCounter = 5;
    uint256 requestCounter = 0;
    string ownersData;

    struct NFT {
        address nftOwner;
        uint256 nftId;
        string nftLink;
        string nftDescription;
    }
    mapping(uint256 => NFT) public idToNft;

    //token = nft

    constructor() ERC721("Arkham NFT", "BAT") {
        //Project name and symbol
        contractOwner = msg.sender;

        idToNft[0] = NFT({
            nftId: 1,
            nftDescription: "I am way up, I feel blessed",
            nftLink: "https://bafybeihhpwx2aw6gr3qkepyqj5k3iw5tp4cqejleuhmjwliwc7wsr2ff3i.ipfs.w3s.link/LIVE.png",
            nftOwner: address(0)
        });

        idToNft[1] = NFT({
            nftId: 2,
            nftDescription: "An image of my friend Prakhar",
            nftLink: "https://bafybeidlgoiy5cktkuceyxgswyg6u2coqegsbhuvaz7t2adlmbd6g7qvx4.ipfs.w3s.link/Prakhar.png",
            nftOwner: address(0)
        });
        idToNft[2] = NFT({
            nftId: 3,
            nftDescription: "An image of my friend Amena",
            nftLink: "https://bafybeiftt5abe6octnlgnc4cgdum7vhuitry6t2euw5xemtzu6eubekwau.ipfs.w3s.link/Amena.png",
            nftOwner: address(0)
        });
        idToNft[3] = NFT({
            nftId: 4,
            nftDescription: "An image of my friend Mustafa",
            nftLink: "https://bafybeifczkwptefkuz4aaat4jcmz3757gjngswjimvjie2ldldlo32f7tq.ipfs.w3s.link/Mustafa.png",
            nftOwner: address(0)
        });
        idToNft[4] = NFT({
            nftId: 5,
            nftDescription: "We are Team Rocket!",
            nftLink: "https://bafybeiae6pun7y23ncgkym5q4rj3byq57y5wquzrwgpncrav3u5rdn7ldy.ipfs.w3s.link/Team%20Rocket.png",
            nftOwner: address(0)
        });
    }

    //events
    event nftOwnerChange(
        address indexed from,
        address indexed to,
        uint256 indexed nftId
    ); // add as 4th arguement: uint256 _price

    //modifiers
    modifier onlyOwner() {
        require(msg.sender == contractOwner);
        _;
    }
    modifier notOwner() {
        require(msg.sender != contractOwner);
        _;
    }

    struct Request {
        address nftOwner;
        uint256 nftId;
        string nftDescription;
        string nftLink;
        bool permission;
    }

    mapping(uint256 => Request) public idToRequestNft;
    mapping(uint256 => address[]) public nftOwners;

    function getNftOwners(uint256 nftId)
        public
        view
        returns (address[] memory)
    {
        nftId -= 1;
        return nftOwners[nftId];
    }

    function getTokenURI(uint256 nftId) public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked( //are we even using this
            "{",
            '"id": "',
            (idToNft[nftId].nftId).toString(),
            '",',
            '"description": "',
            idToNft[nftId].nftDescription,
            '",',
            '"image": "',
            idToNft[nftId].nftLink,
            '"'
            "}"
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(dataURI)
                )
            );
    }

    function getContractOwner() public view returns (address) {
        return contractOwner;
    }

    function storeOwners(
        uint256 nftId,
        address from,
        address to
    ) public {
        address[] storage tempArray = nftOwners[nftId];
        tempArray.push(from);
        tempArray.push(to);
        nftOwners[nftId] = tempArray;
    }

    function mint(uint256 nftId) public payable {
        // require(msg.sender != idToNft[nftId].nftOwner, "You are already the Owner!"); //seems like ERC721 does not allow same token to get minted again which totally makes sense. If the minted owner wants to sell, then transfer() will be used.

        //can add payment wala thing
        // require(msg.value == 10 ether, "Not enough Ethers!");
        // uint256 newItemId = tokenCounter.current();
        nftId -= 1;
        storeOwners(nftId, idToNft[nftId].nftOwner, msg.sender);
        _safeMint(msg.sender, nftId);
        _setTokenURI(nftId, getTokenURI(nftId));
        idToNft[nftId].nftOwner = msg.sender;
        emit nftOwnerChange(address(0), msg.sender, nftId); //add msg.value as 4th arguement

        // tokenCounter.increment(); //Incrementing the pointer/index/counter of main nft list
    }

    function returnInitialObjects() public view returns (NFT[] memory) {
        NFT[] memory tempArray = new NFT[](tokenCounter);
        for (uint256 i = 0; i < tokenCounter; i++) {
            tempArray[i] = idToNft[i];
        }
        return tempArray;
    }

    function buy(uint256 nftId) external {
        //add payable later
        // uint256 price = tokenIdToPrice[_tokenId];
        // require(price > 0, 'This token is not for sale');
        // require(msg.value == 5 ether, "Not enough Funds"); FIX THIS
        nftId -= 1;
        storeOwners(nftId, idToNft[nftId].nftOwner, msg.sender);
        address seller = ownerOf(nftId); // = idToNft[nftId]
        _transfer(seller, msg.sender, nftId);
        idToNft[nftId].nftOwner = msg.sender;
        // tokenIdToPrice[_tokenId] = 0; // not for sale anymore
        // payable(seller).transfer(msg.value); // send the ETH to the seller
        emit nftOwnerChange(seller, msg.sender, nftId); //add msg.value as 4th arguement
    }

    function requestPermission(
        string memory nftDescription,
        string memory nftLink
    ) public {
        Request memory newRequest;
        newRequest.nftId = requestCounter + 1; //starts with 1, just like nftId
        newRequest.nftOwner = msg.sender;
        newRequest.nftDescription = nftDescription;
        newRequest.nftLink = nftLink;

        idToRequestNft[requestCounter] = newRequest;
        requestCounter += 1;
    }

    function decidePermission(bool decision, uint256 requestedNftId)
        public
        onlyOwner
    {
        requestedNftId -= 1;
        Request memory requestedNft = idToRequestNft[requestedNftId];
        if (decision) {
            requestedNft.permission = true;
            idToRequestNft[requestedNftId] = requestedNft; //changing the permission and reassigning in the mapping

            NFT memory newNft;
            newNft.nftOwner = address(0);
            newNft.nftDescription = requestedNft.nftDescription;
            newNft.nftLink = requestedNft.nftLink;
            newNft.nftId = tokenCounter + 1;
            idToNft[tokenCounter] = newNft;
            tokenCounter += 1;
            requestCounter -= 1;
        } else {
            //what to do if decline?
        }
    }

    function viewRequests() public view returns (Request[] memory) {
        Request[] memory pendingRequests = new Request[](requestCounter);
        for (uint256 i = 0; i < requestCounter; i++) {
            if (!(idToRequestNft[i].permission)) {
                pendingRequests[i] = idToRequestNft[i];
            }
        }
        return pendingRequests;
    }
}
