<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> Luenbergerのオブザーバ </h1>
      <p>
        制御系設計において，センサ観測値だけではなくシステムの内部状態を観測してフィードバックすることで，フィードバック制御系の極配置に関する自由度が拡張され，制御系の特性を幅広く調整することが可能となる。システムの内部状態を観測することを目的として，Luenbergerは1964年にオブザーバを構築することを提案した。ここではLuenbergerのオブザーバの動作原理と構成ついて紹介する。
      </p>

      <h2 class="research-subtitle"> 同一次元オブザーバ</h2>
      <p>
        Luenbergerの提案したオブザーバは，(1) プラントシステムのモデルを作成し，(2) プラントモデルから現時刻の内部状態を予測し，(3) センサを用いて観測したプラントシステムのシステム出力とプラントモデルから予想されたシステム出力を比較して内部状態を更新する。
      </p>
      <div class="pic-container">
        <img src="@/pic/linear_system/state_observer.png" class="pic-so">
      </div>
      <p>
        上図はプラントシステム(A+B)に対してLuenbergerのオブザーバ(C+D)を構築したシステムとなる。
        Luenbergerはオブザーバの一般系を導出するにあたってプラントシステムを状態空間表現を用いて記述している。プラント(A)とセンサ(B)を合わせて，次のように表現する。
        <vue-mathjax :formula="f_ssr" />
        ここで，<i class="italic-tnr">x, u, y, v, w</i>は内部状態，入力，システム出力，入力雑音，観測雑音を表す。<i class="italic-tnr">A, B, C</i>はシステム行列，入力行列，観測行列と呼ばれる。このシステムを同定し，次のようなシステムモデル(C)を作成する。
        <vue-mathjax :formula="f_ssr_model" />
        ただし，<i class="italic-tnr">A<sub>n</sub>, B<sub>n</sub>, C<sub>n</sub></i>は各々の公称モデルを表す。このモデルを用いて内部状態とシステム出力の予測が可能であるが，実プラントシステムには入力雑音が入力されるため，内部状態の予測値と真値が一致する保証がない。そこで，補償器(D)を設置して内部状態を観測する。
        <vue-mathjax :formula="f_ssr_observe" />
        ここで，<i class="italic-tnr">L</i>はオブザーバゲインと呼ばれる。この補償器により，真値と観測値の誤差は次のようなダイナミクスを持つ。
        <vue-mathjax :formula="f_ssr_error" />
        したがって，<i class="italic-tnr">A-LC</i>が複素左半平面上に根を持つ場合，観測誤差は時間経過に伴い低減する。オブザーバゲイン<i class="italic-tnr">L</i>は誤差ダイナミクスを調整する役割を持つ。このオブザーバはシステムの全内部状態を観測するため，全状態オブザーバもしくは同一次元オブザーバと呼ばれる。
      </p>

      <h2 class="research-subtitle"> オブザーバを使用したフィードバック制御 </h2>
      <p>
        観測した内部状態<i class="italic-tnr">x&#770;</i>とフィードバックゲイン<i class="italic-tnr">F</i>を使用して，次のようなフィードバック制御系を構築する。
      </p>
      <div class="pic-container">
        <img src="@/pic/linear_system/state_observer_fb.png" class="pic-so_fb">
      </div>
      <p>
        このとき，内部状態と観測誤差のダイナミクスは次のように表される。
        <vue-mathjax :formula="f_ssr_fb" />
        ここで，内部状態と観測誤差をまとめた拡大系は次のように表現される。
        <vue-mathjax :formula="f_ssr_extend" />
        以上より，観測した内部状態<i class="italic-tnr">x&#770;</i>をフィードバックすることで，システムの極を移動させることができる。また，<i class="italic-tnr">A=A<sub>n</sub></i>かつ<i class="italic-tnr">C=C<sub>n</sub></i>のとき，拡大系の固有値は<i class="italic-tnr">A-BF</i>および<i class="italic-tnr">A-LC</i>となる。これは内部状態のダイナミクスと観測誤差のダイナミクスを独立して設計可能であることを示している。この制御系では，オブザーバの推定遅れは内部状態の状態遷移に影響を与えるが，モデル化誤差が非常に小さい場合に限りシステムの極に影響を与えない。これを分離の定理と呼ぶ。
      </p>


      <h2 class="research-subtitle"> 最小次元オブザーバ </h2>
      <p>
        同一次元オブザーバは全ての内部状態を推定するが，センサ系が観測する内部状態が信頼できる場合には推定する必要はない。また，オブザーバのフィードバックに使用する必要もない。ここでは，センサ系で観測できない内部状態のみを推定する最小次元オブザーバについて紹介する。
      </p>

      <p>
        まず，内部状態をセンサを用いて取得可能な状態<i class="italic-tnr">z</i>と取得不可の状態<i class="italic-tnr">&xi;</i>に分けて並び替え，状態空間表現を構築する。
        <vue-mathjax :formula="f_ssr_mso" />
        ここで，内部状態<i class="italic-tnr">&xi;</i>に関する状態空間表現を得る。
        <vue-mathjax :formula="f_ssr_mso_xi" />
        ここで，<i class="italic-tnr">U, Y</i>は直接観測できないため，センサ出力を用いて次のように推定する。
        <vue-mathjax :formula="f_ssr_mso_parts" />
        内部状態<i class="italic-tnr">&xi;</i>に対してオブザーバを組むと，次のようになる。
        <vue-mathjax :formula="f_ssr_mso_xi_est" />
      </p>
      <div class="pic-container">
        <img src="@/pic/linear_system/state_observer_min1.png" class="pic-mso1">
      </div>
      <p>
        推定式を展開すると，以下のようになる。
        <vue-mathjax :formula="f_ssr_mso_xi_est2" />
        ここで，<i class="italic-tnr">y</i>の微分値の計算を避けるために媒介変数<i class="italic-tnr">P</i>を導入し，間接的に<i class="italic-tnr">&xi;</i>を推定する。
        <vue-mathjax :formula="f_ssr_mso_xi_est3" />
        以上より，内部状態<i class="italic-tnr">&xi;</i>を推定するオブザーバは次のようになる。
      </p>
      <div class="pic-container">
        <img src="@/pic/linear_system/state_observer_min2.png" class="pic-mso2">
      </div>
      <p>
        このオブザーバの構成を変形すると，次のように簡略化して表現することができる。
        <vue-mathjax :formula="f_ssr_mso_xi_est4" />
      </p>
      <div class="pic-container">
        <img src="@/pic/linear_system/state_observer_min3.png" class="pic-mso3">
      </div>
      <p>
        このように，最小次元オブザーバは最終的に非常に単純な形式を取る。同一次元オブザーバと比較して，単純なフィルタ処理のみで内部状態を推定する。上記の最小次元オブザーバの導出方法はGopinathの方法と呼ばれる。
      </p>


      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/linear_system/inner_model_principle">
            > 内部モデル原理に基づく制御系設計
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/linear_system/youla_kucera">
            > Youla-Ku&ccaron;eraのパラメトリゼーション
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

        f_ssr: "$$ \\begin{eqnarray} \\dot{x}&=&Ax+Bu+v \\\\ y&=&Cx+w \\end{eqnarray} $$",

        f_ssr_model: "$$ \\begin{eqnarray} \\dot{\\hat{x}}&=&A_{\\rm n}\\hat{x}+B_{\\rm n}u \\\\ \\hat{y}&=&C_{\\rm n}\\hat{x} \\end{eqnarray} $$",

        f_ssr_observe: "$$ \\begin{eqnarray} \\dot{\\hat{x}}&=&A_{\\rm n}\\hat{x}+B_{\\rm n}u + L(y-\\hat{y}) \\\\ \\hat{y}&=&C_{\\rm n}\\hat{x} \\end{eqnarray} $$",

          f_ssr_error: "$$ \\begin{eqnarray} \\dot{x}-\\dot{\\hat{x}}&=&\\left(Ax+Bu+v\\right)-\\left(A_{\\rm n}\\hat{x}+B_{\\rm n}u+L(y-\\hat{y})\\right) \\\\ &=&A_{\\rm n}(x-\\hat{x})+(A-A_{\\rm n})x+(B-B_{\\rm n})u -L(Cx+w-C_{\\rm n}\\hat{x})+v \\\\ &=&A_{\\rm n}(x-\\hat{x})+(A-A_{\\rm n})x+(B-B_{\\rm n})u -LC_{\\rm n}(x-\\hat{x})-L(C-C_{\\rm n})x+v-Lw \\\\ &=&(A_{\\rm n}-LC_{\\rm n})(x-\\hat{x})+((A-A_{\\rm n})-L(C-C_{\\rm n}))x+(B-B_{\\rm n})u+v-Lw \\\\ \\therefore \\dot{e}&=&(A_{\\rm n}-LC_{\\rm n})e+((A-A_{\\rm n})-L(C-C_{\\rm n}))x+(B-B_{\\rm n})u+v-Lw \\\\ &&(e\\triangleq x-\\hat{x}) \\end{eqnarray} $$",

          f_ssr_fb: "$$ \\begin{eqnarray} \\dot{x}&=&Ax+B(u-F\\hat{x})+v \\\\ &=&(A-BF)x+Bu+BFe+v \\\\ \\dot{e}&=&(A_{\\rm n}-LC_{\\rm n})e+((A-A_{\\rm n})-L(C-C_{\\rm n}))x+(B-B_{\\rm n})u+v-Lw  \\end{eqnarray} $$",

          f_ssr_extend: "$$ \\begin{eqnarray} \\frac{d}{dt}\\begin{bmatrix} x \\\\ e \\end{bmatrix} &=& \\begin{bmatrix} A-BF & BF \\\\ (A-A_{\\rm n})-L(C-C_{\\rm n}) & A_{\\rm n}-LC_{\\rm n} \\end{bmatrix}\\begin{bmatrix} x \\\\ e \\end{bmatrix} + \\begin{bmatrix} B \\\\ B-B_{\\rm n} \\end{bmatrix}u +\\begin{bmatrix} I \\\\ I \\end{bmatrix}v+\\begin{bmatrix} 0 \\\\ -L \\end{bmatrix}w \\end{eqnarray} $$",

          f_ssr_mso: "$$ \\begin{eqnarray} \\frac{d}{dt}\\begin{bmatrix} \\xi \\\\ z \\end{bmatrix} &=& \\begin{bmatrix} A_{11} & A_{12} \\\\ A_{21} & A_{22} \\end{bmatrix}\\begin{bmatrix} \\xi \\\\ z \\end{bmatrix} + \\begin{bmatrix} B_{1} \\\\ B_{2} \\end{bmatrix}u + \\begin{bmatrix} H_{1} \\\\ H_{2} \\end{bmatrix}v \\\\ y&=&z+w \\end{eqnarray} $$",

          f_ssr_mso_xi: "$$ \\begin{eqnarray} && \\left\\{ \\begin{matrix} \\dot{\\xi}=A_{11}\\xi+(A_{12}z+B_{1}u)+H_{1}v \\\\ \\dot{z}-A_{22}z-B_{2}u=A_{21}\\xi +H_{2}v \\end{matrix} \\right. \\\\ \\Leftrightarrow && \\left\\{ \\begin{matrix} \\dot{\\xi}=A_{11}\\xi+U +H_{1}v\\\\ Y=A_{21}\\xi +H_{2}v\\end{matrix} \\right. \\\\ &&\\left( \\begin{matrix} U\\triangleq A_{12}z+B_{1}u \\\\ Y\\triangleq\\dot{z}-A_{22}z-B_{2}u \\end{matrix} \\right)\\end{eqnarray} $$",

          f_ssr_mso_parts: "$$ \\begin{eqnarray} \\hat{U}&=&A_{{\\rm n}12}y+B_{{\\rm n}1}u \\\\ \\bar{Y}&=&\\dot{y}-A_{{\\rm n}22}y-B_{{\\rm n}2}u \\end{eqnarray} $$",

          f_ssr_mso_xi_est: "$$ \\begin{eqnarray} && \\left\\{ \\begin{matrix} \\hat{\\dot{\\xi}}=A_{{\\rm n}11}\\hat{\\xi}+\\hat{U}+L(\\bar{Y}-\\hat{Y})\\\\ \\hat{Y}=A_{{\\rm n}21}\\hat{\\xi} \\end{matrix} \\right.\\end{eqnarray} $$",

          f_ssr_mso_xi_est2: "$$ \\begin{eqnarray}  \\hat{\\dot{\\xi}}&=&A_{{\\rm n}11}\\hat{\\xi}+\\hat{U}+L(\\bar{Y}-\\hat{Y})\\\\ &=&A_{{\\rm n}11}\\hat{\\xi}+(A_{{\\rm n}12}y+B_{{\\rm n}1}u)+L((\\dot{y}-A_{{\\rm n}22}y-B_{{\\rm n}2}u)-A_{{\\rm n} 21}\\hat{\\xi}) \\\\ &=&(A_{{\\rm n}11}-LA_{{\\rm n} 21})\\hat{\\xi}+(A_{{\\rm n}12}y+B_{{\\rm n}1}u)+L(\\dot{y}-A_{{\\rm n}22}y-B_{{\\rm n}2}u) \\\\ &=&(A_{{\\rm n}11}-LA_{{\\rm n} 21})\\hat{\\xi}+(A_{{\\rm n}12}-LA_{{\\rm n}22})y+(B_{{\\rm n}1}-LB_{{\\rm n}2})u+L\\dot{y} \\end{eqnarray} $$",

          f_ssr_mso_xi_est3: "$$ \\begin{eqnarray}  P&\\triangleq&\\xi-Ly \\Leftrightarrow \\xi=P+Ly\\\\[4pt] \\hat{\\dot{\\xi}}-L\\dot{y}&=&(A_{{\\rm n}11}-LA_{{\\rm n} 21})\\hat{\\xi}+(A_{{\\rm n}12}-LA_{{\\rm n}22})y+(B_{{\\rm n}1}-LB_{{\\rm n}2})u\\\\ &=&(A_{{\\rm n}11}-LA_{{\\rm n} 21})\\hat{\\xi}-(A_{{\\rm n}11}-LA_{{\\rm n} 21})Ly+(A_{{\\rm n}11}-LA_{{\\rm n} 21})Ly+(A_{{\\rm n}12}-LA_{{\\rm n}22})y+(B_{{\\rm n}1}-LB_{{\\rm n}2})u \\\\ &=&(A_{{\\rm n}11}-LA_{{\\rm n} 21})(\\hat{\\xi}-Ly)+((A_{{\\rm n}11}-LA_{{\\rm n} 21})L+A_{{\\rm n}12}-LA_{{\\rm n}22})y+(B_{{\\rm n}1}-LB_{{\\rm n}2})u \\\\[6pt] \\therefore \\dot{P} &=&(A_{{\\rm n}11}-LA_{{\\rm n} 21})P+((A_{{\\rm n}11}-LA_{{\\rm n} 21})L+A_{{\\rm n}12}-LA_{{\\rm n}22})y+(B_{{\\rm n}1}-LB_{{\\rm n}2})u \\end{eqnarray} $$",

          f_ssr_mso_xi_est4: "$$ \\begin{eqnarray}  \\hat{\\xi}&=&(sI-A_{{\\rm n}11}+LA_{{\\rm n}21})^{-1}\\{(B_{{\\rm n}1}-LB_{{\\rm n}2})u+((A_{{\\rm n}11}-LA_{{\\rm n} 21})L+A_{{\\rm n}12}-LA_{{\\rm n}22})y\\}+Ly \\\\ &=& (sI-A_{{\\rm n}11}+LA_{{\\rm n}21})^{-1}\\{(B_{{\\rm n}1}-LB_{{\\rm n}2})u+(sL+A_{{\\rm n}12}-LA_{{\\rm n}22})y\\}\\end{eqnarray} $$",

      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.pic-so{
  width:90%;
  max-width:530px;
  margin:10px;
}
.pic-so_fb{
  width:90%;
  max-width:500px;
  margin:10px;
}
.pic-mso1{
  width:90%;
  max-width:700px;
  margin:10px;
}
.pic-mso2{
  width:90%;
  max-width:430px;
  margin:10px;
}
.pic-mso3{
  width:90%;
  max-width:430px;
  margin:10px;
}
</style>
