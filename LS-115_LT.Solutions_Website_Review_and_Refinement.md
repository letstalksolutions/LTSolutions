# Epic: LS-115 – LT.Solutions Website Review & Refinement  
**Date:** 27 Oct 2025  
**Author:** Sky (for Andreas Nyberg)  
**Status:** Draft for upload to Jira Epic LS-115  

---

## Overview

This document consolidates all identified issues, recommendations, and Jira mappings from the **LT.Solutions Current Live Website Review (27 Oct 2025)**.  
Each section maps to existing Jira tickets LS-116 through LS-122 and rolls up to the parent Epic **LS-115 – Website Review & Refinement**.

**Note to Claude:** Remove any LONG DASHES (“--”) from all text and code files before next commit.

---

## 🧩 Summary of Issues Identified

### Layout & Design
- Spacing inconsistencies between sections (About, Packages) causing cramped appearance.
- Hero subtitle wraps unevenly below 768px; line breaks disrupt hierarchy.
- Value cards misaligned on mobile; inconsistent top padding.
- Hover flicker on touch devices when scrolling.
- Missing gradient or visual divider between Testimonials and CTA sections.
- Footer icon hover contrast regression (should return to brand red).

### Content & Copy
- “Our Foundation” text dense; needs shorter paragraph split for readability.
- “Continuity” value card still cached as “Sustainability” in some instances.
- Font-weight inconsistency (hero subtitle uses 400 instead of 500).
- Missing cue line above “Why Work With Me” to smooth tone shift from company to personal.
- Industry context missing under “Why Partner With LT.Solutions.”

### Technical & Accessibility
- `aria-current="page"` missing from active menu items.
- Parallax effect not disabled for users with `prefers-reduced-motion` enabled.
- Hero image causes small LCP spike (~1.3s) on mobile.
- JSON-LD structured data (`Organization`, `WebSite`) missing from `<head>`.
- Canonical and OG tags inconsistent across subpages.
- `robots.txt` disallows `/packages/`; to be lifted once page is live.

---

## 🎨 Design & UX Review (LS-116)

| Area | Observation | Recommendation |
|------|--------------|----------------|
| Hero | Secondary tagline too narrow on mobile | Add `max-width: 640px; line-height: 1.6` |
| Value Cards | Icons visually small | Increase SVG ~20% or reduce padding |
| Flip Cards | Accidental flips on touch devices | Restrict flip to pointer:fine |
| Testimonials | Missing visual anchors | Add badges or initials icons |
| Footer CTA | Equal button weight | Make red primary; outline secondary |
| Section Padding | Tight vertical spacing | Increase `padding-block` to 6rem |

**Next Steps:** Apply fixes across all sections and verify on mobile/tablet breakpoints.  

---

## 🧭 Messaging & Conversion Review (LS-117)

**Strengths**
- Clear articulation of LT.Solutions purpose within first scroll.
- Professional copy, ISO/ITSM tone, and clear CTAs.  

**Issues**
- Add Atlassian Partner badge for instant credibility.  
- Insert brief industry line: “We work with media, technology, and analytics teams.”  
- Reinstate the cue line before “Why Work With Me.”  

**Next Steps:** Update copy blocks and validate spacing after content edit.  

---

## ♿ Accessibility & Compliance (LS-118)

| Item | Issue | Recommendation |
|------|--------|----------------|
| Navigation | Missing `aria-current` attribute | Add dynamically for current page |
| Animation | Parallax ignores reduced-motion | Respect user preference in CSS/JS |
| Contrast | Footer icons hover low contrast | Use brand red hover |
| Structure | Missing logical section headings on some subpages | Ensure H2 per section, H3 for cards |

**Next Steps:** Test with Chrome Lighthouse accessibility audit and axe-core plugin.  

---

## ⚙️ Performance Analysis (LS-119)

**Findings**
- Lighthouse desktop: 100/100  
- Lighthouse mobile: 93/100 due to LCP from hero asset.  
- Render-blocking scripts minimal; CSS inline optimised.  

**Recommendations**
- Preload hero SVGs and high-priority images.  
- Defer non-critical JS and animation triggers.  
- Maintain lazy-loading for testimonial imagery.  

**Next Steps:** Re-test after implementing image preloading and verify mobile LCP < 1s.  

---

## 🔍 Technical SEO & Structured Data (LS-120)

| Element | Current State | Action |
|----------|----------------|--------|
| Canonical Tags | Missing from some subpages | Add canonical to all pages |
| Open Graph Data | Missing on /about and /packages | Include OG title, description, image |
| JSON-LD Schema | Not yet implemented | Add `Organization` and `WebSite` markup |
| robots.txt | Blocks /packages | Allow once ready; update sitemap |
| Sitemap | Lacks canonical paths | Regenerate sitemap post-release |

**Next Steps:** Implement schema and metadata across all live pages. Validate in Google Rich Results Test.  

---

## 🧱 Regression Report (LS-121)

**Regression Areas Compared to Phase 4.8**
1. Section padding reduced from 6rem → 4rem.  
2. Hero subtitle line-height change (1.8 → 1.4).  
3. Button hierarchy flattened (brand red + outline style parity).  
4. Missing fade divider between Testimonials and CTA.  
5. Accessibility regression: `aria-current` removed in nav.  

**Recommendation:** Revert or patch spacing and typography per the 4.8 baseline.  

---

## 📘 Comprehensive Report (LS-122)

Deliverable: [lt_solutions_live_site_review_2025-10-27.md](sandbox:/mnt/data/lt_solutions_live_site_review_2025-10-27.md)  
Covers:
- All UX, content, technical, and SEO findings.  
- Prioritised recommendations for Phase 5.8.  

**Next Steps:**
- Attach this document to LS-122 as completion evidence.  
- Link LS-121 through LS-120 as related subtasks.  

---

## 🔗 Issue Mapping Table

| Jira Key | Summary | Category | Current Status | Notes |
|-----------|----------|-----------|----------------|-------|
| LS-116 | Audit website layout and visual design for inconsistencies | Design & Layout | Backlog | Refer to “Design & UX Review” section |
| LS-117 | Evaluate website content and messaging clarity | Copy & Messaging | Backlog | Content and CTA tone refinement |
| LS-118 | Conduct accessibility compliance review | Accessibility | Backlog | Add `aria-current`, adjust motion |
| LS-119 | Analyze website performance and load times | Performance | Backlog | LCP and hero preload optimisation |
| LS-120 | Review technical SEO and structured data implementation | Technical SEO | Backlog | Add canonical tags and JSON-LD |
| LS-121 | Identify and document regressions from previous versions | Regression Testing | Backlog | 4.8 comparison documented |
| LS-122 | Compile comprehensive report of findings and recommendations | Documentation | Backlog | This file + linked MD report |

---

## ✅ Recommendations Summary

1. Restore proper section padding and spacing across all pages.  
2. Update all subpages with canonical + OG metadata.  
3. Integrate JSON-LD structured data in `<head>`.  
4. Reinstate Atlassian Partner badge for brand authority.  
5. Implement accessibility improvements (`aria-current`, prefers-reduced-motion).  
6. Optimise hero assets and verify LCP under 1s mobile.  
7. Remove any long dashes and ensure typographic consistency.  

---

**End of Document**  
*Prepared for Jira Epic LS-115 – LT.Solutions Website Review & Refinement (27 Oct 2025)*  
