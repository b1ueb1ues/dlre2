/**
 *  var table
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
offset.datetime = {}
offset.characterbufftriggerreactionbomb = {};
offset.actioncontainer = {};
offset.buffrecord = {};

offset.characterbase.characterid = 0x11C;
offset.characterbase.dungeonpartyindex = 0x124;
offset.characterbase.dungeonpartyposition = 0x128;
offset.characterbase.multiplayid = 0x130;
offset.characterbase.charactertype = 0x13C;
offset.characterbase.characterparameter = 0x148;

offset.characterparameter.fptotal = 0x88;

offset.fluctuationparameter.abnormalresist = 0x60;

offset.characterid.actorid = 0x10;
offset.characterid.index = 0x11;

offset.collisionhitattribute.actionhitexectype = 0xC0;

offset.damagestatus.value = 0x14;
offset.damagestatus.iscrit = 0x18;

offset.damagecalculation.normal = 0x10;

offset.attackhit.damage = 0x20;
offset.attackhit.iscrit = 0x48;

offset.maingameleavealonechecker.warnningtime = 0x28;
offset.maingameleavealonechecker.exittime = 0x2C;

offset.slipdamage.type = 0x20;
offset.slipdamage.damage = 0x24;
offset.slipdamage.attacker = 0x28;

offset.characterdamageintermediate.damage = 0x10;
offset.characterdamageintermediate.damageowner = 0x20;
offset.characterdamageintermediate.attackhit = 0x30;
offset.characterdamageintermediate.collisionhitattribute = 0x38;

offset.characterbufftriggerreactionbomb.container = 0x18;

offset.actioncontainer.actionid = 0x60;

offset.buffrecord.damage = 0x48;
offset.buffrecord.dst = 0x50;
offset.buffrecord.src = 0x58;

/**
 * functions table
 */

offset.datetime.get_utcnow = 0x2E0F01C;

offset.damagecalculation.calculation = 0x17D8AF8;
offset.damagecalculation.calculationbasedamage = 0x17D982C;

offset.characterbase.get_maxhp = 0x164D718;
offset.characterbase.get_attack = 0x164D8C0;
offset.characterbase.get_defense = 0x164D954;
offset.characterbase.get_defcoef = 0x164D9C4;
offset.characterbase.recoverysp = 0x166C76C;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x1651B60;
offset.characterbase.applydamage = 0x16649E8;
offset.characterbase.applyslipdamage = 0x16654C4;
offset.characterbase.setabnormalstatus = 0x16685B4;
offset.characterbase.getmaxsp = 0x166AEA0;

offset.enemycharacter.ondamaged = 0x192FEE8;

offset.maingameleavealonechecker.setleavealonetime = 0x1872D98;

offset.maingamectrl.playqueststart = 0x16B1CF8;

offset.actionconditionelement.get_rate = 0x187AA4C;

offset.random.rangefloat = 0x3320778;   // first range()
//offset.random.rangeint = 0x33207E8;   // second range()
offset.random.randomrangeint = 0x33207EC; 
offset.enemyctrl.setaiaction = 0x1F46B1C;

offset.collisionhitattribute.get_damageadjustment = 0x1848008;

offset.chainctrl.add = 0x163C254;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x1F11974;

/**
 * return address
 */
offset.characterbase.ret = {};
offset.characterbase.ret.get_attack_2_dc_cbd = 0x017d9f94;  // to calculationbasedamage
offset.random.ret = {};
offset.random.ret.rangefloat_2_dc_calculation = 0x017d8e48;  
offset.random.ret.rangeint_2_dc_cbd = 0x017da1c4;
offset.random.ret.rangeint_2_cb_ac = 0x02377914;  // characterbuff$$applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0xf4;  //get from collisionHitAttr$$get_DamageAdjustment
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get
