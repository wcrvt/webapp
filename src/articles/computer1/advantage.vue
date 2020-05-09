<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 専用計算機を使用した制御系設計 </h1>
      <p>
        高速計算を行うことで，制御系に混入する雑音のパワースペクトル密度を低減することができた。これは制御設計における制約を緩和することに繋がり，制御性能の向上を可能とする。ここでは，制御系設計におけるオーバーサンプリングの効果を確認する。
      </p>

      <h2 class="research-subtitle"> 2自由度制御系の性能向上 </h2>
      <p>
        独立したフィードフォワード制御器とフィードバック制御器を持ち，普遍的な線形制御器を表現可能な制御系アーキテクチャである2自由度制御系の実装を対象として，オーバーサンプリングを行うことで性能向上に繋がることを示す。2自由度制御系は以下に示される構造を持つ。
      </p>
      <div class="pic-container">
        <img src="@/pic/problem/controller_2dof.png" class="pic-controller_2dof">
      </div>
      <p>
        ただし，<i class="italic-tnr">r, y, d, v, w</i>は指令値，出力，外乱，入力外乱，観測外乱とする。雑音<i class="italic-tnr">v, w</i>は世紀白色雑音とし，<i class="italic-tnr">H<sub>1</sub></i>および<i class="italic-tnr">H<sub>2</sub></i>によって整形された後にシステムに入力されるものとする。また，制御対象とそのモデルについて次のように表現する。
        <vue-mathjax :formula="f_tf_model" />
        ここで，上記のシステムの出力は次のように表される。
        <vue-mathjax :formula="f_tf_2dof" />
        上式は下記の伝達関数を使用して簡潔に表現することができる。
        <vue-mathjax :formula="f_tf_2dof_simple" />
        ただし，<i class="italic-tnr">T<sub>ry</sub>, T<sub>dy</sub>, T<sub>vy</sub>, T<sub>wy</sub></i>はそれぞれ指令値追従誤差特性，外乱抑圧特性，入力雑音感度，観測雑音感度を表す。この表現から2自由度制御系の外因性外乱に対する感度を確認することができる。この指標から，次の事項が確認できる。
        <ul>
          <li> 指令値追従性能向上のためには，コントローラゲインを高くする必要がある。 </li>
          <li> 外乱抑圧性能向上のためには，コントローラゲインを高くする必要がある。</li>
          <li> 応答性の観点から，雑音はコントローラゲインを制限する。</li>
          <li> 安定性の観点から，モデル変動はコントローラゲインを制限する。</li>
          <li> 位相余裕の観点から，デジタルフィルタを用いた雑音除去処理はコントローラゲインを制限する。</li>
        </ul>
        このことから，制御系の性能を制限する要因はモデル変動や雑音であり，制御系のアーキテクチャとは無関係であることがわかる。ここで，FPGAを用いて高速演算器を設置し，オーバーサンプリングによって雑音を低減することができれば，コントローラゲインを向上することが可能となる。
      </p>

      <h2 class="research-subtitle"> オーバーサンプリングの利点</h2>
      <p>
        Parsevalの定理が示すように，信号がエルゴード性を示すのであれば，サンプルされた離散信号の電力はサンプリング周波数に依存しない。これは，信号の電力がナイキスト周波数までの周波数帯で表現されることを示している。制御における雑音処理の目的は制御帯域内の雑音を低減することであるため，基本的な雑音処理能力はサンプリング周波数によって決定される。そのため，カルマンフィルタのような最適推定値を出力するフィルタであっても，高速動作する信号処理器に対して優位に立つことは根本的に難しい。その理由を数値例を用いて説明する。
      </p>
      <p>
        以下に示す2つのシステムに対して白色雑音を入力し，最終的なメモリに保存される信号の電力を比較する。前段に信号処理回路，後段にアプリケーションプロセッサが設置されている構成とする。一方はアプリケーションプロセッサに，一方は信号処理回路に低域通過フィルタを持つとする。また，信号処理回路のサンプリング周波数を1 MHz,アプリケーションプロセッサのサンプリング周波数を20 kHzとする。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer1/oversampling_block.png" class="pic-oversampling_block">
      </div>
      <p>
        処理の過程を確認するために，プローブ点を設置している。2つのシステムには遮断周波数が1 kHzの1次IIR低域通過フィルタを設置した。上記のシステムにBox-Muller法により生成した擬似白色雑音を入力した際の各プローブ点における周波数応答は次のようになった。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer1/oversampling_result.png" class="pic-oversampling_result">
      </div>
      <p>
        図(a)より，低域通過フィルタが扱える雑音量に大きな差があることが確認できる。高速回路で信号を処理した場合，アプリケーションプロセッサで処理する場合と比較して遮断できる電力が大きい。また，オーバーサンプリングの効果により，低域のパワースペクトル密度も減少している。図(b)を確認すると，上記の効果がフィルタ出力においても保持されていることが確認できる。図(c)は高速処理回路とアプリケーションプロセッサ間のダウンサンプラによる雑音電力の変化を表している。低域通過フィルタにより高周波信号を遮断しているため，エイリアシングの影響は抑制されている。図(d)より最終的にアプリケーションプロセッサ上に到着した信号の電力を確認すると，全帯域における雑音電力の減少が確認できる。このような全帯域に渡る雑音低減は，デジタルフィルタを用いて実現することはできない。また，高速回路によるオーバーサンプリングは位相遅れを伴うものではなく，制御系の位相余裕度を確保することにも繋がる。以上より，高速演算回路を制御系に組み込むことは制御性能の向上に有効な手段となる。
      </p>

      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/computer1/constraints">
            > 計算機性能に起因する制約
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/computer2/computer_architecture">
            > 計算機アーキテクチャの設計
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


        f_tf_model: "$$ \\begin{eqnarray} P&\\triangleq&ND^{-1},\\ P_{\\rm n}\\triangleq N_{\\rm n}D^{-1}_{\\rm n} \\end{eqnarray} $$",

        f_tf_2dof: "$$ \\begin{eqnarray} y&=& (I+PC)^{-1}(PP_{\\rm n}^{-1}+PC)N_{\\rm n}Kr+(I+PC)^{-1}Pd+(I+PC)^{-1}P(H_{1}v-CH_{2}w) \\\\ &=& N_{\\rm n}Kr-(I+PC)^{-1}(I-PP_{\\rm n}^{-1})N_{\\rm n}Kr+(I+PC)^{-1}Pd+(I+PC)^{-1}P(H_{1}v-CH_{2}w)    \\end{eqnarray} $$",

        f_tf_2dof_simple: "$$ \\begin{eqnarray} y&=& N_{\\rm n}Kr+T_{\\rm ry}(P)r+T_{\\rm dy}(P)d+T_{\\rm vy}(P)v+T_{\\rm wy}(P)w \\\\[8pt] \\begin{bmatrix} T_{\\rm ry}(P) \\\\ T_{\\rm dy}(P) \\\\ T_{\\rm vy}(P) \\\\ T_{\\rm wy}(P)\\end{bmatrix} &\\triangleq& \\begin{bmatrix} -(I+PC)^{-1}(I-PP_{\\rm n}^{-1})N_{\\rm n}K \\\\ (I+PC)^{-1}P \\\\ (I+PC)^{-1}P \\\\ -(I+PC)^{-1}PC \\end{bmatrix} \\end{eqnarray} $$",

      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.pic-controller_2dof{
  width:90%;
  max-width:500px;
  margin:10px;
}

.pic-oversampling_block{
  width:90%;
  max-width:650px;
  margin:10px;
}
.pic-oversampling_result{
  width:90%;
  max-width:650px;
  margin:10px;
}

</style>
