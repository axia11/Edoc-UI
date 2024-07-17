module.exports = {
  name: 'common-services',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/common-services',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
