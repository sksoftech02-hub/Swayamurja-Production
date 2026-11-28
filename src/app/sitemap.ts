import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://swayamurja.com';
  const currentDate = new Date();

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          'en-IN': `${baseUrl}/?lang=en`,
          'mr-IN': `${baseUrl}/?lang=mr`,
        },
      },
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          'en-IN': `${baseUrl}/about-us?lang=en`,
          'mr-IN': `${baseUrl}/about-us?lang=mr`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
      alternates: {
        languages: {
          'en-IN': `${baseUrl}/privacy-policy?lang=en`,
          'mr-IN': `${baseUrl}/privacy-policy?lang=mr`,
        },
      },
    },
  ];
}
