<template>
    <div>
        <div class="sidebar">
            <div class="menu">
                <img src="../../assets/image/icon/clipboard.png" alt="">
            </div>
            <div class="menu">
              <img src="../../assets/image/icon/fork.png" alt="">
            </div>
            <div class="menu">
               <img src="../../assets/image/icon/add.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'sidebar'
};
</script>

<style scoped>
    .sidebar{
        height: 100vh;
        width: 90px;
        background-color: midnightblue;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* margin-left: 10px; */
    }
    .menu{
        margin-top: 50px;
    }
</style>
