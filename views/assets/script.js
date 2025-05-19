// Я так сделал и оно работает Как? Да хуй его знает


window.onload = function() {
    const modal = document.querySelector('.modal');
    if (modal) {
        setTimeout(() => {
            modal.classList.add('show');
        }, 1500);
    }
    
    fetchGitHubCommits();
}

document.addEventListener('DOMContentLoaded', () => {
    const closeModal = document.getElementById('close-modal');
    if (closeModal) {
        closeModal.onclick = function() {
            const modal = document.querySelector('.modal');
            modal.style.opacity = '0';
            modal.style.transform = 'translateY(20px)';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);
        };
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

function updateDateTime() {
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    
    const weekdays = ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'];
    const months = ['Янв', 'Фев', 'Мрт', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    
    const weekday = weekdays[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const dateString = `${weekday}, ${day} ${month}`;
    
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
}

const apiCache = {
    repos: null,
    commits: {},
    lastUpdate: null
};

async function fetchGitHubCommits() {
    const username = "koo0ki    "; 
    const commitCountElement = document.getElementById('commit-count');
    
    if (!commitCountElement) return;
    
    try {
        commitCountElement.innerHTML = '<span class="loading-dot">•</span><span class="loading-dot">•</span><span class="loading-dot">•</span>';
        
        const now = new Date();
        const cacheExpired = !apiCache.lastUpdate || (now - apiCache.lastUpdate) > 3600000;
        
        let repos;
        if (cacheExpired || !apiCache.repos) {
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
            repos = await reposResponse.json();
            apiCache.repos = repos;
            apiCache.lastUpdate = now;
        } else {
            repos = apiCache.repos;
        }
        
        let totalCommits = 0;
        const commitPromises = [];
        
        for (const repo of repos) {
            if (!repo.fork) {
                if (!cacheExpired && apiCache.commits[repo.name]) {
                    totalCommits += apiCache.commits[repo.name];
                    continue;
                }
                
                const commitsUrl = repo.commits_url.replace('{/sha}', '');
                
                const commitPromise = fetch(commitsUrl)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Ошибка HTTP для ${repo.name}: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(commits => {
                        if (Array.isArray(commits)) {
                            // Деньги
                            apiCache.commits[repo.name] = commits.length;
                            totalCommits += commits.length;
                        }
                    })
                    .catch(error => {
                        console.error(`[Github ERROR] > Ошибка при получении коммитов:`, error);
                    });
                
                commitPromises.push(commitPromise);
            }
        }
        
        await Promise.all(commitPromises);
        
        localStorage.setItem('githubCommitCount', totalCommits);
        localStorage.setItem('githubLastUpdate', now.toString());
        
        commitCountElement.textContent = totalCommits;
        
        commitCountElement.classList.add('stat-value-animated');
    } catch (error) {
        console.error('[Github ERROR] > Ошибка при получении данных с GitHub:', error);
        
        // Кэшированное localStorage
        const cachedCommitCount = localStorage.getItem('githubCommitCount');
        if (cachedCommitCount) {
            commitCountElement.textContent = cachedCommitCount;
            commitCountElement.title = "Кэшированные данные: " + 
                new Date(localStorage.getItem('githubLastUpdate')).toLocaleString();
        } else {
            commitCountElement.textContent = '???';
        }
    }
}
