type PropertyInquiry = {
  id: string;
  title: string;
};

export function buildPropertyInquiryUrl(property: PropertyInquiry): string {
  const params = new URLSearchParams({
    property: property.id,
    propertyTitle: property.title,
  });

  return `/contact?${params.toString()}#contact-form`;
}
