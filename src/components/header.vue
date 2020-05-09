<template>
  <header class="header-box">
    <div class="page-top">
      <router-link class="nav-top" to="/"><nobr>Digital Servo</nobr></router-link>
    </div>
    <nav>
      <ul class="main_nav">
        <li><router-link class="nav-link" to="/">home</router-link></li>
        <li><router-link class="nav-link" to="/about">about</router-link></li>
        <li><router-link class="nav-link" to="/research">Research</router-link></li>
        <li><router-link class="nav-link" to="/contact">contact</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
  export default{
    data:()=>({
      PageTitle: "Digital Servo",
    }),
  }
</script>

<style scoped>

  @@charset "UTF-8";

  /* Common setting*/
  html{
    font-size: 100%;
  }
  /* Navigation var*/
  .page-top{
    font-size: 1.7rem;
    font-weight: bold;
    padding: 15px 0;
    margin: 0;
  }
  .nav-top{
    display:flex;
    text-decoration: none;
    color:#fff;
  }
  .main_nav{
    display:flex;
    font-size: 1.1rem;
    text-transform: uppercase;
    list-style: none;
  }
  .main_nav li{
    margin-left: 15pt;  /* Character spacing */
  }
  .nav-link{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #fff;
    position: relative;
    display: inline-block;
    text-decoration: none;
    padding: 5px;
  }
  .nav-link::after {
    position: absolute;
    bottom:2px;
    left: 0;
    content: '';
    width: 100%;
    height: 1px;
    background: #ff0000;
    transform: scale(0, 1);
    transform-origin: center top;
    transition: transform .3s;
  }
  .nav-link:hover::after{
    transform: scale(1, 1);
  }

  /* Page header*/
  .header-box{
    color: #fff;
    background: #000;
    display: flex;
    justify-content: space-between;
    text-align: center;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    max-width: 2000px;
    margin: 0;
    padding: 0 4%;
  }

  @media screen and (max-width: 640px) {
    .header-box{
      display: block;
      justify-content: space-between;
      text-align: center;
      margin: 0 auto;
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      max-width: 2000px;
      margin: 0;
      padding: 0 4%;
    }
    .page-top{
      font-size: 1.0rem;
      font-weight: bold;
      padding: 15px 0 0;
      margin: 0;
    }
    .main_nav{
      display:flex;
      justify-content: space-around;
      font-size: 0.8rem;
      padding: 8px 0 12px;
      margin:0;
    }
    .nav-link{
      font-family: Avenir, Helvetica, Arial, sans-serif;
      color: #fff;
      position: relative;
      display: inline-block;
      text-decoration: none;
      padding: 0px;
    }
  }

</style>
