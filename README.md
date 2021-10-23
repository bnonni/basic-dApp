
# Basic dApp

## Purpose
This decentralized application (dApp) uses a react frontend form to submit a plain text string and a mutation schema (supported rot13, aes-256, sha256) to the backend node/express server. Upon 

## Know Before You Go
Technology needed to run this app:
1. Code editor (built using VSCode)
2. git v2.33.1
3. yarn v1.22.17
4. node v14.18.1 or LTS
5. web3.js v1.6.0
6. solidity v0.8.7
7. rinkeby - ethereum test net
8. infura.io WS RPC
9. react.js, npx, react-scripts

This application uses the following 3rd party services:
- Mongo Atlas
  - All IP addresses are whitelisted for ease of install and use.
  - The URI with credentials along will be provided in a separate `.env` file by [@bnonni](https://github.com/bnonni).
- Infura.io
  - The RPC url will be included in the `.env` file.

## Install
1. Clone repo from https://github.com/bnonni/basic-dApp.git
2. Open 2 separate terminal windows
3. In the first, run this command `cd basic-dApp/frontend && yarn && yarn start`
4. In the second, run this command `cd ../backend && yarn && yarn start`
5. You should see output for both in your terminals
6. The frontend is running on `http://localhost:3000/`
7. The backend API is running on `http://localhost:4000/`
8. You can now broadcast strings to the rinkeby blockchain!
