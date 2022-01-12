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
  event FileUploaded(uint fileId, string hash, uint size, string fileType, string name, string description, uint timestamp, address owner);

  function uploadFile(string memory _hash, uint _size, string memory _fileType, string memory _name, string memory _description) public {
    require(bytes(_hash).length == 32);
    require(bytes(_fileType).length > 0);
    require(bytes(_name).length > 0);
    require(bytes(_description).length > 0);
    require(_size > 0);
    require(msg.sender != address(0));

    fileCount++;
    files[fileCount] = File(fileCount, _hash, _size, _fileType, _name, _description, block.timestamp, msg.sender);

    emit FileUploaded(fileCount, _hash, _size, _fileType, _name, _description, block.timestamp, msg.sender);
  }
}