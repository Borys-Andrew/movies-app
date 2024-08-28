import config from "@mate-academy/eslint-config-react-typescript";

export default [
  ...[].concat(config),
  {
    rules: {
      "no-console": "off",
    },
  },
];
