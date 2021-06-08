export default {
  'basic': {
    'rules': [
      {
        'test': '\\.js$',
        'validator': [
          'jsCommon',
          {
            'validator': 'jsapi',
            'options': {
              'exclude': '${basic_apiList}',
            },
          },
          'eslint'
        ],
      },
      {
        'test': '\\.acss$',
        'validator': [
          'acss'
        ],
      },
      {
        'test': 'config\\.json$',
        'validator': [
          'configJson',
          'quickSetting'
        ],
      },
      {
        'test': 'plugin\\.json$',
        'validator': [
          'pluginJson'
        ],
      },
      {
        'test': '\\.less$',
        'validator': [
          'less'
        ],
      },
      {
        'test': '\\.(jpg|jpeg|png|gif|svg)$',
        'validator': [
          'image'
        ],
      }
    ],
    'exclude': ['node_modules'],
  },
  'outerBigCustomerIndustry': {
    'rules': [
      {
        'test': '\\.js$',
        'validator': [
          {
            'validator': 'jsCommon',
            'options': {
              'exclude': ['setTimeout'],
            },
          },
          {
            'validator': 'jsapi',
            'options': {
              'exclude': '${outerBigCustomerIndustry_apiList}',
            },
          },
          'eslint'
        ],
      },
      {
        'test': '\\.acss$',
        'validator': [
          'acss'
        ],
      },
      {
        'test': 'config\\.json$',
        'validator': [
          'configJson',
          'quickSetting'
        ],
      },
      {
        'test': 'plugin\\.json$',
        'validator': [
          'pluginJson'
        ],
      },
      {
        'test': '\\.less$',
        'validator': [
          'less'
        ],
      },
      {
        'test': '\\.(jpg|jpeg|png|gif|svg)$',
        'validator': [
          'image'
        ],
      }
    ],
    'exclude': ['node_modules'],
  },
  'innerBigCustomerIndustry': {
    'rules': [
      {
        'test': '\\.js$',
        'validator': [
          {
            'validator': 'jsCommon',
            'options': {
              'exclude': ['setTimeout'],
            },
          },
          {
            'validator': 'jsapi',
            'options': {
              'exclude': '${innerBigCustomerIndustry_apiList}',
            },
          },
          'eslint'
        ],
      },
      {
        'test': '\\.acss$',
        'validator': [
          {
            'validator': 'acss',
            'options': {
              'exclude': ['positionFixed'],
            },
          }
        ],
      },
      {
        'test': 'config\\.json$',
        'validator': [
          'configJson',
          'quickSetting'
        ],
      },
      {
        'test': 'plugin\\.json$',
        'validator': [
          'pluginJson'
        ],
      },
      {
        'test': '\\.less$',
        'validator': [
          'less'
        ],
      },
      {
        'test': '\\.(jpg|jpeg|png|gif|svg)$',
        'validator': [
          'image'
        ],
      }
    ],
    'exclude': ['node_modules'],
  },
};
