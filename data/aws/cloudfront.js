/** AWS CloudFront — global CDN, caching, origin security and edge compute */
export const awsCloudFront = {
  id: 109,
  category: "AWS CloudFront",
  themeBgColor: "#CFFAFE",
  textColor: "#155E75",
  topicColor: "#0891B2",
  lightColor: "#ECFEFF",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "CDN Fundamentals & Distributions",
          tags: ["aws", "cloudfront", "cdn", "edge locations", "distribution"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>Amazon CloudFront</strong> is a global Content Delivery Network (CDN). It caches and serves content from hundreds of <strong>edge locations</strong> close to users, terminates TLS at the edge, and proxies dynamic requests back to your origin over the AWS backbone. It is the standard front door for static sites, single-page apps, APIs, media and downloads, and it absorbs DDoS traffic through AWS Shield.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Why a CDN</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Latency:</strong> A user in Mumbai fetching from an edge in Mumbai sees tens of milliseconds instead of hundreds to a US origin.</li>
  <li><strong>Origin offload:</strong> Cached objects never reach your servers, cutting compute and data transfer cost (origin-to-CloudFront transfer is free).</li>
  <li><strong>Resilience:</strong> Edges keep serving cached content during origin trouble, and Shield Standard absorbs volumetric attacks for free.</li>
  <li><strong>Even dynamic requests benefit:</strong> TLS terminates at the edge, connections to the origin are kept warm, and traffic rides the AWS backbone rather than the public internet.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The request path</h4>
<pre><code class="language-text">Viewer -> nearest edge location (cache hit? serve)
       -> regional edge cache (larger, shared by many edges; hit? serve)
       -> origin (S3, ALB, API Gateway, any HTTP server)   [origin fetch, then cache on the way back]</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Anatomy of a distribution</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Distribution:</strong> The configuration unit, with a domain like <code>d111.cloudfront.net</code>. You attach <strong>alternate domain names</strong> and an <strong>ACM certificate that must be in us-east-1</strong>, then alias your Route 53 record to it.</li>
  <li><strong>Origins:</strong> One or more back ends. <strong>Origin groups</strong> pair a primary and a secondary for automatic failover on 5xx or timeouts.</li>
  <li><strong>Behaviours:</strong> Path patterns (<code>/api/*</code>, <code>/static/*</code>, default <code>*</code>) evaluated in order, each mapping to an origin with its own caching, allowed HTTP methods, viewer protocol policy (redirect HTTP to HTTPS) and attached policies or functions.</li>
  <li><strong>Price class:</strong> Restrict to cheaper edge regions if your audience is regional.</li>
  <li><strong>Logging:</strong> Standard logs to S3 or real-time logs to Kinesis for analytics.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Typical setup for a web app</h4>
<p style="line-height: 1.75;">One distribution with the S3 bucket holding the SPA as the default origin and behaviour, an ALB or API Gateway origin for <code>/api/*</code> with caching disabled and all headers forwarded, HTTP redirected to HTTPS, HTTP/2 and HTTP/3 enabled, compression on, and IPv6 enabled.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "CloudFront is a CDN that caches at edge locations and proxies misses to my origins over the AWS backbone. A distribution has origins and path-based behaviours, each with its own cache settings, so I serve my SPA from S3 and route /api to an ALB from one domain. I get lower latency, less origin load, free Shield protection and TLS at the edge, with the certificate issued in us-east-1 and Route 53 aliasing the domain to the distribution."</div>
</div>`,
          examples: [
            `# Minimal distribution config: S3 SPA as default origin + ALB for /api/* (aws cloudfront create-distribution --distribution-config file://dist.json)
{
  "CallerReference": "web-2026-09-12",
  "Comment": "web app",
  "Enabled": true,
  "Aliases": { "Quantity": 1, "Items": ["app.example.com"] },
  "ViewerCertificate": { "ACMCertificateArn": "arn:aws:acm:us-east-1:123456789012:certificate/abcd", "SSLSupportMethod": "sni-only", "MinimumProtocolVersion": "TLSv1.2_2021" },
  "HttpVersion": "http2and3",
  "IsIPV6Enabled": true,
  "Origins": { "Quantity": 2, "Items": [
    { "Id": "spa-s3", "DomainName": "my-spa-bucket.s3.us-east-1.amazonaws.com", "OriginAccessControlId": "E1OAC", "S3OriginConfig": { "OriginAccessIdentity": "" } },
    { "Id": "api-alb", "DomainName": "api-alb-123.us-east-1.elb.amazonaws.com", "CustomOriginConfig": { "HTTPPort": 80, "HTTPSPort": 443, "OriginProtocolPolicy": "https-only" } }
  ]},
  "DefaultCacheBehavior": {
    "TargetOriginId": "spa-s3", "ViewerProtocolPolicy": "redirect-to-https", "Compress": true,
    "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
    "AllowedMethods": { "Quantity": 2, "Items": ["GET", "HEAD"] }
  },
  "CacheBehaviors": { "Quantity": 1, "Items": [{
    "PathPattern": "/api/*", "TargetOriginId": "api-alb", "ViewerProtocolPolicy": "https-only", "Compress": true,
    "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
    "OriginRequestPolicyId": "216adef6-5c7f-47e4-b989-5492eafa07d3",
    "AllowedMethods": { "Quantity": 7, "Items": ["GET","HEAD","OPTIONS","PUT","POST","PATCH","DELETE"] }
  }]}
}
# Managed policy IDs above: CachingOptimized, CachingDisabled, AllViewer`,
            `# Watch the distribution deploy, then test the cache status from the edge
aws cloudfront wait distribution-deployed --id E1ABCDEF
curl -sI https://app.example.com/index.html | grep -iE 'x-cache|age|via'
#  X-Cache: Miss from cloudfront   (first request)
#  X-Cache: Hit from cloudfront    (subsequent requests within TTL)`,
          ],
          questions: [
            {
              question: "What is CloudFront and why would you put it in front of an application?",
              solution: "<p>CloudFront is AWS's global CDN: it caches content at hundreds of <strong>edge locations</strong> and proxies uncached requests to your origin over the AWS backbone. You use it to <strong>reduce latency</strong> for global users, <strong>offload the origin</strong> and cut data-transfer cost, add <strong>TLS termination, HTTP/2 and HTTP/3</strong> at the edge, gain <strong>DDoS protection</strong> from Shield, attach WAF, and run edge logic with CloudFront Functions or Lambda@Edge. Even non-cacheable API traffic benefits from edge TLS and warm backbone connections.</p>",
            },
            {
              question: "What are origins and behaviours in a CloudFront distribution?",
              solution: "<p>An <strong>origin</strong> is a back end CloudFront fetches from: an S3 bucket, an ALB or NLB, API Gateway, MediaStore, or any HTTPS server. A <strong>behaviour</strong> maps a URL path pattern to an origin together with its own caching rules, allowed methods, viewer protocol policy, response headers and edge functions; behaviours are matched in order with the default behaviour last. This lets one domain serve static assets from S3 with long caching and an API from an ALB with caching disabled.</p>",
            },
            {
              question: "Why must the ACM certificate for CloudFront be in us-east-1?",
              solution: "<p>CloudFront is a <strong>global service</strong> whose control plane lives in the us-east-1 region, so it can only attach certificates stored there. The certificate is then distributed to every edge location worldwide. Regional resources such as ALBs use certificates from their own region, so a typical application ends up with two ACM certificates for the same domain: one in us-east-1 for CloudFront and one in the workload region for the load balancer.</p>",
            },
            {
              question: "What is a regional edge cache?",
              solution: "<p>Regional edge caches are a <strong>second caching tier</strong> between the many small edge locations and your origin. They have larger caches and are shared by all edges in a region, so an object evicted from a busy edge or requested from a different edge nearby is still served from the regional cache instead of the origin. They raise the effective hit ratio for long-tail content and reduce origin load; PUT, POST and DELETE requests bypass them and go straight to the origin.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html",
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html",
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html",
          ],
        },
        {
          topic: "Caching, Cache Keys & TTLs",
          tags: ["aws", "cloudfront", "caching", "cache policy", "ttl"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A CDN is only as useful as its <strong>cache hit ratio</strong>. CloudFront decides whether a request is a hit by building a <strong>cache key</strong> from the request, and how long to keep the object by combining origin headers with your policy. Getting these two things right is most of CloudFront tuning.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The cache key</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Always includes the distribution domain and the <strong>URL path</strong>.</li>
  <li>Your <strong>cache policy</strong> decides which <strong>query strings, headers and cookies</strong> are added. Each added component multiplies the number of cache variants.</li>
  <li>Include only what changes the response: for images maybe nothing; for an API perhaps <code>Accept-Language</code> and a version query string; never <code>User-Agent</code> or all cookies.</li>
  <li>Enable <code>Accept-Encoding</code> gzip and brotli in the policy so CloudFront caches compressed variants itself.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Cache policy vs origin request policy</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Cache policy:</strong> What forms the key and the TTL settings (minimum, default, maximum).</li>
  <li><strong>Origin request policy:</strong> What CloudFront <strong>forwards to the origin</strong> even though it is not in the key, for example the <code>Authorization</code> header or all query strings for an API that needs them but whose responses you do not cache by them.</li>
  <li>AWS provides managed policies: <code>CachingOptimized</code> for static content, <code>CachingDisabled</code> for APIs, <code>AllViewer</code> to forward everything to the origin.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">How long objects stay cached</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>The origin's <code>Cache-Control: max-age</code> or <code>s-maxage</code> (or <code>Expires</code>) sets the TTL, <strong>clamped</strong> between the policy's minimum and maximum. If the origin sends nothing, the default TTL applies (24 hours by default).</li>
  <li><code>Cache-Control: no-store</code> or <code>private</code> prevents caching; <code>stale-while-revalidate</code> and <code>stale-if-error</code> are honoured for graceful refresh.</li>
  <li>Set <strong>minimum TTL to 0</strong> so the origin can opt individual responses out of caching.</li>
  <li>Objects can be evicted early when edges run out of space, so CloudFront never guarantees an object stays for its full TTL.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Measuring and improving hit ratio</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Watch the <code>CacheHitRate</code> metric and the <code>x-cache</code> response header (Hit, Miss, RefreshHit, Error from cloudfront).</li>
  <li>Normalise requests with a CloudFront Function: lowercase paths, sort or strip query parameters, collapse header variants.</li>
  <li>Use <strong>Origin Shield</strong>, an extra centralised cache layer in one region, when many regional caches would otherwise each miss to the origin.</li>
  <li>Cache error responses briefly (<strong>error caching minimum TTL</strong>) so a struggling origin is not hammered.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "The cache key is the path plus whatever query strings, headers and cookies my cache policy includes, so I include only what changes the response and forward the rest through an origin request policy. TTL comes from the origin's Cache-Control clamped by the policy, with minimum zero so the origin can opt out. I track CacheHitRate, normalise requests with a CloudFront Function, and add Origin Shield when many regional caches miss to the same origin."</div>
</div>`,
          examples: [
            `# Custom cache policy: key on path + 'v' query string + Accept-Language, compress, 1 day default TTL
aws cloudfront create-cache-policy --cache-policy-config '{
  "Name": "static-versioned",
  "MinTTL": 0, "DefaultTTL": 86400, "MaxTTL": 31536000,
  "ParametersInCacheKeyAndForwardedToOrigin": {
    "EnableAcceptEncodingGzip": true, "EnableAcceptEncodingBrotli": true,
    "QueryStringsConfig": { "QueryStringBehavior": "whitelist", "QueryStrings": { "Quantity": 1, "Items": ["v"] } },
    "HeadersConfig": { "HeaderBehavior": "whitelist", "Headers": { "Quantity": 1, "Items": ["Accept-Language"] } },
    "CookiesConfig": { "CookieBehavior": "none" }
  }
}'

# Origin request policy: forward Authorization + all query strings to the API without caching on them
aws cloudfront create-origin-request-policy --origin-request-policy-config '{
  "Name": "api-forward-auth",
  "HeadersConfig": { "HeaderBehavior": "whitelist", "Headers": { "Quantity": 2, "Items": ["Authorization", "Accept"] } },
  "QueryStringsConfig": { "QueryStringBehavior": "all" },
  "CookiesConfig": { "CookieBehavior": "none" }
}'`,
            `# Origin responses that drive the TTL
# Hashed asset: cache for a year, everywhere
Cache-Control: public, max-age=31536000, immutable
# HTML shell: always revalidate at the edge
Cache-Control: public, max-age=0, s-maxage=60, stale-while-revalidate=30
# Personalised API response: never cache
Cache-Control: private, no-store

# See what the edge did
curl -sI https://app.example.com/main.8c1f.js | grep -iE 'x-cache|age:|cache-control'`,
          ],
          questions: [
            {
              question: "How does CloudFront decide whether a request is a cache hit?",
              solution: "<p>CloudFront builds a <strong>cache key</strong> from the request URL path plus whatever the <strong>cache policy</strong> includes: selected headers, cookies and query strings. If an object with that exact key exists at the edge (or regional edge cache) and its TTL has not expired, it is a hit. Every extra key component multiplies the number of variants, so include only what actually changes the response (for example <code>Accept-Encoding</code> and a language header) and forward everything else via the origin request policy without caching on it.</p>",
            },
            {
              question: "What is the difference between a cache policy and an origin request policy?",
              solution: "<p>The <strong>cache policy</strong> defines the cache key (which query strings, headers and cookies make responses distinct) and the minimum, default and maximum TTL. Anything in the cache key is automatically forwarded to the origin. The <strong>origin request policy</strong> adds values to forward to the origin <strong>without</strong> making them part of the key, such as an <code>Authorization</code> header or all query strings for an API. Separating them lets you forward what the origin needs while keeping the key small for a high hit ratio.</p>",
            },
            {
              question: "How do CloudFront TTL settings interact with the origin's Cache-Control header?",
              solution: "<p>CloudFront uses the origin's <code>Cache-Control: max-age</code> (or <code>s-maxage</code>, which takes precedence for shared caches) as the TTL, but <strong>clamps it between the policy's minimum and maximum TTL</strong>. If the origin sends no caching header, the <strong>default TTL</strong> applies. A minimum TTL of zero lets the origin send <code>no-store</code> or <code>max-age=0</code> to opt out per response; a non-zero minimum forces caching even when the origin says not to, which is a common source of stale content bugs.</p>",
            },
            {
              question: "Your CloudFront cache hit ratio is 40%. What do you investigate?",
              solution: "<p>Check the <strong>cache key</strong> first: forwarding all query strings, cookies or headers such as <code>User-Agent</code> fragments the cache into near-unique variants. Check <strong>origin headers</strong> for short or missing <code>max-age</code> and for <code>private</code> or <code>Set-Cookie</code> on cacheable responses. Look for <strong>unnormalised URLs</strong> (case, parameter order, tracking parameters) and fix them with a CloudFront Function. Finally consider <strong>Origin Shield</strong> to collapse misses from many regional caches into one, and review whether long-tail content is simply uncacheable.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-the-cache-key.html",
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html",
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-hit-ratio.html",
          ],
        },
        {
          topic: "Invalidation & Versioned Deployments",
          tags: ["aws", "cloudfront", "invalidation", "versioning", "deployment"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Caching creates one operational question: <strong>how do users get the new version after a deploy?</strong> CloudFront offers invalidations, but the best answer is to design your URLs so you almost never need them.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Invalidations</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>An invalidation tells every edge to <strong>discard cached copies</strong> of matching paths (<code>/index.html</code>, <code>/images/*</code>, or <code>/*</code>), so the next request fetches from the origin.</li>
  <li>Takes a minute or two to propagate; you can track status with the API.</li>
  <li>The first <strong>1,000 paths per month are free</strong>, then about half a cent per path. A wildcard counts as one path, which is why <code>/*</code> is tempting.</li>
  <li>Invalidating everything after each deploy destroys your hit ratio and spikes origin load; it is a blunt instrument for emergencies and for the handful of files that legitimately keep the same name.</li>
  <li>Browser caches are not affected; a viewer who cached with a long <code>max-age</code> keeps the old copy until it expires.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Versioned file names: the real solution</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Build tools emit <strong>content-hashed names</strong> such as <code>main.8c1f2a.js</code>. A changed file gets a new name, so it is a new cache key and a cache miss by definition; unchanged files keep serving from cache.</li>
  <li>Serve hashed assets with <code>Cache-Control: public, max-age=31536000, immutable</code>: a year in CloudFront and in browsers.</li>
  <li>Serve the <strong>entry point</strong> (<code>index.html</code>) with a very short TTL or <code>max-age=0, s-maxage=60</code>, and invalidate only that one path after a deploy.</li>
  <li>Users mid-session keep working because the old hashed assets still exist in the bucket and cache; do not delete previous builds immediately.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Deployment recipe for an SPA</h4>
<pre><code class="language-bash">npm run build                                     # emits hashed assets + index.html
aws s3 sync dist/ s3://my-spa/ --exclude index.html \\
  --cache-control "public, max-age=31536000, immutable"
aws s3 cp dist/index.html s3://my-spa/index.html \\
  --cache-control "public, max-age=0, s-maxage=60, must-revalidate"
aws cloudfront create-invalidation --distribution-id E1ABCDEF --paths "/index.html"</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Other options</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Query-string versioning</strong> (<code>app.js?v=123</code>) works if the query string is in the cache key, but some intermediaries ignore it; hashed file names are more reliable.</li>
  <li><strong>Directory versioning</strong> (<code>/v123/...</code>) with the release ID injected into the HTML.</li>
  <li><strong>Continuous deployment</strong> for CloudFront lets you test a staging distribution configuration on a slice of traffic (by header or weight) before promoting it, useful for behaviour and policy changes rather than content.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I avoid invalidations by design: assets get content-hashed names and a one-year immutable cache header, so a change is automatically a new cache key, while index.html has a short TTL and is the only path I invalidate after a deploy. Invalidations are slow, billable beyond a thousand paths a month and do not clear browser caches, so I keep them for emergencies."</div>
</div>`,
          examples: [
            `# Invalidate just the entry point and wait for completion
INV_ID=$(aws cloudfront create-invalidation --distribution-id E1ABCDEF --paths "/index.html" \\
  --query 'Invalidation.Id' --output text)
aws cloudfront wait invalidation-completed --distribution-id E1ABCDEF --id $INV_ID

# Emergency: purge everything (counts as one path, but tanks the hit ratio)
aws cloudfront create-invalidation --distribution-id E1ABCDEF --paths "/*"

# Verify the headers users will see
curl -sI https://app.example.com/main.8c1f2a.js | grep -i cache-control   # max-age=31536000, immutable
curl -sI https://app.example.com/index.html     | grep -i cache-control   # max-age=0, s-maxage=60`,
            `# GitHub Actions step: deploy versioned assets, then invalidate only index.html
- name: Deploy to S3 + CloudFront
  run: |
    aws s3 sync dist/ s3://my-spa/ --exclude index.html --cache-control "public, max-age=31536000, immutable"
    aws s3 cp dist/index.html s3://my-spa/index.html --cache-control "public, max-age=0, s-maxage=60, must-revalidate"
    aws cloudfront create-invalidation --distribution-id \${{ secrets.CF_DIST_ID }} --paths "/index.html"`,
          ],
          questions: [
            {
              question: "How would you deploy a new frontend version without users seeing stale files?",
              solution: "<p>Build with <strong>content-hashed file names</strong> (<code>main.8c1f.js</code>) and upload them with <code>Cache-Control: max-age=31536000, immutable</code>. Upload <code>index.html</code> with <code>no-cache</code> or a very short TTL, then <strong>invalidate only <code>/index.html</code></strong>. New HTML references new hashed assets, old assets remain cached for users mid-session, and you avoid large, slow, billable invalidations.</p>",
            },
            {
              question: "What does a CloudFront invalidation do, and what does it not do?",
              solution: "<p>An invalidation marks matching objects at <strong>every edge and regional cache</strong> as expired so the next request goes to the origin; it propagates in about a minute or two and the first 1,000 paths per month are free. It does <strong>not</strong> clear <strong>browser or intermediary caches</strong>, so a user whose browser cached a file with a long <code>max-age</code> keeps the old copy, and it does not touch the origin. That is why long browser TTLs belong only on versioned file names.</p>",
            },
            {
              question: "Why is invalidating /* after every deploy a bad practice?",
              solution: "<p>It throws away every cached object worldwide, so the next wave of requests all <strong>miss and hit the origin</strong> simultaneously, spiking latency and origin load and potentially causing errors during peak traffic. It also hides the real problem, unversioned asset URLs, and once you exceed the free tier it is billed per invalidation. Content-hashed names plus a single <code>/index.html</code> invalidation give instant, safe rollouts with a stable hit ratio.</p>",
            },
            {
              question: "How can you safely test a CloudFront configuration change before it affects all users?",
              solution: "<p>Use <strong>CloudFront continuous deployment</strong>: create a <strong>staging distribution</strong> from the primary, change its behaviours, policies or functions, and attach a <strong>continuous deployment policy</strong> that routes a small percentage of viewers or requests carrying a specific header to staging. Compare metrics and logs, then <strong>promote</strong> the staging configuration to primary or discard it. This applies to configuration; content rollouts are handled by versioned URLs.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html",
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/UpdatingExistingObjects.html",
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/continuous-deployment.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "Securing Origins: OAC, WAF & Shield",
          tags: ["aws", "cloudfront", "oac", "waf", "shield", "security"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  A CDN in front of your origin is only a security boundary if the origin <strong>refuses traffic that did not come through the CDN</strong>. Otherwise attackers bypass your WAF, rate limits and caching by hitting the origin directly. CloudFront provides specific mechanisms for each origin type, and pairs with WAF and Shield at the edge.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">S3 origins: Origin Access Control</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Keep <strong>Block Public Access</strong> on. Create an <strong>OAC</strong> and attach it to the origin; CloudFront then <strong>signs requests to S3 with SigV4</strong>.</li>
  <li>Bucket policy allows <code>s3:GetObject</code> to <code>cloudfront.amazonaws.com</code> only when <code>AWS:SourceArn</code> equals your distribution ARN.</li>
  <li>OAC replaces the legacy Origin Access Identity and supports SSE-KMS buckets, all regions and PUT/DELETE.</li>
  <li>Use the <strong>REST endpoint</strong> (<code>bucket.s3.region.amazonaws.com</code>), not the website endpoint, which cannot be private.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">ALB and custom origins</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Secret custom header:</strong> CloudFront adds <code>X-Origin-Verify: &lt;random&gt;</code> to origin requests; the ALB listener rule or WAF on the ALB rejects requests without it. Rotate the value periodically via Secrets Manager.</li>
  <li><strong>Managed prefix list:</strong> The ALB security group allows 443 only from the <code>com.amazonaws.global.cloudfront.origin-facing</code> prefix list, so only CloudFront IPs can connect.</li>
  <li><strong>VPC origins:</strong> CloudFront can reach an <strong>internal</strong> ALB, NLB or EC2 instance in private subnets directly, so the origin has no public exposure at all.</li>
  <li>Use <code>https-only</code> origin protocol with a valid certificate so the CloudFront-to-origin hop is encrypted.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">AWS WAF at the edge</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>A <strong>global web ACL</strong> attached to the distribution evaluates every request before caching or origin fetch.</li>
  <li><strong>Managed rule groups:</strong> Core rule set (OWASP), known bad inputs, SQL injection, IP reputation, anonymous IP, bot control.</li>
  <li><strong>Rate-based rules</strong> block IPs exceeding N requests in five minutes; geo-match rules block or challenge by country.</li>
  <li>Start in <strong>count mode</strong> to measure false positives, then switch to block. Send WAF logs to S3 or CloudWatch.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Shield</h4>
<p style="line-height: 1.75;"><strong>Shield Standard</strong> is free and automatic on CloudFront and Route 53, absorbing layer 3 and 4 attacks. <strong>Shield Advanced</strong> adds layer 7 detection, automatic WAF rule creation during attacks, 24/7 response team access and <strong>cost protection</strong> against scaling charges from an attack.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Response security headers</h4>
<p style="line-height: 1.75;">A <strong>response headers policy</strong> adds <code>Strict-Transport-Security</code>, <code>Content-Security-Policy</code>, <code>X-Content-Type-Options</code>, <code>X-Frame-Options</code> and CORS headers at the edge, so every origin benefits without code changes.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "I make the origin unreachable except through CloudFront: Origin Access Control with a bucket policy scoped to the distribution ARN for S3, and for an ALB either a secret header checked at the listener plus the CloudFront prefix list on the security group, or a VPC origin so the ALB is internal. At the edge I attach a WAF web ACL with managed OWASP and rate-based rules, rely on Shield Standard, and add security headers with a response headers policy."</div>
</div>`,
          examples: [
            `# Serve a private S3 bucket through CloudFront with OAC
aws cloudfront create-origin-access-control --origin-access-control-config \\
  'Name=spa-oac,SigningProtocol=sigv4,SigningBehavior=always,OriginAccessControlOriginType=s3'

# Bucket policy: only this distribution may read
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Service": "cloudfront.amazonaws.com" },
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-spa-bucket/*",
    "Condition": { "StringEquals": {
      "AWS:SourceArn": "arn:aws:cloudfront::123456789012:distribution/E1ABCDEF"
    }}
  }]
}`,
            `# ALB origin: accept only requests carrying the secret header CloudFront adds
aws elbv2 create-rule --listener-arn <https-listener-arn> --priority 1 \\
  --conditions 'Field=http-header,HttpHeaderConfig={HttpHeaderName=X-Origin-Verify,Values=["3f9c...secret"]}' \\
  --actions Type=forward,TargetGroupArn=<tg-arn>
aws elbv2 modify-listener --listener-arn <https-listener-arn> \\
  --default-actions 'Type=fixed-response,FixedResponseConfig={StatusCode=403,ContentType=text/plain,MessageBody=forbidden}'

# ALB security group: only CloudFront origin-facing IPs may connect
PL=$(aws ec2 describe-managed-prefix-lists --filters Name=prefix-list-name,Values=com.amazonaws.global.cloudfront.origin-facing \\
  --query 'PrefixLists[0].PrefixListId' --output text)
aws ec2 authorize-security-group-ingress --group-id sg-alb --ip-permissions \\
  "IpProtocol=tcp,FromPort=443,ToPort=443,PrefixListIds=[{PrefixListId=$PL}]"

# WAF: managed OWASP rules + a rate limit, attached to the distribution (scope CLOUDFRONT, region us-east-1)
aws wafv2 create-web-acl --region us-east-1 --scope CLOUDFRONT --name web-acl \\
  --default-action Allow={} --visibility-config SampledRequestsEnabled=true,CloudWatchMetricsEnabled=true,MetricName=webacl \\
  --rules '[
    {"Name":"common","Priority":1,"OverrideAction":{"None":{}},"Statement":{"ManagedRuleGroupStatement":{"VendorName":"AWS","Name":"AWSManagedRulesCommonRuleSet"}},"VisibilityConfig":{"SampledRequestsEnabled":true,"CloudWatchMetricsEnabled":true,"MetricName":"common"}},
    {"Name":"rate","Priority":2,"Action":{"Block":{}},"Statement":{"RateBasedStatement":{"Limit":2000,"AggregateKeyType":"IP"}},"VisibilityConfig":{"SampledRequestsEnabled":true,"CloudWatchMetricsEnabled":true,"MetricName":"rate"}}
  ]'`,
          ],
          questions: [
            {
              question: "How do you stop users from bypassing CloudFront and hitting your S3 bucket or ALB directly?",
              solution: "<p>For <strong>S3</strong>, keep the bucket private and use <strong>Origin Access Control</strong> so CloudFront signs its requests, with a bucket policy allowing only that distribution's ARN. For an <strong>ALB</strong>, have CloudFront add a secret custom header and reject requests without it (via WAF or listener rule), and restrict the ALB security group to the <strong>CloudFront managed prefix list</strong> so only CloudFront IPs can connect. Optionally make the ALB internal and use VPC origins.</p>",
            },
            {
              question: "What is Origin Access Control and how does it differ from the older Origin Access Identity?",
              solution: "<p>Both let CloudFront read a <strong>private S3 bucket</strong> on behalf of viewers. <strong>OAI</strong> was a special CloudFront principal referenced in the bucket policy. <strong>OAC</strong> is the replacement: CloudFront signs origin requests with <strong>SigV4</strong> and the bucket policy grants the <code>cloudfront.amazonaws.com</code> service principal access conditioned on the distribution ARN. OAC supports <strong>SSE-KMS encrypted objects</strong>, all AWS regions including opt-in ones, dynamic requests such as PUT and DELETE, and finer-grained control; AWS recommends migrating from OAI.</p>",
            },
            {
              question: "What can AWS WAF on CloudFront protect against, and how do you roll it out safely?",
              solution: "<p>WAF inspects each request at the edge and can block <strong>SQL injection, cross-site scripting and known bad inputs</strong> (managed rule groups), <strong>abusive IPs</strong> (rate-based rules and IP reputation lists), <strong>unwanted geographies</strong>, and <strong>bots</strong> (Bot Control). Roll out by attaching the web ACL with rules in <strong>count mode</strong>, reviewing sampled requests and logs for false positives over a few days, adding exclusions or scope-down statements for legitimate traffic, then switching rules to block one at a time.</p>",
            },
            {
              question: "What is the difference between Shield Standard and Shield Advanced?",
              solution: "<p><strong>Shield Standard</strong> is free and always on for CloudFront, Route 53 and Global Accelerator, mitigating common <strong>network and transport layer</strong> (L3/L4) DDoS attacks automatically. <strong>Shield Advanced</strong> is a paid subscription that adds <strong>application layer</strong> detection, automatic application-layer mitigations that create WAF rules during an attack, near-real-time attack visibility, access to the Shield Response Team, protection for ALB, EC2 and Elastic IPs, and <strong>cost protection</strong> that credits scaling charges caused by an attack.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html",
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/restrict-access-to-load-balancer.html",
            "https://docs.aws.amazon.com/waf/latest/developerguide/cloudfront-features.html",
          ],
        },
        {
          topic: "Edge Compute & Signed URLs",
          tags: ["aws", "cloudfront", "cloudfront functions", "lambda@edge", "signed urls"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  CloudFront can run code at the edge and can gate access to private content cryptographically. These features turn the CDN from a passive cache into a programmable layer for routing, authentication and personalisation without touching the origin.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">CloudFront Functions</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Lightweight <strong>JavaScript</strong> executed at <strong>every edge location</strong> in under a millisecond, millions of requests per second.</li>
  <li>Events: <strong>viewer request</strong> and <strong>viewer response</strong> only. No network access, no filesystem, a few milliseconds of CPU, 10 KB of code (2 MB with KeyValueStore).</li>
  <li>Use for: URL rewrites and redirects, SPA routing (map extension-less paths to <code>index.html</code>), header normalisation for a better cache key, simple JWT validation, A/B bucketing via cookie, adding security headers.</li>
  <li><strong>CloudFront KeyValueStore</strong> provides low-latency key lookups (feature flags, redirect maps) without redeploying the function.</li>
  <li>Roughly one sixth the cost of Lambda@Edge.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Lambda@Edge</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Full <strong>Node.js or Python Lambda</strong> functions replicated from us-east-1 to <strong>regional edge caches</strong>.</li>
  <li>All four events: viewer request, <strong>origin request</strong>, <strong>origin response</strong>, viewer response. Origin events run only on cache misses, so they are cheap for heavy logic.</li>
  <li>Up to 5 seconds (viewer) or 30 seconds (origin), network access, larger packages.</li>
  <li>Use for: dynamic origin selection (route by country or tenant), calling an auth service or fetching a token from DynamoDB, image resizing on origin response, server-side rendering fragments, rewriting origin responses.</li>
  <li>Deployed as a published version; no environment variables, use SSM or code constants.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Signed URLs and signed cookies</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Restrict access to <strong>private content</strong> (paid video, downloads, per-user assets) without making the origin public or proxying bytes through your servers.</li>
  <li>You register a <strong>public key</strong> in a <strong>key group</strong>; your backend signs a policy (resource, expiry, optional IP range) with the private key.</li>
  <li><strong>Signed URL:</strong> One object per URL; ideal for individual downloads. <strong>Signed cookies:</strong> Many objects (HLS/DASH segments, an image gallery) without rewriting every URL.</li>
  <li>The behaviour is set to <strong>restrict viewer access</strong> to trusted key groups; unsigned or expired requests receive 403.</li>
  <li>Compare with <strong>S3 pre-signed URLs</strong>: those bypass CloudFront and its caching and WAF, so use CloudFront signing when the CDN is in the path.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Other edge features</h4>
<p style="line-height: 1.75;"><strong>Geo restriction</strong> allows or blocks countries per distribution. <strong>Field-level encryption</strong> encrypts sensitive form fields at the edge with your public key so only one backend component can decrypt them. <strong>Real-time logs</strong> stream request data to Kinesis within seconds for operational dashboards.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "CloudFront Functions are sub-millisecond JavaScript at every edge for rewrites, redirects and header normalisation; Lambda@Edge is full Node or Python at regional edges with network access for origin selection and authentication on cache misses. For private content I use signed URLs for single objects and signed cookies for many, signed by my backend with a key registered in a CloudFront key group, so the origin stays private and I keep caching and WAF in the path."</div>
</div>`,
          examples: [
            `// CloudFront Function (viewer request): SPA routing + canonical lowercase paths
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  // Normalise for a better cache hit ratio
  request.uri = uri.toLowerCase();
  // Client-side routes have no file extension: serve the app shell
  if (!request.uri.includes(".")) {
    request.uri = "/index.html";
  }
  return request;
}

// CloudFront Function (viewer response): security headers on every response
function handler(event) {
  var response = event.response;
  var h = response.headers;
  h["strict-transport-security"] = { value: "max-age=63072000; includeSubDomains; preload" };
  h["x-content-type-options"] = { value: "nosniff" };
  h["x-frame-options"] = { value: "DENY" };
  h["content-security-policy"] = { value: "default-src 'self'; img-src 'self' data:; script-src 'self'" };
  return response;
}`,
            `// Lambda@Edge (origin request): route tenants to different origins
export const handler = async (event) => {
  const request = event.Records[0].cf.request;
  const host = request.headers.host[0].value;             // acme.app.example.com
  const tenant = host.split(".")[0];
  const region = tenant.startsWith("eu-") ? "eu-west-1" : "us-east-1";
  request.origin = {
    custom: {
      domainName: "api-" + region + ".internal.example.com",
      port: 443, protocol: "https", path: "", sslProtocols: ["TLSv1.2"],
      readTimeout: 30, keepaliveTimeout: 5, customHeaders: {},
    },
  };
  request.headers.host = [{ key: "host", value: "api-" + region + ".internal.example.com" }];
  return request;
};`,
            `// Node.js backend: issue a CloudFront signed URL valid for 10 minutes
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";

export function downloadLink(objectPath) {
  return getSignedUrl({
    url: "https://media.example.com" + objectPath,
    keyPairId: process.env.CF_KEY_PAIR_ID,          // public key ID from the key group
    privateKey: process.env.CF_PRIVATE_KEY,          // PEM, from Secrets Manager
    dateLessThan: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
  });
}`,
          ],
          questions: [
            {
              question: "What is the difference between CloudFront Functions and Lambda@Edge?",
              solution: "<p><strong>CloudFront Functions</strong> run lightweight JavaScript at every edge location in under a millisecond, only on viewer request and viewer response, with no network or filesystem access. They suit header manipulation, redirects, URL rewrites and simple token checks. <strong>Lambda@Edge</strong> runs Node.js or Python at regional edge caches on all four events (viewer/origin request and response), with up to 30 seconds and network access, for things like origin selection, dynamic content generation or calling an auth service. Functions are roughly a sixth of the cost.</p>",
            },
            {
              question: "How do you serve private content such as paid videos through CloudFront?",
              solution: "<p>Use <strong>signed URLs</strong> (per object) or <strong>signed cookies</strong> (many objects, such as HLS segments). Your backend signs a policy containing the resource, expiry and optional IP range with a private key registered in a CloudFront <strong>key group</strong>; the distribution's behaviour is set to require trusted key groups, so unsigned or expired requests get 403. Combine with OAC so the S3 origin itself is private, and set short expiries with refresh for long sessions.</p>",
            },
            {
              question: "When would you choose a CloudFront signed URL over an S3 pre-signed URL?",
              solution: "<p>An <strong>S3 pre-signed URL</strong> points directly at S3, bypassing CloudFront, so you lose edge caching, WAF, custom domains and geo restrictions, and every download is served from one region. A <strong>CloudFront signed URL</strong> keeps the request on your CDN domain with all those benefits and works for any origin, not just S3. Use S3 pre-signed URLs for direct browser uploads and one-off internal access; use CloudFront signing for delivering protected content to end users at scale.</p>",
            },
            {
              question: "Why do origin request and origin response Lambda@Edge triggers cost less to use than viewer triggers?",
              solution: "<p>Viewer triggers execute on <strong>every request</strong>, including cache hits, because they run before CloudFront checks the cache. Origin triggers execute only on <strong>cache misses</strong>, when CloudFront must go to the origin, so with a healthy hit ratio they run for a small fraction of traffic. Put expensive logic such as authentication lookups, image transformation or origin selection on origin events, and keep viewer events for cheap operations that must run every time.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html",
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-at-the-edge.html",
            "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PrivateContent.html",
          ],
        },
      ],
    },
  ],
};
