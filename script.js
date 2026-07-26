// TaskFlow — vanilla JS interactivity
// Handles: adding/removing/completing tasks, filtering, progress ring, mobile nav.

document.getElementById('year').textContent = new Date().getFullYear();

const STORAGE_KEY = 'taskflow-tasks';

/** @type {{id:number, text:string, done:boolean}[]} */
let tasks = loadTasks();
let currentFilter = 'all';

const taskListEl = document.getElementById('taskList');
const emptyStateEl = document.getElementById('emptyState');
const addTaskForm = document.getElementById('addTaskForm');
const taskInput = document.getElementById('taskInput');
const ringFill = document.getElementById('ringFill');
const progressPercent = document.getElementById('progressPercent');
const filterButtons = document.querySelectorAll('.filter-btn');

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : seedTasks();
  } catch {
    return seedTasks();
  }
}

function seedTasks() {
  return [
    { id: 1, text: 'Sketch the wireframe for the dashboard', done: true },
    { id: 2, text: 'Pick the type scale and palette', done: true },
    { id: 3, text: 'Build the responsive grid shell', done: false },
    { id: 4, text: 'Wire up task interactions with JS', done: false },
  ];
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    /* storage unavailable — app still works in-memory */
  }
}

function render() {
  const visible = tasks.filter((t) => {
    if (currentFilter === 'active') return !t.done;
    if (currentFilter === 'done') return t.done;
    return true;
  });

  taskListEl.innerHTML = '';
  emptyStateEl.hidden = visible.length > 0;

  visible.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');
    li.dataset.id = String(task.id);

    const check = document.createElement('button');
    check.className = 'task-check';
    check.setAttribute('aria-label', task.done ? 'Mark as not done' : 'Mark as done');
    check.addEventListener('click', () => toggleTask(task.id));

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.text;

    const remove = document.createElement('button');
    remove.className = 'task-remove';
    remove.setAttribute('aria-label', 'Delete task');
    remove.textContent = '✕';
    remove.addEventListener('click', () => removeTask(task.id));

    li.append(check, text, remove);
    taskListEl.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  const circumference = 326.7;
  const offset = circumference - (pct / 100) * circumference;
  ringFill.style.strokeDashoffset = String(offset);
  progressPercent.textContent = pct + '%';
}

function toggleTask(id) {
  tasks = tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  saveTasks();
  render();
}

function removeTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

function addTask(text) {
  const id = Date.now();
  tasks = [...tasks, { id, text, done: false }];
  saveTasks();
  render();
}

addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = taskInput.value.trim();
  if (!value) return;
  addTask(value);
  taskInput.value = '';
  taskInput.focus();
});

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

render();
