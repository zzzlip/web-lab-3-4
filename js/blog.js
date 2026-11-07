// 实验4：模拟文章使用模板字符串与 innerHTML，用户输入使用 textContent。
function renderData(data=articles){
 document.getElementById('article-count').textContent=`共 ${data.length} 篇 / 全部 ${articles.length} 篇`;
 document.getElementById('article-list').innerHTML=data.length?data.map(article=>`<article class="article"><div class="tag">${article.category} · ${article.date}</div><h3>${article.title}</h3><p class="muted">${article.summary}</p></article>`).join(''):'<p class="muted">暂无符合条件的文章</p>';
}
document.getElementById('search-form').addEventListener('submit',event=>{
 event.preventDefault();
 const keyword=document.getElementById('keyword').value.trim().toLowerCase();
 const category=document.getElementById('category').value;
 renderData(articles.filter(article=>article.title.toLowerCase().includes(keyword)&&(!category||article.category===category)));
});
document.getElementById('search-form').addEventListener('reset',()=>renderData(articles));
const MESSAGE_KEY='web-lab-messages-v1';
const COUNT_KEY='web-lab-message-count-v1';
const statusElement=document.getElementById('message-status');
function saveToLocal(key,value){localStorage.setItem(key,JSON.stringify(value));}
function getFromLocal(key,fallback){const value=localStorage.getItem(key);return value===null?fallback:JSON.parse(value);}
let messages=[];
try {
 const cached=getFromLocal(MESSAGE_KEY,[]);
 if(!Array.isArray(cached))throw new Error('留言格式错误');
 messages=cached.filter(item=>item&&typeof item.messageId==='string'&&typeof item.username==='string'&&typeof item.content==='string');
}catch(error){statusElement.textContent='本地留言读取失败，当前从空列表开始。';statusElement.className='hint error';}
function persistMessages(){
 try{saveToLocal(MESSAGE_KEY,messages);saveToLocal(COUNT_KEY,messages.length);return true;}
 catch(error){statusElement.textContent='当前留言已显示，但浏览器未能保存；刷新后可能丢失。';statusElement.className='hint error';return false;}
}
function renderMessage(){
 const list=document.getElementById('message-list');list.replaceChildren();
 document.getElementById('message-count').textContent=`共 ${messages.length} 条`;
 if(!messages.length){const empty=document.createElement('li');empty.textContent='暂无留言，欢迎发表第一条。';list.append(empty);}
 messages.forEach(message=>{
  const li=document.createElement('li');const name=document.createElement('strong');const content=document.createElement('p');const button=document.createElement('button');
  name.textContent=message.username;content.textContent=message.content;button.type='button';button.className='secondary';button.textContent='删除';button.setAttribute('aria-label',`删除 ${message.username} 的留言`);
  button.addEventListener('click',()=>{messages=messages.filter(item=>item.messageId!==message.messageId);renderMessage();if(persistMessages()){statusElement.textContent='留言已删除并保存。';statusElement.className='hint success';}});
  li.append(name,button,content);list.append(li);
 });
}
document.getElementById('message-form').addEventListener('submit',event=>{
 event.preventDefault();const username=document.getElementById('nickname').value.trim();const content=document.getElementById('message-content').value.trim();
 if(!username||!content||username.length>20||content.length>300){statusElement.textContent='请输入1～20字昵称和1～300字留言，不能只输入空格。';statusElement.className='hint error';return;}
 messages.push({messageId:crypto.randomUUID(),username,content});renderMessage();
 if(persistMessages()){statusElement.textContent='留言发表成功，已保存到本地。';statusElement.className='hint success';}
 event.target.reset();
});
function updateClock(){document.getElementById('clock').textContent=`当前时间：${new Date().toLocaleString('zh-CN',{hour12:false})}`;}
renderData();renderMessage();updateClock();setInterval(updateClock,1000);
