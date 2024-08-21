Future repository for public resources related to the Common Vulnerability Scoring System (CVSS).

# CVSS Calculator Validation

For those who wish to implement calculators in their own environments, see the vectorFiles folder for sets of CVSS version 4.0 vectors for use in testing. 

Scripts contained in the vectorEnum folder can be used to generate set of vectors locally or adapted for other use.

Refer to the CVSS v4.0 FAQ document for additional details.

## CVSS helper libraries

Below is a list of libraries providing CVSS scoring functionality. The CVSS SIG makes no guarantees about the accuracy of the scoring output. Validate the use of these libraries with the guidance in this FAQ entry.

Origin of the official calculator
RedHatSecurity : https://github.com/RedHatProductSecurity/cvss

Other ports(JavaScript/TypeScript) pandatix : https://github.com/pandatix/js-cvss
(Golang) pandatix : https://github.com/pandatix/go-cvss

API implementation of the official calculator, by  Akshat Vaid: https://github.com/akshatvaid/cvss-v4-node-api
