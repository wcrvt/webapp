<template>
  <body>
    <div class="prof-box">
      <img class="prof-img" src="@/pic/profile.jpg">
      <div class="prof-card">
        <div class="prof-name">
          <div class="ename"> Hiroki Kurumatani, Ph. D. (Eng.) </div>
        </div>
        <p class="prof-intro_en">
          Major Filed: Control Engineering <br>
          Interests: Robotics and Power Electronics <br>
          Favorite: Computer Science
        </p>
        <p class="prof-intro_jp">
          制御工学を専門としてモータドライブ/ロボット制御やパワーエレクトロニクスに従事しています。
          ロボット制御のための専用計算機を設計して高性能制御系の実装を行なっています。
        </p>
        <div class="linker-box">
          <router-link class="linker" to="/about">Learn more</router-link>
        </div>
        <div class="linker-box">
          <router-link class="linker" to="/research">Research</router-link>
        </div>
      </div>
    </div>

    <div class="career-box">
      <p class="career-title"> Career </p>
      <ol class="career-block">
        <li> 2020年3月 慶應義塾大学 理工学研究科にて博士(工学)を取得 </li>
        <li> 2020年4月 個人事業主として活動を開始 </li>
        <li> 2020年4月 慶應義塾大学 理工学部 共同研究員として活動 </li>
      </ol>
    </div>
  </body>
</template>

<script>

</script>


<style scoped>

body {
  overflow: scroll;
}
ul {
  list-style-type: none;
  padding: 0;
}
p{
  line-height: 160%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.prof-box{
  color:#fff;
  width:90%;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: stretch;
  align-items: stretch;
  text-align: center;
  padding: 40px 0;
  margin: auto;
}
.prof-img{
  background: green;
  float:left;
  max-width:400px;
  width:40%;
  height: 40%;
  -moz-border-radius:10px;
  -webkit-border-radius:10px;
  border-radius: 10px;
  margin: 20px 30px;
}

.prof-card{
  text-align: center;
  margin: 30px 40px;
  padding: auto;
  width:40%;
}
.prof-name{
  text-align: center;
  margin: auto;
}
.prof-intro_en{
  font-size:1.2rem;
  text-align: center;
}
.prof-intro_jp{
  font-size:1.1rem;
  text-align: left;
}

.ename{
  font-size: 2rem;
  font-family: "Gill Sans", sans-serif;
  padding-top:12px;
}

.linker-box{
  background-color: #c80000;
  border: 2px solid #c80000;
  border-radius: 5px;
  position: relative;
  display: inline-block;
  text-decoration: none;
  padding: 0px 10px;
  margin: 6px 8px;
  transition-duration: 0.3s;
}
.linker{
  font-size: 1.3rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color:#fff;
  position: relative;
  display: inline-block;
  text-decoration: none;
  padding:8px 0px;
  transition-duration: 0.3s;
}
.linker-box:hover{
  background: #252A35;
  border: 2px solid #c80000;
}

.career-box{
  background: #eee;
  text-align: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: stretch;
  align-items: stretch;
  text-align: center;
  padding: auto;
  margin: 0 0;
}
.career-title{
  color: #333;
  text-align: left;
  font-size: 1.8rem;
  font-family: Helvetica;
  margin: auto;
  padding: 15px 60px 10px;
}

.career-block{
  color: #333;
  font-weight: 500;
  list-style: none;
  text-align:left;
  font-size: 1.15rem;
  margin:auto;
  padding: 0px 80px 20px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

@media screen and (max-width: 640px) {
  .prof-box{
    width:100%;
    padding: 30px 0 35px;
    margin: auto;
  }
  .prof-img{
    display: none;
  }
  .prof-card{
    width:85%;
    margin: 0px 0px;
  }
  .ename{
    font-size: 1.4rem;
  }
  .prof-intro_en{
    font-size: 0.9rem;
    line-height: 150%;
  }
  .prof-intro_jp{
    font-size: 0.8rem;
  }
  .linker-box{
    background-color: #c80000;
    border: 2px solid #c80000;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    text-decoration: none;
    padding: 0px 10px;
    margin: 8px 8px;
    transition-duration: 0.3s;
  }
  .linker{
    font-size: 0.9rem;
    padding:5px 0px;
    transition-duration: 0.3s;
  }
  .career-box{
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: stretch;
    align-items: stretch;
    text-align: center;
    padding: auto;
    margin: 0 0;
  }
  .career-title{
    text-align: left;
    font-size: 1.0rem;
    font-family: Helvetica;
    margin: auto;
    padding: 8px 30px 5px;
  }

  .career-block{
    font-size: 0.7rem;
    margin:auto;
    padding: 0 25px 15px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
}

</style>
