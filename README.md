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

## cvss-bt Tool

For scoring consumers looking to include more sources of threat information alongside their CVSS calculations, see the cvss-bt tool.

https://github.com/t0sche/cvss-bt
