class MemoryTraining {
    replaceWithDashes(input) {
        let result = '';
        let newWord = true;

        // Regular expression to match the first Tamil character of each word
        const regex = /\b([\u0b80-\u0bff][\u0bbe-\u0bcd\u0bd7]?)/gu;

        let match;
        let index = 0;

        while ((match = regex.exec(input)) !== null) {
            // Append non-Tamil characters before the match
            result += input.substring(index, match.index);
            // Append the matched Tamil character or sequence
            result += match[1];
            // Update index to continue from the end of the match
            index = regex.lastIndex;
        }

        // Append any remaining non-Tamil characters after the last match
        result += input.substring(index);

        return result.trim(); // Trim extra spaces at the beginning and end
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
