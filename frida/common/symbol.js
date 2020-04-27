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

offset.characterbase.characterid = 0x12C;
offset.characterbase.dungeonpartyindex = 0x134;
offset.characterbase.dungeonpartyposition = 0x13C;
offset.characterbase.multiplayid = 0x140;
offset.characterbase.charactertype = 0x14C;
offset.characterbase.characterparameter = 0x158;
offset.characterbase.isdragon = 0x4E8;

offset.dragoncharacter.human = 0x680;

offset.characterparameter.fptotal = 0x98;

offset.fluctuationparameter.abnormalresist = 0x70;

offset.characterid.actorid = 0x10;
offset.characterid.index = 0x12;

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

offset.datetime.get_utcnow = 0x2FEFD18;

offset.damagecalculation.calculation = 0x18C9444;
offset.damagecalculation.calculationbasedamage = 0x18CA310;

offset.characterbase.get_maxhp = 0x17773AC;
offset.characterbase.get_attack = 0x1777554;
offset.characterbase.get_defense = 0x17775E8;
offset.characterbase.get_defcoef = 0x1777658;
offset.characterbase.recoverysp = 0x1799A34;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x177BF24;
offset.characterbase.applydamage = 0x1790C20;
offset.characterbase.applyslipdamage = 0x1791748;
offset.characterbase.setabnormalstatus = 0x1794DA8;
offset.characterbase.getmaxsp = 0x1797A14;

offset.enemycharacter.ondamaged = 0x1EE5BFC;

offset.maingameleavealonechecker.setleavealonetime = 0x193E470;

offset.maingamectrl.playqueststart = 0x170999C;

offset.actionconditionelement.get_rate = 0x194E078;

offset.random.rangefloat = 0x3463EFC;   // first range()
//offset.random.rangeint = 0x3463F6C;   // second range()
offset.random.randomrangeint = 0x3463F70; 
offset.enemyctrl.setaiaction = 0x1EF223C;

offset.collisionhitattribute.get_damageadjustment = 0x1BD59CC;

offset.chainctrl.add = 0x1D19854;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x22A3380;

offset.ingameuictrl.showdamageui = 0x17D5B2C;
/**
 * return address
 */
offset.characterbase.ret = {};
offset.characterbase.ret.get_attack_2_dc_cbd = 0x018cab14;  // to calculationbasedamage
offset.random.ret = {};
offset.random.ret.rangeint_2_dc_cbd = 0x018cada8;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x018c97a0;   // calculation
offset.random.ret.rangeint_2_cb_ac = 0x0237f73c;  // characterbuff$$applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0xf8;  //get from collisionHitAttribute$$get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get  !!!!!
