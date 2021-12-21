const express = require('express');
const router = express.Router();

const { setAuth } = require('../utils');
const { Monster } = require('../models');

router.get('/:turn', setAuth, async (req, res) => {
    const user = req.user;
    const { turn } = req.params;
    const monster = await Monster.findOne({ name });
    const userItems = user.items;
    const log = `적 ${monster.name}을 만났다.`;

    if (turn <0 ) {
        return res.sendStatus(404)
    } else if (turn === 0) {
        return res.status(200).send( { user, monster, log } )
    } else if (turn>10 || user.hp/user.maxhp<=0.2) {
        return res.status(200).send('도망간다/도망가지 않는다.')
    } else {
    if (monster.hp<=0) {
        user.hp = user.maxhp
        user.exp += 10
        await user.save()
        const winLog = '적을 물리쳤습니다.'
        return res.status(200).send( { user, winLog } )
    } else if (user.hp<=0) {
        user.map.coordinate = ( 0,0 )
        userItems.forEach(e => {if (Math.random()<0.5) {e.delete}} )
        await user.save()
        const isEnded = '적에게 당했습니다.'
        return res.status(200).send( { user, isEnded } )
    } else {
    if (Math.random()<0.7) {
        monster.hp -= user.str - monster.def;
        await monster.save();
        const log2 = '공격이 성공하였습니다.';
        return res.status(200).send( { user, monster, log2 } );
    } else {
        user.hp -= monster.str - user.def;
        await user.save();
        const log2 = '적이 공격하였습니다.';
        return res.status(200).send( { user, monster, log2 } );
    }}}
});

module.exports = router;
