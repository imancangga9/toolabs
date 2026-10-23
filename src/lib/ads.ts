import { siteConfig } from '../config';

/**
 * AdSense publisher ID used by the loader script and manual ad units.
 * Set PUBLIC_ADSENSE_CLIENT to override the publisher in a deployment.
 */
export const adsenseClient: string =
  import.meta.env.PUBLIC_ADSENSE_CLIENT || siteConfig.adsenseClient;

/**
 * Manual ad unit IDs from AdSense → Ads → By ad unit. Leave a value empty to
 * rely on Auto ads or to skip that placement. Ad units are optional: the
 * loader script alone enables Auto ads once they are switched on in AdSense.
 */
export const adsenseSlots = {
  tool: import.meta.env.PUBLIC_ADSENSE_SLOT_TOOL || '',
} as const;
