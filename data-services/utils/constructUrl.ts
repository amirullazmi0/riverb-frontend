type ConstructUrlConfig = {
     query?: Record<string, string>;
};

export const constructUrl = (baseUrl: string, config: ConstructUrlConfig = {}): string => {
     const { query } = config;

     return baseUrl.replaceAll(/\/:(\w+)/g, (_, value: string) => {
          const replacedValue = query?.[value] ?? "undefined";
          return `/${encodeURIComponent(replacedValue)}`;
     });
};
