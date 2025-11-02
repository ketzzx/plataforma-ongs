// scripts.js
document.addEventListener('DOMContentLoaded', function(){
  // atualiza ano no footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // máscara básica para CPF, telefone e CEP
  function setMask(el, maskFn){
    el.addEventListener('input', function(e){
      const pos = el.selectionStart;
      const old = el.value;
      el.value = maskFn(old);
      // tenta restaurar cursor (simples)
      el.selectionStart = el.selectionEnd = pos;
    });
  }

  const cpf = document.getElementById('cpf');
  if (cpf){
    setMask(cpf, function(v){
      v = v.replace(/\D/g,'').slice(0,11);
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})(\d)/,'$1.$2');
      v = v.replace(/(\d{3})(\d{1,2})$/,'$1-$2');
      return v;
    });
  }

  const telefone = document.getElementById('telefone');
  if (telefone){
    setMask(telefone, function(v){
      v = v.replace(/\D/g,'').slice(0,11);
      v = v.replace(/^(\d{2})(\d)/,'($1) $2');
      v = v.replace(/(\d{5})(\d)/,'$1-$2');
      return v;
    });
  }

  const cep = document.getElementById('cep');
  if (cep){
    setMask(cep, function(v){
      v = v.replace(/\D/g,'').slice(0,8);
      v = v.replace(/(\d{5})(\d)/,'$1-$2');
      return v;
    });
  }

  // validação adicional: exibe mensagens simples (pode ser substituído/estendido)
  const form = document.getElementById('cadastroForm');
  if (form){
    form.addEventListener('submit', function(e){
      if (!form.checkValidity()){
        e.preventDefault();
        form.reportValidity();
      } else {
        e.preventDefault();
        // aqui normalmente enviaria por AJAX ou redirecionaria; para exercício, mostramos alerta
        alert('Cadastro validado (exercício). Substitua por envio real no servidor ou integração de pagamento.');
        form.reset();
      }
    });
  }
});
