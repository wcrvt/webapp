<template>
  <body>
    <div class="text-box">
      <h1 class="research-title"> 2軸マニピュレータの位置制御 </h1>

      <p>
        ここでは多自由度系の制御を目的として，<router-link class="article-router" to="/research/articles/acceleration_control/multidof_acc">多自由度系の加速度制御</router-link>のシミュレーションを行う。複雑な作業を行う上では位置制御，力制御，インピーダンス制御が実装できることが望ましい。これらの制御系は加速度制御系を導入することで簡単に設計できる。今回は位置制御器の設計と加速度制御系の設計を行う。
      </p>

      <h2 class="research-subtitle"> 加速度制御系の設計 </h2>
      <p>
        作業空間において加速度制御を実現するためには，次のような制御器を実装する必要がある。
      </p>
      <div class="pic-container">
        <img src="@/pic/tutorial/workspace_acc.png" class="pic-workspace_acc">
      </div>
      <p>
        <vue-mathjax :formula="f_dynamics" />
        したがって，制御入力は次のように決定される。制御対象の作業空間速度が小さい時は，簡略化した決定式を使用することができる。
        <vue-mathjax :formula="f_cinput" />
        今回は簡略化された決定式を使用する。この計算を行うためには，慣性行列の同定とヤコビ行列の算出を行えばよい。
      </p>

      <h2 class="research-subtitle"> 位置制御系の設計 </h2>
      <p>
        作業空間で加速度制御系が成立しているのであれば，外側に位置制御器を設置すれば位置制御が達成される。
      </p>
      <div class="pic-container">
        <img src="@/pic/tutorial/workspace_poscon.png" class="pic-workspace_poscon">
      </div>
      <p>
        上図の制御系は，加速度制御の外側に位置に関するP-D制御器が設置されている位置制御系である。作業空間位置および速度は関節空間位置および速度から運動学とヤコビ行列を用いて推定される。この制御系の入出力特性は次のようになる。
        <vue-mathjax :formula="f_inout" />
        したがって，適切な極配置により位置制御が達成される。この計算を行うためには，運動学およびヤコビ行列を用いた状態観測と指令値生成を行えばよい。
      </p>

      <h2 class="research-subtitle"> システム変数の算出 </h2>
      <p>
        加速度規範型の位置制御系を構築するためには，関節空間慣性，ヤコビ行列，運動学を求める必要がある。これらは制御対象に特有のパラメータであるため，以下に示す2自由度マニピュレータを例に考える。駆動部慣性を低減するために，根元に2つの回転モータが設置されているものとする。
      </p>
      <div class="pic-container">
        <img src="@/pic/tutorial/manipulator.png" class="pic-manipulator">
      </div>
      <p>
        このマニピュレータの先端位置は，モータ回転角度を用いて次のように表される。
        <vue-mathjax :formula="f_pos" />
        また，マニピュレータの先端速度は，モータ回転速度を用いて次のように表される。
        <vue-mathjax :formula="f_vel" />
        以上より，運動学とヤコビ行列は次のように表される。
        <vue-mathjax :formula="f_kinematics" />
        関節空間慣性行列はラグランジュの運動方程式から導出される。計算方法はここでは扱わない。関節空間慣性行列は姿勢に依存するため制御系設計を複雑化するが，今回のシミュレーションでは理想的な加速度制御の実現を目的として，関節空間慣性行列が対角行列をとるものとする。
      </p>

      <h2 class="research-subtitle"> シミュレータの作成 </h2>
      <p>
        以上を基に，2自由度マニピュレータのシミュレーションを行う。制御演算の過程を以下に示した。
      </p>
      <div class="pic-container">
        <img src="@/pic/tutorial/workspace_poscon_step.png" class="pic-workspace_poscon_step">
      </div>
      <p>
        制御演算の流れは，次のようになる。
        <ol style="margin:10px">
          <li> 状態観測と制御入力決定を行うために，運動学，ヤコビ行列，およびヤコビ行列の逆行列の計算を行う</li>
          <li> 運動学とヤコビ行列を用いて状態観測を行う</li>
          <li> 位置指令値を生成する</li>
          <li> 制御入力を決定する</li>
        </ol>
        今回は位置指令値として周波数1 Hz，半径50 mmの円を与える。これをC言語を用いて実装すると次のようになる。ここで，外力，摩擦力，重力，およびその他の非理想特性は無視して実装を行なっている。
      </p>

      <pre style="line-height:150%; margin:-10pt 0"><code>
      <div style="in-left:0;padding:0px 25px;margin:0;background-color:#1a1a1a;color:#FFF;border-radius:4px; overflow:auto">
