# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML and CSS. Deployment target is undecided.

## Users

The primary audience is technical founders evaluating Sahil Pohare for founding, staff, or principal engineering work. They need to understand his technical depth, operating judgment, and ability to turn severe constraints into production advantage, then start a conversation.

## Product Purpose

The portfolio presents Sahil as an engineer with a founder story: a founder-minded zero-to-one operator who also has unusual technical depth. It should make a technical founder confident that he can decide what is worth building, talk to users, translate ambiguity into product, lead early execution, and choose architecture that protects runway. Success is a qualified conversation about a founding engineer or technical leadership role.

## Positioning

Sahil has operated on both sides of the founder-engineer relationship: employee #1 at AiSentr, engineer at YC-backed Orange Health, and founder of his own products. His differentiator is pragmatic zero-to-one judgment: customer discovery, deciding what to build, translating founder intent into shipped product, and choosing early architecture that extends rather than consumes runway. "Building on peanuts," deep distributed-systems work, and more than $200K in annual cloud savings are evidence of that judgment.

## Operating Context

The portfolio is evaluated quickly by technically sophisticated visitors. Its source material spans production systems, open-source repositories, founder-led products, conference writing, career history, and quantified operating outcomes. The canonical career and project facts live in `cv.md`; additional positioning and proof points live in `config/profile.yml`.

## Capabilities and Constraints

- Static HTML and CSS implementation; lightweight progressive JavaScript is acceptable only where the experience requires it.
- The portfolio must work on desktop and mobile and remain understandable without animation.
- Preserve factual metrics and links from `cv.md` and `config/profile.yml`; do not invent customers, benchmarks, testimonials, or commercial claims.
- The primary action is to start a conversation through Sahil's LinkedIn profile. The deployment host remains an open decision.

## Brand Commitments

- Name: Sahil Pankaj Pohare.
- Voice: technically precise, candid, resourceful, and willing to be unconventional without becoming performative.
- "Building on peanuts" is the organizing philosophy, not a claim of low quality.
- Founder-minded zero-to-one judgment is the primary narrative; technical specialisms are supporting evidence.
- The portfolio should represent founder-operator judgment, distributed-systems depth, kitchen infrastructure, and cost optimization as connected strengths rather than forcing one to displace the others.
- The portfolio's visual world is strictly black and white. Animated ASCII governs navigation, diagrams, transitions, and spatial depth; the primary 3D ASCII object must let visitors explore MoltMesh rather than exist as ambient decoration.

## Evidence on Hand

- `cv.md`: canonical career history, project descriptions, metrics, links, talks, awards, and education.
- `config/profile.yml`: narrative, target roles, superpowers, and concise proof points.
- AiSentr: employee number one; platform work from zero to GBP 500K ARR and a reported USD 10M valuation; GBP 60K annual infrastructure savings.
- Skyfern AI and Pingerchips: after GCP and AWS credits ran out, normal production compute moved to a physical Kubernetes node in Sahil's kitchen, exposed through Cloudflare tunnels and controlled by a free Azure master. PAYG cloud pods run only during home downtime, while transaction-critical paths stay on Vercel/serverless. This avoided roughly USD 8K per month in equivalent baseline cloud spend.
- Pingerchips Realtime: five B2B customers and 800+ daily visitors, using Elixir, Rust, and real-time infrastructure.
- Bot.space: database costs reduced from roughly USD 6K to USD 2K per month, doubled message throughput, and materially faster feature delivery.
- MoltMesh, Mimir, and the Master's thesis provide inspectable peer-to-peer, agent, and distributed-compute artifacts.
- No approved portrait, testimonials, client logos, or portfolio-specific imagery are currently available in the repository.

## Product Principles

- Establish who Sahil is, what he builds, and why that matters before asking visitors to interpret technical artifacts.
- Prove technical authority through inspectable systems and specific decisions, not skill lists.
- Connect engineering choices to economic and product outcomes.
- Make constraint-driven ingenuity feel rigorous rather than scrappy.
- Reward technical curiosity while keeping the path to contact obvious.
- Preserve Sahil's breadth as one coherent operating philosophy.

## Accessibility & Inclusion

Use semantic HTML, keyboard-accessible interactions, visible focus treatment, sufficient contrast, responsive layouts, reduced-motion support, and meaningful content order without relying on color or motion alone.
