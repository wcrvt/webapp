<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 計算機設計の背景 </h1>
      <p>
        計算機は制御系の性能と機能を決定する要素となる。多品種少量生産の需要が増大し，サーボ機構を用いた汎用的な製造ラインの設計と高速化が求められている。少子高齢化に伴う労働力減少や，災害時の作業力の確保を目的として，人間の作業を代替するロボットの需要も高まっている。加えて，情報技術とデータサイエンスの高度化に伴い，機械が情報ネットワークの一部として機能することが求められており，計算機が各種機器間との通信機能を有することが必須となっている。また，機械と人間の相互通信を可能とするインタフェース (Human Machine Interface: HMI) の拡充も必須となっている。このように計算機への要求が増加する一方で，計算機も万能ではなく，複数の計算機を組み合わせて設置することで対処する例が見受けられる。近年では制御器の実装可能性の確保やサービス拡充に必要な計算機を導入すること自体が複雑化しており，システムの機能拡充における課題となっている。
      </p>

      <h2 class="research-subtitle"> 導入における課題 </h2>
      <p>
          ロボットシステム設計における計算機への要望は，ロボット制御演算のためのリアルタイム処理とHMI拡充のためのアプリケーション処理に分けられる。計算機の機能の冗長性と処理時間にはトレードオフがあり，全ての処理を単一の計算機で行うことは難しい。CPUは汎用的な用途に使用可能だが，特定用途の高速化が難しい。GPUはベクトル演算が得意だが，汎用的な用途における使用はできない。更に言えば，単一の処理のみを行う回路は，汎用性は非常に低いが非常に高い性能を提供する。トレードオフは計算機制御システムにも存在し，短時間周期処理を行うための軽量OSや，アプリケーション処理を得意とする汎用OSが存在する。また，回路構造にも様々な種類があり，高応答性のリアルタイム処理に適したリアルタイムプロセッサや，機能性に優れたアプリケーションプロセッサなどの製品が存在する。加えて，CPUに制御系構築に必要な周辺機器を備え付けたマイクロコントローラユニット(MCU) などの製品も存在する。様々な種類のチップが存在するが，それぞれのプロセッサの得手不得手から，単一のプロセッサを用いて全ての要求に応えることは難しい。これに対し，異なる種類のプロセッサから構成される計算機で演算を行うことで，処理の高速化を達成する手段が採用されている (ヘテロジニアス・コンピューティング) 。ただし，マルチチップシステムの設計，各チップの製品管理，チップ間通信などを行う必要があり，導入の敷居が高い。また，製品化されたチップが制御系構築における要求を必ずしも十分に満たすことはなく，性能面や機能面での妥協せざるを得ない場合がある。使用可能な周辺機器の制約から，チップを採用できないといった例もある。モータドライブのようにベクトル制御を主な目的としたアプリケーションでは用途特化型のMCUが広く使用されてきたが，運動制御は上記分野と比較して使用用途が多岐に渡り，様々な制御系構成を取り得ることから，MCUがそのまま使用できるといったケースは多くない。計算機の使用目的が多様化する現在では，チップベンダーも全ての要求に応えることはできず，要求を満たす計算機の選定は難しい問題となっている。
      </p>

      <h2 class="research-subtitle"> 使用における課題 </h2>
      <p>
        評価ボードを使用して簡易的に性能評価を行う場合にも，計算機の性能を十分に引き出すことは難しい。これまでに制御理論は発展を続けているが，実際に活用されている技術は多くない。高機能な運動制御の実現には滑らかな運動の実現が不可欠であり，制御工学の観点からは制御帯域の確保が重要となるが，そのためには短時間周期の制御が必要となる。一方で，制御アルゴリズムも複雑化しているため，処理時間を短縮することが難しい。制御系において独立したブロックを並列に動作させるマルチレート制御系を構築する手法も挙げられるが，汎用CPUにおいてマルチレート系を構築することは時間管理やリソース管理の観点から難しい。リアルタイム性の確保に際しては，汎用OSを使用した際にはHMIの拡充は容易だが，ソフトリアルタイム性の確保に止まり，短時間周期処理ではデッドラインミスが多発する。リアルタイムOSを使用した場合には，デッドラインミスを防ぐことは可能となるが，エコシステムの不足からアプリケーション処理の実行が難しい。近年ではマルチコアCPUが普及しており，非対称マルチプロセッシング(Asymmetric Multi-Processing: AMP) と呼ばれる技術を用いてコアごとにリアルタイムOSや汎用OSを割り当てる方法もあるが，導入コストは非常に高い。計算機の処理能力の向上を待つにしても，短時間処理に適したプロセッサが今後開発される保証もなく，プロセッサの性能を十分に引き出すための学習コストも低いとは言えない。プロセッサはその時代の需要に沿って設計されるため，制御技術の需要が高まれば開発の見込みはあるが，制御理論に精通する技術者の少なさからあまり期待できない。プロセッサの構造を熟知した技術者であれば処理時間の短縮を実現できることが可能であると予想されるが，制御理論に精通し，制御アルゴリズムに理解のある技術者は限定される。実際問題として，短時間処理が可能な計算機を使用することが難しく，制御理論の再現実験自体が難しいという状況にある。
      </p>

      <h2 class="research-subtitle"> 理論と実践の乖離 </h2>
      <p>
        産業現場では数 msの制御周期で制御演算を行う機械が多く存在する。一方で，学術研究においては「サーボによる付加価値の向上」を一つの目標と定めており，費用を度外視して高性能計算機を使用した環境が整えられることがある。また，精密制御機器では高性能計算機が使用されており，ガルバノスキャナの制御では制御周期20 &micro;sを実現するDSPが使用されている例もある。汎用的な産業用計算機では，オムロン株式会社のPower PMACが10 &micro;s程度の制御周期を達成したと報告されている。制御アルゴリズムの研究に使用されている計算機と産業で使用されている計算機の性能に大きな乖離があるため，最先端の制御アルゴリズムの実装は容易ではない。実際の制御系設計では使用する計算機があらかじめ決定されており，その上で制御性能を確保することが設計者の課題となる場合があるが，制御系の実装可能性は計算機性能に強く依存するため，計算機性能の不足は致命的な問題となる。
      </p>

      <h2 class="research-subtitle"> 要求性能の複雑性 </h2>
      <p>
        広帯域制御を実現するために短い制御周期を持つことは非常に重要であるが，制御系の機能を拡充するためには制御系への指令値生成を同時に行う必要がある。指令値生成はシステムの内部状態や外界状況を考慮するなど複雑な計算を伴うことが多く，短時間で処理を行うことが難しい。つまり，制御系には可能な限り高速に動作させて制御性能を確保するシステムと，計算時間に余裕を持たせて機能性を確保するシステムが要求される。人間のモータコントロール機構では，審議的な脳と高応答性の脊髄が運動制御に関わっており，運動制御のための計算機はマルチレート制御系を構築可能である必要があると考えられる。このようなマルチレート制御系を汎用プロセッサを用いて実現することは，計算機に精通した技術者でなければ難しい。また，既存のプロセッサは多軸制御や複雑なアルゴリズムを実装した際には処理時間が増加するため，制御周期を短く保つことは難しいといった問題も存在する。サーボ機械の機能を決定する動作自由度はモータ軸数に依存するため，並列計算技術の導入も要求される。
      </p>

      <h1 class="research-title"> 計算機の設計指針 </h1>
      <p>
        高度な制御技術やユーザフレンドリーなHMIの実装には次の課題を解決する必要があると考える。
        <ul>
          <li> 導入における課題：ヘテロジニアスコンピューティング環境の整備</li>
          <li> 使用における課題：マルチレート/リアルタイムシステムの設計 </li>
          <li> 理論と実践の乖離：高速演算の実現</li>
          <li> 要求性能の複雑性：マルチレート/ヘテロジニアスコンピューティング環境の整備 </li>
        </ul>
        表面的には計算機科学に精通する技術者がいれば特に問題ではないように思われるが，高速演算回路の設計にはその分野に精通した技術者の知識が必要であり，制御理論にも精通している技術者の数は非常に少数となることが予想される。演算速度と汎用性はトレードオフの関係にあるので，真に高速化する必要がある回路を見極めなければならない。これは制御理論に基づいて判断するべき事項であり，計算機のタスク分割方針について検討しなければならない。
      </p>

      <h2 class="research-subtitle"> 環境整備について </h2>
      <p>
        簡単にヘテロジニアス環境を構築するための方法として，整備されたSystem-on-a-Chip (SoC) を使用することが挙げられる。ここではField Programmable Gate Array (FPGA) とARMプロセッサを1枚のチップに搭載した製品，Intel (旧Altera) ではSoC FPGA, XilinxではProgrammable SoC (PSoC)などと呼ばれている製品の使用を想定する。産業機械の制御では，1990年代前半からMCUの導入が進み，次第にモータベンダの提供するProgrammable Logic Controller (PLC) やComplex Plogrammable Logic Device (CPLD) が使用されるようになった。モータベンダの制御ユニットはモータドライバとの連携が容易であるという利点があり，モータドライブシステム一式を一括管理できるため広く普及した。モータドライブシステム間の通信インタフェースも整備されており，連携が容易であるという利点もあった。ただし，モータベンダが独自の通信プロトコルを持つため他社デバイスとの通信が難しいこと，制御ユニットに付属の周辺機器の制約からIoT化が難しいこと，独自OSのエコシステムの成長がLinuxに見劣りするなど，HMIの向上に難があった。そのため，モータドライブシステム系統とは別にデータロガーおよび通信ネットワークを整備する方策も取られた。また，MCUを用いた場合の方が制御性能の確保が容易であったという例もあり，MCUの利用に切り替える動きも見られた。IoT化に対応するMCUを構成するにあたり，PSoCの導入が選択されている。
      </p>
      <p>
        PSoCはプロセッサとFPGAがワンチップに統合されているため，即座にヘテロジニアスコンピューティングが可能となる。Xilinx社のZynq UltraScale+ MPSoCはプロセッサとしてアプリケーションプロセッサ(Cortex-A53) とリアルタイムプロセッサ(Cortex-R5) を搭載しており，自動運転のような車載用途への応用が期待される。また，プロセッサとFPGAが密接に設計されているため容易に通信することができる。加えて，IntelはIndustry4.0に対応可能な通信環境を整備したSoC FPGAベースのPLCを設計している。SoC FPGAやPSoCを使用することで，環境整備の難度は緩和される。
      </p>

      <h2 class="research-subtitle"> マルチレート/リアルタイムシステムの設計について </h2>
      <p>
        制御システムの機能拡充のためには，滑らかな動作を可能にする広帯域制御と機能性を確保する指令値生成の柔軟性を両立する必要がある。AMP技術を用いて両者をプロセッサ上で並列動作させることも可能ではあるが，動作の安定性を考慮した際に，広帯域制御の実現はFPGAで実現した方が都合が良い。また，FPGAに実装する回路はプリミティブなものであれば互換性が高く，管理および整備はAMP環境の整備と比較して非常に簡単であり，保守性が高い。FPGAは原理上プロセッサと比較して低いクロック周波数で動作するが，高い時間管理能力を有する。FPGA上の回路は動作タイミングの揺らぎ (ジッタ) が非常に小さく，制御周期を厳密に守ることができる。非一様サンプリングは制御信号の歪みに繋がるため，信号処理の観点から大きな利点となる。また，FPGAは入力信号に対して応答性が高く，処理時間が確定的であるため，制御周期が短い場合にもデッドタイムミスが発生しない。演算処理のパイプライン化も容易に実現可能であり，多軸制御への対応も可能である。デジタル信号処理器は動作速度が雑音処理能力に直結するが，FPGA上では独立して動作する信号処理器を設計可能であるため，高い雑音処理能力を得ることができる。
      </p>
      <p>
        FPGA上に制御器を置くことは大きな利点があるように見えるが，実際にはFPGA上の回路設計はソフトウェアプログラムの設計と比較して非常に時間が掛かり，修正も容易ではない等，汎用性の面ではプロセッサに劣る。運動制御の用途は多岐に渡るため様々な制御器アーキテクチャが提案されており，制御対象ごとにアーキテクチャを変更することもあるため，一見するとFPGAの使用は好ましくない。これを解決するためには，制御理論に基づいて汎用的な制御アーキテクチャを見極め，FPGAに実装する必要がある。
      </p>

      <h2 class="research-subtitle"> 高速演算の実現について </h2>
      <p>
        制御演算の高速化に関してFPGAは大きく貢献する。制御理論ではナイキスト線図を用いた性能評価に代表されるように，一巡伝達関数を用いた性能解析が行われる。信号の一巡伝達に関する位相遅れが性能に直結するため，ループを構成する部品の処理時間を短くすることが望ましい。また，位相遅れが変化しないのであれば，どのような処理を行っても性能が劣化することはない。ここで重要なのは，計算機上の演算全てが1つの制御周期で管理される必要はなく，独立可能な部分があれば並列動作をさせることが可能という点である。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer1/controller_modules.png" class="pic-controller_modules">
      </div>
      <p>
        系全体を見れば，制御系では制御器，モータドライブシステム，センサは独立した制御周期を持って動作している。計算機上の制御器，観測器などは同じ制御周期を持つ必要はなく，各自が独自の制御周期を持って動作した場合にも一巡伝達関数の位相遅れに大きな変化はない。更に言えば，信号処理系のフィルタは低次システムに分解した後に連結しても構わない。計算機上の計算は，結局はフィルタの集合であるため，分割して実装することができる。また，代数学の基本定理から，全ての複素関数は一次式の冪積によって表現可能であり，計算機上で実装可能な形式に限定すると一次および二次の冪積によって表現可能である。
      </p>
      <div class="pic-container">
        <img src="@/pic/computer1/process_divide.png" class="pic-process_divide">
      </div>
      <p>
        そのため，一次および二次のフィルタを連結することで，制御演算を達成することができる。このような複数ブロックが独立して動作するシステムの実装は，設計自由度の高いFPGAを使用すれば容易に実現できる。この実装の利点は，演算回路の動作周波数の向上が可能であり，高い信号処理能力を獲得できる点にある。また，この実装方法は複雑なフィルタの実装を回避することにも繋がり，制御系設計を簡潔にする。
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
          <router-link class="article-link-f" to="/research/articles/computer1/constraints">
          > 計算機性能に起因する制約
          </router-link>
        </li>
      </ul>

    </div>
  </body>
</template>

<script>
</script>

<style scoped>
body{
  background: #fff;
}

.pic-process_divide{
  width:90%;
  max-width:400px;
  margin:10px;
}
.pic-controller_modules{
  width:90%;
  max-width:530px;
  margin:10px;
}
</style>
