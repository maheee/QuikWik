import { WikiPage } from './model';


declare var RemoteStorage:any;


export function defineModule() {
  RemoteStorage.defineModule('wiki', function (privateClient, publicClient) {

    privateClient.declareType('page', {
      type: 'object',
      properties: {
        title: { type: 'string', required: true },
        content: { type: 'string', required: true, default: '' },

        x: { type: 'integer', required: false },
        y: { type: 'integer', required: false },
        width: { type: 'integer', required: false },
        height: { type: 'integer', required: false },

        lastEdited: { type: 'integer', required: true },
      }
    });

    function setupArea(client, path:string) {
      return client
        .scope(path + '/')
        .extend(areaMethods)
        .cache('', 'ALL');
    }

    var wikiModule = {
      privateArea: function (path) {
        return setupArea(privateClient, path);
      },

      publicArea: function (path) {
        return setupArea(publicClient, path);
      }
    };

    var areaMethods = {
      set: function (id:string, page:WikiPage):Promise<WikiPage> {
        page.lastEdited = (+ Date.now());
        return this.storeObject('page', id, page);
      },

      get: function (id:string):Promise<WikiPage> {
        return this.getObject(id.toString())
      }
    };

    return { exports: wikiModule };
  });

}
