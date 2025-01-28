import crypto from 'crypto-js';

const { ENCRYPTION_SECRET_KEY,
  ENCRYPTION_SECRET_IV,
  ENCRYPTION_METHOD } = process.env;

if (!ENCRYPTION_SECRET_KEY || !  ENCRYPTION_SECRET_IV
 || !ENCRYPTION_METHOD) {
  throw new Error('secretKey, secretIV, and ecnryptionMethod are required')
}

// Generate secret hash with crypto to use for encryption
const key = crypto
  .createHash('sha512')
  .update(ENCRYPTION_SECRET_KEY)
  .digest('hex')
  .substring(0, 32);

const encryptionIV = crypto
  .createHash('sha512')
  .update(ENCRYPTION_SECRET_IV)
  .digest('hex')
  .substring(0, 16);

const getEncryptedDataController = (data: String) => {
  const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, key, encryptionIV)
  return Buffer.from(
    cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
  ).toString('base64')
  
};

const encryptionControllerFunctions = {
  getEncryptedDataController,
};

module.exports = encryptionControllerFunctions;