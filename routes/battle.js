const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');
const { Monster, Coordinate, Map } = require('../models');

router.get('/:turn/:id/:monsterHp', setAuth, async (req, res) => {
  const MAX_EXP = 100;
  const ATTACK_PROBABILITY = 0.7;
  const user = req.user;
  let { id } = req.params;
  let turn = +req.params.turn;
  let monsterHp = +req.params.monsterHp;
  const monster = await Monster.findOne({ id });
  const userItems = user.items;
  const isAttack = Math.random() <= ATTACK_PROBABILITY ? true : false;
  let isVictory = false;
  let message = '';
  let isEnded = false;
  let canEscape = false;
  let isFinished = false;

  if (monsterHp === -1) monsterHp = monster.maxHp;
  if (turn < 1) return res.sendStatus(404);
  if (user.hp <= Math.floor(user.maxHp * 0.2) || turn >= 10) canEscape = true;
  turn += 1;

  if (isAttack) {
    // 공격하는 경우
    damage = Math.max(0, user.str - monster.def);
    monsterHp -= damage;
    message = `그녀의 ${monster.name}에게 상처를 입혔다! 통쾌하다.\n
        ${damage}의 피해를 입혔다! (적의 남은 체력 : ${Math.max(monsterHp, 0)})\n`;

    if (monsterHp <= 0) {
      // 몹을 잡은 경우
      isVictory = true;
      message += `${monster.name}을 무찔렀습니다! 경험치가 ${monster.exp}만큼 증가하였습니다! \n ${monster.name}... 별 거 아니군..\n`;
      user.exp += monster.exp;
      if (user.exp >= MAX_EXP) {
        user.level += 1;
        user.exp = 0;
        user.maxHp += 50;
        user.hp = user.maxHp;
        user.str += 5;
        user.def += 3;
        message += '레벨업하였습니다.';
        if (user.level === 4) isFinished = true;
      }
    }
  } else {
    // 맞는 경우
    damage = Math.max(0, monster.str - user.def);
    user.hp -= damage;
    message = `그녀의 ${monster.name}이 공격에 성공했다! 아프다! \n ${damage}의 피해를 입었다! (적의 남은 체력 : ${monsterHp})`;
    if (user.hp <= 0) {
      // 죽은 경우
      isEnded = true;
      message = `${monster.name}에게 당했습니다. 처음으로 돌아갑니다. \n 그녀의 ${monster.name}은 강하구나.. 조심해야지..\n`;
      user.hp = Math.floor(user.maxHp * 0.7);
      // 맵 0,0으로 보내기
      const coordinate = await Coordinate.findOne({ x: 0, y: 0 });
      const maps = await Map.findOne({ coordinate });
      user.map = maps;
      // 템 떨구기
      if (user.items.length > 0) message += '아이템을 잃어버렸습니다.';
      const lostItemIndex = Math.floor(Math.random() * user.items.length);
      user.items[lostItemIndex].quantity -= 1;
      user.items = user.items.filter((item) => item.quantity > 0);
    }
  }
  const userInfo = {
    level: user.level,
    str: user.str,
    def: user.def,
    maxHp: user.maxHp,
    hp: user.hp,
    exp: user.exp,
    items: user.items,
  };
  await user.save();
  return res.send({
    userInfo,
    isVictory,
    isEnded,
    isFinished,
    canEscape,
    turn,
    monsterHp,
    message,
  });
});

//   if (monster.hp + monster.def - user.str <= 0) {
//     // 몬스터를 무찌른 조건
//     user.hp = user.maxHp;
//     user.exp += monster.exp;
//     // 레벨업
//     if (user.level === 5) {
//       return res
//         .status(200)
//         .send({ message: '그녀와의 사랑이 이루어졌다. 올해 크리스마스는 따뜻할거야!!' });
//     }
//     if (user.exp >= 100) {
//       user.level += 1;
//       user.exp = 0;
//       user.maxHp += 50;
//       user.str += 5;
//       user.def += 3;
//       await user.save();
//       return res.status(200).send({ userInfo, message: '레벨업하였습니다.' });
//     } else {
//       const message = `${monster.name}을 무찔렀습니다! 경험치가 ${monster.exp}만큼 증가하였습니다!
//         "${monster.name}... 별 거 아니군.."`;
//       const isVictory = true;
//       await user.save();
//       return res.status(200).send({ userInfo, message, isVictory });
//     }
//   } else if (user.hp + user.def - monster.str <= 0) {
//     userItems.forEach((e) => {
//       if (Math.random() < 0.5) {
//         e.delete;
//       }
//     });

//     user.hp = user.maxHp * 0.7;
//     await user.save();
//     const message = `${monster.name}에게 당했습니다. 처음으로 돌아갑니다.
//         "그녀의 ${monster.name}은 강하구나.. 조심해야지.."`;
//     const isEnded = true;
//     return res.status(200).send({ userInfo, message, isEnded });
//   } else {
//     if (Math.random() < 0.7) {
//       try {
//         monster.hp -= user.str - monster.def;
//         const message = `그녀의 ${monster.name}에게 상처를 입혔다! 통쾌하다.
//         ${user.str - monster.def}의 피해를 입혔다! (적의 남은 체력 : ${monster.hp})`;
//         await monster.save();

//         if (turn > 10 || (0 < remainUserHp && remainUserHp <= 0.2)) {
//           return res.status(200).send({ userInfo, message, canEscape: true });
//         }
//         return res.status(200).send({ userInfo, message });
//       } catch (e) {
//         return res.sendStatus(400);
//       }
//     } else {
//       try {
//         user.hp -= monster.str - user.def;
//         const message = `그녀의 ${monster.name}이 공격에 성공했다! 아프다!
//         ${monster.str - user.def}의 피해를 입었다! (적의 남은 체력 : ${monster.hp})`;

//         await user.save();

//         if (turn > 10 || (0 < remainUserHp && remainUserHp <= 0.2)) {
//           return res.status(200).send({ userInfo, message, canEscape: true });
//         }

//         return res.status(200).send({ userInfo, message });
//       } catch (e) {
//         return res.sendStatus(400);
//       }
//     }
//   }
// });

module.exports = router;
