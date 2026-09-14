# Vercel Web Analytics Setup

This project has been configured with Vercel Web Analytics.

## What was implemented

The Vercel Web Analytics tracking script has been added to all HTML pages in this project:
- admin.html
- bao-gia.html
- du-an.html
- gioi-thieu.html
- index.html
- kientrucdatamlinh.html
- lap-dat.html
- lien-he.html
- phong-thuy.html
- san-pham.html
- tin-tuc.html
- tu-van-lap-dat.html
- tu-van-phong-thuy.html
- xem-huong-mo-kich-thuoc-mo.html

## How it works

Each HTML file now includes the following script before the closing `</body>` tag:

```html
<!-- Vercel Web Analytics -->
<script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

## Activation steps

To start collecting analytics data:

1. **Deploy to Vercel** (if not already deployed):
   ```bash
   vercel deploy
   ```

2. **Enable Web Analytics in Vercel Dashboard**:
   - Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to the "Analytics" tab in the sidebar
   - Click "Enable Web Analytics"
   - This will activate the `/_vercel/insights/script.js` endpoint

3. **Verify installation**:
   - After deployment, visit your website
   - Open browser DevTools → Network tab
   - Look for requests to `/_vercel/insights/*` endpoints
   - You should see analytics data being collected

## What gets tracked

Vercel Web Analytics automatically tracks:
- **Page views**: Every page visit across all HTML pages
- **Unique visitors**: De-duplicated visitor counts
- **Top pages**: Most visited pages on your site
- **Traffic sources**: Referrers and how visitors find your site
- **Devices**: Desktop vs mobile traffic
- **Locations**: Geographic distribution of visitors
- **Core Web Vitals**: Performance metrics (LCP, FID, CLS)

## Privacy & GDPR Compliance

Vercel Web Analytics is privacy-friendly:
- ✅ No cookies used
- ✅ No personal data collected
- ✅ GDPR compliant
- ✅ No consent banner required
- ✅ Respects Do Not Track browser settings

## View your analytics

After enabling and with some traffic:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click "Analytics" in the sidebar
4. View real-time and historical analytics data

## Additional resources

- [Vercel Web Analytics Documentation](https://vercel.com/docs/analytics)
- [Quickstart Guide](https://vercel.com/docs/analytics/quickstart)
- [Privacy & Compliance](https://vercel.com/docs/analytics/privacy-policy)

## Technical details

- **Implementation**: Static HTML integration
- **Script loading**: Deferred (non-blocking)
- **Performance impact**: Minimal (~1KB gzipped)
- **Browser support**: All modern browsers
- **Automatic**: No additional configuration needed after Vercel dashboard activation
