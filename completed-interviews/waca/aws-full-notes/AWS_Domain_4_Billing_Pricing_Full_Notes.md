# AWS Domain 4 - Billing & Pricing
## Complete Clean Transcription of the Uploaded Handwritten Notes

> **Source-faithful edition.** This document rewrites the uploaded handwritten notes into clean typed text. It preserves the concepts, examples, figures, prices, response times, service names, comparisons, and practical notes **as written in the source**. No external material is added, and the notes are not externally verified or updated.

---

## Source Page 1 - Pricing Models, TCO, Pricing Calculator

### Pricing & Billing - Domain 4
The source summarizes three broad pricing dimensions:
1. **Compute** - hourly / usage-based.
2. **Storage**.
3. **Outbound data transfer**.

### Free offer types written
1. **12-month free** - initial sign-up.
2. **Always Free**.
3. **Trials** - pay-as-you-go / temporary trial type as noted.

### EC2 pricing models
1. **On-Demand** - pay by hour / second, without prepaying.
2. **Savings Plans** - commit to compute usage for **1 or 3 years**.
3. **Reserved Instances** - commit for **1 or 3 years**; source notes reduced compute cost.
4. **Spot Instances** - use spare capacity at lower cost.
5. **Dedicated Host** - physical server.

### Lambda pricing model
1. **Number of requests / invocations**.
2. **Execution time**.
3. Source note: **1 million requests per month** under an Always Free-style allowance (as written in the notes).

### S3 pricing model
1. **Storage class** (example: Standard).
2. **Number and size of objects**.
3. **Data transfer out of the S3 Region**.
4. **Requests and data retrieval**.

### RDS pricing model
1. Running **clock hours**.
2. **Type of database** - source examples/parameters include memory, size, engine.
3. **Storage**.
4. **Purchase type** - On-Demand / RI, etc.
5. **Database count / number of instances**.
6. **API requests & calls** (source note references insights/dashboard calls).
7. **Deployment type** - single or multi-AZ.
8. **Outbound data transfer**.

### TCO - Total Cost of Ownership
- A financial estimate that helps you understand **direct + indirect costs on AWS**.
- Used before migration to estimate total cost.
- Source points to **Application Discovery Service** in the migration/TCO context.

### Three ways to reduce TCO
1. **Minimize CapEx**.
2. **Utilize Reserved Instances**.
3. **Right-size your resources**.

### AWS Pricing Calculator
- Estimate AWS fees and charges based on:
  - Use case.
  - Needs.
  - Suitable instance/service type.
- Source note: used to calculate / estimate **TCO** before committing.

---

## Source Page 2 - Cost & Usage, Cost Explorer, Tags, Price List API, Budgets

### Cost and Usage Report (CUR)
- View **granular data about the AWS bill**.
- Used when detailed cost/usage information is needed.
- Source notes the report can be downloaded / delivered to an **S3 bucket / S3 Console**.

### 3. AWS Cost Explorer
- Allows you to **visualize and forecast costs and usage**.
- Visualizes data and can forecast roughly **12 months** (as written).
- Source example: analyze EC2 instance usage over the past **7, 30, or 60 days**.

### 4. Tags
- Useful for **tracking spend/cost** through the cost-allocation report.
- Apply labels to resources, e.g., project/resource labels, so costs can be traced to an owner/project.
- Source note: important for governance when multiple AWS accounts / teams share billing.

### AWS Price List API
- Query service pricing programmatically.
- Query using **JSON or HTML** (wording as written in the source).
- Receive price alerts when **prices change**.

### Pricing vs Billing - source distinction
- Pricing tells you **how much services cost** / how pricing is calculated.
- Billing tells you **what you are actually charged** and helps track ongoing spend.

### Billing - 1. AWS Budgets
- Alert you when you **exceed a budgeted amount / threshold**.
- Can create budgets for:
  - Cost.
  - Usage.
  - Reservation / Savings Plans-related metrics.
- Real-world note: set a budget and alert when reaching / exceeding **free-tier limits**.

### Billing - 2. Cost and Usage Report
- Provides the **most detailed set of AWS cost and usage data**.
- Shows usage by **service/category**.
- Usage can be aggregated / summarized by **daily, hourly, or monthly** periods.

---

## Source Page 3 - AWS Organizations, SCPs, Consolidated Billing

### Governance - 1. AWS Organizations
- Allows you to **manage multiple accounts under one umbrella**.
- Described as a **global service**.
- Main / top account is referred to in the notes as the **master account**.

### Benefits of Organizations
1. **Automate account creation**.
   - Source notes mention using APIs to create/manage accounts, sandbox environments, and invite existing accounts programmatically.
2. **Restrict account privileges using Service Control Policies (SCPs)**.
   - Allocate resources and apply policies.
3. Cost benefits:
   - **Single payment for all accounts / consolidated billing**.
   - Receive **volume discounts** because usage is combined across accounts.
   - Reduce costs by **sharing resources / RI benefits across accounts**.

