const initialDataInHook = (initialData: any) => [initialData];

export const useLocalJsonForm = jest.fn(initialDataInHook);

export const useGlobalJsonForm = jest.fn(initialDataInHook);
