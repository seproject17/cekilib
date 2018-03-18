import axios from 'axios';

const state = () => ({
    user: null,
    pathnames: null,
    userLikes: null,
    cart: null,
    allProducts: null,
    wishlist: null,
    userData: null,
    book: null,
    reviews: [],
    userBorrowings: []
});
const getters = {
    currentUser: ({ user }) => user,
    isLogged: ({ user }) => user !== null,
    isAdmin: (state, { currentUser }) => currentUser && currentUser.role === 'admin',
    currentUserData: state => state.userData,
    fetchCart: state => state.cart,
    getAllProducts: state => state.cart,
    currentBook: state => state.book,
    currentReviews: state=>state.reviews,
    currentUserBorrowings: state => state.userBorrowings
};
const actions = {
    loadUser({ commit }) {
        return axios.get('/api/users/current').then(({ data }) => {
            commit('userLoaded', data);
        });
    },
    logout({ commit }) {
        return this.$axios.post('/users/logout').then(res => {
            commit('userLoaded', null);
        });
    },
    loadBook({ commit }, bookId) {
        return this.$axios.$get(`/books/${bookId}`).then((res) => {
            commit('bookLoaded', res);
        });
    },
    loadReviews({ commit }, bookId) {
        return this.$axios.$get(`/books/${bookId}/reviews`).then((res) => {
            commit('reviewsLoaded', res);
        });
    },
    loadCurrentUserBorrowings({commit,state}){
        return this.$axios.$get(`/users/${state.user.id}/borrowings`).then(res=>{
            commit('currentUserBorrowingsLoaded', res);
        })
    }
};
const mutations = {
    userLoaded(state, user) {
        state.user = user;
        console.log('USER CHANGED');
    },
    reviewsLoaded(state, reviews) {
        state.reviews = reviews;
    },
    bookLoaded(state, book) {
        state.book = book;
    },
    currentUserBorrowingsLoaded(state, borrowings){
        console.log("currentUser borrowings cokmmit", borrowings);
        state.userBorrowings = borrowings;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};