export const getQueryBySource = (newsOrgSlug: string) => {
  const sourceQuery =
    newsOrgSlug === "techcrunch"
      ? {
          source: {
            _cast: {
              String: { _ilike: `%"poweredby": "techcrunch"%` },
            },
          },
        }
      : {
          _or: [
            {
              source: {
                _is_null: true,
              },
            },
            {
              source: {
                _cast: {
                  String: { _nilike: `%"poweredby"%` },
                },
              },
            },
            {
              source: {
                _cast: {
                  String: { _ilike: `%"poweredby": "cryptopanic"%` },
                },
              },
            }
          ],
        };

  return sourceQuery;
};
