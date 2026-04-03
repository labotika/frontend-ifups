import { Helmet } from "react-helmet-async";
import React from "react";

const SEO = ({ title, description, url, image, type = "website" }) => {
  const siteName = "Program Studi Informatika UPS Tegal";
  const defaultTitle = "Prodi Informatika | Universitas Pancasakti Tegal";
  const defaultDescription =
    "Website Resmi Program Studi Informatika Universitas Pancasakti Tegal. Menghasilkan lulusan yang kompeten di bidang teknologi informasi berbasis AI dan IoT.";
  const defaultImage = "https://ifupstegal.ac.id/Logo%20IFUPS.png";
  const defaultUrl = "https://ifupstegal.ac.id";

  const seoTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;
  const seoUrl = url ? `${defaultUrl}${url}` : defaultUrl;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />
    </Helmet>
  );
};

export default SEO;
