// Menyimpan task ke localStorage
function saveTaskToLocalStorage(time, desc, ringtoneFile) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ time, desc, ringtoneFile });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Menambahkan task ke DOM
function addTaskToDOM(time, desc, ringtoneFile) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = 'list-group-item';

    li.innerHTML = `
        <span><strong>${time}</strong> - ${desc}</span>
        <div>
            <button class="btn btn-sm btn-primary completeTask">Done</button>
            <button class="btn btn-sm btn-danger deleteTask">Delete</button>
        </div>
    `;
    taskList.appendChild(li);

    // Menjadwalkan pengingat dengan nada dering
    scheduleTaskNotification(time, desc, ringtoneFile);
}

// Menjadwalkan pengingat dengan nada dering yang dipilih
function scheduleTaskNotification(time, desc, ringtoneFile) {
    const [hours, minutes] = time.split(':').map(Number);
    const now = new Date();
    const targetTime = new Date();
    targetTime.setHours(hours, minutes, 0, 0);

    if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1); // Pengingat besok jika waktunya sudah lewat
    }

    const delay = targetTime - now;

    setTimeout(() => {
        if (ringtoneFile) {
            const audio = new Audio(URL.createObjectURL(ringtoneFile)); // Memutar file yang dipilih
            audio.play();
        }
        // Menampilkan SweetAlert untuk pengingat
        Swal.fire({
            title: 'Task Reminder!',
            text: `Time to: ${desc}`,
            icon: 'info',
            confirmButtonText: 'Got it!'
        });
    }, delay);
}

// Event listener untuk form penambahan tugas
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const taskTime = document.getElementById('taskTime').value;
    const taskDesc = document.getElementById('taskDesc').value;
    const ringtoneFile = document.getElementById('ringtoneFile').files[0]; // Mendapatkan file nada dering yang dipilih

    if (!ringtoneFile) {
        Swal.fire({
            title: 'Error!',
            text: 'Please select a ringtone!',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return;
    }

    addTaskToDOM(taskTime, taskDesc, ringtoneFile);
    saveTaskToLocalStorage(taskTime, taskDesc, ringtoneFile);

    // Reset form after task is added
    document.getElementById('taskForm').reset();
});

// Memuat ulang task dari localStorage ketika halaman dimuat
window.onload = function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.time, task.desc, task.ringtoneFile);
    });
};
