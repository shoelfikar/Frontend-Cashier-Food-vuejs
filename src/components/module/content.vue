<template>
    <div>
    <div class="content">
        <div class="sidebar">
            <div class="item">
                <img src="../../assets/image/icon/clipboard.png" alt="" @click="$emit('clickme')">
            </div>
            <div class="item">
                <img src="../../assets/image/icon/fork.png" alt="" @click="$emit('orderme')">
            </div>
            <div class="item" v-if="this.coba !== 'History'">
                <img src="../../assets/image/icon/add.png" alt="" @click="modalAdd">
            </div>
            <div class="item-1" v-else>
                <img src="../../assets/image/icon/add.png" alt="">
            </div>
            <div class="logout">
               <!-- <b-button variant="outline-dark" class="lButton mb-2" @click="logout"> -->
                    <i class="fas fa-sign-out-alt fa-3x" @click="logout"></i>
                <!-- </b-button> -->
            </div>
        </div>
        <div class="history hide">
            <div class="data-history">
                <div class="pink">
                    <div class="detail">
                        <h5>Today's Income</h5>
                        <h1 class="text-3xl text-black">Rp.{{this.history.todayIncome == null ? 0:this.history.todayIncome}}</h1>
                        <!-- <p>{{this.yesterdayIncome}}% Last Year</p> -->
                    </div>
                    <div class="circle-pink">
                        <div class="circle-a"></div>
                        <div class="circle-b"></div>
                        <div class="circle-c"></div>
                    </div>
                </div>
                <div class="blue">
                    <div class="detail">
                        <h5>Order's</h5>
                        <h1 class="text-3xl text-black">{{this.history.orderThisWeek}}</h1>
                    </div>
                    <div class="circle-blue">
                        <div class="cb-a"></div>
                        <div class="cb-b"></div>
                        <div class="cb-c"></div>
                    </div>
                </div>
                <div class="purple">
                    <div class="detail">
                        <h5> This Year's Income</h5>
                        <h1 class="text-3xl text-black">Rp.{{this.history.thisYearIncome}}</h1>
                    </div>
                    <div class="circle-blue">
                        <div class="cp-a"></div>
                        <div class="cp-b"></div>
                        <div class="cp-c"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="menu">
            <div class="item-menu" v-for="menu in myMenu.result" :key="menu.id_menu" @click="itemMenu(menu.id_menu), $emit('tittle')">
                <img :src="menu.image" alt="">
                <p>{{menu.name}}</p>
                <p>Rp.{{menu.price}}</p>
            </div>
        </div>
        <div class="cart-item hide">
            <div class="empty empty-off">
                <img src="../../assets/image/icon/food-and-restaurant.png" alt="">
                <h3>Your cart is empty</h3>
                <p>Please add some items from the menu</p>
            </div>
            <div class="cart-list">
                    <div class="checkout" v-for="(item,idx) in selected" :key="idx">
                        <img :src="item.image" alt="">
                        <div class="name-qty">
                            <h5>{{item.name}}</h5>
                            <div class="qty">
                                <button @click="decrement(item)">-</button>
                                <button class="angka">{{item.count}}</button>
                                <button @click="increment(item)">+</button>
                            </div>
                        </div>
                        <p>Rp.{{item.price * item.count}}</p>
                    </div>
                </div>
                <div class="cart-button">
                    <div class="total">
                        <div class="total-p">
                            <h5>Total</h5>
                            <p>*Belum Termasuk ppn</p>
                        </div>
                        <div class="nominal">
                            <h5>Rp.{{total}}</h5>
                        </div>
                    </div>
                    <div class="checkout-b">
                        <button @click="modalPrint">Checkout</button>
                    </div>
                    <div class="cancel">
                        <button @click="cancel">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <Modal />
        <Print v-bind:select="selected"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Modal from '../../components/module/Modal';
