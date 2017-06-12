function printTestHeader(header){
  console.log('*'.repeat(header.length*2));
  console.log(' '.repeat(header.length/2) + header);
  console.log('*'.repeat(header.length*2));
}
function printTestBody(testType,givenValue,result){
  console.log('Test: ' + testType);
  console.log('Value Given: ' + givenValue);
  console.log('Value Result: ' + result);
}

exports.printTestHeader = printTestHeader;
exports.printTestBody = printTestBody
