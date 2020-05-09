<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 3軸冗長マニピュレータの位置制御 </h1>

      <p>
        ここではマニピュレータに冗長自由度が存在する際の制御方法について説明し，シミュレーションを作成する。冗長自由度とは，目標タスクの実現に必要な自由度とは別の，任意のタスクを割り当てることが可能な融通の効く自由度を表す。冗長自由度によって機械の作業姿勢に幅を持たせることができ，接触時の安全性の確保や障害物回避などが可能となる。本項では作業空間の制御と冗長自由度の制御を両立する方法について説明する。
      </p>

      <h2 class="research-subtitle"> 冗長マニピュレータ </h2>
      <p>
        ここでは前項の2軸マニピュレータの先端に回転モータとアームが取り付けられたマニピュレータを扱う。
      </p>
      <div class="pic-container">
        <img src="@/pic/tutorial/manipulator2.png" class="pic-manipulator2">
      </div>
      <p>
        マニピュレータの先端位置を制御対象とした場合，運動学とヤコビ行列は次のようになる。
        <vue-mathjax :formula="f_kinematics" />
        ここで，ヤコビ行列の逆行列は存在しない。以下の行列方程式を連立方程式と見た時，方程式の数 (行数) が不足しているため，関節角度を一意に求めることができない。つまり，任意の先端速度に対して，それを実現する関節速度が無数に存在する。
        <vue-mathjax :formula="f_veleq" />
        これにより任意の姿勢を取れることになるが，冗長自由度の設計など，制御系設計が難しくなる。冗長でないマニピュレータの制御ではヤコビ行列の逆行列を使用して作業空間の加速度制御系を構築できたが，冗長マニピュレータの制御では別途工夫が必要となる。エンドエフェクタが水平となるようにマニピュレータの第二関節角度を制御するなど，制御目標を1つ追加すれば冗長性を排除することもできるが，今回は冗長性を利用した制御系の設計について説明する。
      </p>

      <h3 class="research-subsubtitle"> 設計方針 </h3>
      <p>
        本項では，作業空間の制御に最低限必要な入力と，冗長自由度の制御に必要な入力を独立に設計し，作業空間の制御と冗長自由度の制御を独立に達成する手法について説明する。また，作業空間では加速度制御系が達成されることを保証する。ここでは一般逆行列を用いた手法を取り扱う。
      </p>

      <h2 class="research-subtitle"> 一般逆行列問題 </h2>
      <p>
        以下の方程式において，行列<i class="italic-tnr">A</i>およびベクトル<i class="italic-tnr">y</i>が既知の状況からベクトル<i class="italic-tnr">x</i>を決定する問題を考える。
        <vue-mathjax :formula="f_inv_def" />
        ここで，行列<i class="italic-tnr">A</i>の列が行より多い場合，ベクトル<i class="italic-tnr">x</i>は複数の解を取りうるため，一意に求まらない。冗長マニピュレータの例では，先端位置が決まっても関節角度の組み合わせは無数にあることに相当する。そこで，ノルムが最小化となる解を代表値として取り出す。
        <vue-mathjax :formula="f_inv_targ" />
        最小化目標関数は凸関数であるため，極値を発見することで最小値を取る。そこで，Lagrangeの未定定数法を用いて以下の解を得る。
        <vue-mathjax :formula="f_lagrange" />
        ここで，最小ノルムの解を与える行列を擬似逆行列と定義する。
        <vue-mathjax :formula="f_general_inv" />
        そして，ベクトル<i class="italic-tnr">x</i>の一般解は，最小ノルム要素を示す基本解と冗長性を示す特殊解の和によって表現される。
        <vue-mathjax :formula="f_general_sol" />
        右辺第二項の特殊解は冗長要素を表すものであり，写像<i class="italic-tnr">A</i>によって0となる。
        <vue-mathjax :formula="f_general_null_check" />
        ここで，写像<i class="italic-tnr">A</i>の像が0となる元の空間を<i class="italic-tnr">A</i>の零空間と呼ぶ。右辺第二項に存在する次の項は写像Aの零空間への直行射影を行う作用素である。
        <vue-mathjax :formula="f_orthogonal" />
        この直行射影作用素を用いて冗長自由度の設計を行うことができる。
      </p>

      <h2 class="research-subtitle"> 運動学問題 </h2>
      <p>
        先端速度から関節速度を求める問題を考えた際，ヤコビ行列の擬似逆行列を用いて次のように解を得る。
        <vue-mathjax :formula="f_vel_null" />
        上記の解は，以下の式からヤコビ行列の定義式を満たすことがわかる。ここで，「作業空間の運動に影響を与えない関節空間の運動」を簡潔のために作業空間の零空間と表現する。ヤコビ行列の零空間は速度次元における作業空間の零空間となる。
        <vue-mathjax :formula="f_vell_null_check" />
        続いて，先端加速度から関節加速度を求める問題を考えた際，ヤコビ行列の擬似逆行列を用いて次のように解を得る。
        <vue-mathjax :formula="f_acc_null" />
        先ほどと同様に，上記の解はヤコビ行列の定義式から導出される関係式を満たす。
        <vue-mathjax :formula="f_acc_null_check" />
        したがって，ヤコビ行列の零空間は速度次元および加速度次元における作業空間の零空間となる。
      <p>

      <h2 class="research-subtitle"> 動力学問題 </h2>
      <p>
        制御入力によって作業空間の零空間を操作することができれば，冗長自由度に作用することができる。ここで，加速度次元の作業空間の零空間に作用することを目標として，次のように制御入力を決定した場合について考える。
        <vue-mathjax :formula="f_torque_null" />
        ここで，右辺第二項は零空間参照値を表す。この入力によって，作業空間の運動方程式は次のようになる。
        <vue-mathjax :formula="f_torque_null_check" />
        したがって，上記の制御入力における零空間参照値は，作業空間の零空間に作用しつつ作業空間応答を変化させない。また，作業空間慣性が単位行列 (<i class="italic-tnr" style="margin-right:2px">M</i>=<i class="italic-tnr" style="margin-left:2px">I</i>) となるように仮想慣性制御を行い，作業空間加速度制御が成立する場合には，次のように入力を決定すれば良い。
        </p>
        <div class="pic-container">
          <img src="@/pic/tutorial/workspace_acc2.png" class="pic-workspace_acc2">
        </div>
        <p>
        <vue-mathjax :formula="f_acccon_null" />
        以下の式より，上記の入力を行なった際に作業空間の加速度制御が実現することが確認できる。
        <vue-mathjax :formula="f_acccon_null_check" />
        このとき，制御器は次のように簡略化して実装することができる。
        </p>
        <div class="pic-container">
          <img src="@/pic/tutorial/workspace_acc3.png" class="pic-workspace_acc3">
        </div>
        <p>
        ここで，作業空間の制御入力が加速度を算出する過程にヤコビ行列の擬似逆行列が存在する。したがって，作業空間の制御入力によって発生する関節空間の加速度は，実現可能な加速度の中でノルムが最小の加速度となる。作業空間の制御入力は作業空間の制御に必要なエネルギのみを制御系に与え，冗長自由度に不要なエネルギを与えない。そのため，零空間の制御入力を与えないで位置制御を行なった場合には，機械が作業空間の位置決め目標点から吊るされたような姿勢を取る。これを回避するためには，関節各の制御器を零空間に設置するなどの対応をする必要がある。
      <p>

      <h2 class="research-subtitle"> 位置制御系の設計 </h2>
      <p>
        作業空間における位置決めに関しては，作業空間上で加速度制御系が成立しているので，外側に単純な位置制御器を設置すればよい。ここではヤコビ行列の微分項を十分に小さいものとして無視している。一方で，冗長自由度を制御するために零空間参照値を設計する必要がある。
      </p>
      <div class="pic-container">
        <img src="@/pic/tutorial/workspace_poscon_redundant.png" class="pic-workspace_poscon_redundant">
      </div>
      <p>
        姿勢を保つ目的であれば，各関節にインピーダンスを与えればよい。以下の制御器は目標姿勢角度からの角度偏差に応じて復元力を発生するインピーダンス制御を行う。作業空間と零空間は非干渉のため，設定するインピーダンスの値によって作業空間における制御性能が変化することはない。
        <vue-mathjax :formula="f_null_ref" />

      </p>

      <h2 class="research-subtitle"> シミュレータの作成 </h2>
      <p>
        以上を基に，3自由度マニピュレータのシミュレーションを行う。2自由度マニピュレータの制御系との差異は，以下のようになる。
        <ol style="margin:10px">
          <li> 擬似逆行列を計算する </li>
          <li> 零空間制御器を設計する </li>
        </ol>
        前回と同様に，位置指令値として周波数1 Hz，半径50 mmの円を与える。また，零空間制御器の有無による応答結果の差異を確認する。これをC言語を用いて実装すると次のようになる。ここで，外力，摩擦力，重力，およびその他の非理想特性は無視して実装を行なっている。
      </p>

      <pre style="line-height:150%; margin:-10pt 0"><code>
      <div style="in-left:0;padding:0px 25px;margin:0;background-color:#1a1a1a;color:#FFF;border-radius:4px; overflow:auto">
