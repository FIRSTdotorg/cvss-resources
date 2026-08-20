# Approach

List common concerns with the existing specification document and offer suggestions for improvements.

## Concerns

This is a list of concerns and common questions that arise when performing vulnerability impact assessment using CVSS.

Increase Emphasis on BTE
Expand Section 4 – Environmental
More descriptive examples / reasons, like Base
Simplify language for Threat as previously suggested
Consider change for Vendor-provided Threat
Clarify Attack Vector: Adjacent
But point to Environmental
Clarifications and use cases for Supplemental
Provider Urgency not as a short-cut for prioritization
Additional language clarifications, suggested keywords
Absolute versus worst case

## FAQ / User Guide items



### General Usage

Absolute versus worst-case

Informing and clarifying base score. 

#### Base assessments 

Is it misguided to ask consumers to perform vector enrichment?
If CVSS-B is not enough for prioritization, what is CVSS-B for?

CVSS-B and “reasonable worst-case”
Is this language still the intention or do we want to consider something more like “independent of deployed assets”
Possibly include mention and specify “intended use”


### Exploitability Metrics

#### Attack Vector

Clarify Adjacent to ensure this relates the nature of the vulnerability, not the place of the asset in the environment.

##### Desired change

+ where the limited administrative domain restricts access based on technological limitations, not the presence of other security controls or deployment characteristics

#### Attack Complexity

No specific changes.

#### Attack Requirements

Ensure that we clarify that this is not related to system configuration, and add in a new criteria for ephemeral systems.

Confusion over configuration, the “deployment and execution conditions”. Need to be more explicit that we assess systems in a vulnerable configuration. 

##### Desired change

- This metric captures the prerequisite deployment and execution conditions or variables of the vulnerable system that enable the attack

+ This metric captures the variance of system states that may cause unreliable attacks.

Net addition: 
+ Ephemeral systems that may not always be accessible and do not persist between creation and removal.

#### Privileges Required

As written, assigning PR:High should rarely if ever result in privilege delta and CIA impacts. We need to clarify what is PR:H, without calling this admin.

What is the intent to PR:H?
- Significant but not full access? 
- Full access but there is CIA measurable beyond full access?

If the attacker already has significant (e.g., administrative) control, what could they possibly gain through exploiting a vulnerability

What is the intent and how can this documentation be improved?
Measuring what the attacker can gain by exploitation

“This metric describes the level of privileges an attacker must possess (for the vulnerable system) prior to successfully exploiting the vulnerability.”

##### Desired change

- The attacker requires privileges that provide significant (e.g., administrative) control over the vulnerable system allowing full access to the vulnerable system’s settings and files.

+ The attacker requires privileges that provide significant control over the vulnerable system that allow for modification of at least some of the vulnerable system’s settings and files.

Net new (Assessment Guidance): 
+ Determine if privileges required by an attacker already provide complete control over the system. If so, an attacker likely gains no additional privileges through exploitation, and there is no net increase in access for an attacker. 

https://www.cve.org/resourcessupport/allresources/cnarules#section_4-1_Vulnerability_Determination

#### Impact metrics

##### General

For generative AI / LLM systems, the data within the system versus outputs of the system. Is our stance still correct with regards to CVSS? Do any descriptions in the spec doc need to change?

##### Desired change

https://www.first.org/cvss/v4.0/faq#How-can-I-apply-CVSS-concepts-to-AI-LLM-application-issues

2.2 Impact Metrics

+ Impacts to both Vulnerable System and Subsequent System should be considered only for data stored and protected by those systems. Outputs intended for general access, especially those from generative systems, should not be considered.


#### Threat Metrics

Clarify standard text to support the use case for vendor-provided threat.



What do we mean by private? 
Solutions to simplify attempts to exploit the vulnerability are publicly or privately available (such as exploit toolkits)
Private (threat): A method of exploitation known to an adversary, other than the product provider, system originator, or potential target

##### Related FAQs

https://www.first.org/cvss/v4.0/faq#How-should-threats-be-assessed-using-the-Exploit-Maturity-metric

##### Desired change

- Threat and Environmental information is available to only the end consumer.

+ CVSS consumers should use information in their environment to enrich vendor-provided CVSS Base vectors with Threat and Environmental metrics. Vendors may also provide Threat metrics based on known threat intelligence at the time of CVSS Base vector publication.

###### Exploit Maturity

- It is the responsibility of the CVSS consumer to populate the values of Exploit Maturity (E)... 

+ While vendors may provide Threat metric values, it is the ultimately the responsibility of the CVSS consumer to populate the values of Exploit Maturity (E)... 
