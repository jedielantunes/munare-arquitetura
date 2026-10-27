import type { MetadataRoute } from "next";
import { site } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/"];
  return paths.map((path) => ({ url: new URL(path, site.url).href }));
}
