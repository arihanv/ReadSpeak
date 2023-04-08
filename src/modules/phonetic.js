import {soundex} from 'soundex-code'
import compromise from 'compromise';

const handleCompareClick = (word1, word2) => {
    let match = false;
    // Convert words to lowercase and remove any punctuation
    const cleanWord1 = compromise(word1.toLowerCase()).normalize().out('text');
    const cleanWord2 = compromise(word2.toLowerCase()).normalize().out('text');

    // Compare the Soundex codes of the two words
    if (soundex(cleanWord1) === soundex(cleanWord2)) {
      match = true;
    } else {
      match = false;
    }
    return match
}

export default handleCompareClick;