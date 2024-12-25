// Simpan nilai default untuk reset
const defaultData = {
    name: "A Shoulder to Cry On",
    username: "@AShoulderStory",
    time: "25 Des",
    text: `"Sujud adalah tempat terdekat seorang hamba dengan Tuhannya. Perbanyaklah sujudmu agar dekat pula hatimu dengan-Nya."`,
    profilePic: "https://kioshappyio.github.io/story/profil.png",
    comments: "7000",
    retweets: "17000",
    likes: "24000"
};

function updatePost() {
    // Ambil nilai input
    const name = document.getElementById('name-input').value;
    const username = document.getElementById('username-input').value;
    const time = document.getElementById('time-input').value;
    const text = document.getElementById('text-input').value;
    const profilePic = document.getElementById('profile-pic-input').value;
    const comments = document.getElementById('comments-input').value;
    const retweets = document.getElementById('retweets-input').value;
    const likes = document.getElementById('likes-input').value;

    // Update elemen post
    document.getElementById('name').textContent = name;
    document.getElementById('username').textContent = username;
    document.getElementById('time').textContent = time;
    document.getElementById('post-text').textContent = text;
    document.getElementById('profile-pic').src = profilePic;
    document.getElementById('comments').textContent = formatNumber(comments);
    document.getElementById('retweets').textContent = formatNumber(retweets);
    document.getElementById('likes').textContent = formatNumber(likes);
}

function resetPost() {
    // Reset ke nilai default
    document.getElementById('name-input').value = defaultData.name;
    document.getElementById('username-input').value = defaultData.username;
    document.getElementById('time-input').value = defaultData.time;
    document.getElementById('text-input').value = defaultData.text;
    document.getElementById('profile-pic-input').value = defaultData.profilePic;
    document.getElementById('comments-input').value = parseInt(defaultData.comments.replace('K', '000'));
    document.getElementById('retweets-input').value = parseInt(defaultData.retweets.replace('K', '000'));
    document.getElementById('likes-input').value = parseInt(defaultData.likes.replace('K', '000'));

    // Update post dengan nilai default
    updatePost();
}

function toggleForm() {
    // Toggle form edit
    const form = document.getElementById('edit-form');
    form.classList.toggle('minimized');
}

function formatNumber(num) {
    // Format angka menjadi ribuan (K)
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return num;
}
