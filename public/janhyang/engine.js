const DATA = {
  "project": "janhyang",
  "pilot": "seongsu",
  "version": "dummy-0.1",
  "constitution": [
    "no_full_playback_at_home",
    "main_only_inside_radius",
    "afterglow_30s_only",
    "unnamed_pins_majority"
  ],
  "pins": [
    {
      "id": "SS-01",
      "alias": "그늘 벤치",
      "lat": 37.54472,
      "lng": 127.0551,
      "radius": 40,
      "zone": "A.수제화·공장 뒷면",
      "place_type": "벤치",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "연무장7길 수제화 상점들 사이, 가게가 아닌 그늘 벤치",
      "safety": "낮 안전 / 특정 상호 홍보 금지",
      "works": [
        {
          "id": "W-SS01-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "이 육교가 아니다. 이 그늘 벤치의 바늘만 있다.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 124,
            "A": "근접 재봉기 1 + 벽 너머 재봉기 1 + 먼 성수역 안내가 가끔",
            "B": [
              {
                "start": 8,
                "end": 22,
                "text": "이 벤치는 가게가 아니다. 그늘이 먼저 왔고, 사람이 나중에 앉았다."
              },
              {
                "start": 22,
                "end": 40,
                "text": "왼쪽 창문 안에서 바늘이 내려온다. 가죽은 고르지 않다. 한 켤레가 완성되기 전에, 이 골목의 그늘이 한 뼘 이동한다."
              },
              {
                "start": 48,
                "end": 78,
                "text": "성수역은 가깝다. 그래도 이 그늘은 역 안내 방송보다 재봉기를 먼저 듣는다. 네가 맡은 게 아니라, 이 벤치가 낮 동안 맡아 온 것이다."
              },
              {
                "start": 78,
                "end": 96,
                "text": "사진을 위해 앉지 않아도 된다. 그늘은 이미 충분하다."
              },
              {
                "start": 96,
                "end": 112,
                "text": "이 2분은 상점에 저장되지 않는다. 벤치 철이 아직 따뜻할 때만 있다."
              },
              {
                "start": 112,
                "end": 124,
                "text": "밤이면 이 자리는 다른 소리를 연다. 지금은 바늘만."
              }
            ],
            "C": {
              "youtube_query": "sewing machine ambient instrumental",
              "slot_rule": "재봉 박자 80-110, 보컬 없음",
              "hard_ban": "기계 리듬이 선율",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-24:00",
            "duration_sec": 110,
            "A": "셔터 + 보안등 히스 + 드문 발",
            "B": [
              {
                "start": 6,
                "end": 28,
                "text": "셔터가 내려간 골목. 바늘 대신 철이 닫히는 음."
              },
              {
                "start": 28,
                "end": 60,
                "text": "벤치 철은 차갑다. 낮의 그늘이 남긴 온기는 이미 없다."
              },
              {
                "start": 60,
                "end": 95,
                "text": "보안등 하나가 가죽 냄새 대신 먼지를 보여 준다."
              },
              {
                "start": 95,
                "end": 110,
                "text": "낮의 잔향은 집에 두고 와라. 밤은 다른 본편이다."
              }
            ],
            "C": {
              "youtube_query": "sewing machine ambient instrumental night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 재봉 박자 80-110, 보컬 없음",
              "hard_ban": "기계 리듬이 선율",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "그늘이 먼저 왔고, 사람이 나중에 앉았다."
        }
      ]
    },
    {
      "id": "SS-02",
      "alias": "공동작업장 옆 공터",
      "lat": 37.5449,
      "lng": 127.0564,
      "radius": 50,
      "zone": "A.수제화·공장 뒷면",
      "place_type": "공터",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "성수역 1번 출구 쪽 수제화타운 옆, 조형물 정면이 아닌 옆 공터",
      "safety": "사유지 내부 금지",
      "works": [
        {
          "id": "W-SS02-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "정면 조형물은 이미 찍혔다. 옆 공터의 팬만 남았다.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "환기팬 지속음 + 먼 조형물 쪽 발소리 + 콘크리트 반사",
            "B": [
              {
                "start": 8,
                "end": 24,
                "text": "조형물은 앞에 있다. 공터는 옆이다. 관광은 정면을 찍고, 그늘은 옆으로 밀린다."
              },
              {
                "start": 24,
                "end": 48,
                "text": "공동작업장 환기팬이 일정한 음을 낸다. 한 켤레의 가격이 아니라, 팬이 쉬는 간격이 이 자리의 박자다."
              },
              {
                "start": 48,
                "end": 80,
                "text": "콘크리트는 아직 공장의 바닥이다. 카페 테라스로 개조되기 전의 온도가 남아 있다."
              },
              {
                "start": 80,
                "end": 110,
                "text": "여기는 포토스팟의 여백이다. 여백이 사라지면 이 핀도 폐기한다."
              }
            ],
            "C": {
              "youtube_query": "industrial fan drone ambient",
              "slot_rule": "저주파 드론 + 약한 메트로놈",
              "hard_ban": "환기팬과 겹칠 것",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-24:00",
            "duration_sec": 108,
            "A": "멈춘 팬 이후 콘크리트 룸톤. 조형물 조명 안정기 소리는 없음",
            "B": [
              {
                "start": 6,
                "end": 30,
                "text": "환기팬이 멈춘 공터. 콘크리트가 커진다."
              },
              {
                "start": 30,
                "end": 70,
                "text": "조형물 조명이 옆면까지 넘어오지 않는다. 이 공터는 조명 밖이다."
              },
              {
                "start": 70,
                "end": 105,
                "text": "발소리 두 개면 충분하다. 세 번째가 오면 공간을 양보한다."
              }
            ],
            "C": {
              "youtube_query": "industrial fan drone ambient night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 저주파 드론 + 약한 메트로놈",
              "hard_ban": "환기팬과 겹칠 것",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "여백이 사라지면 이 핀도 폐기한다."
        }
      ]
    },
    {
      "id": "SS-03",
      "alias": "부자재 골목 모서리",
      "lat": 37.5441,
      "lng": 127.0558,
      "radius": 40,
      "zone": "A.수제화·공장 뒷면",
      "place_type": "골목 모서리",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "성수이로에서 한 켜 들어간 피혁·부자재 골목 모서리",
      "safety": "촬영 민원 주의",
      "works": [
        {
          "id": "W-SS03-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "이 각에서만 두 골목이 겹친다.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "두 방향 재봉/상자 끄는 소리 + 골목 모서리 바람",
            "B": [
              {
                "start": 8,
                "end": 26,
                "text": "피혁 가게 간판을 읽지 마라. 모서리는 상호가 아니라 각이다."
              },
              {
                "start": 26,
                "end": 55,
                "text": "부자재 상자 모서리가 골목 모서리와 같다. 둘 다 날카롭고, 둘 다 이름이 길다."
              },
              {
                "start": 55,
                "end": 90,
                "text": "이 각에서만 두 골목의 재봉기가 겹친다. 한 골목만 들리면 너는 아직 모서리가 아니다."
              },
              {
                "start": 90,
                "end": 115,
                "text": "사진을 들면 민원이 온다. 귀만 남겨 두라."
              }
            ],
            "C": {
              "youtube_query": "leather workshop foley rhythm",
              "slot_rule": "짧은 타격 + 휴지",
              "hard_ban": "두 골목 겹침을 가리지 말 것",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-24:00",
            "duration_sec": 108,
            "A": "보안등 험 + 두 골목의 같은 무음",
            "B": [
              {
                "start": 6,
                "end": 28,
                "text": "모서리에 보안등만 남았다. 두 골목이 같은 어둠을 접는다."
              },
              {
                "start": 28,
                "end": 70,
                "text": "낮의 민원은 사라지고, 밤의 메아리만 남는다."
              },
              {
                "start": 70,
                "end": 105,
                "text": "너무 조용하면 이 핀을 빨리 떠나라."
              }
            ],
            "C": {
              "youtube_query": "leather workshop foley rhythm night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 짧은 타격 + 휴지",
              "hard_ban": "두 골목 겹침을 가리지 말 것",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "한 골목만 들리면 너는 아직 모서리가 아니다."
        }
      ]
    },
    {
      "id": "SS-04",
      "alias": "공장 뒷벽",
      "lat": 37.54355,
      "lng": 127.0569,
      "radius": 40,
      "zone": "A.수제화·공장 뒷면",
      "place_type": "공장 뒷골목",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "아직 철 다루는 소리가 나는 건물 뒷골목",
      "safety": "일하는 사람을 구경거리로 쓰지 말 것",
      "works": [
        {
          "id": "W-SS04-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "앞면의 일은 설명하지 않는다.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "간헐적 금속 타격 + 뒷골목 잔향 (타격 사이 긴 무음)",
            "B": [
              {
                "start": 8,
                "end": 30,
                "text": "앞면은 일이고, 뒷벽은 일이 새는 곳이다. 우리는 앞면을 설명하지 않는다."
              },
              {
                "start": 30,
                "end": 62,
                "text": "철이 철을 칠 때마다 골목이 한 번 접힌다. 그 접힘을 박수로 듣지 마라."
              },
              {
                "start": 62,
                "end": 95,
                "text": "창작자가 이 골목의 주인인 척하지 않는다. 소리는 받되, 사람을 전시하지 않는다."
              },
              {
                "start": 95,
                "end": 120,
                "text": "작업이 멈추면 본편도 짧아진다. 빈 뒷벽은 콘텐츠가 아니다."
              }
            ],
            "C": {
              "youtube_query": "metal workshop sparse percussion",
              "slot_rule": "스파스 타격, 여백 많음",
              "hard_ban": "철 소리를 덮지 말 것",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-23:00",
            "duration_sec": 108,
            "A": "철의 수축/팽창에 가까운 작은 틱 + 긴 무음",
            "B": [
              {
                "start": 6,
                "end": 40,
                "text": "일이 끝난 뒷벽. 본편을 길게 쓰지 않는다."
              },
              {
                "start": 40,
                "end": 85,
                "text": "남은 것은 열팽창하는 철의 작은 소리뿐이다."
              },
              {
                "start": 85,
                "end": 100,
                "text": "1분 20초면 충분하다. 빈 공장을 드라마로 만들지 마라."
              }
            ],
            "C": {
              "youtube_query": "metal workshop sparse percussion night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 스파스 타격, 여백 많음",
              "hard_ban": "철 소리를 덮지 말 것",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "소리는 받되, 사람을 전시하지 않는다."
        }
      ]
    },
    {
      "id": "SS-05",
      "alias": "구두 테마공원 가장자리",
      "lat": 37.5444,
      "lng": 127.0572,
      "radius": 50,
      "zone": "A.수제화·공장 뒷면",
      "place_type": "공원 가장자리",
      "landmark_quota": true,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "조형물 앞이 아니라 공원 끝 벤치",
      "safety": "랜드마크 쿼터",
      "works": [
        {
          "id": "W-SS05-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "조형물 뒤에서 공원이 끝난다.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "공원 끝 잡음, 조형물 쪽 환호가 늦게 도착 + 벤치 철",
            "B": [
              {
                "start": 8,
                "end": 22,
                "text": "구두 조형물은 뒤에서 더 크다. 앞에서 찍는 사람은 이미 많다."
              },
              {
                "start": 22,
                "end": 50,
                "text": "공원 끝 벤치는 관광과 공장 사이의 어색한 의자다. 어색함을 지우지 마라."
              },
              {
                "start": 50,
                "end": 85,
                "text": "아이들이 조형물을 만지고, 이 벤치에는 그 소음이 늦게 도착한다."
              },
              {
                "start": 85,
                "end": 115,
                "text": "랜드마크 쿼터 세 장 중 한 장. 이 자리를 늘리지 않는다."
              }
            ],
            "C": {
              "youtube_query": "lofi dusty jazz no vocal",
              "slot_rule": "먼지 낀 재즈, 드럼 약함",
              "hard_ban": "조형물 관광송 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-22:00",
            "duration_sec": 108,
            "A": "조형물 조명 안정기 + 빈 공원",
            "B": [
              {
                "start": 6,
                "end": 30,
                "text": "조형물 조명이 앞에서 빛나고, 끝 벤치는 그 빛의 가장자리."
              },
              {
                "start": 30,
                "end": 75,
                "text": "공원이 비면 조형물이 커 보인다. 커 보이는 것을 경외로 쓰지 마라."
              },
              {
                "start": 75,
                "end": 105,
                "text": "22시 이후 이 핀은 닫힌다."
              }
            ],
            "C": {
              "youtube_query": "lofi dusty jazz no vocal night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 먼지 낀 재즈, 드럼 약함",
              "hard_ban": "조형물 관광송 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "어색함을 지우지 마라."
        }
      ]
    },
    {
      "id": "SS-06",
      "alias": "팝업 뒷골목",
      "lat": 37.5438,
      "lng": 127.0542,
      "radius": 40,
      "zone": "B.연무장 뒷골목",
      "place_type": "뒷골목",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "연무장길 메인에서 한 블록 뒤, 실외기·쓰레기 골목",
      "safety": "힙한 매장명 언급 금지",
      "works": [
        {
          "id": "W-SS06-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "앞은 줄, 뒤는 실외기.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "실외기 저음 + 앞골목 인파가 벽 너머로 필터됨 + 수거통",
            "B": [
              {
                "start": 8,
                "end": 25,
                "text": "앞골목은 줄이다. 이 골목은 실외기다."
              },
              {
                "start": 25,
                "end": 55,
                "text": "에어컨이 앞 매장의 온도를 뱉는다. 힙은 앞에서 소비되고, 열은 뒤로 온다."
              },
              {
                "start": 55,
                "end": 88,
                "text": "매장 이름을 말하지 않는다. 벽이 이름을 가려 준다."
              },
              {
                "start": 88,
                "end": 118,
                "text": "쓰레기 수거일이면 본편이 냄새를 포함한다. 편집하지 않는다."
              }
            ],
            "C": {
              "youtube_query": "air conditioner hum + muted kick",
              "slot_rule": "실외기 험 + 약한 킥",
              "hard_ban": "매장 플레이리스트 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-24:00",
            "duration_sec": 110,
            "A": "실외기만 남은 뒷골목 + 먼 문 닫힘",
            "B": [
              {
                "start": 6,
                "end": 28,
                "text": "앞골목의 줄이 끊긴다. 뒷골목의 실외기는 아직 돈다."
              },
              {
                "start": 28,
                "end": 70,
                "text": "낮에 뱉던 열이 이제 골목의 유일한 생물이다."
              },
              {
                "start": 70,
                "end": 108,
                "text": "매장 문을 닫는 소리가 멀리서 겹친다. 이름은 여전히 말하지 않는다."
              }
            ],
            "C": {
              "youtube_query": "air conditioner hum + muted kick night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 실외기 험 + 약한 킥",
              "hard_ban": "매장 플레이리스트 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "힙은 앞에서 소비되고, 열은 뒤로 온다."
        }
      ]
    },
    {
      "id": "SS-07",
      "alias": "서연무장 횡단 전 그늘",
      "lat": 37.5432,
      "lng": 127.0518,
      "radius": 40,
      "zone": "B.연무장 뒷골목",
      "place_type": "그늘",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "뚝섬 방면으로 넘어가기 직전, 줄 아닌 그늘",
      "safety": "인파 우회",
      "works": [
        {
          "id": "W-SS07-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "줄을 건너기 전의 그늘.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "스쳐 가는 인파의 속도 변화 + 강 쪽 공기 + 매장 음악 누수 약하게",
            "B": [
              {
                "start": 8,
                "end": 24,
                "text": "줄을 건너기 전의 그늘. 목적지가 아니라 망설임이다."
              },
              {
                "start": 24,
                "end": 58,
                "text": "인파의 속도가 여기서 한 번 줄어든다. 줄어든 초가 이 자리의 길이보다 중요하다."
              },
              {
                "start": 58,
                "end": 95,
                "text": "뚝섬 방향 바람이 연무장 냄새를 밀어낸다. 가죽 대신 강 쪽 공기가 섞인다."
              },
              {
                "start": 95,
                "end": 118,
                "text": "줄을 선택해도 된다. 다만 그늘은 줄 밖에 있다."
              }
            ],
            "C": {
              "youtube_query": "slow city pop instrumental",
              "slot_rule": "느린 시티팝 인스트루멘탈",
              "hard_ban": "보컬 나오면 슬롯 비움",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-24:00",
            "duration_sec": 108,
            "A": "인파 소거 + 강 쪽 공기 + 드문 택시",
            "B": [
              {
                "start": 6,
                "end": 30,
                "text": "그늘이 필요 없는 시간. 그래도 이 자리는 그늘이라 불린다."
              },
              {
                "start": 30,
                "end": 75,
                "text": "인파가 사라진 속도만큼 강 쪽 공기가 커진다."
              },
              {
                "start": 75,
                "end": 108,
                "text": "낮에 망설이던 자리가 밤에는 통과가 된다."
              }
            ],
            "C": {
              "youtube_query": "slow city pop instrumental night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 느린 시티팝 인스트루멘탈",
              "hard_ban": "보컬 나오면 슬롯 비움",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "줄어든 초가 길이보다 중요하다."
        }
      ]
    },
    {
      "id": "SS-08",
      "alias": "동연무장 시작 모퉁이",
      "lat": 37.5442,
      "lng": 127.0581,
      "radius": 40,
      "zone": "B.연무장 뒷골목",
      "place_type": "모퉁이",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "건대 방향, 아직 덜 포장된 모퉁이",
      "safety": "유동 재확인",
      "works": [
        {
          "id": "W-SS08-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "다음 골목이 되기 전의 모퉁이.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "모래/미포장 + 적은 발 + 먼 메인골목",
            "B": [
              {
                "start": 8,
                "end": 28,
                "text": "동연무장은 ‘다음 골목’이 되는 중이다. 완성된 핫플의 문장이 아직 없다."
              },
              {
                "start": 28,
                "end": 60,
                "text": "포장이 덜 된 모퉁이. 구두굽과 모래가 같은 박자가 아니다."
              },
              {
                "start": 60,
                "end": 95,
                "text": "내년에 이 모퉁이가 유명해지면 핀을 옮긴다. 유명세는 이 제품의 적이 다."
              },
              {
                "start": 95,
                "end": 118,
                "text": "지금은 빈 각이 본편이다."
              }
            ],
            "C": {
              "youtube_query": "unfinished beat loop 90bpm",
              "slot_rule": "루프가 완성되지 않은 비트",
              "hard_ban": "핫플 BGM 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-24:00",
            "duration_sec": 108,
            "A": "임시 조명 험 + 미포장 발",
            "B": [
              {
                "start": 6,
                "end": 32,
                "text": "덜 포장된 모퉁이는 밤에 더 모퉁이다."
              },
              {
                "start": 32,
                "end": 78,
                "text": "다음 골목이 되려는 중이라, 밤 조명도 아직 임시처럼 보인다."
              },
              {
                "start": 78,
                "end": 108,
                "text": "임시인 동안만 이 핀을 지킨다."
              }
            ],
            "C": {
              "youtube_query": "unfinished beat loop 90bpm night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 루프가 완성되지 않은 비트",
              "hard_ban": "핫플 BGM 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "유명세는 이 제품의 적이다."
        }
      ]
    },
    {
      "id": "SS-09",
      "alias": "벽돌 건물 사이 틈",
      "lat": 37.54395,
      "lng": 127.0534,
      "radius": 60,
      "zone": "B.연무장 뒷골목",
      "place_type": "좁은 골목",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "성수이로 이면, 사람 한 명만 지나가는 폭",
      "safety": "GPS 반경 60m 후보",
      "works": [
        {
          "id": "W-SS09-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "어깨가 벽에 닿는 폭.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "좁은 골목 발소리 근접 + 벽돌 열에 가까운 무음",
            "B": [
              {
                "start": 8,
                "end": 22,
                "text": "어깨가 벽에 닿는다. 지도의 핀보다 몸이 먼저 좁아진다."
              },
              {
                "start": 22,
                "end": 52,
                "text": "붉은 벽돌이 낮의 열을 저장한다. 손을 대지 않아도 열이 들린다."
              },
              {
                "start": 52,
                "end": 88,
                "text": "여기서 GPS는 거짓말을 한다. 그래서 반경을 60미터로 넓힌다. 좁은 길일수록 기계는 둔하다."
              },
              {
                "start": 88,
                "end": 118,
                "text": "마주 오는 사람 한 명이 본편을 가른다. 그게 챕터다."
              }
            ],
            "C": {
              "youtube_query": "narrow alley binaural pad",
              "slot_rule": "패드 + 발소리 공간",
              "hard_ban": "광폭 일렉 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-24:00",
            "duration_sec": 108,
            "A": "한쪽 벽만 칠하는 보안등 + 좁은 발 에코",
            "B": [
              {
                "start": 6,
                "end": 28,
                "text": "좁은 길이 더 좁아진다. 벽돌의 열이 빠져나갔다."
              },
              {
                "start": 28,
                "end": 70,
                "text": "마주치면 한쪽이 멈춰야 한다. 밤의 챕터는 그 멈춤이다."
              },
              {
                "start": 70,
                "end": 105,
                "text": "보안등이 한쪽 벽만 칠한다."
              }
            ],
            "C": {
              "youtube_query": "narrow alley binaural pad night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 패드 + 발소리 공간",
              "hard_ban": "광폭 일렉 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "좁은 길일수록 기계는 둔하다."
        }
      ]
    },
    {
      "id": "SS-10",
      "alias": "주차장 램프 밑",
      "lat": 37.5434,
      "lng": 127.0548,
      "radius": 40,
      "zone": "B.연무장 뒷골목",
      "place_type": "램프 하부",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "작은 건물 주차 램프 아래",
      "safety": "차 동선 확인",
      "works": [
        {
          "id": "W-SS10-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "차의 그늘 아래.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "엔진 통과 + 큰 에코 + 구두굽 (차 없을 때)",
            "B": [
              {
                "start": 8,
                "end": 26,
                "text": "램프 아래는 건물 그늘이 아니라 차의 그늘이다."
              },
              {
                "start": 26,
                "end": 58,
                "text": "엔진음이 구두굽을 삼켰다가 뱉는다. 에코가 큰 공간에서는 말이 짧아야 한다."
              },
              {
                "start": 58,
                "end": 90,
                "text": "보행자가 차에게 자리를 빌려 주는 몇 초. 그 초를 음악으로 덮지 마라."
              },
              {
                "start": 90,
                "end": 115,
                "text": "차가 연속이면 본편을 일시 정지한다. 안전이 레이어 D다."
              }
            ],
            "C": {
              "youtube_query": "parking garage echo ambient",
              "slot_rule": "에코 큰 앰비언트",
              "hard_ban": "엔진을 가리지 말 것",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-22:00",
            "duration_sec": 108,
            "A": "큰 에코, 드문 엔진, 물방울",
            "B": [
              {
                "start": 6,
                "end": 30,
                "text": "램프 밑의 에코가 낮보다 크다. 차가 드물어서다."
              },
              {
                "start": 30,
                "end": 70,
                "text": "한 대가 지나가면 본편이 리셋된다."
              },
              {
                "start": 70,
                "end": 100,
                "text": "22시 이후 닫음. 어두운 램프는 핀이 아니다."
              }
            ],
            "C": {
              "youtube_query": "parking garage echo ambient night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 에코 큰 앰비언트",
              "hard_ban": "엔진을 가리지 말 것",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "안전이 레이어 D다."
        }
      ]
    },
    {
      "id": "SS-11",
      "alias": "붉은 벽돌 골목 벤치",
      "lat": 37.5461,
      "lng": 127.0412,
      "radius": 40,
      "zone": "C.서울숲 북쪽·아틀리에 이면",
      "place_type": "주거 골목 벤치",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "서울숲2길 정면 카페가 아닌 주택 골목 벤치",
      "safety": "주거 프라이버시",
      "works": [
        {
          "id": "W-SS11-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "카페가 아닌 힌지.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "저층 주택 문 힌지 + 먼 공방 + 참새",
            "B": [
              {
                "start": 8,
                "end": 24,
                "text": "카페 골목이 아니다. 문이 낮고, 벨이 개인적이다."
              },
              {
                "start": 24,
                "end": 56,
                "text": "공방 문이 열릴 때와 주택 문이 열릴 때는 힌지가 다르다. 오늘의 본편은 주택 힌지다."
              },
              {
                "start": 56,
                "end": 90,
                "text": "벤치에 앉되 창문을 들여다보지 않는다. 소리는 골목에만 있다."
              },
              {
                "start": 90,
                "end": 118,
                "text": "누군가의 점심 냄새가 콘텐츠가 되지 않게 한다."
              }
            ],
            "C": {
              "youtube_query": "soft acoustic room tone",
              "slot_rule": "작은 방 톤 + 희미한 기타",
              "hard_ban": "카페 재즈 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-22:00",
            "duration_sec": 108,
            "A": "저층 창 불 룸톤 + 선택적 벨(들리면 본편 일시정지)",
            "B": [
              {
                "start": 6,
                "end": 28,
                "text": "주택 불이 저층에서만 켜진다. 골목은 빌린 빛이다."
              },
              {
                "start": 28,
                "end": 70,
                "text": "벨이 울리면 본편을 멈춘다. 남의 귀가 아니다."
              },
              {
                "start": 70,
                "end": 100,
                "text": "22시 닫음."
              }
            ],
            "C": {
              "youtube_query": "soft acoustic room tone night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 작은 방 톤 + 희미한 기타",
              "hard_ban": "카페 재즈 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "소리는 골목에만 있다."
        }
      ]
    },
    {
      "id": "SS-12",
      "alias": "숲으로 떨어지는 골목 끝",
      "lat": 37.5456,
      "lng": 127.0401,
      "radius": 40,
      "zone": "C.서울숲 북쪽·아틀리에 이면",
      "place_type": "골목 끝",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "아틀리에길이 서울숲으로 붙는 끝, 출입구 표지판 직전",
      "safety": "서울숲 정문 아님",
      "works": [
        {
          "id": "W-SS12-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "표지판 직전의 공기.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "골목 도시음이 줄고 나뭇잎/흙 비율이 늘어남",
            "B": [
              {
                "start": 8,
                "end": 26,
                "text": "골목이 끝나기 직전, 숲 공기가 먼저 도착한다."
              },
              {
                "start": 26,
                "end": 58,
                "text": "표지판은 출입구를 가리키고, 이 핀은 표지판 직전을 가리킨다. 입구를 미리 열어 보이지 않는다."
              },
              {
                "start": 58,
                "end": 92,
                "text": "도시 먼지와 흙이 신발 밑에서 섞인다. 그 섞임이 경계다."
              },
              {
                "start": 92,
                "end": 118,
                "text": "정문으로 들어가도 된다. 다만 이 소리는 정문 앞에 없다."
              }
            ],
            "C": {
              "youtube_query": "forest edge wind drone",
              "slot_rule": "바람 드론, 새 소리 최소",
              "hard_ban": "힐링 명상 과다 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-21:00",
            "duration_sec": 108,
            "A": "숲 공기 + 표지판 쪽 약한 조명 험",
            "B": [
              {
                "start": 6,
                "end": 30,
                "text": "숲 공기가 골목으로 더 깊게 들어온다. 사람은 반대로 빠져나간다."
              },
              {
                "start": 30,
                "end": 70,
                "text": "표지판 불빛만 남고, 직전의 이 자리는 더 어두워진다."
              },
              {
                "start": 70,
                "end": 100,
                "text": "공원 폐장과 함께 핀을 닫는다."
              }
            ],
            "C": {
              "youtube_query": "forest edge wind drone night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 바람 드론, 새 소리 최소",
              "hard_ban": "힐링 명상 과다 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "이 소리는 정문 앞에 없다."
        }
      ]
    },
    {
      "id": "SS-13",
      "alias": "저층 주택 담장",
      "lat": 37.5464,
      "lng": 127.042,
      "radius": 40,
      "zone": "C.서울숲 북쪽·아틀리에 이면",
      "place_type": "담장",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "수선된 붉은 벽돌과 안 된 담이 맞닿는 지점",
      "safety": "주거",
      "works": [
        {
          "id": "W-SS13-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "두 종류의 붉은 담.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "담장 반사 발소리 + 선택적 개 짖음(있으면만) + 먼 서울숲",
            "B": [
              {
                "start": 8,
                "end": 24,
                "text": "수선된 벽돌과 수선되지 않은 담이 한 줄에서 만난다."
              },
              {
                "start": 24,
                "end": 58,
                "text": "서울시가 칠한 붉은색과, 비가 칠한 붉은색. 낮에는 둘의 온도가 다르다."
              },
              {
                "start": 58,
                "end": 92,
                "text": "담 너머 개 짖는 소리는 초대하여 쓰지 않는다. 들리면 두고, 없으면 만들지 않는다."
              },
              {
                "start": 92,
                "end": 118,
                "text": "이 담장은 전시된 성수가 아니라 남은 성수 다."
              }
            ],
            "C": {
              "youtube_query": "brick heat analog tape hiss",
              "slot_rule": "테이프 히스 + 낮은 오르간",
              "hard_ban": "동화풍 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-21:00",
            "duration_sec": 108,
            "A": "담 너머 TV 가능 + 골목 무음",
            "B": [
              {
                "start": 6,
                "end": 32,
                "text": "두 종류의 붉은 담이 밤에 같은 색이 된다."
              },
              {
                "start": 32,
                "end": 75,
                "text": "담 너머 TV 소리가 들리면 볼륨을 낮춘다. 우리 쪽이 손님이다."
              },
              {
                "start": 75,
                "end": 100,
                "text": "21시 닫음."
              }
            ],
            "C": {
              "youtube_query": "brick heat analog tape hiss night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 테이프 히스 + 낮은 오르간",
              "hard_ban": "동화풍 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "전시된 성수가 아니라 남은 성수."
        }
      ]
    },
    {
      "id": "SS-14",
      "alias": "작은 숲 가장자리",
      "lat": 37.5448,
      "lng": 127.0388,
      "radius": 50,
      "zone": "C.서울숲 북쪽·아틀리에 이면",
      "place_type": "숲 가장자리",
      "landmark_quota": true,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "서울숲 안 대형 잔디가 아니라 가장자리 나무 밑",
      "safety": "폐장 시간이면 핀 제외",
      "works": [
        {
          "id": "W-SS14-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "무대가 아닌 가장자리.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "자전거 스침 + 가장자리 나뭇잎 + 잔디 쪽 대화는 멀리",
            "B": [
              {
                "start": 8,
                "end": 24,
                "text": "잔디 한가운데는 이미 무대다. 가장자리 나무 밑만 남긴다."
              },
              {
                "start": 24,
                "end": 55,
                "text": "자전거가 스칠 때의 바람만 본편이다. 피크닉 대화는 넣지 않는다."
              },
              {
                "start": 55,
                "end": 90,
                "text": "숲이 닫히기 시작하면 이 핀도 닫힌다. 폐장 이후의 로맨스는 없다."
              },
              {
                "start": 90,
                "end": 115,
                "text": "랜드마크 쿼터의 두 번째. 숲의 얼굴을 더 가져가지 않는다."
              }
            ],
            "C": {
              "youtube_query": "bicycle pass by field recording mix",
              "slot_rule": "스치는 바람 중심",
              "hard_ban": "동요·가족 브이로그 BGM 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-21:00",
            "duration_sec": 108,
            "A": "폐장 전 안내 가능성 + 나무 바람",
            "B": [
              {
                "start": 6,
                "end": 28,
                "text": "가장자리 나무 밑. 잔디 무대는 이미 비었다."
              },
              {
                "start": 28,
                "end": 65,
                "text": "폐장 안내 방송이 들리면 즉시 종료한다."
              },
              {
                "start": 65,
                "end": 90,
                "text": "닫힌 숲을 로맨스로 쓰지 않는다."
              }
            ],
            "C": {
              "youtube_query": "bicycle pass by field recording mix night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 스치는 바람 중심",
              "hard_ban": "동요·가족 브이로그 BGM 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "폐장 이후의 로맨스는 없다."
        }
      ]
    },
    {
      "id": "SS-15",
      "alias": "송정제방 그늘",
      "lat": 37.5502,
      "lng": 127.0518,
      "radius": 50,
      "zone": "D.천변·다리",
      "place_type": "제방 벤치",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "성수동1가 671-5 일대 중랑천 제방, 벚·느티 그늘 벤치",
      "safety": "밤 조명 확인",
      "works": [
        {
          "id": "W-SS15-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "계산하지 않는 그늘.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "제방 나뭇잎 + 자전거도로 + 중랑천 물",
            "B": [
              {
                "start": 8,
                "end": 26,
                "text": "제방의 그늘은 카페 그늘보다 길다. 나무가 계산하지 않는다."
              },
              {
                "start": 26,
                "end": 58,
                "text": "자전거도로의 바람이 재봉기 대신 박자가 된다. 성수의 다른 켜다."
              },
              {
                "start": 58,
                "end": 92,
                "text": "중랑천은 성수 이야기를 하지 않는다. 물은 물이고, 벤치는 벤치다."
              },
              {
                "start": 92,
                "end": 120,
                "text": "벚이 아닌 계절에도 이 핀은 유효하다. 꽃이 콘텐츠가 되지 않게."
              }
            ],
            "C": {
              "youtube_query": "riverside night/day ambient guitar",
              "slot_rule": "희미한 기타, 물과 양보",
              "hard_ban": "벚꽃 테마곡 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-22:00",
            "duration_sec": 108,
            "A": "물 소리 상승 + 드문 자전거 벨",
            "B": [
              {
                "start": 6,
                "end": 30,
                "text": "제방 나무가 가로등보다 먼저 어둠을 만든다."
              },
              {
                "start": 30,
                "end": 72,
                "text": "자전거 벨이 드물어지고 물 소리가 올라온다."
              },
              {
                "start": 72,
                "end": 108,
                "text": "조명 없는 벤치면 이 트랙을 틀지 마라."
              }
            ],
            "C": {
              "youtube_query": "riverside night/day ambient guitar night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 희미한 기타, 물과 양보",
              "hard_ban": "벚꽃 테마곡 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "물은 물이고, 벤치는 벤치다."
        }
      ]
    },
    {
      "id": "SS-16",
      "alias": "천변 내려가는 계단",
      "lat": 37.5481,
      "lng": 127.0532,
      "radius": 40,
      "zone": "D.천변·다리",
      "place_type": "계단",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "성수 시가지에서 중랑천으로 떨어지는 계단 중간",
      "safety": "난간·미끄럼",
      "works": [
        {
          "id": "W-SS16-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "도시가 한 층 끊기는 참.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "위 도시 / 아래 물 사이의 중간 주파수 + 계단 발",
            "B": [
              {
                "start": 8,
                "end": 22,
                "text": "계단 중간. 도시가 한 층 아래로 끊기는 지점."
              },
              {
                "start": 22,
                "end": 55,
                "text": "위에선 매장 음악, 아래에선 물. 이 참에서는 둘 다 흐리다."
              },
              {
                "start": 55,
                "end": 90,
                "text": "난간을 잡는 손이 본편의 박자가 되어도 된다."
              },
              {
                "start": 90,
                "end": 118,
                "text": "밤 트랙은 같은 계단, 다른 끊김이다. 지금은 낮의 끊김만."
              }
            ],
            "C": {
              "youtube_query": "staircase footstep tempo instrumental",
              "slot_rule": "발 박자 템포",
              "hard_ban": "웅장한 오케스트라 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-22:00",
            "duration_sec": 108,
            "A": "아래 물만 남음 + 난간",
            "B": [
              {
                "start": 6,
                "end": 28,
                "text": "낮에 흐리던 두 소음이 밤에는 아래로만 남는다."
              },
              {
                "start": 28,
                "end": 70,
                "text": "계단 참의 난간이 차갑다. 손이 먼저 안다."
              },
              {
                "start": 70,
                "end": 105,
                "text": "같은 좌표, 다른 끊김. 이것이 밤을 여는 이유다."
              }
            ],
            "C": {
              "youtube_query": "staircase footstep tempo instrumental night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 발 박자 템포",
              "hard_ban": "웅장한 오케스트라 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "지금은 낮의 끊김만."
        }
      ]
    },
    {
      "id": "SS-17",
      "alias": "다리 그늘 밑",
      "lat": 37.549,
      "lng": 127.0524,
      "radius": 60,
      "zone": "D.천변·다리",
      "place_type": "교각 하부",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "천을 건너는 다리 아래, 보행 가능하고 밝은 곳만",
      "safety": "으슥하면 폐기",
      "works": [
        {
          "id": "W-SS17-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "차와 물 사이의 그늘.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "위 차량 저역 + 아래 물 + 교각 에코",
            "B": [
              {
                "start": 8,
                "end": 24,
                "text": "위는 차, 아래는 물. 너는 둘 사이의 그늘에 있다."
              },
              {
                "start": 24,
                "end": 58,
                "text": "교각이 도시를 한 번 접어 준다. 접힌 자리의 에코가 음악보다 먼저다."
              },
              {
                "start": 58,
                "end": 90,
                "text": "어두우면 이 핀은 죽는다. 힙한 어둠은 헌법 밖이다."
              },
              {
                "start": 90,
                "end": 118,
                "text": "밝은 그늘만 남긴다. 그늘과 으슥함은 다르다."
              }
            ],
            "C": {
              "youtube_query": "underpass spatial drone",
              "slot_rule": "공간 드론, 저역",
              "hard_ban": "공포 사운드 디자인 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-21:00",
            "duration_sec": 108,
            "A": "교각 에코 과대 + 밝기 게이트 필요",
            "B": [
              {
                "start": 6,
                "end": 30,
                "text": "위 차 소리가 뜸하면 교각 에코가 너무 커진다."
              },
              {
                "start": 30,
                "end": 70,
                "text": "밝기 기준을 통과하지 못하면 재생하지 않는다."
              },
              {
                "start": 70,
                "end": 95,
                "text": "으슥한 다리는 콘텐츠가 아니라 폐기 사유다."
              }
            ],
            "C": {
              "youtube_query": "underpass spatial drone night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 공간 드론, 저역",
              "hard_ban": "공포 사운드 디자인 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "그늘과 으슥함은 다르다."
        }
      ]
    },
    {
      "id": "SS-18",
      "alias": "전농천 합류 근처",
      "lat": 37.5511,
      "lng": 127.0502,
      "radius": 50,
      "zone": "D.천변·다리",
      "place_type": "난간",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "중랑천이 넓어지기 전, 사람이 덜 찍는 난간",
      "safety": "밤 안전 재확인",
      "works": [
        {
          "id": "W-SS18-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "사진이 잘 안 나오는 난간.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "수면 + 먼 트럭 + 난간 손 마찰",
            "B": [
              {
                "start": 8,
                "end": 26,
                "text": "물이 넓어지기 전의 난간. 사진이 잘 안 나오는 각."
              },
              {
                "start": 26,
                "end": 60,
                "text": "도시 소음이 수면 위에서 미끄러진다. 멀어지는 속도가 본편이다."
              },
              {
                "start": 60,
                "end": 95,
                "text": "합류는 지명이 아니라 소리의 섞임이다. 해설하지 않는다."
              },
              {
                "start": 95,
                "end": 118,
                "text": "난간에 오래 기대지 마라. 이 자리는 통과용이다."
              }
            ],
            "C": {
              "youtube_query": "water surface distant traffic pad",
              "slot_rule": "수면 + 먼 트래픽",
              "hard_ban": "뉴에이지 하프 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-21:00",
            "duration_sec": 108,
            "A": "물 + 먼 트럭",
            "B": [
              {
                "start": 6,
                "end": 30,
                "text": "난간의 강이 도시보다 크게 들린다."
              },
              {
                "start": 30,
                "end": 70,
                "text": "합류의 섞임이 단순해진다. 물과 먼 트럭."
              },
              {
                "start": 70,
                "end": 100,
                "text": "오래 서지 말 것. 통과."
              }
            ],
            "C": {
              "youtube_query": "water surface distant traffic pad night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 수면 + 먼 트래픽",
              "hard_ban": "뉴에이지 하프 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "이 자리는 통과용이다."
        }
      ]
    },
    {
      "id": "SS-19",
      "alias": "육교 계단 참",
      "lat": 37.5453,
      "lng": 127.0561,
      "radius": 40,
      "zone": "E.일상 인프라",
      "place_type": "육교 참",
      "landmark_quota": true,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "성수역~공장지대 사이 육교의 참(landing)",
      "safety": "교통 안전",
      "works": [
        {
          "id": "W-SS19-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "목적지가 아닌 철판.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "육교 상부 차량 울림 + 참 철판 + 오르내리는 발",
            "B": [
              {
                "start": 8,
                "end": 24,
                "text": "참은 목적지가 아니다. 숨 고르는 철판이다."
              },
              {
                "start": 24,
                "end": 58,
                "text": "머리 위 육교가 차를 한 번 삼킨다. 그 울림이 이 자리의 천장이다."
              },
              {
                "start": 58,
                "end": 90,
                "text": "계단을 오르는 사람과 내려가는 사람의 발 수가 같아지지 않는다."
              },
              {
                "start": 90,
                "end": 118,
                "text": "랜드마크 쿼터의 세 번째. 역 출구를 핀으로 쓰지 않기 위해 여기를 쓴다."
              }
            ],
            "C": {
              "youtube_query": "iron resonance cinematic minimal",
              "slot_rule": "철 공명 미니멀",
              "hard_ban": "예고편형 북 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-23:00",
            "duration_sec": 108,
            "A": "얇아진 철 울림 + 한 사람의 발",
            "B": [
              {
                "start": 6,
                "end": 28,
                "text": "참의 철판이 밤 공기를 더 얇게 울린다."
              },
              {
                "start": 28,
                "end": 70,
                "text": "오르내리는 발이 드물다. 한 사람의 발만으로 본편이 된다."
              },
              {
                "start": 70,
                "end": 105,
                "text": "역 안내 방송이 위로 새면 잠시 기다려도 된다."
              }
            ],
            "C": {
              "youtube_query": "iron resonance cinematic minimal night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 철 공명 미니멀",
              "hard_ban": "예고편형 북 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "숨 고르는 철판."
        }
      ]
    },
    {
      "id": "SS-20",
      "alias": "편의점 옆 벤치",
      "lat": 37.544,
      "lng": 127.0545,
      "radius": 40,
      "zone": "E.일상 인프라",
      "place_type": "벤치",
      "landmark_quota": false,
      "status": "DUMMY_UNVERIFIED",
      "find_hint": "편의점 정면이 아닌 옆면 빈 벤치",
      "safety": "특정 브랜드명 안 씀",
      "works": [
        {
          "id": "W-SS20-01",
          "kind": "audio",
          "creator": "공식",
          "aggro": "정면이 아닌 벨.",
          "body_day": {
            "hours": "07:00-17:30",
            "duration_sec": 118,
            "A": "문 벨 + 냉장고 컴프레서 + 옆면 교통",
            "B": [
              {
                "start": 8,
                "end": 24,
                "text": "정면은 광고다. 옆면 벤치에는 냉장고 소리만 남는다."
              },
              {
                "start": 24,
                "end": 58,
                "text": "문이 열릴 때마다 벨이 한 번. 상호는 지운다. 벨의 높이만 남긴다."
              },
              {
                "start": 58,
                "end": 92,
                "text": "누가 앉아 있으면 본편을 기다린다. 사람의 휴식을 뚫지 않는다."
              },
              {
                "start": 92,
                "end": 118,
                "text": "심야의 이 벤치는 다른 트랙이다. 낮에는 벨만."
              }
            ],
            "C": {
              "youtube_query": "refrigerator hum lo-fi",
              "slot_rule": "냉장고 험이 킥이 되는 로파이",
              "hard_ban": "브랜드 CM송 금지",
              "preview_sec": 20,
              "enter_at_sec": 40,
              "bed_db": -18,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "body_night": {
            "hours": "17:30-24:00",
            "duration_sec": 110,
            "A": "냉장고가 전면 + 드문 심야 벨",
            "B": [
              {
                "start": 6,
                "end": 28,
                "text": "옆면 벤치. 냉장고가 주인공이 된다."
              },
              {
                "start": 28,
                "end": 70,
                "text": "심야 벨은 낮보다 드물고 더 크다."
              },
              {
                "start": 70,
                "end": 110,
                "text": "정면 조명을 찍지 마라. 상호가 카드에 남는다."
              }
            ],
            "C": {
              "youtube_query": "refrigerator hum lo-fi night sparse quieter",
              "slot_rule": "밤: 낮보다 -4dB, 밀도 낮춤. 냉장고 험이 킥이 되는 로파이",
              "hard_ban": "브랜드 CM송 금지",
              "preview_sec": 20,
              "enter_at_sec": 28,
              "bed_db": -22,
              "url_dummy": null,
              "note": "URL은 더미에서 비움. 현장 후 창작자/퍼블릭 슬롯만 채움."
            }
          },
          "afterglow": "상호는 지운다. 벨의 높이만."
        }
      ]
    }
  ]
};

const M_PER_DEG = 111320;
const BOUNDS = { minLat: 37.541, maxLat: 37.5536, minLng: 127.0362, maxLng: 127.0608 };

const state = {
  pinId: "SS-01",
  phase: "day",
  distanceM: 120,
  useGps: false,
  gpsFix: null,
  geoWatchId: null,
  gpsCalls: 0,
  gpsAtBoot: 0,
  mode: "idle",
  playT: 0,
  resume: {},
  visited: [],
  keeps: [],
  rate: 1,
  sheetOpen: false,
  sliding: false,
  spokenLine: null,
  speechWatch: null,
  fadeStart: 0,
  layoutOnly: false,
  runTestOnBoot: false,
  gpsNote: "",
  kindNote: "",
  tilesOn: false,
  tilesStarted: false,
  tileRequests: 0,
  tileRequestsAtBoot: 0,
  phaseHeld: false,
  rehearsalArmed: false,
  wasInside: null
};

const audio = { ctx: null, master: null, nodes: [], aEnv: null, cGain: null, ring: null };
const view = { w: 1, h: 1 };
const tiles = [];

const FILTER = {
  "SS-01": ["bandpass", 1800, 1.2],
  "SS-02": ["lowpass", 280, 0.7],
  "SS-03": ["bandpass", 1400, 0.8],
  "SS-04": ["highpass", 1800, 0.7],
  "SS-05": ["lowpass", 900, 0.6],
  "SS-06": ["lowpass", 320, 0.8],
  "SS-07": ["lowpass", 700, 0.5],
  "SS-08": ["bandpass", 500, 1],
  "SS-09": ["bandpass", 400, 0.8],
  "SS-10": ["lowpass", 600, 0.4],
  "SS-11": ["highpass", 1200, 0.6],
  "SS-12": ["bandpass", 800, 0.4],
  "SS-13": ["highpass", 4000, 0.4],
  "SS-14": ["bandpass", 1000, 0.5],
  "SS-15": ["bandpass", 1500, 0.6],
  "SS-16": ["bandpass", 320, 0.9],
  "SS-17": ["lowpass", 180, 0.7],
  "SS-18": ["lowpass", 500, 0.4],
  "SS-19": ["bandpass", 900, 2.2],
  "SS-20": ["lowpass", 200, 0.8]
};
const RING = { "SS-02": 90, "SS-06": 80, "SS-13": 146, "SS-17": 70, "SS-19": 220, "SS-20": 58 };

const AGGRO_SEC = 8;
const AFTERGLOW_SEC = 30;

function pinById(id) {
  return DATA.pins.find((p) => p.id === id) || studioPins.find((p) => p.id === id) || DATA.pins[0];
}
function currentPin() { return pinById(state.pinId); }
function workOf(pin) { return pin.works[0]; }
function pieceOf(pin, phase) {
  const work = workOf(pin);
  return (phase || state.phase) === "night" ? work.body_night : work.body_day;
}
function keyOf(pinId, phase) { return (pinId || state.pinId) + "|" + (phase || state.phase); }
function fmt(t) {
  t = Math.max(0, Math.floor(t || 0));
  return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0");
}
function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

function save() {
  try {
    const keeps = state.keeps || [];
    localStorage.setItem("janhyang-pilot", JSON.stringify({ visited: state.visited, resume: state.resume, keeps: keeps }));
    localStorage.setItem("janhyang-keeps", JSON.stringify(keeps));
  } catch (e) {}
}
function load() {
  try {
    const raw = localStorage.getItem("janhyang-pilot");
    if (!raw) return;
    const d = JSON.parse(raw);
    if (Array.isArray(d.visited)) state.visited = d.visited.filter((id) => pinById(id).id === id);
    if (d.resume && typeof d.resume === "object") state.resume = d.resume;
    if (Array.isArray(d.keeps)) {
      state.keeps = d.keeps.filter((k) => k && state.visited.includes(k.pinId) && pinById(k.pinId).id === k.pinId);
    }
  } catch (e) {}
  const known = {};
  (state.keeps || []).forEach((k) => { known[k.pinId] = true; });
  state.visited.forEach((id) => {
    if (!known[id]) state.keeps.push({ pinId: id, workId: workOf(pinById(id)).id, at: "" });
  });
}

function offsetNorth(lat, lng, meters) {
  return { lat: lat + meters / M_PER_DEG, lng: lng };
}
function haversine(a, b) {
  const R = 6371000;
  const p1 = a.lat * Math.PI / 180;
  const p2 = b.lat * Math.PI / 180;
  const dp = (b.lat - a.lat) * Math.PI / 180;
  const dl = (b.lng - a.lng) * Math.PI / 180;
  const h = Math.sin(dp / 2) ** 2 + Math.cos(p1) * Math.cos(p2) * Math.sin(dl / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}
function simPos(pin) {
  const p = pin || currentPin();
  return offsetNorth(p.lat, p.lng, state.distanceM);
}
const LocationSource = {
  kind: "simulator",
  hits: 0,
  onDistance(meters, atPin) {
    this.hits += 1;
    state.lastMeters = meters;
    if (state.mode === "aggro" && meters <= atPin.radius) quietStop();
    else if (state.mode === "main" && meters > atPin.radius) Player.fadeOut(4);
    render();
  },
  point() {
    if (this.kind === "gps") return state.gpsFix || null;
    return simPos();
  },
  emit() {
    const pin = currentPin();
    const here = this.point();
    const meters = here ? haversine(here, { lat: pin.lat, lng: pin.lng }) : Infinity;
    this.onDistance(meters, pin);
  },
  clearWatch() {
    if (state.geoWatchId != null && navigator.geolocation) {
      try { navigator.geolocation.clearWatch(state.geoWatchId); } catch (e) {}
    }
    state.geoWatchId = null;
  },
  armWatch() {
    this.clearWatch();
    if (this.kind !== "gps" || document.hidden) return;
    if (!navigator.geolocation || !navigator.geolocation.watchPosition) {
      this.fail();
      return;
    }
    try {
      state.geoWatchId = navigator.geolocation.watchPosition(
        (pos) => {
          if (document.hidden || LocationSource.kind !== "gps") return;
          state.gpsFix = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          state.gpsNote = "";
          state.rehearsalArmed = false;
          LocationSource.emit();
        },
        () => LocationSource.fail(),
        { enableHighAccuracy: true, maximumAge: 2000, timeout: 8000 }
      );
    } catch (e) {
      this.fail();
    }
  },
  useSimulator() {
    this.kind = "simulator";
    state.useGps = false;
    state.gpsFix = null;
    state.gpsNote = "";
    this.clearWatch();
    const box = document.getElementById("gps");
    if (box) box.checked = false;
    this.emit();
  },
  useForeground() {
    if (!navigator.geolocation || !navigator.geolocation.watchPosition) {
      this.kind = "gps";
      this.fail();
      return;
    }
    this.kind = "gps";
    state.useGps = true;
    state.gpsNote = "";
    if (!document.hidden) this.armWatch();
    render();
  },
  fail() {
    if (this.kind !== "gps") return;
    this.kind = "simulator";
    state.useGps = false;
    state.gpsFix = null;
    state.gpsNote = "GPS 실패 → 시뮬";
    this.clearWatch();
    const box = document.getElementById("gps");
    if (box) box.checked = false;
    this.emit();
  }
};
function listenerPos() { return LocationSource.point(); }
function distanceToPin(pin) {
  const here = LocationSource.point();
  if (!here) return Infinity;
  return haversine(here, { lat: pin.lat, lng: pin.lng });
}
function inside(pin) { return distanceToPin(pin) <= pin.radius; }
function gate(pin) {
  if (inside(pin)) return "near";
  if (state.visited.includes(pin.id)) return "echo";
  return "aggro";
}
function lineAt(pin, phase, t) {
  const piece = pieceOf(pin, phase);
  if (t < 0 || t >= piece.duration_sec) return null;
  for (let i = 0; i < piece.B.length; i++) {
    const line = piece.B[i];
    const end = Math.min(line.end, piece.duration_sec);
    if (t >= line.start && t < end) return { index: i, text: line.text, start: line.start, end: end };
  }
  return null;
}
function cAmp(piece, t) {
  const enter = piece.C.enter_at_sec;
  const holdEnd = enter + piece.C.preview_sec;
  const die = holdEnd + 2;
  if (t < enter || t >= die) return 0;
  let env = 1;
  if (t < enter + 1) env = (t - enter) / 1;
  else if (t > holdEnd) env = Math.max(0, 1 - (t - holdEnd) / 2);
  if (t === enter) env = 0.02;
  return Math.pow(10, piece.C.bed_db / 20) * env;
}
function fadeLevel(elapsed) { return Math.max(0, 1 - elapsed / 4); }

function pulse(t, bpm, duty, density) {
  const period = (60 / bpm) * density;
  const ph = (t % period) / period;
  return ph < duty ? 1 : 0;
}
function rawLevel(id, t, density) {
  switch (id) {
    case "SS-01":
      return Math.min(1, 0.07 + pulse(t, 96, 0.1, density) * 0.95 + pulse(t + 0.18, 78, 0.05, density) * 0.4);
    case "SS-02":
      return 0.42 + 0.28 * Math.sin(t * 1.6);
    case "SS-03":
      return Math.min(1, 0.05 + pulse(t, 132, 0.05, density) + pulse(t + 0.23, 108, 0.04, density) * 0.75);
    case "SS-04":
      return 0.03 + pulse(t, 24, 0.035, density);
    case "SS-05":
      return 0.12 + pulse(t + 0.45, 36, 0.09, density) * 0.55;
    case "SS-06":
      return 0.38 + pulse(t, 78, 0.06, density) * 0.5;
    case "SS-07":
      return (0.22 + 0.12 * Math.sin(t * 0.45)) * (1 - Math.min(0.35, t / 80));
    case "SS-08": {
      const period = (60 / 90) * density;
      const i = Math.floor(t / period);
      if (i % 4 === 3) return 0.02;
      return ((t % period) / period) < 0.16 ? 0.9 : 0.03;
    }
    case "SS-09":
      return 0.04 + pulse(t, 104, 0.05, density) * 0.9;
    case "SS-10": {
      const period = (60 / 64) * density;
      const ph = (t % period) / period;
      if (ph < 0.05) return 1;
      if (ph < 0.3) return 0.32;
      return 0.04;
    }
    case "SS-11":
      return 0.04 + pulse(t, 18, 0.03, density) * 0.8 + pulse(t, 7, 0.015, density) * 0.25;
    case "SS-12":
      return 0.16 + 0.1 * Math.sin(t * 0.7) + Math.min(0.2, t / 90);
    case "SS-13":
      return 0.16 + 0.04 * Math.sin(t * 3.1);
    case "SS-14": {
      const period = 5.5 * density;
      const x = (((t % period) / period) - 0.35) * 2;
      return Math.exp(-x * x * 6);
    }
    case "SS-15":
      return 0.18 + 0.08 * Math.sin(t * 0.8) + pulse(t, 170, 0.02, density) * 0.45;
    case "SS-16":
      return 0.05 + pulse(t, 108, 0.07, density) * 0.9;
    case "SS-17":
      return 0.4 + 0.08 * Math.sin(t * 0.55);
    case "SS-18":
      return 0.2 + 0.07 * Math.sin(t * 0.35) + 0.05 * Math.sin(t * 1.7);
    case "SS-19":
      return 0.1 + pulse(t, 48, 0.025, density) * 0.9;
    case "SS-20":
      return 0.36 + pulse(t, 11, 0.02, density) * 0.7;
    default:
      return 0.15;
  }
}
function aLevel(id, t, night) {
  const density = night ? 1.7 : 1;
  const g = rawLevel(id, t, density);
  const shaped = Math.max(0, Math.min(1, g));
  return shaped * (night ? Math.pow(10, -4 / 20) : 1);
}

function patchGeo() {
  const geo = navigator.geolocation;
  if (!geo || geo.__janhyang) return;
  const watch = geo.watchPosition && geo.watchPosition.bind(geo);
  const get = geo.getCurrentPosition && geo.getCurrentPosition.bind(geo);
  if (watch) {
    geo.watchPosition = function () {
      state.gpsCalls += 1;
      return watch.apply(geo, arguments);
    };
  }
  if (get) {
    geo.getCurrentPosition = function () {
      state.gpsCalls += 1;
      return get.apply(geo, arguments);
    };
  }
  geo.__janhyang = true;
}

function enableGps() { LocationSource.useForeground(); }
function disableGps() { LocationSource.useSimulator(); }

function ensureAudio() {
  if (audio.ctx) return audio.ctx;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  try {
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 1;
    master.connect(ctx.destination);
    audio.ctx = ctx;
    audio.master = master;
    return ctx;
  } catch (e) {
    return null;
  }
}
function stopNodes() {
  for (const n of audio.nodes) {
    try { n.stop(); } catch (e) {}
    try { n.disconnect(); } catch (e) {}
  }
  audio.nodes = [];
  audio.aEnv = null;
  audio.cGain = null;
  audio.ring = null;
}
function makeNoise(ctx) {
  const len = ctx.sampleRate * 2;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}
function startGraph(pin) {
  try {
    const ctx = ensureAudio();
    if (!ctx) return;
    stopNodes();
    const src = ctx.createBufferSource();
    src.buffer = makeNoise(ctx);
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    const spec = FILTER[pin.id] || ["lowpass", 1000, 0.7];
    filter.type = spec[0];
    filter.frequency.value = spec[1];
    filter.Q.value = spec[2];
    const aEnv = ctx.createGain();
    aEnv.gain.value = 0;
    src.connect(filter);
    filter.connect(aEnv);
    aEnv.connect(audio.master);
    src.start();
    audio.nodes.push(src);
    audio.aEnv = aEnv;
    const ringF = RING[pin.id];
    if (ringF) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = ringF;
      const g = ctx.createGain();
      g.gain.value = 0;
      o.connect(g);
      g.connect(audio.master);
      o.start();
      audio.nodes.push(o);
      audio.ring = g;
    }
    const o1 = ctx.createOscillator();
    o1.type = "sine";
    o1.frequency.value = 196;
    const o2 = ctx.createOscillator();
    o2.type = "triangle";
    o2.frequency.value = 294;
    const c = ctx.createGain();
    c.gain.value = 0;
    const o2g = ctx.createGain();
    o2g.gain.value = 0.28;
    o1.connect(c);
    o2.connect(o2g);
    o2g.connect(c);
    c.connect(audio.master);
    o1.start();
    o2.start();
    audio.nodes.push(o1, o2);
    audio.cGain = c;
    audio.master.gain.value = 1;
  } catch (e) {}
}
function updateAudio() {
  if (!audio.ctx || !audio.aEnv) return;
  try {
    const pin = currentPin();
    const level = aLevel(pin.id, state.playT, state.phase === "night");
    let mul = 0.26;
    if (state.mode === "aggro") mul = 0.18;
    if (state.mode === "echo") mul = 0.11;
    audio.aEnv.gain.value = level * mul;
    if (audio.ring) audio.ring.gain.value = level * 0.05;
    if (audio.cGain) {
      audio.cGain.gain.value = state.mode === "main" ? cAmp(pieceOf(pin), state.playT) : 0;
    }
  } catch (e) {}
}
function setMaster(v) {
  if (!audio.master) return;
  try { audio.master.gain.value = Math.max(0, v); } catch (e) {}
}
function beep() {
  try {
    const ctx = ensureAudio();
    if (!ctx) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 880;
    g.gain.setValueAtTime(0.07, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    o.connect(g);
    g.connect(audio.master || ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.09);
  } catch (e) {}
}
function safeCancelSpeech() {
  try { if (window.speechSynthesis) speechSynthesis.cancel(); } catch (e) {}
}
function speakOrBeep(text) {
  state.speechWatch = { t0: performance.now(), beeped: false, ok: false };
  try {
    if (!window.speechSynthesis) throw new Error("no-speech");
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ko-KR";
    u.rate = 0.95;
    const voice = koreanVoice();
    if (voice) u.voice = voice;
    u.onerror = () => {
      if (state.speechWatch && !state.speechWatch.beeped) {
        state.speechWatch.beeped = true;
        beep();
      }
    };
    speechSynthesis.speak(u);
  } catch (e) {
    state.speechWatch.beeped = true;
    beep();
  }
}
function koreanVoice() {
  try {
    return speechSynthesis.getVoices().find((v) => /^ko/i.test(v.lang)) || null;
  } catch (e) {
    return null;
  }
}
function unlockSpeech() {
  try { if (window.speechSynthesis) speechSynthesis.resume(); } catch (e) {}
}
function checkSpeech() {
  const w = state.speechWatch;
  if (!w || w.beeped || w.ok) return;
  let speaking = false;
  try { speaking = !!(window.speechSynthesis && speechSynthesis.speaking); } catch (e) {}
  if (speaking) { w.ok = true; return; }
  if (performance.now() - w.t0 > 600) {
    w.beeped = true;
    beep();
  }
}
function kickSpeech(pin, mode) {
  unlockSpeech();
  if (mode === "aggro") {
    state.spokenLine = 0;
    speakOrBeep(workOf(pin).aggro);
    return;
  }
  if (mode === "echo") {
    state.spokenLine = 0;
    speakOrBeep(workOf(pin).afterglow);
    return;
  }
  const line = lineAt(pin, state.phase, state.playT);
  state.spokenLine = line ? line.index : -1;
  if (line) speakOrBeep(line.text);
}
function updateSpeech(pin) {
  if (state.mode !== "main") return;
  const line = lineAt(pin, state.phase, state.playT);
  const idx = line ? line.index : -1;
  if (idx !== state.spokenLine) {
    safeCancelSpeech();
    state.spokenLine = idx;
    if (line) speakOrBeep(line.text);
  }
}
function dummyWavUri() {
  if (dummyWavUri.uri) return dummyWavUri.uri;
  const sr = 8000;
  const n = 800;
  const bytes = new Uint8Array(44 + n * 2);
  const view = new DataView(bytes.buffer);
  const mark = (o, s) => { for (let i = 0; i < s.length; i++) bytes[o + i] = s.charCodeAt(i); };
  mark(0, "RIFF");
  view.setUint32(4, 36 + n * 2, true);
  mark(8, "WAVE");
  mark(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sr, true);
  view.setUint32(28, sr * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  mark(36, "data");
  view.setUint32(40, n * 2, true);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  dummyWavUri.uri = "data:audio/wav;base64," + btoa(bin);
  return dummyWavUri.uri;
}

const Player = {
  paused: false,
  source: "silent",
  audioEl: null,
  accepts(work) {
    return !!(work && work.kind === "audio");
  },
  segmentSec(pin, mode) {
    const work = workOf(pin);
    if (mode === "aggro") {
      const n = work && Number(work.aggro_sec);
      return n > 0 ? n : AGGRO_SEC;
    }
    if (mode === "echo") return AFTERGLOW_SEC;
    return pieceOf(pin).duration_sec;
  },
  seek(sec) {
    state.playT = Math.max(0, Number(sec) || 0);
    const el = this.audioEl;
    if (!el) return;
    try { el.currentTime = state.playT; } catch (e) {}
  },
  pause() {
    this.paused = true;
    try { if (this.audioEl) this.audioEl.pause(); } catch (e) {}
    safeCancelSpeech();
    this.session("paused");
  },
  resumePlay() {
    if (state.mode !== "aggro" && state.mode !== "main" && state.mode !== "echo") return;
    this.paused = false;
    try {
      if (this.audioEl) {
        const started = this.audioEl.play();
        if (started && started.catch) started.catch(() => { this.source = "tts"; });
      }
    } catch (e) {
      this.source = "silent";
    }
    this.session("playing");
  },
  closeAudio() {
    const el = this.audioEl;
    this.audioEl = null;
    if (!el) return;
    try { el.pause(); } catch (e) {}
    try { el.removeAttribute("src"); } catch (e) {}
  },
  openAudio(url) {
    this.closeAudio();
    if (!url) { this.source = "silent"; return; }
    try {
      const node = new Audio(url);
      node.preload = "auto";
      node.loop = true;
      node.volume = 0.15;
      node.addEventListener("error", () => {
        if (Player.audioEl === node) Player.source = "silent";
      });
      this.audioEl = node;
      this.source = "file";
      const started = node.play();
      if (started && started.then) {
        started.then(() => {
          if (this.audioEl === node) this.source = "file";
        }).catch(() => {
          if (this.audioEl === node) this.source = "tts";
        });
      }
    } catch (e) {
      this.audioEl = null;
      this.source = "silent";
    }
  },
  resolveSrc(pin) {
    const work = workOf(pin);
    const piece = pieceOf(pin);
    const list = [];
    if (work && typeof work.src === "string") list.push(work.src);
    if (piece && piece.C && typeof piece.C.url_dummy === "string") list.push(piece.C.url_dummy);
    list.push(dummyWavUri());
    for (let i = 0; i < list.length; i++) {
      const url = list[i];
      if (!url) continue;
      if (/^https?:\/\//i.test(url)) {
        try {
          const node = new Audio(url);
          node.preload = "none";
          node.addEventListener("error", () => {});
          const started = node.play();
          if (started && started.catch) started.catch(() => {});
        } catch (e) {}
        continue;
      }
      return url;
    }
    return null;
  },
  cue(segment, from) {
    const pin = currentPin();
    if (!this.accepts(workOf(pin))) {
      this.paused = false;
      this.closeAudio();
      state.mode = "idle";
      state.playT = 0;
      state.kindNote = "이 종류는 다음";
      this.session("none");
      return false;
    }
    state.kindNote = "";
    this.paused = false;
    state.mode = segment;
    this.openAudio(this.resolveSrc(pin));
    this.seek(from || 0);
    this.session("playing");
    return state.mode === segment;
  },
  fadeOut(sec) {
    if (state.mode !== "main") return;
    state.resume[keyOf()] = state.playT;
    state.mode = "fading";
    state.fadeStart = performance.now();
    this.fadeFor = sec || 4;
    safeCancelSpeech();
    save();
  },
  stop() {
    this.paused = false;
    this.closeAudio();
    this.source = "silent";
    safeCancelSpeech();
    stopNodes();
    haltReel();
    state.mode = "idle";
    state.playT = 0;
    state.spokenLine = null;
    state.speechWatch = null;
    state.fadeStart = 0;
    setMaster(1);
    this.session("none");
  },
  failClosed() {
    const keep = state.mode;
    const head = state.playT;
    try {
      const node = new Audio("http://127.0.0.1:9/janhyang-missing.mp3");
      node.preload = "none";
      node.addEventListener("error", () => {});
      const started = node.play();
      if (started && started.catch) started.catch(() => {});
    } catch (e) {}
    this.source = "silent";
    state.mode = keep;
    state.playT = head;
  },
  session(playback) {
    const ms = navigator.mediaSession;
    if (!ms || typeof MediaMetadata === "undefined") return;
    try {
      if (playback === "none") {
        ms.playbackState = "none";
        return;
      }
      const pin = currentPin();
      ms.metadata = new MediaMetadata({ title: pin.alias || pin.id, artist: "잔향" });
      ms.playbackState = playback === "paused" ? "paused" : "playing";
      ms.setActionHandler("play", () => Player.resumePlay());
      ms.setActionHandler("pause", () => Player.pause());
      ms.setActionHandler("seekbackward", null);
      ms.setActionHandler("seekforward", null);
      ms.setActionHandler("seekto", null);
    } catch (e) {}
  },
  tick(dt) {
    if (state.mode === "fading") {
      const elapsed = (performance.now() - state.fadeStart) / 1000;
      const level = fadeLevel(elapsed);
      setMaster(level);
      try { if (this.audioEl) this.audioEl.volume = Math.max(0, level) * 0.15; } catch (e) {}
      if (elapsed >= 4) this.stop();
      syncSetMedia();
      return;
    }
    if (this.paused) return;
    if (!(dt > 0)) return;
    if (state.mode !== "aggro" && state.mode !== "main" && state.mode !== "echo") return;
    state.playT += dt;
    const pin = currentPin();
    if (state.mode === "aggro" && state.playT >= this.segmentSec(pin, "aggro")) { this.stop(); return; }
    if (state.mode === "echo" && state.playT >= AFTERGLOW_SEC) { this.stop(); return; }
    if (state.mode === "main" && state.playT >= pieceOf(pin).duration_sec) {
      markVisited();
      this.stop();
      return;
    }
    if (state.mode === "main" && !inside(pin)) { this.fadeOut(4); return; }
    updateSpeech(pin);
    updateAudio();
    checkSpeech();
    syncSetMedia();
  }
};

function markVisited() {
  const id = state.pinId;
  state.visited = [id].concat(state.visited.filter((x) => x !== id)).slice(0, 20);
  delete state.resume[keyOf()];
  const pin = pinById(id);
  const rest = (state.keeps || []).filter((k) => k.pinId !== id);
  state.keeps = [{ pinId: id, workId: workOf(pin).id, at: new Date().toISOString(), rehearsal: !!state.rehearsalArmed }].concat(rest).slice(0, 20);
  save();
}
function quietStop() { Player.stop(); }
function beginFade() { Player.fadeOut(4); }
function finishFade() { Player.stop(); }
function userStop() {
  const main = state.mode === "main" || state.mode === "fading";
  if (main && state.playT >= 15) markVisited();
  else if (main) {
    state.resume[keyOf()] = state.playT;
    save();
  }
  quietStop();
}
function arm(mode) {
  clearLayoutHold();
  const pin = currentPin();
  const from = state.playT;
  if (!Player.cue(mode, from)) return;
  const ctx = ensureAudio();
  if (ctx) {
    try { ctx.resume(); } catch (e) {}
    startGraph(pin);
  }
  state.spokenLine = null;
  kickSpeech(pin, mode);
}
function playAggro() {
  const pin = currentPin();
  if (inside(pin) || state.visited.includes(pin.id)) return;
  if (!Player.accepts(workOf(pin))) { Player.cue("aggro"); return; }
  quietStop();
  state.playT = 0;
  arm("aggro");
}
function playMain() {
  const pin = currentPin();
  if (!inside(pin)) return;
  if (!Player.accepts(workOf(pin))) { Player.cue("main"); return; }
  const resumeAt = state.resume[keyOf()] || 0;
  quietStop();
  Player.seek(resumeAt);
  arm("main");
}
function playEcho(pinId) {
  if (!state.visited.includes(pinId)) return;
  if (!Player.accepts(workOf(pinById(pinId)))) { Player.cue("echo"); return; }
  if (state.mode === "main") state.resume[keyOf()] = state.playT;
  if (state.mode !== "idle") quietStop();
  state.pinId = pinId;
  document.getElementById("pin").value = pinId;
  state.playT = 0;
  arm("echo");
}
function advance(dt) { Player.tick(dt); }
function onPositionChanged() { LocationSource.emit(); }
function selectPin(id) {
  if (!id || id === state.pinId) return;
  releaseBed();
  haltReel();
  clearLayoutHold();
  if (state.mode === "main") state.resume[keyOf()] = state.playT;
  if (state.mode !== "idle") quietStop();
  state.pinId = id;
  document.getElementById("pin").value = id;
  onPositionChanged();
}
function jump(kind) {
  if (state.useGps) return;
  clearLayoutHold();
  const pin = currentPin();
  let m = state.distanceM;
  if (kind === "far") m = pin.radius + 80;
  if (kind === "near") m = pin.radius * 0.4;
  if (kind === "leave") m = pin.radius + 12;
  state.distanceM = clamp(Math.round(m), 0, 400);
  const slider = document.getElementById("slider");
  slider.value = String(state.distanceM);
  onPositionChanged();
}
function setPhase(phase) {
  if (phase !== "day" && phase !== "night") return;
  if (phase === state.phase) return;
  clearLayoutHold();
  if (state.mode === "main") state.resume[keyOf()] = state.playT;
  if (state.mode !== "idle") quietStop();
  state.phase = phase;
  document.body.classList.toggle("night", phase === "night");
  render();
}
function clearLayoutHold() {
  if (!state.layoutOnly && state.rate !== 0) return;
  state.layoutOnly = false;
  const picked = Number(document.getElementById("rate").value);
  state.rate = picked === 10 ? 10 : 1;
}
function actionSpec(pin) {
  if (state.mode === "fading" && inside(pin)) {
    const left = state.resume[keyOf(pin.id, state.phase)];
    return { id: "main", label: left ? "이어서 듣기 · " + fmt(left) : "듣기" };
  }
  if (state.mode === "main" || state.mode === "fading") return { id: "stop-main", label: "정지" };
  if (state.mode === "aggro") return { id: "stop", label: "정지" };
  if (state.mode === "echo" && gate(pin) !== "near") return { id: "stop", label: "정지" };
  const g = gate(pin);
  if (g === "near") {
    const r = state.resume[keyOf(pin.id, state.phase)];
    return { id: "main", label: r ? "이어서 듣기 · " + fmt(r) : "듣기" };
  }
  if (g === "echo") return { id: "echo", label: "잔향 30초" };
  return { id: "aggro", label: "8초" };
}
function onAction() {
  const pin = currentPin();
  const spec = actionSpec(pin);
  if (spec.id === "echo" && !inside(pin)) {
    showTab("keeps");
    return;
  }
  if (spec.id === "stop-main") userStop();
  else if (spec.id === "stop") quietStop();
  else if (spec.id === "main") playMain();
  else if (spec.id === "echo") playEcho(state.pinId);
  else if (spec.id === "aggro") playAggro();
  render();
}

function actionFace(spec) {
  if (spec.id === "echo") return "잔향 30초";
  if (spec.id === "aggro") return "8초";
  if (spec.id === "stop" || spec.id === "stop-main") return "정지";
  return spec.label;
}
function storySpan(pin, spec) {
  const playingMain = state.mode === "main" || state.mode === "fading";
  if (state.mode === "echo" || spec.id === "echo") {
    return { t: state.mode === "echo" ? state.playT : 0, total: AFTERGLOW_SEC };
  }
  if (state.mode === "aggro" || spec.id === "aggro") {
    return { t: state.mode === "aggro" ? state.playT : 0, total: AGGRO_SEC };
  }
  const total = pieceOf(pin).duration_sec || AFTERGLOW_SEC;
  const saved = state.resume[keyOf(pin.id, state.phase)] || 0;
  return { t: playingMain ? state.playT : saved, total: total };
}
function paintStory(pin, spec) {
  const action = document.getElementById("action");
  const fill = document.getElementById("story-fill");
  const time = document.getElementById("story-time");
  const totalEl = document.getElementById("story-total");
  if (!action) return;
  const echoAway = spec.id === "echo" && !inside(pin);
  const stopping = spec.id === "stop" || spec.id === "stop-main";
  let face = "재생";
  if (stopping) face = "정지";
  else if (echoAway) face = "서랍";
  else if (spec.id === "aggro") face = "8초";
  action.textContent = face;
  action.dataset.kind = echoAway ? "drawer" : (stopping ? "stop" : spec.id);
  action.setAttribute("aria-label", echoAway ? "서랍" : (stopping ? "정지" : actionFace(spec)));
  const title = document.getElementById("story-title");
  if (title) title.textContent = "";
  const span = storySpan(pin, spec);
  const ratio = span.total ? Math.max(0, Math.min(1, span.t / span.total)) : 0;
  if (fill) fill.style.width = (ratio * 100) + "%";
  if (time) time.textContent = echoAway ? "" : fmt(span.t);
  if (totalEl) totalEl.textContent = echoAway ? "" : fmt(span.total);
}
function shownAlias(pin) {
  return inside(pin) ? pin.alias : "";
}
function cWindow(pin) {
  if (state.mode !== "main" || !inside(pin)) return false;
  const slot = pieceOf(pin).C;
  const enter = slot.enter_at_sec;
  const span = slot.preview_sec || 20;
  return state.playT >= enter && state.playT < enter + span;
}
function showScript(pin) {
  if (state.mode === "main" || state.mode === "fading") return true;
  const g = gate(pin);
  return g === "near" || g === "echo";
}
function captionFor(pin) {
  if (state.mode === "aggro") return workOf(pin).aggro;
  if (state.mode === "echo") return state.playT < 8 ? workOf(pin).afterglow : "……";
  if (state.mode === "main" || state.mode === "fading") {
    const line = lineAt(pin, state.phase, state.playT);
    return line ? line.text : "……";
  }
  if (gate(pin) === "aggro") return workOf(pin).aggro;
  if (gate(pin) === "echo") return workOf(pin).afterglow;
  return "";
}
function gateNote(pin) {
  const g = gate(pin);
  if (state.mode === "fading") {
    if (inside(pin)) return "다시 반경 안 · 이어서 듣기.";
    return "반경 밖 · 4초 페이드. 다시 들어오면 그 초부터.";
  }
  if (g === "aggro") return "반경 밖 · 8초만. 작품 버튼 없음.";
  if (g === "near") return "반경 안 · 듣기를 눌러야 작품이 열린다.";
  return "방문한 뒤 · 멀리에서는 잔향 30초만.";
}

let stamp = "";
let vaultStamp = "";
let scriptOpen = false;
let scriptFor = "";
const shelf = { bedOn: false, bedFade: 0 };

function haltReel() {
  const video = document.getElementById("reel");
  if (!video) return;
  try { video.pause(); } catch (e) {}
  video.style.opacity = "1";
}
function releaseBed() {
  shelf.bedOn = false;
  shelf.bedFade = 0;
  const bed = document.getElementById("bed-audio");
  if (!bed) return;
  try { bed.pause(); } catch (e) {}
}
function syncSetMedia() {
  const pin = currentPin();
  const video = document.getElementById("reel");
  const bed = document.getElementById("bed-audio");
  const fading = state.mode === "fading";
  const elapsed = fading ? (performance.now() - state.fadeStart) / 1000 : 0;
  const level = fading ? fadeLevel(elapsed) : 1;
  if (video) {
    try { video.volume = Math.max(0, Math.min(1, level)); } catch (e) {}
    if (fading || state.mode === "main") video.style.opacity = String(0.35 + 0.65 * Math.max(0, level));
    if (!inside(pin) && !fading && state.mode !== "main" && !video.paused) video.pause();
  }
  if (!bed || !shelf.bedOn) return;
  if (!inside(pin) || fading) {
    if (!shelf.bedFade) shelf.bedFade = performance.now();
    const t = (performance.now() - shelf.bedFade) / 1000;
    try { bed.volume = Math.max(0, fadeLevel(t)); } catch (e) {}
    if (t >= 4) releaseBed();
  } else {
    shelf.bedFade = 0;
    try { bed.volume = state.mode === "main" ? 0.18 : 0.62; } catch (e) {}
  }
}
const SPACE_URL = "/janhyang/spaces.json";
const firebaseConfig = {
  apiKey: "AIzaSyBB-Z7d8k0HReUYMnBZ6w5tTQfW3fVSjmw",
  authDomain: "gen-lang-client-0073378158.firebaseapp.com",
  projectId: "gen-lang-client-0073378158",
  storageBucket: "gen-lang-client-0073378158.firebasestorage.app",
  messagingSenderId: "906283005279",
  appId: "1:906283005279:web:2143f4edbd68e3015cf2ea"
};
const NOTES_KEY = "janhyang-notes";
const spaceById = {};
const spacePending = {};
const studioPins = [];
let spaceIndex = null;
let firebaseDb = null;
let catalogSpaces = null;
let catalogWatch = null;
let activeTab = "map";
let workPane = "rehearsal";
let draftLL = null;

function firestoreDb() {
  if (!firebaseDb) {
    firebaseDb = Promise.all([
      import("https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js")
    ]).then(([appMod, fsMod]) => {
      const existing = appMod.getApps();
      const app = existing.length ? existing[0] : appMod.initializeApp(firebaseConfig);
      return { db: fsMod.getFirestore(app, "janhyang"), fs: fsMod };
    });
  }
  return firebaseDb;
}
function loadLocalSpaces() {
  return fetch(SPACE_URL).then((res) => res.json()).catch(() => ({ spaces: [] }));
}
function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("firestore-timeout")), ms);
    promise.then((value) => {
      clearTimeout(timer);
      resolve(value);
    }, (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}
function loadSpaceIndex() {
  if (!spaceIndex) {
    const remote = firestoreDb().then(({ db, fs }) => {
      return fs.getDoc(fs.doc(db, "spaces", "catalog")).then((snap) => {
        const data = snap.exists() ? snap.data() : null;
        if (data && Array.isArray(data.spaces) && data.spaces.length) return data;
        return fs.getDocs(fs.collection(db, "spaces")).then((q) => {
          const spaces = [];
          q.forEach((row) => {
            if (row.id === "catalog") return;
            const item = row.data() || {};
            if (!item.pin_id) item.pin_id = row.id;
            if (item.feed || item.name || item.spatial_sound) spaces.push(item);
          });
          return spaces.length ? { spaces: spaces } : loadLocalSpaces();
        });
      });
    });
    spaceIndex = withTimeout(remote, 2500).catch(() => loadLocalSpaces());
    remote.then((data) => {
      if (!data || !Array.isArray(data.spaces) || !data.spaces.length) return;
      spaceIndex = Promise.resolve(data);
      Object.keys(spaceById).forEach((id) => { delete spaceById[id]; });
      Object.keys(spacePending).forEach((id) => { delete spacePending[id]; });
      if (document.getElementById("setlist")) paintSetlist();
    }).catch(() => {});
  }
  return spaceIndex;
}
function readNotes() {
  try {
    const raw = JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
    return raw && typeof raw === "object" ? raw : {};
  } catch (e) {
    return {};
  }
}
function readNote(pinId) {
  const text = readNotes()[pinId];
  return typeof text === "string" ? text : "";
}
function writeNote(pinId, text) {
  const all = readNotes();
  const next = text.trim();
  if (next) all[pinId] = next.slice(0, 80);
  else delete all[pinId];
  localStorage.setItem(NOTES_KEY, JSON.stringify(all));
  vaultStamp = "";
}
function fallbackSpace(pin) {
  return {
    pin_id: pin.id,
    name: pin.alias,
    alias: pin.alias,
    spatial_sound: {},
    feed: [{
      id: pin.id + "-note",
      type: "field_note",
      author: "잔향 에디터",
      text: pin.find_hint || "이 골목의 노트는 아직 비어 있다."
    }]
  };
}
function fetchSpaceData(pinId) {
  if (spaceById[pinId]) return Promise.resolve(spaceById[pinId]);
  if (spacePending[pinId]) return spacePending[pinId];
  spacePending[pinId] = loadSpaceIndex().then((data) => {
    const list = (data && data.spaces) || [];
    const found = list.find((s) => s && s.pin_id === pinId);
    const space = found || fallbackSpace(pinById(pinId));
    space.feed = (space.feed || []).slice(0, 8);
    spaceById[pinId] = space;
    return space;
  });
  return spacePending[pinId];
}
function ensureSpace(pinId) {
  if (spaceById[pinId]) return;
  const job = fetchSpaceData(pinId);
  if (job.wired) return;
  job.wired = true;
  job.then(() => {
    if (currentPin().id !== pinId) return;
    const rest = document.getElementById("feed-rest");
    if (rest) rest.dataset.sig = "";
    paintSetlist();
  }).catch(() => {});
}
function studioStatus(text) {
  const el = document.getElementById("studio-status");
  if (el) el.textContent = text || "";
}
function makeStudioPin(space, lat, lng) {
  const id = space.pin_id;
  const blank = { enter_at_sec: 12, preview_sec: 8, bed_db: -18, youtube_query: "" };
  const piece = { hours: "07:00-17:30", duration_sec: 30, A: "", B: [], C: blank };
  return {
    id: id,
    alias: space.alias || space.name || id,
    lat: lat,
    lng: lng,
    radius: Number(space.radius) || 40,
    zone: "스튜디오",
    place_type: "공간",
    landmark_quota: false,
    status: "STUDIO",
    find_hint: space.name || "",
    safety: "",
    works: [{
      id: "W-" + String(id).replace("-", "") + "-01",
      kind: "audio",
      creator: "스튜디오",
      aggro: space.name || "이 자리.",
      afterglow: space.alias || space.name || "이 자리.",
      body_day: piece,
      body_night: { hours: "17:30-23:00", duration_sec: 30, A: "", B: [], C: Object.assign({}, blank) }
    }]
  };
}
function adoptCatalog(spaces) {
  const seen = {};
  catalogSpaces = [];
  (spaces || []).forEach((space) => {
    if (!space || !space.pin_id || seen[space.pin_id]) return;
    seen[space.pin_id] = true;
    catalogSpaces.push(Object.assign({}, space));
  });
  spaceIndex = Promise.resolve({ spaces: catalogSpaces });
  Object.keys(spaceById).forEach((id) => { delete spaceById[id]; });
  Object.keys(spacePending).forEach((id) => { delete spacePending[id]; });
  catalogSpaces.forEach((space) => {
    if (!space || !space.pin_id) return;
    const copy = Object.assign({}, space);
    copy.feed = (copy.feed || []).slice(0, 8);
    spaceById[space.pin_id] = copy;
  });
  studioPins.length = 0;
  catalogSpaces.forEach((space) => {
    if (!space || !space.pin_id || DATA.pins.some((p) => p.id === space.pin_id)) return;
    const lat = Number(space.lat);
    const lng = Number(space.lng);
    if (!isFinite(lat) || !isFinite(lng)) return;
    studioPins.push(makeStudioPin(space, lat, lng));
  });
  syncStudioMarkers();
  const rest = document.getElementById("feed-rest");
  if (rest) rest.dataset.sig = "";
  if (document.getElementById("setlist")) paintSetlist();
  if (activeTab === "work" && workPane === "studio") paintStudio();
}
function watchCatalog() {
  if (catalogWatch) return;
  catalogWatch = firestoreDb().then(({ db, fs }) => {
    catalogWatch = fs.onSnapshot(fs.doc(db, "spaces", "catalog"), (snap) => {
      const data = snap.exists() ? snap.data() : { spaces: [] };
      if (data && Array.isArray(data.spaces)) adoptCatalog(data.spaces);
    }, () => { catalogWatch = null; });
  }).catch(() => { catalogWatch = null; });
}
function commitSpaces(mutator) {
  return firestoreDb().then(({ db, fs }) => {
    const ref = fs.doc(db, "spaces", "catalog");
    return fs.getDoc(ref).then((snap) => {
      const current = snap.exists() && Array.isArray(snap.data().spaces) ? snap.data().spaces.slice() : (catalogSpaces || []).slice();
      const next = mutator(current);
      const write = snap.exists() ? fs.updateDoc(ref, { spaces: next }) : fs.setDoc(ref, { spaces: next });
      return write.then(() => adoptCatalog(next));
    });
  });
}
function nextPinId() {
  let n = 1;
  DATA.pins.forEach((p) => {
    const m = /SS-(\d+)/.exec(p.id);
    if (m) n = Math.max(n, Number(m[1]) + 1);
  });
  (catalogSpaces || []).forEach((space) => {
    const m = /SS-(\d+)/.exec(space && space.pin_id);
    if (m) n = Math.max(n, Number(m[1]) + 1);
  });
  return "SS-" + String(n).padStart(2, "0");
}
function dropDraft(lat, lng) {
  draftLL = { lat: lat, lng: lng };
  if (!nmap.map || !window.naver) return;
  const ll = new naver.maps.LatLng(lat, lng);
  if (!nmap.draft) {
    nmap.draft = new naver.maps.Marker({
      position: ll,
      map: nmap.map,
      zIndex: 220,
      icon: pinIcon(true)
    });
  } else nmap.draft.setPosition(ll);
  const coord = document.getElementById("studio-coord");
  if (coord) coord.textContent = lat.toFixed(5) + ", " + lng.toFixed(5);
}
function syncStudioMarkers() {
  if (!nmap.map || !window.naver) return;
  nmap.markers = nmap.markers.filter((item) => {
    if (DATA.pins.some((p) => p.id === item.id) || studioPins.some((p) => p.id === item.id)) return true;
    item.marker.setMap(null);
    return false;
  });
  studioPins.forEach((p) => {
    if (nmap.markers.some((item) => item.id === p.id)) return;
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(p.lat, p.lng),
      map: nmap.map,
      title: "",
      icon: pinIcon(false),
      zIndex: 10
    });
    naver.maps.Event.addListener(marker, "click", () => {
      if (activeTab === "work" && workPane === "studio") {
        const sel = document.getElementById("studio-space");
        if (sel) { sel.value = p.id; paintStudioFeed(); paintStudioPreview(); }
        return;
      }
      if (p.id !== state.pinId) selectPin(p.id);
      state.sheetOpen = true;
      stamp = "";
      render();
    });
    nmap.markers.push({ id: p.id, marker: marker });
  });
}
function saveStudioPin(e) {
  e.preventDefault();
  if (!draftLL) { studioStatus("지도를 먼저 누르세요."); return; }
  const name = document.getElementById("studio-name").value.trim();
  const alias = document.getElementById("studio-alias").value.trim();
  const radius = Math.max(10, Math.min(200, Number(document.getElementById("studio-radius").value) || 40));
  if (!name || !alias) return;
  const space = {
    pin_id: nextPinId(),
    name: name,
    alias: alias,
    lat: draftLL.lat,
    lng: draftLL.lng,
    radius: radius,
    spatial_sound: {
      hook_audio_url: "",
      ambient_audio_url: "",
      voice_audio_url: "",
      music_bed: { audio_url: "", enter_at_sec: 12 },
      fog_visual_url: "",
      linger_audio_url: "",
      still_frame_url: ""
    },
    feed: []
  };
  studioStatus("저장 중");
  firestoreDb().then(({ db, fs }) => {
    const ref = fs.doc(db, "spaces", "catalog");
    const write = fs.updateDoc(ref, { spaces: fs.arrayUnion(space) }).catch(() => {
      return fs.getDoc(ref).then((snap) => {
        const current = snap.exists() && Array.isArray(snap.data().spaces) ? snap.data().spaces.slice() : [];
        return fs.setDoc(ref, { spaces: current.concat([space]) });
      });
    });
    return write.then(() => {
      adoptCatalog((catalogSpaces || []).concat([space]));
      const sel = document.getElementById("studio-space");
      if (sel) sel.value = space.pin_id;
      studioStatus(space.pin_id + " 저장됨");
    });
  }).catch((err) => studioStatus(err && err.message ? err.message : "저장 실패"));
}
function feedLabel(item) {
  if (!item) return "항목";
  if (item.type === "story") return item.title || "Story";
  if (item.type === "track_link" || item.type === "music") return item.title || "Music";
  return (item.text || "Note").slice(0, 28);
}
function paintStudioFeed() {
  const list = document.getElementById("studio-feed");
  const sel = document.getElementById("studio-space");
  if (!list || !sel) return;
  const pinId = sel.value;
  const space = (catalogSpaces || []).find((item) => item.pin_id === pinId) || spaceById[pinId];
  list.replaceChildren();
  const feed = space && space.feed ? space.feed : [];
  if (!feed.length) {
    const empty = document.createElement("p");
    empty.id = "studio-hint";
    empty.textContent = "아직 콘텐츠가 없습니다.";
    list.appendChild(empty);
    return;
  }
  feed.forEach((item) => {
    const row = document.createElement("div");
    row.className = "studio-row";
    const copy = document.createElement("div");
    const kind = document.createElement("span");
    kind.textContent = item.type === "field_note" || item.type === "note" ? "Note" : item.type === "track_link" || item.type === "music" ? "Music" : "Story";
    const title = document.createElement("b");
    title.textContent = feedLabel(item);
    copy.append(kind, title);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "삭제";
    btn.addEventListener("click", () => removeFeedItem(pinId, item.id));
    row.append(copy, btn);
    list.appendChild(row);
  });
}
function removeFeedItem(pinId, itemId) {
  studioStatus("삭제 중");
  commitSpaces((list) => list.map((space) => {
    if (!space || space.pin_id !== pinId) return space;
    return Object.assign({}, space, { feed: (space.feed || []).filter((item) => item.id !== itemId) });
  })).then(() => studioStatus("삭제됨")).catch((err) => studioStatus(err && err.message ? err.message : "삭제 실패"));
}
function paintStudioFields() {
  const type = document.getElementById("studio-type");
  const box = document.getElementById("studio-fields");
  if (!type || !box) return;
  const kind = type.value;
  box.replaceChildren();
  const add = (id, label, placeholder) => {
    const wrap = document.createElement("label");
    wrap.append(document.createTextNode(label + " "));
    const input = document.createElement("input");
    input.id = id;
    input.maxLength = 160;
    input.placeholder = placeholder || "";
    wrap.appendChild(input);
    box.appendChild(wrap);
  };
  if (kind === "story") {
    add("studio-title", "제목", "제목");
    add("studio-audio", "오디오 URL", "https://");
  } else if (kind === "music") {
    add("studio-title", "곡명");
    add("studio-artist", "아티스트");
    add("studio-note", "코멘트");
    add("studio-url", "YouTube URL", "https://");
  } else {
    add("studio-text", "글귀");
    add("studio-author", "작성자", "잔향 에디터");
  }
}
function paintStudioPreview() {
  const here = document.getElementById("preview-here");
  const home = document.getElementById("preview-home");
  const script = document.getElementById("manuscript-body");
  const sel = document.getElementById("studio-space");
  if (!here || !home) return;
  const pin = pinById(sel && sel.value ? sel.value : state.pinId);
  const space = spaceById[pin.id];
  here.replaceChildren();
  const h = document.createElement("h3");
  h.textContent = pin.alias;
  const line = document.createElement("p");
  line.textContent = workOf(pin).afterglow;
  here.append(h, line);
  ((space && space.feed) || []).slice(0, 3).forEach((item) => {
    const p = document.createElement("p");
    p.textContent = feedLabel(item);
    here.appendChild(p);
  });
  home.replaceChildren();
  const away = document.createElement("p");
  away.textContent = "이 자리에서만 재생됩니다";
  home.appendChild(away);
  if (!script) return;
  script.replaceChildren();
  pieceOf(pin, "day").B.forEach((row) => {
    const p = document.createElement("p");
    p.textContent = fmt(row.start) + "  " + row.text;
    script.appendChild(p);
  });
}
function paintStudio() {
  const sel = document.getElementById("studio-space");
  if (!sel) return;
  const prev = sel.value || state.pinId;
  const options = [];
  DATA.pins.forEach((p) => options.push({ id: p.id, label: p.id + "  " + p.alias }));
  studioPins.forEach((p) => { if (!options.some((o) => o.id === p.id)) options.push({ id: p.id, label: p.id + "  " + p.alias }); });
  (catalogSpaces || []).forEach((space) => {
    if (!space || !space.pin_id || options.some((o) => o.id === space.pin_id)) return;
    options.push({ id: space.pin_id, label: space.pin_id + "  " + (space.alias || space.name || "") });
  });
  sel.replaceChildren();
  options.forEach((o) => {
    const opt = document.createElement("option");
    opt.value = o.id;
    opt.textContent = o.label;
    sel.appendChild(opt);
  });
  if ([...sel.options].some((o) => o.value === prev)) sel.value = prev;
  paintStudioFeed();
  paintStudioPreview();
  if (!document.getElementById("studio-fields").childElementCount) paintStudioFields();
}
function addStudioFeed(e) {
  e.preventDefault();
  const sel = document.getElementById("studio-space");
  const type = document.getElementById("studio-type");
  if (!sel || !type || !sel.value) return;
  const pinId = sel.value;
  const id = "c" + Date.now();
  let item = null;
  if (type.value === "story") {
    item = { id: id, type: "story", title: document.getElementById("studio-title").value.trim() || "잔향 30초", audio_url: document.getElementById("studio-audio").value.trim(), duration_sec: 30 };
  } else if (type.value === "music") {
    item = {
      id: id,
      type: "track_link",
      title: document.getElementById("studio-title").value.trim(),
      artist: document.getElementById("studio-artist").value.trim(),
      note: document.getElementById("studio-note").value.trim(),
      platform: "youtube",
      url: document.getElementById("studio-url").value.trim(),
      curator: "스튜디오"
    };
  } else {
    item = { id: id, type: "field_note", author: document.getElementById("studio-author").value.trim() || "잔향 에디터", text: document.getElementById("studio-text").value.trim() };
  }
  if (item.type === "field_note" && !item.text) { studioStatus("내용을 입력하세요."); return; }
  if (item.type === "track_link" && !item.title) { studioStatus("내용을 입력하세요."); return; }
  studioStatus("등록 중");
  const known = (catalogSpaces || []).some((space) => space.pin_id === pinId);
  const ensure = known ? Promise.resolve() : commitSpaces((list) => {
    if (list.some((space) => space.pin_id === pinId)) return list;
    const pin = pinById(pinId);
    return list.concat([{ pin_id: pinId, name: pin.alias, alias: pin.alias, spatial_sound: {}, feed: [] }]);
  });
  ensure.then(() => commitSpaces((list) => {
    if (!list.some((space) => space.pin_id === pinId)) {
      const pin = pinById(pinId);
      list = list.concat([{ pin_id: pinId, name: pin.alias, alias: pin.alias, spatial_sound: {}, feed: [] }]);
    }
    return list.map((space) => {
      if (!space || space.pin_id !== pinId) return space;
      return Object.assign({}, space, { feed: (space.feed || []).concat([item]) });
    });
  })).then(() => {
    studioStatus("등록됨");
    paintStudioFields();
  }).catch((err) => studioStatus(err && err.message ? err.message : "등록 실패"));
}
function fillWhisper(pinId) {
  const form = document.getElementById("whisper");
  const input = document.getElementById("whisper-input");
  if (!form || !input) return;
  if (form.dataset.pin === pinId) return;
  form.dataset.pin = pinId;
  input.value = readNote(pinId);
}
function feedBadge(label) {
  const badge = document.createElement("p");
  badge.className = "badge";
  badge.textContent = label;
  return badge;
}
function paintFeedItem(item) {
  if (!item) return null;
  const type = item.type === "note" ? "field_note" : item.type === "music" ? "track_link" : item.type;
  if (type === "story") {
    const card = document.createElement("article");
    card.className = "feed-note";
    const title = document.createElement("h3");
    title.textContent = item.title || "잔향";
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.preload = "none";
    if (item.audio_url) audio.src = item.audio_url;
    card.append(feedBadge("Story"), title, audio);
    return card;
  }
  if (type === "field_note") {
    const note = document.createElement("article");
    note.className = "feed-note";
    const who = document.createElement("p");
    who.className = "feed-kicker";
    who.textContent = item.author || "현장 노트";
    const text = document.createElement("p");
    text.textContent = item.text || "";
    note.append(feedBadge("Note"), who, text);
    return note;
  }
  const card = document.createElement("article");
  card.className = "feed-track";
  const row = document.createElement("div");
  row.className = "track-row";
  const copy = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = item.title || "이름 없는 트랙";
  const who = document.createElement("p");
  who.className = "who";
  who.textContent = item.artist || "";
  copy.append(title, who);
  row.append(copy);
  card.append(feedBadge("Music"), row);
  if (item.note) {
    const note = document.createElement("p");
    note.className = "note";
    note.textContent = item.note;
    card.appendChild(note);
  }
  return card;
}
function paintSetlist() {
  const root = document.getElementById("setlist");
  const rest = document.getElementById("feed-rest");
  if (!root || !rest) return;
  const pin = currentPin();
  if (!spaceById[pin.id]) ensureSpace(pin.id);
  const show = inside(pin);
  root.hidden = !show;
  fillWhisper(pin.id);
  if (!show) {
    const place = document.getElementById("place");
    const dek = document.getElementById("dek");
    if (place) place.hidden = true;
    if (dek) dek.textContent = "";
    return;
  }
  if (!spaceById[pin.id]) {
    ensureSpace(pin.id);
    if (rest.dataset.sig !== pin.id + "|wait") {
      rest.dataset.sig = pin.id + "|wait";
      rest.replaceChildren();
      const wait = document.createElement("p");
      wait.className = "feed-wait";
      wait.textContent = "피드를 불러오는 중";
      rest.appendChild(wait);
    }
    return;
  }
  const space = spaceById[pin.id];
  const feed = (space.feed || []).slice(0, 8);
  const lead = feed.find((item) => item.type === "field_note" || item.type === "note");
  const items = feed.filter((item) => item !== lead);
  const sig = pin.id + "|" + (space.alias || "") + "|" + (lead ? lead.id : "") + "|" + items.map((item) => item.id).join(",");
  const place = document.getElementById("place");
  const dek = document.getElementById("dek");
  if (place) {
    const alias = space.alias && space.alias !== pin.alias ? space.alias : "";
    place.textContent = alias;
    place.hidden = !alias;
  }
  if (dek) dek.textContent = lead && lead.text ? lead.text : "";
  if (rest.dataset.sig === sig) return;
  rest.dataset.sig = sig;
  rest.replaceChildren();
  items.forEach((item) => {
    const node = paintFeedItem(item);
    if (node) rest.appendChild(node);
  });
}
function onSetlistClick(e) {
  const btn = e.target.closest("button");
  if (!btn || !btn.dataset.set) return;
  const pin = currentPin();
  if (!inside(pin)) return;
  if (btn.dataset.set === "bed") {
    const bed = document.getElementById("bed-audio");
    if (!bed) return;
    if (shelf.bedOn) releaseBed();
    else {
      shelf.bedOn = true;
      shelf.bedFade = 0;
      bed.volume = state.mode === "main" ? 0.18 : 0.62;
      const started = bed.play();
      if (started && started.catch) started.catch(() => {});
    }
  } else {
    const video = document.getElementById("reel");
    if (!video) return;
    if ((state.mode === "main" || state.mode === "fading") && !video.paused) {
      userStop();
      return;
    }
    playMain();
    if (state.mode !== "main") return;
    try { video.currentTime = 0; video.volume = 1; } catch (err) {}
    const started = video.play();
    if (started && started.catch) started.catch(() => {});
  }
  render();
}
function fmtDay(iso) {
  if (!iso) return "방문함";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "방문함";
  return d.getFullYear() + "." + String(d.getMonth() + 1).padStart(2, "0") + "." + String(d.getDate()).padStart(2, "0");
}
function showTab(tab) {
  const vault = document.getElementById("vault");
  const work = document.getElementById("work");
  const dock = document.getElementById("dock");
  if (!vault) return;
  activeTab = tab === "keeps" || tab === "work" ? tab : "map";
  vault.hidden = activeTab !== "keeps";
  if (work) work.hidden = activeTab !== "work";
  if (dock) dock.hidden = activeTab !== "map";
  document.querySelectorAll("#tabs button").forEach((b) => {
    b.setAttribute("aria-selected", b.dataset.tab === activeTab ? "true" : "false");
  });
  if (activeTab === "keeps") {
    vaultStamp = "";
    paintVault();
  }
  if (activeTab === "work") showWork(workPane);
  if (activeTab === "map") {
    const rest = document.getElementById("feed-rest");
    if (rest) rest.dataset.sig = "";
    paintSetlist();
  }
}
function showWork(pane) {
  workPane = pane === "studio" ? "studio" : "rehearsal";
  const rehearsal = document.getElementById("rehearsal");
  const studio = document.getElementById("studio");
  if (rehearsal) rehearsal.hidden = workPane !== "rehearsal";
  if (studio) studio.hidden = workPane !== "studio";
  const a = document.getElementById("work-rehearsal");
  const b = document.getElementById("work-studio");
  if (a) a.setAttribute("aria-selected", workPane === "rehearsal" ? "true" : "false");
  if (b) b.setAttribute("aria-selected", workPane === "studio" ? "true" : "false");
  if (workPane === "studio") paintStudio();
}
function paintVaultCard(pin, keep, playing) {
  const card = document.createElement("article");
  card.className = "keep";
  const copy = document.createElement("div");
  const h = document.createElement("h2");
  h.textContent = workOf(pin).afterglow;
  const when = document.createElement("p");
  when.textContent = fmtDay(keep && keep.at);
  copy.append(h, when);
  if (readNote(pin.id)) {
    const memo = document.createElement("p");
    memo.textContent = "한 줄 남김";
    copy.appendChild(memo);
  }
  const btn = document.createElement("button");
  btn.type = "button";
  btn.dataset.echo = pin.id;
  const on = playing === pin.id;
  btn.textContent = on ? "정지" : "30초";
  btn.setAttribute("aria-pressed", on ? "true" : "false");
  card.append(copy, btn);
  return card;
}
function paintVault() {
  const vault = document.getElementById("vault");
  if (!vault || vault.hidden) return;
  const count = document.getElementById("vault-count");
  const list = document.getElementById("vault-list");
  if (!count || !list) return;
  const byId = {};
  (state.keeps || []).forEach((k) => { if (!byId[k.pinId]) byId[k.pinId] = k; });
  const playing = state.mode === "echo" ? state.pinId : "";
  const real = [];
  const rehearsal = [];
  state.visited.forEach((id) => {
    const pin = DATA.pins.find((p) => p.id === id);
    if (!pin) return;
    const keep = byId[id];
    if (keep && keep.rehearsal) rehearsal.push(pin);
    else real.push(pin);
  });
  const sig = real.map((p) => p.id).join(",") + "|" + rehearsal.map((p) => p.id).join(",") + "|" + playing;
  if (sig === vaultStamp && list.childElementCount) return;
  vaultStamp = sig;
  list.replaceChildren();
  count.textContent = real.length || rehearsal.length ? "" : "아직 없어요";
  real.forEach((p) => list.appendChild(paintVaultCard(p, byId[p.id], playing)));
  if (rehearsal.length) {
    const label = document.createElement("p");
    label.className = "keep-label";
    label.textContent = "리허설";
    list.appendChild(label);
    rehearsal.forEach((p) => list.appendChild(paintVaultCard(p, byId[p.id], playing)));
  }
}
function clockPhase() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  return mins >= 7 * 60 && mins < 17 * 60 + 30 ? "day" : "night";
}
function bandOf(pin) {
  if (inside(pin)) return "in";
  const d = distanceToPin(pin);
  if (!isFinite(d)) return "far";
  if (d <= pin.radius + 70) return "edge";
  return "far";
}
function approachWord(pin) {
  const here = listenerPos();
  if (!here) return "여기서만";
  const dLng = (pin.lng - here.lng) * Math.cos(here.lat * Math.PI / 180);
  const dLat = pin.lat - here.lat;
  const ang = Math.atan2(dLng, dLat) * 180 / Math.PI;
  const dirs = ["북쪽", "북동쪽", "동쪽", "남동쪽", "남쪽", "남서쪽", "서쪽", "북서쪽"];
  const i = Math.round((((ang % 360) + 360) % 360) / 45) % 8;
  return dirs[i];
}
function render() {
  const pin = currentPin();
  const spec = actionSpec(pin);
  const band = bandOf(pin);
  const insideNow = inside(pin);
  if (state.wasInside === false && insideNow) {
    try { if (navigator.vibrate) navigator.vibrate(12); } catch (e) {}
  }
  state.wasInside = insideNow;
  const aliasEl = document.getElementById("alias");
  aliasEl.textContent = shownAlias(pin);
  aliasEl.hidden = !insideNow;
  const metaEl = document.getElementById("meta");
  metaEl.hidden = true;
  metaEl.textContent = "";
  const loc = document.getElementById("loc-line");
  const distEl = document.getElementById("dist");
  if (insideNow) {
    loc.textContent = "";
    loc.hidden = true;
    distEl.textContent = "";
  } else {
    loc.hidden = false;
    loc.textContent = approachWord(pin);
    distEl.textContent = band === "far" ? "여기서만 열려요" : "";
  }
  const playing = state.mode === "main" || state.mode === "fading" || state.mode === "echo" || state.mode === "aggro";
  const cap = workOf(pin).kind === "audio" ? captionFor(pin) : "";
  document.getElementById("live").textContent = playing ? cap : "";
  document.getElementById("caption").textContent = cap;
  paintStory(pin, spec);
  const gateEl = document.getElementById("gate-note");
  gateEl.textContent = gateNote(pin);
  gateEl.hidden = true;
  const hintEl = document.getElementById("hint");
  const safetyEl = document.getElementById("safety");
  if (hintEl) { hintEl.hidden = true; hintEl.textContent = ""; }
  safetyEl.hidden = !insideNow || !pin.safety;
  safetyEl.textContent = insideNow ? (pin.safety || "") : "";
  const share = document.getElementById("share");
  if (share) share.hidden = !insideNow;
  const scriptBtn = document.getElementById("script-toggle");
  if (scriptBtn) scriptBtn.hidden = true;
  const more = document.getElementById("more");
  if (more) more.hidden = true;
  const yt = document.getElementById("yt");
  if (yt) { yt.hidden = true; yt.removeAttribute("href"); yt.textContent = ""; }
  const dayBtn = document.getElementById("day");
  const nightBtn = document.getElementById("night");
  if (dayBtn) dayBtn.setAttribute("aria-pressed", state.phase === "day" ? "true" : "false");
  if (nightBtn) nightBtn.setAttribute("aria-pressed", state.phase === "night" ? "true" : "false");
  const gpsOn = state.useGps;
  ["far", "near", "leave"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.disabled = gpsOn;
  });
  const slider = document.getElementById("slider");
  if (slider) slider.disabled = gpsOn;
  const meters = document.getElementById("meters");
  if (meters) meters.textContent = Math.round(state.distanceM) + "m";
  if (slider && !state.sliding && document.activeElement !== slider) slider.value = String(Math.round(state.distanceM));
  const here = LocationSource.kind === "gps" ? (state.gpsFix ? "GPS" : "GPS 대기") : "시뮬";
  const hours = pieceOf(pin).hours;
  const d = distanceToPin(pin);
  const readout = document.getElementById("readout");
  if (readout) {
    readout.textContent =
      pin.id + " · " + pin.status + " · " + (state.phase === "night" ? "밤 " : "낮 ") + hours +
      " · " + here + " · " + (isFinite(d) ? Math.round(d) + "m" : "—") +
      " / " + pin.radius + "m · " + gate(pin) + " · " + state.mode +
      (state.mode === "idle" ? "" : " · " + fmt(state.playT)) +
      (state.gpsNote ? " · " + state.gpsNote : "");
  }
  const now = document.getElementById("now");
  if (now) now.hidden = true;
  const flag = document.getElementById("rehearsal-flag");
  if (flag) flag.hidden = !state.rehearsalArmed;
  paintVault();
  paintSetlist();
  if (!insideNow) {
    const dek = document.getElementById("dek");
    if (dek) dek.textContent = band === "edge" ? workOf(pin).aggro : "";
  }
  const whisper = document.getElementById("whisper");
  if (whisper) whisper.hidden = !insideNow;
  syncSetMedia();
  const chips = document.getElementById("chips");
  if (chips && chips.childElementCount) chips.replaceChildren();
  const dock = document.getElementById("dock");
  if (dock && activeTab === "map") dock.hidden = false;
  if (dock) {
    dock.classList.toggle("open", !!state.sheetOpen || band === "in");
    dock.classList.toggle("near", insideNow);
    dock.classList.toggle("playing", playing);
    dock.classList.remove("band-far", "band-edge", "band-in");
    dock.classList.add("band-" + band);
  }
  const grip = document.getElementById("grip");
  if (grip) grip.setAttribute("aria-expanded", state.sheetOpen ? "true" : "false");
}

function mercX(lng) { return (lng + 180) / 360; }
function mercY(lat) {
  const s = Math.sin(lat * Math.PI / 180);
  return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
}
const VIEW = {
  x0: mercX(BOUNDS.minLng),
  x1: mercX(BOUNDS.maxLng),
  y0: mercY(BOUNDS.maxLat),
  y1: mercY(BOUNDS.minLat)
};
function project(lat, lng) {
  const x = (mercX(lng) - VIEW.x0) / (VIEW.x1 - VIEW.x0) * view.w;
  const y = (mercY(lat) - VIEW.y0) / (VIEW.y1 - VIEW.y0) * view.h;
  return [x, y];
}
function unproject(px, py) {
  const mx = VIEW.x0 + (px / Math.max(1, view.w)) * (VIEW.x1 - VIEW.x0);
  const my = VIEW.y0 + (py / Math.max(1, view.h)) * (VIEW.y1 - VIEW.y0);
  const lng = mx * 360 - 180;
  const lat = (180 / Math.PI) * Math.atan(Math.sinh(Math.PI * (1 - 2 * my)));
  return { lat: lat, lng: lng };
}
const nmap = { map: null, rings: [], markers: [], stamp: "", focus: "", w: 0, h: 0, wait: 0 };
function pinIcon(on) {
  const size = on ? 12 : 8;
  const color = on ? "#141414" : "#b9b9b2";
  return {
    content: '<div style="width:' + size + 'px;height:' + size + 'px;margin-left:-' + (size / 2) + 'px;margin-top:-' + (size / 2) + 'px;border-radius:50%;background:' + color + ';box-shadow:0 0 0 2px #fff"></div>',
    anchor: new naver.maps.Point(0, 0)
  };
}
function bootNaver() {
  if (nmap.map || nmap.failed) return !!nmap.map;
  if (!window.naver || !window.naver.maps) return false;
  const el = document.getElementById("map");
  if (!el) return false;
  try {
  nmap.map = new naver.maps.Map(el, {
    center: new naver.maps.LatLng(37.54458, 127.05602),
    zoom: 16,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    mapDataControl: false,
    logoControl: true,
    logoControlOptions: { position: naver.maps.Position.BOTTOM_LEFT }
  });
  DATA.pins.forEach((p) => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(p.lat, p.lng),
      map: nmap.map,
      title: "",
      icon: pinIcon(p.id === state.pinId),
      zIndex: p.id === state.pinId ? 80 : 10
    });
    naver.maps.Event.addListener(marker, "click", () => {
      if (activeTab === "work" && workPane === "studio") {
        const sel = document.getElementById("studio-space");
        if (sel) { sel.value = p.id; paintStudioFeed(); paintStudioPreview(); }
        return;
      }
      if (p.id !== state.pinId) selectPin(p.id);
      state.sheetOpen = true;
      stamp = "";
      render();
    });
    nmap.markers.push({ id: p.id, marker: marker });
  });
  const here = listenerPos() || simPos(currentPin());
  const center = new naver.maps.LatLng(here.lat, here.lng);
  nmap.rings = [new naver.maps.Circle({
    map: nmap.map,
    center: center,
    radius: currentPin().radius || 40,
    strokeWeight: 1.5,
    strokeColor: "#141414",
    strokeOpacity: 0.85,
    fillColor: "#141414",
    fillOpacity: 0.08,
    clickable: false
  })];
  nmap.focus = state.pinId;
  const badge = document.getElementById("badge");
  if (badge) badge.hidden = true;
  naver.maps.Event.addListener(nmap.map, "idle", () => { nmap.stamp = ""; });
  naver.maps.Event.addListener(nmap.map, "click", (e) => {
    if (activeTab !== "work" || workPane !== "studio" || !e.coord) return;
    dropDraft(e.coord.lat(), e.coord.lng());
  });
  syncStudioMarkers();
  return true;
  } catch (e) {
    nmap.failed = true;
    return false;
  }
}
function placeMe(lat, lng) {
  const dot = document.getElementById("me-dot");
  if (!dot || !nmap.map) return;
  const proj = nmap.map.getProjection();
  if (!proj) { dot.style.display = "none"; return; }
  const ll = new naver.maps.LatLng(lat, lng);
  const offset = proj.fromCoordToOffset(ll);
  const origin = proj.fromCoordToOffset(nmap.map.getCenter());
  const size = nmap.map.getSize();
  dot.style.display = "block";
  dot.style.transform = "translate(" + (offset.x - origin.x + size.width / 2) + "px," + (offset.y - origin.y + size.height / 2) + "px)";
}
function drawMap() {
  try {
    const sketch = document.getElementById("sketch");
    const map = document.getElementById("map");
    if (state.tilesOn && bootNaver()) {
      if (sketch) sketch.hidden = true;
      if (map) map.style.display = "";
      drawNaver();
      return;
    }
    if (map) map.style.display = "none";
    drawFallback();
  } catch (e) {}
}
function drawFallback() {
  const canvas = document.getElementById("sketch");
  const main = document.querySelector("main");
  if (!canvas || !main) return;
  canvas.hidden = false;
  const map = document.getElementById("map");
  if (map) map.style.display = "none";
  const w = main.clientWidth || 1;
  const h = main.clientHeight || 1;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
  }
  view.w = w;
  view.h = h;
  const g = canvas.getContext("2d");
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  const night = document.body.classList.contains("night");
  g.fillStyle = night ? "#0e0e0d" : "#e7e7e2";
  g.fillRect(0, 0, w, h);
  drawSketch(g, w, h, night, state.tilesOn);
  drawPins(g, night);
}
function drawNaver() {
  if (!bootNaver()) {
    if (!nmap.wait) {
      nmap.wait = setInterval(() => {
        if (bootNaver()) { clearInterval(nmap.wait); nmap.wait = 0; drawMap(); }
      }, 200);
      setTimeout(() => { if (nmap.wait) { clearInterval(nmap.wait); nmap.wait = 0; } }, 8000);
    }
    return;
  }
  const main = document.querySelector("main");
  const w = main ? main.clientWidth : 0;
  const h = main ? main.clientHeight : 0;
  if ((w && w !== nmap.w) || (h && h !== nmap.h)) {
    nmap.w = w;
    nmap.h = h;
    naver.maps.Event.trigger(nmap.map, "resize");
  }
  const pin = currentPin();
  const here = listenerPos() || simPos(pin);
  if (!here) return;
  const key = here.lat.toFixed(5) + "," + here.lng.toFixed(5) + "|" + pin.id + "|" + pin.radius;
  if (key !== nmap.stamp) {
    nmap.stamp = key;
    const ll = new naver.maps.LatLng(here.lat, here.lng);
    if (nmap.rings[0]) {
      nmap.rings[0].setCenter(ll);
      nmap.rings[0].setRadius(pin.radius || 40);
    }
    if (nmap.rings[1]) nmap.rings[1].setCenter(ll);
    nmap.markers.forEach((item) => {
      const on = item.id === pin.id;
      item.marker.setIcon(pinIcon(on));
      item.marker.setZIndex(on ? 80 : 10);
    });
    if (nmap.focus !== pin.id) {
      nmap.focus = pin.id;
      nmap.map.panTo(new naver.maps.LatLng(pin.lat, pin.lng));
    }
  }
  placeMe(here.lat, here.lng);
}
function tileNW(x, y, z) {
  const n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
  return {
    lat: (180 / Math.PI) * Math.atan(Math.sinh(n)),
    lng: x / Math.pow(2, z) * 360 - 180
  };
}
function drawSketch(g, w, h, night, tiled) {
  const ink = night ? "rgba(244, 244, 241, .72)" : "rgba(20, 20, 20, .55)";
  const wash = night ? "rgba(244, 244, 241, .05)" : "rgba(20, 20, 20, .04)";
  g.fillStyle = wash;
  const forest = project(37.5458, 127.0394);
  g.beginPath();
  g.ellipse(forest[0], forest[1], w * 0.11, h * 0.16, -0.2, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = night ? "rgba(244, 244, 241, .55)" : "rgba(20, 20, 20, .5)";
  g.lineWidth = tiled ? 6 : 14;
  g.lineCap = "round";
  g.beginPath();
  const stream = [[37.5524, 127.038], [37.5516, 127.046], [37.5506, 127.054], [37.5502, 127.060]];
  stream.forEach((p, i) => {
    const q = project(p[0], p[1]);
    if (i === 0) g.moveTo(q[0], q[1]);
    else g.lineTo(q[0], q[1]);
  });
  g.stroke();
  g.strokeStyle = ink;
  g.lineWidth = tiled ? 1.5 : 3;
  strokeRoad(g, [[37.5446, 127.040], [37.5442, 127.048], [37.5436, 127.056], [37.5434, 127.060]]);
  strokeRoad(g, [[37.5475, 127.0556], [37.5447, 127.0554], [37.5422, 127.0558]]);
  strokeRoad(g, [[37.5468, 127.0415], [37.5448, 127.043], [37.5432, 127.046]]);
  g.fillStyle = night ? "rgba(244, 244, 241, .7)" : "rgba(20, 20, 20, .62)";
  g.font = "12px ui-sans-serif, sans-serif";
  const labels = [["서울숲", 37.5462, 127.0392], ["중랑천", 37.5518, 127.05], ["연무장", 37.5432, 127.053]];
  labels.forEach((lb) => {
    const q = project(lb[1], lb[2]);
    g.fillText(lb[0], q[0], q[1]);
  });
}
function strokeRoad(g, pts) {
  g.beginPath();
  pts.forEach((p, i) => {
    const q = project(p[0], p[1]);
    if (i === 0) g.moveTo(q[0], q[1]);
    else g.lineTo(q[0], q[1]);
  });
  g.stroke();
}
function drawPins(g, night) {
  const pin = currentPin();
  const center = project(pin.lat, pin.lng);
  const edge = project(pin.lat + pin.radius / M_PER_DEG, pin.lng);
  const radiusPx = Math.abs(edge[1] - center[1]);
  g.beginPath();
  g.strokeStyle = night ? "rgba(244,244,241,.55)" : "rgba(20,20,20,.4)";
  g.lineWidth = 1.5;
  g.arc(center[0], center[1], Math.max(8, radiusPx), 0, Math.PI * 2);
  g.stroke();
  const here = listenerPos() || simPos(pin);
  const me = project(here.lat, here.lng);
  g.strokeStyle = night ? "rgba(244,244,241,.28)" : "rgba(20,20,20,.22)";
  g.setLineDash([3, 4]);
  g.beginPath();
  g.moveTo(center[0], center[1]);
  g.lineTo(me[0], me[1]);
  g.stroke();
  g.setLineDash([]);
  DATA.pins.forEach((p) => {
    const q = project(p.lat, p.lng);
    const on = p.id === pin.id;
    g.beginPath();
    g.fillStyle = on ? (night ? "#f4f4f1" : "#141414") : (night ? "rgba(244,244,241,.4)" : "rgba(20,20,20,.28)");
    g.arc(q[0], q[1], on ? 7 : 4.5, 0, Math.PI * 2);
    g.fill();
  });
  g.beginPath();
  g.fillStyle = night ? "#f4f4f1" : "#141414";
  g.arc(me[0], me[1], 6, 0, Math.PI * 2);
  g.fill();
  g.lineWidth = 2;
  g.strokeStyle = night ? "rgba(244,244,241,.35)" : "rgba(20,20,20,.28)";
  g.beginPath();
  g.arc(me[0], me[1], 12, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = night ? "#f4f4f1" : "#141414";
  g.font = "12px ui-sans-serif, sans-serif";
  const pinName = shownAlias(pin);
  if (pinName) g.fillText(pinName, center[0] + 16, center[1] - 20);
  if (state.useGps) g.fillText(state.gpsFix ? "GPS" : "대기", me[0] + 12, me[1] + 16);
}

function tileUsable(img) {
  try {
    const c = document.createElement("canvas");
    c.width = 24;
    c.height = 24;
    const g = c.getContext("2d", { willReadFrequently: true });
    g.drawImage(img, 0, 0, 24, 24);
    const data = g.getImageData(0, 0, 24, 24).data;
    const n = data.length / 4;
    let chroma = 0;
    let pale = 0;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const gc = data[i + 1];
      const b = data[i + 2];
      const max = Math.max(r, gc, b);
      const min = Math.min(r, gc, b);
      if (max - min > 22 && max < 250) chroma++;
      if (r > 235 && gc > 235 && b > 235) pale++;
    }
    if (pale > n * 0.45 && chroma < n * 0.15) return false;
    return chroma > n * 0.12;
  } catch (e) {
    return false;
  }
}
function scheduleTiles() {
  if (state.tilesStarted) return;
  state.tilesStarted = true;
  const z = 15;
  const x0 = mercX(BOUNDS.minLng) * Math.pow(2, z);
  const x1 = mercX(BOUNDS.maxLng) * Math.pow(2, z);
  const y0 = mercY(BOUNDS.maxLat) * Math.pow(2, z);
  const y1 = mercY(BOUNDS.minLat) * Math.pow(2, z);
  const xa = Math.floor(x0);
  const xb = Math.floor(x1);
  const ya = Math.floor(y0);
  const yb = Math.floor(y1);
  for (let x = xa; x <= xb; x++) {
    for (let y = ya; y <= yb; y++) {
      const tile = { x: x, y: y, z: z, ok: false, img: new Image() };
      tile.img.crossOrigin = "anonymous";
      tile.img.onload = () => {
        tile.ok = tileUsable(tile.img);
        drawMap();
      };
      tile.img.onerror = () => { tile.ok = false; };
      state.tileRequests += 1;
      tile.img.src = "https://tile.openstreetmap.de/" + z + "/" + x + "/" + y + ".png";
      tiles.push(tile);
    }
  }
}

function hitPin(px, py) {
  let best = null;
  let bestD = 24;
  DATA.pins.forEach((p) => {
    const q = project(p.lat, p.lng);
    const d = Math.hypot(q[0] - px, q[1] - py);
    if (d < bestD) { bestD = d; best = p; }
  });
  return best;
}

function snapshot() {
  return JSON.stringify({
    pinId: state.pinId,
    phase: state.phase,
    distanceM: state.distanceM,
    useGps: state.useGps,
    mode: state.mode,
    playT: state.playT,
    resume: state.resume,
    visited: state.visited,
    keeps: state.keeps,
    rate: state.rate,
    sheetOpen: state.sheetOpen,
    spokenLine: state.spokenLine,
    layoutOnly: state.layoutOnly,
    tilesOn: state.tilesOn
  });
}
function restore(raw) {
  const s = JSON.parse(raw);
  state.pinId = s.pinId;
  state.phase = s.phase;
  state.distanceM = s.distanceM;
  state.useGps = s.useGps;
  state.mode = "idle";
  state.playT = 0;
  state.resume = s.resume;
  state.visited = s.visited;
  state.keeps = Array.isArray(s.keeps) ? s.keeps : [];
  state.rate = s.rate === 10 ? 10 : 1;
  state.sheetOpen = s.sheetOpen;
  state.spokenLine = null;
  state.layoutOnly = false;
  state.tilesOn = !!s.tilesOn;
  state.gpsNote = "";
  LocationSource.kind = state.useGps ? "gps" : "simulator";
  LocationSource.clearWatch();
  document.getElementById("tiles").checked = state.tilesOn;
  document.body.classList.toggle("night", state.phase === "night");
  document.getElementById("pin").value = state.pinId;
  document.getElementById("gps").checked = !!state.useGps;
  document.getElementById("rate").value = String(state.rate);
  document.getElementById("slider").value = String(Math.round(state.distanceM));
  stamp = "";
  save();
}
function runSelfTest() {
  const snap = snapshot();
  const fails = [];
  quietStop();
  function check(cond, msg) { if (!cond) fails.push(msg); }
  try {
    check(DATA.pins.length === 20, "pins");
    DATA.pins.forEach((p) => {
      const work = p.works[0];
      check(work && work.kind === "audio" && work.body_day && work.body_day.B && work.body_night && work.body_night.B, p.id + " work");
      check(work.aggro && work.afterglow, p.id + " lines");
      check(!work.body_day.C.url_dummy && !work.body_night.C.url_dummy, p.id + " url");
      check(p.radius >= 40, p.id + " radius");
      check(work.id === "W-" + p.id.replace("-", "") + "-01", p.id + " work id");
    });
    check(AGGRO_SEC === 8 && AFTERGLOW_SEC === 30, "fixed lengths");
    const pin = pinById("SS-01");
    const day = pin.works[0].body_day;
    const b = day.B;
    check(day.duration_sec === 124, "dur");
    check(b[0].start === 8 && b[0].text.indexOf("이 벤치는 가게가 아니다") === 0, "line1");
    check(b[1].start === 22, "line2 start");
    check(b[2].start === 48, "line3 start");
    check(b[5].start === 112 && b[5].end === 124, "line6");
    check(lineAt(pin, "day", 0) === null, "t0");
    check(lineAt(pin, "day", 8).text === b[0].text, "t8");
    check(lineAt(pin, "day", 21.9).index === 0, "t21");
    check(lineAt(pin, "day", 22).index === 1, "t22");
    check(lineAt(pin, "day", 40) === null && lineAt(pin, "day", 47.9) === null, "gap");
    check(lineAt(pin, "day", 48).index === 2, "t48");
    check(lineAt(pin, "day", 112).index === 5, "t112");
    check(lineAt(pin, "day", 124) === null, "t124");
    check(cAmp(day, 39) === 0, "c39");
    check(cAmp(day, 41) > 0 && cAmp(day, 50) > 0 && cAmp(day, 59) > 0, "c open");
    check(cAmp(day, 63) === 0, "c63");
    const night = pin.works[0].body_night;
    check(night.B[0].start === 6 && night.duration_sec === 110, "night");
    check(cAmp(night, 27) === 0 && cAmp(night, 29) > 0, "night c");
    const cut = pinById("SS-04");
    check(lineAt(cut, "day", 117) !== null && lineAt(cut, "day", 118) === null, "clip");
    check(fadeLevel(0) === 1 && fadeLevel(2) === 0.5 && fadeLevel(4) === 0, "fade curve");
    check(state.gpsAtBoot === 0, "gps boot");
    check(state.tileRequestsAtBoot === 0, "tiles boot");
    check(!document.getElementById("tiles").checked, "tiles off");

    state.useGps = false;
    state.gpsFix = null;
    state.pinId = "SS-01";
    state.phase = "day";
    state.visited = state.visited.filter((id) => id !== "SS-01");
    state.resume = {};
    state.mode = "idle";
    state.distanceM = pin.radius + 80;
    check(!inside(pin) && actionSpec(pin).id === "aggro", "far gate");
    check(shownAlias(pin) === "", "alias far");
    stamp = "";
    render();
    check(document.getElementById("alias").textContent === "", "alias dom");
    check(document.getElementById("meta").hidden, "meta far");
    state.distanceM = Math.round(pin.radius * 0.4);
    check(inside(pin) && actionSpec(pin).id === "main" && state.mode === "idle", "near idle");
    state.mode = "main";
    state.playT = 50;
    state.distanceM = pin.radius + 12;
    onPositionChanged();
    check(state.mode === "fading" && Math.abs(state.resume["SS-01|day"] - 50) < 0.001, "exit resume");
    finishFade();
    check(state.mode === "idle" && Math.abs(state.resume["SS-01|day"] - 50) < 0.001, "fade done");
    state.distanceM = Math.round(pin.radius * 0.4);
    const again = actionSpec(pin);
    check(again.id === "main" && again.label.indexOf("이어서 듣기") === 0, "resume label");
    check(lineAt(pin, "day", state.resume["SS-01|day"]).index === 2, "resume line");
    state.visited = state.visited.filter((id) => id !== "SS-01");
    state.pinId = "SS-01";
    state.phase = "day";
    state.mode = "main";
    state.playT = 14;
    state.distanceM = Math.round(pin.radius * 0.4);
    userStop();
    check(!state.visited.includes("SS-01"), "stop 14");
    state.mode = "main";
    state.playT = 15;
    userStop();
    check(state.visited.includes("SS-01"), "stop 15");
    state.visited = state.visited.filter((id) => id !== "SS-01");
    state.mode = "main";
    state.playT = 123.2;
    state.distanceM = Math.round(pin.radius * 0.4);
    advance(1);
    check(state.visited.includes("SS-01") && state.mode === "idle" && state.resume["SS-01|day"] == null, "end visit");
    state.distanceM = pin.radius + 80;
    check(!inside(pin) && actionSpec(pin).id === "echo", "echo only");
    state.mode = "echo";
    state.playT = 29.2;
    advance(1);
    check(state.mode === "idle", "echo 30");
    state.pinId = "SS-02";
    state.visited = state.visited.filter((id) => id !== "SS-02");
    state.distanceM = pinById("SS-02").radius + 80;
    state.mode = "aggro";
    state.playT = 3;
    quietStop();
    check(!state.visited.includes("SS-02"), "aggro not visit");

    Player.stop();
    check(state.mode === "idle", "player idle");
    check(Player.cue("aggro", 0) === true && state.mode === "aggro", "player aggro");
    check(Player.cue("main", 0) === true && state.mode === "main", "player main");
    check(Player.cue("echo", 0) === true && state.mode === "echo", "player echo");
    state.mode = "main";
    state.playT = 12;
    Player.failClosed();
    check(state.mode === "main" && state.playT === 12, "404 keeps main");
    Player.stop();
    LocationSource.kind = "simulator";
    state.useGps = false;
    const hitsBefore = LocationSource.hits;
    const slider = document.getElementById("slider");
    slider.value = "90";
    slider.dispatchEvent(new Event("input"));
    check(LocationSource.hits === hitsBefore + 1, "slider onDistance");
    check(LocationSource.kind === "simulator", "sim source");
    const gpsBox = document.getElementById("gps");
    gpsBox.checked = true;
    gpsBox.dispatchEvent(new Event("change"));
    gpsBox.checked = false;
    gpsBox.dispatchEvent(new Event("change"));
    check(LocationSource.kind === "simulator" && state.useGps === false, "gps off returns sim");
  } catch (e) {
    fails.push(e && e.message ? e.message : "throw");
  } finally {
    restore(snap);
    render();
    drawMap();
  }
  const report = document.getElementById("report");
  if (!fails.length) {
    report.className = "pass";
    report.textContent = "PASS";
    document.documentElement.dataset.test = "pass";
  } else {
    report.className = "fail";
    report.textContent = "FAIL " + fails.join(" | ");
    document.documentElement.dataset.test = "fail";
  }
  return fails;
}

let lastTs = 0;
function tick(ts) {
  try {
    if (!lastTs) lastTs = ts;
    const real = Math.min(0.25, (ts - lastTs) / 1000);
    lastTs = ts;
    if (!state.layoutOnly) Player.tick(real * (state.rate || 1));
    if (!state.phaseHeld && state.mode === "idle") {
      const next = clockPhase();
      if (next !== state.phase) setPhase(next);
    }
    render();
    drawMap();
  } catch (e) {}
  requestAnimationFrame(tick);
}

function applyHash() {
  const hash = location.hash || "";
  if (hash.indexOf("night") !== -1) { state.phase = "night"; state.phaseHeld = true; }
  if (hash.indexOf("near") !== -1 || hash.indexOf("playing") !== -1) {
    state.distanceM = Math.round(currentPin().radius * 0.4);
  }
  if (hash.indexOf("echo") !== -1) {
    if (!state.visited.includes("SS-01")) state.visited.unshift("SS-01");
    state.distanceM = currentPin().radius + 80;
  }
  if (hash.indexOf("playing") !== -1) {
    state.distanceM = Math.round(currentPin().radius * 0.4);
    state.mode = "main";
    state.playT = 50;
    state.spokenLine = 2;
    state.layoutOnly = true;
    state.rate = 0;
  }
  if (hash.indexOf("open") !== -1) state.sheetOpen = true;
  if (hash.indexOf("selftest") !== -1) state.runTestOnBoot = true;
  document.body.classList.toggle("night", state.phase === "night");
}

function openShare() {
  const pin = currentPin();
  document.getElementById("fog-alias").textContent = pin.alias;
  document.getElementById("fog-line").textContent = workOf(pin).afterglow;
  document.getElementById("fog").hidden = false;
}
function bind() {
  const pinSel = document.getElementById("pin");
  DATA.pins.forEach((p) => {
    const o = document.createElement("option");
    o.value = p.id;
    o.textContent = p.id + " " + p.alias;
    pinSel.appendChild(o);
  });
  pinSel.value = state.pinId;
  pinSel.addEventListener("change", () => { state.rehearsalArmed = true; selectPin(pinSel.value); });
  document.getElementById("far").addEventListener("click", () => { state.rehearsalArmed = true; jump("far"); });
  document.getElementById("near").addEventListener("click", () => { state.rehearsalArmed = true; jump("near"); });
  document.getElementById("leave").addEventListener("click", () => { state.rehearsalArmed = true; jump("leave"); });
  document.getElementById("day").addEventListener("click", () => { state.rehearsalArmed = true; state.phaseHeld = true; setPhase("day"); });
  document.getElementById("night").addEventListener("click", () => { state.rehearsalArmed = true; state.phaseHeld = true; setPhase("night"); });
  const clockBtn = document.getElementById("clock");
  if (clockBtn) clockBtn.addEventListener("click", () => {
    state.phaseHeld = false;
    const next = clockPhase();
    if (next === state.phase) { document.body.classList.toggle("night", next === "night"); render(); return; }
    setPhase(next);
  });
  document.getElementById("rate").addEventListener("change", (e) => {
    state.rehearsalArmed = true;
    clearLayoutHold();
    state.rate = Number(e.target.value) === 10 ? 10 : 1;
  });
  document.getElementById("gps").addEventListener("change", (e) => {
    clearLayoutHold();
    if (e.target.checked) LocationSource.useForeground();
    else LocationSource.useSimulator();
  });
  document.addEventListener("visibilitychange", () => {
    if (LocationSource.kind !== "gps") return;
    if (document.hidden) LocationSource.clearWatch();
    else LocationSource.armWatch();
  });
  document.getElementById("tiles").addEventListener("change", (e) => {
    state.tilesOn = !!e.target.checked;
    const credit = document.getElementById("credit");
    if (credit) credit.hidden = !state.tilesOn;
    if (state.tilesOn) scheduleTiles();
    drawMap();
  });
  const slider = document.getElementById("slider");
  slider.addEventListener("pointerdown", () => { state.sliding = true; });
  window.addEventListener("pointerup", () => { state.sliding = false; });
  slider.addEventListener("input", () => {
    if (LocationSource.kind === "gps") return;
    state.rehearsalArmed = true;
    clearLayoutHold();
    state.distanceM = Number(slider.value);
    document.getElementById("meters").textContent = state.distanceM + "m";
    LocationSource.emit();
  });
  document.getElementById("action").addEventListener("click", onAction);
  document.getElementById("now-stop").addEventListener("click", () => {
    clearLayoutHold();
    if (state.mode === "main" || state.mode === "fading") userStop();
    else quietStop();
    render();
  });
  document.getElementById("grip").addEventListener("click", () => {
    state.sheetOpen = !state.sheetOpen;
    stamp = "";
    render();
  });
  const scriptBtn = document.getElementById("script-toggle");
  if (scriptBtn) scriptBtn.addEventListener("click", () => {
    scriptOpen = !scriptOpen;
    stamp = "";
    render();
  });
  document.getElementById("chips").addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    if (btn.dataset.kind === "slot") {
      const q = btn.dataset.q || "";
      if (q) window.open("https://www.youtube.com/results?search_query=" + encodeURIComponent(q), "_blank", "noopener");
      return;
    }
    if (btn.dataset.id) playEcho(btn.dataset.id);
    render();
  });
  document.getElementById("share").addEventListener("click", openShare);
  document.getElementById("fog-close").addEventListener("click", () => {
    document.getElementById("fog").hidden = true;
  });
  document.getElementById("fog").addEventListener("click", (e) => {
    if (e.target.id === "fog") document.getElementById("fog").hidden = true;
  });
  document.getElementById("copy").addEventListener("click", async () => {
    const pin = currentPin();
    const text = pin.alias + "\n" + workOf(pin).afterglow;
    const btn = document.getElementById("copy");
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "복사됨";
    } catch (err) {
      const line = document.getElementById("fog-line");
      const range = document.createRange();
      range.selectNodeContents(line);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      btn.textContent = "카드를 선택해 복사";
    }
    setTimeout(() => { btn.textContent = "복사"; }, 1600);
  });
  document.getElementById("selftest").addEventListener("click", runSelfTest);
  document.getElementById("loc-line").addEventListener("click", () => {
    document.getElementById("loc-line").hidden = true;
  });
  let devTaps = 0;
  document.querySelector("#dev .tag").addEventListener("click", () => {
    const root = document.documentElement;
    if (!root.classList.contains("standalone") || !root.classList.contains("dev-collapsed")) return;
    devTaps += 1;
    if (devTaps >= 7) root.classList.remove("dev-collapsed");
  });
  const tabs = document.getElementById("tabs");
  if (tabs) {
    tabs.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn || !btn.dataset.tab) return;
      showTab(btn.dataset.tab);
    });
  }
  const vault = document.getElementById("vault");
  if (vault) {
    vault.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-echo]");
      if (!btn) return;
      const id = btn.dataset.echo;
      if (state.mode === "echo" && state.pinId === id) quietStop();
      else playEcho(id);
      vaultStamp = "";
      render();
    });
  }
  const setlist = document.getElementById("setlist");
  if (setlist) setlist.addEventListener("click", onSetlistClick);
  const whisper = document.getElementById("whisper");
  if (whisper) whisper.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("whisper-input");
    if (!input) return;
    writeNote(currentPin().id, input.value);
    input.value = readNote(currentPin().id);
    if (!document.getElementById("vault").hidden) paintVault();
  });
  const studioPin = document.getElementById("studio-pin");
  if (studioPin) studioPin.addEventListener("submit", saveStudioPin);
  const studioAdd = document.getElementById("studio-add");
  if (studioAdd) studioAdd.addEventListener("submit", addStudioFeed);
  const studioType = document.getElementById("studio-type");
  if (studioType) studioType.addEventListener("change", paintStudioFields);
  const studioSpace = document.getElementById("studio-space");
  if (studioSpace) studioSpace.addEventListener("change", () => { paintStudioFeed(); paintStudioPreview(); });
  const radius = document.getElementById("studio-radius");
  if (radius) radius.addEventListener("input", () => {
    const read = document.getElementById("studio-radius-read");
    if (read) read.textContent = radius.value + "m";
  });
  const work = document.getElementById("work");
  if (work) work.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-work]");
    if (!btn) return;
    showWork(btn.dataset.work);
  });
  const sketch = document.getElementById("sketch");
  if (sketch) sketch.addEventListener("pointerdown", (e) => {
    const rect = sketch.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (!view.w) return;
    if (activeTab === "work" && workPane === "studio") {
      const ll = unproject(x, y);
      dropDraft(ll.lat, ll.lng);
      return;
    }
    const hit = hitPin(x, y);
    if (!hit) return;
    if (hit.id !== state.pinId) selectPin(hit.id);
    state.sheetOpen = true;
    render();
  });
  const obs = new ResizeObserver(() => drawMap());
  obs.observe(document.querySelector("main"));
}

function init() {
  patchGeo();
  load();
  state.pinId = "SS-01";
  state.phaseHeld = false;
  state.phase = clockPhase();
  state.useGps = false;
  LocationSource.kind = "simulator";
  state.gpsNote = "";
  state.distanceM = pinById("SS-01").radius + 80;
  state.mode = "idle";
  state.rehearsalArmed = false;
  state.wasInside = null;
  applyHash();
  bind();
  watchCatalog();
  state.gpsAtBoot = state.gpsCalls;
  state.tileRequestsAtBoot = state.tileRequests;
  render();
  drawMap();
  if (state.runTestOnBoot) runSelfTest();
  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register("/janhyang/sw.js?v=2").catch(() => {});
  }
  requestAnimationFrame(tick);
}

try {
  init();
} catch (e) {
  const el = document.getElementById("map");
  if (el) el.textContent = "지도를 그리지 못했습니다";
}
