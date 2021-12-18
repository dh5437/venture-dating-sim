const { Coordinate, Item, Key, Map, Monster, User } = require('./models');
const fs = require('fs');
const init = async () => {
  await Coordinate.deleteMany();
  await Item.deleteMany();
  await Key.deleteMany();
  await Map.deleteMany();
  await Monster.deleteMany();
  await User.deleteMany();

  const monsters = ['대학 선배', '중학교 동창', '전 애인', '첫사랑', '그녀의 과제', '인관심 조원'];
  const monsterJson = [];
  for (const _monster of monsters) {
    const _maxhp = Math.ceil(Math.random() * 100) * 5;
    const _hp = _maxhp;
    const _exp = _hp / 4 + 20;
    const _str = _hp / 5 + 2;
    const monster = new Monster({ name: _monster, maxhp: _maxhp, hp: _hp, exp: _exp, str: _str });
    monsterJson.push({ name: _monster, maxhp: _maxhp, hp: _hp, exp: _exp, str: _str });
    await monster.save();
  }
  fs.writeFileSync('./datas/monsters.json', JSON.stringify(monsterJson));

  const items = [
    '러브 레터',
    '꽃다발',
    '향수',
    '참이슬',
    '코트',
    '투명 뿔테 안경',
    '트레이닝 바지',
    '현금',
    '비트코인',
    '이더리움',
    '통장',
    '따뜻한 스웨터',
    '목도리',
    '현란한 카톡멘트',
  ];
  const itemJson = [];
  for (const _item of items) {
    const property = ['hp', 'exp', 'str'];
    const value = property[Math.floor(Math.random() * 3)];
    if (value === 'hp') {
      const randomhp = Math.ceil(Math.random() * 50);
      const item = new Item({ name: _item, hp: randomhp, exp: 0, str: 0, isActive: true });
      itemJson.push({ name: _item, hp: randomhp, exp: 0, str: 0, isActive: true });
      await item.save();
    } else if (value === 'exp') {
      const randomexp = Math.ceil(Math.random() * 40);
      const item = new Item({ name: _item, hp: 0, exp: randomexp, str: 0, isActive: true });
      itemJson.push({ name: _item, hp: 0, exp: randomexp, str: 0, isActive: true });
      await item.save();
    } else {
      const randomstr = Math.ceil(Math.random() * 20);
      const item = new Item({ name: _item, hp: 0, exp: 0, str: randomstr, isActive: true });
      itemJson.push({ name: _item, hp: 0, exp: 0, str: randomstr, isActive: true });
      await item.save();
    }
  }
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

  while (maps.length < 75) {
    const mapCoordinate = remainingCoordinates.splice(
      Math.floor(Math.random() * remainingCoordinates.length),
      1,
    )[0];
    const _x = Math.floor(mapCoordinate / 10);
    const _y = mapCoordinate % 10;
    if (maps.length < 25) maps.push({ coordinate: { x: _x, y: _y }, event: 'rest' });
    else if (maps.length < 50) maps.push({ coordinate: { x: _x, y: _y }, event: 'battle' });
    else maps.push({ coordinate: { x: _x, y: _y }, event: 'item' });
  }

  for (let i = 0; i < remainingCoordinates.length; i++) {
    const _x = Math.floor(remainingCoordinates[i] / 10);
    const _y = remainingCoordinates[i] % 10;
    maps.push({ coordinate: { x: _x, y: _y }, event: 'random' });
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
