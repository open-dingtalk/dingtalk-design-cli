import { OpenAPIV2, } from '../src/openapiV2';
import * as sdkConfig from './sdk-test-config';

const miniAppId = '';
const cfg = sdkConfig.daily; 

describe('openapi', () => {
  let openApi: OpenAPIV2;

  beforeAll(() => {
    openApi = new OpenAPIV2({
      accessToken: cfg.accessToken,
      host: cfg.host,
    });
  });

  test('getAccessToken', async () => {
    const rt = await openApi.getH5packageUploadtoken({
      agentId: +cfg.agentId,
    }).catch(e => {
      console.error(e);
    });
    console.log(rt);
    // expect(rt.accessid).not.toBeNull();
    // expect(rt.access_key_secret).not.toBeNull();
    // expect(rt.expiration).not.toBeNull();
    // expect(rt.name).not.toBeNull();
    // expect(rt.security_token).not.toBeNull();
  });

  
});