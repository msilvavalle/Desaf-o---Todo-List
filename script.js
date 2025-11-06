// Arreglo inicial con al menos 3 tareas
let tareas = [
    { id: 1, descripcion: "Estudiar JavaScript", completada: false },
    { id: 2, descripcion: "Hacer el desafío Todo List", completada: true },
    { id: 3, descripcion: "Ordenar el escritorio", completada: false },
  ];
  
  let siguienteId = 4;
  
  // Referencias al DOM
  const taskList = document.getElementById("task-list");
  const summaryBody = document.getElementById("summary-body");
  const totalTasksSpan = document.getElementById("total-tasks");
  const completedTasksSpan = document.getElementById("completed-tasks");
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  
  // --------- FUNCIONES PRINCIPALES --------- //
  
  function render() {
    renderListaTareas();
    renderResumen();
    actualizarContadores();
  }
  
  function renderListaTareas() {
    taskList.innerHTML = "";
  
    tareas.forEach((tarea) => {
      const li = document.createElement("li");
      li.classList.add("task");
      if (tarea.completada) li.classList.add("completed");
  
      li.innerHTML = `
        <span class="task-id">#${tarea.id}</span>
        <span class="task-desc">${tarea.descripcion}</span>
        <div class="task-actions">
          <button class="btn-toggle">
            ${tarea.completada ? "Desmarcar" : "Completar"}
          </button>
          <button class="btn-delete">Eliminar</button>
        </div>
      `;
  
      // Botón completar / desmarcar
      li.querySelector(".btn-toggle").addEventListener("click", () => {
        cambiarEstadoTarea(tarea.id);
      });
  
      // Botón eliminar
      li.querySelector(".btn-delete").addEventListener("click", () => {
        eliminarTarea(tarea.id);
      });
  
      taskList.appendChild(li);
    });
  }
  
  function renderResumen() {
    summaryBody.innerHTML = "";
  
    tareas.forEach((tarea) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${tarea.id}</td>
        <td>${tarea.descripcion}</td>
        <td>${tarea.completada ? "Realizada" : "Pendiente"}</td>
      `;
      summaryBody.appendChild(tr);
    });
  }
  
  function actualizarContadores() {
    const total = tareas.length;
    const realizadas = tareas.filter((t) => t.completada).length;
  
    totalTasksSpan.textContent = total;
    completedTasksSpan.textContent = realizadas;
  }
  
  // --------- ACCIONES --------- //
  
  function agregarTarea() {
    const texto = taskInput.value.trim();
    if (!texto) return;
  
    const nuevaTarea = {
      id: siguienteId++,
      descripcion: texto,
      completada: false,
    };
  
    tareas.push(nuevaTarea);
    taskInput.value = "";
    render();
  }
  
  function eliminarTarea(id) {
    tareas = tareas.filter((tarea) => tarea.id !== id);
    render();
  }
  
  function cambiarEstadoTarea(id) {
    const tarea = tareas.find((t) => t.id === id);
    if (tarea) {
      tarea.completada = !tarea.completada;
      render();
    }
  }
  
  // --------- EVENTOS --------- //
  
  addBtn.addEventListener("click", agregarTarea);
  
  // Permitir agregar con Enter
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      agregarTarea();
    }
  });
  
  // Render inicial
  render();
  