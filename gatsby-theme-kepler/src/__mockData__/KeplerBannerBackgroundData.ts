import { BannerData } from "../components/BannerBackground";

const sampleBase64 =
  "data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAPABQDASIAAhEBAxEB/8QAGAAAAgMAAAAAAAAAAAAAAAAAAAYBAgX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAAB1ZUrU0CyL//EABoQAAICAwAAAAAAAAAAAAAAAAACARIREyH/2gAIAQEAAQUCiFMIUg6XY2Mf/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPwE//8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oACAECAQE/AW1//8QAGBAAAwEBAAAAAAAAAAAAAAAAAAIyEDH/2gAIAQEABj8C3pbFsf/EAB4QAAEDBAMAAAAAAAAAAAAAAAABEUEhUWFxkdHx/9oACAEBAAE/IcnggdtoLfKJjfce4f/aAAwDAQACAAMAAAAQGw//xAAWEQEBAQAAAAAAAAAAAAAAAAABABH/2gAIAQMBAT8QAsL/xAAVEQEBAAAAAAAAAAAAAAAAAAABEP/aAAgBAgEBPxBWH//EABwQAQACAgMBAAAAAAAAAAAAAAEAESFRcbHRwf/aAAgBAQABPxBpi3Fuos5FpCIbpBzBcLAlYNX9gZ9/s//Z";

export const KeplerBannerBackgroundData: BannerData = {
  banner: {
    childImageSharp: {
      sqip: { dataURI: "data+image/svg+xml" },
      highQuality: {
        base64: sampleBase64,
        src: "/static/banner_example/3/banner.jpg",
        srcWebp: "/static/banner_example/4/banner.webp"
      },
      lowQuality: {
        base64: sampleBase64,
        src: "/static/banner_example/1/banner.jpg",
        srcWebp: "/static/banner_example/2/banner.jpg"
      }
    }
  },
  bannerDark: {
    childImageSharp: {
      sqip: { dataURI: "data+image/svg+xml" },
      highQuality: {
        base64: sampleBase64,
        src: "/static/banner_dark_example/3/banner_dark.jpg",
        srcWebp: "/static/banner_dark_example/4/banner_dark.webp"
      },
      lowQuality: {
        base64: sampleBase64,
        src: "/static/banner_example/1/banner_dark.jpg",
        srcWebp: "/static/banner_example/2/banner_dark.webp"
      }
    }
  }
};
