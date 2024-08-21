# This script will output all valid Base+Threat CVSS v4.0 vector strings.
# Only Base and Threat CVSS metric vectors are used, excluding Environmental.
# https://www.first.org/cvss/

import itertools

baseThreatMetrics = [
    # Base (11 metrics)
    ["CVSS:4.0/AV:N/", "CVSS:4.0/AV:A/", "CVSS:4.0/AV:L/", "CVSS:4.0/AV:P/"],
    ["AC:L/", "AC:H/"],
    ["AT:N/", "AT:P/"],
    ["PR:N/", "PR:L/", "PR:H/"],
    ["UI:N/", "UI:P/", "UI:A/"],
    ["VC:H/", "VC:L/", "VC:N/"],
    ["VI:H/", "VI:L/", "VI:N/"],
    ["VA:H/", "VA:L/", "VA:N/"],
    ["SC:H/", "SC:L/", "SC:N/"],
    ["SI:H/", "SI:L/", "SI:N/"],
    ["SA:H/", "SA:L/", "SA:N/"],
    # Threat (1 metric)
    ["E:X", "E:A", "E:P", "E:U"],
]

count = 0

for element in itertools.product(*baseThreatMetrics):
    str = ''
    for item in element:
        str = str + item
    print(str)
