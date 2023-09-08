import { StaticSite, use, StackContext } from "sst/constructs";
import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { StorageStack } from "./StorageStack";

export function FrontendStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  const { auth } = use(AuthStack);
  const { bucket } = use(StorageStack);

  // CRA app
  // const site = new StaticSite(stack, "ReactSite", {
  //   path: "frontend-cra",
  //   buildOutput: "build",
  //   buildCommand: "npm run build",
  //   // Pass in our environment variables
  //   environment: {
  //     REACT_APP_API_URL: api.customDomainUrl || api.url,
  //     REACT_APP_REGION: app.region,
  //     REACT_APP_BUCKET: bucket.bucketName,
  //     REACT_APP_USER_POOL_ID: auth.userPoolId,
  //     REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
  //     REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
  //   },
  // });

  // Vite app
  const site = new StaticSite(stack, "ReactSite", {
    path: "packages/frontend",
    buildOutput: "dist",
    buildCommand: "pnpm run build",
    // Pass in our environment variables
    environment: {
      VITE_API_URL: api.url,
      VITE_REGION: app.region,
      VITE_BUCKET: bucket.bucketName,
      VITE_USER_POOL_ID: auth.userPoolId,
      VITE_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      VITE_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || "",
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.url || "http://localhost:5173",
  });
}
