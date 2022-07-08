/**
 * @file `exporter.mjs`
 * (An ESM module exporting a default and named entity.)
 */

export function namedMjsExport() {}

export default function defaultMjsExport() {}

/**
 * @file `exporter.cjs`
 * (A CommonJS module exporting a default and named entity.)
 */

module.exports = function defaultCjsExport() {};

module.exports.namedCjsExport = function namedCjsExport() {};

/**
 * @file `importer.mjs`
 *
 * An ESM module that imports stuff
 */

import defaultCjsExport, { namedCjsExport } from "./exporter.cjs";
import defaultMjsExport, { namedMjsExport } from "./exporter.mjs";

console.log({
  title: "Importing into an ESM module.",
  defaultCjsExport,
  namedCjsExport,
  defaultMjsExport,
  namedMjsExport,
});
/*And after we run that script via node importer.mjs (Node v16):

{
  title: 'Importing into an ESM module.',
  defaultCjsExport: [Function: defaultCjsExport] {
    namedCjsExport: [Function: namedCjsExport]
  },
  namedCjsExport: [Function: namedCjsExport],
  defaultMjsExport: [Function: defaultMjsExport],
  namedMjsExport: [Function: namedMjsExport]
}
*/

/*b
Since require() is synchronous, you can't use it to import ESM modules AT ALL! 
In CommonJS you have to use require syntax for other CommonJS modules and an 
import() function (distinct from the import keyword used in ESM!), 
a function that returns a promise, to import ESM.

Let's take a look:
*/
/**
 * @file `importer.cjs`
 *
 * From a require-style Node script, import cjs and mjs modules.
 */

/**
 * Import a module by `require()`ing it. If that results in
 * an error, return the error code.
 */
function requireModule(modulePath, exportName) {
  try {
    const imported = require(modulePath);
    return exportName ? imported[exportName] : imported;
  } catch (err) {
    return err.code;
  }
}

/**
 * CommonJS does not have top-level `await`, so we can wrap
 * everything in an `async` IIFE to make our lives a little easier.
 */
(async function () {
  console.log({
    title: "Importing into a CommonJS module",

    // CJS<-CJS and MJS<-CJS are equivalent
    defaultCjsExport: requireModule("./exporter.cjs"),
    namedCjsExport: requireModule("./exporter.cjs", "namedCjsExport"),

    // Cannot `require` an ESM module
    defaultMjsExportUsingRequire: requireModule("./exporter.mjs"),
    namedMjsExportUsingRequire: requireModule(
      "./exporter.mjs",
      "namedMjsExport"
    ),

    defaultMjsExport: (await import("./exporter.mjs")).default,
    namedMjsExport: (await import("./exporter.mjs")).namedMjsExport,
  });
})();

/*
And the output of node importer.cjs:

{
  title: 'Importing into a CommonJS module',
  defaultCjsExport: [Function: defaultCjsExport] {
    namedCjsExport: [Function: namedCjsExport]
  },
  namedCjsExport: [Function: namedCjsExport],
  defaultMjsExportUsingRequire: 'ERR_REQUIRE_ESM',
  namedMjsExportUsingRequire: 'ERR_REQUIRE_ESM',
  defaultMjsExport: [Function: defaultMjsExport],
  namedMjsExport: [Function: namedMjsExport]
}
*/

/**
 * Advice
 *
 * I've been all-in on ESM for a while now.
 * It's a better developer experience and is clearly what we'll be using in the future.
 * But it comes with headaches because so much of the Node ecosystem is still in CommonJS,
 * and you should think carefully before going all-in.
 *
 * Don't forget about the file extensions! Modern Node handles the .mjs and .cjs extensions,
 * so if you need to use one module type in one place and another somewhere else, feel free to mix it up!
 * This also works in Typescript (v4.5+) with the .mts and .cts extensions.
 * (But also note that some tools don't know about those extensions...)
 * Tools written in CommonJS (i.e. most existing Node-based tools) usually handle ESM poorly.
 * Even extremely popular projects. If you want to guarantee that you can use a tool with your code,
 * you may want to stick with CommonJS.
 * If you will mostly be importing other packages into your project (versus having yours imported into others),
 * ESM will let you not have to worry much about what kind of modules you're importing.
 * ESM spec requires that import paths be valid paths,
 * meaning you need the file extension and everything (CommonJS doesn't require that).
 * Node has an option to skip out on that requirement for ESM modules,
 * if you want to keep it old-school: node --es-module-specifier-resolution=node your-dope-module.mjs
 * If you do decide to go all-in on ESM in Node, be ready to do a lot of very annoying troubleshooting!
 *
 */
