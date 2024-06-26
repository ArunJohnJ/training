class MemoryTraining {
    replaceWithDashes(input) {
        let result = '';
        let newWord = true;

        for (let i = 0; i < input.length; i++) {
            const c = input[i];
            if (/\p{L}/u.test(c)) { // Match any kind of letter
                if (newWord) {
                    result += c;
                    newWord = false;
                } else {
                    result += ' _ ' + c; // Add space and then the letter
                }
            } else {
                result += c;
                newWord = true;
            }
        }
        return result;
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