### Organizations structure shown in the source
- Root / master payer account.
- Organizational Units (OUs), examples:
  - IT OU.
  - Shared Services OU.
  - Marketing OU.
- Member accounts such as:
  - Dev account.
  - Logging account.
  - Shared Services account.
- Policies / SCPs can be applied at organization / OU levels.
- Source explanation: resources belong to **individual member accounts**, not directly to the OU; the OU groups similar AWS accounts.

---

## Source Page 4 - Control Tower, Systems Manager, Trusted Advisor

### 2. AWS Control Tower
- Helps set up new accounts using a **multi-account strategy**.
- Works directly with **AWS Organizations**.
- Enforces best use / best practices across accounts.
- Provides a **dashboard to manage accounts**.
- Source explanation: can help accounts conform to company policies / guardrails / SCP-based governance.

#### Control Tower - real-world example
- Apply a policy such as **disallow public write access to all S3 buckets across accounts**.

### 3. AWS Systems Manager
- Gives control over AWS resources.
- Benefits written:
  1. **Automate operational tasks on resources**.
  2. **Group resources to take action**.
- Source notes also describe using Systems Manager to:
  - Patch and run commands on multiple **EC2 instances or RDS instances**.
  - Automate OS/software patch deployment across a large group of instances.

### 4. AWS Trusted Advisor
- Provides **high-level account assessment**.
- Provides **real-time guidance** to help provision resources following AWS best practices.
- Source describes it as an assessment/checklist service across areas such as performance and security.

#### Trusted Advisor benefits
1. Checks your account and makes **recommendations**.
2. Helps you see **service limits**.
3. Helps you understand **best practices**.

#### Recommendation categories / examples written
- **Cost optimization** - detect unused resources; some checks are free while broader checks are associated with Business / Enterprise support plans in the source notes.
- **Performance** - source example: checks around CloudFront content-delivery optimization.

---

## Source Page 5 - Trusted Advisor Security Checks, Service Limits, License Manager, ACM

### 5. Service Limits
- Basic / free and Developer-related checks are referenced.
- Source example: check for **service usage greater than 80% of a service limit**.
- Example under cost optimization: check **read and write capacity service limits for DynamoDB**.
- Source note: Trusted Advisor can help reduce overall costs by monitoring service limits.

### Trusted Advisor recommendation category - Security
The source notes say some checks are available for Free / Basic & Developer plans and additional checks for Business/Enterprise.

Checks written:
1. Unrestricted access for a **specific port on an EC2 instance**.
2. **S3 bucket permissions** to determine if public access exists.
3. **Multi-factor authentication (MFA) on the root account**.
4. **RDS public snapshots**.

Additional examples written for Business & Enterprise:
1. Check **IAM password policy**.
2. Check for **exposed access keys**.

### Fault Tolerance category
- The source notes that fault-tolerance checks are available more fully with **Business & Enterprise support plans**.

### 5. AWS License Manager
- Helps manage **software licenses**.
- Tracks licensing for software running on EC2.
- Source examples include vendor licenses such as:
  - Oracle.
  - Microsoft.
  - SAP.
- Benefits written:
  1. Manage **on-premises & AWS licenses**.
  2. Track licenses for Oracle/Microsoft/SAP and other vendor licenses.
- Helps with compliance / license agreements.

### 6. AWS Certificate Manager (ACM)
- Helps **provision and manage SSL/TLS certificates**.
- Source explanation: SSL/TLS certificate enables HTTPS / encrypted request access.

---

## Source Page 6 - ACM Benefits, Amazon Managed Services, Management Services

### AWS Certificate Manager (ACM) - benefits
1. Provides **public & private certificates**; source notes free/automatic public-certificate capability.
2. Integrated with services such as:
   - Elastic Load Balancer.
   - API Gateway.
   - CloudFront distributions.
3. Source diagram: HTTPS client -> certificate/load balancer -> Auto Scaling Group; load balancer provides TLS certificate and offers HTTPS endpoint for clients.

### Management Services - 1. Amazon Managed Services (AMS)
- Described as a **team of people / AWS experts** providing infrastructure and application support on AWS.
- AMS team helps operate and manage infrastructure around:
  - Security.
  - Reliability.
  - Availability.

#### AMS benefits written
1. **Augments your internal staff**.
2. Provides ongoing **management of your infrastructure**.
3. Reduces **operational risks and overhead**.
- Examples of managed work noted:
  - Patch management.
  - Monitoring.
  - Cost optimization.
- Source note: **24/365** availability/support wording is written.

#### Source real-world example
- Managed Services can increase operational efficiency by helping develop **application-specific health monitoring using CloudWatch**.

### Management / governance service note
- Source emphasizes that governance and account/resource management services are intended to help administer AWS according to **best practices** and support utilization.
- Examples of planned events written:
  - Product launches.
  - Migrations.

---

## Source Page 7 - Professional Services, APN, Marketplace

