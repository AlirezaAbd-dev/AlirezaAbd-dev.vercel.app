import nextConfig from "eslint-config-next";

export default [
  ...nextConfig,
  {
    rules: {
      "import/no-anonymous-default-export": "off",
    },
  },
];
