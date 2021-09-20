// Allowed commands.
import { guessTable } from './dbschema';
import { deepApply, dumbSplit, xml2json } from './utils';

const sample1 = `Log Source Host\tLog Source Type\tLog Source\tLog Message
DC1-STG01\tTheApp: Flatfile .NET Core\tDC1-STG01 .NET Core Gateway Logs\t{ 'time': '2021-02-16 12:01:00.1564', 'level': 'INFO', 'logger': 'Ocelot.Authorisation.Middleware.AuthorisationMiddleware', 'message': 'requestId: 800001b8-0000-e400-b63f-84710c7967bb, previousRequestId: no previous request id, message: user scopes is authorised calling next authorisation checks' }
DC1-STG01\tTheApp: Flatfile .NET Core\tDC1-STG01 .NET Core Gateway Logs\t{ 'time': '2021-02-16 12:01:00.1564', 'level': 'INFO', 'logger': 'Ocelot.Authentication.Middleware.AuthenticationMiddleware', 'message': 'requestId: 800001b8-0000-e400-b63f-84710c7967bb, previousRequestId: no previous request id, message: \\/customers\\/84226\\/apps\\/current is an authenticated route. AuthenticationMiddleware checking if client is authenticated' }
DC1-STG01\tTheApp: Flatfile .NET Core\tDC1-STG01 .NET Core Gateway Logs\t{ 'time': '2021-02-16 12:01:00.1564', 'level': 'INFO', 'logger': 'Ocelot.Authorisation.Middleware.AuthorisationMiddleware', 'message': 'requestId: 800001b8-0000-e400-b63f-84710c7967bb, previousRequestId: no previous request id, message: \\/ezapi\\/PersonalApp\\/v1\\/customers\\/{id} route does not require user to be authorised' }
DC1-STG01\tTheApp: Flatfile .NET Core\tDC1-STG01 .NET Core Gateway Logs\t{ 'time': '2021-02-16 12:01:00.1564', 'level': 'INFO', 'logger': 'Ocelot.Authorisation.Middleware.AuthorisationMiddleware', 'message': 'requestId: 800001b8-0000-e400-b63f-84710c7967bb, previousRequestId: no previous request id, message: route is authenticated scopes must be checked' }
DC1-STG01\tTheApp: Flatfile .NET Core\tDC1-STG01 .NET Core Gateway Logs\t{ 'time': '2021-02-16 12:01:00.1552', 'level': 'INFO', 'logger': 'Microsoft.AspNetCore.Hosting.Diagnostics', 'message': 'Request starting HTTP\\/1.1 GET http:\\/\\/stgplgtwy.example.com\\/customers\\/84226\\/apps\\/current  ' }
DC1-STG01\tTheApp: Flatfile .NET Core\tDC1-STG01 .NET Core Gateway Logs\t{ 'time': '2021-02-16 12:01:00.0995', 'level': 'INFO', 'logger': 'Microsoft.AspNetCore.Hosting.Diagnostics', 'message': 'Request finished in 1158.0783ms 200 application\\/json; charset=UTF-8' }
`;

export type Commands = { [name: string]: (text: any) => any };

const commands: Commands = {
  readClipboard: async (text: string) => {
    // console.log('readClipboard: starting');
    const result = await navigator.clipboard.readText();
    // console.log('readClipboard: ', result);
    return result;
    // return navigator.clipboard.readText().then((result) => {
    //   console.log('Read: ', result);
    //   return result;
    // });
  },
  readSample1: (text: string) => {
    return sample1;
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
