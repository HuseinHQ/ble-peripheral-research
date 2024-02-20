import { NativeModules, Platform } from 'react-native';
const Aes = NativeModules.Aes;

const generateKey = (
  password: string,
  salt: string,
  cost: number,
  length: number,
) => Aes.pbkdf2(password, salt, cost, length);

const encryptData = (text: string, key: any) => {
  return Aes.randomKey(16).then((iv: any) => {
    return Aes.encrypt(text, key, iv).then((cipher: any) => ({
      cipher,
      iv,
    }));
  });
};

const encryptDataIV = (text: string, key: any, iv: any) => {
  return Aes.encrypt(text, key, iv).then((cipher: any) => ({
    cipher,
    iv,
  }));
};

const decryptData = (encryptedData: { cipher: any; iv: any }, key: any) =>
  Aes.decrypt(encryptedData.cipher, key, encryptedData.iv);
const iv_string = '0123456789abcdef0123456789abcdef';

let encrypt_key: any = '';
let encrypt_string: any = '';
let plain_string: any = '1234567890';
let encrypt_iv: any = '';

// KEY GENERATION
private AESKey() {
  try {
    generateKey('nixstory@gmail.com', 'SALT', 1000, 256).then((key: any) => {
      encrypt_key = key;
    })
  } catch (e) {
    console.error(e)
  }
}

// ENCRYPT
function AESEncrypt() {
  const key = encrypt_key;

  try {
    encryptDataIV(plain_string, key, iv_string).then(({ cipher, iv }) => {
      encrypt_iv = iv;
      encrypt_string = cipher;
    }).catch((error: any) => { })
  } catch (e) {
    console.error(e)
  }
}

// DECRYPT
async function AESDecrypt() {
  const key = encrypt_key;
  const iv = encrypt_iv;
  const cipher = encrypt_string;

  try {
    var decrypt_string = await decryptData({ cipher, iv }, key);

    console.log("plain text : " + decrypt_string);
  } catch (e) {
    console.error(e)
  }
}