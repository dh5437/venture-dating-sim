const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');
const { Monster } = require('../models');

router.get('/:turn/:id', setAuth, async (req, res) => {
  const user = req.user;
  const userInfo = {
    level: user.level,
    str: user.str,
    def: user.def,
    hp: user.hp,
    exp: user.exp,
  };
  const turn = +req.params.turn;
  const { id } = req.params;
  const monster = await Monster.findOne({ id });
  const userItems = user.items;

  if (turn < 1) {
    return res.sendStatus(404);
  } else if (turn > 10 || user.hp / user.maxHp <= 0.2) {
    const isEnded = false;
    const canEscape = true;
    const message = '도망가시겠습니까?';
    return res.status(200).send({ userInfo, message, canEscape, isEnded });
  } else {
    if (monster.hp <= 0) {
      user.hp = user.maxHp;
      user.exp += monster.exp;
      if (user.exp >= 100) {
        user.level += 1;
        user.exp -= 100;
        user.maxHp += 50;
        user.str += 5;
        user.def += 3;
        await user.save();
        if (user.level === 5) {
          return res
            .status(200)
            .send({ message: '그녀와의 사랑이 이루어졌다. 올해 크리스마스는 따뜻할거야!!' });
        }
      }
      await user.save();
      const message = `${monster.name}을 무찔렀습니다! 경험치가 ${monster.exp}만큼 회복되었습니다!
        "${monster.name}... 별 거 아니군.."`;
      const isEnded = false;
      const canEscape = false;
      return res.status(200).send({ userInfo, message, isEnded, canEscape });
    } else if (user.hp <= 0) {
      userItems.forEach((e) => {
        if (Math.random() < 0.5) {
          e.delete;
        }
      });
      user.hp = user.maxHp * 0.7;
      await user.save();
      const message = `${monster.name}에게 당했습니다. 처음으로 돌아갑니다.
        "그녀의 ${monster.name}은 강하구나.. 조심해야지.."`;
      const isEnded = true;
      const canEscape = false;
      return res.status(200).send({ userInfo, message, isEnded, canEscape });
    } else {
      if (Math.random() < 0.7) {
        monster.hp -= user.str - monster.def;
        await monster.save();
        const message = `그녀의 ${monster.name}에게 상처를 입혔다! 통쾌하다.
        ${user.str - monster.def}의 피해를 입혔다! (적의 남은 체력 : ${monster.hp})`;
        const isEnded = false;
        const canEscape = false;
        return res.status(200).send({ userInfo, message, isEnded, canEscape });
      } else {
        user.hp -= monster.str - user.def;
        await user.save();
        const message = `그녀의 ${monster.name}이 공격에 성공했다! 아프다!
        ${monster.str - user.def}의 피해를 입었다! (적의 남은 체력 : ${monster.hp})`;
        const isEnded = false;
        const canEscape = false;
        return res.status(200).send({ userInfo, message, isEnded, canEscape });
      }
    }
  }
});

module.exports = router;
