export const ErrorConstant = {
    default: 'Something went wrong',
}

export const LoginState = {
    init: 'init',
    processing: 'processing',
    error: 'error',
    success: 'success',
}
export const CommonConstant = {
    defaultPageSize: 20,
    mode: process.env.REACT_APP_MODE,
    maxBonus: 10 ** 18,
    totemChart: 'https://coinmarketcap.com/currencies/totem-new-earth-systems/',
    nullTx: '0x0000000000000000000000000000000000000000000000000000000000000000',
    nullAddress: '0x0000000000000000000000000000000000000000',
    nativeAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
}

export const StorageConstant = {
    token: 'token',
    user: 'user',
    countryId: 'CountryId',
    countryCode: 'CountryCode',
    state: 'state',
}
export const ErrorMessageConstant = {
    "ERR-ALREADY-ADDED-IT": "An item from this offer is already in your cart please discard one and then select or you can select any one from here and it will automatically discard the other item from the cart.",
    "ERR-ALREADY-BOUGHT-IT": "You Buy It In Past So Not Able To Re-purchase It",
}
export const AuthPopup = {
    login: 'LOGIN',
    register: "REGISTER",
    forgotPassword: "FORGOT_PASSWORD",
}

export const AcceptFileType = {
    image: {
        'image/*': ['.jpeg','.png','.jpg','.gif'],
    },
    video: {
        'video/*': ['.mp4','.webm','.wav','.mp3','.ogg','.glb','.gltf','.mov'],
    },
    imageVideo: {
        'image/*': ['.jpeg','.png','.jpg','.gif','.mp4','.webm','.wav','.mov','.mp3','.ogg','.glb','.gltf'],
    },
}