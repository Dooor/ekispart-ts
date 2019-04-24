import 'jest-fetch-mock';

import Client from '../../src/client';

const ACCESS_KEY = 'test_access_key';

describe('Client', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  describe('#constructor', () => {
    test('throw error when not provided access key ', () => {
      expect(() => new Client({ accessKey: '', format: 'json' })).toThrow();
    })
  })

  describe('#getStation', () => {
    test('when success', () => {
      const stationResponse = {
        ResultSet: {
          apiVersion: "1.27.0.0",
          engineVersion: "201904_02a",
          max: "6",
          offset: "1",
          Point: [
            {
              Station: {
                code: '22741',
                Name: '新宿',
                Type: 'train',
                Yomi: 'しんじゅく',
              }
            }
          ]
        }
      }

      fetchMock.mockResponseOnce(JSON.stringify(stationResponse))

      const ekispart = new Client({ accessKey: ACCESS_KEY, format: 'json' });
      return ekispart.getStation('田町').then((data) => {
        expect(data).toEqual(stationResponse);
      });
    })
  })

  describe('#getStationInfo', () => {
    test('when success', () => {
      const result = {
        ResultSet: {
          apiVersion: "1.27.0.0",
          engineVersion: "201904_02a",
          Information: {
            Corporation: [
              {
                Name: "ＪＲ"
              },
            ],
            Type: "rail",
            Line: [
              {
                corporationIndex: "1",
                Name: "ＪＲ特急あさぎり",
                Type: {
                  text: "train",
                  detail: "limitedExpress"
                },
                Color: "007010143"
              },
            ]
          }
        }
      }
      fetchMock.mockResponseOnce(JSON.stringify(result))

      const ekispart = new Client({ accessKey: ACCESS_KEY, format: 'json' });
      return ekispart.getStationInfo(22807, 'nearrail').then((data) => {
        expect(data).toEqual(result);
      });
    })
  })
})
