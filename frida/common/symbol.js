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
offset.characterbase.isdragon = 0x500;

offset.dragoncharacter.human = 0x6B8;

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

offset.datetime.get_utcnow = 0x310584C;

offset.damagecalculation.calculation = 0x182C504;
offset.damagecalculation.calculationbasedamage = 0x182D608;

offset.characterbase.get_maxhp = 0x17D0990;
offset.characterbase.get_attack = 0x17D0B38;
offset.characterbase.get_defense = 0x17D0BCC;
offset.characterbase.get_defcoef = 0x17D0C3C;
offset.characterbase.recoverysp = 0x17F4834;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x17D558C;
offset.characterbase.applydamage = 0x17EB508;
offset.characterbase.applyslipdamage = 0x17EC07C;
offset.characterbase.setabnormalstatus = 0x17EF808;
offset.characterbase.getmaxsp = 0x17F2688;

offset.enemycharacter.ondamaged = 0x19BB9CC;

offset.maingameleavealonechecker.setleavealonetime = 0x18D4E7C;

offset.maingamectrl.playqueststart = 0x17B6B98;

offset.actionconditionelement.get_rate = 0x18E5678;

offset.random.rangefloat = 0x34D5948;   // first range()
//offset.random.rangeint = 0x34D59B8;   // second range()
offset.random.randomrangeint = 0x34D59BC; 
offset.enemyctrl.setaiaction = 0x21DFC24;

offset.collisionhitattribute.get_damageadjustment = 0x1BBA1F4;

offset.chainctrl.add = 0x1D6EDA8;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x2296918;

offset.ingameuictrl.showdamageui = 0x17719EC;

offset.maingameskillfadeoutctrl.fadeout = 0x18D8DDC;

/**
 * return address
 */
offset.characterbase.ret = {};
offset.characterbase.ret.get_attack_2_dc_cbd = 0x0182e080;  // to calculationbasedamage
offset.random.ret = {};
offset.random.ret.rangeint_2_dc_cbd = 0x0182e334;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x0182c864;   // calculation
offset.random.ret.rangeint_2_cb_ac = 0x0244d8d4;  // characterbuff$$applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0xf8;  //get from collisionHitAttribute$$get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get  !!!!!
