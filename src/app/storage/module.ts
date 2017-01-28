/**
 * File: Wiki
 *
 * This modue stores wiki pages.
 * A wiki page has the fields title, content and lastEdited.
 *
 */

declare var RemoteStorage:any;


export function defineModule() {
  RemoteStorage.defineModule("wiki", function (privateClient, publicClient) {

    /**
     * Schema: wiki/text
     *
     * A page
     *
     * Properties:
     *   title - title of the wiki page (string, required)
     *   content - content of the wiki page (string, required)
     *   lastEdited - 13-digit timestamp for when the wiki page was last edited
     */
    privateClient.declareType("page", {
      description: "A text document",
      type: "object",
      $schema: "http://json-schema.org/draft-03/schema#",
      additionalProperties: true,
      properties: {
        title: { type: "string", required: true },
        content: { type: "string", required: true, "default": "" },
        lastEdited: { type: "integer", required: true }
      }
    });

    var documentsModule = {

      /**
       * Method: privateList
       *
       * List all private wiki pages.
       *
       * Parameters:
       *
       *   path - a pathstring where to scope the client to.
       *
       * Returns:
       *   A privateClient scoped to the given path
       *    and extended with the listMethods.
       *   It also supports all <BaseClient methods at https://remotestorage.github.io/remotestorage.js/files/baseclient-js.html>
       */
      privateList: function privateList(path) {
        return privateClient.scope(path + "/").extend(listMethods).cache("", "ALL");
      },

      /**
       * Method: publicList
       *
       * List all public wiki pages.
       *
       * Parameters:
       *
       *   path - a pathstring where to scope the client to.
       *
       * Returns:
       *   A publicClient scoped to the given path
       *    and extended with the listMethods.
       *   It also supports all <BaseClient methods at https://remotestorage.github.io/remotestorage.js/files/baseclient-js.html>
       */
      publicList: function publicList(path) {
        return publicClient.scope(path + "/").extend(listMethods).cache("", "ALL");
      }

    };

    /**
     * Class: listMethods
     *
     */
    var listMethods = {

      /**
       * Method: add
       *
       * Create a new wiki page
       *
       * Parameters:
       *   doc - the wiki page data to store as JSON object.
       *
       * Returns:
       *   A promise, which will be fulfilled with the created document as JSON object.
       *   The created document also contains the newly created id property.
       */
      add: function add(doc) {
        var id = "page__" + doc.title.replace(" ", "_");
        return this.set(id, doc);
      },

      /**
       * Method: set
       *
       * Update or create a wiki page for a specified id.
       *
       * Parameters:
       *   id  - the id the wiki page is at.
       *   doc - the wiki page data to store as JSON object.
       *
       * Returns:
       *   A promise, which will be fulfilled with the updated document.
       */
      set: function set(id, doc) {
        return this.storeObject("text", id.toString(), doc).then(function () {
          doc.id = id;
          return doc;
        });
      },

      /**
       * Method: get
       *
       * Get a wiki page.
       *
       * Parameters:
       *   id - the id of the wiki page you want to get.
       *
       * Returns:
       *   A promise, which will be fulfilled with the wiki page as JSON object.
       */
      get: function get(id) {
        return this.getObject(id.toString()).then(function (obj) {
          return obj || {};
        });
      },

      /**
       * Method: addRaw
       *
       * Store a raw wiki page of the specified contentType at shared/.
       *
       * Parameters:
       *   contentType - the content type of the data (like 'text/html').
       *   data - the raw data to store.
       *
       * Returns:
       *   A promise, which will be fulfilled with the path of the added wiki page.
       */
      addRaw: function addRaw(contentType, data) {
        var id = privateClient.uuid();
        var path = "shared/" + id;
        var url = this.getItemURL(path);
        return this.storeFile(contentType, path, data).then(function () {
          return url;
        });
      },

      /**
       * Method: setRaw
       *
       * Store a raw wiki page of the specified contentType at shared/.
       *
       * Parameters:
       *   id - id of the wiki page to update
       *   contentType - the content type of the data (like 'text/html').
       *   data - the raw data to store.
       *
       * Returns:
       *   A promise, which will be fulfilled with the path of the added wiki page.
       */
      setRaw: function setRaw(id, contentType, data) {
        var path = "shared/" + id;
        return this.storeFile(contentType, path, data);
      }

    };

    return { exports: documentsModule };
  });

}
