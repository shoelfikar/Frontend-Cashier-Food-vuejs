<template>
    <div>
        <div class="modal-print print-off">
            <div class="form-modal-print">
                <div class="header-modal">
                    <div class="kasir">
                        <h5>Checkout</h5>
                        <p>Cashier : {{this.username}}</p>
                    </div>
                    <div class="invoice">
                        <h5>Receipt no: #010410919</h5>
                    </div>
                    <button type="button" class="close" aria-label="Close" @click="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <div class="payment">
                        <h5>Payment</h5>
                        <p>Rp. 53.000</p>
                    </div>
                </div>
                <div class="body-modal" v-for="order in select" :key="order.id">
                    <div class="judul">
                        <div class="judul-item">
                            <h5>{{order.name}} 1X</h5>
                        </div>
                        <div class="hasil">
                            <h5>Rp.{{order.price}}</h5>
                        </div>
                    </div>
                </div>
                <div class="footer-modal">
                    <button class="btn btn-primary">Print</button>
                    <div>Or</div>
                    <button class="btn btn-danger">Send Email</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Modal-Print',
  props: ['select'],
  data () {
    return {
      username: localStorage.username
    };
  },
  methods: {
    close () {
      document.querySelector('.modal-print').classList.add('print-off');
    }
  }
};
</script>

<style scoped>
        .modal-print{
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.4);
        }
        .form-modal-print{
            width: 500px;
            height: 550px;
            background-color: #fff;
            margin: 40px auto;
            border-radius: 10px;
        }
        .form-modal-print{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .payment{
            position: absolute;
            top: 350px;
            display: flex;
            justify-content: space-between;
        }
        .payment h5{
            font-size: 25px;
            width: 150px;
            margin-right: 200px;
        }
        .payment p{
            font-size: 25px;
        }
        .header-modal{
            display: flex;
            justify-content: space-between;
            margin-left: 10px;
            margin-right: 10px;
            box-sizing: border-box;
        }
        .body-modal{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 10px;
            margin-right: 10px;
            margin-top: -160px;
            box-sizing: border-box;
        }
        .judul-item{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .judul-item h5{
            margin-right: 200px;
            width: 150px;
        }
        .judul{
            display: flex;
            justify-content: space-between;
        }
        .footer-modal{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            margin-left: 10px;
            margin-right: 10px;
            padding-bottom: 20px;
            box-sizing: border-box;
        }
        .btn-primary{
            width: 450px;
            height: 55px;
            /* border-radius: 10px; */
            background: #F24F8A;
            border: 1px solid #F24F8A;
        }
        .btn-danger{
            width: 450px;
            height: 55px;
            /* border-radius: 10px; */
            background: #57CAD5;
            border: 1px solid #57CAD5;
        }
        .print-off{
            display: none;
        }
        .close{
            margin-right: 5px;
            margin-top: -11px;
        }
</style>
