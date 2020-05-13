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

offset.datetime.get_utcnow = 0x2FF3870;

offset.damagecalculation.calculation = 0x18C7918;
offset.damagecalculation.calculationbasedamage = 0x18C8924;

offset.characterbase.get_maxhp = 0x1777610;
offset.characterbase.get_attack = 0x17777B8;
offset.characterbase.get_defense = 0x177784C;
offset.characterbase.get_defcoef = 0x17778BC;
offset.characterbase.recoverysp = 0x1799C98;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x177C188;
offset.characterbase.applydamage = 0x1790E84;
offset.characterbase.applyslipdamage = 0x17919AC;
offset.characterbase.setabnormalstatus = 0x179500C;
offset.characterbase.getmaxsp = 0x1797C78;

offset.enemycharacter.ondamaged = 0x1EE45EC;

offset.maingameleavealonechecker.setleavealonetime = 0x193CBA0;

offset.maingamectrl.playqueststart = 0x1709C00;

offset.actionconditionelement.get_rate = 0x194C7A8;

offset.random.rangefloat = 0x3469A54;   // first range()
//offset.random.rangeint = 0x3469AC4;   // second range()
offset.random.randomrangeint = 0x3469AC8; 
offset.enemyctrl.setaiaction = 0x1EF0C2C;

offset.collisionhitattribute.get_damageadjustment = 0x1BD41CC;

offset.chainctrl.add = 0x1D1B054;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x22A2DA0;

offset.ingameuictrl.showdamageui = 0x17D5DF8;
/**
 * return address
 */
offset.characterbase.ret = {};
offset.characterbase.ret.get_attack_2_dc_cbd = 0x018c9128;  // to calculationbasedamage
offset.random.ret = {};
offset.random.ret.rangeint_2_dc_cbd = 0x018c93bc;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x018c7c74;   // calculation
offset.random.ret.rangeint_2_cb_ac = 0x0235fd94;  // characterbuff$$applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0xf8;  //get from collisionHitAttribute$$get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get  !!!!!
