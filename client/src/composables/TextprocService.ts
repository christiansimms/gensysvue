// Allowed commands.
import { guessTable } from './dbschema';
import { dumbSplit, xml2json } from './utils';

const commands = {
  splitLines: (text: string) => {
    return dumbSplit(text, '\n');
  },
  splitTabs: (text: string) => {
    return dumbSplit(text, '\t');
  },
  parseJSON: (text: string) => {
    return JSON.parse(text);
  },
  parseXML: (text: string) => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(text, 'application/xml');

    // This is the crazy way to detect errors
    //   https://stackoverflow.com/questions/11563554/how-do-i-detect-xml-parsing-errors-when-using-javascripts-domparser-in-a-cross
    const parsererrorNS = parser
      .parseFromString('INVALID', 'application/xml')
      .getElementsByTagName('parsererror')[0].namespaceURI;
    if (dom.getElementsByTagNameNS(parsererrorNS, 'parsererror').length > 0) {
      throw new Error('Error parsing XML');
    }

    return xml2json(dom);
  },
};

const nonRecursiveCommands = {
  displayAsTable: (val: any) => {
    return {
      _type: 'jsonTable',
      table: val,
    };
  },

  guessTable: (val: any) => {
    return guessTable(val);
  },
};

export function getProcs(): string[] {
  return ([] as string[]).concat(
    Object.keys(commands),
    Object.keys(nonRecursiveCommands),
  );
}
