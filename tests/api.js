import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '1m',
  thresholds: {
    'http_req_duration{name:list_crocodiles}': ['p(95)<400'],
    'http_req_duration{name:get_crocodile}': ['p(95)<400'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = 'https://test.k6.io';

export default function () {
  group('public endpoints', () => {
    const listRes = http.get(`${BASE_URL}/public/crocodiles/`, {
      tags: { name: 'list_crocodiles' },
    });
    check(listRes, {
      'list status 200': (r) => r.status === 200,
      'list returns array': (r) => Array.isArray(r.json()),
    });

    const crocodiles = listRes.json();
    if (crocodiles.length > 0) {
      const id = crocodiles[0].id;
      const getRes = http.get(`${BASE_URL}/public/crocodiles/${id}/`, {
        tags: { name: 'get_crocodile' },
      });
      check(getRes, {
        'get status 200': (r) => r.status === 200,
        'has id field': (r) => r.json('id') === id,
      });
    }
  });

  sleep(1);
}
