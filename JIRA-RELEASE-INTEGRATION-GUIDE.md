# Jira Release Integration Guide

**Project:** LT.Solutions Website
**Date:** 28 October 2025
**Versions:** 1.0.0, 1.0.1, 1.1.0

---

## 🎯 Overview

This guide explains how to link GitHub releases to Jira tickets following industry best practices.

---

## 📋 Quick Reference: Version to Tickets Mapping

### v1.0.0 - Production Launch (26 Oct 2025)
**GitHub Release:** https://github.com/letstalksolutions/LTSolutions/releases/tag/v1.0.0

**Tickets:** LS-103, LS-105, LS-106, LS-107, LS-108, LS-109, LS-110, LS-111, LS-112, LS-113, LS-114, LS-118, LS-119, LS-120, LS-123

**Key Issues:**
- LS-118: Accessibility & Design Fixes
- LS-119: Performance Optimization
- LS-120: Technical SEO & URL Consistency
- LS-114: Values Redesign
- LS-112/LS-113: Transparent Card Windows
- LS-103/LS-106/LS-107: Brand Color & Visual Improvements

---

### v1.0.1 - Post-Production Refinements (27 Oct 2025)
**GitHub Release:** https://github.com/letstalksolutions/LTSolutions/releases/tag/v1.0.1

**Tickets:** LS-125, LS-127, LS-128, LS-129, LS-129a, LS-129b, LS-129c

**Key Issues:**
- LS-125: Index page tint gradients
- LS-127: About page transformation
- LS-128: Section tag unification
- LS-129 series: Contact form glassmorphism (4-part implementation)

---

### v1.1.0 - Visual Consistency & Polish (28 Oct 2025)
**GitHub Release:** https://github.com/letstalksolutions/LTSolutions/releases/tag/v1.1.0

**Tickets:** LS-130, LS-130a, LS-130b, LS-130c, LS-131, LS-132, LS-133, LS-133a, LS-134, LS-135, LS-136, LS-136a, LS-137

**Key Issues:**
- LS-130c: Timeline Frosted Glass Design
- LS-132: Bridge Text Relocation
- LS-133: Values Section Completion
- LS-133a: Values Text Visibility Fix
- LS-134: Process-Step Enhancements
- LS-135: LinkedIn Icon Replacement
- LS-136: Footer Gradient Correction
- LS-136a: L-Shaped Border Trace Animation
- LS-137: Site-Wide Border & Accent Line Unification

---

## 📖 Method 1: Manual Update (Recommended for Small Projects)

### Step 1: Create Fix Versions in Jira

