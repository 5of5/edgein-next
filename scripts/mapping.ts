export interface Mapping {
  table: string
  airtable: string
  key: string
  mappings: {
    to: string
    from: string
    type: string
    unwrap?: boolean
    reference?: string
  }[]
}

export const companiesMapping: Mapping = {
  "table": "public.companies",
  "airtable": "Companies",
  "key": "external_id",
  "mappings": [
      {
          "to": "slug",
          "from": "slug",
          "type": "standard"
      },
      {
          "to": "layer",
          "from": "Layer",
          "type": "standard"
      },
      {
          "to": "layer_detail",
          "from": "Layer Detail",
          "type": "standard"
      },
      {
          "to": "name",
          "from": "Company",
          "type": "standard"
      },
      {
          "to": "total_employees",
          "from": "Total Employees",
          "type": "standard"
      },
      {
          "to": "github",
          "from": "github",
          "type": "standard"
      },
      {
          "to": "overview",
          "from": "Overview",
          "type": "standard"
      },
      {
          "to": "website",
          "from": "Website",
          "type": "standard"
      },
      {
          "to": "careers_page",
          "from": "Career Page",
          "type": "standard"
      },
      {
          "to": "company_linkedin",
          "from": "Company LinkedIn",
          "type": "standard"
      },
      {
          "to": "year_founded",
          "from": "Year Founded",
          "type": "standard"
      },
      {
          "to": "investor_amount",
          "from": "Investor Amount",
          "type": "standard"
      },
      {
          "to": "white_paper",
          "from": "White-Paper",
          "type": "standard"
      },
      {
          "to": "external_id",
          "from": "_recordId",
          "type": "standard"
      },
      {
          "to": "velocity_linkedin",
          "from": "Velocity LinkedIn",
          "type": "standard"
      },
      {
          "to": "coins",
          "from": "Coins",
          "type": "standard"
      },
      {
          "to": "logo",
          "from": "Logo",
          "type": "standard",
          "unwrap": true
      },
      {
          "to": "market_verified",
          "from": "Market Verified",
          "type": "standard"
      }
  ]
}

export const peopleMapping: Mapping = {
  "table": "public.people",
  "airtable": "People",
  "key": "external_id",
  "mappings": [
      {
          "to": "name",
          "from": "Name",
          "type": "standard"
      },
      {
          "to": "slug",
          "from": "slug",
          "type": "standard"
      },
      {
          "to": "work_email",
          "from": "Work Email",
          "type": "standard"
      },
      {
          "to": "linkedin",
          "from": "LinkedIn",
          "type": "standard"
      },
      {
          "to": "external_id",
          "from": "_recordId",
          "type": "standard"
      },
      {
          "to": "picture",
          "from": "Picture",
          "type": "standard",
          "unwrap": true
      },
      {
          "to": "type",
          "from": "Type",
          "type": "standard"
      }
  ]
}

export const vcFirmMapping: Mapping = {
  "table": "public.vc_firms",
  "airtable": "VC Firms",
  "key": "external_id",
  "mappings": [
      {
          "to": "slug",
          "from": "slug",
          "type": "standard"
      },
      {
          "to": "website",
          "from": "Website",
          "type": "standard"
      },
      {
          "to": "linkedin",
          "from": "LinkedIn",
          "type": "standard"
      },
      {
          "to": "name",
          "from": "VC Firm",
          "type": "standard"
      },
      {
          "to": "external_id",
          "from": "_recordId",
          "type": "standard"
      },
      {
          "to": "logo",
          "from": "Logo",
          "type": "standard",
          "unwrap": true
      }
  ]
}

export const investmentRoundsMapping: Mapping = {
  "table": "public.investment_rounds",
  "airtable": "Investment Round",
  "key": "external_id",
  "mappings": [
      {
          "to": "round",
          "from": "Round",
          "type": "standard"
      },
      {
          "to": "amount",
          "from": "Amount",
          "type": "standard"
      },
      {
          "to": "company_id",
          "from": "Company",
          "type": "standard",
          "reference": "companies"
      },
      {
          "to": "round_date",
          "from": "Date",
          "type": "standard"
      },
      {
          "to": "external_id",
          "from": "_recordId",
          "type": "standard"
      }
  ]
}

export const investmentsMapping: Mapping = {
  "table": "public.investments",
  "airtable": "Investments",
  "key": "external_id",
  "mappings": [
      {
          "to": "round_id",
          "from": "Investment Round",
          "type": "standard",
          "reference": "investment_rounds"
      },
      {
          "to": "person_id",
          "from": "People",
          "type": "standard",
          "reference": "people"
      },
      {
          "to": "external_id",
          "from": "_recordId",
          "type": "standard"
      },
      {
          "to": "vc_firm_id",
          "from": "VC Firms",
          "type": "standard",
          "reference": "vc_firms"
      }
  ]
}

export const teamMembersMapping: Mapping = {
  "table": "public.team_members",
  "airtable": "Team Members",
  "key": "external_id",
  "mappings": [
      {
          "to": "function",
          "from": "Function",
          "type": "standard"
      },
      {
          "to": "start_date",
          "from": "Start Date",
          "type": "standard"
      },
      {
          "to": "seniority",
          "from": "Seniority",
          "type": "standard"
      },
      {
          "to": "title",
          "from": "Title",
          "type": "standard"
      },
      {
          "to": "company_id",
          "from": "Company",
          "type": "standard",
          "reference": "companies"
      },
      {
          "to": "person_id",
          "from": "Person",
          "type": "standard",
          "reference": "people"
      },
      {
          "to": "external_id",
          "from": "_recordId",
          "type": "standard"
      }
  ]
}
