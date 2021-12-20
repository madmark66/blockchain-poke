// SPDX-License-Identifier: MIT

pragma solidity >0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
//import "https://github.com/athiwatp/openzeppelin-solidity/blob/master/contracts/token/ERC721/ERC721Full.sol";
//import "node_modules/openzeppelin-solidity-master/contracts/token/ERC721/ERC721Full.sol";

contract Ethermon is ERC721Full{
    
    constructor(string memory _name, string memory _symbol) 
       ERC721Full ( _name ,  _symbol) public {
           gameOwner = msg.sender;
       }  
       
    address public gameOwner;
    
    mapping(uint => address) public owners;
       
    struct Monster {
        string name;
        uint level;
    } 
    
    Monster[] public monsters;

    function createNewMonster(string memory _name, address _to) public {
        require(msg.sender == gameOwner, "Only game owner can create new monsters");
        uint id = monsters.length;
        monsters.push(Monster(_name, 1));
        
        _mint(_to, id);
        
    }


    //create a array that can store the id of monsters owned by an specific address
    // the said array can be formed through calling a function with for loop of "tokenOfOwnerByIndex(owner, index)"
    // the argument of this function would be address, the output is the said array
    


    function checkMonsterIdsByAddress (address _addr) public view returns (uint256[] memory ){
        require(_addr != address(0), "Query for the zero address");
        
        uint[] memory ownedTokenIds = new uint[](5);

        uint balance = balanceOf(_addr);

        uint id;

        for(uint i=0; i<balance; i++){

            id = tokenOfOwnerByIndex(_addr, i);

            ownedTokenIds[i] = id;
        }
        
        return ownedTokenIds;

    }



    modifier onlyOwnerOf(uint _monsterId) {
    require(ownerOf(_monsterId) == msg.sender, "Must be owner of monster to battle");
    _;
    }
    
    function battle(uint _attackingMonster, uint _defendingMonster) public onlyOwnerOf(_attackingMonster) {
        Monster storage attacker = monsters[_attackingMonster];
        Monster storage defender = monsters[_defendingMonster];
 
        if (attacker.level >= defender.level) {
            attacker.level += 2;
            defender.level += 1;
        }
        else{
            attacker.level += 1;
            defender.level += 2;
        }
    }







}