import Print from '../../components/module/Invoice';
export default {
  name: 'Content',
  props: ['coba', 'tittle'],
  components: {
    Modal,
    Print
  },
  computed: {
    ...mapState(['yesterdayIncome', 'todayIncome']),
    myMenu () {
      return this.$store.state.menu;
    },
    selected () {
      return this.$store.state.selectMenu;
    },
    datamu () {
      return this.$store.state.dataItem;
    },
    total () {
      return this.$store.state.total;
    },
    history () {
      return this.$store.state.history;
    }
  },
  methods: {
    modalAdd () {
      const modal = document.querySelector('.modal-add');
      modal.classList.remove('hide');
    },
    modalPrint () {
      const modal = document.querySelector('.invoice');
      modal.classList.remove('hide');
      this.invoiceGet();
    },
    // eslint-disable-next-line camelcase
    itemMenu (id_menu) {
      this.$store.commit('addMenu', id_menu);
      const cartList = document.querySelector('.cart-list');
      const cartButton = document.querySelector('.cart-button');
      const empty = document.querySelector('.empty');
      const cartItem = document.querySelector('.cart-item');
      cartList.classList.remove('hide');
      cartButton.classList.remove('cartButtonOff');
      empty.classList.add('empty-off');
      cartItem.classList.remove('hide');
      // ordermenu
      const menu = document.querySelector('.menu');
      const cart = document.querySelector('.cart-item');
      const mHistory = document.querySelector('.history');
      menu.classList.remove('hide');
      menu.classList.add('order-menu');
      cart.classList.remove('hide');
      mHistory.classList.add('hide');
    },
    logout () {
      delete localStorage.token;
      this.$router.go('/login');
    },
    increment (data) {
      this.$store.commit('increment', data);
    },
    decrement (data) {
      this.$store.commit('decrement', data);
      if (this.selected.length === 0) {
        const cartButton = document.querySelector('.cart-button');
        const empty = document.querySelector('.empty');
        cartButton.classList.add('cartButtonOff');
        empty.classList.remove('empty-off');
      }
    },
    totalData () {
      this.$store.commit('totalData');
    },
    totalQty () {
      this.$store.commit('totalQty');
    },
    cancel () {
      this.$store.commit('cancelOrder');
      const cartButton = document.querySelector('.cart-button');
      const empty = document.querySelector('.empty');
      cartButton.classList.add('cartButtonOff');
      empty.classList.remove('empty-off');
    },
    invoiceGet () {
      this.$store.commit('getInvoice');
    }
  },
  mounted () {
    this.$store.dispatch('getData');
  },
  updated () {
    this.totalData();
    this.totalQty();
    this.$store.dispatch('getHistory');
    // this.$store.commit('getToday');
  }
};
</script>

