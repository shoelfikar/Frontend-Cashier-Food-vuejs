<template>
    <div>
        <div class="header">
            <div class="header-1">
                <div class="burger">
                    <img src="../../assets/image/icon/menu (1).png" alt="" @click="$emit('hearme')">
                </div>
                <div class="food">
                    <h1>{{title}}</h1>
                </div>
                <div class="search">
                    <img src="../../assets/image/icon/magnifying-glass.png" alt="">
                </div>
            </div>
            <div class="cart" v-if="title === 'Orders'">
                <h1>Cart</h1>
                <label>{{cartItem}}</label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['title'],
  computed: {
    cartItem () {
      return this.$store.state.selectMenu.length;
    }
  }
};
</script>

<style scoped>
    .header{
        width: 100%;
        height: 80px;
        display: flex;
        background-color: aqua;
        position: fixed;
    }
    .header-1{
        width: 100%;
        height: 100%;
        background-color: #fff;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .cart{
        width: 35%;
        height: 100%;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    }
    .cart label{
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        margin-left: 5px;
        margin-top: -13px;
        border-radius: 50%;
        background-color: #57CAD5;
    }
    .burger{
        margin-left: 2%;
        cursor: pointer;
    }
    .search{
        margin-right: 4%;
        cursor: pointer;
    }
    .food h1{
        font-weight: bold;
    }
</style>
