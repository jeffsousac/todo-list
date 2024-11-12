const tarefa = document.querySelector("#tarefa"); 
const formulario = document.querySelector("#formulario"); 
const resultado = document.querySelector("#resultado"); 


function salvarTarefas() {
  const tarefas = Array.from(document.querySelectorAll(".card")).map(card => {
    return {
      texto: card.querySelector("h2").textContent,
      concluida: card.querySelector("input[type='checkbox']").checked
    };
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}


function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.sort((a, b) => a.concluida - b.concluida);
  tarefas.forEach(tarefaObj => {
    adicionarTarefa(tarefaObj.texto, tarefaObj.concluida);
  });
}


function adicionarTarefa(texto, concluida = false) {
  const card = document.createElement("div");
  card.className = "card";
  if (concluida) card.classList.add("tarefa-concluida");

  const nova_tarefa = document.createElement("h2");
  nova_tarefa.textContent = texto;

  const btn_excluir = document.createElement("img");
  btn_excluir.src = "https://cdn-icons-png.flaticon.com/512/5016/5016735.png";
  btn_excluir.className = "botaozim";

  btn_excluir.addEventListener("click", () => {
    card.classList.add("saindo");
    setTimeout(() => {
      resultado.removeChild(card);
      salvarTarefas();
    }, 300);
  });

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = concluida;
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      card.classList.add("tarefa-concluida");
    } else {
      card.classList.remove("tarefa-concluida");
    }
    salvarTarefas();
  });

  const concluir = document.createElement("label");
  concluir.textContent = "Concluir tarefa";

  card.append(nova_tarefa, btn_excluir, checkbox, concluir);
  resultado.appendChild(card);
}


formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (tarefa.value.trim() !== "") {
    adicionarTarefa(tarefa.value);
    salvarTarefas();
  }
  formulario.reset();
  tarefa.focus();
});


window.addEventListener("load", carregarTarefas);

function removerConcluidas() {
    tarefasConcluídas.forEach(card => {
        resultado.removeChild(card);
    });

    salvarTarefas();

    const btnRemoverConcluidas = document.querySelector("#btn-remover-conclidsas");
    btnRemoverConcluidas.addEventListener("click", removerConcluidas)
}


