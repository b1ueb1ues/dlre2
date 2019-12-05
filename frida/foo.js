var ctx = {};



//hook(0x8d5448,{  // GameParam$$get_DamageAdjustCoef  /0.6
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//            console.log('damageadjustcoef:'+retval);
//    }
//});

//hook(0x008d5228,{  //GameParam$$get_CriticalCoef 1.7
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//            console.log('criticalCoef:'+retval);
//    }
//});

//hook(0x8d5230,{  //GameParam$$get_DragonDamageCoef 1.2
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//        if(randomreplace == 1){
//            console.log('dragondamagecoef:'+retval);
//        }
//    }
//});

//hook(0x006bacd0,{  // DamageCalculation$$CalculationHeal
//    onEnter: function(args){
//        console.log('\n--dc_ch----------');
//        ctx.dc_ch=1;
//    },
//    onLeave: function(retval){
//        ctx.dc_ch=0;
//    }
//});
//
//hook(0x006ba648,{  // DamageCalculation$$HealValue
//    onEnter: function(args){
//        power = args[3];
//        coef = args[4];
//        console.log('dc_hv power:'+p2f(power));
//        console.log('dc_hv coef:'+p2f(coef));
//        ctx.dc_hv=1;
//    },
//    onLeave: function(retval){
//        ctx.dc_hv=0;
//        console.log('dc_ch:'+p2f(retval));
//    }
//});
//
//
//hook(0x01159a44,{  // GameParam$$get_HealCoef
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//        console.log('heal_onele_coef:'+p2f(retval));
//    }
//});
//
//hook(0x01159c5c,{  //  GameParam$$get_HpRecoveryAdjustCoefDependsOnHp
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//        console.log('heal_from_hp:'+p2f(retval));
//    }
//});
//
//hook(0x01159c64,{  //  GameParam$$get_HpRecoveryAdjustCoefDependsOnAttack
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//        console.log('heal_from_att:'+p2f(retval));
//    }
//});
//
//hook(0x01159c54,{  //  GameParam$$get_HpRecoveryAdjustCoef
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//        console.log('heal_adjust:'+p2f(retval));
//    }
//});

//hook(0x01159a4c,{  // GameParam$$get_RaidHealCoef
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//        console.log('gp_raidhealcoef:'+p2f(retval));
//    }
//});
//
//hook(0x00a5b1c8,{  // MainGameCtrl$$IsRaidQuest
//    onEnter: function(args){
//    },
//    onLeave: function(retval){
//        if(ctx.dc_ch){
//            console.log('mgc_israidquest:'+retval.toInt32());
//            retval.replace(1);
//        }
//    }
//});
//
//
//hook(0x01272ba0,{  // CharacterBuff$$SetupRegeneration
//    onEnter: function(args){
//        ctx.cbf_sr = 1
//    },
//    onLeave: function(retval){
//        ctx.cbf_sr = 0
//    }
//});

var gl = 100;
//DamageCalculation$$Calculation
hook(offset.damagecalculation.calculation, {
    onEnter: function(args){
        //console.log('calc start');
        this.tis = args[0];
        this.attr = args[1];
        this.dst = args[2]
    },
    onLeave: function(retval){
        //console.log('calc end');

        var o_ds = offset.damagestatus;
        var o_dc = offset.damagecalculation;
        var o_cha = offset.collisionhitattribute;

        var p_ds = follow(this.tis, o_dc.normal); //damagestatues normal

        var dmg = p_ds.add(o_ds.value);

        //cb = follow(this.attr,0x24); //characterbase owner
        //ct = cb.add(0xb8).readInt(); //charactertype
        var ct = this.attr.add(o_cha.charactertype).readInt();

        var damage = dmg.readInt() ; //value
        var iscrit = p_ds.add(o_ds.iscrit).readU8()
        var cha = this.attr // collisionhitattribute

        // cheat
        if(gl){
            if(ct==0){
                var newdmg = gl;
                //console.log('replaceatt '+dmg.readInt()+'->'+newdmg);
                dmg.writeInt(newdmg);
            }else{
                //console.log('replacedt '+dmg.readInt()+'->0');
                dmg.writeInt(1);
            }
        }
    }
});


hook(0x00a5e978,{  // GameParam$$get_ReduceSecBurn
    onEnter: function(args){
    },
    onLeave: function(retval){
        console.log('reducesecburn: '+retval);
    }
});

