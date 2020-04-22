import { AvatarComponentQuery } from "../components/Avatar";

export const KeplerAvatarComponentQuery: AvatarComponentQuery = {
  image: {
    childImageSharp: {
      sqip: { dataURI: "data+image/svg+xml" },
      fixed: {
        width: 200,
        height: 200,
        src: "/static/example/1/avatar.jpg",
        srcSet: `/static/example/2/avatar.jpg 1x,
                /static/example/3/avatar.jpg 1.5x,
                /static/example/4/avatar.jpg 2x`,
      },
    },
  },
};
