<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 基本的な制御系のアーキテクチャ </h1>
      <p>
        制御の大まかな流れは入力，出力観測，補正となる。体系化された制御系のアーキテクチャは上記機能を包含し，多くの制御対象に対して適用可能な汎用的構造を有する。ここでは代表的なアーキテクチャの構造と機能について紹介する。
      </p>

      <h2 class="research-subtitle"> 1自由度制御系 </h2>
      <p>
        1自由度制御系は最も単純な制御系のアーキテクチャである。制御系は指令値を受け取り，現在の値と比較して制御入力を決定する。
      </p>
      <div class="pic-container">
        <img src="@/pic/linear_system/controller_1dof.png" class="pic-controller_1dof">
      </div>
      <p>
        ここで，<i class="italic-tnr" style="margin-left:0">r, y, d</i>は指令値，出力応答，外乱を示し，<i class="italic-tnr" style="margin-left:0">K, C, P</i>は指令値整形器，制御器，制御対象を表す。出力応答は次のように表される。
        <vue-mathjax :formula="f_tf_1dof" />
        上記の結果から，以下の問題が確認できる。
        <ul>
          <li> 指令値と出力応答が完全に一致することはなく，必ず遅れが伴う。 </li>
          <li> 指令値-出力伝達関数と外乱-出力伝達関数が等しい極配置を持つ。</li>
        </ul>
        1自由度制御系は，指令値と現在の出力応答を比較して制御入力を行うので，必然的に出力遅れを伴う。また，指令値追従特性と外乱抑圧特性を独立に設計できないことは，双方のうち一方に偏った設計と成らざるを得ない。外乱抑圧を第一に考えた場合に，制御器は多くの補償器を含む必要があるが，指令値-出力伝達関数が複雑化し，所望の追従特性を実現することが困難となる。この問題は，上記伝達関数の極と零点の配置に関する問題であり，極零配置問題と呼ぶ。また，一方の特性のみを設計可能であることから，1自由度制御系と呼ばれる。
      </p>

      <h2 class="research-subtitle"> 2自由度制御系 </h2>
      <p>
        1自由度制御系では，制御入力の決定が指令値決定に対して後手に回るため，出力遅れを回避することができなかった。また，指令値追従特性と外乱抑圧特性を独立して設計できないという欠点があったため，指令値追従に関する自由度を明示的に加えたものが2自由度制御系である。
      </p>
      <div class="pic-container">
        <img src="@/pic/linear_system/controller_2dof.png" class="pic-controller_2dof">
      </div>
      <p>
        ここで，<i class="italic-tnr">P<sub>n</sub></i>を制御対象の公称モデルとして，<i class="italic-tnr">N<sub>n</sub></i>および<i class="italic-tnr">D<sub>n</sub></i>は<i class="italic-tnr">P<sub>n</sub></i>の右既約分解表現における分子多項式および分母多項式とする。
        <vue-mathjax :formula="f_nmodel" />
        この制御系は，制御対象の特性を考慮して決定された入力を制御対象に直逹させるループを有している。そのため，指令値に対する出力遅れを抑制することができる。これは，上記のブロック線図を次のように変形して表現することからも確認できる。
      </p>
      <div class="pic-container">
        <img src="@/pic/linear_system/controller_2dof2.png" class="pic-controller_2dof2">
      </div>
      <p>
        したがって，基本的な駆動に関しては制御対象の特性を考慮して決定された入力を使用し，出力誤差が生じた際に制御器<i class="italic-tnr">C</i>が作動する構成となっている。この制御系の出力応答は次のように表される。
        <vue-mathjax :formula="f_tf_2dof" />
        公称モデルが制御対象を精度よく表現する場合，出力応答は次のように表される。
        <vue-mathjax :formula="f_tf_2dof_simple" />
        以上より，指令値追従特性と外乱抑圧特性が独立しており，本制御系は2つの設計自由度を有していることがわかる。
      </p>




      <ul class="footer">
        <li class="article-title-f title-sp">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-left">
          <router-link class="article-link-f" />
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/linear_system/inner_model_principle">
            > 内部モデル原理に基づく制御系設計
          </router-link>
        </li>
      </ul>

    </div>
  </body>
</template>

<script>
  import { VueMathjax } from "vue-mathjax"
  export default {
    components: {
      "vue-mathjax": VueMathjax,
    },
    data () {
      return {

        f_tf_1dof: "$$ \\begin{eqnarray} y&=& PC(Kr-y)+Pd \\\\ \\Leftrightarrow (I+PC)y&=&PCKr+Pd \\\\ \\therefore y&=& (I+PC)^{-1}PCKr+(I+PC)^{-1}Pd\\end{eqnarray} $$",

        f_nmodel: "$$ \\begin{eqnarray} P_{\\rm n}&=&N_{\\rm n}D_{\\rm n}^{-1}    \\end{eqnarray} $$",

        f_tf_2dof: "$$ \\begin{eqnarray} y&=&PCN_{\\rm n}Kr+PD_{\\rm n}Kr+Pd-PCy \\\\ \\Leftrightarrow(1+PC)y&=&PCN_{\\rm n}Kr+PD_{\\rm n}Kr+Pd\\\\ &=& P(CN_{\\rm n}+P_{\\rm n}^{-1}N_{\\rm n})Kr+Pd\\\\ &=& (PP_{\\rm n}^{-1}+PC)N_{\\rm n}Kr+Pd \\\\ \\therefore y&=& (I+PC)^{-1}(PP_{\\rm n}^{-1}+PC)N_{\\rm n}Kr+(I+PC)^{-1}Pd \\\\ &=& N_{\\rm n}Kr-(I+PC)^{-1}(I-PP_{\\rm n}^{-1})N_{\\rm n}Kr+(I+PC)^{-1}Pd \\end{eqnarray} $$",

        f_tf_2dof_simple: "$$ \\begin{eqnarray} y&=& N_{\\rm n}Kr+(I+PC)^{-1}Pd \\end{eqnarray} $$",

      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.pic-controller_1dof{
  width:70%;
  max-width:400px;
  margin:10px;
}
.pic-controller_2dof{
  width:80%;
  max-width:500px;
  margin:10px;
}
.pic-controller_2dof2{
  width:80%;
  max-width:400px;
  margin:10px;
}

</style>
