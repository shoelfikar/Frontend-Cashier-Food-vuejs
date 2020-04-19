<template>
  <div>
    <div class="modal-add hide">
        <div class="form-modal">
            <form enctype="multipart/form-data" @submit="inputMenu">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                <h1>Add Item</h1>
                <div class="form-group row">
                  <label for="name" class="col-sm-2 col-form-label">Name</label>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="name" v-model="name">
                  </div>
                </div>
                <div class="form-group row">
                    <label for="customFile" class="col-sm-2 col-form-label">Image</label>
                    <div class="custom-file col-sm-6 ml-3">
                        <input type="file" ref="file" class="custom-file-input" id="customFile">
                        <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="price" class="col-sm-2 col-form-label">Price</label>
                    <div class="col-sm-4">
                      <input type="number" class="form-control" id="price" v-model="price">
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="category" class="col-sm-2 col-form-label">Category</label>
                    <select class="custom-select col-sm-5 ml-3" v-model="category">
                        <option selected>Open this select menu</option>
                        <option value="1">Coffee</option>
                        <option value="2">Food</option>
                        <option value="3">Cake</option>
                        <option value="4">Drink</option>
                    </select>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Cancel</button>
                    <button type="submit" class="btn btn-primary">Add</button>
                  </div>
              </form>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {
      name: '',
      price: '',
      category: ''
    };
  },
  methods: {
    close () {
      document.querySelector('.modal-add').classList.add('hide');
    },
    inputMenu (e, data) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', this.name);
      formData.append('price', this.price);
      formData.append('image', this.$refs.file.files[0]);
      formData.append('category', this.category);
      this.$store.dispatch('inputMenu', formData)
        .then((res) => {
          this.$router.go('/home');
        });
    }
  }
};
</script>

<style scoped>
        .modal-add{
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.4);
        }
        .form-modal{
            width: 600px;
            height: 400px;
            background-color: #fff;
            margin: 120px auto;
            border-radius: 10px;
        }
        .form-modal h1{
           text-align: center;
           margin-bottom: 20px;
        }
        .form-modal form{
            padding-top: 10px;
            margin-left: 40px;
        }
        .close{
            margin-right: 5px;
            margin-top: -11px;
        }
        .form-group select{
            margin-bottom: 25px;
        }
        .modal-footer{
            margin-top: 10px;
        }
        .btn-secondary{
            width: 120px;
            height: 45px;
            border-radius: 10px;
            background: #F24F8A;
            border: 1px solid #F24F8A;
        }
        .btn-primary{
            width: 120px;
            height: 45px;
            border-radius: 10px;
            background: #57CAD5;
            border: 1px solid #57CAD5;;
        }
        .hide{
            display: none;
        }
</style>
