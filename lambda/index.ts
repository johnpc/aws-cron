exports.handler = async function() {
  const { TEST_ENV } = process.env;
  const time = new Date().toISOString();

  // Shows up in CloudWatch Logs
  console.log(`${TEST_ENV} ${time}`);
};