<font style="color:gold;">#include</font> &lt;stdio.h&gt;
<font style="color:gold;">#include</font> &lt;math.h&gt;

<font style="color:red;">#define</font> mnum 3
<font style="color:red;">#define</font> rnum 2

<font style="color:deepskyblue;">int</font> main(){
&#9;<font style="color:lightgreen;font-style:italic;">//Indicator</font>
&#9;<font style="color:deepskyblue;">int</font> i=0;
&#9;<font style="color:deepskyblue;">int</font> j=0;
&#9;<font style="color:deepskyblue;">int</font> p=0;

&#9;<font style="color:lightgreen;font-style:italic;">//Control loop</font>
&#9;<font style="color:deepskyblue;">double</font> t=0.0;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Time</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Ts=1e-4;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Sampling time of a controller</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Duration=2.0;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Simulation time</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">int</font> lcnt=Duration/Ts;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Loop count of a controller simulator</font>

&#9;<font style="color:lightgreen;font-style:italic;">//Plant simulator</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">int</font> pcnt=200;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Loop count of a plant simulator</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Tp=Ts/pcnt;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Sampling time of a plant simulator</font>

&#9;<font style="color:lightgreen;font-style:italic;">//Logger for animation</font>
  &#9;<font style="color:deepskyblue;">double</font> x[<font style="color:darkorange;">mnum+1</font>]={0.0};&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Jointposition (x-axis)</font>
&#9;<font style="color:deepskyblue;">double</font> y[<font style="color:darkorange;">mnum+1</font>]={0.0};&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Jointposition (y-axis)</font>

&#9;<font style="color:lightgreen;font-style:italic;">//Plant: Actual parameter</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> J[<font style="color:darkorange;">mnum</font>]={2.13, 3.02, 1.02};&#9;<font style="color:gray;font-style:italic;">// Jointspace inertia</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Kt[<font style="color:darkorange;">mnum</font>]={1.18, 1.18, 1.18};&#9;<font style="color:gray;font-style:italic;">// torque constants of motors</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> L[<font style="color:darkorange;">mnum</font>]={0.2,0.25,0.10};&#9;&#9;<font style="color:gray;font-style:italic;">// Arm length</font>

&#9;<font style="color:lightgreen;font-style:italic;">//Plant: Nominal parameters</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Jn[<font style="color:darkorange;">mnum</font>]={2.13, 3.02, 1.02};&#9;<font style="color:gray;font-style:italic;">// Nomianl Jointspace inertia</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Ktn[<font style="color:darkorange;">mnum</font>]={1.18, 1.18, 1.18};&#9;<font style="color:gray;font-style:italic;">// Nomial torque constants</font>

&#9;<font style="color:lightgreen;font-style:italic;">//Jacobian matrix</font>
&#9;<font style="color:deepskyblue;">double</font> Jaco[<font style="color:darkorange;">rnum</font>][<font style="color:darkorange;">mnum</font>]={ {0.0} };&#9;&#9;<font style="color:gray;font-style:italic;">// Jacobian matrix</font>
&#9;<font style="color:deepskyblue;">double</font> JJt[<font style="color:darkorange;">rnum</font>][<font style="color:darkorange;">rnum</font>]={ {0.0} };&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Inner  product of Jacobian and Jacobian.T</font>
&#9;<font style="color:deepskyblue;">double</font> detJJt=0.0;&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Determinant of the Jacobian matrix</font>
&#9;<font style="color:deepskyblue;">double</font> invJJt[<font style="color:darkorange;">rnum</font>][<font style="color:darkorange;">rnum</font>]={ {0.0} };&#9;&#9;<font style="color:gray;font-style:italic;">// Inverse of the inner product</font>
&#9;<font style="color:deepskyblue;">double</font> invJaco[<font style="color:darkorange;">mnum</font>][<font style="color:darkorange;">rnum</font>]={ {0.0} };&#9;&#9;<font style="color:gray;font-style:italic;">// Inverse of the Jacobian matrix</font>
&#9;<font style="color:deepskyblue;">double</font> nullJaco[<font style="color:darkorange;">mnum</font>][<font style="color:darkorange;">mnum</font>]={ {0.0} };&#9;<font style="color:gray;font-style:italic;">// Null space Jacobian matrix</font>

&#9;<font style="color:lightgreen;font-style:italic;">//State: Jointspapce</font>
&#9;<font style="color:deepskyblue;">double</font> d0q[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Jointspace position</font>
&#9;<font style="color:deepskyblue;">double</font> d1q[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Joinst space velocity</font>
&#9;<font style="color:deepskyblue;">double</font> d2q[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Jointspace acceleration</font>
&#9;<font style="color:deepskyblue;">double</font> torque[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Joint space torque</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> d0q_init[<font style="color:darkorange;">mnum</font>]={M_PI/2.0,M_PI,0.0};&#9;<font style="color:gray;font-style:italic;">// Initial joinst space position</font>
&#9;for(p=0;p&lt;mnum;p++) d0q[<font style="color:darkorange;">p</font>]=d0q_init[<font style="color:darkorange;">p</font>];

&#9;<font style="color:lightgreen;font-style:italic;">//State: Work space</font>
&#9;<font style="color:deepskyblue;">double</font> d0x[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Work space position</font>
&#9;<font style="color:deepskyblue;">double</font> d1x[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Work space velocity</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> d0x_init[<font style="color:darkorange;">mnum</font>]={&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Initial work space velocity</font>
&#9;&#9;L[<font style="color:darkorange;">0</font>]*cos(d0q_init[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*cos(d0q_init[<font style="color:darkorange;">1</font>])-L[<font style="color:darkorange;">2</font>]*cos(d0q_init[<font style="color:darkorange;">1</font>]+d0q_init[<font style="color:darkorange;">2</font>]),
&#9;&#9;L[<font style="color:darkorange;">0</font>]*sin(d0q_init[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*sin(d0q_init[<font style="color:darkorange;">1</font>])-L[<font style="color:darkorange;">2</font>]*sin(d0q_init[<font style="color:darkorange;">1</font>]+d0q_init[<font style="color:darkorange;">2</font>])
&#9;};
&#9;for(p=0;p&lt;mnum;p++) d0x[<font style="color:darkorange;">p</font>]=d0x_init[<font style="color:darkorange;">p</font>];

&#9;<font style="color:lightgreen;font-style:italic;">//Copntroller: Gain</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Kp=10000;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// P controller</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Kd=2.0*sqrt(Kp);&#9;&#9;&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// D controller</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Knp[<font style="color:darkorange;">mnum</font>]={0.0, 10.0, 0.0};&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Null space P controller</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Knd[<font style="color:darkorange;">mnum</font>]={10.0, 2.0*sqrt(Knp[<font style="color:darkorange;">1</font>]), 10.0};&#9;&#9;<font style="color:gray;font-style:italic;">// Null space D controller</font>
&#9;
&#9;<font style="color:gray;font-style:italic;">//Controller: Reference</font>
&#9;<font style="color:deepskyblue;">double</font> CmdAmp=0.05;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Radius of a command</font>
&#9;<font style="color:deepskyblue;">double</font> d0xcmd[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;<font style="color:gray;font-style:italic;">// Command</font>
&#9;<font style="color:deepskyblue;">double</font> d0xcmdfreq=1.0;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Frequency of a command</font>
&#9;<font style="color:deepskyblue;">double</font> d2xref[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;<font style="color:gray;font-style:italic;">// Work space acceleration reference</font>
&#9;<font style="color:deepskyblue;">double</font> d2qref[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;<font style="color:gray;font-style:italic;">// Jointspace acceleration reference</font>
&#9;<font style="color:deepskyblue;">double</font> d2qref_null[<font style="color:darkorange;">mnum</font>]={0.0};&#9;<font style="color:gray;font-style:italic;">// Null space acceleration reference </font>
&#9;<font style="color:deepskyblue;">double</font> Tref_null[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;<font style="color:gray;font-style:italic;">// Null space torque reference</font>
&#9;<font style="color:deepskyblue;">double</font> iref[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Current reference</font>
&#9;
&#9;<font style="color:gray;font-style:italic;">//Obstacle</font>
&#9;<font style="color:deepskyblue;">double</font> Tdis[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;<font style="color:gray;font-style:italic;">//Jointspace disturbance</font>

&#9;FILE *fp;
&#9;fp = fopen(<font style="color:lightcoral;">"anime.dat"</font>,<font style="color:lightcoral;">"w"</font>);

&#9;for(i=0;i&lt;lcnt;i++){

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 1.1. Jacobian</font>
&#9;&#9;Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]=-L[<font style="color:darkorange;">0</font>]*sin(d0q[<font style="color:darkorange;">0</font>]);
&#9;&#9;Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]=L[<font style="color:darkorange;">1</font>]*sin(d0q[<font style="color:darkorange;">1</font>])+L[<font style="color:darkorange;">2</font>]*sin(d0q[<font style="color:darkorange;">1</font>]+d0q[<font style="color:darkorange;">2</font>]);
&#9;&#9;Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">2</font>]=L[<font style="color:darkorange;">2</font>]*sin(d0q[<font style="color:darkorange;">1</font>]+d0q[<font style="color:darkorange;">2</font>]);
&#9;&#9;Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]=L[<font style="color:darkorange;">0</font>]*cos(d0q[<font style="color:darkorange;">0</font>]);
&#9;&#9;Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]=-L[<font style="color:darkorange;">1</font>]*cos(d0q[<font style="color:darkorange;">1</font>])-L[<font style="color:darkorange;">2</font>]*cos(d0q[<font style="color:darkorange;">1</font>]+d0q[<font style="color:darkorange;">2</font>]);
&#9;&#9;Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">2</font>]=-L[<font style="color:darkorange;">2</font>]*cos(d0q[<font style="color:darkorange;">1</font>]+d0q[<font style="color:darkorange;">2</font>]);

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 1.2 Inner product</font>
&#9;&#9;JJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]=Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]+Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]+Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">2</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">2</font>];
&#9;&#9;JJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]=Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]+Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]+Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">2</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">2</font>];
&#9;&#9;JJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]=Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">2</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">2</font>];
&#9;&#9;JJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]=Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">2</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">2</font>];

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 1.3. Inverse of the inner product</font>
&#9;&#9;detJJt=JJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]*JJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]-JJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]*JJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>];
&#9;&#9;invJJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]=JJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]/detJJt;
&#9;&#9;invJJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]=-JJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]/detJJt;
&#9;&#9;invJJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]=-JJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]/detJJt;
&#9;&#9;invJJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]=JJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]/detJJt;

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 1.4 Inverse Jacobian</font>
&#9;&#9;invJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]=Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]*invJJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]*invJJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>];
&#9;&#9;invJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]=Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]*invJJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]*invJJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>];
&#9;&#9;invJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]=Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]*invJJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]*invJJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>];
&#9;&#9;invJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]=Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]*invJJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]*invJJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>];
&#9;&#9;invJaco[<font style="color:darkorange;">2</font>][<font style="color:darkorange;">0</font>]=Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">2</font>]*invJJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">2</font>]*invJJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>];
&#9;&#9;invJaco[<font style="color:darkorange;">2</font>][<font style="color:darkorange;">1</font>]=Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">2</font>]*invJJt[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">2</font>]*invJJt[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>];

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 1.5 Null space Jacobian matrix</font>
&#9;&#9;nullJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]=1.0-invJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]-invJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>];
&#9;&#9;nullJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]=0.0-invJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]-invJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>];
&#9;&#9;nullJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">2</font>]=0.0-invJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">2</font>]-invJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">2</font>];
&#9;&#9;nullJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]=0.0-invJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]-invJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>];
&#9;&#9;nullJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]=1.0-invJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]-invJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>];
&#9;&#9;nullJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">2</font>]=0.0-invJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">2</font>]-invJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">2</font>];
&#9;&#9;nullJaco[<font style="color:darkorange;">2</font>][<font style="color:darkorange;">0</font>]=0.0-invJaco[<font style="color:darkorange;">2</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]-invJaco[<font style="color:darkorange;">2</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>];
&#9;&#9;nullJaco[<font style="color:darkorange;">2</font>][<font style="color:darkorange;">1</font>]=0.0-invJaco[<font style="color:darkorange;">2</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]-invJaco[<font style="color:darkorange;">2</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>];
&#9;&#9;nullJaco[<font style="color:darkorange;">2</font>][<font style="color:darkorange;">2</font>]=1.0-invJaco[<font style="color:darkorange;">2</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">2</font>]-invJaco[<font style="color:darkorange;">2</font>][<font style="color:darkorange;">1</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">2</font>];

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 2.1. Workspace position</font>
&#9;&#9;d0x[<font style="color:darkorange;">0</font>]=L[<font style="color:darkorange;">0</font>]*cos(d0q[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*cos(d0q[<font style="color:darkorange;">1</font>])-L[<font style="color:darkorange;">2</font>]*cos(d0q[<font style="color:darkorange;">1</font>]+d0q[<font style="color:darkorange;">2</font>]);
&#9;&#9;d0x[<font style="color:darkorange;">1</font>]=L[<font style="color:darkorange;">0</font>]*sin(d0q[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*sin(d0q[<font style="color:darkorange;">1</font>])-L[<font style="color:darkorange;">2</font>]*sin(d0q[<font style="color:darkorange;">1</font>]+d0q[<font style="color:darkorange;">2</font>]);

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 2.2 Workspace velocity</font>
&#9;&#9;d1x[<font style="color:darkorange;">0</font>]=Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]*d1q[<font style="color:darkorange;">0</font>]+Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]*d1q[<font style="color:darkorange;">1</font>]+Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">2</font>]*d1q[<font style="color:darkorange;">2</font>];
&#9;&#9;d1x[<font style="color:darkorange;">1</font>]=Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]*d1q[<font style="color:darkorange;">0</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]*d1q[<font style="color:darkorange;">1</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">2</font>]*d1q[<font style="color:darkorange;">2</font>];

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 3. Command generation</font>
&#9;&#9;if(t&lt;0.5){
&#9;&#9;&#9;d0xcmd[<font style="color:darkorange;">0</font>]=d0x_init[<font style="color:darkorange;">0</font>];
&#9;&#9;&#9;d0xcmd[<font style="color:darkorange;">1</font>]=d0x_init[<font style="color:darkorange;">1</font>];
&#9;&#9;}else{
&#9;&#9;&#9;d0xcmd[<font style="color:darkorange;">0</font>]=CmdAmp*(sin(d0xcmdfreq*2.0*M_PI*(t-0.5))) +d0x_init[<font style="color:darkorange;">0</font>];
&#9;&#9;&#9;d0xcmd[<font style="color:darkorange;">1</font>]=CmdAmp*(1.0-cos(d0xcmdfreq*2.0*M_PI*(t-0.5))) +d0x_init[<font style="color:darkorange;">1</font>];
&#9;&#9;}

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 4. Reference calculation</font>
&#9;&#9;for(p=0;p&lt;rnum;p++) d2xref[<font style="color:darkorange;">p</font>]=Kp*(d0xcmd[<font style="color:darkorange;">p</font>]-d0x[<font style="color:darkorange;">p</font>])-Kd*d1x[<font style="color:darkorange;">p</font>];
&#9;&#9;for(p=0;p&lt;mnum;p++) Tref_null[<font style="color:darkorange;">p</font>]=-Knp[<font style="color:darkorange;">p</font>]*d0q[<font style="color:darkorange;">p</font>]-Knd[<font style="color:darkorange;">p</font>]*d1q[<font style="color:darkorange;">p</font>];
&#9;&#9;for(p=0;p&lt;mnum;p++) d2qref_null[<font style="color:darkorange;">p</font>]=+nullJaco[<font style="color:darkorange;">p</font>][<font style="color:darkorange;">0</font>]*Tref_null[<font style="color:darkorange;">0</font>]+nullJaco[<font style="color:darkorange;">p</font>][<font style="color:darkorange;">1</font>]*Tref_null[<font style="color:darkorange;">1</font>]+nullJaco[<font style="color:darkorange;">p</font>][<font style="color:darkorange;">2</font>]*Tref_null[<font style="color:darkorange;">2</font>];
&#9;&#9;for(p=0;p&lt;mnum;p++){
&#9;&#9;&#9;d2qref[<font style="color:darkorange;">p</font>]=invJaco[<font style="color:darkorange;">p</font>][<font style="color:darkorange;">0</font>]*d2xref[<font style="color:darkorange;">0</font>]+invJaco[<font style="color:darkorange;">p</font>][<font style="color:darkorange;">1</font>]*d2xref[<font style="color:darkorange;">1</font>]+d2qref_null[<font style="color:darkorange;">p</font>];
&#9;&#9;&#9;iref[<font style="color:darkorange;">p</font>]=Jn[<font style="color:darkorange;">p</font>]/Ktn[<font style="color:darkorange;">p</font>]*d2qref[<font style="color:darkorange;">p</font>];
&#9;&#9;}

&#9;&#9;<font style="color:lightgreen;font-style:italic;">//Plant simulation</font>
&#9;&#9;for(j=0;j&lt;pcnt;j++){
&#9;&#9;&#9;Tdis[<font style="color:darkorange;">2</font>]=30.0;
&#9;&#9;&#9;for(p=0;p&lt;mnum;p++){
&#9;&#9;&#9;&#9;<font style="color:lightgreen;font-style:italic;">//Jointspace</font>
&#9;&#9;&#9;&#9;d0q[<font style="color:darkorange;">p</font>]+=d1q[<font style="color:darkorange;">p</font>]*Tp;
&#9;&#9;&#9;&#9;d1q[<font style="color:darkorange;">p</font>]+=d2q[<font style="color:darkorange;">p</font>]*Tp;
&#9;&#9;&#9;&#9;torque[<font style="color:darkorange;">p</font>]=Kt[<font style="color:darkorange;">p</font>]*iref[<font style="color:darkorange;">p</font>];
&#9;&#9;&#9;&#9;d2q[<font style="color:darkorange;">p</font>]=(torque[<font style="color:darkorange;">p</font>] +Tdis[<font style="color:darkorange;">p</font>])/J[<font style="color:darkorange;">p</font>];
&#9;&#9;&#9;}
&#9;&#9;}

&#9;&#9;<font style="color:lightgreen;font-style:italic;">//Data for animation</font>
&#9;&#9;x[<font style="color:darkorange;">0</font>]=0.0;
&#9;&#9;y[<font style="color:darkorange;">0</font>]=0.0;
&#9;&#9;x[<font style="color:darkorange;">1</font>]=L[<font style="color:darkorange;">0</font>]*cos(d0q[<font style="color:darkorange;">0</font>]);
&#9;&#9;y[<font style="color:darkorange;">1</font>]=L[<font style="color:darkorange;">0</font>]*sin(d0q[<font style="color:darkorange;">0</font>]);
&#9;&#9;x[<font style="color:darkorange;">2</font>]=L[<font style="color:darkorange;">0</font>]*cos(d0q[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*cos(d0q[<font style="color:darkorange;">1</font>]);
&#9;&#9;y[<font style="color:darkorange;">2</font>]=L[<font style="color:darkorange;">0</font>]*sin(d0q[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*sin(d0q[<font style="color:darkorange;">1</font>]);
&#9;&#9;x[<font style="color:darkorange;">3</font>]=L[<font style="color:darkorange;">0</font>]*cos(d0q[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*cos(d0q[<font style="color:darkorange;">1</font>])-L[<font style="color:darkorange;">2</font>]*cos(d0q[<font style="color:darkorange;">1</font>]+d0q[<font style="color:darkorange;">2</font>]);
&#9;&#9;y[<font style="color:darkorange;">3</font>]=L[<font style="color:darkorange;">0</font>]*sin(d0q[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*sin(d0q[<font style="color:darkorange;">1</font>])-L[<font style="color:darkorange;">2</font>]*sin(d0q[<font style="color:darkorange;">1</font>]+d0q[<font style="color:darkorange;">2</font>]);

&#9;&#9;fprintf(fp,<font style="color:lightcoral;">"%e %e %e %e %e %e %e %e %e %e %e\n"</font>,
&#9;&#9;&#9;t, x[<font style="color:darkorange;">0</font>], y[<font style="color:darkorange;">0</font>], x[<font style="color:darkorange;">1</font>], y[<font style="color:darkorange;">1</font>], x[<font style="color:darkorange;">2</font>], y[<font style="color:darkorange;">2</font>], x[<font style="color:darkorange;">3</font>], y[<font style="color:darkorange;">3</font>], d0xcmd[<font style="color:darkorange;">0</font>], d0xcmd[<font style="color:darkorange;">1</font>]);

&#9;&#9;t+=Ts;
&#9;}

&#9;return 0;
}
      </div>
      </code></pre>

      <p>
        開始から第二関節に30 N/mの外乱トルクを与えている。左図は零空間制御器なし，右図は零空間インピーダンス制御器ありの結果を示している。どちらも1秒に1回，半径50 mmの円を描くことに成功しているが，姿勢に差異が見受けられる。
      </p>

      <div class="pic-container">
        <img src="@/pic/tutorial/manipulator_zero.gif" class="pic-manipulator-gif">
        <img src="@/pic/tutorial/manipulator_stiff.gif" class="pic-manipulator-gif">
      </div>



      <ul class="footer">
        <li class="article-title-f title-left">
          <router-link class="article-link-f" to="/research/articles/tutorial/manipulation_2dof">
            > 2軸マニピュレータの位置制御
          </router-link>
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link />
        </li>

        <li class="article-title-f title-sp">
          <router-link class="article-link-f" to="/research">
          > TOP
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

        f_kinematics: "$$ \\begin{eqnarray} H(q)&=& \\begin{bmatrix} l_{1}\\cos q_1-l_{2}\\cos q_2 -l_{3}\\cos (q_2+q_3) \\\\ l_{1}\\sin q_1-l_{2}\\sin q_2 -l_{3}\\sin (q_2+q_3)  \\end{bmatrix} \\\\ J_{\\rm aco}(q)&=& \\begin{bmatrix} -l_{1}\\sin q_1 & l_{2}\\sin q_2 +l_{3}\\sin (q_2+q_3) & l_{3}\\sin (q_2+q_3)\\\\ l_{1}\\cos q_1 & -l_{2}\\cos q_2 -l_{3}\\cos (q_2+q_3) & -l_{3}\\cos (q_2+q_3) \\end{bmatrix}\\end{eqnarray} $$",

        f_veleq: "$$ \\begin{eqnarray} \\begin{bmatrix} \\dot{x}\\\\ \\dot{y} \\end{bmatrix}=\\begin{bmatrix} -l_{1}\\sin q_1 & l_{2}\\sin q_2 +l_{3}\\sin (q_2+q_3) & l_{3}\\sin (q_2+q_3)\\\\ l_{1}\\cos q_1 & -l_{2}\\cos q_2 -l_{3}\\cos (q_2+q_3) & -l_{3}\\cos (q_2+q_3) \\end{bmatrix}\\begin{bmatrix} \\dot{q}_{1}\\\\ \\dot{q}_{2}\\\\ \\dot{q}_{3} \\end{bmatrix} \\end{eqnarray} $$",

        f_inv_def: "$$ \\begin{eqnarray} Ax=y \\end{eqnarray} $$",

        f_inv_targ: "$$ \\begin{eqnarray} x_{\\rm m}={\\rm arg\\ min}\\ \\|x\\|^2_2\\ \\ {\\rm s.\\ t.\\ }Ax-y=0 \\end{eqnarray} $$",

        f_lagrange: "$$ \\begin{eqnarray} &&\\mathcal{L}(x, \\lambda)=\\frac{1}{2}x^{\\mathrm T}x+\\lambda(Ax-y)\\\\&&\\left\\{\\begin{matrix}\\frac{\\partial}{\\partial x}\\mathcal{L}(x_{\\rm m}, \\lambda)=x_{\\rm m}-A^{\\mathrm T}\\lambda=0\\\\ \\frac{\\partial}{\\partial \\lambda}\\mathcal{L}(x_{\\rm m}, \\lambda)=Ax_{\\rm m}-y=0\\\\ \\end{matrix}\\right.\\\\ \\Leftrightarrow&&\\left\\{\\begin{matrix}x_{\\rm m}=A^{\\mathrm T}\\lambda\\\\AA^{\\mathrm T}\\lambda=y\\\\\\end{matrix}\\right.\\\\ \\Leftrightarrow&&\\left\\{\\begin{matrix}x_{\\rm m}=A^{\\mathrm T}\\left(AA^{\\mathrm T}\\right)^{-1}y\\\\\\lambda=\\left(AA^{\\mathrm T}\\right)^{-1}y\\\\\\end{matrix}\\right.\\end{eqnarray} $$",

        f_general_inv: "$$ \\begin{eqnarray} A^{+}=A^{\\mathrm T}\\left(AA^{\\mathrm T}\\right)^{-1} \\end{eqnarray} $$",

        f_general_sol: "$$ \\begin{eqnarray} x=A^{+}y+(I-A^{+}A)k \\end{eqnarray} $$",

        f_general_null_check: "$$ \\begin{eqnarray} Ax=AA^{+}y+A(I-A^{+}A)k=y \\end{eqnarray} $$",

        f_orthogonal: "$$ \\begin{eqnarray} (I-A^{+}A) \\end{eqnarray} $$",

        f_vel_null: "$$ \\begin{eqnarray} \\dot{x}&=&J_{\\rm aco}(q)q\\\\ \\Leftrightarrow \\dot{q}&=&J_{\\rm aco}^{\\rm +}(q)\\dot{x}+\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\zeta\\\\ J_{\\rm aco}^{+}(q)&\\triangleq&J_{\\rm aco}^{\\mathrm T}(q)\\left(J_{\\rm aco}(q)J_{\\rm aco}^{\\mathrm T}(q)\\right)^{-1}\\end{eqnarray} $$",

        f_vell_null_check: "$$ \\begin{eqnarray} J_{\\rm aco}(q)\\dot{q}&=&J_{\\rm aco}(q)J_{\\rm aco}^{\\rm +}(q)\\dot{x}+J_{\\rm aco}(q)\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\zeta\\\\ &=&\\dot{x}+\\left(J_{\\rm aco}(q)-J_{\\rm aco}(q)J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\zeta\\\\ &=&\\dot{x} \\end{eqnarray} $$",

        f_acc_null: "$$ \\begin{eqnarray} \\ddot{x}&=&J_{\\rm aco}(q)\\ddot{q}+\\dot{J}_{\\rm aco}(q)\\dot{q}\\\\ \\ddot{q}&=&J_{\\rm aco}^{+}(q)\\left(\\ddot{x}-\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)+\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\chi \\end{eqnarray} $$",

        f_acc_null_check: "$$ \\begin{eqnarray} J_{\\rm aco}(q)\\ddot{q}+\\dot{J}_{\\rm aco}(q)\\dot{q} &=&J_{\\rm aco}(q)J_{\\rm aco}^{+}(q)\\left(\\ddot{x}-\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)+J_{\\rm aco}(q)\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\chi+\\dot{J}_{\\rm aco}(q)\\dot{x}\\\\ &=&\\ddot{x}+\\left(J_{\\rm aco}(q)-J_{\\rm aco}(q)J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\chi\\\\ &=&\\ddot{x}\\end{eqnarray} $$",

        f_torque_null: "$$ \\begin{eqnarray} \\tau&=&J_{\\rm aco}^{\\mathrm T}(q)\\left(f-M(q)\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)+J(q)\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\xi \\end{eqnarray} $$",

        f_torque_null_check: "$$ \\begin{eqnarray} \\ddot{q}&=&J^{-1}(q)J_{\\rm aco}^{\\mathrm T}(q)\\left(f-M(q)\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)+J^{-1}(q)J(q)\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\xi\\\\ &=&J^{-1}(q)J_{\\rm aco}^{\\mathrm T}(q)\\left(f-M(q)\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)+\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\xi \\\\[4pt] M(q)\\ddot{x}&=&M(q)J_{\\rm aco}(q)\\ddot{q}+M(q)\\dot{J}_{\\rm aco}(q)\\dot{q}\\\\ &=&M(q)J_{\\rm aco}(q)\\left(J^{-1}(q)J_{\\rm aco}^{\\mathrm T}(q)\\left(f-M(q)\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)+\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\xi\\right)+M(q)\\dot{J}_{\\rm aco}(q)\\dot{q}\\\\ &=&f-M(q)\\dot{J}_{\\rm aco}(q)\\dot{q}+M(q)J_{\\rm aco}(q)\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\xi+M(q)\\dot{J}_{\\rm aco}(q)\\dot{q}\\\\ &=&f+M(q)\\left(J_{\\rm aco}(q)-J_{\\rm aco}(q)J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\xi\\\\ &=&f \\\\[4pt] \\because J(q)&=&J_{\\rm aco}^{\\mathrm T}(q)M(q)J_{\\rm aco}(q) \\\\ \\Leftrightarrow I&=&J_{\\rm aco}^{\\mathrm T}(q)M(q)J_{\\rm aco}(q)J^{-1}(q) \\\\ \\Leftrightarrow J_{\\rm aco}^{\\mathrm T}(q)&=&J_{\\rm aco}^{\\mathrm T}(q)M(q)J_{\\rm aco}(q)J^{-1}(q)J_{\\rm aco}^{\\mathrm T}(q) \\\\ \\Leftrightarrow I&=&M(q)J_{\\rm aco}(q)J^{-1}(q)J_{\\rm aco}^{\\mathrm T}(q) \\end{eqnarray} $$",

        f_acccon_null: "$$ \\begin{eqnarray} M&=&I\\rightarrow J(q)=J_{\\rm aco}^{\\mathrm T}(q)J_{\\rm aco}(q)\\\\ \\tau&=&J_{\\rm aco}^{\\mathrm T}(q)\\left(f-\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)+J(q)\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\xi  \\end{eqnarray} $$",

        f_acccon_null_check: "$$ \\begin{eqnarray} \\ddot{q}&=&J^{-1}(q)J_{\\rm aco}^{\\mathrm T}(q)\\left(f-\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)+J^{-1}(q)J(q)\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\xi\\\\ &=&J^{-1}(q)J_{\\rm aco}^{\\mathrm T}(q)\\left(f-\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)+\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\xi\\\\ &=&(J_{\\rm aco}^{\\mathrm T}(q)J_{\\rm aco}(q))^{-1}J_{\\rm aco}^{\\mathrm T}(q)\\left(f-\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)+\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\xi\\\\ &=&J_{\\rm aco}^{+}(q)\\left(f-\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)+\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\xi\\\\[4pt] \\ddot{x}&=&J_{\\rm aco}(q)\\ddot{q}+\\dot{J}_{\\rm aco}(q)\\dot{q}\\\\ &=&J_{\\rm aco}(q)J_{\\rm aco}^{+}(q)\\left(f-\\dot{J}_{\\rm aco}(q)\\dot{q}\\right)+J_{\\rm aco}(q)\\left(I-J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\chi+\\dot{J}_{\\rm aco}(q)\\dot{q}\\\\ &=&f+\\left(J_{\\rm aco}-J_{\\rm aco}J_{\\rm aco}^{+}(q)J_{\\rm aco}(q)\\right)\\chi\\\\ &=&f\\end{eqnarray} $$",

        f_null_ref: "$$ \\begin{eqnarray} \\xi&=&K_{\\rm np}(q^{\\rm cmd}-q)-K_{\\rm nd}\\dot{q} \\end{eqnarray} $$",
      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.pic-manipulator2{
  width:90%;
  max-width:270px;
  margin:10px;
}
.pic-workspace_acc2{
  width:90%;
  max-width:650px;
  margin:10px;
}
.pic-workspace_acc3{
  width:90%;
  max-width:420px;
  margin:10px;
}
.pic-workspace_poscon_redundant{
  width:90%;
  max-width:600px;
  margin:10px;
}
.pic-manipulator-gif{
  width:90%;
  max-width:440px;
  margin:0px;
}
@media screen and (max-width: 640px){
  .pic-manipulator2{
    width:70%;
    margin:5px;
  }
}
</style>
