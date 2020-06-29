<template>
  <div>
    <div class="send-mail hide">
      <div class="form-send">
        <form @submit="sendToEmail">
            <div class="row input-email">
                <div class="form-group col-md-11">
                    <input type="email" class="form-control" id="inputUsername"
                    v-model="email"
                    placeholder="Masukkan Email"
                    required>
                </div>
                <div class="alert alert-success hide" role="alert">
                  Invoice telah dikirim ke email anda!
                </div>
                <div class="form-group col-md-11 btn-send">
                    <button class="btn btn-success">Send Invoice</button>
                </div>
                <div class="form-group col-md-11">
                    <button class="btn btn-danger" @click="cancel">Cancel</button>
                </div>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'InputEmail',
  data () {
    return {
      email: ''
    };
  },
  methods: {
    sendToEmail (e, data) {
      e.preventDefault();
      axios.post(process.env.VUE_APP_BASE_URL + 'transaksi/sendmail/', {
        email: this.email,
        invoice: this.invoice
      })
        .then(() => {
          console.log('ok');
          this.$emit('finish');
          const modalEmail = document.querySelector('.send-mail');
          modalEmail.classList.add('hide');
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel (e) {
      e.preventDefault();
      const modalEmail = document.querySelector('.send-mail');
      modalEmail.classList.add('hide');
    }
  },
  computed: {
    invoice () {
      return this.$store.state.invoice;
    }
  }
};
</script>

<style scoped>
  .send-mail{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .form-send{
    width: 350px;
    height: 230px;
    background-color: #fff;
    margin: 180px auto;
    border-radius: 5px;
    position: relative;
  }
  .input-email{
   padding-top: 18px;
   padding-left: 24px;
  }
  .btn{
    width: 295px;
  }
  .btn-send{
    margin-top: 45px;
  }
  .alert{
    margin-left: 15px;
    height: 35px;
    width: 295px;
    font-size: 15px;
    line-height: 10px;
    position: absolute;
    top: 68px;
  }
  .hide{
    display: none;
  }
</style>
