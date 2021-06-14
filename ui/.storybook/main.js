const path = require("path");

module.exports = {
  "stories": [
    "../src/**/*stories.(ts|tsx|mdx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-styled-component-theme/dist/register",
    'storybook-addon-designs'
  ],
  webpackFinal: async config => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules/]
    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader")
    // use @babel/preset-react for JSX and env (instead of staged presets)
    // config.module.rules[0].use[0].options.jsc = {
    //   parser: {
    //     syntax: 'typescript',
    //     tsx: true,
    //     decorators: false,
    //     dynamicImport: true
    //   }
    // };
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env"),
    ]
    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve("@babel/plugin-proposal-class-properties")
    ]
    // Prefer ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"]
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        // jsc: {
        //   parser: {
        //     syntax: 'typescript',
        //     tsx: true,
        //     decorators: false,
        //     dynamicImport: true
        //   }
        // }
        presets: [["react-app", { flow: false, typescript: true }]],
        plugins: [
          require.resolve("@babel/plugin-proposal-class-properties"),
        ],
      },
    });

    config.resolve.extensions.push(".ts", ".tsx", ".json");
    
    config.resolve.modules = [
      path.resolve(__dirname, "../src"),
      "node_modules",
    ];
    return config;
  },
  typescript: {
    check: true,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
}
