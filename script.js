function updateWordCount() {
    const text = document.getElementById('inputText').value;
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    document.getElementById('wordCount').textContent = `Words: ${wordCount}`;
}

function transformWord(word) {
    // Use Intl.Segmenter to split the word into grapheme clusters.
    const segmenter = new Intl.Segmenter('ta', { granularity: 'grapheme' });
    const graphemes = Array.from(segmenter.segment(word), segment => segment.segment);
    
    if (graphemes.length > 1) {
        return graphemes[0] + '-'.repeat(graphemes.length - 1);
    }
    return word;
}


function copyToClipboard() {
    const outputText = document.getElementById('outputText');
    outputText.select();
    outputText.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");

    // Show copy notification
    const copyNotification = document.getElementById('copyNotification');
    copyNotification.style.display = 'block';
    
    // Hide notification after 2 seconds
    setTimeout(() => {
        copyNotification.style.display = 'none';
    }, 2000);
}

function clearText() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
    document.getElementById('wordCount').textContent = 'Words: 0';
}
