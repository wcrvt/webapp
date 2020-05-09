<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 計算機性能に起因する制約 </h1>
      <p>
        計算機を用いて制御系を設計する都合上，計算機を通過する信号は量子化される。量子化器は離散信号と連続信号の変換を行うため，離散時間制御器の制御性能を決定する要因となる。量子化においては時間方向と空間方向のサンプリングを行うため，計算機の性能が量子化器の性能に直結する。ここでは計算機の時間的・空間的分解能が制御系に与える影響について説明する。
      </p>

      <h2 class="research-subtitle"> 量子化による制約 </h2>
      <p>
        計算機は外部信号観測にための連続信号&rarr;離散信号の変換器 (Analog-to-Digital Converter: ADC) と制御入力発生のための離散信号&rarr;連続信号の変換器 (Digital-to-Analog Converter: DAC) の2つの部分に量子化器を持つ。2つの量子化器の統一的な表現は以下のようになる。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer1/quantizer.png" class="pic-quantizer">
      </div>
      <p>
        ADCの量子化器は，連続信号<i class="italic-tnr" style="margin-right:2px">x</i>(<i class="italic-tnr" style="margin:2px">t</i>) を取り込み，時間方向のサンプラを介して離散信号<i class="italic-tnr" style="margin-right:2px">X</i>[<i class="italic-tnr" style="margin:2px">k</i>] となり，空間方向サンプラを介して取得信号<i class="italic-tnr" style="margin-right:2px">Y</i>[<i class="italic-tnr" style="margin:2px">k</i>] となる。ここで，<i class="italic-tnr" style="margin-left:0">n<sub>1</sub></i>は連続信号に重畳する雑音，<i class="italic-tnr" style="margin-left:0">n<sub>2</sub></i>は空間方向量子化器に作用する雑音であり，<i class="italic-tnr" style="margin-left:0">n<sub>3</sub></i>は特に意味を持たない。取得信号<i class="italic-tnr" style="margin-right:2px">Y</i>[<i class="italic-tnr" style="margin:2px">k</i>] はデジタルフィルタ<i class="italic-tnr">F</i>を通して取得信号<i class="italic-tnr" style="margin-right:2px">y</i>[<i class="italic-tnr" style="margin:2px">k</i>] となる。
        DACの量子化器は，ホールドされた離散信号<i class="italic-tnr" style="margin-right:2px">x</i>(<i class="italic-tnr" style="margin:2px">t</i>) が時間方向のサンプラを介して離散信号<i class="italic-tnr" style="margin-right:2px">X</i>[<i class="italic-tnr" style="margin:2px">k</i>] となり，空間方向サンプラを介して出力信号<i class="italic-tnr" style="margin-right:2px">Y</i>[<i class="italic-tnr" style="margin:2px">k</i>] となる。ここで，<i class="italic-tnr" style="margin-left:0">n<sub>1</sub></i>は特に意味を持たず，<i class="italic-tnr" style="margin-left:0">n<sub>2</sub></i>は空間方向量子化器に作用する雑音であり，<i class="italic-tnr" style="margin-left:0">n<sub>3</sub></i>は出力段に重畳する雑音を表す。DACでは離散信号<i class="italic-tnr" style="margin-right:2px">Y</i>[<i class="italic-tnr" style="margin:2px">k</i>] がホールドされて連続信号となり，アナログフィルタ<i class="italic-tnr">F</i>を通して出力信号<i class="italic-tnr" style="margin-right:2px">y</i>(<i class="italic-tnr" style="margin:2px">t</i>) となる。
      </p>
      <p>
        図中の変調器は量子化器の動作に対して連続信号<i class="italic-tnr" style="margin-right:2px">x</i>(<i class="italic-tnr" style="margin:2px">t</i>) と離散信号<i class="italic-tnr" style="margin-right:2px">Y</i>[<i class="italic-tnr" style="margin:2px">k</i>] の信号的特性を等しく保つように動作する。量子化器は変調器の特性によって静的量子化器と動的量子化器に分類される。静的量子化器は空間量子化器の出力が現時刻の入力のみに決定される量子化器であり，動的量子化器は空間量子化器の出力が過去から現時までの入力に決定される量子化器である。代表的な静的量子化器として逐次比較型変換器，動的量子化器として&Delta;&Sigma;変調器が挙げられる。一般的な動的量子化器は次に示されるフィルタ<i class="italic-tnr">Q<sub>f</sub></i>を持つ。
        <vue-mathjax :formula="f_Qf" />
        ただし，<i class="italic-tnr">z</i>はシフトオペレータ，<i class="italic-tnr">L</i>は同的量子化器の次数を表す。静的量子化器は次数0の動的量子化器として表現可能であるため，動的量子化器を用いて量子化特性の一般化表現を行う。ここで，量子化器の入出力は次のように表される。
        <vue-mathjax :formula="f_Quantizer" />
        ただし，<i class="italic-tnr" style="margin-left:0">q<sub>s</sub></i>は空間量子化に起因する誤差とする。空間量子化幅を<i class="italic-tnr" style="margin-left:0">q<sub>sr</sub></i>とし，空間量子化誤差が一様分布を取ると仮定すると，空間量子化誤差の電力は次のように計算される。また，空間量子化雑音は白色性を有するものとする。
        <vue-mathjax :formula="f_sq_power" />
        ここで，<i class="italic-tnr" style="margin-left:0">n<sub>2</sub></i>の電力を<i class="italic-tnr">P<sub>n2</sub></i>とすると，量子化器に重畳する雑音電力は次のように表される。
        <vue-mathjax :formula="f_q_power" />
        また，空間量子化器に重畳する雑音が白色性を有する場合には，サンプリング時間を<i class="italic-tnr">T<sub>s</sub></i>，ナイキスト周波数を<i class="italic-tnr">f<sub>N</sub></i>として，周波数成分<i class="italic-tnr">f</i>の電力を表すパワースペクトル密度<i class="italic-tnr" style="margin-right:2px">&Phi;<sub>N</sub></i>(<i class="italic-tnr" style="margin:2px">f</i>)は次のように計算される。
        <vue-mathjax :formula="f_q_power_spectrum_density" />
        ここで，雑音電力は変調器の動作によって次のように変化する。
        <vue-mathjax :formula="f_q_power_spectrum_density2" />
        ただし，&ast;は複素共役を表す。ここで，制御帯域を[0,<i class="italic-tnr">f<sub>c</sub></i>]とすると，制御帯域内雑音電力は次のようになる。
        <vue-mathjax :formula="f_c_power" />
        ここで，サンプリング周波数を<i class="italic-tnr">f<sub>s</sub></i>とすると，マクローリン展開により以下の式を得る。
        <vue-mathjax :formula="f_c_power2a" />
        <vue-mathjax :formula="f_c_power2b" />
        デジベル表記に変換すると，次のようになる。
        <vue-mathjax :formula="f_c_power_log" />
        以上より，空間量子化器に重畳する雑音が空間量子化幅と比較して十分小さい場合に，空間量子化幅を半分にすることで雑音電力が6.02 dB減少する。一方で，サンプリング周波数を2倍にすることで，雑音電力が3.01(2L+1) db減少する。時間分解能の向上によって雑音パワースペクトル密度を低減する技術はオーバーサンプリングと呼ばれる。線形制御系では重ね合わせの原理が成立するため，雑音低減の目的は雑音電力全体の低減ではなく，パワースペクトル密度を低減することと言い換えることができる。その点では，高分解能空間量子化器の使用やオーバーサンプリングは雑音低減に効果的である。
      </p>

       <h3> 変調特性の実験実証</h3>
       <p>
         上述の理論値を実証するために，空間方向の分解能と時間方向の分解能が制御系に混入する雑音量に与える影響を実験的に調査した。
       </p>
       <p>
         はじめに，空間分解能が雑音電力に与える影響を測定した。ここでは，ファンクションジェネレータで振幅5 V，周波数1 Hzの電圧を発生し，サンプリング周波数1 kHzの16-bit 逐次比較型AD変換器を使用して電圧を測定した。粗分解能AD変換器はAD変換器の出力の下位ビットを切り捨てることで模擬した。また，外因性雑音存在下における空間分解能の向上による雑音低減能力を調査するために，AD変換器は敢えて雑音が重畳しやすい環境に設置した。左図はAD変換器の出力の時間波形，右図は量子化誤差の電力を表す。空間分解能の増加に関して，8 bitまでは6 dBの電力低下が確認されたが，それ以降は電力の低下が確認されなかった。前半の結果は雑音低減に関する理論値と近い値となっており，後半の結果は外因性雑音による雑音電力低下の阻害を表している。これは，外因性雑音が空間量子化器の入力に重畳しているため，量子化器が真の入力<i class="italic-tnr" style="margin-right:2px">X</i>[<i class="italic-tnr" style="margin:2px">k</i>] と外因性雑音を区別することができないためと考えられる。
       </p>
       <div class="pic-container">
         <img src="@/pic/computer1/resolution_spatial_input.png" class="pic-resolution_spatial_input">
       </div>
       <p>
         次に，時間分解能が雑音電力に与える影響を測定した。下図に示すように，FPGAを搭載したボード，3相窒化ガリウム高電子移動度トランジスタ (GaN-HEMT)インバータを搭載したボード，18-bit 逐次比較型AD変換器を搭載したボードの3枚を用意した。FPGAを使用して2枚のボードを制御し，各ボードの動作周波数を変更しながら電圧出力および電圧取得を行う。
       </p>
       <div class="pic-container">
         <img src="@/pic/computer1/resolution_setup.jpg" class="pic-resolution_setup">
       </div>
       <p>
          まず，ファンクションジェネレータを用いて振幅1 V, 周波数100 Hzの正弦波を発生し，AD変換器のサンプリング周波数を25 kHz, 50 kHz, 100 kHzと設定して電圧を取得した。左図は取得電圧の時間波形，右図は取得電圧の周波数応答を表す。サンプリング周波数を25 kHzから50 kHzに変更した際の雑音電力低下は3.10 dB, 50 kHzから100 kHzに変更した際の雑音電力低下は2.99 dBとなった。これは，静的量子化器の雑音低減に関する理論値と近い値となった。
       </p>
       <div class="pic-container">
         <img src="@/pic/computer1/resolution_time_input.png" class="pic-resolution_time_input">
       </div>
       <p>
         続いて，単相インバータの出力に100 &Omega;の抵抗負荷を接続し，AD変換器のサンプリング周波数を200 kHzとして出力電圧を測定した。DC-Link電圧は16 Vとし，出力目標電圧は振幅4 V，周波数100 Hzの正弦波とした。変調器として，2次&Delta;&Sigma;変調器をFPGA上に設置した。ここで，インバータのデッドタイムを100 ns，スイッチング周波数を25 kHz, 50 kHz, 100 kHzと設定して駆動した。左図は抵抗負荷に印加された矩形波電圧に対して遮断周波数160 Hzの一次IIR低域通過フィルタを通した電圧の時間波形，右図は矩形波電圧の周波数応答を表す。スイッチング周波数を2倍にした際に，周波数応答のスロープに15 dB程度の減少が確認された。これは，2次動的量子化器の雑音低減に関する理論値と近い値となった。
       </p>
       <div class="pic-container">
         <img src="@/pic/computer1/resolution_time_output.png" class="pic-resolution_time_output">
       </div>
       <p>
         以上より，導出した理論式は実験的に実証することができた。高分解能変換器の使用による雑音低減効果は外因性雑音の影響を受けるが，オーバーサンプリングによる雑音低減効果は他の影響を受けない。そのため，高速計算機を使用して制御系を実装することで，雑音の影響を受けにくい制御系が構築可能となる。この雑音低減能力は制御系の制約，特に2自由度制御系におけるトレードオフの緩和に貢献するため，制御性能の向上に繋がる。
       </p>

      <h2 class="research-subtitle"> 零次ホールドによる制約 </h2>

      <p>
        計算機の制御出力は零次ホールダを介して連続信号となる。零次ホールドは振幅特性および位相特性を劣化する要因となり，制御系における制約となる。そこで，時間分解能と零次ホールドの入出力周波数特性の関係を導出する。零次ホールダのブロック線図および動作は次のよう表される。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer1/bus_zoh.png" class="pic-bus_zoh">
      </div>
      <p>
        ここで，サンプリング周期を<i class="italic-tnr" style="margin-right:2px">T<sub>s</sub></i>とすると，入出力関係は次のようになる。
        <vue-mathjax :formula="f_zoh_fr1" />
        そして，ディラックのデルタ関数<i class="italic-tnr">&delta;</i>を導入すると，次のように表現できる。
        <vue-mathjax :formula="f_zoh_fr2" />
        また，ディラックのデルタ関数の集合は周期信号であるため，フーリエ級数を用いて次のように表現できる。
        <vue-mathjax :formula="f_delta" />
        これにより，入出力関係は次のように表される。
        <vue-mathjax :formula="f_zoh_fr3" />
        ただし，<i class="italic-tnr" style="margin-right:2px">U</i>(<i class="italic-tnr" style="margin:2px">s</i>)は<i class="italic-tnr" style="margin-right:2px">u</i>(<i class="italic-tnr" style="margin:2px">t</i>)のラプラス変換を表す。上式はさらに簡略化可能である。
        <vue-mathjax :formula="f_zoh_fr4" />
        この式において，第一項のsinc関数は振幅特性，第二項の時間遅れは位相特性に影響する。以下にsinc関数の振幅特性を示す。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer1/bus_aperture.png" class="pic-bus_aperture">
      </div>
      <p>
        遮断周波数はサンプリング周波数の44.3 %，ナイキスト周波数の88.6 %となる。この減衰効果はアパーチャ効果と呼ばれる。広帯域制御を実現するためには，アパーチャ効果の影響を考慮して制御系の高速化を行う必要がある。
      </p>

      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/computer1/background">
            > 計算機設計の背景
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/computer1/advantage">
            > 専用計算機を使用した制御系設計
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

        f_Qf: "$$ \\begin{eqnarray} Q_{\\rm f}(z)=1-\\left(1-z^{-1}\\right)^{\\rm L}\\end{eqnarray} $$",

        f_Quantizer: "$$ \\begin{eqnarray} Y[k]&=&X[k]+q-Q_{\\rm f}q=X[k]+(1-Q_{\\rm f})q \\\\ &=&X[k]+H(z)q \\\\ (q&\\triangleq&q_{\\rm s}+n_{2},\\ \\ H(z)=1-Q_{\\rm f}(z)) \\end{eqnarray} $$",

        f_sq_power: "$$ \\begin{eqnarray} P_{\\rm qs}&=&\\frac{1}{T}\\int^{T/2}_{-T/2} \\left(\\frac{q_{\\rm sr}}{T}t\\right)^2dt=\\frac{q_{\\rm sr}^2}{12} \\end{eqnarray} $$",

        f_q_power: "$$ \\begin{eqnarray} P_{\\rm N}&=&P_{\\rm n2}+P_{\\rm qs} \\end{eqnarray} $$",

        f_q_power_spectrum_density: "$$ \\begin{eqnarray} \\Phi_{\\rm N}(f)&=&f_{\\rm n}^{-1}P_{\\rm N}\\\\ f_{\\rm n}&=&(2T_{\\rm s})^{-1} \\end{eqnarray} $$",

        f_q_power_spectrum_density2: "$$ \\begin{eqnarray} \\Phi_{\\rm s}(f)&=&H(z)H^{\\ast}(z)\\Phi_{\\rm N}(f) \\end{eqnarray} $$",

        f_c_power: "$$ \\begin{eqnarray} P_{\\rm c}&=&\\int^{f_{\\rm c}}_{0}\\Phi_{\\rm s}(f)df=\\int^{f_{\\rm c}}_{0} H(z)H^{\\ast}(z)\\Phi_{\\rm N}(f) df \\\\ &=&\\left(\\int^{f_{\\rm c}}_{0} H(z)H^{\\ast}(z)df\\right)\\Phi_{\\rm N}(f) \\end{eqnarray} $$",

        f_c_power2a: "$$ \\begin{eqnarray} f_{\\rm s}&=&T_{\\rm s}^{-1}=2f_{\\rm N} \\\\ z&=&e^{-sT_{\\rm s}}=e^{-j2\\pi f/f_{\\rm s}} \\end{eqnarray} $$",

        f_c_power2b: "$$ \\begin{eqnarray} \\int^{f_{\\rm c}}_{0} H(z)H^{\\ast}(z)df &=& \\int^{f_{\\rm c}}_{0} 4^{\\rm L}\\sin^{\\rm 2L}\\left(\\frac{f}{f_{\\rm s}}\\pi\\right) df = f_{\\rm s}\\frac{(2\\pi)^{2{\\rm L}}}{2{\\rm L}+1}\\left(\\frac{f_{\\rm c}}{f_{\\rm s}}\\right)^{2{\\rm L}+1} \\\\[8pt] \\therefore P_{\\rm c}&=&f_{\\rm s}\\frac{(2\\pi)^{2{\\rm L}}}{2{\\rm L}+1}\\left(\\frac{f_{\\rm c}}{f_{\\rm s}}\\right)^{2{\\rm L}+1} f_{\\rm N}^{-1}P_{\\rm N} = \\frac{2(2\\pi)^{2{\\rm L}}}{2{\\rm L}+1}\\left(\\frac{f_{\\rm c}}{f_{\\rm s}}\\right)^{2{\\rm L}+1}P_{\\rm N} \\\\[8pt] &=& \\frac{2(2\\pi)^{2{\\rm L}}}{2{\\rm L}+1}\\left(\\frac{f_{\\rm c}}{f_{\\rm s}}\\right)^{2{\\rm L}+1}\\left(P_{\\rm n2}+P_{\\rm qs}\\right) \\\\[8pt] &=& \\frac{2(2\\pi)^{2{\\rm L}}}{2{\\rm L}+1}\\left(\\frac{f_{\\rm c}}{f_{\\rm s}}\\right)^{2{\\rm L}+1}\\left(P_{\\rm n2}+\\frac{q_{\\rm qs}^2}{12}\\right) \\end{eqnarray} $$",

        f_c_power_log: "$$ \\begin{eqnarray} P_{\\rm s}&=&10\\log_{10}\\left(q_{\\rm sr}^2+12P_{\\rm n2}\\right) + 15.96{\\rm L} - 10\\log_{10}(2{\\rm L}+1) - (2{\\rm L}+1)\\log_{10}K -7.78\\ {\\rm [dB]} \\\\ &\\approx& 20\\log_{10}q_{\\rm sr} + 15.96{\\rm L} - 10\\log_{10}(2{\\rm L}+1) - (2{\\rm L}+1)\\log_{10}K -7.78\\ {\\rm [dB]}\\ \\  ({\\rm when}\\ q_{\\rm sr}^2\\gg P_{\\rm n2}) \\\\[5pt] &&\\left(K\\triangleq\\frac{f_{\\rm s}}{f_{\\rm c}}\\right)\\end{eqnarray} $$",

        f_zoh_fr1: "$$ \\begin{eqnarray} Y(s)=\\sum^{\\infty}_{k=0}u(kT_{\\rm s})\\left(\\frac{1}{s}e^{-skT_{\\rm s}}-\\frac{1}{s}e^{-s(k+1)T_{\\rm s}}\\right)\\end{eqnarray} $$",

        f_zoh_fr2: "$$ \\begin{eqnarray} Y(s)=\\frac{1-e^{-sT_{\\rm s}}}{s}\\int^{\\infty}_{0}\\left(\\sum^{\\infty}_{k=-\\infty}\\delta(t-kT_{\\rm s})u(t)\\right)e^{-st}dt \\end{eqnarray} $$",

        f_delta: "$$ \\begin{eqnarray} &&\\sum^{\\infty}_{k=-\\infty}\\delta(t-kT_{\\rm s})=\\sum^{\\infty}_{k=-\\infty}C_ke^{jk2\\pi t/ T_{\\rm s}}\\\\ &&C_k=\\frac{1}{T_{\\rm s}}\\int^{T_{\\rm s}/2}_{-T_{\\rm s}/2}\\sum^{\\infty}_{k=-\\infty}\\delta(t-kT_{\\rm s})e^{-jk2\\pi t/ T_{\\rm s}}dt=\\frac{1}{T_{\\rm s}} \\\\ \\therefore && \\sum^{\\infty}_{k=-\\infty}\\delta(t-kT_{\\rm s})=\\sum^{\\infty}_{k=-\\infty}\\frac{1}{T_{\\rm s}}e^{jk2\\pi t/ T_{\\rm s}}\\end{eqnarray} $$",

        f_zoh_fr3: "$$ \\begin{eqnarray} Y(s)&=&\\frac{1-e^{-sT_{\\rm s}}}{s}\\int^{\\infty}_{0}\\left(\\frac{1}{T_{\\rm s}}\\sum^{\\infty}_{k=-\\infty}e^{jk2\\pi t/ T_{\\rm s}}u(t)\\right)e^{-st}dt	\\\\ &=&\\frac{1-e^{-sT_{\\rm s}}}{sT_{\\rm s}}\\sum^{\\infty}_{k=-\\infty}\\int^{\\infty}_{0}u(t)e^{-(s-jk2\\pi/ T_{\\rm s})t}dt \\\\&=&\\frac{1-e^{-sT_{\\rm s}}}{sT_{\\rm s}}\\sum^{\\infty}_{k=-\\infty}U(j(\\omega-k\\omega_{\\rm s}))\\end{eqnarray} $$",

        f_zoh_fr4: "$$ \\begin{eqnarray} Y(s)&=&\\frac{1}{sT_{\\rm s}}\\frac{e^{sT_{\\rm s}/2}-e^{-sT_{\\rm s}/2}}{e^{sT_{\\rm s}/2}}\\sum^{\\infty}_{k=-\\infty}U(j(\\omega-k\\omega_{\\rm s}))	\\\\&=&\\frac{\\sin\\left(\\frac{\\omega T_{\\rm s}}{2}\\right)}{\\left(\\frac{\\omega T_{\\rm s}}{2}\\right)}e^{-sT_{\\rm s}/2}\\sum^{\\infty}_{k=-\\infty}U(j(\\omega-k\\omega_{\\rm s}))	\\\\&=&{\\rm sinc}\\left(\\frac{\\pi f}{f_{\\rm s}}\\right)e^{-sT_{\\rm s}/2}\\sum^{\\infty}_{k=-\\infty}U(j(\\omega-k\\omega_{\\rm s}))\\end{eqnarray} $$",

      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.pic-quantizer{
  width:90%;
  max-width:600px;
  margin:10px;
}
.pic-resolution_setup{
  border-radius: 8px;
  width:90%;
  max-width:380px;
  margin:10px;
}
.pic-resolution_spatial_input{
  width:90%;
  max-width:700px;
  margin:10px;
}
.pic-resolution_time_input{
  width:90%;
  max-width:700px;
  margin:10px;
}
.pic-resolution_time_output{
  width:90%;
  max-width:700px;
  margin:10px;
}
.pic-bus_zoh{
  width:90%;
  max-width:550px;
  margin:10px;
}
.pic-bus_aperture{
  width:90%;
  max-width:400px;
  margin:10px 0 0;
}
@media screen and (max-width: 640px){
  .pic-resolution_setup{
    border-radius: 8px;
    width:75%;
    max-width:380px;
    margin:10px;
  }
  .pic-bus_aperture{
    width:75%;
    margin:10px 0 0;
  }
}
</style>
