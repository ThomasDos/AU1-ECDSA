const express = require('express')
const app = express()
const cors = require('cors')
const port = 3042
const validateSignature = require('./middlewares/validate-signature')

app.use(cors())
app.use(express.json())

//Private keys commented and public keys as keys in balances object
const balances = {
  //fd4d673768c02ac54c285290404b180f4b4505361d4a68865ee55c0358574d36
  '03843c5ccdfc16c38a24fba8a5e633d7d7b39b9e48debcecde36062762316fa319': 100,
  //596bf6af3500a0147c7faae81809698d2eb52bdaa443e5963b7a9b93577a809f
  '03f16fbc13372d488031db564bbdd2d1f7f0e25d6f55c1be1caad9ca88e9a6fb35': 50,
  //fdaf5b6c494b9adb1c3b468a156647534b7196677bbaa15d5ed55646be90b96e
  '024dcc1dd5e801aeaaed2f46201ad06af10ad83303d00baa8cbf063121704340cf': 75
}

app.get('/balance', validateSignature, (req, res) => {
  const { publickey } = req.headers

  const balance = balances[publickey] || 0
  res.send({ balance })
})

app.post('/send', validateSignature, (req, res) => {
  const { publickey } = req.headers
  const { recipient, amount } = req.body

  setInitialBalance(publickey)
  setInitialBalance(recipient)

  if (balances[publickey] < amount) {
    res.status(400).send({ message: 'Not enough funds!' })
  } else {
    balances[publickey] -= amount
    balances[recipient] += amount
    res.send({ balance: balances[publickey] })
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0
  }
}
