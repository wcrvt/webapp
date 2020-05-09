<template>
  <div>
    <div style="margin-top:20px" />
    <p class="form-title"> Contact </p>
    <p class="form-caption">
      ご興味をお持ちいただけましたら，<br class="br-sp">下記の連絡先にお気軽にお尋ねください。
    </p>

    <div class="mail-container">
      <span> > </span>
      <span id="email" v-on:click="copyEmail">
        {{contactForm.email}}
      </span>
      <span
        id="copyNotify"
        v-bind:class="[contactForm.copyState? mailCopied:mailUnCopied]"
        v-on:animationend="copyNotifyDisable"
      >
        (Copied; Please use Ctrl+v)
      </span>
    </div>

    <div class="place-container">
      <p id="place-title"> 活動拠点 </p>
    <ul id="place-list">
      <li> 神奈川県 川崎市 幸区 新川崎 </li>
      <li> 埼玉県 越谷市 新越谷 </li>
    </ul>
    <p class="form-notes">
      制御システム導入支援，制御装置開発および制御系設計などを承っております。<br class="br-pc">
      ご連絡に際しては，お名前とご所属のご記入をお願い申し上げます。
    </p>
    </div>

  </div>
</template>

<script>
  export default{
    data:()=>({
      contactForm:{
        email:"kurumatani@digitalservo.jp",
        copyState: false,
      },
      mailCopied:"mailCopied",
      mailUnCopied:"mailUnCopied",
    }),
    methods:{
      copyEmail: function(){
        navigator.clipboard.writeText(this.contactForm.email);
        this.contactForm.copyState=true;
      },
      copyNotifyDisable:function() {
        this.contactForm.copyState = false;
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

p{
  line-height: 160%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.form-title{
  color:#fff;
  font-size:3.5rem;
  margin:0;
}
.form-caption{
  color:#fff;
  margin: 25px auto 10px;
  font-size:1.2rem;
}
.form-notes{
  color:#fff;
  margin: 50px auto 10px;
  font-size:1.2rem;
}

.mail-container{
  color:#fff;
  font-size: 1.25rem;
}
#email{
  cursor:pointer;
  margin:auto;
  padding: 0px 2px;
  position: relative;
  display: inline-block;
  text-decoration: none;
}
#email::after {
  position: absolute;
  bottom: -2px;
  left: 0;
  content: '';
  width: 100%;
  height: 2px;
  background: #333;
  transform: scale(0, 1);
  transform-origin: left top;
  transition: transform .3s;
}
#email:hover::after {
  transform: scale(1, 1);
}
#email:active {
  -webkit-transform: translate(2px,2px);
  transform: translate(2px,2px);
}

#copyNotify{
  margin-left: 5px;
}

.mailCopied{
  animation-name: fadein;
  animation-duration: 2000ms;
}
@keyframes fadein {
  0% {
      visibility: hidden;
      opacity: 0;
  }
  20%, 80% {
      visibility: visible;
      opacity: 1;
  }
  100% {
      visibility: hidden;
      opacity: 0;
  }
}
.mailUnCopied{
  visibility: hidden;
}

.place-container{
  color:#fff;
  margin: 40px auto auto;
  padding: 0;
}
#place-title{
  font-size:2rem;
  margin: 15px auto;
  padding: auto;
}
#place-list{
  font-size: 1.2rem;
  display:inline-block;
  text-align:left;
  margin:  auto;
  padding: auto;
}

@media screen and (max-width: 640px) {
  .form-title{
    font-size:2.0rem;
    margin:0;
  }
  .form-caption{
    margin: 15px auto 10px;
    font-size:0.9rem;
  }
  .mail-container{
    color:#fff;
    font-size: 1.0rem;
  }
  #copyNotify{
    display: none;
  }
  .place-container{
    color:#fff;
    margin: 20px auto auto;
    padding: 0;
  }
  #place-title{
    font-size:1.3rem;
    margin: 10px auto;
    padding: auto;
  }
  #place-list{
    font-size: 0.9rem;
    display:inline-block;
    text-align:left;
    margin:  auto;
    padding: auto;
  }
  .form-notes{
    color:#fff;
    margin: 25px auto 10px;
    font-size:0.9rem;
    width:90%;
  }
}
</style>
