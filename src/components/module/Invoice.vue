<template>
  <div>
    <div class="invoice hide">
        <div class="form-invoice" ref="print">
            <div class="header-invoice">
                <div class="tittle">
                    <h5 class="title">Form Checkout</h5>
                    <button type="button" class="close" aria-label="Close" @click="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="identitas">
                    <p class="kasir">Cashier : <span>{{this.username}}</span></p>
                    <p class="nomor">Invoice No : <span>#010410919</span></p>
                </div>
            </div>
            <div class="body-invoice">
                <p class="tittle-body">Data Produk</p>
                <div class="produk">
                    <table class="table table-borderless">
                    <thead>
                        <tr>
                        <th scope="col" class="qty">No</th>
                        <th scope="col">Nama Menu</th>
                        <th scope="col" class="qty">Qty</th>
                        <th scope="col">Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(order, idx) in select" :key="idx">
                        <th scope="row" class="qty">{{idx + 1}}</th>
                        <td>{{order.name}}</td>
                        <td class="qty">{{order.count}}</td>
                        <td>Rp.{{order.price}}</td>
                        </tr>
                        <tr>
                        <th scope="row" colspan="2" class="qty">Total</th>
                        <td scope="row" colspan="2" class="total">Rp.{{total}}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
            <div class="footer-invoice">
                <div class="info-invoice">
                    <div class="tittle-info">
                        <p>PPN 10%</p>
                        <p>Total Bayar</p>
                        <p>Payment</p>
                        <p>Kembalian</p>
                    </div>
                    <div class="price-info">
                        <p>Rp.{{pajak}}</p>
                        <p>Rp.{{bayar}}</p>
                        <input type="number" placeholder="0">
                        <p>Rp.0</p>
                    </div>
                </div>
                <div class="print-invoice">
                    <button class="btn btn-print" @click="invoicePrint">Print</button>
                    Or
                    <button class="btn btn-email">Send Email</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import jspdf from 'jspdf';
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
export default {
  name: 'Invoice',
  data () {
    return {
      username: localStorage.username,
      columns: ['Food Name', { text: 'Qty', alignment: 'center' }, { text: 'Price', alignment: 'center' }]
    };
  },
  methods: {
    close () {
      document.querySelector('.invoice').classList.add('hide');
    },
    ppn () {
      this.$store.commit('ppn');
    },
    totalPembayaran () {
      this.$store.commit('totalPayment');
    },
    print () {
      // eslint-disable-next-line new-cap
      const doc = new jspdf();
      const html = this.$refs.print.innerHTML;
      doc.fromHTML(html, 10, 10, {
        width: 190
      });
      doc.autoPrint();
      doc.save('invoice.pdf');
    },
    invoicePrint () {
      var docDefinition = {
        pageSize: 'A6',
        pageMargins: [10, 10, 10, 10],
        content: [
          { text: 'd-kasir-pos-app', style: 'header', fontSize: 20, alignment: 'center', margin: [0, 0, 0, 10] },
          { text: `Cashier: ${this.username}`, alignment: 'center' },
          { text: 'Invoice No: #010410919', alignment: 'center' },
          { text: `${this.tanggal}`, width: '100%', alignment: 'center' },
          { text: '=================================', alignment: 'center', margin: [0, 0, 0, 30] },
          {
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: [100, '*', '*'],
              body: []
            }
          },
          { text: '==========================================', margin: [0, 15, 0, 0] },
          {
            columns: [
              {
                width: 200,
                text: 'PPN 10%',
                margin: [0, 0, 0, 5]
              },
              {
                width: '*',
                text: `Rp.${this.pajak}`,
                margin: [8, 0, 0, 5],
                alignment: 'left'
              }
            ],
            columnGap: 10
          },
          {
            columns: [
              {
                width: 200,
                text: 'Receipt Total',
                margin: [0, 0, 0, 0]
              },
              {
                width: '*',
                text: `Rp.${this.bayar}`,
                margin: [0, 0, 0, 0],
                alignment: 'center'
              }
            ],
            columnGap: 10
          },
          { text: '==========================================', margin: [0, 0, 0, 0] }
        ]
      };
      docDefinition.content[5].table.body.push(this.columns);
      for (var i = 0; i < this.select.length; i++) {
        docDefinition.content[5].table.body.push(Object.values([this.select[i].name, { text: this.select[i].count, alignment: 'center' }, { text: `Rp.${this.select[i].price}`, alignment: 'center' }]));
      }
      pdfMake.createPdf(docDefinition).open();
    },
    getDateTime () {
      this.$store.commit('formatAMPM');
    }
  },
  computed: {
    select () {
      return this.$store.state.selectMenu;
    },
    total () {
      return this.$store.state.total;
    },
    pajak () {
      return this.$store.state.ppn;
    },
    bayar () {
      return this.$store.state.payment;
    },
    tanggal () {
      return this.$store.state.tanggal;
    }
  },
  updated () {
    this.ppn();
    this.totalPembayaran();
  },
  mounted () {
    this.getDateTime();
  }
};

</script>

<style scoped>
    .invoice{
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
    }
    .hide{
        display: none;
    }
    .form-invoice{
        width: 500px;
        height: 630px;
        background-color: #fff;
        margin: 10px auto;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .header-invoice{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .tittle{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        width: 100%;
    }
    .title{
        text-align: center;
        margin-top: 5px;
        width: 100%;
    }
    .close{
        margin-right: 10px;
    }
    .identitas{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-left: 10px;
    }
    .nomor{
        margin-top: -15px;
    }
    .nomor span {
        font-weight: bold;
    }
    .kasir span{
        font-weight: bold;
    }
    .qty{
        text-align: center;
    }
    .body-invoice{
        width: 100%;
    }
    .tittle-body{
        text-align: center;
        width: 100%;
        font-weight: bold;
        font-size: 20px;
    }
    .produk{
        width: 100%;
        height: 220px;
        overflow: hidden;
        overflow-y: scroll;
    }
    .table{
        width: 100%;
        box-sizing: border-box;
        height: 150px;
        margin-top: -15px;
    }
    .total{
        text-align: center;
        font-weight: bold;
        font-size: 20px;
    }
    .info-invoice{
        display: flex;
        justify-content: space-between;
    }
    .footer-invoice{
        margin-top: 15px;
    }
    .tittle-info p, .price-info p{
        margin:0;
        margin-left: 10px;
    }
    .price-info{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .price-info p{
        width: 100px;
        margin-right: 30px;
    }
    .price-info input{
        width: 100px;
        outline: none;
        margin-right: 30px;
        border: 1px solid grey;
    }
    .print-invoice{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
    }
    .btn-print{
        width: 90%;
        margin-left: 25px;
        margin-top: 18px;
        margin-bottom: 5px;
        background: #57CAD5;
        border: 1px solid #57CAD5;
        color: #fff;
        font-size: 18px;
        /* font-weight: bold; */
    }
    .btn-print:hover{
        color: #fff;
    }
    .btn-email{
        width: 90%;
        margin-left: 25px;
        margin-top: 10px;
        background: #F24F8A;
        border: 1px solid #F24F8A;
        color: #fff;
        font-size: 18px;
    }
    .btn-email:hover{
        color: #fff;
    }

</style>
