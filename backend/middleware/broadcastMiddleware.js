const debug = require('../utils/debug');
let validationError;

const validateBroadcaster = async (req, res, next) => {
    const body = req.body;
    if (
        !(
            body.hasOwnProperty('stringData') &&
            body.hasOwnProperty('mutationType')
        )
    ) {
        validationError = `Invalid Request: Missing body parameters.`;
        debug.error(validationError);
        return res.status(422).json({ success: false, error: validationError });
    }

    const mutationTypes = {
        rot13: true,
        sha256: true,
        cipher: true,
    };

    const validMutationType = req.body.mutationType.toLowerCase();
    if (!mutationTypes[validMutationType]) {
        validationError = `Invalid Request: Invalid mutation type.`;
        debug.error(validationError);
        return res.status(422).json({ success: false, error: validationError });
    }
    next();
};

module.exports = { validateBroadcaster };
