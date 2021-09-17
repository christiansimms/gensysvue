// Allowed commands.
import { guessTable } from './dbschema';
import { deepApply, dumbSplit, xml2json } from './utils';

export type Commands = { [name: string]: (text: any) => any };

const commands: Commands = {
  readClipboard: async (text: string) => {
    console.log('readClipboard: starting');
    const result = await navigator.clipboard.readText();
    console.log('readClipboard: ', result);
    return result;
    // return navigator.clipboard.readText().then((result) => {
    //   console.log('Read: ', result);
    //   return result;
    // });
  },
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

const nonRecursiveCommands: Commands = {
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

export async function runProc(input: any, procName: string): Promise<any> {
  try {
    if (procName in commands) {
      const proc = commands[procName];
      return await proc(input);
      // return deepApply(input, proc);
    } else if (procName in nonRecursiveCommands) {
      const proc = nonRecursiveCommands[procName];
      return await proc(input);
    } else {
      return `Did not recognize: ${procName}`;
    }
  } catch (e: any) {
    return 'Error: ' + e.message;
  }
}

export async function runProcs(input: string, procs: any[]): Promise<any[]> {
  const out: any[] = [];
  let val = input;
  for (const proc of procs) {
    val = await runProc(val, proc);
    out.push(val);
  }
  console.log('runProcs:', out);
  return out;
}
