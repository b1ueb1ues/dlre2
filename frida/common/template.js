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
offset.damagecalculation.calculation = #DamageCalculation$$Calculation#;
offset.damagecalculation.calculationbasedamage = #DamageCalculation$$CalculationBaseDamage#;

offset.characterbase.get_maxhp = #CharacterBase$$get_maxHp#;
offset.characterbase.get_attack = #CharacterBase$$get_attack#;
offset.characterbase.get_defense = #CharacterBase$$get_defense#;
offset.characterbase.get_defcoef = #CharacterBase$$get_defCoef#;
offset.characterbase.recoverysp = #CharacterBase$$RecoverySp,1#;  // (int value) the first one
offset.characterbase.isinvincibleonhitcheck = #CharacterBase$$IsInvincibleOnHitCheck#;
offset.characterbase.applydamage = #CharacterBase$$ApplyDamage#;
offset.characterbase.applyslipdamage = #CharacterBase$$ApplySlipDamage#;
offset.characterbase.setabnormalstatus = #CharacterBase$$SetAbnormalStatus#;
offset.characterbase.getmaxsp = #CharacterBase$$GetMaxSp#;

offset.enemycharacter.ondamaged = #EnemyCharacter$$OnDamaged#;

offset.maingameleavealonechecker.setleavealonetime = #MainGameLeaveAloneChecker$$SetLeaveAloneTime#;

offset.maingamectrl.playqueststart = #MainGameCtrl$$PlayQuestStart#;

offset.actionconditionelement.get_rate = #ActionConditionElement$$get_Rate#;

offset.random.rangefloat = #Random$$Range,1#;   // first range()
//offset.random.rangeint = #Random$$Range,2#;   // second range()
offset.random.randomrangeint = #Random$$RandomRangeInt#; 
offset.enemyctrl.setaiaction = #EnemyCtrl$$SetAIAction#;

offset.collisionhitattribute.get_damageadjustment = #CollisionHitAttribute$$get_DamageAdjustment#;

offset.chainctrl.add = #ChainCtrl$$Add#;

/**
 * return address
 */
offset.characterbase.ret = {};
offset.characterbase.ret.get_attack_2_dc_cbd = 0x015a0648;
offset.random.ret = {};
offset.random.ret.rangefloat_2_dc_calculation = 0x0159f500;
offset.random.ret.rangeint_2_dc_cbd = 0x015a07fc;
offset.random.ret.rangeint_2_cb_ac = 0x0203a7e4;  // characterbuff$$applycommon

