//import DStorage from '../abis/DStorage.json'
import React from 'react'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3'
import './App.css'

//Declare IPFS

const App = () => {
  const [loading, setLoading] = React.useState(false)
  const [account, setAccount] = React.useState('')
  const [files, setFiles] = React.useState([])

  React.useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const loadWeb3 = () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      )
    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3

    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
  }

  const uploadFile = () => {}

  return (
    <div>
      <Navbar account={account} />
      {loading ? (
        <div id='loader' className='text-center mt-5'>
          <p>Loading...</p>
        </div>
      ) : (
        <Main files={files} uploadFile={uploadFile} />
      )}
    </div>
  )
}

export default App
