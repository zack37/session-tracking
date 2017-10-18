import good from 'good';

export default {
  register: good,
  options: {
    ops: { interval: 10000 },
    reporters: {
      consoleReporter: [
        {
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*', error: '*' }],
        },
        { module: 'good-console' },
        'stdout',
      ],
    },
  },
};
