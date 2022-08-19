import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// Bull = guess has no letters in right spot
// Cow = guess has letter in right spot
export class AppComponent {
 @ViewChild("guessInput") guessInput: ElementRef | undefined;
  title = 'BullCow';
  guessHistory: GuessResult[] = [];
  score: number = 0;
  correctWord = WordList.wordList[this.randomIntFromInterval(0, WordList.wordList.length -1)];

  guessWord() {
    console.log(this.correctWord);
    const currentGuess = this.guessInput?.nativeElement.value;
    if (currentGuess == null || (currentGuess.length <3 || currentGuess.length >3 )) {
      return;
    }

    const guessResult = this.compareWord(currentGuess.toUpperCase(), this.correctWord.toUpperCase());
    if (guessResult.numOfBulls != 3) {
      if (this.guessHistory.length >=4) {
      this.guessHistory.pop();
      }
      this.guessHistory.unshift(guessResult);
    }else{
      this.score++;
      this.correctWord = WordList.wordList[this.randomIntFromInterval(0, WordList.wordList.length -1)];;
      this.guessHistory = [];
    }
  }

  compareWord(wordToCompare: String, correctWord: String): GuessResult {
   const charArrToCompare = wordToCompare.split('');
   let charArrCorrectWord = correctWord.split('');
   let numOfCows = 0;
   let numOfBulls = 0;

  // check for bulls
   charArrToCompare.forEach((compareChar,x) => {
     if (charArrCorrectWord[x] == compareChar) {
       numOfBulls++;
       charArrCorrectWord[x] = '#';
       charArrToCompare[x] = '#';

     }
   });

     // check for cows
     charArrToCompare.forEach((compareChar, x) => {
       charArrCorrectWord.forEach(correctChar => {
         // Make sure not a bull
          if (compareChar != '#' && correctChar != '#') {
            if (compareChar == correctChar) {
              numOfCows++;
            }
          }
       })
     });

   return new GuessResult(wordToCompare, numOfBulls, numOfCows);
  }

  randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

}


class GuessResult {
  guess: String = "";
  numOfBulls: number= 0;
  numOfCows: number = 0;

  constructor(guess: String, numofBulls: number, numOfCows: number) {
    this.numOfBulls = numofBulls;
    this.numOfCows = numOfCows;
    this.guess = guess;
  }
}

class WordList {
 static wordList = ["aba", "abs", "ace", "act", "add", "ado", "aft", "age", "ago", "aha", "aid", "aim", "air", "ala",
    "ale", "all", "alt", "amp", "ana", "and", "ant", "any", "ape", "app", "apt", "arc", "are", "ark", "arm", "art",
    "ash", "ask", "asp", "ass", "ate", "ave", "awe", "axe", "aye", "BAA", "bad", "bag", "ban", "bar", "bat", "bay", "bed",
    "bee", "beg", "bel", "ben", "bet", "bid", "big", "bin", "bio", "bis", "bit", "biz", "bob", "bog", "boo", "bow", "box", "boy",
    "bra", "bud", "Bug", "bum", "bun", "bus", "but", "buy", "bye", "cab", "cad", "cam", "can", "cap", "car", "cat", "chi", "cob", "cod",
    "col", "con", "coo", "cop", "cor", "cos", "cot", "cow", "cox", "coy", "cry", "cub", "cue", "cum", "cup", "cut", "dab", "dad", "dal",
    "dam", "dan", "day", "Dee", "def", "del", "den", "dew", "did", "die", "dig", "dim", "din", "dip", "dis", "doc", "doe", "dog", "don",
    "dot", "dry", "dub", "due", "dug", "dun", "duo", "dye", "ear", "eat", "ebb", "ecu", "eft", "egg", "ego", "elf", "elm", "emu", "end",
    "era", "eta", "eve", "eye", "fab", "fad", "fan", "far", "fat", "fax", "fay", "fed", "fee", "fen", "few", "fig", "fin", "fir", "fit",
    "fix", "flu", "fly", "foe", "fog", "for", "fox", "fry", "fun", "fur", "gag", "gal", "gap", "gas", "gay", "gee", "gel", "gem", "get",
    "gig", "gin", "god", "got", "gum", "gun", "gut", "guy", "gym", "had", "ham", "has", "hat", "hay", "hem", "hen", "her", "hey", "hid",
    "him", "hip", "his", "hit", "hog", "hon", "hop", "hot", "how", "hub", "hue", "hug", "huh", "hum", "hut", "ice", "icy", "igg", "ill",
    "imp", "ink", "inn", "ion", "its", "ivy", "jam", "jar", "jaw", "jay", "jet", "jew", "job", "joe", "jog", "joy", "jug", "jun", "kay",
    "ken", "key", "kid", "kin", "kit", "lab", "lac", "lad", "lag", "lam", "lap", "law", "lax", "lay", "lea", "led", "Lee", "leg", "les",
    "let", "lib", "lid", "lie", "lip", "lit", "log", "lot", "low", "mac", "mad", "mag", "man", "map", "mar", "mas", "mat", "max", "may", "med",
    "meg", "men", "Met", "mid", "mil", "mix", "mob", "mod", "mol", "mom", "mon", "mop", "mot", "mud", "mug", "mum", "nab", "nah", "nan", "nap",
    "nay", "neb", "neg", "net", "new", "nil", "nip", "nod", "nor", "nos", "not", "now", "nun", "nut", "oak", "odd", "off", "oft", "oil", "old",
    "ole", "one", "ooh", "opt", "orb", "ore", "our", "out", "owe", "owl", "own", "pac", "pad", "pal", "pam", "pan", "pap", "par", "pas", "pat",
    "paw", "pay", "pea", "peg", "pen", "pep", "per", "pet", "pew", "phi", "pic", "pie", "pig", "pin", "pip", "pit", "ply", "pod", "pol", "pop",
    "pot", "pro", "psi", "pub", "pup", "put", "rad", "rag", "raj", "ram", "ran", "rap", "rat", "raw", "ray", "red", "ref", "reg", "rem", "rep",
    "rev", "rib", "rid", "rig", "rim", "rip", "rob", "rod", "roe", "rot", "row", "rub", "rue", "rug", "rum", "run", "rye", "sab", "sac", "sad", "sae", "sag", "sal", "sap", "sat", "saw", "say", "sea", "sec", "see", "sen", "set", "sew", "sex", "she", "shy", "sic", "sim", "sin", "sip", "sir", "sis", "sit", "six", "ski", "sky", "sly", "sod", "sol", "son", "sow", "soy", "spa", "spy", "sub", "sue", "sum", "sun", "sup", "tab", "tad", "tag", "tam", "tan", "tap", "tar", "tat", "tax", "tea", "ted", "tee", "ten", "the", "thy", "tie", "tin", "tip", "tod", "toe", "tom", "ton", "too", "top", "tor", "tot", "tow", "toy", "try", "tub", "tug", "two", "use", "van", "vat", "vet", "via", "vie", "vow", "wan", "war", "was", "wax", "way", "web", "wed", "wee", "wet", "who", "why", "wig", "win", "wis", "wit", "won", "woo", "wow", "wry", "wye", "yen", "yep", "yes", "yet", "you", "zip", "zoo"]
}
