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
    total: 0,
    ppn: 0,
    payment: 0,
    totalBayar: [],
    ctgry: [],
    tanggal: null
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
    },
    // eslint-disable-next-line camelcase
    increment (state, data) {
      // eslint-disable-next-line camelcase
      const items = state.selectMenu.find(item => item.id_menu === data.id_menu);
      if (items) {
        items.count += 1;
      }
    },
    decrement (state, data) {
      // eslint-disable-next-line camelcase
      const items = state.selectMenu.find(item => item.id_menu === data.id_menu);
      if (items) {
        if (items.count <= 1) {
          items.count = 1;
          state.selectMenu = state.selectMenu.filter(item => item !== items);
        } else {
          items.count -= 1;
        }
      }
    },
    totalData (state) {
      state.totalBayar = state.selectMenu;
      const total = [];
      if (state.totalBayar !== 0) {
        for (let i = 0; i < state.totalBayar.length; i++) {
          total.push(state.totalBayar[i].price * state.totalBayar[i].count);
        }
        state.total = total.reduce((a, b) => a + b, 0);
      } else {
        state.total = 0;
      }
    },
    ppn (state) {
      state.ppn = state.total * 0.1;
    },
    totalPayment (state) {
      state.payment = state.total + state.ppn;
    },
    formatAMPM (state) {
      var hours = new Date().getHours();
      var minutes = new Date().getMinutes();
      var second = new Date().getSeconds();
      var tanggal = new Date().getDate();
      var bulan = new Date().getMonth();
      var tahun = new Date().getFullYear();
      switch (bulan) {
        case 0: bulan = 'Januari'; break;
        case 1: bulan = 'Februari'; break;
        case 2: bulan = 'Maret'; break;
        case 3: bulan = 'April'; break;
        case 4: bulan = 'Mei'; break;
        case 5: bulan = 'Juni'; break;
        case 6: bulan = 'Juli'; break;
        case 7: bulan = 'Agustus'; break;
        case 8: bulan = 'September'; break;
        case 9: bulan = 'Oktober'; break;
        case 10: bulan = 'November'; break;
        case 11: bulan = 'Desember'; break;
      }
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours || 12; // the hour '0' should be '12'
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      second = second < 10 ? '0' + second : second;
      var strTime = hours + ':' + minutes + ':' + second + ' ' + ampm;
      var strDate = tanggal + '-' + bulan + '-' + tahun + ' ';
      state.tanggal = strDate + strTime;
    }
  },
  actions: {
    getData (context) {
      axios.get(process.env.VUE_APP_BASE_URL + 'menu/')
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
        axios.post(process.env.VUE_APP_BASE_URL + 'user/login', data)
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
        axios.post(process.env.VUE_APP_BASE_URL + 'user/register', data)
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
        axios.post(process.env.VUE_APP_BASE_URL + 'menu/data', data)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            context.commit('getMsg', error.response.data.err);
          });
      });
    },
    getCategory (context) {
      axios.get(process.env.VUE_APP_BASE_URL + 'category/')
        .then((res) => {
          context.commit('getctgr', res.data.result);
        });
    }
  }
});
