const { common } = require('../../utils/transaction');
const { Transaction } = require('@ethereumjs/tx');
const { web3Eth, toHex } = require('../../utils/web3-connect');
const { sha256 } = require('../../utils/crypto');
const { stringMutations } = require('../../db/collection');
const STRING_DATA_CONTRACT_ABI =
    require('../../../contracts/artifacts/StringBroadcaster_metadata.json')
        .output.abi;
const STRING_DATA_CONTRACT_ADDRESS = process.env.STRING_DATA_CONTRACT_ADDRESS;
const STRING_DATA_CONTRACT = new web3Eth.Contract(
    STRING_DATA_CONTRACT_ABI,
    STRING_DATA_CONTRACT_ADDRESS
);

const stringify = (data) => {
    return JSON.stringify(data);
};

const filepath = __filename.split('/');
const filename = filepath[filepath.length - 1];
const line = require('current-line');
const e = require('cors');

const broadcastString = async (stringData, mutationType) => {
    try {
        const publicKey = process.env.PUBLIC_KEY;
        const privateKey = Buffer.from(process.env.PRIVATE_KEY, 'hex');

        const contractData = STRING_DATA_CONTRACT.methods
            .broadcastString(stringData)
            .encodeABI();

        const nonce = await web3Eth.getTransactionCount(publicKey, 'pending');
        const gasEstimate = await web3Eth.estimateGas({
            from: publicKey,
            nonce: nonce,
            to: STRING_DATA_CONTRACT_ADDRESS,
            data: contractData,
        });

        const rawTxn = {
            nonce: toHex(nonce),
            gasPrice: toHex(300000000000),
            gasLimit: toHex(gasEstimate),
            to: STRING_DATA_CONTRACT_ADDRESS,
            value: '0x0',
            data: contractData,
        };

        const stringifyTxn = stringify(rawTxn);
        console.log(`Raw Transaction: \n${stringifyTxn}\n-------------------`);

        const readyTX = toHex(
            Transaction.fromTxData(rawTxn, { common })
                .sign(privateKey)
                .serialize()
        );

        console.log(`Broadcast ${stringData}: ${readyTX}\n-------------------`);

        web3Eth.sendSignedTransaction(readyTX);

        STRING_DATA_CONTRACT.events
            .Broadcast()
            .on('data', async (event) => {
                const response = {
                    stringData: event.returnValues.stringData,
                    mutationType: event.returnValues.mutationType
                };
                const mutatedString = await crypto[response.mutationType].call()
                // await sha256(response.stringData);
                let m1 = `PlainTestString=${response.stringData}`,
                    m2 = `MutationType=${response.mutationType}`,
                    m3 = `MutatedString=${mutatedString}`;
                console.log(`Broadcast Event:${m1}${m2}${m3}`);
                const dbTxn = await stringMutations.insertOne({
                    plainTextString: response.stringData,
                    mutationType: response.mutationType,
                    mutatedString: mutatedString,
                });
                if(dbTxn.acknowledged){
                    console.log(`DB Insert Success: ${dbTxn.insertedId}`)
                }else{
                    console.log(`DB Insert Fail: ${dbTxn}`)
                }
            })
            .on('error', (error, receipt) => {
                const fileInfo = `${filename}:${line.get().line}`;
                console.error(`${fileInfo} - ${error.message}`);
                console.error(`Broadcast Event Error: ${stringify(error)}`);
                console.error(`Broadcast Event Error Receipt: ${stringify(receipt)}`);
            });

        return { success: true, message: 'Your Transaction Has Been Broadcast!' };
    } catch (error) {
        console.error(error.stack);
        throw new Error(error);
    }
};

module.exports = { broadcastString };
