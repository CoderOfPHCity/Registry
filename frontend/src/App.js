import React, { useState } from "react";
import abi from "./abi.json";
import "./App.css";
const ethers = require("ethers")



function SimpleRegistry() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [entityDetails, setEntityDetails] = useState({
    name: "",
    age: 0
  });


  const contractAddress = "0x315344a090269Eea9F8745b1A6d46DB6060677Df";
  
 
  const contractABI = abi;

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const updateName = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        await contract.updateName(newName);
        setNewName("");
      } catch (err) {
        console.error("Error updating name:", err);
      }
    }
  };

  const updateAge = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      try {
        await contract.updateAge(newAge);
        setNewAge(0);
      } catch (err) {
        console.error("Error updating age:", err);
      }
    }
  };

  const getEntityDetails = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      try {
        const details = await contract.getEntityDetails();
        setEntityDetails({ name: details[0], age: details[1] });
      } catch (err) {
        console.error("Error retrieving entity details:", err);
      }
    }
  };

  return (
    <div>
      <h3>Simple Registry By CoderOfPhcity</h3>
      
      <div>
        <label>New Name:</label>
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
        <button onClick={updateName}>Update Name</button>
      </div>

      <div>
        <label>New Age:</label>
        <input type="number" value={newAge} onChange={(e) => setNewAge(e.target.value)} />
        <button onClick={updateAge}>Update Age</button>
      </div>

      <div>
        <button onClick={getEntityDetails}>Get_New_Data</button>
        <p>New_Name: {entityDetails.name}</p>
        <p>New_Age: {Number(entityDetails.age)}</p>
      </div>
    </div>
  );
}

export default SimpleRegistry;
