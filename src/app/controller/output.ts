import {KWICSFilter} from "./kwics-filter";
import {Line} from "../model/line";
import {Indices} from "../model/indices";
import {Characters} from "../model/characters";

export class Output{
  inputLines: Indices;
  outputLines: string[];
  charactersArray: Characters;

  private tempWords!: string[];
  private outputString!: string;

  constructor(input: Indices, output: string[], characters: Characters) {
    this.inputLines = input;
    this.outputLines = output;
    this.charactersArray = characters;
  }

  process(){
    this.inputLines.getLines().forEach((line: Line) => {
      this.tempWords = [];
      this.outputString = "";
      const first = line.getFirst();

      // get the word from characters and push to a temp array
      for(let i = 0; i < line.getOffsets().length; ++i){
        let offset = line.getOffsets()[i];

        this.tempWords.push(
          this.charactersArray.getWordByIndex(first + offset));
      }

      this.setOutputString();
    });
  }

  private setOutputString(){
    this.outputLines.push(this.tempWords.join(" "));
  }
}
