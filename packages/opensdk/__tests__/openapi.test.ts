import { OpenAPI, } from '../src/openapi';
import * as sdkConfig from './sdk-test-config';

const miniAppId = '2018090461243403';
const cfg = sdkConfig.daily; 

describe('openapi', () => {
  let openApi: OpenAPI;

  beforeAll(() => {
    openApi = new OpenAPI(cfg);
  });

  beforeEach(async () => {
    await openApi.init();
  });

  test('getAccessToken', async () => {
    const rt = await openApi.getUploadAccessKey({ miniapp_id: cfg.miniAppId, });

    expect(rt.accessid).not.toBeNull();
    expect(rt.access_key_secret).not.toBeNull();
    expect(rt.expiration).not.toBeNull();
    expect(rt.name).not.toBeNull();
    expect(rt.security_token).not.toBeNull();
  });

  
});