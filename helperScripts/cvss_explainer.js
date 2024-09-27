// cvss_explainer.js design to help explain CVSS metrics
// credit to creator Erik Cabetas, posted via CVSS SIG mailing list
// cvss_explainer.js © 2024 by Erik Cabetas is licensed under CC BY 4.0 

// Import necessary Node.js modules
const process = require('process');

// Static explanation strings for layman-friendly output
const EXPLANATIONS = {
    en: {
        baseMetrics: {
            AV: {
                N: "The attack can be launched remotely over a network.",
                A: "The attack requires physical proximity (like being in the same network).",
                L: "The attack requires local access to the system.",
                P: "The attack requires physical access to the device."
            },
            AC: {
                L: "It's easy to execute the attack.",
                H: "The attack requires more effort and preparation."
            },
            PR: {
                N: "The attacker doesn't need any special permissions.",
                L: "The attacker needs low-level permissions.",
                H: "The attacker needs high-level or administrative permissions."
            },
            UI: {
                N: "The attack can happen without any user action.",
                R: "The attack requires some user interaction."
            },
            S: {
                U: "The impact is limited to the targeted system.",
                C: "The attack can affect other systems beyond the target."
            },
            C: {
                H: "Sensitive data could be highly compromised.",
                L: "Some data could be compromised, but the impact is limited.",
                N: "The attack does not impact sensitive data."
            },
            I: {
                H: "The attack could significantly alter or corrupt data.",
                L: "Some data could be changed, but the impact is limited.",
                N: "Data integrity is not affected by this attack."
            },
            A: {
                H: "The system may become unavailable or unusable for a long time.",
                L: "The system may experience some temporary disruptions.",
                N: "The system's availability is not affected by this attack."
            }
        },
        errors: {
            invalidFormat: "Error: The provided CVSS vector format is invalid. Please use the correct format.",
            missingParameter: "Error: Please provide a CVSS vector string as a parameter."
        }
    }
};

// Check if a CVSS vector string is provided as a command-line argument
if (process.argv.length < 3) {
    console.log(EXPLANATIONS.en.errors.missingParameter);
    process.exit(1);
}

// Extract the CVSS vector string from the arguments
const cvssVector = process.argv[2];

// Basic format validation for the CVSS vector (CVSS:4.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:L/A:N)
const cvssRegex = /^CVSS:4\.0\/AV:[NALP]\/AC:[LH]\/PR:[NLH]\/UI:[NR]\/S:[UC]\/C:[HLN]\/I:[HLN]\/A:[HLN]$/;

if (!cvssRegex.test(cvssVector)) {
    console.log(EXPLANATIONS.en.errors.invalidFormat);
    process.exit(1);
}

// Split the CVSS vector into individual metrics
const metrics = cvssVector.split('/');

// Extract the values of each metric
const av = metrics[1].split(':')[1];
const ac = metrics[2].split(':')[1];
const pr = metrics[3].split(':')[1];
const ui = metrics[4].split(':')[1];
const s = metrics[5].split(':')[1];
const c = metrics[6].split(':')[1];
const i = metrics[7].split(':')[1];
const a = metrics[8].split(':')[1];

// Generate a narrative explanation for the CVSS vector
let narrative = `This vulnerability can be described as follows: ${EXPLANATIONS.en.baseMetrics.AV[av]} `;
narrative += `${EXPLANATIONS.en.baseMetrics.AC[ac]} `;
narrative += `${EXPLANATIONS.en.baseMetrics.PR[pr]} `;
narrative += `${EXPLANATIONS.en.baseMetrics.UI[ui]} `;
narrative += `${EXPLANATIONS.en.baseMetrics.S[s]} `;
narrative += `In terms of data protection, ${EXPLANATIONS.en.baseMetrics.C[c]} `;
narrative += `Additionally, ${EXPLANATIONS.en.baseMetrics.I[i]} `;
narrative += `Finally, from a system availability perspective, ${EXPLANATIONS.en.baseMetrics.A[a]}`;

console.log(narrative);