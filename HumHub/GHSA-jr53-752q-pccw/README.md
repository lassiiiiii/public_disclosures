# GHSA-jr53-752q-pccw

## Stored XSS in Tasks module checklist

https://github.com/humhub/tasks/security/advisories/GHSA-jr53-752q-pccw

## Notes

Basic stored XSS. No CVE, reasoning from HumHub:

> We are currently not planning to draw CVEs for the modules, as they are updated almost automatically via the updater process.

## Timeline

- 26.02.2026: Found the vulnerability, only sent a PoC screenshot to the HumHub contact person while we were discussing other vulnerabilities, decided to wait for the HumHub core `1.18.1` update

- 04.03.2026: Produced report and sent to security@humhub.com , response gotten almost instantly

- 06.03.2026: Issue fixed and released in HumHub Tasks module `1.9.3`, verified that the fix worked

