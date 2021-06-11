<template>
  <div id="app">
    <div>
      <img alt="Vue logo" src="./assets/logo.png" />
    </div>
    <div>地址 <input type="text" v-model="address" /></div>
    <div>数量 <input type="text" v-model="count" /></div>
    <div>
      <button @click="send">发送</button>
    </div>
    <div>
      状态：<span style="color: blue">{{ status }}</span>
    </div>
    <div>
      我的余额：<span style="color: red">{{ balance }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      address: "",
      count: "",
      balance: 0,
      status: "待处理...",
      MetaCoin: {},
    };
  },
  name: "app",
  components: {},
  mounted() {
    this.init(() => {
      this.getBlance();
    });
  },
  methods: {
    delBlank(str) {
      return str.replace(/\s*/g, "");
    },
    async getBlance() {
      let balance = await this.MetaCoin.getBalance();
      this.balance = balance;
    },
    statu(str) {
      this.status = str;
    },
    send() {
      let { address, count, delBlank } = this;
      address = delBlank(address);
      count = parseInt(count);
      console.log(address, count);
      if (address === "" || count === "") {
        alert("请输入地址和数量");
      } else {
        this.MetaCoin.send(address, count)
          .then((res) => {
            console.log(res);
            this.getBlance();
            this.statu("交易成功");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async init(callback) {
      this.$DApp.metaCoin.init().then((res) => {
        console.log("res:", res);
        this.MetaCoin = res;
        console.log(this.MetaCoin);
        callback();
      });
    },
  },
};
</script>

<style>
#app {
  margin-top: 200px;
  text-align: center;
}
</style>
