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
offset.characterbase.isdragon = 0x508;

offset.dragoncharacter.human = 0x6C0;

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

offset.datetime.get_utcnow = 0x31A6648;

offset.damagecalculation.calculation = 0x18466AC;
offset.damagecalculation.calculationbasedamage = 0x18477BC;

offset.characterbase.get_maxhp = 0x18AD224;
offset.characterbase.get_attack = 0x18AD3CC;
offset.characterbase.get_defense = 0x18AD460;
offset.characterbase.get_defcoef = 0x18AD4D0;
offset.characterbase.recoverysp = 0x18D1740;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = 0x18B1EFC;
offset.characterbase.applydamage = 0x18C81C0;
offset.characterbase.applyslipdamage = 0x18C8F30;
offset.characterbase.setabnormalstatus = 0x18CC950;
offset.characterbase.getmaxsp = 0x18CF528;

offset.enemycharacter.ondamaged = 0x18282C0;

offset.maingameleavealonechecker.setleavealonetime = 0x195C070;

offset.maingamectrl.playqueststart = 0x17DB6C8;

offset.actionconditionelement.get_rate = 0x23F7DB8;

offset.random.rangefloat = 0x35B32A8;   // first range()
//offset.random.rangeint = 0x35B3318;   // second range()
offset.random.randomrangeint = 0x35B331C; 
offset.enemyctrl.setaiaction = 0x22C0AD0;

offset.collisionhitattribute.get_damageadjustment = 0x1C1DCA4;

offset.chainctrl.add = 0x1B829E4;

offset.characterbufftriggerreactionbomb.execdebuffextradamage = 0x21C3550;

offset.ingameuictrl.showdamageui = 0x175803C;
offset.ingameuictrl.setmovein = 0x1768034;


/**
 * return address
 */
offset.characterbase.ret = {};
offset.characterbase.ret.get_attack_2_dc_cbd = 0x01848238;  // to calculationbasedamage
offset.random.ret = {};
offset.random.ret.rangeint_2_dc_cbd = 0x018484f0;   // calculationbasedamage
offset.random.ret.rangefloat_2_dc_calculation = 0x01846a0c;   // calculation
offset.random.ret.rangeint_2_cb_ac = 0x023c1ab8;  // characterbuff$$applycommon

/**
 * manual get
 */
offset.damagecalculation.coef = 0xf8;  //get from collisionHitAttribute$$get_DamageAdjustment
offset.collisionhitattribute.actionid = 0xa4;  //get
offset.collisionhitattribute.charactertype = 0x9c;  //get
offset.collisionhitattribute.owner = 0x30;  //get
offset.collisionhitattribute.skillid = 0xa8;  //get  !!!!!
