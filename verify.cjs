// 运行：使用已安装 Playwright 的 Node 环境执行本文件。
let playwright;
try { playwright=require('playwright'); }
catch { playwright=require('/Users/zmh/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'); }
const {chromium}=playwright;
const http=require('http'),fs=require('fs'),path=require('path'),assert=require('assert/strict');
const root=__dirname;
const server=http.createServer((req,res)=>{const file=path.join(root,decodeURIComponent(req.url==='/'?'/index.html':req.url.split('?')[0]));if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end();}res.setHeader('Content-Type',file.endsWith('.css')?'text/css':file.endsWith('.js')?'text/javascript':'text/html; charset=utf-8');res.end(data);});});
(async()=>{
 await new Promise(resolve=>server.listen(8765,'127.0.0.1',resolve));
 const localChromium='/Users/zmh/Library/Caches/ms-playwright/chromium_headless_shell-1208/chrome-headless-shell-mac-arm64/chrome-headless-shell';
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||(fs.existsSync(localChromium)?localChromium:undefined)});const context=await browser.newContext({viewport:{width:1280,height:1000}});const page=await context.newPage();
 const errors=[];const checks=[];page.on('pageerror',e=>errors.push(e.message));const ok=name=>{checks.push(name);console.log('PASS',name);};
 await page.goto('http://127.0.0.1:8765');assert.match(await page.locator('#article-count').innerText(),/共 5 篇/);ok('初始文章动态加载5篇与空留言状态');
 await page.locator('#keyword').fill('DOM');await page.locator('#search-form button[type=submit]').click();assert.equal(await page.locator('.article').count(),1);ok('按标题搜索DOM得到1篇');
 await page.locator('#keyword').fill('不存在的文章');await page.locator('#search-form button[type=submit]').click();assert.match(await page.locator('#article-list').innerText(),/暂无/);ok('无匹配文章提示');
 await page.getByRole('button',{name:'重置',exact:true}).click();assert.equal(await page.locator('#keyword').inputValue(),'');assert.equal(await page.locator('.article').count(),5);ok('重置清空条件并恢复全部文章');
 await page.locator('#category').selectOption('CSS');await page.locator('#search-form button[type=submit]').click();assert.equal(await page.locator('.article').count(),1);ok('类别查询CSS得到1篇');
 await page.locator('#keyword').fill('DOM');await page.locator('#search-form button[type=submit]').click();assert.equal(await page.locator('.article').count(),0);ok('关键词与类别组合过滤');
 await page.getByRole('button',{name:'重置',exact:true}).click();assert.equal(await page.locator('#category').inputValue(),'');
 await page.locator('#theme-toggle').click();assert.equal(await page.locator('body').getAttribute('class'),'night');await page.mouse.move(0,0);await page.locator('#theme-toggle').click();assert.equal(await page.locator('body').getAttribute('class'),'');ok('点击按钮昼夜双向切换');
 await page.locator('.theme').hover();assert.equal(await page.locator('#theme-menu').isVisible(),true);await page.locator('[data-theme=forest]').click();assert.equal(await page.locator('body').getAttribute('class'),'forest');await page.locator('.theme').hover();await page.mouse.move(0,0);assert.equal(await page.locator('#theme-menu').isVisible(),false);ok('主题菜单移入显示移出隐藏与森林主题切换');
 await page.locator('#message-form button').click();assert.match(await page.locator('#message-status').innerText(),/请输入/);ok('空留言阻止提交');
 for(const [nickname,content] of [['实验同学','完成DOM动态渲染后，页面可以随数据更新。'],['同学乙','刷新后检查留言是否还在。']]){await page.locator('#nickname').fill(nickname);await page.locator('#message-content').fill(content);await page.locator('#message-form button').click();}
 assert.match(await page.locator('#message-count').innerText(),/2 条/);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('web-lab-message-count-v1'))),2);await page.reload();assert.equal(await page.locator('#message-list li').count(),2);ok('多条留言显示 数量存储与刷新恢复');await page.locator('#message-form').scrollIntoViewIfNeeded();
 await page.locator('#message-list button').first().click();assert.match(await page.locator('#message-count').innerText(),/1 条/);await page.reload();assert.equal(await page.locator('#message-list li').count(),1);ok('删除指定留言并持久保存');
 await page.locator('#nickname').fill('安全测试');await page.locator('#message-content').fill('<img src=x onerror=alert(1)>');await page.locator('#message-form button').click();assert.equal(await page.locator('#message-list img').count(),0);assert.match(await page.locator('#message-list').innerText(),/<img/);ok('用户留言按文本渲染');
 await page.evaluate(()=>localStorage.setItem('web-lab-messages-v1','invalid JSON'));await page.reload();assert.match(await page.locator('#message-status').innerText(),/读取失败/);ok('损坏缓存降级');
 await page.evaluate(()=>localStorage.clear());await page.reload();await page.evaluate(()=>{Storage.prototype.setItem=function(){throw new Error('quota');};});await page.locator('#nickname').fill('缓存测试');await page.locator('#message-content').fill('写入失败提示');await page.locator('#message-form button').click();assert.match(await page.locator('#message-status').innerText(),/未能保存/);ok('存储写入异常显示提示');
 await page.goto('http://127.0.0.1:8765/register.html');await page.locator('#username').focus();assert.match(await page.locator('#username-hint').innerText(),/4～12/);await page.locator('#username').fill('ab');await page.locator('#email').focus();assert.equal(await page.locator('#username').getAttribute('aria-invalid'),'true');ok('focus格式提示与blur用户名校验');
 await page.locator('button[type=submit]').click();assert.match(await page.locator('#register-status').innerText(),/提交失败/);ok('空表单提交阻止并显示错误');
 for(const [id,value] of Object.entries({username:'student_01',email:'bad-email',phone:'123',password:'onlyletters',confirm:'different'})){await page.locator('#'+id).fill(value);}
 await page.locator('button[type=submit]').click();for(const id of ['email','phone','password','confirm'])assert.equal(await page.locator('#'+id).getAttribute('aria-invalid'),'true');ok('邮箱 手机 密码格式与两次密码一致性校验');
 let registration;page.on('console',msg=>{if(msg.text().startsWith('注册表单数据'))registration=msg.text();});
 for(const [id,value] of Object.entries({email:'student@example.com',phone:'13812345678',password:'Study2026',confirm:'Study2026'})){await page.locator('#'+id).fill(value);}
 const registrationUrl=page.url();await page.locator('button[type=submit]').click();assert.match(await page.locator('#register-status').innerText(),/校验通过/);assert.ok(registration);assert.equal(page.url(),registrationUrl);ok('有效注册通过 输出控制台且无默认跳转');
 await page.locator('#password').fill('Study2027');assert.equal(await page.locator('#confirm').getAttribute('aria-invalid'),'true');ok('修改原密码后重新检查确认密码');
 await page.goto('http://127.0.0.1:8765/lab3.html');assert.match(await page.locator('#load-status').innerText(),/null.*成功/);assert.match(await page.locator('#syntax-output').innerText(),/对象方法：yes/);ok('三种JS位置与语法练习执行');
 await page.locator('#calculate').click();assert.match(await page.locator('#score-result').innerText(),/及格：4.*平均分：75.0/);await page.locator('#pass-line').selectOption('80');await page.locator('#calculate').click();assert.match(await page.locator('#score-result').innerText(),/及格：2.*40.0%/);ok('60与80分及格线统计结果');
 await page.locator('#pass-line').selectOption('70');await page.locator('#hover-mode').check();await page.mouse.move(0,0);await page.locator('#calculate').hover();assert.match(await page.locator('#score-result').innerText(),/及格：3/);ok('选做mouseenter成绩统计');
 await page.goto('http://127.0.0.1:8765');const before=await page.locator('#clock').innerText();await page.waitForTimeout(1200);assert.notEqual(await page.locator('#clock').innerText(),before);ok('setInterval时钟更新');
 await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);ok('390像素视口无水平溢出');
 assert.deepEqual(errors,[]);ok('全部页面无未捕获JavaScript错误');
 fs.writeFileSync(path.join(root,'验证结果.json'),JSON.stringify({date:new Date().toISOString(),browser:await browser.version(),passed:checks.length,checks,errors},null,2));await browser.close();server.close();
})().catch(error=>{console.error(error);server.close();process.exit(1);});
