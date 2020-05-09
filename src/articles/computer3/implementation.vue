<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 専用計算機の実装 </h1>
      <p>
        ここでは設計した計算機の実装について記載する。実装する制御器のブロック線図を以下に示す。本設計では単精度浮動小数点を使用して制御演算を行うものとし，プロセッサとFPGA間のバス幅は32 bitとした。制御器は状態観測器および加速度規範型の位置と力のハイブッド制御器から構成される。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/imple_block.png" class="pic-imple_block">
      </div>
      <p>
        ただし，<i class="italic-tnr">C<sub>p</sub></i>, <i class="italic-tnr">C<sub>f</sub></i>, <i class="italic-tnr">K<sub>t</sub></i>, <i class="italic-tnr">J</i>は位置制御器，力制御器，トルク定数，慣性を表す。<i class="italic-tnr">D<sub>i</sub></i>(<i class="italic-tnr" style="margin:2px">i</i>=1,2), <i class="italic-tnr">Q<sub>d</sub></i>, <i class="italic-tnr">Q<sub>r</sub></i>は擬似微分器 (不完全微分器)，外乱オブザーバの推定フィルタ，反力オブザーバの推定フィルタであり，それぞれ位置/速度の擬似微分，推定外乱の雑音除去，推定反力の雑音除去に関わる。本設計では位置センサのみを使用して制御を行うことを想定しており，力センサの代わりに反力オブザーバを採用している。また，各フィルタは次のように設計した。
        <vue-mathjax :formula="f_filter" />
        ただし，<i class="italic-tnr" style="margin-left:0">g</i>は推定帯域を決定する設計パラメータを表す。上記の制御パラメータおよび設計パラメータはパラメータテーブルの設定により変更可能とした。制御可能軸数を2，位置の測定にインクリメンタルエンコーダ，制御入力の伝送にDA変換器を使用するものとして，次のように実装を行った。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/imple_diagram.png" class="pic-imple_diagram">
      </div>
      <p>
        この回路をXilinx社Zynq SoC (XC7Z010-1CLG400C) を使用して実装した結果，リソース使用量は以下のようになった。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer3/resource_table.png" class="pic-resource_table">
      </div>
      <p>
        この回路は周波数100 MHzのクロック信号を用いて動作することができる。そのため，状態観測器，加速度規範制御器に必要な演算はそれぞれ1 &micro;s以内に終了する。そこで，各ブロックの制御周期を1 &micro;sとして制御を行なった。この計算機の入力から出力までは2.45 &micro;sを要する。また，本計算機と周辺機器の合計消費電力は2.05 Wであった。
      </p>

      <ul class="footer">

        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/computer2/bus_architecture">
            > バスアーキテクチャの設計
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/computer3/positioning">
            > 精密位置決めへの適用
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
        f_filter: '$$ \\begin{eqnarray} Q_{\\rm d}&=&{\\rm diag}\\left\\{\\frac{g_{\\rm d1}}{s+g_{\\rm d1}}\\cdot\\frac{g_{\\rm d2}}{s+g_{\\rm d2}}\\right\\} \\\\ Q_{\\rm r}&=&{\\rm diag}\\left\\{\\frac{g_{\\rm r1}}{s+g_{\\rm r1}}\\cdot\\frac{g_{\\rm r2}}{s+g_{\\rm r2}}\\right\\} \\\\ D_{\\rm i}&=&{\\rm diag}\\left\\{\\frac{g_{\\rm pdi}s}{s+g_{\\rm pdi}}\\right\\} \\end{eqnarray}$$',
      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}
.pic-imple_block{
  width:90%;
  max-width:650px;
  margin:10px;
}
.pic-imple_diagram{
  width:90%;
  max-width:600px;
  margin:10px;
}
.pic-resource_table{
  width:90%;
  max-width:550px;
  margin:10px;
}
</style>
