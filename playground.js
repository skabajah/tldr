// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // ========== CONFIG ==========
    const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxgX9FA9W90Kz5a4lqXWjA0wDlkS4KLrukEwAmnPxIZAyHSrTVUOSpMGxsB8doU4LuJ/exec';
    
    // ========== STATE ==========
    let currentTone = 'tone1';
    let currentLanguage = 'english';
    let currentSummaryPlain = '';
    let isProcessing = false;

    // ========== DOM ELEMENTS ==========
    const mainInput = document.getElementById('mainInput');
    const summaryDiv = document.getElementById('summaryContent');
    const copyBtn = document.getElementById('copyBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const settingsBtn = document.getElementById('settingsBtn');
    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('langMenu');
    const toast = document.getElementById('toast');
    const addressBar = document.getElementById('addressBar');
    const toneTabs = document.querySelectorAll('.mode-tab');

    // ========== CALL APPS SCRIPT ==========
    async function callSummarizer(text, language, tone) {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, language, length: 'medium', tone, source_lang_flag: '', url: '' })
        });
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        if (data.summary) {
            try { const parsed = JSON.parse(data.summary); return parsed.ordered_list || data.summary; }
            catch(e) { return data.summary; }
        }
        throw new Error('No summary received');
    }

    // ========== DISPLAY ==========
    function showLoading() {
        summaryDiv.innerHTML = `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 200px; gap: 16px;"><div style="width: 40px; height: 40px; border: 3px solid var(--gray); border-top-color: var(--blue); border-radius: 50%; animation: spin 0.8s linear infinite;"></div><p>Summarizing...</p></div>`;
    }

    function displaySummary(summary, error) {
        if (error) { summaryDiv.innerHTML = `<p style="color: var(--red); padding: 16px;">Error: ${error}</p>`; currentSummaryPlain = ''; return; }
        const formatted = summary.split('\n').filter(p => p.trim()).map(p => `<p>${p}</p>`).join('');
        summaryDiv.innerHTML = formatted;
        currentSummaryPlain = summary.replace(/<[^>]*>/g, '');
        if (currentLanguage === 'arabic') summaryDiv.style.direction = 'rtl';
        else summaryDiv.style.direction = 'ltr';
    }

    function showToastMessage(msg) {
        toast.textContent = msg;
        toast.style.opacity = '1';
        setTimeout(() => { toast.style.opacity = '0'; }, 1500);
    }

    // ========== SUMMARIZE TEXT ==========
    async function summarizeText(text) {
        if (!text || text.trim().length === 0) return;
        if (text.length < 50) {
            displaySummary(null, 'Please provide at least 50 characters');
            return;
        }
        if (isProcessing) return;
        isProcessing = true;
        showLoading();
        try {
            const summary = await callSummarizer(text, currentLanguage, currentTone);
            displaySummary(summary, null);
        } catch(err) { displaySummary(null, err.message); }
        finally { isProcessing = false; }
    }

    // ========== HANDLE INPUT (TEXT ONLY - NO URL FETCHING) ==========
    function handleInput(value) {
        const trimmed = value.trim();
        if (trimmed === '') return;
        summarizeText(trimmed);
    }

    // ========== AUTO-SUMMARIZE ON PASTE ==========
    mainInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            handleInput(mainInput.value);
        }, 10);
    });

    mainInput.addEventListener('input', () => {
        clearTimeout(window.inputTimeout);
        window.inputTimeout = setTimeout(() => {
            if (mainInput.value.trim().length > 50) {
                handleInput(mainInput.value);
            }
        }, 800);
    });

    // ========== ADDRESS BAR (DISPLAY ONLY, NO FETCH) ==========
    addressBar.textContent = 'tl-dr.store';
    addressBar.setAttribute('contenteditable', 'false');

    // ========== REFRESH ==========
    refreshBtn.onclick = () => {
        if (mainInput.value.trim()) handleInput(mainInput.value);
        else showToastMessage('Nothing to refresh');
    };

    // ========== COPY ==========
    copyBtn.onclick = () => {
        if (currentSummaryPlain) {
            navigator.clipboard.writeText(currentSummaryPlain);
            showToastMessage('Copied!');
        } else showToastMessage('Nothing to copy');
    };

    // ========== SETTINGS ==========
    settingsBtn.onclick = () => {
        showToastMessage(`Tone: ${currentTone === 'tone1' ? 'Professional' : currentTone === 'tone2' ? 'RuPaul' : 'Trump'} · Language: ${currentLanguage}`);
    };

    // ========== TONE TABS ==========
    function updateActiveTone() {
        const colors = { tone1: 'var(--yellow)', tone2: 'var(--blue)', tone3: 'var(--red)' };
        toneTabs.forEach(tab => {
            const icon = tab.querySelector('.material-symbols-outlined');
            const label = tab.querySelector('span:last-child');
            if (tab.dataset.tone === currentTone) {
                tab.style.background = colors[currentTone];
                icon.style.color = 'white';
                label.style.color = 'white';
            } else {
                tab.style.background = 'transparent';
                icon.style.color = '#94a3b8';
                label.style.color = 'var(--dark)';
            }
        });
    }

    toneTabs.forEach(tab => {
        tab.onclick = () => {
            currentTone = tab.dataset.tone;
            updateActiveTone();
            if (mainInput.value.trim()) handleInput(mainInput.value);
        };
    });

    // ========== LANGUAGE DROPDOWN ==========
    langBtn.onclick = (e) => { e.stopPropagation(); langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block'; };
    document.addEventListener('click', () => { langMenu.style.display = 'none'; });
    langMenu.querySelectorAll('a').forEach(link => {
        link.onclick = (e) => {
            e.preventDefault();
            currentLanguage = link.dataset.lang;
            langMenu.style.display = 'none';
            showToastMessage(`Language: ${link.textContent.trim()}`);
            if (mainInput.value.trim()) handleInput(mainInput.value);
        };
    });

    // ========== SAVE PREFS ==========
    function savePrefs() {
        localStorage.setItem('tldr_tone', currentTone);
        localStorage.setItem('tldr_language', currentLanguage);
    }
    setInterval(savePrefs, 1000);

    const savedTone = localStorage.getItem('tldr_tone');
    if (savedTone) currentTone = savedTone;
    const savedLang = localStorage.getItem('tldr_language');
    if (savedLang) currentLanguage = savedLang;
    updateActiveTone();

});
