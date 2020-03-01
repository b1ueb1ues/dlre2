/**
 *  var table
 */
var offset = {};
offset.characterbase = {};
offset.dragoncharacter = {};
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
offset.characterbase.isdragon = 0x4D0;

offset.dragoncharacter.human = 0x620;

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

offset.datetime.get_utcnow = 0x2ED50B4;

offset.damagecalculation.calculation = 0x1805A54;
offset.damagecalculation.calculationbasedamage = 0x18067C0;

offset.characterbase.get_maxhp = 0x1B426C4;
offset.characterbase.get_attack = 0x1B4286C;
offset.characterbase.get_defense = 0x1B42900;
offset.characterbase.get_defcoef = 0x1B42970;
offset.characterbase.recoverysp = 0x1B62F40;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x1B473A0;
offset.characterbase.applydamage = 0x1B5A670;
offset.characterbase.applyslipdamage = 0x1B5B194;
offset.characterbase.setabnormalstatus = 0x1B5E718;
offset.characterbase.getmaxsp = 0x1B611B8;

offset.enemycharacter.ondamaged = 0x1705E6C;

offset.maingameleavealonechecker.setleavealonetime = 0x195A880;

offset.maingamectrl.playqueststart = 0x16D922C;

offset.actionconditionelement.get_rate = 0x1964884;

offset.random.rangefloat = 0x33C2F5C;   // first range()
//offset.random.rangeint = 0x33C2FCC;   // second range()
offset.random.randomrangeint = 0x33C2FD0; 
offset.enemyctrl.setaiaction = 0x2096C78;

offset.collisionhitattribute.get_damageadjustment = 0x1E3C1C0;

offset.chainctrl.add = 0x1A7F3FC;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x21FC2A4;

offset.ingameuictrl.showdamageui = 0x1896C7C;
/**
 * return address
 */
offset.characterbase.ret = {};
offset.characterbase.ret.get_attack_2_dc_cbd = 0x01806f40;  // to calculationbasedamage
offset.random.ret = {};
offset.random.ret.rangeint_2_dc_cbd = 0x018071c0;
offset.random.ret.rangefloat_2_dc_calculation = 0x01805da8;  
offset.random.ret.rangeint_2_cb_ac = 0x023bcfb4;  // characterbuff$$applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0xf8;  //get from collisionHitAttribute$$get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get
