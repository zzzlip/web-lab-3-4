document.getElementById('external-status').textContent='外部 JS 文件：获取成功';
const students=[{name:'张晨',score:58},{name:'李悦',score:76},{name:'王宁',score:92},{name:'陈曦',score:65},{name:'赵航',score:84}];
document.getElementById('score-rows').innerHTML=students.map(item=>`<tr><td>${item.name}</td><td>${item.score}</td></tr>`).join('');
function calculate(){
 const line=Number(document.getElementById('pass-line').value);const passed=students.filter(item=>item.score>=line);const sum=students.reduce((total,item)=>total+item.score,0);
 document.getElementById('score-result').textContent=`总人数：${students.length}；及格：${passed.length}；不及格：${students.length-passed.length}；及格率：${(passed.length/students.length*100).toFixed(1)}%；平均分：${(sum/students.length).toFixed(1)}；最高分：${Math.max(...students.map(item=>item.score))}；及格学生：${passed.map(item=>item.name).join('、')||'无'}`;
}
document.getElementById('calculate').onclick=calculate;
document.getElementById('calculate').addEventListener('mouseenter',()=>{if(document.getElementById('hover-mode').checked)calculate();});
const output=[];const log=(label,value)=>{output.push(`${label}：${typeof value==='string'?value:JSON.stringify(value)}`);console.log(label,value);};
const PI=3.14159;let age=18;age=22;log('const 与 let',{PI,age});
log('基本类型',[typeof 'hello',typeof 100,typeof true,typeof undefined,typeof 1n,typeof Symbol('s')]);log('null 与对象',{nullValue:null,typeofNull:typeof null});
const boy={name:'James',age:19,sayYes(){return 'yes';}};log('对象方法',boy.sayYes());
let arr=['a','b','c'];arr.push('d');const removed=arr.pop();log('push 和 pop',{arr,removed});
let sum=0;for(let i=1;i<=5;i++){sum+=i;}log('for 1到5求和',sum);const loop=[];for(const item of arr){loop.push(item);}log('for of',loop);arr.forEach((value,index)=>log(`forEach ${index}`,value));
const score=76;let level;if(score>=60){level='及格';}else{level='不及格';}log('if 条件',level);
function add(a,b){return a+b;}const sub=function(a,b){return a-b;};const plus=(a,b)=>a+b;log('函数',[add(1,2),sub(30,5),plus(5,10)]);
const str=' chongqing ';log('字符串方法',{trim:str.trim(),includes:str.includes('chong'),startsWith:str.trim().startsWith('ch'),endsWith:str.trim().endsWith('ing'),split:'a,b'.split(',')});
log('数组 filter 和 map',[1,2,3,4].filter(n=>n%2===0).map(n=>n*2));log('Number 方法',{parseInt:Number.parseInt('42px',10),fixed:(3.14159).toFixed(2)});
const [first,...rest]=[14,34,23];const {name:userName,age:userAge}=boy;log('解构与剩余值',{first,rest,userName,userAge});
const name='James';const person={name,age,sayHello(){return `Hello ${this.name}`;}};log('对象简写',person.sayHello());log('扩展运算符',[...[1,2],3,4]);log('对象复制',{...boy,age:20});log('模板字符串',`商品：手机，价格：${2999}元\n${10} + ${5} = ${10+5}`);
document.getElementById('syntax-output').textContent=output.join('\n');
