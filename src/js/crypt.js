import CryptoJS from 'crypto-js/crypto-js'

export function encrypt (plainText) {
    const key = CryptoJS.enc.Utf8.parse("hf8685nfhfhjs9h8");
    const iv1 = key;
    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        keySize: 16,
        iv: iv1,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted + "";
}

export function decrypt (cipher) {
    const key = CryptoJS.enc.Utf8.parse("hf8685nfhfhjs9h8");
    const iv1 = key;
    const plainText = CryptoJS.AES.decrypt(cipher, key, {
        keySize: 16,
        iv: iv1,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    return plainText.toString(CryptoJS.enc.Utf8);
}