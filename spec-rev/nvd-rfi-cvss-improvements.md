# CVSS Improvement Suggestions from NVD RFI Comments

## Summary
Analysis of 72 public comments on NIST's Request for Information regarding modernizing the National Vulnerability Database identified multiple suggestions for improving CVSS and its use in vulnerability management processes. The themes center on CVSS limitations, measurement transparency, and contextual application.

---

## Key Findings

### 1. CVSS Score Divergence and Inter-Rater Reliability Issues

#### Issue: Disagreement Between CNA and NVD Analyst Scores
**Source:** Comments from Ilpo Vaatainen (Comment #9 and #17 from Files 1-3)

**Key Data Points:**
- Of 1,332 CVEs with dual CVSS scores (CNA and NVD analyst), only **17.7% had identical base scores**
- **47.1% (627 of 1,332) showed different severity bands** — the metric that drives triage decisions
- **Median gap where scores differ: 1.3 points; maximum gap: 7.2 points**
- **71% of disagreements show NVD analysts scoring higher than CNAs**
- **Disagreement concentrated by metric:** Attack Complexity differs in 39% of disagreeing pairs (vs. 7% for Attack Vector)
- Disagreement ranges from **0% (Adobe: 30 records, zero disagreements) to 83.9% (HCL: 31 records, 26 disagreements)**

**Recommendation:**
> "Record which metric values were inferred rather than observed, and publish the score as the range the uncertain judgements imply. An analyst who knows two records are tied is better served than one who believes 7.8 outranks 7.5." — Ilpo Vaatainen

**Implication for CVSS improvement:**
- Judgement-dependent metrics (particularly Attack Complexity) require standardized guidance or decision frameworks
- Inter-rater agreement should be measured and published per metric, not as aggregate scores
- A single point score masks the uncertainty created by subjective metric assessments

---

### 2. CVSS Limitations for Real-World Prioritization

#### Issue: Base CVSS Cannot Capture Operational Context
**Source:** Comments from enterprise/operational users (Comments 21, 7, and others)

**Problem Statement:**
- "Base CVSS scores tell a plant reliability engineer very little about whether a preventive maintenance window should be moved forward."
- Base CVSS fails to capture runtime exploitability
- CVSS addresses "Is this vulnerability fixed?" but cannot express "Will this product receive patches for future vulnerabilities?"
- Many organizations use CVSS alongside EPSS, KEV, and SSVC because CVSS alone is insufficient

**Recommendations for CVSS Use:**

1. **Enrich CVSS with Contextual Fields**
   - Structured fields for intended operating environment (corporate IT vs. OT vs. safety-instrumented)
   - Likely exposure profile (internet-facing vs. segmented OT)
   - Typical remediation path (patch vs. configuration vs. compensating control)
   - Estimated maintenance-window impact

2. **Integrate Additional Signals Rather Than Replace CVSS**
   - Continue CVSS as a technical severity baseline
   - Mandate integration of:
     - CISA KEV (Known Exploited Vulnerabilities)
     - EPSS (Exploit Prediction Scoring System)
     - Active proof-of-concept availability
     - Threat intelligence signals
   - "Dynamic Risk Beyond Base CVSS" — publish these signals distinctly rather than collapsing into one opaque score

3. **Make Uncertainty Explicit**
   - Patch Deployment Urgency color system (Red/Purple/Blue/Yellow/Green) based on:
     - Zero-day status (exploited or public PoC)
     - Base Score groupings with evidence thresholds
     - Empirical observation: "88% of vulnerabilities with a PoC are exploited within 48 hours"
   - This separates the scoring decision from the operational decision

---

### 3. Measurement and Transparency Recommendations

#### Issue: Lack of Visibility Into CVSS Scoring Methodology
**Source:** Ilpo Vaatainen, Siyuan Feng, and others

**Specific Metrics Recommended:**

1. **Per-Metric Disagreement Reporting**
   - Publish agreement rates broken out by CVSS metric (Attack Vector, Attack Complexity, Privileges Required, User Interaction, Impact)
   - Track which metrics drive severity-band changes
   - Current data shows Attack Complexity is the primary disagreement driver

2. **Candidate Generation and Selection Transparency**
   - For any AI-assisted CVSS scoring: publish
     - Number of candidates generated
     - Number retained after confidence threshold
     - The threshold value itself
   - Without these, a well-tuned pipeline is indistinguishable from a poorly tuned one

3. **Agreement as Independent Measurement**
   - "AGREEMENT: the rate at which two independent enrichments of the same CVE match on band and affected versions"
   - Measure quarterly with sample size and source breakdown
   - Compare baseline (e.g., August 2026: 47.1% disagreement on severity band)
   - This metric "degrades if speed is traded for accuracy"

4. **Stability Over Time**
   - "STABILITY: the share of records whose priority order changes on re-analysis"
   - "RESOLUTION: the share of adjacent pairs the underlying evidence actually separates"
   - Currently: 2,047 CVEs share exactly 7.5 on a 0–10 scale; five values cover 1/3 of the corpus (score collapses to arbitrary tie-break)

---

### 4. CVSS Vector Governance and Authority

#### Issue: Removed Independent Severity Scoring
**Source:** Comments #28 and others addressing governance changes

**Problem:**
NIST decision to no longer provide independent NVD analyst CVSS scores when a CNA has scored removes principal independent check on vendor self-scoring.

**Recommendation:**
> "Measure [CVSS divergence and dispute statistics] — publishing divergence and dispute statistics would let the ecosystem observe whether self-scoring drifts over time." — Comment #28

**Implication:**
- Publish CNA-reported vs. NIST-analyst CVSS divergence statistics quarterly
- Track whether self-scoring by vendors shows drift or systematic bias
- Use inter-rater agreement as a governance metric

---

### 5. CVSS Metadata and Provenance

#### Issue: No Record of How CVSS Was Derived

**Recommendations:**

1. **Per-Field Provenance for CVSS**
   - Record for each CVSS vector:
     - Source identity (CNA, NVD analyst, AI-assisted, AI-only)
     - Timestamp
     - Model/version identifier (if AI-generated)
     - Confidence or review state
     - Evidence references
   - Consumers should distinguish:
     - CNA-asserted CVSS
     - Analyst-reviewed/modified CVSS
     - AI-generated CVSS with analyst approval
     - AI-generated CVSS without review

2. **Explicit Labeling**
   > "Each CVSS vector should show whether it came from a CNA, an NVD analyst, AI with analyst approval, or AI without review, with timestamps, model/pipeline version and a change history in the API."

3. **Record Incompleteness** (Multiple commenters)
   - Where CVSS was not assessed, state why in machine-readable form
   - "Enrichment status, who/what produced it (NVD analyst, CNA, AI-assisted), model and ruleset version if automated, and confidence"
   - Distinction between "genuinely low risk (no CVSS needed)" and "not yet analyzed"

---

### 6. CVSS in Automated/AI-Assisted Enrichment

#### Issue: CVSS Becomes Unverifiable When Generated by AI

**Recommendations:**

1. **Require Human Review for CVSS Changes**
   > "Require analyst approval for severity scores and score changes, 'not affected' or rejection decisions, exploited/KEV records, AI-system records and disputed records." — Abayomi Ogayemi

2. **Gate AI-Generated CVSS on Validation**
   - "Gate every AI enrichment model on a held-out, analyst-labeled evaluation set before it publishes without review"
   - Route uncertain outputs to analysts
   - Audit random sample of auto-published records weekly

3. **Treat Vector Disagreement as Review Trigger**
   > "Where an automated system proposes a severity score, the CNA provided none, or its vector disagrees with the CNA's [require analyst sign-off]." — Ravindra Annam

4. **Separate CVSS Generation from Validation**
   - "An AI system that evaluates its own output can reproduce its own errors"
   - Require independent verification before publication
   - Document review state: AI-only, AI+analyst, analyst-only

---

### 7. CVSS Metric-Specific Issues

#### Attack Complexity: Primary Source of Disagreement
**Finding:** 39% of CVSS disagreements between scorers arise from Attack Complexity assessment

**Implications:**
- AC is a judgement-dependent metric ("special conditions are required")
- No standardized rubric for what constitutes "special conditions"
- Different CNAs and analysts interpret AC very differently (0% agreement for Adobe, 83.9% disagreement for HCL)

**Recommendation:**
- Develop decision guidance or reference examples for AC assessment
- Consider whether AC should be based on observed evidence rather than judgement
- If AC remains subjective, publish per-CNA disagreement rates on this metric

---

## Consolidated Recommendations for CVSS Improvement

### Immediate Actions

1. **Publish CVSS Inter-Rater Agreement Data**
   - Quarterly report on CNA vs. NVD analyst disagreement by metric
   - Disaggregate by CNA source and CVSS metric
   - Use as baseline to track quality over time

2. **Establish CVSS Provenance Metadata**
   - Record source (CNA, analyst, AI) with timestamp and version
   - Publish in API and data feeds
   - Enable downstream consumers to weight different sources appropriately

3. **Create CVSS Assessment Guidance for High-Disagreement Metrics**
   - Attack Complexity: develop reference examples and decision rules
   - Test inter-rater agreement before and after guidance publication

### Medium-Term Actions

4. **Design CVSS Integration with Contextual Signals**
   - CVSS remains technical baseline (not replaced)
   - NVD publishes EPSS, KEV, PoC availability as distinct fields
   - Downstream tools combine signals according to their own policy
   - Avoid single "universal risk score"

5. **Extend CVSS Metadata to Include Uncertainty**
   - Record which metric values were assessed vs. inferred
   - Publish score as range reflecting subjective judgements
   - Example: "7.5 ± 0.8 (Attack Complexity inferred from vendor advisory)"

6. **Measure CVSS Quality Dimensions**
   - Agreement: inter-rater agreement on severity band
   - Stability: score consistency on re-analysis
   - Resolution: fraction of adjacent score pairs with distinguishable evidence
   - Report monthly/quarterly; flag drift toward baseline

### Long-Term Actions

7. **Extend CVSS for Specialized Domains**
   - OT/ICS: structured fields for safety/control impact
   - Enterprise: integration with product lifecycle status
   - AI Systems: CWE mapping for agent failure modes

8. **Govern AI-Assisted CVSS Generation**
   - Require held-out evaluation set for any AI scoring model
   - Mandatory analyst review for severity score changes and disagreement with CNA
   - Publish AI-generated CVSS rate and error rates by field
   - Implement drift detection with rollback rules

---

## Impact and Implications

### For CVSS SIG / CVSS Governance
- **Measurement gap:** Inter-rater agreement on CVSS metrics should be continuously tracked and published
- **Metric review:** Attack Complexity requires assessment guidance or redefinition
- **Versioning:** CVSS v4 adoption should emphasize provenance and measurement transparency

### For NVD Modernization
- CVSS should be retained as a technical baseline but not treated as a complete risk signal
- Machine-readable provenance transforms CVSS from opaque number into auditable decision artifact
- Independent scoring by NIST analysts should be preserved as a governance check on vendor self-scoring

### For Organizations Using CVSS
- Expect CVSS disagreement (47% severity band difference is normal, not an error)
- Use CVSS alongside EPSS, KEV, and SSVC for decision-making
- Demand provenance labeling to distinguish CNA, analyst, and AI-generated scores

---

## Comments by ID and Relevant Topics

| Comment # | Key Topics | File |
|-----------|-----------|------|
| #6 | Dynamic Risk Beyond Base CVSS, EPSS/KEV integration | 1-25 |
| #7 | Base CVSS limitations for CVSS in OT environments, gap identification | 1-25 |
| #9 | CVSS inter-rater agreement measurement | 1-25 |
| #14 | CVSS divergence between NVD and CNAs, metric concentration | 1-25 |
| #21 | Asset management, CVSS context for enterprise systems | 1-25 |
| #28 | CVSS governance, divergence monitoring, removal of independent scoring | 26-50 |
| #9 (File 3) | CVSS inter-rater agreement data, metric disagreement analysis | 51-72 |
| #7 (File 3) | Patch urgency colors, CVSS-based prioritization | 51-72 |
| #21-22 (File 3) | CVSS-based remediation controls, severity vs. action authority | 51-72 |

---

**Report Generated:** October 7-8, 2026  
**Source:** 72 public comments to NIST RFI on Modernizing the National Vulnerability Database (Docket NIST-2026-0100)  
**Analysis Period:** Comments collected from regulations.gov comment portal
