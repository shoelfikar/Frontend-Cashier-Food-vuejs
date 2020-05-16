import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    menu: [],
    selectMenu: [],
    token: localStorage.getItem('token') || null,
    user: null,
    msg: '',
    dataItem: [],
    qty: 1,
    sum: 0,
    ctgry: []
  },
  getters: {
    getUser (state) {
      return state.token !== null;
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
    getctgr (state, data) {
      state.ctgry = data;
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
      state.dataItem = {
        id: data[0].id_menu,
        name: data[0].name,
        id_category: data[0].category,
        price: data[0].price,
        counter: 1,
        img: data[0].image
      };
      // console.log(id_menu);
    },
    // eslint-disable-next-line camelcase
    increment (state) {
      // eslint-disable-next-line camelcase
      return state.qty++;
    },
    totalItem (state) {
      const total = state.selectMenu.map((e) => {
        state.sum += e;
      });
      console.log(total);
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
            localStorage.setItem('token', res.data.result.token);
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
    },
    getCategory (context) {
      axios.get('http://localhost:7000/api/v1/pos/category/')
        .then((res) => {
          context.commit('getctgr', res.data.result);
        });
    }
  }
});
