# Stored XSS in Meetings module

https://marketplace.humhub.com/module/meeting/changelog (in 0.9.1 (March 6, 2026))

## Notes

Basic stored XSS. No CVE or advisory, reasoning from HumHub:

> We are currently not planning to draw CVEs for the modules, as they are updated almost automatically via the updater process. Unfortunately, security advisories are not available to us on GitHub for private repositories such as the Meetings module.

## Timeline

- 26.02.2026: Found the vulnerability, only sent a PoC screenshot to the HumHub contact person while we were discussing other vulnerabilities, decided to wait for the HumHub core `1.18.1` update

- 04.03.2026: Produced report and sent to security@humhub.com , response gotten almost instantly

- 06.03.2026: Issue fixed and released in HumHub Meetings module `0.9.1`, verified that the fix worked