hook(0x00a5e990,{  // GameParam$$get_ReduceSecSlowMove
    onEnter: function(args){
    },
    onLeave: function(retval){
        console.log('reducesecbog: '+retval);
    }
});


hook(
offset.characterbase.get_attack
,{
    onEnter: function(args){
    },
    onLeave: function(retval){
        if(ctx.dc_ch){
            console.log('get_att: '+retval.toInt32());
        }
        console.log('get_att: '+retval.toInt32());
    }
});

hook(
offset.characterbase.get_maxhp
,{
    onEnter: function(args){
    },
    onLeave: function(retval){
        if(ctx.dc_ch){
            console.log('get_hp: '+retval.toInt32());
        }
    }
});


if(0){
hook(
offset.random.rangeint
,{  //random$$range int
    onEnter: function(args){
    },
    onLeave: function(retval){
        if(ctx.a){
            var rp = 101;
            console.log('randomint int : '+retval.toInt32()+'->'+rp);
            retval.replace(rp);
        }
    }
});
}

if(0){
hook(
offset.random.randomrangeint
,{  //random$$randomrangeint int
    onEnter: function(args){
    },
    onLeave: function(retval){
        if(ctx.c){
            var rp = 101;
            console.log('range int : '+retval.toInt32()+'->'+rp);
            retval.replace(rp);
        }
    }
});
}

if(0){
hook(
offset.random.rangefloat
,{  //random$$range float
    onEnter: function(args){
        var min = p2f(args[0]);
        var max = p2f(args[1]);
        if( max <= 1.051 && max >= 1.049){
            if( min <= 0.951 && min >= 0.949){
                this.spread = 1;
            }
        }
    },
    onLeave: function(retval){
      //  if(ctx.dc_ch){
      //      rp = 1.05;
      //      console.log('range float: '+p2f(retval)+'->'+rp);
      //      retval.replace(f2i(rp));
      //  }
      //  if(ctx.cbf_sr){
      //      rp = 1.0;
      //      console.log('range float: '+p2f(retval)+'->'+rp);
      //      retval.replace(f2i(rp));
      //  }
      //  if(this.spread){
      //      rp = 1.0;
      //      console.log('range float: '+p2f(retval)+'->'+rp);
      //      retval.replace(f2i(rp));
      //  }
    }
});
}



hook(
offset.characterbase.recoverysp
,{
    onEnter: function(args){
        console.log('** sp: '+args[1].toInt32());
        this.context.x1 = 20000;
    },
    onLeave: function(retval){
    }
});


//hook(0x006b6b08,{  //DamageCalculation$$CalculationBaseDamage
//    onEnter: function(args){
//        ctx.dc_cbd = 1
//    },
//    onLeave: function(retval){
//        ctx.dc_cbd = 0
//        console.log('basedmg: '+p2f(retval));
//        retval.replace(f2i(10000.0));
//    }
//});



hook(
offset.maingameleavealonechecker.setleavealonetime
,{
    onEnter: function(args){
        this.tis = args[0];
        console.log('setleavealone');
    },
    onLeave: function(retval){
        var tis = this.tis;
        tis.add(offset.maingameleavealonechecker.warnningtime)
            .writeFloat(100000);
        tis.add(offset.maingameleavealonechecker.exittime)
            .writeFloat(100000);
    }
});



var invincible = 1;
if(invincible){
    // CharacterBase$$IsInvincibleOnHitCheck
    hook(offset.characterbase.isinvincibleonhitcheck, { 
        onEnter: function(args){
            var o_cb = offset.characterbase;
            var o_cha = offset.collisionhitattribute;
            var cb = args[0];          //characterbase owner
            var p_ct = cb.add(o_cb.charactertype); 
            var ct = p_ct.readInt();   //charactertype
            this.ct = ct;

            var cha = args[1];
            var ahet = cha.add(o_cha.actionhitexectype).readInt();  // actionhitexectype
            this.ahet = ahet;
            //console.log('actionhitexectype: '+ahet);
        },
        onLeave: function(retval){
            if(this.ct == 0){
                if(this.ahet == 1){
                    retval.replace(1);
                }
                else if(this.ahet == 6){
                    retval.replace(1);
                }
            }
        }
    });
}