<font style="color:gold;">#include</font> &lt;stdio.h&gt;
<font style="color:gold;">#include</font> &lt;math.h&gt;

<font style="color:red;">#define</font> mnum 2

<font style="color:deepskyblue;">int</font> main(){
&#9;<font style="color:lightgreen;font-style:italic;">//Indicator</font>
&#9;<font style="color:deepskyblue;">int</font> i=0;
&#9;<font style="color:deepskyblue;">int</font> j=0;
&#9;<font style="color:deepskyblue;">int</font> p=0;

&#9;<font style="color:lightgreen;font-style:italic;">//Control loop</font>
&#9;<font style="color:deepskyblue;">double</font> t=0.0;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;">// Time</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Ts=1e-4;&#9;&#9;&#9;&#9;<font style="color:gray;">// Sampling time of a controller</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Duration=5.0;&#9;&#9;&#9;<font style="color:gray;">// Simulation time</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">int</font> lcnt=Duration/Ts;&#9;&#9;&#9;<font style="color:gray;">// Loop count of a controller simulator</font>

&#9;<font style="color:lightgreen;font-style:italic;">//Plant simulator</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">int</font> pcnt=200;&#9;&#9;&#9;&#9;<font style="color:gray;">// Loop count of a plant simulator</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Tp=Ts/pcnt;&#9;&#9;&#9;<font style="color:gray;">// Sampling time of a plant simulator</font>

&#9;<font style="color:lightgreen;font-style:italic;">//Logger for animation</font>
&#9;<font style="color:deepskyblue;">double</font> x[<font style="color:darkorange;">mnum+1</font>]={0.0};&#9;&#9;&#9;<font style="color:gray;">// Joint position (x-axis)</font>
&#9;<font style="color:deepskyblue;">double</font> y[<font style="color:darkorange;">mnum+1</font>]={0.0};&#9;&#9;&#9;<font style="color:gray;">// Joint position (y-axis)</font>

&#9;<font style="color:lightgreen;font-style:italic;">//Plant: Actual parameter</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> J[<font style="color:darkorange;">mnum</font>]={2.13, 3.02};&#9;<font style="color:gray;">// Joint space inertia</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Kt[<font style="color:darkorange;">mnum</font>]={1.18, 1.18};&#9;<font style="color:gray;">// torque constants of motors</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> L[<font style="color:darkorange;">mnum</font>]={0.2,0.25};&#9;&#9;<font style="color:gray;">// Arm length</font>

&#9;<font style="color:lightgreen;font-style:italic;">//Plant: Nominal parameters</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Jn[<font style="color:darkorange;">mnum</font>]={2.13, 3.02};&#9;<font style="color:gray;">// Nomianl joint space inertia</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Ktn[<font style="color:darkorange;">mnum</font>]={1.18, 1.18};&#9;<font style="color:gray;">// Nomial torque constants</font>

&#9;<font style="color:lightgreen;font-style:italic;">//Jacobian matrix</font>
&#9;<font style="color:deepskyblue;">double</font> Jaco[<font style="color:darkorange;">mnum</font>][<font style="color:darkorange;">mnum</font>]={ {0.0} };&#9;&#9;<font style="color:gray;">// Jacobian matrix</font>
&#9;<font style="color:deepskyblue;">double</font> detJaco=0.0;&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;">// Determinant of the Jacobian matrix</font>
&#9;<font style="color:deepskyblue;">double</font> invJaco[<font style="color:darkorange;">mnum</font>][<font style="color:darkorange;">mnum</font>]={ {0.0} };&#9;&#9;<font style="color:gray;">// Inverse of the Jacobian matrix</font>

&#9;<font style="color:lightgreen;font-style:italic;">//State: Joint spapce</font>
&#9;<font style="color:deepskyblue;">double</font> d0q[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;">// Joint space position</font>
&#9;<font style="color:deepskyblue;">double</font> d1q[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;">// Joinst space velocity</font>
&#9;<font style="color:deepskyblue;">double</font> d2q[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;">// Joint space acceleration</font>
&#9;<font style="color:deepskyblue;">double</font> torque[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;&#9;&#9;<font style="color:gray;font-style:italic;">// Joint space torque</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> d0q_init[<font style="color:darkorange;">mnum</font>]={M_PI/2.0,M_PI};&#9;<font style="color:gray;">// Initial joinst space position</font>
&#9;for(p=0;p&lt;mnum;p++) d0q[<font style="color:darkorange;">p</font>]=d0q_init[<font style="color:darkorange;">p</font>];

&#9;<font style="color:lightgreen;font-style:italic;">//State: Work space</font>
&#9;<font style="color:deepskyblue;">double</font> d0x[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;">// Work space position</font>
&#9;<font style="color:deepskyblue;">double</font> d1x[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;">// Work space velocity</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> d0x_init[<font style="color:darkorange;">mnum</font>]={&#9;&#9;&#9;&#9;&#9;&#9;<font style="color:gray;">// Initial work space velocity</font>
&#9;&#9;L[<font style="color:darkorange;">0</font>]*cos(d0q_init[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*cos(d0q_init[<font style="color:darkorange;">1</font>]),
&#9;&#9;L[<font style="color:darkorange;">0</font>]*sin(d0q_init[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*sin(d0q_init[<font style="color:darkorange;">1</font>])
&#9;};
&#9;for(p=0;p&lt;mnum;p++) d0x[<font style="color:darkorange;">p</font>]=d0x_init[<font style="color:darkorange;">p</font>];

&#9;<font style="color:lightgreen;font-style:italic;">//Copntroller: Gain</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Kp=10000;&#9;&#9;&#9;<font style="color:gray;">// P controller</font>
&#9;<font style="color:deepskyblue;">const</font> <font style="color:deepskyblue;">double</font> Kd=2.0*sqrt(Kp);&#9;&#9;<font style="color:gray;">// D controller</font>

&#9;<font style="color:lightgreen;font-style:italic;">//Controller: Reference</font>
&#9;<font style="color:deepskyblue;">double</font> CmdAmp=0.05;&#9;&#9;&#9;<font style="color:gray;">// Radius of a command</font>
&#9;<font style="color:deepskyblue;">double</font> d0xcmd[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;<font style="color:gray;">// Command</font>
&#9;<font style="color:deepskyblue;">double</font> d0xcmdfreq=1.0;&#9;&#9;&#9;<font style="color:gray;">// Frequency of a command</font>
&#9;<font style="color:deepskyblue;">double</font> d2xref[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;<font style="color:gray;">// Work space acceleration reference</font>
&#9;<font style="color:deepskyblue;">double</font> d2qref[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;<font style="color:gray;">// Joint space acceleration reference</font>
&#9;<font style="color:deepskyblue;">double</font> iref[<font style="color:darkorange;">mnum</font>]={0.0};&#9;&#9;&#9;<font style="color:gray;">// Current reference</font>

&#9;FILE *fp;
&#9;fp = fopen(<font style="color:lightcoral;">"anime.dat"</font>,<font style="color:lightcoral;">"w"</font>);

&#9;for(i=0;i&lt;lcnt;i++){

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 1.1. Jacobian</font>
&#9;&#9;Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]=-L[<font style="color:darkorange;">0</font>]*sin(d0q[<font style="color:darkorange;">0</font>]);
&#9;&#9;Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]=L[<font style="color:darkorange;">1</font>]*sin(d0q[<font style="color:darkorange;">1</font>]);
&#9;&#9;Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]=L[<font style="color:darkorange;">0</font>]*cos(d0q[<font style="color:darkorange;">0</font>]);
&#9;&#9;Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]=-L[<font style="color:darkorange;">1</font>]*cos(d0q[<font style="color:darkorange;">1</font>]);

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 1.2. Inverse Jacobian</font>
&#9;&#9;detJaco=Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]-Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]*Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>];
&#9;&#9;invJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]=Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]/detJaco;
&#9;&#9;invJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]=-Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]/detJaco;
&#9;&#9;invJaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]=-Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]/detJaco;
&#9;&#9;invJaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]=Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]/detJaco;

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 2.1. Workspace position</font>
&#9;&#9;d0x[<font style="color:darkorange;">0</font>]=L[<font style="color:darkorange;">0</font>]*cos(d0q[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*cos(d0q[<font style="color:darkorange;">1</font>]);
&#9;&#9;d0x[<font style="color:darkorange;">1</font>]=L[<font style="color:darkorange;">0</font>]*sin(d0q[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*sin(d0q[<font style="color:darkorange;">1</font>]);

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 2.2 Workspace velocity</font>
&#9;&#9;d1x[<font style="color:darkorange;">0</font>]=Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">0</font>]*d1q[<font style="color:darkorange;">0</font>]+Jaco[<font style="color:darkorange;">0</font>][<font style="color:darkorange;">1</font>]*d1q[<font style="color:darkorange;">1</font>];
&#9;&#9;d1x[<font style="color:darkorange;">1</font>]=Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">0</font>]*d1q[<font style="color:darkorange;">0</font>]+Jaco[<font style="color:darkorange;">1</font>][<font style="color:darkorange;">1</font>]*d1q[<font style="color:darkorange;">1</font>];

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 3. Command generation</font>
&#9;&#9;if(t&lt;0.5){
&#9;&#9;&#9;d0xcmd[<font style="color:darkorange;">0</font>]=d0x_init[<font style="color:darkorange;">0</font>];
&#9;&#9;&#9;d0xcmd[<font style="color:darkorange;">1</font>]=d0x_init[<font style="color:darkorange;">1</font>];
&#9;&#9;}else{
&#9;&#9;&#9;d0xcmd[<font style="color:darkorange;">0</font>]=CmdAmp*(sin(d0xcmdfreq*2.0*M_PI*(t-0.5))) +d0x_init[<font style="color:darkorange;">0</font>];
&#9;&#9;&#9;d0xcmd[<font style="color:darkorange;">1</font>]=CmdAmp*(1.0-cos(d0xcmdfreq*2.0*M_PI*(t-0.5))) +d0x_init[<font style="color:darkorange;">1</font>];
&#9;&#9;}

&#9;&#9;<font style="color:lightgreen;font-style:italic;">// 4. Reference calculation</font>
&#9;&#9;for(p=0;p&lt;mnum;p++){
&#9;&#9;&#9;d2xref[<font style="color:darkorange;">p</font>]=Kp*(d0xcmd[<font style="color:darkorange;">p</font>]-d0x[<font style="color:darkorange;">p</font>])-Kd*d1x[<font style="color:darkorange;">p</font>];
&#9;&#9;&#9;d2qref[<font style="color:darkorange;">p</font>]=invJaco[<font style="color:darkorange;">p</font>][<font style="color:darkorange;">0</font>]*d2xref[<font style="color:darkorange;">0</font>]+invJaco[<font style="color:darkorange;">p</font>][<font style="color:darkorange;">1</font>]*d2xref[<font style="color:darkorange;">1</font>];
&#9;&#9;&#9;iref[<font style="color:darkorange;">p</font>]=Jn[<font style="color:darkorange;">p</font>]/Ktn[<font style="color:darkorange;">p</font>]*d2qref[<font style="color:darkorange;">p</font>];
&#9;&#9;}

&#9;&#9;<font style="color:lightgreen;font-style:italic;">//Plant simulation</font>
&#9;&#9;for(j=0;j&lt;pcnt;j++){
&#9;&#9;&#9;for(p=0;p&lt;mnum;p++){
&#9;&#9;&#9;&#9;<font style="color:lightgreen;font-style:italic;">//Joint space</font>
&#9;&#9;&#9;&#9;d0q[<font style="color:darkorange;">p</font>]+=d1q[<font style="color:darkorange;">p</font>]*Tp;
&#9;&#9;&#9;&#9;d1q[<font style="color:darkorange;">p</font>]+=d2q[<font style="color:darkorange;">p</font>]*Tp;
&#9;&#9;&#9;&#9;torque[<font style="color:darkorange;">p</font>]=Kt[<font style="color:darkorange;">p</font>]*iref[<font style="color:darkorange;">p</font>];
&#9;&#9;&#9;&#9;d2q[<font style="color:darkorange;">p</font>]=torque[<font style="color:darkorange;">p</font>]/J[<font style="color:darkorange;">p</font>];
&#9;&#9;&#9;}
&#9;&#9;}

&#9;&#9;<font style="color:lightgreen;font-style:italic;">//Data for animation</font>
&#9;&#9;x[<font style="color:darkorange;">0</font>]=0.0;
&#9;&#9;y[<font style="color:darkorange;">0</font>]=0.0;
&#9;&#9;x[<font style="color:darkorange;">1</font>]=L[<font style="color:darkorange;">0</font>]*cos(d0q[<font style="color:darkorange;">0</font>]);
&#9;&#9;y[<font style="color:darkorange;">1</font>]=L[<font style="color:darkorange;">0</font>]*sin(d0q[<font style="color:darkorange;">0</font>]);
&#9;&#9;x[<font style="color:darkorange;">2</font>]=L[<font style="color:darkorange;">0</font>]*cos(d0q[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*cos(d0q[<font style="color:darkorange;">1</font>]);
&#9;&#9;y[<font style="color:darkorange;">2</font>]=L[<font style="color:darkorange;">0</font>]*sin(d0q[<font style="color:darkorange;">0</font>])-L[<font style="color:darkorange;">1</font>]*sin(d0q[<font style="color:darkorange;">1</font>]);

&#9;&#9;fprintf(fp,<font style="color:lightcoral;">"%e %e %e %e %e %e %e %e %e\n"</font>,
&#9;&#9;&#9;t, x[<font style="color:darkorange;">0</font>], y[<font style="color:darkorange;">0</font>], x[<font style="color:darkorange;">1</font>], y[<font style="color:darkorange;">1</font>], x[<font style="color:darkorange;">2</font>], y[<font style="color:darkorange;">2</font>], d0xcmd[<font style="color:darkorange;">0</font>], d0xcmd[<font style="color:darkorange;">1</font>]);

&#9;&#9;t+=Ts;
&#9;}

&#9;return 0;
}
        </div>
        </code></pre>

        <p>
          ヤコビ行列計算，状態観測，指令値生成，および制御入力決定の各ブロックの実装は5行程度に纏めることができる。1自由度のモータ制御と比較して大きな違いは制御入力の決定にヤコビ行列を使用する必要があることのみであり，多自由度系であっても簡単に制御することができる。
        </p>
        <p>
          このシミュレータの応答をアニメーションにするために，Pythonのプログラムを用意した。応答結果の入ったファイルを指定し，プログラムを回すとアニメーションが生成される。mp4ファイルまたはgifファイルに書き出すこともできる。
        </p>


        <pre style="line-height:150%;"><code>
        <div style="in-left:0;padding:0px 25px;margin:0;background-color:#1a1a1a;color:#FFF;border-radius:4px; overflow:auto">
