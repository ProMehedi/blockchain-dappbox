import DStorage from '../abis/DStorage.json'
import React from 'react'
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3'
import ipfsClient from 'ipfs-http-client'
import './App.css'
import { ScaleLoader } from 'react-spinners'

//Declare IPFS
const ipfs = ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})

const App = () => {
  const [loading, setLoading] = React.useState(false)
  const [uploading, setUploading] = React.useState(false)
  const [account, setAccount] = React.useState('')
  const [files, setFiles] = React.useState([])
  const [fileCount, setFileCount] = React.useState(0)
  const [contract, setContract] = React.useState(null)

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
    setLoading(true)

    const web3 = window.web3

    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])

    const networkId = await web3.eth.net.getId()
    const networkData = DStorage.networks[networkId]
    if (networkData) {
      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address)
      setContract(dstorage)
      const _fileCount = await dstorage.methods.fileCount().call()
      setFileCount(Number(_fileCount))

      setFiles([])
      for (let i = 1; i <= _fileCount; i++) {
        const file = await dstorage.methods.files(i).call()
        setFiles((files) => [...files, file])
      }
    } else {
      window.alert('Contract not deployed to "Ropsten" network.')
    }

    setLoading(false)
  }

  const uploadFile = (name, desc, buffer, type) => {
    setUploading(true)

    ipfs.add(buffer, (err, result) => {
      if (err) {
        console.error(err)
        return
      }

      const hash = result[0].hash
      const size = result[0].size
      contract.methods
        .uploadFile(hash, size, type, name, desc)
        .send({ from: account })
        .once('receipt', (receipt) => {
          setUploading(false)
          loadBlockchainData()
        })

      console.log(result)
    })
  }

  console.log(fileCount)
  console.log(files)
  console.log(uploading)

  return (
    <div>
      <Navbar account={account} />
      {loading ? (
        <div
          className='d-flex align-items-center justify-content-center'
          style={{ minHeight: 'calc(100vh - 40px)' }}
        >
          <ScaleLoader color='#123abc' />
        </div>
      ) : (
        <Main files={files} uploadFile={uploadFile} loading={uploading} />
      )}
    </div>
  )
}

export default App
