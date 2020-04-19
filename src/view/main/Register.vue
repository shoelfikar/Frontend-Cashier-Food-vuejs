<template>
    <div>
        <div class="modal-add">
          <div class="form-modal">
            <form @submit="insertData">
              <div class="login-img">
                <img src="../../assets/image/icon/user.png" alt="">
              </div>
                <h1>Register</h1>
                <div class="form-group row">
                  <div class="col-md-11">
                    <input type="text" class="form-control" id="username" placeholder="Username" v-model="username" :class="{'is-invalid': $v.username.$error}" @input="$v.$touch()" required>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-11">
                    <input type="email" class="form-control" id="email" placeholder="Email" v-model="email" :class="{'is-invalid': $v.email.$error}" @input="$v.$touch()" required>
                  </div>
                </div>
                  <div class="form-group row">
                    <div class="col-md-11">
                      <input type="password" class="form-control" id="inputPassword" placeholder="Password" v-model="password" :class="{'is-invalid': $v.password.$error}" @input="$v.$touch()" required>
                    </div>
                  </div>
                  <div class="form-group row">
                    <div class="col-md-11">
                      <input type="password" class="form-control" id="inputrePassword" placeholder=" Retype Password" v-model="repassword" :class="{'is-invalid': $v.repassword.$error}" @input="$v.$touch()" required>
                    </div>
                  </div>
                  <div class="alert alert-danger alert-dismissible col-md-11" role="alert" v-if="myMsg !== ''">
                      <strong>{{myMsg}}</strong>
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="alert1">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div class="button">
                      <button type="submit" class="btn btn-primary">Register</button>
                  </div>
                  <div class="col-md-12 col-sm-12 col-xs-12 last-part">
                      <p>Back to<router-link to="/login"> Login</router-link></p>
                  </div>
              </form>
          </div>
        </div>
    </div>
</template>
<script>
import { required, minLength, sameAs, email } from 'vuelidate/lib/validators';
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      repassword: '',
      newData: ''
    };
  },
  methods: {
    insertData (e, data) {
      e.preventDefault();
      this.$store.dispatch('register', {
        username: this.username, email: this.email, password: this.password
      })
        .then((res) => {
          this.$router.push('/login');
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
    username: {
      required,
      minLenght: minLength(4)
    },
    email: {
      email,
      required,
      minLenght: minLength(7)
    },
    password: {
      required,
      minLenght: minLength(4)
    },
    repassword: {
      required,
      sameAsPassword: sameAs('password')
    }
  }
};
</script>
<style scoped>
        *{
          font-family: 'Barlow Semi Condensed', sans-serif;
        }
        .modal-add{
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.4);
        }
        .login-img img{
          width: 150px;
          height: 150px;
          position: absolute;
          top: -80px;
          left: 150px;
        }
        .form-modal{
            width: 430px;
            height: 600px;
            background-color: #fff;
            margin: 90px auto;
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
            width: 350px;
            height: 45px;
            margin-top: 30px;
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
