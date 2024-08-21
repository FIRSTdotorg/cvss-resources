# This script will output all valid Base CVSS v4.0 vector strings.
# Only the base CVSS metric vectors are used. 
# https://www.first.org/cvss/

import itertools

baseMetrics = [
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
    ["SA:H", "SA:L", "SA:N"],
]

for element in itertools.product(*baseMetrics):
    str = ''
    for item in element:
        str = str + item
    print(str)
