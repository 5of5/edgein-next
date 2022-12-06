// Initialize the dataProvider before rendering react-admin resources.
import React, { useState, useEffect } from "react";
import buildHasuraProvider, { BuildFields, buildFields } from "ra-data-hasura";

import {
  Admin,
  DataProvider,
  Resource,
  AuthProvider,
  Layout,
  defaultTheme,
} from "react-admin";

import CssBaseline from "@mui/material/CssBaseline";

import {
  CompanyCreate,
  CompanyEdit,
  CompanyList,
} from "../../components/admin/company";

import { CoinList, CoinCreate, CoinEdit } from "../../components/admin/coin";

import { ApolloClient, DocumentNode, gql, InMemoryCache } from "@apollo/client";
import ElemAppBar from "@/components/admin/ElemAppBar";
import {
  InvestmentRoundCreate,
  InvestmentRoundEdit,
  InvestmentRoundList,
} from "../../components/admin/investmentRound";
import {
  InvestmentList,
  InvestmentEdit,
  InvestmentCreate,
} from "../../components/admin/investment";
import {
  InvestorList,
  InvestorEdit,
  InvestorCreate,
} from "../../components/admin/investor";
import {
  PersonList,
  PersonEdit,
  PersonCreate,
} from "../../components/admin/person";
import {
  TeamMemberList,
  TeamMemberEdit,
  TeamMemberCreate,
} from "../../components/admin/teamMember";
import {
  VcFirmCreate,
  VcFirmEdit,
  VcFirmList,
} from "../../components/admin/vcFirm";
import {
  BlockchainList,
  BlockchainEdit,
  BlockchainCreate,
} from "../../components/admin/blockchain";
import {
  DisabledEmailList,
  DisabledEmailEdit,
  DisabledEmailCreate,
} from "../../components/admin/disabledEmail";
import { UserList, UserEdit } from "../../components/admin/user";
import { useAuth } from "../../hooks/useAuth";
import { getUpdatedDiff } from "@/utils/helpers";
import { onSubmitData } from "@/utils/submitData";

const MyLogin = () => {
  useEffect(() => {
    window.location.href = "/";
  }, []);

  return <div />;
};

type NullableInputs = {
  [key: string]: Array<string>;
};

const nullableInputs: NullableInputs = {
  investments: ["person_id", "vc_firm_id", "round_id"],
  users: ["person_id"],
};

const extractFieldsFromQuery = (queryAst: any) => {
  return queryAst.definitions[0].selectionSet.selections;
};

// Define the additional fields that we want.
const EXTENDED_GET_LIST_INVESTMENT_ROUNDS = gql`
  {
    company {
      name
    }
  }
`;

const customBuildFields: BuildFields = (type, fetchType) => {
  const resourceName = type.name;

  // First take the default fields (all, but no related or nested).
  const defaultFields = buildFields(type, fetchType);

  if (resourceName === "investment_rounds") {
    const relatedEntities = extractFieldsFromQuery(
      EXTENDED_GET_LIST_INVESTMENT_ROUNDS
    );
    defaultFields.push(...relatedEntities);
  }

  // Extend other queries for other resources/fetchTypes here...

  return defaultFields;
};

export const LayoutApp = (props: any) => (
  <Layout {...props} appBar={ElemAppBar} />
);

const AdminApp = () => {
  const [dataProvider, setDataProvider] = useState<DataProvider<string> | null>(
    null
  );
  const { user } = useAuth();

  const authProvider = {
    // authentication
    login: () => Promise.resolve(),
    checkError: () => Promise.resolve(),
    checkAuth: () => {
      if (user) {
        if (user.role === "user") {
          return Promise.reject(new Error("User is not an admin"));
        } else {
          return Promise.resolve();
        }
      }
      return Promise.reject();
    },
    logout: () => Promise.resolve(),
    getIdentity: () => Promise.resolve().then((res) => res),
    // authorization
    getPermissions: () => Promise.resolve(),
  } as AuthProvider;

  const nullInputTransform = (type: string, obj: any): any => {
    const nullableInputsForType = nullableInputs[type];
    if (nullableInputsForType && obj.data) {
      nullableInputsForType.forEach((input) => {
        if (obj.data[input] == "") {
          obj.data[input] = null;
        }
      });
    }
    return obj;
  };

  useEffect(() => {
    const buildDataProvider = async () => {
      const myClientWithAuth = new ApolloClient({
        uri: "/api/graphql/",
        cache: new InMemoryCache(),
      });
      const dataProvider = await buildHasuraProvider(
        {
          client: myClientWithAuth,
        },
        { buildFields: customBuildFields }
      );
      // Fix nullable inputs for graphql
      setDataProvider({
        ...dataProvider,
        create: (type, obj) => {
          if (["companies", "vc_firms", "people"].includes(type)) {
            return onSubmitData(type, nullInputTransform(type, obj));
          }
          return dataProvider.create(type, nullInputTransform(type, obj))
        },
        update: (type, obj) => {
          if (["companies", "vc_firms", "people"].includes(type)) {
            return onSubmitData(type, nullInputTransform(type, obj));
          }
          return dataProvider.update(type, nullInputTransform(type, obj));
        },
      });
    };
    buildDataProvider();
  }, []);

  if (!dataProvider || !user) return <p>Loading...</p>;

  const theme = {
    ...defaultTheme,
    palette: {
      primary: {
        main: "#5E41FE",
      },
      secondary: {
        main: "#5E41FE",
        light: "#A05FFE",
      },
      error: {
        main: "#ff0000",
      },
      background: {
        default: "#F2F5FA",
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
    typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "Metropolis",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Arial",
        "sans-serif",
      ].join(","),
    },
  };

  return (
    <Admin
      loginPage={MyLogin}
      layout={LayoutApp}
      dataProvider={dataProvider}
      authProvider={authProvider}
      theme={theme}
    >
      <CssBaseline />
      <Resource
        name="blockchains"
        list={BlockchainList}
        edit={BlockchainEdit}
        create={BlockchainCreate}
      />
      <Resource
        name="coins"
        list={CoinList}
        edit={CoinEdit}
        create={CoinCreate}
      />
      <Resource
        name="companies"
        list={CompanyList}
        edit={CompanyEdit}
        create={CompanyCreate}
      />
      <Resource
        name="people"
        list={PersonList}
        edit={PersonEdit}
        create={PersonCreate}
      />
      <Resource
        name="vc_firms"
        list={VcFirmList}
        edit={VcFirmEdit}
        create={VcFirmCreate}
      />
      <Resource
        name="investment_rounds"
        list={InvestmentRoundList}
        edit={InvestmentRoundEdit}
        create={InvestmentRoundCreate}
      />
      <Resource
        name="investments"
        list={InvestmentList}
        edit={InvestmentEdit}
        create={InvestmentCreate}
      />
      <Resource
        name="team_members"
        list={TeamMemberList}
        edit={TeamMemberEdit}
        create={TeamMemberCreate}
      />
      <Resource
        name="investors"
        list={InvestorList}
        edit={InvestorEdit}
        create={InvestorCreate}
      />
      <Resource
        name="disabled_emails"
        list={DisabledEmailList}
        edit={DisabledEmailEdit}
        create={DisabledEmailCreate}
      />
      <Resource name="users" list={UserList} edit={UserEdit} />

      {/* <Resource
        name="actions"
        list={ActionsList}
      /> */}
    </Admin>
  );
};

export async function getStaticProps() {
  return {
    props: { noLayout: true },
  };
}

export default AdminApp;
