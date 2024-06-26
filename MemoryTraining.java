import java.util.Arrays;
import java.util.stream.Collectors;

class MemoryTraining {
    public static void main(String[] args) {
        MemoryTraining memoryTraining = new MemoryTraining();
        String ab = "Hello darkness. my old friend";
        String[] splitStrings = ab.split("[ ]");
        String collect = Arrays.stream(splitStrings)
                .map(memoryTraining::replaceWithDashes)
                .collect(Collectors.joining(" "));
        System.out.println(collect);
    }

    public String replaceWithDashes(String input) {
        StringBuilder result = new StringBuilder();
        boolean newWord = true;

        for (int i = 0; i < input.length(); i++) {
            char c = input.charAt(i);
            if (Character.isLetter(c)) {
                if (newWord) {
                    result.append(c);
                    newWord = false;
                } else {
                    result.append('_');
                }
            } else {
                result.append(c);
                newWord = true;
            }
        }
        return result.toString();
    }
}
