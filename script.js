function updateWordCount() {
    const text = document.getElementById('inputText').value;
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    document.getElementById('wordCount').textContent = `Words: ${wordCount}`;
}

function processText() {
    const inputText = document.getElementById('inputText').value;
    const tamilTransformer = new TamilTransformer(inputText);
    const collect = tamilTransformer.transform();
    document.getElementById('outputText').value = collect;
}

class TamilTransformer {
    constructor(input) {
        this.input = input;
        // Updated regex to match sequences of letters (any language) and combining marks.
        this.regex = /[\p{L}\p{M}]+/gu;
    }

    // Function to transform each matched word
    transformWord(word) {
        // Use Intl.Segmenter without specifying a locale so it works for any language.
        const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
        const graphemes = Array.from(segmenter.segment(word), segment => segment.segment);

        if (graphemes.length > 1) {
            return graphemes[0] + '-'.repeat(graphemes.length - 1);
        }
        return word;
    }

    // Method to perform the transformation on the input string
    transform() {
        return this.input.replace(this.regex, (match) => this.transformWord(match));
    }
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
