import type { StackContext } from '@serverless-stack/resources';
import { ReactStaticSite, StaticSite } from '@serverless-stack/resources';

export default function WebsiteStack({ stack }: StackContext) {
  // Deploy our React app
  const site = new StaticSite(stack, 'ReactSite', {
    indexPage: 'index.html',
    path: 'workspaces/client',
    buildCommand: 'yarn build',
    buildOutput: 'dist',
    errorPage: 'redirect_to_index_page',
    environment: {
      EB_ENVIRONMENT: 'production',
    },
    customDomain: {
      domainName: 'bucket.fuku.tv',
      hostedZone: 'fuku.tv',
    },
  });

  // Show the URLs in the output
  stack.addOutputs({
    SiteUrl: site.url,
  });
}
