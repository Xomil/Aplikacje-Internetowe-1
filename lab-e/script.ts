interface AppState {
    currentStyle: string;
    styles: Record<string, string>;
}

const appState: AppState = {
    currentStyle: '',
    styles: {
        'Styl 1': './styles/page1.css',
        'Styl 2': './styles/page2.css',
        'Styl 3': './styles/page3.css',
    },
};

function changeStyle(styleName: string): void {
    console.log(`Attempting to change style to: ${styleName}`);
    const stylePath = appState.styles[styleName];
    if (!stylePath) {
        console.error(`Style "${styleName}" not found.`);
        return;
    }

    const existingLink = document.querySelector('link[data-app-style]');
    if (existingLink) {
        console.log('Removing existing style.');
        existingLink.remove();
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = stylePath;
    link.setAttribute('data-app-style', 'true');
    document.head.appendChild(link);

    appState.currentStyle = styleName;
    console.log(`Style successfully changed to: ${styleName}`);
}

function generateStyleLinks(): void {
    const container = document.getElementById('style-links');
    if (!container) {
        console.error('Container for style links not found.');
        return;
    }

    container.innerHTML = '';
    for (const styleName of Object.keys(appState.styles)) {
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = styleName;
        link.onclick = (event) => {
            event.preventDefault();
            changeStyle(styleName);
        };
        container.appendChild(link);
        container.appendChild(document.createElement('br'));
    }
}

function initApp(): void {
    generateStyleLinks();
    changeStyle('Styl 1'); // Domyślny styl
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}