<style scoped>
    .content{
            display: flex;
            width: 100%;
            height: 100%;
        }
        .sidebar{
            width: 6%;
            height: 100vh;
            background-color: #fff;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 80px;
            position: fixed;
        }
        .item{
            margin-top: 50px;
            cursor: pointer;
        }
        .item-1{
            margin-top: 50px;
            /* cursor: pointer; */
        }
        .logout{
            margin-top: 50px;
            cursor: pointer;
        }
        .logout .lButton {
            width: 70px;
            height: 50px;
        }
        .menu{
            width: 100%;
            height: 100%;
            background-color: #ccc;
            margin-top: 81px;
            margin-left: 81px;
            /* margin-right: 26%; */
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 20px;
            transition: 1s;

        }
        .order-menu{
            margin-right: 26%;
        }
        .history{
            width: 100vw;
            height: 100vh;
            background-color: #fff;
            margin-top: 81px;
            margin-left: 81px;
            /* margin-right: 26%; */
            display: flex;
            flex-wrap: wrap;
            padding-bottom: 20px;
            z-index: -99999999;
            transition: 1s;
        }
        .data-history{
            width: 100%;
            height: 100%;
            margin-top: 20px;
            display: flex;
            justify-content: space-evenly;
        }
        .pink{
            width: 30%;
            height: 220px;
            background: linear-gradient(285.38deg, #FBB2B4 30.05%, rgba(255, 143, 178, 0) 133.19%);
            box-shadow: 10px 15px 10px rgba(255, 143, 178, 0.25);
            border-radius: 10px;
            position: relative;
        }
        .circle-pink{
            margin-top: -130px;
            width: 200px;
            height: 150px;
            margin-left: 165px;
            z-index: 1;
        }
        .circle-a{
            position: absolute;
            top: 80px;
            right: 130px;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            background: rgba(253, 211, 228, 0.3);
        }
        .circle-b{
            position: absolute;
            top: 45px;
            right: 70px;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            background: rgba(253, 211, 228, 0.3);
        }
        .circle-c{
            position: absolute;
            top: 10px;
            right: 10px;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            background: rgba(253, 211, 228, 0.3);
        }
        .detail{
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-top: 50px;
            margin-left: 20px;
        }
        .blue{
            width: 30%;
            height: 220px;
            background: linear-gradient(285.38deg, #29DFFF 30.05%, rgba(41, 223, 255, 0) 133.19%);
            box-shadow: 10px 15px 10px rgba(41, 223, 255, 0.25);
            border-radius: 10px;
            position: relative;
        }
        .cb-a{
            position: absolute;
            top: 80px;
            right: 130px;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            background: rgba(207, 246, 253, 0.3);
        }
        .cb-b{
            position: absolute;
            top: 45px;
            right: 70px;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            background: rgba(207, 246, 253, 0.3);
        }
        .cb-c{
            position: absolute;
            top: 10px;
            right: 10px;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            background: rgba(207, 246, 253, 0.3);
        }
        .purple{
            width: 30%;
            height: 220px;
            background: linear-gradient(285.38deg, #AB84C8 30.05%, rgba(241, 201, 236, 0) 133.19%);
            box-shadow: 10px 15px 10px rgba(241, 201, 236, 0.25);
            border-radius: 10px;
            position: relative;
        }
        .cp-a{
            position: absolute;
            top: 80px;
            right: 130px;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            background: rgba(207, 246, 253, 0.3);
        }
        .cp-b{
            position: absolute;
            top: 45px;
            right: 70px;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            background: rgba(207, 246, 253, 0.3);
            /* margin-right: -40px;
            margin-top: 45px; */
        }
        .cp-c{
            position: absolute;
            top: 10px;
            right: 10px;
            height: 100px;
            width: 100px;
            border-radius: 50%;
            background: rgba(207, 246, 253, 0.3);
        }
        .cart-item{
            width: 26%;
            height: 100vh;
            background-color: #FFFFFF;;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
            margin-top: 80px;
            position: fixed;
            right: 0;
            transition: .5s;
        }
        .hide{
            display: none;
            transition: .5s;
        }
        .item-menu{
            width: 240px;
            height: 220px;
            margin-top: 20px;
            margin-bottom: 10px;
            margin-left: 53px;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
        }
        .item-menu h3{
            font-size: 18px;
            font-weight: bold;
            margin-top: 5px;
        }
        .item-menu p{
            font-weight: bold;
        }
        .item-menu img{
            width: 270px;
            height: 180px;
        }
        .name-qty h5{
            font-size: 13px;
        }
        .cart-list{
            width: 100%;
            height: 330px;
            overflow-y: scroll;
        }
        .checkout{
            margin-top: 15px;
            display: flex;
            justify-content: flex-start;
            margin-left: 15px;
        }
        .cart-list .checkout img{
            width: 80px;
            height: 80px;
            object-fit: cover;
            margin-right: 20px;
        }
        .cart-list .checkout .name-qty{
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .checkout .qty button{
            width: 30px;
            background: rgba(130, 222, 58, 0.2);
            border: 1px solid #82DE3A;
            box-sizing: border-box;
            cursor: pointer;
            font-size: 20px;
            color: #82DE3A;
        }
        .checkout .qty .angka{
            background: #FFFFFF;
            border: 1px solid #82DE3A;
            box-sizing: border-box;
        }
        .checkout p{
            margin-top: 30px;
            margin-left: auto;
            margin-right: 10px;
        }
        .cart-button{
            width: 100%;
            height: 248px;
            display: flex;
            flex-direction: column;
            justify-content:space-around;
        }
        .cartButtonOff{
            display: none;
        }
        .empty{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .empty-off{
            display: none;
        }
        .empty p{
            color: #CECECE;
            margin-top: 10px;
            font-size: 18px;
        }
        .total{
            margin-top: 10px;
            display: flex;
            justify-content: space-around;
        }
        .checkout-b button{
            width: 93%;
            height: 50px;
            margin-left: 12px;
            background-color: #57CAD5;
            border: 1px #57CAD5 solid;
        }
        .cancel button{
            width: 93%;
            height: 50px;
            margin-left: 12px;
            background-color: #F24F8A;
            border: 1px solid #F24F8A;
        }
</style>
