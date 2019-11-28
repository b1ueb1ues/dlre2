/**
 *  symbol table
 */
var offset = {};
offset.characterbase = {};
offset.characterparameter = {};
offset.fluctuationparameter = {};
offset.characterid = {};
offset.collisionhitattribute = {};
offset.damagestatus = {};
offset.damagecalculation = {};
offset.attackhit = {};
offset.enemycharacter = {};
offset.maingameleavealonechecker = {};
offset.slipdamage = {};
offset.maingamectrl = {};
offset.abnormalstatusmultiplayservice = {};
offset.actionconditionelement = {};
offset.random = {};
offset.enemyctrl = {};
offset.chainctrl = {};
offset.characterdamageintermediate = {};


offset.characterbase.characterid = 0x104;
offset.characterbase.dungeonpartyindex = 0x10c;
offset.characterbase.dungeonpartyposition = 0x110;
offset.characterbase.multiplayid = 0x118;
offset.characterbase.charactertype = 0x124;
offset.characterbase.characterparameter = 0x130;

offset.characterparameter.fptotal = 0x78;

offset.fluctuationparameter.abnormalresist = 0x58;

offset.characterid.actorid = 0x10;
offset.characterid.index = 0x11;

offset.collisionhitattribute.actionhitexectype = 0xc0;
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get

offset.damagestatus.value = 0x14;
offset.damagestatus.iscrit = 0x18;

offset.damagecalculation.normal = 0x10;
offset.damagecalculation.coef = 0xf4;  //from collisionHitAttr$$get_DamageAdjustment

offset.attackhit.damage = 0x20;
offset.attackhit.iscrit = 0x48;

offset.maingameleavealonechecker.warnningtime = 0x28;
offset.maingameleavealonechecker.exittime = 0x2c;

offset.slipdamage.type = 0x20
offset.slipdamage.damage = 0x24
offset.slipdamage.attacker = 0x28

offset.characterdamageintermediate.damage = 0x10;
offset.characterdamageintermediate.damageowner = 0x20;
offset.characterdamageintermediate.attackhit = 0x30;
offset.characterdamageintermediate.collisionhitattribute = 0x38;

/**
 * functions table
 */
offset.damagecalculation.calculation = 0x1777264;
offset.damagecalculation.calculationbasedamage = 0x1777F98;

offset.characterbase.get_maxhp = 0x1C79BEC;
offset.characterbase.get_attack = 0x1C79D94;
offset.characterbase.get_defense = 0x1C79E28;
offset.characterbase.get_defcoef = 0x1C79E98;
offset.characterbase.recoverysp = 0x1C97D64;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x1C7E2A8;
offset.characterbase.applydamage = 0x1C9023C;
offset.characterbase.applyslipdamage = 0x1C90BAC;
offset.characterbase.setabnormalstatus = 0x1C93CA0;
offset.characterbase.getmaxsp = 0x1C96838;

offset.enemycharacter.ondamaged = 0x19B60F4;

offset.maingameleavealonechecker.setleavealonetime = 0x178CAE4;

offset.maingamectrl.playqueststart = 0x1655EDC;

offset.actionconditionelement.get_rate = 0x1794718;

offset.random.rangefloat = 0x3270438;   // first range()
//offset.random.rangeint = 0x32704A8;   // second range()
offset.random.randomrangeint = 0x32704AC; 
offset.enemyctrl.setaiaction = 0x1F6ED84;

offset.collisionhitattribute.get_damageadjustment = 0x17B6BBC;

offset.chainctrl.add = 0x192E91C;

/**
 * return address
 */
offset.characterbase.ret = {};
offset.characterbase.ret.get_attack_2_dc_cbd = 0x015a0648;
offset.random.ret = {};
offset.random.ret.rangefloat_2_dc_calculation = 0x0159f500;
offset.random.ret.rangeint_2_dc_cbd = 0x015a07fc;
offset.random.ret.rangeint_2_cb_ac = 0x0203a7e4;  // characterbuff$$applycommon

