<template>
    <div>
       <div class="container-all">
           <Navbar v-on:hearme="menu"  v-bind:title="title"/>
           <Content v-on:clickme="history" v-on:orderme="order" v-on:check="checkout" v-bind:coba="title"/>
       </div>
       <Print />
    </div>
</template>

<script>
// import { mapState } from 'vuex';
import Navbar from '../../components/module/Navbar';
import Content from '../../components/module/content';
import Print from '../../components/module/Modal-Print';
export default {
  name: 'Home',
  data () {
    return {
      title: 'Food Items'
    };
  },
  components: {
    Navbar,
    Content,
    Print
  },
  methods: {
    history () {
      const menu = document.querySelector('.menu');
      const cart = document.querySelector('.cart-item');
      const mHistory = document.querySelector('.history');
      menu.classList.add('hide');
      cart.classList.add('hide');
      mHistory.classList.remove('hide');
      this.title = 'History';
    },
    menu () {
      const menu = document.querySelector('.menu');
      const cart = document.querySelector('.cart-item');
      const mHistory = document.querySelector('.history');
      const cartList = document.querySelector('.cart-list');
      menu.classList.remove('hide');
      menu.classList.remove('order-menu');
      cart.classList.add('hide');
      cartList.classList.toggle('hide');
      mHistory.classList.add('hide');
      this.title = 'Food Items';
    },
    order () {
      const menu = document.querySelector('.menu');
      const cart = document.querySelector('.cart-item');
      const mHistory = document.querySelector('.history');
      const cartList = document.querySelector('.cart-list');
      const cartButton = document.querySelector('.cart-button');
      const empty = document.querySelector('.empty');
      menu.classList.remove('hide');
      menu.classList.add('order-menu');
      cart.classList.remove('hide');
      mHistory.classList.add('hide');
      cartList.classList.add('hide');
      cartButton.classList.add('cartButtonOff');
      empty.classList.toggle('empty-off');
      this.title = 'Orders';
    },
    checkout () {
      const cartList = document.querySelector('.cart-list');
      const cartButton = document.querySelector('.cart-button');
      const empty = document.querySelector('.empty');
      cartList.classList.remove('hide');
      cartButton.classList.remove('cartButtonOff');
      empty.classList.add('empty-off');
    }
  }
};
</script>

<style scoped>
    @font-face {
        font-family: 'Airbnb Cereal App';
        src: url('../../assets/font/Airbnb-Cereal-App/AirbnbCerealMedium.woff')
      }
    *{
        margin: 0;
        padding: 0;
        font-family: 'Airbnb Cereal App';
    }
    .container-all{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .header{
        width: 100%;
        height: 80px;
        display: flex;
        background-color: aqua;
        position: fixed;
    }
    .content{
        display: flex;
        width: 100%;
        height: 100%;
    }
    /* scroll */
</style>
