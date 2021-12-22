import React, { Component, useState, useEffect } from "react";
import Ethermon from "./contracts/Ethermon.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
  // initialize the state variables of the application
  const [name, setName] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [owner, setOwner] = useState(undefined);

  // equivalent to the componentDidMount function of older React frameworks
  useEffect( () => {
      const init = async () => {
          try {
              // Get network provider (typically MetaMask) and web3 instance
              const web3 = await getWeb3();

              // Use web3 to get the user's accounts from the provider (MetaMask)
              const accounts = await web3.eth.getAccounts();

              // Get the contract instance
              const networkId = await web3.eth.net.getId();
              const deployedNetwork = Ethermon.networks[networkId];
              const instance = new web3.eth.Contract(
                  Ethermon.abi,
                  deployedNetwork && deployedNetwork.address,              
              );
              
              // Set web3, accounts, contract to the state
              setWeb3(web3);
              setContract(instance);
              setAccounts(accounts);

              const GameOwner = contract.methods.gameOwner().call();
              //setOwner(GameOwner);
              //console.log(owner);

          } catch (error) {
              // Catch any errors for any of the above operations
              alert(
                  `Failed to load web3, accounts, or contract. Did you migrate the contract or install MetaMask? Check console for details.`,
              );
              console.error(error);
          }
      };
      init();
  }, []);

  // is called whenever there was any change in the state variables web3, accounts, contract
  useEffect( () => {
      const runExample = async () => {
          // example of interaction with the smart contract
          try{
              // Stores a given value, 5 by default
              //await contract.methods.set(5).send({ from: accounts[0] });

              // Get the value from the contract to prove it worked
              //const response = await contract.methods.get().call();

              
          }
          catch{
              alert('No contract deployed or account error; please check that MetaMask is on the correct network, reset the account and reload page');
          }
      }
      if(typeof(web3) != 'undefined'
          && typeof(accounts) != 'undefined'
          && typeof(contract) != 'undefined'){
          runExample();
      }
  }, [web3, accounts, contract]);

  if (typeof(web3) === 'undefined') {
      return <div className="App">Loading Web3, accounts, and contract... Reload page</div>;
  }

  const handleNameChange = (event) => {setName(event.target.value)}
  const handleAddressChange = (event) => {setAddress(event.target.value)}

  let handleSubmit = (event) => {
  event.preventDefault();
  contract.methods.createNewMonster(name, address).send({ from: accounts[0] });
  }

  

  // equivalent to the render function of older React frameworks
  return (
    <div>

      <div>

        <h1>Hi, your address is: {accounts} </h1>
        
         {1==1?<form onSubmit={handleSubmit}>
           <h2>You are the game owner, you can create new monsters and give to players</h2>
              <label>
                Name for New Monster:
                <input type="text" name="name" value={name}
                 onChange={handleNameChange}/>
              </label>

              <label>
                Address of player who you give New Monster to :
                <input type="text" name="address" value={address}
                 onChange={handleAddressChange}/>
              </label>

              <input type="submit" value="Create Monster" />
          </form>:<p>you are not GameOwner, you can not create monsters</p> }
          
      </div>

      <div>
        <h1>My ERC721 Pokemon Game1</h1>
        <p>you have monster:</p>
        //To show all of monsters that player have by detecting their address
          <h3>name:{} level:{}</h3> 
      </div>

      <div>
        <form>
        //player to select one monster from what he owns
          <p>if you want to attack other monster, select your fighter !</p> 
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>

          <p>Pick your opponent !</p>
          //select opponent's address and pick one of his monsters to attack
          <select name="cars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
          <button>Attack now!!</button>
        </form>
      </div>
    </div>

  );
}

export default App;
