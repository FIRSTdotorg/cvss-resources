# CVSS Resources

This repo is maintained by the FIRST CVSS SIG to list resources used for the CVSS standard.

See more at FIRST: https://www.first.org/cvss/

# CVSS Calculator Validation

For those who wish to implement calculators in their own environments, see the vectorFiles folder for sets of CVSS version 4.0 vectors for use in testing. 

Scripts contained in the vectorEnum folder can be used to generate set of vectors locally or adapted for other use.

Refer to the CVSS v4.0 FAQ document for additional details.

## CVSS helper libraries

Below is a list of libraries providing CVSS scoring functionality. The CVSS SIG makes no guarantees about the accuracy of the scoring output. Validate the use of these libraries with the guidance in the FAQ entry.

https://www.first.org/cvss/v4.0/faq#List-of-Calculator-Libraries

**Origin of the official calculator**
RedHatSecurity : https://github.com/RedHatProductSecurity/cvss

Python version of the Red Hat library: https://pypi.org/project/cvss/

API implementation of the official calculator, by Akshat Vaid: https://github.com/akshatvaid/cvss-v4-node-api

### Other ports

**(JavaScript/TypeScript)** pandatix : https://github.com/pandatix/js-cvss

**(Golang)** pandatix : https://github.com/pandatix/go-cvss

**(Rust)** emocrab : https://github.com/emo-crab/nvd-rs/tree/main/nvd-cvss 

**(Python)** Benjamin Edwards : https://github.com/bjedwards/cvss4py 

**(Typst)** Drake Axelrold : https://github.com/DrakeAxelrod/cvss.typ

**(Perl)** Giuseppe Di Terlizzi : https://github.com/giterlizzi/perl-CVSS

# Other CVSS Resources

## Learning Resources

### CVSS usage by Marta Rybczynska

Helpful blog post about CVSS v4.0 usage from the Eclipse Foundation.
https://blogs.eclipse.org/post/marta-rybczynska/update-vulnerability-description-cvss-40

## Software Tools

### cvss-bt Tool

For scoring consumers looking to include more sources of threat information alongside their CVSS calculations, see the cvss-bt tool.

https://github.com/t0sche/cvss-bt

### Netking's CVSS data extractors

Various tools for extracting CVSS data from content and determining mathematical weights of CVSS scoring values.

https://github.com/NetKingJ/CVSS

### Nick's various CVSS tools

Various tools for CVSS work.

#### cvss-reverse

Generate CVSS v3.1 vector strings from existing v4.0 strings. Can be used to automate vector string generation.
https://github.com/nickleali/mycvss/blob/main/cvss_reverse.py

#### cvss-comparer

Tied to the 2025 VulnCon talk "CVSS By the Numbers", this tool compares sets of CVSS v3.1 and v4.0 vector strings and does mathematical analysis on the evaluations. Useful for determining changes in score data between the standards to guide decision-making.
https://github.com/nickleali/mycvss/tree/main/cvss-comparer
