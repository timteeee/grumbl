const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/grumbl_development",
      test: "postgres://postgres:postgres@localhost:5432/grumbl_test",
      e2e: "postgres://postgres:postgres@localhost:5432/grumbl_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
