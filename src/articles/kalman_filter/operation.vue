<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 状態量の予測と更新 </h1>
      <p>
        カルマンフィルタは予測と更新に基づくフィルタである。予測ステップでは，次サンプル点における状態量を予測する。更新ステップでは予測の信頼度と観測の信頼度を比較して状態量を更新（推定）する。これらの信頼度は予測誤差の共分散および観測雑音の共分散といった形で導入されている。したがって，更新ステップを行うためには予測誤差の共分散の時間遷移を追う必要がある。本項では上記のステップについて確認を行う。ここではカルマンフィルタの理解を確実にするために，予測ステップの「予測状態量」と更新ステップの「推定状態量」を明確に区別する。
      </p>

      <h2 class="research-subtitle"> システムの記述 </h2>
      <p>
        状態量の予測，予測誤差の共分散の時間変遷を追うためには制御対象を数式を用いて記述する必要がある。カルマンフィルタでは状態空間表現を用いてシステムを記述する。
        <vue-mathjax :formula="f_model" />
        ここで，<i class="italic-tnr">v</i>はプロセス雑音，<i class="italic-tnr">w</i>は観測雑音を表す。プロセス雑音は入力の不確かさやモデル変動に起因する雑音を表し，予測の不確かさを決定する。観測雑音はセンサの不確かさを表す。更新ステップにおける予測と観測の信頼度を記述するために，各雑音の共分散を予め計測し，モデルに導入する。
        <vue-mathjax :formula="f_variance" />
      </p>
      <p>

      <h2 class="research-subtitle"> 予測ステップ：状態量の予測 </h2>
      <p>
        システムの状態空間表現を同定試験によって取得し，下記のように予測を行う。
        <vue-mathjax :formula="f_predict" />
        予測には，前サンプル時刻におけるカルマンフィルタの推定状態量が使用されている。当然ながら，プロセス雑音や観測雑音は予測不可能であるため，モデルからは省略される。以下の式展開では，モデル同定が適切に行われている，かつシステムのモデル変動が十分に小さいものとして説明を進める。
      </p>

      <h2 class="research-subtitle"> 予測誤差共分散の時間遷移 (1) </h2>
      <p>
        誤差共分散を計算するために，予測誤差の時間遷移を確認する。予測誤差に関する方程式は以下のようになる。
        <vue-mathjax :formula="f_error_predict" />
        上記の式から，予測の誤差共分散が計算できる。ただし，予測誤差は不偏量であると仮定する。
        <vue-mathjax :formula="f_cov_predict" />
        ここで，次サンプル点の予測誤差共分散を計算するためには現サンプル点の推定誤差共分散を得る必要があることが確認できる。そのため，予測誤差共分散の時間遷移の計算を一旦中断し，更新ステップを確認する。
      </p>

      <h2 class="research-subtitle"> 更新ステップ：状態量の更新（推定） </h2>
      <p>
        カルマンフィルタの状態量の更新は次のように行われる。
        <vue-mathjax :formula="f_update" />
        したがって，推定誤差に関する方程式は以下のようになる。
        <vue-mathjax :formula="f_error_estimate" />
        以上より，推定誤差共分散は次のように計算される。ただし，推定誤差は不偏量であると仮定する。
        <vue-mathjax :formula="f_cov_estimate" />
        以上より，同時刻の予測誤差共分散を用いて推定誤差共分散が計算可能であることが示された。上式を使用することで，予測誤差共分散の時間遷移を追うことが可能となる。ただし，カルマンゲイン<i class="italic-tnr">K</i>が不定であるので，実際にはまだ計算できない。

      <h2 class="research-subtitle"> カルマンゲインの決定 </h2>
      <p>
        カルマンフィルタの目標は推定誤差共分散を最小化することであり，状態量の二乗推定誤差を最小化する必要がある。状態量の要素の二乗推定誤差は共分散行列の対角項と一致し，本問題は行列の対角項の和=トレースを最小化する問題と等価となる。したがって，カルマンゲインが満たすべき条件は次のようになる。
        <vue-mathjax :formula="f_kalman_condition" />
        以上より，カルマンゲインは次のように決定される。このカルマンゲインは最小分散推定値を与え，最適カルマンゲインと呼ばれる。
        <vue-mathjax :formula="f_kalman_gain" />
      </p>
      <h2 class="research-subtitle"> 予測誤差共分散の時間遷移 (2)</h2>
        <p>
        最適カルマンゲインが設定された時，推定誤差共分散は次のように計算される。
        <vue-mathjax :formula="f_kalman_update" />
        予測誤差共分散の更新に必要な情報が集まったため，数式を整理する。
        <vue-mathjax :formula="f_cov_predict2" />
        以上より，最適カルマンゲインが設定された場合の予測誤差共分散の更新式が導出された。
      </p>

      <h2 class="research-subtitle"> 予測誤差共分散の時間遷移 (3)</h2>
      <p>
        時不変システムでは，時間の経過に伴い予測誤差共分散は一定の値に到達する。このとき，予測誤差共分散が満たす方程式は次のようになる。
        <vue-mathjax :formula="f_riccati" />
        上式は代数リッカチ方程式と呼ばれる。予測誤差共分散が一定値となった際には，最適カルマンゲインも一定値を取る。
        <vue-mathjax :formula="f_steady_kalman" />
        このカルマンゲインは定常カルマンゲインと呼ばれる。
      </p>

      <h3 class="research-subsubtitle"> 雑音の性質と推定の最適性 </h3>
      <p>
        ここまでカルマンフィルタの導出を進めてきたが，雑音に関する規約は存在しない。正確には，線形システムの状態推定において，カルマンフィルタは雑音の性質に依存せずに最小分散推定値を与える。必要な情報はプロセス雑音と観測雑音の分散のみとなる。
      </p>


      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/kalman_filter/principle_control">
            > 最適な状態観測器
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
            > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/kalman_filter/principle_signal">
            > カルマンフィルタの構造
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
        f_model: "$$ \\begin{eqnarray} x[k+1]&=&Ax[k]+Bu[k]+Gv \\\\ y[k]&=&Cx[k]+w \\end{eqnarray} $$",

        f_variance: "$$ \\begin{eqnarray} {\\rm E}\\left[vv^{\\mathrm T}\\right]\\triangleq Q,\\ {\\rm E}\\left[ww^{\\mathrm T}\\right]\\triangleq R \\end{eqnarray} $$",

        f_predict: "$$ \\begin{eqnarray} x_{\\rm p}[k+1]&=&A_{\\rm m}x_{\\rm K}[k]+B_{\\rm m}u[k] \\\\ y_{\\rm p}[k]&=&C_{\\rm m}x_{\\rm p}[k] \\end{eqnarray} $$",

        f_update: "$$ \\begin{eqnarray} x_{\\rm K}[k]&=&x_{\\rm p}[k]+K[k]e_{\\rm y}[k] \\\\ e_{\\rm y}[k] &\\triangleq& y[k]-y_{\\rm p}\\end{eqnarray} $$",

        f_error_predict: "$$ \\begin{eqnarray} x[k+1]-x_{\\rm p}[k+1]&=&Ax[k]-A_{\\rm m}x_{\\rm K}[k]+Bu[k]-B_{\\rm m}u[k] +Gv \\\\ &=& A(x[k]-x_{\\rm p}[k])+Gv \\\\ \\therefore e_{\\rm p}[k+1]&=&Ae_{\\rm K}[k]+Gv \\\\ (e_{\\rm p}[k]&\\triangleq&x[k]-x_{\\rm p}[k],\\ e_{\\rm K}[k]\\triangleq x[k]-x_{\\rm K}[k]) \\end{eqnarray} $$",

        f_cov_predict: "$$ \\begin{eqnarray} e_{\\rm p}[k+1]e_{\\rm p}^{\\mathrm T}[k+1]&=&(Ae_{\\rm K}[k]+Gv)(Ae_{\\rm K}[k]+Gv)^{\\mathrm T} \\\\ &=&(Ae_{\\rm K}[k]+Gv)(e_{\\rm K}^{\\rm T}[k]A^{\\mathrm T}+v^{\\mathrm T}G^{\\mathrm T}) \\\\ &=& Ae_{\\rm K}[k]e_{\\rm K}^{\\mathrm T}[k]A^{\\mathrm T}+Ae_{\\rm K}[k]v^{\\mathrm T}G^{\\mathrm T}+Gve_{\\rm K}^{\\rm T}[k]A^{\\rm T}+Gvv^{\\mathrm T}G^{\\mathrm T} \\\\ \\therefore P_{\\rm p}[k+1]&=&AP_{\\rm K}[k]A^{\\mathrm T}+GQG^{\\mathrm T} \\\\ (P_{\\rm p}[k]&\\triangleq&{\\rm cov}\\left[e_{\\rm p}[k]\\right],\\ P_{\\rm K}[k]\\triangleq{\\rm cov}\\left[e_{\\rm K}[k]\\right])\\end{eqnarray}$$",

        f_error_estimate: "$$ \\begin{eqnarray} e_{\\rm K}[k]&=&x[k]-x_{\\rm K}[k]\\\\&=&x[k]-(x_{\\rm p}[k]+K[k]e_{\\rm y}[k]) \\\\ &=& x[k]-x_{\\rm p}[k]-K[k]y[k]+K[k]C_{\\rm m}x_{\\rm p}[k] \\\\ &=& x[k]-x_{\\rm p}[k]-K[k]Cx[k]+K[k]C_{\\rm m}x_{\\rm p}[k]+K[k]w \\\\ &=& (I-K[k]C)e_{\\rm p}[k]+K[k]w \\end{eqnarray}$$",
        f_cov_estimate: "$$ \\begin{eqnarray} e_{\\rm K}[k]e_{\\rm K}^{\\mathrm T}[k]&=&\\left((I-K[k]C)e_{\\rm p}[k]+K[k]w\\right)\\left((I-K[k]C)e_{\\rm p}[k]+K[k]w\\right)^{\\mathrm T} \\\\ &=&\\left((I-K[k]C)e_{\\rm p}[k]+K[k]w\\right)\\left(e_{\\rm p}^{\\mathrm T}[k](I-K[k]C)^{\\mathrm T}+w^{\\mathrm T}K^{\\mathrm T}[k]\\right) \\\\ &=&(I-K[k]C)e_{\\rm p}[k]e_{\\rm p}^{\\mathrm T}[k](I-K[k]C)^{\\mathrm T}+K[k]ww^{\\mathrm T}K^{\\mathrm T}[k]\\\\ &&+K[k]w e_{\\rm p}^{\\mathrm T}[k](I-K[k]C)^{\\mathrm T}+(I-K[k]C)e_{\\rm p}[k]w^{\\mathrm T}K^{\\mathrm T}[k] \\\\ \\therefore P_{\\rm K}[k]&=& (I-K[k]C)P_{\\rm p}[k](I-K[k]C)^{\\mathrm T}+K[k]RK^{\\mathrm T}[k] \\\\ &=& P_{\\rm p}[k]- K[k]CP_{\\rm p}[k]-P_{\\rm p}[k]C^{\\mathrm T}K^{\\mathrm T}[k]+K[k](CP_{\\rm p}[k]C^{\\mathrm T}+R)K^{\\mathrm T}[k]\\end{eqnarray}$$",

        f_kalman_condition:"$$ \\begin{eqnarray} \\frac{\\partial {\\rm tr}(P_{\\rm K }[k])}{\\partial K[k]} &=&  -2(CP_{\\rm p}[k])^{\\mathrm T}+2K[k](CP_{\\rm p}[k]C^{\\mathrm T}+R)=0\\end{eqnarray}$$",

        f_kalman_gain:"$$ \\begin{eqnarray} K[k] &=& P_{\\rm p}^{\\mathrm T}[k] C^{\\mathrm T}(CP_{\\rm p}[k]C^{\\mathrm T}+R)^{-1} \\\\ &=& P_{\\rm p}[k] C^{\\mathrm T}(CP_{\\rm p}[k]C^{\\mathrm T}+R)^{-1} \\\\ &&(\\because P_{\\rm p}[k]=P_{\\rm p}^{\\mathrm T}[k])\\end{eqnarray}$$",

        f_kalman_update:"$$ \\begin{eqnarray} P_{\\rm K}[k]&=& P_{\\rm p}[k]- K[k]CP_{\\rm p}[k]-P_{\\rm p}[k]C^{\\mathrm T}K^{\\mathrm T}[k]+K[k](CP_{\\rm p}[k]C^{\\mathrm T}+R)K^{\\mathrm T}[k] \\\\ &=& P_{\\rm p}[k]- K[k]CP_{\\rm p}[k]-P_{\\rm p}[k]C^{\\mathrm T}K^{\\mathrm T}[k]+P_{\\rm p}[k]C^{\\mathrm T}K^{\\mathrm T}[k] \\\\ &=& (I-K[k]C)P_{\\rm p}[k] \\end{eqnarray}$$",

        f_cov_predict2: "$$ \\begin{eqnarray} P_{\\rm p}[k+1]&=&AP_{\\rm K}[k]A^{\\mathrm T}+GQG^{\\mathrm T} \\\\ &=&A(I-K[k]C)P_{\\rm p}[k]A^{\\mathrm T}+GQG^{\\mathrm T} \\\\ &=&A(I-P_{\\rm p}[k] C^{\\mathrm T}(CP_{\\rm p}[k]C^{\\mathrm T}+R)^{-1}C)P_{\\rm p}[k]A^{\\mathrm T}+GQG^{\\mathrm T} \\\\ &=&A(P_{\\rm p}[k]-P_{\\rm p}[k] C^{\\mathrm T}(CP_{\\rm p}[k]C^{\\mathrm T}+R)^{-1}CP_{\\rm p}[k])A^{\\mathrm T}+GQG^{\\mathrm T}  \\end{eqnarray}$$",

        f_riccati: "$$ \\begin{eqnarray} P^{\\ast}_{\\rm p}=A(P^{\\ast}_{\\rm p}-P^{\\ast}_{\\rm p} C^{\\mathrm T}(CP^{\\ast}_{\\rm p}C^{\\mathrm T}+R)^{-1}CP^{\\ast}_{\\rm p})A^{\\mathrm T}+GQG^{\\mathrm T}  \\end{eqnarray}$$",

        f_steady_kalman: "$$ \\begin{eqnarray} K[k] &=& P^{\\ast}_{\\rm p}[k] C^{\\mathrm T}(CP^{\\ast}_{\\rm p}[k]C^{\\mathrm T}+R)^{-1} \\end{eqnarray}$$",

      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}
</style>
