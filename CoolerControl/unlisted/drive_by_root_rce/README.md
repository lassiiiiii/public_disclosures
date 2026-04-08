# Full exploit chain, drive-by root RCE

Chaining together [CVE-2026-5300](../../CVE-2026-5300) (unauth functionality), [CVE-2026-5301](../../CVE-2026-5301) (stored XSS), and [CVE-2026-5208](../../CVE-2026-5208) (command injection) to achieve full root pwn by having the user navigate to a malicious website ^___^

Had a lot of fun researching this. Major browsers allowing 3rd party requests to localhost by default is bonkers!  

PoC video:

[poc_rce.webm](https://github.com/user-attachments/assets/6c722f83-615a-4c8d-9efa-57e71330ae46)

## Notes

The separate issues already had CVEs, so GitLab did not see necessary to issue a CVE for the exploit chain. Understandable.

## Timeline

- 25.01.2026 - 27.01.2026: Found the vulnerabilities

- 27.01.2026: The project had no SECURITY.md, tried to contact the maintainer (Guy Boldon) on Discord

- 01.02.2026: No answer on Discord dm, went to their Discord channel and asked the other maintainers/moderators to create a private room there. Demoed the vulnerability, mainly with the exploitchain video

- 02.02.2026: One of the maintainers told me to open a confidential issue with the report on GitLab, so I did (in retrospect this is the first thing I should've done...). They replied to me the same day, agreeing with the report

- 08.03.2026: CoolerControl `4.0.0` released, fixing the vulnerabilities

- 12.03.2026: Verified that the fixes worked correctly, we agree with the maintainer on public disclosure in 30 days from fix

- 15.03.2026: Guy Boldon requests the CVE [from GitLab](https://about.gitlab.com/security/cve/)

- 05.04.2026: GitLab responds that the exploit chain won't be issued a CVE

- 09.04.2026: Published the report and PoC here
