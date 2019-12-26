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

offset.characterbase.characterid = @CharacterBase,<characterId>@;
offset.characterbase.dungeonpartyindex = @CharacterBase,<dungeonPartyIndex>@;
offset.characterbase.dungeonpartyposition = @CharacterBase,<dungeonPartyPosition>@;
offset.characterbase.multiplayid = @CharacterBase,<multiPlayId>@;
offset.characterbase.charactertype = @CharacterBase,<type>@;
offset.characterbase.characterparameter = @CharacterBase,<param>@;

offset.characterparameter.fptotal = @CharacterParameter,total@;

offset.fluctuationparameter.abnormalresist = @FluctuationParameter,abnormalResist@;

offset.characterid.actorid = @CharacterId,actorId@;
offset.characterid.index = @CharacterId,index@;

offset.collisionhitattribute.actionhitexectype = @CollisionHitAttribute,_HitExecType@;

offset.damagestatus.value = @DamageStatus,<value>@;
offset.damagestatus.iscrit = @DamageStatus,<isCritical>@;

offset.damagecalculation.normal = @DamageCalculation,normal@;

offset.attackhit.damage = @AttackHit,damage@;
offset.attackhit.iscrit = @AttackHit,isCritical@;

offset.maingameleavealonechecker.warnningtime = @MainGameLeaveAloneChecker,_warnningTime@;
offset.maingameleavealonechecker.exittime = @MainGameLeaveAloneChecker,_exitTime@;

offset.slipdamage.type = @SlipDamage,type@;
offset.slipdamage.damage = @SlipDamage,damage@;
offset.slipdamage.attacker = @SlipDamage,attacker@;

offset.characterdamageintermediate.damage = @CharacterDamageIntermediate,damage@;
offset.characterdamageintermediate.damageowner = @CharacterDamageIntermediate,damageOwner@;
offset.characterdamageintermediate.attackhit = @CharacterDamageIntermediate,<attackHit>@;
offset.characterdamageintermediate.collisionhitattribute = @CharacterDamageIntermediate,<hitAttr>@;

/**
 * functions table
 */

offset.datetime.get_utcnow = #DateTime$$get_UtcNow#;

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
