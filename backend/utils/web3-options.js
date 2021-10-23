const ws = {
  timeout: 30000, // ms

  clientConfig: {
    // Useful if requests are large
    maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
    maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

    // Useful to keep a connection alive
    keepalive: true,
    keepaliveInterval: 600000, // ms
  },

  // Enable auto reconnection
  reconnect: {
    auto: true,
    delay: 10, // ms
    maxAttempts: 5,
    onTimeout: false,
  },
};
const https = {
  keepAlive: true,
  withCredentials: false,
  timeout: 20000, // ms
  headers: [
    {
      name: 'Access-Control-Allow-Origin',
      value: '*',
    },
  ],
};

module.exports = { ws, https };
