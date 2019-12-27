const initialDataInHook = (initialData, options) => [initialData];

export const useLocalRemarkForm = jest.fn(initialDataInHook);

export const useGlobalRemarkForm = jest.fn(initialDataInHook);
