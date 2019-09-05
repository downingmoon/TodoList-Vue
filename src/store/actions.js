import Const from '../constant'

export default {
    [Const.SUBMIT_LOGIN]: (store, payload) => {
        store.commit(Const.SUBMIT_LOGIN, payload)
    },
    [Const.LOGOUT]: (store) => {
        store.commit(Const.LOGOUT)
    }
}