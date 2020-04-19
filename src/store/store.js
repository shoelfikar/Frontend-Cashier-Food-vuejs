import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    menu: [],
    selectMenu: [],
    username: localStorage.getItem('username') || null,
    user: null,
    msg: ''
  },
  getters: {
    getUser (state) {
      return state.username !== null;
    }
  },
  mutations: {
    getMenu (state, data) {
      state.menu = data;
    },
    userGet (state, data) {
      state.user = data;
    },
    getMsg (state, error) {
      state.msg = error;
    },
    // eslint-disable-next-line camelcase
    addMenu (state, id_menu) {
      // eslint-disable-next-line camelcase
      const data = state.menu.result.filter(item => item.id_menu === id_menu);
      // eslint-disable-next-line camelcase
      const selected = state.selectMenu.filter(item => item.id_menu === id_menu);
      if (state.selectMenu.length === 0 || selected[0] === undefined) {
        state.selectMenu.unshift(data[0]);
      }
      console.log(state.selectMenu);
    }
  },
  actions: {
    getData (context) {
      axios.get('http://localhost:7000/api/v1/pos/menu/')
        .then((res) => {
          context.commit('getMenu', res.data);
        });
    },
    getdataDetail (context) {
      axios.get('http://localhost:7000/api/v1/pos/menu/')
        .then((res) => {
          context.commit('getDetail', res.data);
        });
    },
    handleLogin (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:7000/api/v1/pos/user/login', data)
          .then((res) => {
            localStorage.setItem('username', res.data.result.username);
            resolve(res);
          })
          .catch((error) => {
            context.commit('getMsg', error.response.data.err);
          });
      });
    },
    closeAlert () {
      const mAlert = document.querySelector('.alert');
      mAlert.classList.toggle('fade');
    },
    register (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:7000/api/v1/pos/user/register', data)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            context.commit('getMsg', error.response.data.err);
          });
      });
    },
    inputMenu (context, data) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:7000/api/v1/pos/menu/data', data)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            context.commit('getMsg', error.response.data.err);
          });
      });
    }
  }
});
