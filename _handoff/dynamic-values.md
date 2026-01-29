# Dynamic Values Mapping

Values hardcoded in the prototype that must be dynamic in production.

---

## Must Replace

| Prototype Value | Location | Production Source |
|-----------------|----------|-------------------|
| "Zach's Shop" | Sidebar header, Step 5 flow diagram | `store.name` from Shopify |
| "12/29/2025" | Dashboard summary (Launch Date) | `subscription.launchDate` |
| "2026-01-12" | Dashboard summary (Next Billing) | `subscription.nextBillingDate` |
| "$0.00" | Dashboard summary (Current Usage) | `subscription.currentUsage` |
| "5,621" | Dashboard summary (Events Processed) | `metrics.totalEvents` |
| "+$5,000" | Dashboard impact card | `metrics.incrementalRevenue` |
| "+56" | Dashboard impact card | `metrics.incrementalOrders` |
| "53%" | Dashboard impact card | `metrics.newCustomerPercent` |

---

## Conditionally Dynamic

| Value | When Dynamic | When Static |
|-------|--------------|-------------|
| "$95/month" | If pricing changes | OK as static for now |
| "$10,000/month free" | If pricing changes | OK as static for now |
| "Cozy Earth" testimonial | If testimonials rotate | OK as static for now |
| "200+ brands" | If number updates | OK as static for now |

---

## Product Type Selection

User's selection in Step 1 should be stored and used to:
1. Display on Review screen (Step 4)
2. Show Unrestricted banner if Health/CBD/Restricted
3. Configure tracking settings appropriately

---

## Special Cases Selection

User's selections in Step 3 (landing pages, headless, custom cart) should be:
1. Stored in backend
2. Displayed on Review screen
3. Used to configure setup accordingly

---

## Channel Connection Status

For each channel (Meta, Google, TikTok):
1. Store connection status (connected/not connected)
2. Display correct status chip
3. Enable/disable Dashboard features accordingly
