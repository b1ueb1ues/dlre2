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
offset.ingameuictrl = {};

offset.characterbase.characterid = 0x11C;
offset.characterbase.dungeonpartyindex = 0x124;
offset.characterbase.dungeonpartyposition = 0x128;
offset.characterbase.multiplayid = 0x130;
offset.characterbase.charactertype = 0x13C;
offset.characterbase.characterparameter = 0x148;

offset.characterparameter.fptotal = 0x88;

offset.fluctuationparameter.abnormalresist = 0x68;

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

offset.datetime.get_utcnow = 0x2EB8830;

offset.damagecalculation.calculation = 0x18984F4;
offset.damagecalculation.calculationbasedamage = 0x1899260;

offset.characterbase.get_maxhp = 0x1B8923C;
offset.characterbase.get_attack = 0x1B893E4;
offset.characterbase.get_defense = 0x1B89478;
offset.characterbase.get_defcoef = 0x1B894E8;
offset.characterbase.recoverysp = 0x1BA96A0;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x1B8DCDC;
offset.characterbase.applydamage = 0x1BA122C;
offset.characterbase.applyslipdamage = 0x1BA1D14;
offset.characterbase.setabnormalstatus = 0x1BA4F40;
offset.characterbase.getmaxsp = 0x1BA7A18;

offset.enemycharacter.ondamaged = 0x16C64C4;

offset.maingameleavealonechecker.setleavealonetime = 0x18F3F6C;

offset.maingamectrl.playqueststart = 0x169BA1C;

offset.actionconditionelement.get_rate = 0x18FD874;

offset.random.rangefloat = 0x339B148;   // first range()
//offset.random.rangeint = 0x339B1B8;   // second range()
offset.random.randomrangeint = 0x339B1BC; 
offset.enemyctrl.setaiaction = 0x203ED8C;

offset.collisionhitattribute.get_damageadjustment = 0x187C388;

offset.chainctrl.add = 0x1AD1034;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x2190444;

offset.ingameuictrl.showdamageui = 0x18B13E8;
/**
 * return address
 */
offset.characterbase.ret = {};
offset.characterbase.ret.get_attack_2_dc_cbd = 0x018999d8;  // to calculationbasedamage
offset.random.ret = {};
offset.random.ret.rangeint_2_dc_cbd = 0x01899c08;
offset.random.ret.rangefloat_2_dc_calculation = 0x01898848;  
offset.random.ret.rangeint_2_cb_ac = 0x023f9df0;  // characterbuff$$applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0xf4;  //get from collisionHitAttr$$get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get
