<template>
  <div class="grafik">
        <area-chart :data="chartData"> </area-chart>
      </div>
</template>

<script>

export default {
  data () {
    return {
      chartData: {
        '2020-05-7': 3,
        '2020-05-8': 4,
        '2020-05-9': 2,
        '2020-05-10': 10,
        '2020-05-11': 8,
        '2020-05-12': 11,
        '2020-05-13': 9
      }
    };
  }
};
</script>

<style scoped>
  .grafik {
    width: 1100px;
    margin-left: 20px;
  }
</style>
