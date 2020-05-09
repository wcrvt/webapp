<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 制御系アーキテクチャの制約 </h1>
      <p>
        所望の制御特性を得るためには，指令値追従特性，外乱抑圧特性，モデル変動耐性 (ロバスト性)，雑音除去特性の獲得が重要となる。1自由度制御系では，指令値追従特性と外乱抑圧特性の間にトレードオフが存在したため，制御性能の確保が困難であった。2自由度制御系では，上記のトレードオフを回避したが，指令値追従特性および外乱抑圧特性とロバスト性および雑音除去特性の間にトレードオフが存在する。このトレードオフは，制御器のアーキテクチャの設計だけでは解決が難しく，制御系の全体設計を行うことで回避が可能となる。
      </p>

      <h2 class="research-subtitle"> 2自由度制御器の制約 </h2>
      <p>
        線形制御系設計において有名なアーキテクチャとして2自由度制御系が挙げられる。フィードフォワード制御系とフィードバック制御系が独立した構成となっている。フィードバック制御系の設計に関して，全ての安定化制御器はYoula-Ku&ccaron;eraのパラメトリゼーションによって規定されるため，一般に線形制御系は以下の形式を用いて表現可能である。例外として，厳密離散化に基づいた完全追従制御器や終端状態制御器など，逆モデルを使用しないフィードフォワード制御器を用いたものは，以下の表記に当てはまらない。
      </p>
      <div class="pic-container">
        <img src="@/pic/problem/controller_2dof.png" class="pic-controller_2dof">
      </div>
      <p>
        ただし，<i class="italic-tnr">r, y, d, v, w</i>は指令値，出力，外乱，入力外乱，観測外乱とする。雑音<i class="italic-tnr">v, w</i>は世紀白色雑音とし，<i class="italic-tnr">H<sub>1</sub></i>および<i class="italic-tnr">H<sub>2</sub></i>によって整形された後にシステムに入力されるものとする。また，制御対象とそのモデルについて次のように表現する。
        <vue-mathjax :formula="f_tf_model" />
      </p>
      <h3 class="research-subsubtitle"> 指令値追従に関する制約</h3>
      <p>
        上記のシステムの出力は次のように表される。
        <vue-mathjax :formula="f_tf_2dof" />
        ここで，次の伝達関数を使用して上式を簡潔に表現した。
        <vue-mathjax :formula="f_tf_2dof_simple" />
        ただし，<i class="italic-tnr">T<sub>ry</sub>, T<sub>dy</sub>, T<sub>vy</sub>, T<sub>wy</sub></i>はそれぞれ指令値追従特性，外乱抑圧特性，入力雑音感度，観測雑音感度を表す。
        以上より，以下の事項が確認できる。
        <ul>
          <li> モデル変動によって指令値追従性能が劣化する。</li>
          <li> 外乱抑圧性能を向上するためにはコントローラゲインを増加する必要があるが，観測雑音感度が増加する。 </li>
        </ul>
      </p>

      <h3 class="research-subsubtitle"> ロバスト安定性とロバスト性能に関する制約</h3>
      <p>
        モデル変動が生じた際に安定性と性能を保持する能力をロバスト安定性とロバスト性能という指標で評価する。制御系のロバスト性とは一般的に上記の指標を指す。モデル変動の表現方法は様々あり，代表的なものでは下記のような表現がなされている。
      </p>
      <div class="pic-container">
        <img src="@/pic/problem/plant_fluctuation.png" class="pic-plant_fluctuation">
      </div>
      <p>
        今回は乗法的不確かさを仮定してロバスト性の確認を行う。乗法的不確かさを含む制御対象に対する2自由度制御系は次のようになる。
      </p>
      <div class="pic-container">
        <img src="@/pic/problem/controller_2dof_multiplicative.png" class="pic-controller_2dof_multiplicative">
      </div>
      <p>
        この系が安定である条件は，乗法的不確かさ&Delta;を含む一巡伝達関数が1を超えないことである (小ゲイン定理)。一巡伝達関数は次のように表される。
        <vue-mathjax :formula="f_tf_2dof_multiplicative" />
        したがって，制御系の安定条件は次のように表される。
        <vue-mathjax :formula="f_t_condition" />
        ただし，<i class="italic-tnr" style="margin-right:2px">&sigma;</i>(&middot;)は最大特異値を表し，||&middot;||<sub>2</sub>はL2ノルムを表す。上式は<i class="italic-tnr" style="margin-right:2px">H</i><sub>&infin;</sub>ノルムとして，下記のように定義される。
        <vue-mathjax :formula="f_hinf_norm" />
        <i class="italic-tnr" style="margin-right:2px">H</i><sub>&infin;</sub>ノルムを使用して，安定条件は次のように表現される。
        <vue-mathjax :formula="f_hinf_stable" />
        続いて，モデル変動が発生した際の指令値追従特性の変動について確認する。モデルが<i class="italic-tnr">P<sub>n</sub></i>から<i class="italic-tnr">P</i>に変動した際の指令値追従特性の変動率を<i class="italic-tnr">R<sub>T</sub></i>, モデルの変動率を<i class="italic-tnr">R<sub>P</sub></i>とすると，それぞれ次のように表される。
        <vue-mathjax :formula="f_try_change" />
        ここで，変動率間には次のような関係が成立する。
        <vue-mathjax :formula="f_try_relation" />
        以上より，以下の事項が確認できる。
        <ul>
          <li> コントローラゲインが大きい場合に，モデル変動に起因してシステムが不安定化する場合がある。</li>
          <li> モデル変動による指令値追従性能の劣化はコントローラゲインを増加することで抑制できる。 </li>
        </ul>
      </p>

      <h3 class="research-subsubtitle"> 雑音感度に関する制約</h3>
      <p>
        雑音はコントローラゲインを増加する際の障害となるため，除去することが望ましい。一方で，デジタルフィルタを用いて雑音除去を行う場合には，制御信号と雑音の双方にフィルタがかかるため，制御ループ内にデジタルフィルタの特性が入る。通常，雑音除去のためには低域通過フィルタが使用されるため，高周波の位相遅れを免れない。位相遅れが伴う場合には開ループ系の位相余裕が減少するため，開ループゲイン (=コントローラゲイン)を増加することができない。以上より，次の事項が確認できる。
        <ul>
          <li> 雑音除去性能と外乱抑圧性能の間には位相遅れに起因するトレードオフが存在する。</li>
        </ul>
      </p>

      <h2 class="research-subtitle"> 総論 </h2>
      <p>
        以上の制約を纏めると，次の事項が確認できる。
        <ul>
          <li> 指令値追従性能向上のためには，コントローラゲインを高くする必要がある。 </li>
          <li> 外乱抑圧性能向上のためには，コントローラゲインを高くする必要がある。</li>
          <li> 応答性の観点から，雑音はコントローラゲインを制限する。</li>
          <li> 安定性の観点から，モデル変動はコントローラゲインを制限する。</li>
          <li> 位相余裕の観点から，デジタルフィルタを用いた雑音除去処理はコントローラゲインを制限する。</li>
        </ul>
        ここで，コントローラゲインを制限する要因はモデル変動や雑音であり，制御系のアーキテクチャとは無関係であることがわかる。制約下においてコントローラを導出するアルゴリズムとして代表的な手法に<i class="italic-tnr" style="margin-right:2px">H</i><sub>&infin;</sub>が挙げられるが，本質的には制約を緩和する手法ではなく，飛躍的な性能向上は望めない。性能上限はコントローラ外の要因に依存するため，システム全体の統合設計が重要となる。
      </p>

      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/problem/phaselag">
            > 位相遅れによる制御性能の限界
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/problem/approach">
            > 性能向上の制約と改善方法
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

        f_tf_2dof: "$$ \\begin{eqnarray} y&=&PCN_{\\rm n}Kr+PD_{\\rm n}Kr+Pd+PH_{1}v -PC(y+H_{2}w) \\\\ \\Leftrightarrow(1+PC)y&=&PCN_{\\rm n}Kr+PD_{\\rm n}Kr+Pd+PH_{1}v -PCH_{2}w \\\\ &=& P(CN_{\\rm n}+P_{\\rm n}^{-1}N_{\\rm n})Kr+Pd +P(H_{1}v-CH_{2}w)\\\\ &=& (PP_{\\rm n}^{-1}+PC)N_{\\rm n}Kr+Pd +P(H_{1}v-CH_{2}w) \\\\ \\therefore y&=& (I+PC)^{-1}(PP_{\\rm n}^{-1}+PC)N_{\\rm n}Kr+(I+PC)^{-1}Pd+(I+PC)^{-1}P(H_{1}v-CH_{2}w) \\\\ &=& N_{\\rm n}Kr-(I+PC)^{-1}(I-PP_{\\rm n}^{-1})N_{\\rm n}Kr+(I+PC)^{-1}Pd+(I+PC)^{-1}P(H_{1}v-CH_{2}w)    \\end{eqnarray} $$",

        f_tf_2dof_simple: "$$ \\begin{eqnarray} y&=& T_{\\rm ry}(P)r+T_{\\rm dy}(P)d+T_{\\rm vy}(P)v+T_{\\rm wy}(P)w \\\\[8pt] \\begin{bmatrix} T_{\\rm ry}(P) \\\\ T_{\\rm dy}(P) \\\\ T_{\\rm vy}(P) \\\\ T_{\\rm wy}(P)\\end{bmatrix} &\\triangleq& \\begin{bmatrix} N_{\\rm n}K-(I+PC)^{-1}(I-PP_{\\rm n}^{-1})N_{\\rm n}K \\\\ (I+PC)^{-1}P \\\\ (I+PC)^{-1}P \\\\ -(I+PC)^{-1}PC \\end{bmatrix} \\end{eqnarray} $$",

        f_tf_2dof_multiplicative: "$$ \\begin{eqnarray} b &=& -P_{\\rm n}C(a+b) \\\\ \\Leftrightarrow b&=&-(I+P_{\\rm n}C)^{-1}P_{\\rm n}Ca \\\\ \\Leftrightarrow ba^{-1}&=&-(I+P_{\\rm n}C)^{-1}P_{\\rm n}C \\\\ \\therefore L_{\\rm open}&=&ba^{-1}\\Delta=-(I+P_{\\rm n}C)^{-1}P_{\\rm n}C\\Delta\\end{eqnarray} $$",

        f_t_condition: "$$ \\begin{eqnarray} \\sup_{\\omega}\\sigma\\left(-(I+P_{\\rm n}C)^{-1}P_{\\rm n}C\\Delta\\right) = \\sup_{\\omega} \\| (I+P_{\\rm n}C)^{-1}P_{\\rm n}C\\Delta \\|_{2}<1 \\end{eqnarray} $$",

        f_hinf_norm: "$$ \\begin{eqnarray} \\| G(j\\omega) \\|_{\\infty} \\triangleq \\sup_{\\omega} \\sigma\\left(G(j\\omega)\\right)=\\sup_{\\omega} \\| G(j\\omega) \\|_{2} \\end{eqnarray} $$",

        f_hinf_stable: "$$ \\begin{eqnarray} \\| (I+P_{\\rm n}C)^{-1}P_{\\rm n}C\\Delta \\|_{\\infty} <1 \\end{eqnarray} $$",

        f_try_change: "$$ \\begin{eqnarray} R_{T}&=&\\left(T_{\\rm ry}(P)-T_{\\rm ry}(P_{\\rm n})\\right)T_{\\rm ry}^{-1}(P_{\\rm n}) \\\\ &=& T_{\\rm ry}(P)T_{\\rm ry}^{-1}(P_{\\rm n})-I \\\\ &=& (I+PC)^{-1}(PP_{\\rm n}^{-1}+PC)N_{\\rm n}KK^{-1}N_{\\rm n}^{-1}(P_{\\rm n}P_{\\rm n}^{-1}+PC)^{-1}(I+PC)-I \\\\ &=& (I+PC)^{-1}(PP_{\\rm n}^{-1}+PC)(I+PC)^{-1}(I+PC)-I \\\\ &=& (I+PC)^{-1}(PP_{\\rm n}^{-1}+PC)-I \\\\ &=& (I+PC)^{-1}(PP_{\\rm n}^{-1}-I) \\\\R_{P}&=&(P-P_{\\rm n})P_{\\rm n}^{-1} \\\\ &=& (PP_{\\rm n}^{-1}-I)\\end{eqnarray} $$",

        f_try_relation: "$$ \\begin{eqnarray} R_{\\rm T}&=&(I+PC)^{-1}R_{\\rm P} \\end{eqnarray} $$",

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
  max-width:550px;
  margin:10px;
}
.pic-controller_2dof_multiplicative{
  width:90%;
  max-width:650px;
  margin:10px;
}
.pic-plant_fluctuation{
  width:90%;
  max-width:450px;
  margin:10px;
}

</style>