### 2. AWS Professional Services
- A **team of people** distinct from AMS in the notes.
- Focused on **enterprise customers**.
- Helps enterprise customers **move to a cloud-based operating model**.
- Activities / capabilities written:
  1. **Propose solutions** - including cloud/infrastructure/migration solutions.
  2. **Architect solutions**.
  3. **Implement solutions** / implement the architecture.

### 3. AWS Partner Network (APN)
- A **global community of approved partners**.
- Partners can provide:
  - Software solutions.
  - Consulting services.
  - AWS-related expertise.

#### APN benefits written
1. Offers technology partners that provide **software solutions**.
2. Offers / provides consulting partners providing **professional services**.
3. Helps find **approved vendors with deep AWS expertise**.

#### APN real-world example
- If a team lacks technical expertise to build and deploy a cloud application, APN can help the organization get up and running quickly through:
  - **Consulting Partner (Standard)**.
  - **Technology Partner (Advanced)**.

### 4. AWS Marketplace
- Online platform provided by AWS where customers can deploy software products and services that run on AWS infrastructure.
- Described as a **digital catalog of pre-built solutions**.
- You can:
  - Purchase solutions.
  - License solutions.
  - Sell your own solutions to others.

---

## Source Page 8 - Marketplace Benefits, Personal Health Dashboard, Support Plans Intro

### Marketplace benefits
1. Buy **third-party software**.
2. Sell solutions to other customers.
3. Search the catalog of software listings and install with the **click of a button**.
4. Try the app before making a long-term commitment - **free trial**.

### 5. Personal Health Dashboard (PHD)
- AWS feature that helps customers monitor the **status and health of AWS resources**.
- Described as part of / connected with **Trusted Advisor** in the source notes.

#### PHD benefits written
1. Alerts you to **events that might impact your AWS environment**.
   - Examples handwritten include vulnerabilities / resource-impacting events / updates.
2. Provides **troubleshooting guidance** tailored to your environment.
3. Feedback / guidance tailored to your **specific environment**.

### AWS Support Plans
- Source says customers choose a support plan based on the type/level of **technical assistance** required.
- Notes mention support categories such as:
  - Code.
  - Development.
  - Debugging.
  - Administration tasks.
- Source lists **4 support plans**.

### 1. Basic Support Plan
- Included **free for all AWS accounts**.
- Features written:
  1. Account and billing support cases.
  2. Service limit increases.
  3. Source notes also mention customer-service access via email / 24/7 in this section.
- Response time depends on the type/severity of support need.

### 2. Developer Support Plan
- Source price: starts at **$29/month**.
- Recommended for **testing and development**.
- Features written:
  1. Account and billing cases.
  2. Service limit increases.
  3. Technical support - continued on the next page.

---

## Source Page 9 - Developer, Business and Enterprise Support

### Developer Support Plan - technical support features
1. **1 primary contact**.
2. **Unlimited cases**.
3. Contact with a **Cloud Support Associate in business hours via email only**.

#### Developer response times written
1. **< 24 hours** - General guidance.
2. **< 12 hours** - System impaired.

### 3. Business Support Plan
- Source price: starts at **$100/month**.
- Recommended for **production workloads**.
- Features written:
  1. Account and billing cases.
  2. Service limit increases.
  3. Technical support.

### Business Plan technical support
1. **Unlimited contacts**.
2. **Unlimited cases**.
3. **Full set of Trusted Advisor checks**.
4. Access to **Cloud Support Engineers 24/7 via email, phone, or chat**.

#### Business response times written
1. **< 24 hours** - General guidance.
2. **< 12 hours** - System impaired.
3. **< 4 hours** - Production system impaired.
4. **< 1 hour** - Production system down.

### 4. Enterprise Support Plan
- Source price: starts at **$15,000/month**.
- Recommended for **business or mission-critical production workloads**.
- Features written:
  1. Account and billing cases.
  2. Service limit increases.
  3. Technical support.
- Additional Enterprise features continue on source page 10.

---

## Source Page 10 - Enterprise Support Details and Response Times

### Enterprise Plan technical support
1. **Unlimited contacts**.
2. **Unlimited cases**.
3. **Full set of Trusted Advisor checks**.
4. **Technical Account Manager (TAM)**.
   - TAM is your designated contact with AWS.
   - Monitors your environment.
   - Provides best-practices guidance.
   - Provides assistance with architecture.
5. **Concierge Support Team**.
   - Source note: handles / helps with **billing and account questions**.
6. **Infrastructure Event Management**.
   - Operational support around **launches or migrations**.

### Enterprise response times written
1. **< 24 hours** - General guidance.
2. **< 12 hours** - System impaired.
3. **< 4 hours** - Production system impaired.
4. **< 1 hour** - Production system down.
5. **< 15 minutes** - Business-critical system down.

---

## End of Domain 4 Notes

This document contains the clean written content of all **10 source pages** in the uploaded Domain 4 file, organized by source page and topic.
