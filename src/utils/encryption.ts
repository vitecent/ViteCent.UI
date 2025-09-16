import CryptoJS from 'crypto-js'


const AES_KEY = import.meta.env.VITE_AES_KEY
const AES_IV = import.meta.env.VITE_AES_IV

// AES加密
export const encryptAES = (data: object) => {
    let strData = JSON.stringify(data)

    const key = CryptoJS.enc.Utf8.parse(AES_KEY)
    const iv = CryptoJS.enc.Utf8.parse(AES_IV)

    const encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(strData),
        key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    )

    return encrypted.toString()
}

// AES解密
export const decryptAES = (data: string) => {
    const key = CryptoJS.enc.Utf8.parse(AES_KEY)
    const iv = CryptoJS.enc.Utf8.parse(AES_IV)

    const decrypted = CryptoJS.AES.decrypt(
        data,
        key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    )

    return decrypted.toString(CryptoJS.enc.Utf8)
}