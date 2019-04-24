// Library
import 'jest-fetch-mock';

// src
import * as Types from '../../src/types';
import Client from '../../src/client';
import { StationResponse, StationInfoResponse } from '../../src/responses';

// Constants
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
      const stationResponse: Types.StationResponse = {
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
              },
              Prefecture: {
                Name: '東京都',
                code: '1'
              },
              GeoPoint: {
                gcs: 'tokyo',
                lati: '1',
                lati_d: '1',
                longi: '1',
                longi_d: '1',
              }
            }
          ]
        }
      }
      const expected = StationResponse.fromJS(stationResponse);
      fetchMock.mockResponseOnce(JSON.stringify(stationResponse));

      const ekispart = new Client({ accessKey: ACCESS_KEY, format: 'json' });
      return ekispart.getStation('新宿').then((data) => {
        expect(data).toEqual(expected);
      });
    })
  })

  describe('#getStationInfo', () => {
    test('when success', () => {
      const response: Types.StationInfoResponse = {
        ResultSet: {
          apiVersion: "1.27.0.0",
          engineVersion: "201904_02a",
          Information: {
            Corporation: [
              {
                Name: "ＪＲ"
              },
              {
                Name: "小田急電鉄"
              },
              {
                Name: "京王電鉄"
              },
              {
                Name: "東京都交通局"
              }
            ],
            Type: "rail",
            WelfareFacilities: [
              {
                Name: "バリアフリー状況",
                Comment: "　※段差なしでの移動経路 （○：有り　△：要駅員設備　×：無し） 【ＪＲ東日本】：○ 【京王電鉄】：○ 【小田急電鉄】：○ 【東京都交通局】 ［新宿線］：○ ［大江戸線］：○"
              },
            ],
            Exit: [
              {
                Name: "２出口",
                Comment: "ＪＲ東京総合病院 ＪＲ東日本本社 新宿サザンテラス バスタ新宿（高速バス・空港バス） 高島屋 新宿３丁目 代々木２丁目 千駄ヶ谷５丁目"
              },
            ],
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
              {
                corporationIndex: "2",
                Name: "小田急特急えのしま",
                Type: {
                  text: "train",
                  detail: "limitedExpress"
                },
                Color: "255021001"
              },
              {
                corporationIndex: "3",
                Name: "京王新線",
                Type: "train",
                Color: "220000120"
              },
              {
                corporationIndex: "4",
                Name: "都営新宿線",
                Type: "train",
                Color: "110190070"
              }
            ]
          }
        }
      }
      const expected = StationInfoResponse.fromJS(response);
      fetchMock.mockResponseOnce(JSON.stringify(response))

      const ekispart = new Client({ accessKey: ACCESS_KEY, format: 'json' });
      return ekispart.getStationInfo(22807, 'nearrail').then((data) => {
        expect(data).toEqual(expected);
      });
    })
  })
})
