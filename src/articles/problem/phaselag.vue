<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 位相遅れによる制御性能の限界 </h1>
      <p>
        制御系を構成する各要素は，入力を受けて出力を決定する機構を有している。
        <ul>
          <li> 制御演算装置： 運動目標を受け取り，制御対象の状態を確認したのちに制御入力を出力する。</li>
          <li> 駆動装置：制御演算装置の決定した制御入力を受けて，アクチュエータにエネルギを供給する。</li>
          <li> アクチュエータ：駆動装置から与えられたエネルギを受けて，物理運動を生成する。</li>
          <li> 運動変換装置：アクチュエータの単純な運動を受けて，複雑な運動に生成する。 </li>
          <li> センサ：制御対象の状態を受け取り，電圧に変換して出力する。</li>
        </ul>
        上記の装置は自然現象を人工的に再現するための装置であるが，制御演算装置，駆動装置，センサの入出力には必然的に伝達遅れが伴う。この伝達遅れは自然現象には存在せず，制御系を不安定にする要因となる。自然現象において系のエネルギは一般に極小点に向かい，系のエネルギが増大する(不安定化による発散)を起こすことはないが，伝達遅れを伴う制御入力は系のエネルギの増大を引き起こす場合がある。この伝達遅れは位相遅れと呼ばれる。
      </p>

      <h2 class="research-subtitle"> 位相遅れによる不安定化の原因 </h2>

      <p>
      はじめに，位相遅れという現象が入出力信号に与える影響について紹介する。位相遅れ量は，系に入力された信号の周波数成分に依存する。周期信号に微小時間の遅れを生じた場合，低周波信号であれば入出力波形に大差はないが，高周波信号では波形に大きなずれが生じる。
      </p>
      <div class="pic-container">
        <img src="@/pic/problem/phaselag_signal.png" class="pic-phaselag_sig">
      </div>
      <p>
        <vue-mathjax :formula="f_phaselag_sig" />
        ここで，<i class="italic-tnr" style="margin:2px">&phi;<sub>lag</sub></i>(<i class="italic-tnr" style="margin:4px">f</i>) は周波数成分<i class="italic-tnr">f</i>を持つ入力に対する出力の位相遅れを示す。高周波信号では伝達遅れが大きくなり，位相が反転して入力と出力が逆相となる恐れがある。この位相反転がフィードバック制御を不安定化させる要因となる。
      </p>

      <h3> 不安定化の例 </h3>
      <p>
        位相遅れによるシステムの不安定化は，高周波領域において生じる。下記に示すような系において，質点の振動を抑制することを考える。一番簡単な方法は速度に応じて制動力を発生させることである。今，サンプル点kにおいて速度<i class="italic-tnr">v<sub>k</sub></i>で右向きに運動しているものとする。この運動を抑制するために，制御系はサンプル点k+1において制動力を発生する。この際，速度の検知とノイズ除去，制動力の計算，駆動システムによるアクチュエータの駆動など，様々な遅れが付随する。この遅れに起因して，サンプル点kの計測結果が出力に反映される時刻をサンプル点k+nとする。ここで，質点の運動が非常に高速で，サンプル点k+nにおいて左向きの運動を行なっていたとすると，制動力は質点を加速させるように働く。次サンプル点においても質点の運動方向が制動力の方向と一致し，運動エネルギは加算され続けるため運動は発散する。
      </p>
      <div class="pic-container">
        <img src="@/pic/problem/phaselag_example1.png" class="pic-phaselag_example1">
      </div>
      <p>
        同様の現象は，制御対象の物体への接触に際しても生じる。今，サンプル点kにおいて慣性<i class="italic-tnr">m</i>の質点が環境から左向きに反力<i class="italic-tnr">f<sub>k</sub></i>を受けているとする。このとき，瞬時に発生すべき加速度は<i class="italic-tnr">a=m<sup>-1</sup>f<sub>k</sub></i>となる。
        ただし，制御系は力の観測，雑音処理，駆動力計算，駆動に起因する遅れが生じるため，即座に加速度を発生させることができない。サンプル点kの計測結果が出力に反映される時刻をサンプル点k+nとする。ここで，環境がサンプル点k+nにおいて右向きに力を発生させている場合，質点が発生すべき加速度が反転するため，接触状態を保つことができない。
      </p>
      <div class="pic-container">
        <img src="@/pic/problem/phaselag_example2.png" class="pic-phaselag_example2">
      </div>
      <p>
        以下に制御系に位相遅れを加えた状態で接触動作を行なった際の応答を示す。左から順に大きい位相遅れが加えられている。系に存在する位相遅れが大きくなるにつれて応答が振動的になることが確認できる。接触動作は位相遅れの影響を受けやすく，実用面の課題となっている。
      </p>
      <div class="video-container">
        <video src="@/video/problem/hunting_1.mp4" class="vib-video" type="video/mp4" controls loop playsinline />
        <video src="@/video/problem/hunting_2.mp4" class="vib-video" type="video/mp4" controls loop playsinline />
        <video src="@/video/problem/hunting_3.mp4" class="vib-video" type="video/mp4" controls loop playsinline />
      </div>

      <h2 class="research-subtitle"> 位相遅れへの対処 </h2>
      <p>
        位相遅れを伴うフィードバックは，入出力の位相が反転する周波数帯域において系のエネルギを増大させることが確認された。ここで，一巡ループゲインが1以下であれば信号はループ巡回ごとにエネルギを減少させるため，位相条件に関わらずエネルギは増大しない。これはスモールゲイン定理と呼ばれ，ナイキストの安定判別法からも同様の結果が得られる。
        <br>
        他の対処法としては，系に存在する位相遅れを低減することである。上述の例で示したように，センサ系，制御計算装置，駆動装置，アクチュエータといった一巡ループに存在する全ての遅れ要素の総和が安定性に影響を与える。したがって，一つでも大きな位相遅れを引き起こす要素が存在する場合には，制御性能の向上は難しい。複雑なタスクの実現には全体最適化による性能向上が必要となる。
      </p>
      <div class="pic-container">
        <img src="@/pic/problem/primitive_control_system_phase.png" class="pic-primitive">
      </div>

      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/problem/interdisciplinary">
            > 複合領域のシステム設計
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/problem/architecture">
            > 制御系アーキテクチャの制約
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
        f_phaselag_sig: "$$ \\begin{eqnarray} \\sin(2\\pi f(t-\\Delta t))&=&\\sin(2\\pi ft-2\\pi f\\Delta t)= \\sin(2\\pi ft-\\varphi_{\\rm lag}(f)) \\\\ \\varphi_{\\rm lag}(f)&\\triangleq&2\\pi f\\Delta t \\end{eqnarray} $$",

      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.vib-video{
  max-width:320px;
  width:90%;
  margin:10px;
}

.pic-phaselag_sig{
  width:90%;
  max-width:400px;
  margin:10px;
}
.pic-phaselag_example1{
  width:90%;
  max-width:700px;
  margin:10px;
}
.pic-phaselag_example2{
  width:90%;
  max-width:650px;
  margin:10px;
}
.pic-primitive{
  width:90%;
  max-width:500px;
  margin:10px;
}
</style>
