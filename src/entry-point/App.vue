<template>
  <div id="app">
    <my_header />
    <transition name="move-page" mode="out-in">
      <router-view/>  <!-- for Single Page Application -->
    </transition>
  </div>
</template>

<script>

import my_header from '@/components/header.vue'

export default {
  name: 'App',
  components: {
    my_header
  }
}

</script>

<style>
/*Delete a space on header caused by the default CSS of a browser*/
body{
  margin: 0;
  padding:0;
  background: #252A35;
  overflow: scroll;
}

.research-title{
  font-family: 'Hiragino Mincho ProN',serif;
}
.research-subtitle{
  font-family: 'Hiragino Mincho ProN',serif;
  color:#000;
  border-radius: 4pt;
  background: #FFEBCD;
  padding:5pt 10pt;
  margin:20pt 0;
}
.research-subsubtitle{
  margin-top:20pt;
  font-family: 'Hiragino Mincho ProN',serif;
  font-weight: bold;
}

p{
  font-size:1.0rem;
  line-height: 180%;
  font-family: 'Times New Roman','Avenir','Helvetica','Hiragino Mincho ProN',serif;
  overflow: scroll;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0px;
  padding:0;
}

.move-page-enter-active,.move-page-leave-active{
  transition: opacity 300ms ease;
}
.move-page-enter{
  opacity:0;
}
.move-page-enter-to{
  opacity:1;
}
.move-page-leave{
  opacity:1;
}
.move-page-leave-to{
  opacity:0;
}

.footer{
  background: #def;
  border-radius: 4px;
  position: relative;
  display: flex;
  justify-content: space-between;
  margin:55px 0 30px;
  padding: 15px 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.article-link-f{
  text-decoration: none;
  color:#333;
  padding:0;
  margin:25px;
  font-size: 1.0rem;
}
.article-link-f:hover
{
  text-decoration: underline;
}
.article-title-f{
  color: #333;
  width:33%;
  list-style-type: none;
  text-align: center;
  margin:0;
  padding:0;
  font-family: 'Times New Roman','Avenir','Helvetica','Hiragino Mincho ProN',serif;
}
.title-sp{
  display:none;
}
.title-right{
  text-align:right;
}
.title-center{
  text-align:center;
}
.title-left{
  text-align:left;
}


.text-box{
  display: inline-block;
  text-align: left;
  width:80%;
}
.italic-tnr{
  font-family: "Times New Roman";
  font-size: 1.1rem;
  margin:0 4px;
}
.pic-container{
  margin: 0;
  padding: 0;
  text-align: center;
  justify-content: space-between;
}
.video-container{
  margin: 5px;
  text-align: center;
  justify-content: space-between;
}

.br-pc{
  display:block;
}
.br-sp{
  display:none;
}

@media screen and (max-width: 640px){
  .br-pc{
    display:none;
  }
  .br-sp{
    display:block;
  }
  .research-title{
    font-size:1.1rem;
    margin-top:18pt;
  }
  .research-subtitle{
    font-size:1.0rem;
  }
  .research-subsubtitle{
    font-size:0.9rem;
  }
  p{
    font-size:0.8rem;
  }
  .italic-tnr{
    font-size: 0.9rem;
    margin:0 2px;
  }
  .text-box{
    width:85%;
  }
  .footer{
    background: #def;
    border-radius: 4px;
    position: relative;
    display: block;
    justify-content: normal;
    margin:20px 0 30px;
    padding: 5px 5px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    line-height: 170%;
  }
  .article-title-f{
    color: #333;
    width:100%;
    list-style-type: none;
    text-align: center;
    margin:0 10px;
    padding:0;
    font-family: 'Times New Roman','Avenir','Helvetica','Hiragino Mincho ProN',serif;
  }
  .title-sp{
    text-align:left;
    display:block;
  }
  .title-right{
    text-align:left;
  }
  .title-center{
    display:none;
  }
  .title-left{
    text-align:left;
  }
  .article-link-f{
    font-size: 0.8rem;
    padding:0;
    margin:0;
  }
}
</style>
