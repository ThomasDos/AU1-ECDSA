import React from 'react'
import server from './server'

import { secp256k1 } from 'ethereum-cryptography/secp256k1'
import { toHex } from 'ethereum-cryptography/utils'
import createStringifiedSignature from './utils/create-signature'

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, message }) {
  async function onChange(evt) {
    let address
    const privateKey = evt.target.value
    setPrivateKey(privateKey)

    try {
      address = toHex(secp256k1.getPublicKey(privateKey))
      const signature = createStringifiedSignature(message, privateKey)
      setAddress(address)
      if (address) {
        const {
          data: { balance }
        } = await server.get(`balance`, { headers: { message, signature, publickey: address } })
        setBalance(balance)
      } else {
        setBalance(0)
      }
    } catch (error) {}
  }

  let addressHex
  try {
    addressHex = toHex(address)
  } catch (error) {}

  return (
    <div className='container wallet'>
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder='Type your private key' value={privateKey} onChange={onChange} />
      </label>

      <div>{addressHex}</div>

      <div className='balance'>Balance: {balance}</div>
    </div>
  )
}

export default Wallet
