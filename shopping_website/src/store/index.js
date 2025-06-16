// 没用上
export default createStore({
    state: {
        isLoggedIn: false,
        username: '',
    },
    mutations: {
        login(state, payload) {
            state.isLoggedIn = true;
            state.username = payload.username;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.username = '';
        }
    }
});
