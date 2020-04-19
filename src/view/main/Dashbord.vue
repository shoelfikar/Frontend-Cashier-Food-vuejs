<template>
    <div>
        <div class="modal-add">
          <div class="form-modal">
            <form @submit="login">
              <div class="login-img">
                <img src="../../assets/image/icon/user.png" alt="">
              </div>
                <h1>Login</h1>
                <b-button variant="outline-info" class="mb-2">
                    <b-icon icon="power"></b-icon> Logout
                </b-button>
                <div>
                    <div class="form-group row" :class="{ 'form-group--error': $v.username.$error }">
                        <div class="col-md-11">
                            <input type="text" class="form-control" id="inputUsername" placeholder="Enter Your Username" v-model.trim="$v.username.$model" required>
                        </div>
                    </div>
                    <!-- <div class="error" v-if="!$v.username.required"></div> -->
                    <!-- <div class="error" v-if="!$v.username.required">Username is required.</div> -->
                    <div class="error" v-if="!$v.username.minLength">Password must have at least {{ $v.username.$params.minLength.min }} letters.</div>
                    <!-- <tree-view :data="$v" :options="{rootObjectKey: '$v', maxDepth: 2}"></tree-view> -->
                </div>
                  <div class="form-group row">
                    <div class="col-md-11">
                      <input type="text" class="form-control" id="inputPassword" placeholder="Enter Your Password" v-model="password">
                    </div>
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
import { required, sameAs, minLength } from 'vuelidate/lib/validators';
export default {
  name: 'Dashbord',
  data () {
    return {
      username: '',
      password: '',
      newData: ''
    };
  },
  methods: {
    login () {
      alert('ok');
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(6)
    },
    password: {
      sameAsPassword: sameAs('username')
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
            height: 470px;
            background-color: #fff;
            margin: 120px auto;
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
