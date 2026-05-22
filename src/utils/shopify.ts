export interface ShopifyCartItem {
  variantId: string;
  quantity: number;
}

/**
 * Generates a Shopify Cart Permalink URL for direct checkout redirection.
 * Format: https://{shop-domain}/cart/{variant-id}:{quantity},{variant-id}:{quantity}?channel=buy_button
 */
export function getShopifyCheckoutUrl(items: ShopifyCartItem[]): string {
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'yeenksluxe.myshopify.com';
  
  // Clean domain just in case it has http/https prefix
  const cleanDomain = shopDomain.replace(/^(https?:\/\/)?(www\.)?/, '');
  
  if (items.length === 0) {
    return `https://${cleanDomain}/cart`;
  }
  
  const itemsString = items
    .map(item => `${item.variantId}:${item.quantity}`)
    .join(',');
    
  return `https://${cleanDomain}/cart/${itemsString}?channel=buy_button`;
}

/**
 * Basic Shopify Storefront API query helper.
 * If credentials are set, this can fetch live product collections.
 */
export async function queryShopifyStorefront(query: string, variables = {}) {
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  
  if (!shopDomain || !accessToken) {
    throw new Error("Shopify credentials not set in environment variables.");
  }
  
  const cleanDomain = shopDomain.replace(/^(https?:\/\/)?(www\.)?/, '');
  const url = `https://${cleanDomain}/api/2024-04/graphql.json`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': accessToken,
    },
    body: JSON.stringify({ query, variables }),
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Shopify API error: ${response.status} - ${errorText}`);
  }
  
  return response.json();
}
