const Sequencer = require('@jest/test-sequencer').default;

class SortSequencer extends Sequencer {
  constructor() {
    super();
    this.pattern = ['createUserProfile.test.ts', 'getUserProfile.test.ts'];
  }

  sort(tests) {
    // Test structure information
    // https://github.com/facebook/jest/blob/6b8b1404a1d9254e7d5d90a8934087a9c9899dab/packages/jest-runner/src/types.ts#L17-L21
    const copyTests = Array.from(tests);

    // return copyTests.sort((testA, testB) => (testA.path > testB.path ? 1 : -1));
    const sorted = [];
    for (const patternItem of this.pattern) {
      const element = copyTests.find(item => item.path.endsWith(patternItem));
      if (element) {
        sorted.push(element);
      }
    }

    return sorted;
  }
}

module.exports = SortSequencer;
