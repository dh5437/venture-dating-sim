const { Coordinate, Item, Key, Map, Monster, User, Rest } = require('./models');
const fs = require('fs');
const init = async () => {
  await Coordinate.deleteMany();
  await Item.deleteMany();
  await Key.deleteMany();
  await Map.deleteMany();
  await Monster.deleteMany();
  await User.deleteMany();
  await Rest.deleteMany();

  const restEvents = [
    '놀랍도록 아무 일도 이어나지 않았다.',
    '지루한 나날의 연속이다.',
    '다이어트를 하는 중이다.',
    '어쩐지 조용한 날이다.',
    '구름 한 점 없이 맑은 날이다.',
    '의미없는 크리스마스다.',
    '크리스마스 이브다 어쩔.....',
  ];
  const restJson = [];
  for (const _rest of restEvents) {
    const _description = _rest;
    const rest = new Rest({
      description: _description,
      id: restEvents.indexOf(_rest),
    });
    restJson.push({ description: _description, id: restEvents.indexOf(_rest) });
    await rest.save();
  }
  fs.writeFileSync('./datas/rest.json', JSON.stringify(restJson));

  const monsters = [
    ['대학 선배', '그녀의 대학 선배가 등장했다. "오빠가~"'],
    ['중학교 동창', '그녀의 중학교 동창이 등장했다.'],
    ['전 애인', '그녀의 전 애인이 등장했다. 헉..'],
    ['첫사랑', '그녀의 첫사랑이 등장했다. 이런...'],
    ['그녀의 과제', '그녀의 과제가 등장했다. 좀 많은가..?'],
    ['인관심 조원', '그녀의 인관심 조원이 등장했다.'],
  ];

  const monsterJson = [];

  monsters.forEach(async (_monster, index) => {
    const _maxHp = Math.ceil(Math.random() * 100) * 5;
    const _hp = _maxHp;
    const _exp = Math.ceil(Math.random() * 20) + 20;
    const _str = _hp / 5 + 2;
    const _def = Math.ceil(Math.random() * 15);

    const monster = new Monster({
      name: _monster[0],
      maxHp: _maxHp,
      hp: _hp,
      exp: _exp,
      str: _str,
      def: _def,
      description: _monster[1],
      id: index,
    });
    monsterJson.push({
      name: _monster[0],
      maxHp: _maxHp,
      hp: _hp,
      exp: _exp,
      str: _str,
      def: _def,
      description: _monster[1],
      id: index,
    });
    await monster.save();
  });
  fs.writeFileSync('./datas/monsters.json', JSON.stringify(monsterJson));

  const items = [
    ['러브 레터', '그녀에게 마음을 전하고 싶다..'],
    ['꽃다발', '그녀보다 예쁘진 않은 걸..'],
    ['향수', '샤넬 넘버 5.. 그녀가 좋아할까?'],
    ['참이슬', '그래.. 나 취했는지도 몰라.. 실수인지도 몰라..'],
    ['코트', '이걸 입으면 멋진 남자가 될 수 있을까..?'],
    ['투명 뿔테 안경', '박보검이 썼을 땐 멋지던데..'],
    ['트레이닝 바지', '3대 500, 가뿐하겠지..?'],
    ['현금', '이걸로 그녀를 위한 선물을 살 수 있겠지..?'],
    ['비트코인', '제발 올라줘..'],
    ['이더리움', '떨어지지만 말아줘..'],
    ['통장', '그녀를 위해서라면 텅장이 되어도 좋아..'],
    ['따뜻한 스웨터', '감기 걸리면 안되니까..'],
    ['목도리', '배용준이 둘렀을 땐 멋지던데..'],
    ['현란한 카톡멘트', '이걸로 그녀의 환심을 사고파..'],
  ];

  const itemJson = [];
  items.forEach(async (_item, index) => {
    const property = ['hp', 'exp', 'str'];
    const value = property[Math.floor(Math.random() * 3)];
    if (value === 'hp') {
      const randomhp = Math.ceil(Math.random() * 50);
      const item = new Item({
        name: _item[0],
        hp: randomhp,
        exp: 0,
        str: 0,
        id: index,
        description: _item[1],
        isActive: true,
      });
      itemJson.push({
        name: _item[0],
        hp: randomhp,
        exp: 0,
        str: 0,
        id: index,
        description: _item[1],
        isActive: true,
      });
      await item.save();
    } else if (value === 'exp') {
      const randomexp = Math.ceil(Math.random() * 40);
      const item = new Item({
        name: _item[0],
        hp: 0,
        exp: randomexp,
        str: 0,
        id: index,
        description: _item[1],
        isActive: true,
      });
      itemJson.push({
        name: _item[0],
        hp: 0,
        exp: randomexp,
        str: 0,
        id: index,
        description: _item[1],
        isActive: true,
      });
      await item.save();
    } else {
      const randomstr = Math.ceil(Math.random() * 20);
      const item = new Item({
        name: _item[0],
        hp: 0,
        exp: 0,
        str: randomstr,
        id: index,
        description: _item[1],
        isActive: true,
      });
      itemJson.push({
        name: _item[0],
        hp: 0,
        exp: 0,
        str: randomstr,
        id: index,
        description: _item[1],
        isActive: true,
      });
      await item.save();
    }
  });
  // for (const _item of items) {

  // }
  fs.writeFileSync('./datas/items.json', JSON.stringify(itemJson));

  const coordinates = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const obj = {};
      obj.x = i;
      obj.y = j;
      coordinates.push(obj);
    }
  }
  for (const _coordinate of coordinates) {
    const coordinate = new Coordinate({ x: _coordinate.x, y: _coordinate.y });
    await coordinate.save();
  }

  const maps = [];
  const remainingCoordinates = [...Array(100).keys()].slice(1); // [1,2,3,4,5,6,7,8,9... 99]
  maps.push({ coordinate: { x: 0, y: 0 }, event: 'rest' });

  while (maps.length < 100) {
    const mapCoordinate = remainingCoordinates.splice(
      Math.floor(Math.random() * remainingCoordinates.length),
      1,
    )[0];
    const _x = Math.floor(mapCoordinate / 10);
    const _y = mapCoordinate % 10;
    if (maps.length < 34) maps.push({ coordinate: { x: _x, y: _y }, event: 'rest' });
    else if (maps.length < 67) maps.push({ coordinate: { x: _x, y: _y }, event: 'battle' });
    else maps.push({ coordinate: { x: _x, y: _y }, event: 'item' });
  }

  const mapJson = [];
  for (const _map of maps) {
    const _x = _map.coordinate.x;
    const _y = _map.coordinate.y;
    const _coordinate = await Coordinate.findOne({ x: _x, y: _y });
    const map = new Map({ coordinate: _coordinate, event: _map.event });
    mapJson.push({ coordinate: _coordinate, event: _map.event });
    await map.save();
  }
  fs.writeFileSync('./datas/map.json', JSON.stringify(mapJson));

  console.log('initialization completed');
};
init();
