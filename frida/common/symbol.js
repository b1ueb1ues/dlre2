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

offset.datetime.get_utcnow = 0x2EC8034;

offset.damagecalculation.calculation = 0x189D524;
offset.damagecalculation.calculationbasedamage = 0x189E290;

offset.characterbase.get_maxhp = 0x1B8E26C;
offset.characterbase.get_attack = 0x1B8E414;
offset.characterbase.get_defense = 0x1B8E4A8;
offset.characterbase.get_defcoef = 0x1B8E518;
offset.characterbase.recoverysp = 0x1BAE70C;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x1B92D0C;
offset.characterbase.applydamage = 0x1BA625C;
offset.characterbase.applyslipdamage = 0x1BA6D44;
offset.characterbase.setabnormalstatus = 0x1BA9F70;
offset.characterbase.getmaxsp = 0x1BACA48;

offset.enemycharacter.ondamaged = 0x16CD4F4;

offset.maingameleavealonechecker.setleavealonetime = 0x18F8F9C;

offset.maingamectrl.playqueststart = 0x16A2A4C;

offset.actionconditionelement.get_rate = 0x19028A4;

offset.random.rangefloat = 0x33AA94C;   // first range()
//offset.random.rangeint = 0x33AA9BC;   // second range()
offset.random.randomrangeint = 0x33AA9C0; 
offset.enemyctrl.setaiaction = 0x2043FB8;

offset.collisionhitattribute.get_damageadjustment = 0x18813B8;

offset.chainctrl.add = 0x1AD6064;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x2196D4C;

offset.ingameuictrl.showdamageui = 0x18B6418;
/**
 * return address
 */
offset.characterbase.ret = {};
offset.characterbase.ret.get_attack_2_dc_cbd = 0x0189ea08;  // to calculationbasedamage
offset.random.ret = {};
offset.random.ret.rangeint_2_dc_cbd = 0x0189e918;
offset.random.ret.rangefloat_2_dc_calculation = 0x0189d878;  
offset.random.ret.rangeint_2_cb_ac = 0x024015f4;  // characterbuff$$applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0xf4;  //get from collisionHitAttribute$$get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get
