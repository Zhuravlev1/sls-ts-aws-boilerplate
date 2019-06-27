'use strict';

/*
Simple velocity template validator

This script checks that after velocity evaluation it returns valid JSON
which is required by Appsync.
*/

const fs = require('fs');
const Velocity = require('velocityjs');
const parseJson = require('parse-json');
const glob = require('glob');

// prepare render template context
const contextUtil = {
  unauthorized: () => '',
  toJson: () => '"stringified json representation"',
  defaultIfNull: (value, defaultValue) => defaultValue,
  dynamodb: {
    toString: () => 'some string',
    toStringJson: () => '{"S": "some string"}',
    toMapJson: () => '{"M": {"Key": {"S": "some string"} } }'
  }
};
const args = {
  quantity: 1,
  expectedVersion: 1
};
const context = {
  // AWS support recommends to use utils instead of util
  utils: contextUtil,
  ctx: {
    args: args
  },
  context: {
    arguments: args
  }
};

const patterns = '{api/appsync/mapping-templates/**/*.vm}';
// update templates provide malformed json. TODO why quiet notation does not work?
glob(patterns, {ignore: '**/update*.vm'}, (error, files) => {
  if (error) throw new Error(error);

  console.info(`Matching files found: ${files.length}`);

  files.forEach(file => {
    fs.readFile(file, 'utf8', function(error, template) {
      if (error) throw new Error(error);

      let json = Velocity.render(template, context);

      try {
        parseJson(json);
      } catch (e) {
        let message = e.message;
        if (e.message.includes('$util.')) {
          message = 'Please, change $util to $utils\n' + message;
        }
        throw new Error(
          `${file}\n==========\n${message}\n==========\n${json.trim()}`
        );
      }
    });
  });
});
