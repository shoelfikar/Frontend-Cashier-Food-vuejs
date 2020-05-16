<template>
    <div>
        <div class="modal-add">
          <div class="form-modal">
            <form @submit="login">
              <div class="login-img">
                <!-- <img src="../../assets/image/icon/user.png" alt=""> -->
                <img src="../../assets/image/icon/food-and-restaurant.png" alt="">
              </div>
                <h1>Login</h1>
                <div class="form-group row">
                  <div class="col-md-11">
                    <input type="email" class="form-control" id="inputUsername" placeholder="Enter Your Email" v-model="email" :class="{'is-invalid': $v.email.$error}" @input="$v.$touch()" required>
                  </div>
                </div>
                  <div class="form-group row">
                    <div class="col-md-11">
                      <input type="password" class="form-control" id="inputPassword" placeholder="Enter Your Password" v-model="password" :class="{'is-invalid': $v.password.$error}" @input="$v.$touch()" required>
                    </div>
                  </div>
                  <div class="alert alert-danger alert-dismissible col-md-11" role="alert" v-if="myMsg !== ''">
                      <strong>{{myMsg}}</strong>
                      <button type="button" @click="alert1" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="button">
                      <button type="submit" class="btn btn-primary">Login</button>
                  </div>
                  <div class="col-md-12 col-sm-12 col-xs-12 last-part">
                      <p>Not registered?<router-link to="/register"> Create an account</router-link></p>
                  </div>
              </form>
          </div>
        </div>
    </div>
</template>
<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      newData: ''
    };
  },
  methods: {
    login (e, data) {
      e.preventDefault();
      this.$store.dispatch('handleLogin', {
        email: this.email, password: this.password
      })
        .then((res) => {
          this.$router.go('/home');
        });
    },
    alert1 () {
      this.$store.dispatch('closeAlert');
    }
  },
  computed: {
    myMsg () {
      return this.$store.state.msg;
    }
  },
  validations: {
    email: {
      email,
      required,
      minLenght: minLength(7)
    },
    password: {
      required,
      minLenght: minLength(4)
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
          font-family: 'Airbnb Cereal App', sans-serif;
        }
        .modal-add{
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            /* background: rgba(0, 0, 0, 0.4); */
            background-image: url('/src/assets/image/icon/foods-background.jpg');
        }
        .login-img img{
          width: 150px;
          height: 150px;
          position: absolute;
          top: -30px;
          left: 140px;
        }
        .form-modal{
            width: 410px;
            height: 460px;
            background-color: #fff;
            margin: 100px auto;
            border-radius: 10px;
            position: relative;
        }
        .form-modal h1{
           text-align: center;
           margin-top: 80px;
           margin-bottom: 30px;
           margin-left: -20px;
        }
        .form-modal form{
            padding-top: 10px;
            margin-left: 40px;
        }
        .button button{
            width: 335px;
            height: 45px;
            margin-top: 40px;
            margin-bottom: 10px;
            background: #57CAD5;
            border: 1px solid #57CAD5;;
        }
        .alert strong{
          font-size: 14px;
        }
        .col-md-12 p{
          text-align: center;
          margin-left: -30px;
        }
        .hide{
            display: none;
        }
        .alert{
            height: 50px;
            padding-left: 15px;
        }
        .alert .close{
            line-height: 25px;
        }
</style>
