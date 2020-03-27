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

offset.dragoncharacter.human = 0x660;

offset.characterparameter.fptotal = 0x98;

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

offset.datetime.get_utcnow = 0x2F545B0;

offset.damagecalculation.calculation = 0x180BBB0;
offset.damagecalculation.calculationbasedamage = 0x180C92C;

offset.characterbase.get_maxhp = 0x190D258;
offset.characterbase.get_attack = 0x190D400;
offset.characterbase.get_defense = 0x190D494;
offset.characterbase.get_defcoef = 0x190D504;
offset.characterbase.recoverysp = 0x192E220;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x1911D44;
offset.characterbase.applydamage = 0x1925774;
offset.characterbase.applyslipdamage = 0x1926298;
offset.characterbase.setabnormalstatus = 0x192989C;
offset.characterbase.getmaxsp = 0x192C470;

offset.enemycharacter.ondamaged = 0x1F79018;

offset.maingameleavealonechecker.setleavealonetime = 0x1955AD0;

offset.maingamectrl.playqueststart = 0x16E826C;

offset.actionconditionelement.get_rate = 0x195FC94;

offset.random.rangefloat = 0x341E3C0;   // first range()
//offset.random.rangeint = 0x341E430;   // second range()
offset.random.randomrangeint = 0x341E434; 
offset.enemyctrl.setaiaction = 0x1F858BC;

offset.collisionhitattribute.get_damageadjustment = 0x1D0FF04;

offset.chainctrl.add = 0x19ADDCC;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x224440C;

offset.ingameuictrl.showdamageui = 0x171C97C;
/**
 * return address
 */
offset.characterbase.ret = {};
offset.characterbase.ret.get_attack_2_dc_cbd = 0x0180d0f0;  // to calculationbasedamage
offset.random.ret = {};
offset.random.ret.rangeint_2_dc_cbd = 0x0180d370;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x0180bf0c;   // calculation
offset.random.ret.rangeint_2_cb_ac = 0x0235cea0;  // characterbuff$$applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0xf8;  //get from collisionHitAttribute$$get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get
