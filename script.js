class MemoryTraining {
    constructor(input) {
        this.input = input;
        // Define the regex to match each Tamil word, including standalone vowels and complex characters
        this.regex = /[\u0b80-\u0bff\u0bbe-\u0bcd\u0bd7]+/gu;
    }

    // Function to transform each matched Tamil word
    replaceWithDashes(word) {
        if (word.length > 1) {
            return word.slice(0, 2) + '-'.repeat(word.length - 2);
        }
        return word;
    }

    // Method to perform the transformation on the input string
    transform() {
        return this.input.replace(this.regex, (match) => this.transformWord(match));
    }
}

const memoryTraining = new MemoryTraining();

function updateWordCount() {
    const text = document.getElementById('inputText').value;
    const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    document.getElementById('wordCount').textContent = `Words: ${wordCount}`;
}

function processText() {
    const inputText = document.getElementById('inputText').value;
    const splitStrings = inputText.split(" ");
    const collect = splitStrings.map(word => memoryTraining.replaceWithDashes(word)).join(" ");
    document.getElementById('outputText').value = collect;
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
