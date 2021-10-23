// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import '@openzeppelin/contracts/access/Ownable.sol';

contract StringBroadcaster is Ownable {
    
    event Broadcast(string stringData, string mutationType);

    function broadcastString(string memory plainTextString, string memory mutationType) public {
        emit Broadcast(plainTextString, mutationType);
    }
}