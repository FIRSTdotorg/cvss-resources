# This script will output a set of CVSS v4.0 vector strings that contain the highest set of vector strings for each set.
# All CVSS metric vectors are used.
# See the CVSS documentation for an explanation of macrovectors.
# https://www.first.org/cvss/v4.0/specification-document#CVSS-v4-0-Scoring-using-MacroVectors-and-Interpolation

import itertools

baseMetrics = [
    # Highest sets of vectors for each metric set
    ["CVSS:4.0/AV:N/PR:N/UI:N/", "CVSS:4.0/AV:A/PR:N/UI:N/", "CVSS:4.0/AV:P/PR:N/UI:N/"],
    ["VC:H/VI:H/VA:H/CR:H/IR:H/AR:H", "VC:H/VI:H/VA:H/CR:M/IR:M/AR:M", "VC:L/VI:H/VA:H/CR:H/IR:H/AR:H", "VC:H/VI:L/VA:H/CR:M/IR:H/AR:M", "VC:L/VI:L/VA:L/CR:H/IR:H/AR:H"],
]

complexityMetrics = ["AC:L/AT:N/", "AC:L/AT:P/"]

secondaryMetrics = ["SC:H/SI:S/SA:S/", "SC:H/SI:H/SA:H/", "SC:L/SI:L/SA:L/"]

exploitabilityMetrics = ["E:A/", "E:P/", "E:U/"]

for element in itertools.product(*baseMetrics):
    vectorString = ''
    for item in element:
        vectorString = vectorString + item
    for x in complexityMetrics:
                # search string for item, and at that location, append element
                # if the strings are the same length we don't need to search
        vector = str(x)
        complexityVectorString = vectorString[:14] + vector + vectorString[14:]
        for x in secondaryMetrics:
                # search string for item, and at that location, append element
                # if the strings are the same length we don't need to search
            vector = str(x)
            if vector == "SC:H/SI:S/SA:S/":
                secVS = complexityVectorString[:49] + "SC:H/SI:H/SA:H/" + complexityVectorString[49:] + "/MSI:S/MSA:S"
            else:
                secVS = complexityVectorString[:49] + vector + complexityVectorString[49:]
            for x in exploitabilityMetrics:
                vector = str(x)
                fullString = secVS[:64] + vector + secVS[64:]
                print(fullString)    
