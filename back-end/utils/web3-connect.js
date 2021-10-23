const Web3 = require('web3');
const { ws, http } = require('./web3-options');
const RPC_URL = process.env.RPC_URL;
const provider = new Web3.providers.WebsocketProvider(RPC_URL, ws);
console.log(`Connected to RPC ${RPC_URL}`);

const web3 = new Web3(provider);
const web3Eth = web3.eth;
const web3Utils = web3.utils;
const batch = new web3Eth.BatchRequest();

const toBNtoWei = (num) => {
    return web3Utils.toBN(web3Utils.toWei(num));
};

const toBN = (num) => {
    return web3Utils.toBN(num);
};

const toWei = (num) => {
    return web3Utils.toWei(num);
};

const toHex = (num) => {
    return web3Utils.toHex(num);
};

const fromWei = (num) => {
    return web3Utils.fromWei(num);
};

module.exports = {
    web3,
    web3Eth,
    web3Utils,
    batch,
    toBNtoWei,
    toBN,
    toWei,
    fromWei,
    toHex,
};
