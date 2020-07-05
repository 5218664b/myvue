import CryptoJS from 'crypto-js'

export default {
    md5(message) {
        return CryptoJS.MD5(message).toString();
    },
    sha1(message) {
        return CryptoJS.SHA1(message).toString();
    },
    sha256(message) {
        return CryptoJS.SHA256(message).toString();
    },
    sha512(message) {
        return CryptoJS.SHA512(message).toString();
    },
    sha3(message, outLen) {
        return CryptoJS.SHA3(message, { outputLength: outLen }).toString()
    },
    ripemd160(message) {
        return CryptoJS.RIPEMD160(message).toString()
    },
    hmacmd5(message, key) {
        return CryptoJS.HmacMD5(message, key).toString()
    },
    hmacsha1(message, key) {
        return CryptoJS.HmacSHA1(message, key).toString()
    },
    hmacsha256(message, key) {
        return CryptoJS.HmacSHA256(message, key).toString()
    },
    hmacsha512(message, key) {
        return CryptoJS.HmacSHA512(message, key).toString()
    },
    hmacsha3(message, key, outLen) {
        return CryptoJS.HmacSHA3(message, key, { outputLength: outLen }).toString()
    },
    hmacripemd160(message, key) {
        return CryptoJS.HmacRIPEMD160(message, key).toString()
    }
}