<font style="color:lightgreen;"># coding: UTF-8 </font>
<font style="color:yellow;">import</font> matplotlib.pyplot <font style="color:yellow;">as</font> plt
<font style="color:yellow;">from</font> matplotlib.animation <font style="color:yellow;">import</font> FuncAnimation
<font style="color:yellow;">import</font> numpy <font style="color:yellow;">as</font> np

<font style="color:lightgreen;"> # Motion Data </font>
cnt=0
t  = 0.0
x0 = 0.0
y0 = 0.0
x1 = 0.0
y1 = 0.0
x2 = 0.0
y2 = 0.0

f = open(<font style="color:pink;">"controller/anime.dat"</font>,<font style="color:pink;">"r"</font>)

for i in f.readlines():
&#9;data = i[:-1].split(<font style="color:pink;">' '</font>)
&#9;t = <font style="color:deepskyblue;">float</font>(data[0])
&#9;x0 = np.append(x0,<font style="color:deepskyblue;">float</font>(data[1]))
&#9;y0 = np.append(y0,<font style="color:deepskyblue;">float</font>(data[2]))
&#9;x1 = np.append(x1,<font style="color:deepskyblue;">float</font>(data[3]))
&#9;y1 = np.append(y1,<font style="color:deepskyblue;">float</font>(data[4]))
&#9;x2 = np.append(x2,<font style="color:deepskyblue;">float</font>(data[5]))
&#9;y2 = np.append(y2,<font style="color:deepskyblue;">float</font>(data[6]))
&#9;cnt+=1
f.close()

