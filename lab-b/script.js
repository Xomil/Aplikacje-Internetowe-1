class Todo {
    constructor() {
        
            
        const defaultTasks = [
            { text: 'Zadanie 1', date: '2024-10-31' },
            { text: 'Zadanie 2', date: '2024-11-01' },
            { text: 'Zadanie 3', date: '2024-11-02' }
        ];
        localStorage.setItem('tasks', JSON.stringify(defaultTasks)); 
        
    
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
        this.taskContainer = document.getElementById('taskContainer');
        this.searchInput = document.getElementById('search');
    

        this.draw();
        document.getElementById('addTaskBtn').addEventListener('click', () => this.addTask());
        this.searchInput.addEventListener('input', () => this.draw());
    }
    

    draw() {
        this.taskContainer.innerHTML = ''; 
    
        const query = this.searchInput.value.toLowerCase();
        const filteredTasks = query.length >= 2
            ? this.tasks.filter(task => task.text.toLowerCase().includes(query))
            : this.tasks;
    
        filteredTasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
    
            const highlightedText = this.highlightSearchText(task.text, query);
            
            taskElement.innerHTML = `
                <span class="task-text">${highlightedText}</span>
                <span class="task-date">${task.date || ''}</span>
                <button class="delete-btn">Usuń</button>
            `;
    
            taskElement.querySelector('.delete-btn').addEventListener('click', () => this.deleteTask(index));
    
            this.taskContainer.appendChild(taskElement);
        });
    }
    
    
    highlightSearchText(text, query) {
        if (!query) return text; 

        const regex = new RegExp(`(${query})`, 'gi'); 
        return text.replace(regex, '<span class="highlight">$1</span>'); 
    }

    
    addTask() {
        const taskInput = document.getElementById('taskInput');
        const taskDate = document.getElementById('taskDate');
        const text = taskInput.value.trim();
        const date = taskDate.value;

        if (this.isValidTask(text, date)) {
            this.tasks.push({ text, date });
            this.saveTasks(); 
            taskInput.value = '';
            taskDate.value = '';
            this.draw();
        }
    }

    
    isValidTask(text, date) {
        if (text.length < 3 || text.length > 255) {
            alert('Zadanie musi zawierać od 3 do 255 znaków.');
            return false;
        }
        const today = new Date().toISOString().split('T')[0];
        if (date && date < today) {
            alert('Data musi być pusta lub w przyszłości.');
            return false;
        }
        return true;
    }

    
    editTask(index) {
        const currentTask = this.tasks[index];
        const newText = prompt('Edytuj zadanie:', currentTask.text);
        const newDate = prompt('Edytuj datę (YYYY-MM-DD):', currentTask.date);

        if (newText && this.isValidTask(newText.trim(), newDate)) {
            this.tasks[index].text = newText.trim();
            this.tasks[index].date = newDate || ''; 
            this.saveTasks(); 
            this.draw();
        }
    }

    
    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.saveTasks(); 
        this.draw();
    }

    
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const todoApp = new Todo();
});
