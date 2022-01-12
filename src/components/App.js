//import DStorage from '../abis/DStorage.json'
import React from 'react'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3'
import './App.css'

//Declare IPFS

const App = () => {
  const [loading, setLoading] = React.useState(false)
  const [account, setAccount] = React.useState('0x0')
  const [files, setFiles] = React.useState([])

  React.useEffect(() => {
    loadWeb3()
    loadBlockchainData()
  }, [])

  const loadWeb3 = async () => {}

  const loadBlockchainData = async () => {}

  const uploadFile = async () => {}

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