INTERVAL_PLOT = 0.03
DURATION = t
FRAME_NUM = <font style="color:deepskyblue;">int</font>(DURATION/INTERVAL_PLOT)

INTERVAL_DATA = t/(cnt-1)
DECIMATION_RATE=<font style="color:deepskyblue;">int</font>(INTERVAL_PLOT/INTERVAL_DATA)

xrange = [-0.2,0.4]
yrange = [-0.2,0.4]

fig = plt.figure()
ax = fig.add_subplot(111, aspect=<font style="color:pink;">'equal'</font>, autoscale_on=<font style="color:royalblue;">False</font>, xlim = xrange, ylim = yrange)
ax.grid()

line, = plt.plot([], [], <font style="color:pink;">'ro-'</font>, animated = <font style="color:royalblue;">True</font>)

<font style="color:lightgreen;"># Animation</font>
time_template = <font style="color:pink;">'Time = %.2fs'</font>
time_label = ax.text(0.05, 0.9, <font style="color:pink;">''</font>, transform=ax.transAxes)  # position of a label

<font style="color:yellow;">def</font> init():
&#9;time_label.set_text(<font style="color:pink;">''</font>)
&#9;return line, time_label

<font style="color:yellow;">def</font> update(i):
&#9;next_x = [x0[i*DECIMATION_RATE], x1[i*DECIMATION_RATE], x2[i*DECIMATION_RATE]]
&#9;next_y = [y0[i*DECIMATION_RATE], y1[i*DECIMATION_RATE], y2[i*DECIMATION_RATE]]
&#9;line.set_data(next_x, next_y)

