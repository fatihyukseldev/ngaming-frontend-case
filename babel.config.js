module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 0.2%, not dead',
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
};
