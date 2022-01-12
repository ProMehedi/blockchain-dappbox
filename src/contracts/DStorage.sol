// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DStorage {
  // Variables
  string public name = "DStorage";
  uint public fileCount = 0;
  mapping(uint => File) public files;

  // Struct
  struct File {
    uint id;
    string hash;
    uint size;
    string fileType;
    string name;
    string description;
    uint timestamp;
    address owner;
  }

  // Event

  constructor() {
  }

  function uploadFile(string memory _hash, uint _size, string memory _fileType, string memory _name, string memory _description) public {

    fileCount++;
    files[fileCount] = File(fileCount, _hash, _size, _fileType, _name, _description, block.timestamp, msg.sender);

    // Make sure file description exists

    // Make sure file fileName exists

    // Make sure uploader address exists

    // Make sure file size is more than 0


    // Increment file id

    // Add File to the contract

    // Trigger an event
  }

}