&#9;time_label.set_text(time_template % (i*INTERVAL_PLOT))
&#9;return line, time_label

FRAME_INTERVAL = 1000 * INTERVAL_PLOT&#9;&#9;<font style="color:gray;"># [msec] interval time between frames</font>
FPS = 1000/FRAME_INTERVAL&#9;&#9;&#9;&#9;&#9;<font style="color:gray;"># frames per second</font>
ani = FuncAnimation(fig, update, frames=FRAME_NUM, repeat=<font style="color:royalblue;">False</font>, interval=FRAME_INTERVAL, init_func=init, blit=<font style="color:royalblue;">True</font>)

plt.show()
#ani.save(<font style="color:pink;">'manipulator.mp4'</font>, fps=FPS, extra_args=[<font style="color:pink;">'-vcodec'</font>, <font style="color:pink;">'libx264'</font>])
#ani.save(<font style="color:pink;">'manipulator.gif'</font>, writer=<font style="color:pink;">'imagemagick'</font>, fps=FPS)
      </div>
      </code></pre>

      <p>
        生成されたアニメーションは以下のようになった。1秒に1回，半径50 mmの円を描くことが確認された。
      </p>

      <div class="pic-container">
        <img src="@/pic/tutorial/manipulator.gif" class="pic-manipulator-gif">
      </div>

      <ul class="footer">
        <li class="article-title-f title-sp">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-left">
          <router-link />
        </li>

        <li class="article-title-f title-center">
          <router-link class="article-link-f" to="/research">
          > TOP
          </router-link>
        </li>

        <li class="article-title-f title-right">
          <router-link class="article-link-f" to="/research/articles/tutorial/manipulation_3dof_redundant">
            > 3軸冗長マニピュレータの位置制御
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
        f_dynamics: "$$ \\begin{eqnarray} \\ddot{q}&=&\\left(I+s^{-1}J_{\\rm aco}^{-1}(q)\\dot{J}_{\\rm aco}(q)\\right)^{-1}J_{\\rm aco}^{-1}(q)f^{\\rm ref} \\\\ &=&\\left(J_{\\rm aco}(q)+s^{-1}\\dot{J}_{\\rm aco}(q)\\right)^{-1}f^{\\rm ref} \\\\ \\ddot{x}&=&\\left(J_{\\rm aco}(q)+s^{-1}\\dot{J}_{\\rm aco}(q)\\right)\\ddot{q} = f^{\\rm ref} \\end{eqnarray} $$",

        f_cinput: "$$ \\begin{eqnarray} u&=&J(q)J_{\\rm aco}^{-1}(q)\\left(f^{\\rm ref}-\\dot{J}_{\\rm aco}(q)\\dot{q}\\right) \\\\ &\\approx& J(q)J_{\\rm aco}^{-1}(q)f^{\\rm ref}   \\end{eqnarray} $$",

        f_inout: "$$ \\begin{eqnarray} f^{\\rm ref}&=&K_{\\rm p}(x^{\\rm cmd}-x)-K_{\\rm d}\\dot{x} \\\\ \\Leftrightarrow s^{2}x&=&K_{\\rm p}(x^{\\rm cmd}-x)-K_{\\rm d}sx \\\\  \\Leftrightarrow x&=&(s^2+K_{\\rm d}s+K_{\\rm p})^{-1}K_{\\rm p}x^{\\rm cmd}  \\end{eqnarray} $$",

        f_pos: "$$ \\begin{eqnarray} \\begin{bmatrix} x\\\\y \\end{bmatrix} &=& \\begin{bmatrix} l_{1}\\cos q_1-l_{2}\\cos q_2 \\\\ l_{1}\\sin q_1-l_{2}\\sin q_2 \\end{bmatrix} \\end{eqnarray} $$",

        f_vel: "$$ \\begin{eqnarray} \\begin{bmatrix} \\dot{x}\\\\ \\dot{y} \\end{bmatrix} &=& \\begin{bmatrix} -l_{1}\\sin q_1 & l_{2}\\sin q_2 \\\\ l_{1}\\cos q_1 & -l_{2}\\cos q_2 \\end{bmatrix} \\begin{bmatrix} \\dot{q}_{1}\\\\ \\dot{q}_{2} \\end{bmatrix} \\end{eqnarray} $$",

        f_kinematics: "$$ \\begin{eqnarray} H(q)&=& \\begin{bmatrix} l_{1}\\cos q_1-l_{2}\\cos q_2 \\\\ l_{1}\\sin q_1-l_{2}\\sin q_2 \\end{bmatrix} \\\\ J_{\\rm aco}(q)&=& \\begin{bmatrix} -l_{1}\\sin q_1 & l_{2}\\sin q_2 \\\\ l_{1}\\cos q_1 & -l_{2}\\cos q_2 \\end{bmatrix}\\end{eqnarray} $$",
      }
    },
  }
</script>

<style scoped>
body{
  background: #fff;
}

.article-router{
  margin:0;
  text-decoration: underline;
  color:#333;
}
.pic-workspace_acc{
  width:90%;
  max-width:520px;
  margin:10px 0 0;
}
.pic-workspace_poscon{
  width:90%;
  max-width:600px;
  margin:10px;
}
.pic-workspace_poscon_step{
  width:90%;
  max-width:660px;
  margin:10px;
}
.pic-manipulator{
  width:90%;
  max-width:240px;
  margin:10px;
}
.pic-manipulator-gif{
  width:90%;
  max-width:440px;
  margin:0px;
}
@media screen and (max-width: 640px){
  .pic-manipulator{
    width:65%;
    margin:5px;
  }
}
</style>
