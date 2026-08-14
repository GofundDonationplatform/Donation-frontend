import { useEffect } from "react";

const SITE_URL = "https://gfssga-impact-global-network.netlify.app";

const DEFAULT_TITLE =
  "GFSSGA Impact Network | Digital Fundraising & Community Impact";

const DEFAULT_DESCRIPTION =
  "GFSSGA Impact Network is a digital impact platform connecting people with meaningful causes, fundraising opportunities, and community initiatives.";

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = "/images/gfssga-logo1.webp",
  noIndex = false,
}) {
  useEffect(() => {
    const canonicalUrl =
      `${SITE_URL}${window.location.pathname}`.replace(/\/+$/, "") || SITE_URL;

    const imageUrl = image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`;

    document.title = title;

    const setMeta = (selector, attributes) => {
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    };

    const setLink = (selector, attributes) => {
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("link");
        document.head.appendChild(element);
      }

      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    };

    setMeta('meta[name="description"]', {
      name: "description",
      content: description,
    });

    setMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex, nofollow" : "index, follow",
    });

    setMeta('meta[property="og:type"]', {
      property: "og:type",
      content: "website",
    });

    setMeta('meta[property="og:title"]', {
      property: "og:title",
      content: title,
    });

    setMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });

    setMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });

    setMeta('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });

    setMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: "GFSSGA Impact Network",
    });

    setMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });

    setMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: title,
    });

    setMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });

    setMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });

    setLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });
  }, [title, description, image, noIndex]);

  return null;
}
