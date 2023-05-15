import { keccak256 } from 'ethereum-cryptography/keccak'
import { toHex, utf8ToBytes } from 'ethereum-cryptography/utils'
import React, { useState } from 'react'
import './App.scss'
import Transfer from './Transfer'
import Wallet from './Wallet'

function App() {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  let message
  try {
    message = toHex(keccak256(utf8ToBytes('zeubi')))
  } catch (error) {}
  return (
    <div className='app'>
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        message={message}
      />
      <Transfer setBalance={setBalance} address={address} message={message} privateKey={privateKey} />
    </div>
  )
}

export default App