1. Go to your Jira project (https://letstalksolutions.atlassian.net/browse/LS)
2. Click **Project settings** (gear icon)
3. Select **Releases** (left sidebar)
4. Click **Create version**

**Create these versions:**

#### Version 1.0.0
```
Name: 1.0.0
Start date: 24 October 2025
Release date: 26 October 2025
Description: Production Launch - First stable release with accessibility, SEO, and performance optimizations

GitHub Release: https://github.com/letstalksolutions/LTSolutions/releases/tag/v1.0.0
```

#### Version 1.0.1
```
Name: 1.0.1
Start date: 27 October 2025
Release date: 27 October 2025
Description: Post-Production Refinements - Glassmorphism effects and section styling consistency

GitHub Release: https://github.com/letstalksolutions/LTSolutions/releases/tag/v1.0.1
```

#### Version 1.1.0
```
Name: 1.1.0
Start date: 27 October 2025
Release date: 28 October 2025
Description: Visual Consistency & Polish - Site-wide design system unification with border and accent line treatments

GitHub Release: https://github.com/letstalksolutions/LTSolutions/releases/tag/v1.1.0
```

### Step 2: Bulk Update Tickets

#### For v1.0.0 tickets:
1. Go to Jira and create a filter: `project = LS AND key in (LS-103, LS-105, LS-106, LS-107, LS-108, LS-109, LS-110, LS-111, LS-112, LS-113, LS-114, LS-118, LS-119, LS-120, LS-123)`
2. Select all tickets in the results
3. Click **Bulk Change** (⋯ menu)
4. Choose **Edit Issues**
5. Select **Change Fix Version/s**
6. Set to: `1.0.0`
7. Select **Change Status** (if not already Done)
8. Set to: `Done`
9. Review and **Confirm**

#### For v1.0.1 tickets:
1. Filter: `project = LS AND key in (LS-125, LS-127, LS-128, LS-129)`
2. Bulk update Fix Version to: `1.0.1`
3. Set Status to: `Done`

#### For v1.1.0 tickets:
1. Filter: `project = LS AND key in (LS-130, LS-131, LS-132, LS-133, LS-133a, LS-134, LS-135, LS-136, LS-136a, LS-137)`
2. Bulk update Fix Version to: `1.1.0`
3. Set Status to: `Done`

### Step 3: Add Release Notes Links

For each version in Jira:
1. Open the version details
2. Add to description:
```markdown
## Release Notes
See GitHub: https://github.com/letstalksolutions/LTSolutions/releases/tag/v1.0.0

## Live Site
https://lt.solutions
```

---

## 🤖 Method 2: Automated Update via Jira API

If you want to automate this process, use the Jira REST API.

### Prerequisites
- Jira API Token (generate at: https://id.atlassian.com/manage-profile/security/api-tokens)
- Jira email address
- Project key: `LS`

### Script: Create Versions and Update Tickets

Save this as `update-jira-releases.sh`:

```bash
#!/bin/bash

# Configuration
JIRA_URL="https://letstalksolutions.atlassian.net"
JIRA_EMAIL="your-email@example.com"
JIRA_API_TOKEN="your-jira-api-token-here"
PROJECT_KEY="LS"

# Step 1: Create Version 1.0.0
curl -X POST \
  -H "Content-Type: application/json" \
  -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -d '{
    "name": "1.0.0",
    "description": "Production Launch - First stable release\n\nGitHub: https://github.com/letstalksolutions/LTSolutions/releases/tag/v1.0.0",
    "startDate": "2025-10-24",
    "releaseDate": "2025-10-26",
    "released": true,
    "project": "LS"
  }' \
  "$JIRA_URL/rest/api/3/version"

# Step 2: Create Version 1.0.1
curl -X POST \
  -H "Content-Type: application/json" \
  -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -d '{
    "name": "1.0.1",
    "description": "Post-Production Refinements\n\nGitHub: https://github.com/letstalksolutions/LTSolutions/releases/tag/v1.0.1",
    "startDate": "2025-10-27",
    "releaseDate": "2025-10-27",
    "released": true,
    "project": "LS"
  }' \
  "$JIRA_URL/rest/api/3/version"

# Step 3: Create Version 1.1.0
curl -X POST \
  -H "Content-Type: application/json" \
  -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -d '{
    "name": "1.1.0",
    "description": "Visual Consistency & Polish\n\nGitHub: https://github.com/letstalksolutions/LTSolutions/releases/tag/v1.1.0",
    "startDate": "2025-10-27",
    "releaseDate": "2025-10-28",
    "released": true,
    "project": "LS"
  }' \
  "$JIRA_URL/rest/api/3/version"

# Step 4: Update tickets for v1.0.0
for ticket in LS-103 LS-105 LS-106 LS-107 LS-108 LS-109 LS-110 LS-111 LS-112 LS-113 LS-114 LS-118 LS-119 LS-120 LS-123; do
  echo "Updating $ticket to version 1.0.0..."
  curl -X PUT \
    -H "Content-Type: application/json" \
    -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
    -d '{
      "fields": {
        "fixVersions": [{"name": "1.0.0"}]
      }
    }' \
    "$JIRA_URL/rest/api/3/issue/$ticket"
done

# Step 5: Update tickets for v1.0.1
for ticket in LS-125 LS-127 LS-128 LS-129; do
  echo "Updating $ticket to version 1.0.1..."
  curl -X PUT \
    -H "Content-Type: application/json" \
    -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
    -d '{
      "fields": {
        "fixVersions": [{"name": "1.0.1"}]
      }
    }' \
    "$JIRA_URL/rest/api/3/issue/$ticket"
done

# Step 6: Update tickets for v1.1.0
for ticket in LS-130 LS-131 LS-132 LS-133 LS-133a LS-134 LS-135 LS-136 LS-136a LS-137; do
  echo "Updating $ticket to version 1.1.0..."
  curl -X PUT \
    -H "Content-Type: application/json" \
    -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
    -d '{
      "fields": {
        "fixVersions": [{"name": "1.1.0"}]
      }
    }' \
    "$JIRA_URL/rest/api/3/issue/$ticket"
done

echo "✅ All tickets updated with fix versions!"
```

### To run the script:
```bash
chmod +x update-jira-releases.sh
./update-jira-releases.sh
```

---

## 🔗 Method 3: GitHub-Jira Smart Commits (Retrospective)

For future commits, you can use Smart Commits syntax:

```bash
git commit -m "LS-123 #done #comment Fixed the bug #fix-version 1.0.0"
```

This automatically:
- Transitions ticket to Done
- Adds a comment
- Sets fix version

**Note:** This only works for future commits, not retroactively.

---

## 📊 Method 4: Release Hub Integration

If your Jira has the GitHub integration enabled:

1. Go to Jira Project Settings
2. Click **Integrations** → **GitHub**
3. Link your GitHub repository
4. Releases will automatically appear in Jira Release Hub

---

## ✅ Verification Checklist

After updating Jira:

- [ ] All 3 versions created in Jira (1.0.0, 1.0.1, 1.1.0)
- [ ] Each version has release date set
- [ ] Each version description includes GitHub release link
- [ ] All tickets have correct Fix Version assigned
- [ ] All tickets marked as Done/Released
- [ ] Release Hub shows deployment information (if integration enabled)

---

## 📈 Release Board View

Create a "Releases" board filter in Jira:

```jql
project = LS AND fixVersion in (1.0.0, 1.0.1, 1.1.0) ORDER BY fixVersion DESC, key ASC
```

This gives you a complete view of all released work.

---

## 🎯 Best Practices Going Forward

### For Each New Release:

1. **During Development:**
   - Add Fix Version to tickets as you create them
   - Use consistent version naming (SemVer)

2. **Before Release:**
   - Verify all tickets have Fix Version set
   - Create release in Jira with target date

3. **After GitHub Release:**
   - Update Jira version with GitHub release URL
   - Mark version as "Released"
   - Generate release notes in Jira

4. **Communication:**
   - Share Jira release notes with stakeholders
   - Link to GitHub release for technical details

---

## 📝 Template for Future Releases

### Jira Version Description Template:
```markdown
## GitHub Release
https://github.com/letstalksolutions/LTSolutions/releases/tag/vX.Y.Z

## Live Site
https://lt.solutions

## Summary
[Brief description of what's in this release]

## Key Features
- Feature 1
- Feature 2
- Feature 3

## Bug Fixes
- Fix 1
- Fix 2

## Credits
Lead Developer: Claude Code (Sonnet 4.5)
Product Owner: Andreas Nyberg
```

---

## 🔍 Troubleshooting

### Issue: Can't find "Releases" in Jira
**Solution:** Look for "Versions" instead. In some Jira configurations, releases are called "versions".

### Issue: API returns 403 Forbidden
**Solution:**
- Verify API token is still valid
- Check you have "Administer Projects" permission
- Ensure you're using your email, not username

### Issue: Tickets don't show Fix Version field
**Solution:**
- Go to Project Settings → Issue Types
- Edit the issue type (e.g., Story, Task)
- Add "Fix Version/s" field to the screen

---

## 📚 Additional Resources

- [Jira REST API Documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)
- [Semantic Versioning 2.0.0](https://semver.org/)
- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [Smart Commits Reference](https://support.atlassian.com/jira-software-cloud/docs/process-issues-with-smart-commits/)

---

**Document Status:** Ready for implementation
**Last Updated:** 28 October 2025
**Next Review:** Before v1.2.0 release
