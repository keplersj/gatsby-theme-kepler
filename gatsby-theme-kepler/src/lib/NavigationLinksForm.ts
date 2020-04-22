interface Item {
  name: string;
}

export const NavigationLinksForm = {
  label: "Navigation Links",
  fields: [
    {
      label: "Navigation Links",
      name: "rawJson.navLinks",
      component: "group-list",
      itemProps: (item: Item) => ({
        key: item.name,
        label: item.name,
      }),
      fields: [
        {
          label: "Name",
          name: "name",
          component: "text",
        },
        {
          label: "Link",
          name: "url",
          component: "text",
        },
      ],
    },
  ],
};
