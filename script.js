class MemoryTraining {
    replaceWithDashes(input) {
        let result = '';
        let newWord = true;

        for (let i = 0; i < input.length; i++) {
            const c = input[i];
            if (/[a-zA-Z]/.test(c)) {
                if (newWord) {
                    result += c;
                    newWord = false;
                } else {
                    result += '_';
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
    alert("Copied to clipboard: " + outputText.value);
}
