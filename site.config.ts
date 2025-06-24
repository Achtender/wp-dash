type SiteConfig = {
  site_domain: string;
  site_name: string;
  site_description: string;
};

type WpConfig = {
  site_pathname: string;
};

export const siteConfig: SiteConfig = {
  site_name: "Headless",
  site_description: "Starter template for Headless WordPress with Next.js",
  site_domain: "https://wp-headless.deno.dev",
};


export const wpConfig: WpConfig = {
  site_pathname: "/[network_page]/", 
};
