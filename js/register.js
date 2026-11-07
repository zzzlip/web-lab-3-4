const rules={
 username:{hint:'4～12位字母、数字或下划线',pattern:/^\w{4,12}$/},
 email:{hint:'请输入有效邮箱，例如 student@example.com',pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/},
 phone:{hint:'以1开头的11位数字',pattern:/^1\d{10}$/},
 password:{hint:'8～20位字母和数字，且必须同时包含两者',pattern:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/},
 confirm:{hint:'再次输入密码，必须与密码完全一致'}
};
function validateField(id){
 const input=document.getElementById(id);const hint=document.getElementById(`${id}-hint`);const value=(id==='password'||id==='confirm')?input.value:input.value.trim();
 let error='';
 if(!value)error='此项不能为空';
 else if(id==='confirm'){if(value!==document.getElementById('password').value)error='两次输入的密码不一致';}
 else if(!rules[id].pattern.test(value))error=rules[id].hint;
 input.setAttribute('aria-invalid',String(Boolean(error)));hint.textContent=error||'格式正确';hint.className=`hint ${error?'error':'success'}`;return !error;
}
Object.keys(rules).forEach(id=>{
 const input=document.getElementById(id);
 input.addEventListener('focus',()=>{document.getElementById(`${id}-hint`).textContent=rules[id].hint;document.getElementById(`${id}-hint`).className='hint';});
 input.addEventListener('blur',()=>validateField(id));
});
document.getElementById('password').addEventListener('input',()=>{if(document.getElementById('confirm').value)validateField('confirm');});
document.getElementById('register-form').addEventListener('submit',event=>{
 event.preventDefault();const checks=Object.keys(rules).map(validateField);const status=document.getElementById('register-status');
 if(checks.every(Boolean)){
  const data=Object.fromEntries(new FormData(event.target));data.username=data.username.trim();data.email=data.email.trim();data.phone=data.phone.trim();
  console.log('注册表单数据（仅供本地实验）',data);status.textContent='校验通过，表单数据已输出到控制台。本页面未连接注册服务。';status.className='hint success';
 }else{status.textContent='提交失败，请修改标红的输入项。';status.className='hint error';document.querySelector('[aria-invalid="true"]').focus();}
});
